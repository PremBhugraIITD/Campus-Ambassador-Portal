import jwt from "jsonwebtoken";
import pubKeys from "../cache/pubKeys.js";
import { InternalServerError, UnauthorizedError } from "../errors/index.js";
import crypto from "crypto";
import { CustomApiError } from "../errors/CustomApiError.js";
import db from "../lib/db.js"; 

function encrypt(text, key) {
    // Generate a random initialization vector (IV)
    const iv = crypto.randomBytes(16);
  
    // Create a Cipher instance with a 32-byte key
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  
    // Encrypt the text
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
  
    // Combine the IV with the encrypted text (needed for decryption)
    return iv.toString('hex') + ':' + encrypted;
  }
  
  function decrypt(encryptedText, key) {
    // Split the IV and the encrypted text
    try {
      const [ivHex, encrypted] = encryptedText.split(':');
      const iv = Buffer.from(ivHex, 'hex');
  
      // Create a Decipher instance
      const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  
      // Decrypt the text
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
  
      return decrypted;
    } catch (error) {
        // console.log('error:', error);
      return null;
    }
  }
  
  function generateSecretKey() {
    const baseString = 'CAP_RDV_2024';
    const randomString = crypto.randomBytes(16).toString('hex'); // Generate a random 32-character hex string (16 bytes)
    const combinedKey = baseString + randomString;
    
    // Ensure the key is exactly 32 bytes (256 bits)
    return combinedKey.slice(0, 32); // Slice it to 32 characters if necessary
  }
  
export const caTokenMiddleware = async(req, res, next) => {
     // check cookie ca_token and decrypt it, match user_id with accesstoken
    const secretKey = process.env.SECRET_KEY_CA_TOKEN;
    // console.log('secretKey:', secretKey);
    const ca_tokenCookie = req.cookies.ca_token;
    if (ca_tokenCookie) {
      const d_data = JSON.parse(decrypt(ca_tokenCookie, secretKey));
    //   console.log('d_data:', d_data);
      if (!d_data || d_data.user_id !== req.user_id) {
        throw UnauthorizedError("Unauthorized");
      }
    } else {
      const user_data = await db.user.findUnique({ where: { id: req.user_id } });
      if (!user_data) {
        throw UnauthorizedError("Unauthorized");
      }

      const data = {
        user_id: req.user_id,
        ca_id: user_data.ca_id
      }
      const ca_token = encrypt(JSON.stringify(data), secretKey);
    

      res.cookie('ca_token', ca_token, { httpOnly: true, secure: true, expires: new Date(req.expiryACCESS*1000) }); 
    }
    next();

    // if matched, proceed else check db for user.

    // if user found in db, create ca_token and set it in cookies.

    // catoken is json string with user id, ca_id.
}