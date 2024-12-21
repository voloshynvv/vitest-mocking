import { UserService, Logger } from './user-service';

it('logs "createUser" event when creating a new user', async () => {
  const logger = new Logger();
  vi.spyOn(logger, 'log');

  const userService = new UserService(logger);
  await userService.createUser({ id: '1', name: 'new user' });

  expect(logger.log).toHaveBeenCalledWith('createUser', { id: '1' });
  expect(logger.log).toHaveBeenCalledOnce();
});
