import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import GetRepostitory from './GetRepostitory';

import { User } from '../infra/entity/User';

dotenv.config();

class AuthController {
  private _privateKey;

  get privateKey(): string {
    return this._privateKey;
  }

  constructor() {
    this._privateKey = process.env.NODE_PRIVATE_KEY;
  }

  public async AuthUser(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Por Favor, informe Senha e Email',
      });
    }
    const user = GetRepostitory.repostitory(User);
    const userAuth = await user.findOne({ where: { email } });

    if (!userAuth) {
      return res.status(403).json({
        message: 'Usuário ou senha incorreto',
      });
    }

    bcrypt.compare(password, userAuth.password, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Houve um erro no processamento' });
      }

      if (result) {
        const userInfos = {
          id: userAuth.id,
          firstName: userAuth.firstName,
          email: userAuth.email,
        };

        const token = jwt.sign({ data: userInfos }, this.privateKey, { expiresIn: '24h' });
        return res.status(200).json({ token, user: userInfos });
      }

      return res.status(403).json({
        message: 'Usuário ou senha incorreto',
      });
    });
  }
}

export default AuthController;
