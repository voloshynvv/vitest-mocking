import { printServerUrl } from './print-server-url';

describe('printServerUrl', () => {
  beforeAll(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {}); // change impl
  });

  afterEach(() => {
    vi.clearAllMocks(); // reset mock history
  });

  afterAll(() => {
    vi.restoreAllMocks(); // restore to initial impl
  });

  it('prints the server message for url with host and no port', () => {
    printServerUrl({ host: '127.0.0.1' });
    expect(console.log).toHaveBeenCalledWith('Server is listening at http://127.0.0.1/');
  });

  it('prints the server message for url with host and port', () => {
    printServerUrl({ host: '127.0.0.1', port: 3000 });
    expect(console.log).toHaveBeenCalledWith('Server is listening at http://127.0.0.1:3000/');
  });
});
