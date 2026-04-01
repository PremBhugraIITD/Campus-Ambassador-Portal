import jwt from "jsonwebtoken";
import pubKeys from "../cache/pubKeys.js";
import { InternalServerError, UnauthorizedError } from "../errors/index.js";
import crypto from "crypto";
import { CustomApiError } from "../errors/CustomApiError.js";
import db from "../lib/db.js";

export const authMiddleware = async (req, res, next) => {
	let token = req.cookies?.access_token || req.headers.authorization?.split(" ")[1];
	const refreshToken = req.cookies?.refresh_token;
	if (!token && !refreshToken) {
		throw UnauthorizedError("Unauthorized");
	}
	try {
		let decoded,
			keyId,
			exp = 0;
		if (token) {
			decoded = jwt.decode(token, { complete: true });
			keyId = decoded.header.kid;
			exp = decoded.payload.exp;
			const tokenType = decoded.payload.token_type; 
			if (tokenType !== 'access') {
				throw UnauthorizedError('Invalid token type. Expected access token.');
			}
		}

		const isExpired = Date.now() >= exp * 1000;
		if (isExpired)
			if (refreshToken) {
				// Use refresh token to get a new access token
				const decodedRefreshToken = jwt.decode(refreshToken, { complete: true });
				const pubKey1 = await pubKeys.getPubKey(decodedRefreshToken.header.kid);
				const user1 = jwt.verify(refreshToken, pubKey1);
				if (!user1?.sub) {
					throw UnauthorizedError("Unauthorized");
				}
				const { exp: refreshExp } = decodedRefreshToken.payload;
				const isRefreshTokenExpired = Date.now() >= refreshExp * 1000;
				if (isRefreshTokenExpired) {
					// Both tokens are expired
					res.clearCookie("access_token");
					res.clearCookie("refresh_token");
					throw UnauthorizedError("Unauthorized - both tokens expired");
				}
				const newTokenResponse = await fetch("https://auth.rdv-iitd.org/api/token/refresh/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ refresh_token: refreshToken }),
				});

				if (!newTokenResponse.ok) {
					throw UnauthorizedError("Unauthorized - refresh token failed");
				}

				const { access_token } = await newTokenResponse.json();
				token = access_token;
				decoded = jwt.decode(token, { complete: true });
				keyId = decoded.header.kid;
				exp = decoded.payload.exp;

				// Set the new access token as a cookie (or you can return it in the response header)
				res.cookie("access_token", access_token, {
					httpOnly: true,
					secure: true,
					maxAge: 1000 * 60 * 60 * 2,
				});
			} else {
				throw UnauthorizedError("Unauthorized - token expired");
			}
		const pubKey = await pubKeys.getPubKey(keyId);
		const user = jwt.verify(token, pubKey);
		if (!user?.sub) {
			throw UnauthorizedError("Unauthorized");
		}

		req.user_id = user.sub;
		req.expiryACCESS = exp;
		next();
	} catch (error) {
		if (error instanceof CustomApiError) {
			throw error;
		}
		console.log(error);
		throw InternalServerError("Internal Server Error");
	}
};
