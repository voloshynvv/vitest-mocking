import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://dummyjson.com/users/:id', () => {
    return HttpResponse.json({
      id: '1',
    });
  }),
];
