import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  return response.json({ user: { ...user, password: undefined }, token });
});

export default usersRouter;