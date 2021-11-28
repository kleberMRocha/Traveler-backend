import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const message = { err: 'Não autorizado' };

const isAuth = (req:Request, res:Response, next:NextFunction) => {
  const notAllowed = () => res.status(401).json({ message: message.err});
  dotenv.config();

  const [, token] = req.headers.authorization.split('Bearer');
  let decoded = null;

  if (!token) {
    return notAllowed();
  }

  try {
    decoded = jwt.verify(token.trim(), process.env.NODE_PRIVATE_KEY);
  } catch (err) {
    console.log(err);
    notAllowed();
  }

  if (!decoded) notAllowed();

  next();
};

export default isAuth;
