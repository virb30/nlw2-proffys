import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import db from '../../database/connection';

import BadRequest from '../../errors/BadRequest';

import authConfig from '../../config/auth';

interface IUser {
  name: string;
  surname: string;
  email: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

interface IRequest {
  email: string;
  password: string;
}

class CreateSession {
  public async execute(credentials: IRequest): Promise<IResponse> {
    const { email, password } = credentials;

    const user = await db('users').select('*').where('email', '=', email);

    if (!user[0]) {
      throw new BadRequest('User not found', 400);
    }

    const comparePassword = await compare(password, user[0].password);

    if (!comparePassword) {
      throw new BadRequest('Invalid Credentials', 400);
    }

    const { expiresIn, key } = authConfig.jwt;

    const token = sign({ sub: String(user[0].id) }, key, { expiresIn });

    const authenticatedUser = Object.assign({}, user[0]);

    delete authenticatedUser.password;

    return {
      user: authenticatedUser,
      token,
    };
  }
}

export default CreateSession;
