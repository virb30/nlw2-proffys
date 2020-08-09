import { Request, Response } from 'express';
import CreateSession from '../modules/users/CreateSession';
import BadRequest from '../errors/BadRequest';

export default class SessionsController {
  async store(request: Request, response: Response): Promise<Response> {
    const createSession = new CreateSession();
    const { password, email } = request.body;

    try {
      const { user, token } = await createSession.execute({
        password,
        email,
      });

      return response.status(201).json({ user, token });
    } catch (err) {
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
