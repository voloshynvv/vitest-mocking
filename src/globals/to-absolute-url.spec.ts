import { toAbsoluteUrl } from './to-absolute-url';

beforeAll(() => {
  vi.stubGlobal('location', new URL('http://localhost/base/'));
});

afterAll(() => {
  vi.unstubAllGlobals();
});

describe('toAbsoluteUrl', () => {
  it('returns an absolute url as-is', () => {
    expect(toAbsoluteUrl('http://example.com/')).toBe('http://example.com/');
  });

  it('resolves relatively to the root', () => {
    expect(toAbsoluteUrl('/example')).toBe('http://localhost/example');
  });

  it('resolves to the current location', () => {
    expect(toAbsoluteUrl('./example')).toBe('http://localhost/base/example');
  });
});
