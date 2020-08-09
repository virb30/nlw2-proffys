import { Request, Response } from 'express';
import CreateUser from '../modules/users/CreateUser';
import BadRequest from '../errors/BadRequest';

export default class UsersController {
  async store(request: Request, response: Response): Promise<Response> {
    const createUser = new CreateUser();
    const { name, surname, password, email } = request.body;

    try {
      await createUser.execute({
        name,
        surname,
        password,
        email,
      });

      return response.status(201).send();
    } catch (err) {
      console.error(err);
      if (err instanceof BadRequest) {
        return response.status(err.statusCode).json({
          error: err.message,
        });
      }

      return response.status(500).json({
        error: 'Unexpected error',
      });
    }
  }
}
