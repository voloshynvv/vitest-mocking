import { getUserById } from './user';
import { server } from '../msw/server';
import { http } from 'msw';

describe('user api', () => {
  it('returns user data', async () => {
    await expect(getUserById('1')).resolves.toEqual({
      id: '1',
    });
  });

  it('throwns an error if the server responds with an error', async () => {
    server.use(
      http.get('https://dummyjson.com/users/:id', () => {
        return new Response(null, { status: 404 });
      })
    );

    await expect(getUserById('1')).rejects.toThrow('could not fetch user with id 1');
  });
});
