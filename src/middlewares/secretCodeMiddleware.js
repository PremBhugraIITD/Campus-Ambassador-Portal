import dotenv from 'dotenv';
dotenv.config(); 

export const secretCodeMiddleware = (req, res, next) => {
  const secretCode = req.headers['x-secret-code']; 

  if (secretCode === process.env.SECRET_CODE) {
    return next(); 
  }

  return res.status(403).json({ message: "Forbidden: Invalid secret code" });
};
