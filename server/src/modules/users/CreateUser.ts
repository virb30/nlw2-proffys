import { hash } from 'bcrypt';
import db from '../../database/connection';
import BadRequest from '../../errors/BadRequest';

interface IRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
}

class CreateUser {
  public async execute(userData: IRequest): Promise<void> {
    const { name, surname, email, password } = userData;

    const emailExists = await db('users')
      .select('*')
      .where('email', '=', email);

    if (emailExists.length > 0) {
      throw new BadRequest('E-mail already exists', 400);
    }

    const hashedPassword = await hash(password, 12);

    const trx = await db.transaction();

    try {
      await trx('users').insert({
        name,
        surname,
        email,
        password: hashedPassword,
      });

      await trx.commit();
    } catch (err) {
      await trx.rollback();
      throw new BadRequest('Error on trying to register user');
    }
  }
}

export default CreateUser;
