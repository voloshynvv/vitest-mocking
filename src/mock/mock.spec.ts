describe('vi.fn() api', () => {
  describe('default', () => {
    it('returns undefined by default', () => {
      const mockFn = vi.fn();
      const result = mockFn(10);

      expect(result).toBeUndefined();
      expect(mockFn).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith(10);
    });
  });

  describe('mock implementation', () => {
    it('mock implementation #1', () => {
      const mockFn = vi.fn(() => 10);
      const result = mockFn();

      expect(result).toBe(10);
    });

    it('mock implementation (with arg) #1', () => {
      const mockFn = vi.fn((num: number) => num + 10);
      const result = mockFn(20);

      expect(result).toBe(30);
      expect(mockFn).toHaveBeenCalledWith(20);
    });

    it('mock implementation #2', () => {
      const mockFn = vi.fn().mockImplementation(() => 10);
      const result = mockFn();

      expect(result).toBe(10);
    });

    it('mock implementation (with arg) #2', () => {
      const mockFn = vi.fn().mockImplementation((num: number) => num + 10);
      const result = mockFn(20);

      expect(result).toBe(30);
      expect(mockFn).toHaveBeenCalledWith(20);
    });

    it('mock implementation once', () => {
      const mockFn = vi.fn().mockImplementationOnce(() => true);
      const result = mockFn();
      const result2 = mockFn();

      expect(result).toBeTruthy();
      expect(result2).toBeUndefined();
    });

    it('mock implementation once (chaining)', () => {
      const mockFn = vi
        .fn()
        .mockImplementationOnce(() => ({ id: 1 }))
        .mockImplementationOnce(() => ({ id: 2 }))
        .mockImplementationOnce(() => ({ id: 3 }))
        .mockImplementation(() => ({ id: 32 }));

      const result = mockFn();
      const result2 = mockFn();
      const result3 = mockFn();

      // mockFn() { id: 32 }
      // mockFn() { id: 32 }
      // mockFn() { id: 32 }

      expect(result).toEqual({ id: 1 });
      expect(result2).toEqual({ id: 2 });
      expect(result3).toEqual({ id: 3 });
    });
  });

  describe('mock rejected|resolved', () => {
    it('mockResolvedValue', async () => {
      const mockFn = vi.fn().mockResolvedValue({ id: 1, name: 'john' });

      expect(await mockFn()).toEqual({ id: 1, name: 'john' });
    });

    it('mockRejectedValue', async () => {
      const mockFn = vi.fn().mockRejectedValue(new Error('async error'));

      await expect(() => mockFn()).rejects.toThrowError('async error'); // alias: toThrow()
    });
  });

  describe('mock return value', () => {
    it('mockReturnValue', () => {
      const mockFn = vi.fn().mockReturnValue('returned value');
      const result = mockFn();

      expect(result).toBe('returned value');
    });

    it('mockReturnValueOnce', () => {
      const mockFn = vi
        .fn()
        .mockReturnValue('default')
        .mockReturnValueOnce('first call')
        .mockReturnValueOnce('second call');

      // 'first call', 'second call', 'default', 'default'
      console.log(mockFn(), mockFn(), mockFn(), mockFn());
    });
  });

  describe('mockClear | mockReset | mockRestore', () => {
    // Clear mock history. This method does not reset implementations!!!
    it('mockClear', () => {
      const mockFn = vi.fn().mockReturnValue('default');

      mockFn([1, 2, 3]);
      mockFn([4, 5, 6]);
      mockFn([7, 8, 9]);

      expect(mockFn).toHaveBeenCalledTimes(3);
      expect(mockFn).toHaveBeenNthCalledWith(3, [7, 8, 9]);

      mockFn.mockClear();
      expect(mockFn).not.toHaveBeenCalled();

      mockFn();
      expect(mockFn()).toBe('default');
      expect(mockFn).toHaveBeenCalled();
    });

    // clear mock history and reset implementation
    // resetting a mock to its default state!

    // This also resets all "once" implementations.
    // It is useful for completely resetting a mock to its default state.
    it('mockReset', () => {
      const mockFn = vi.fn().mockImplementation(() => true);
      // const mockFn = vi.fn(() => true);

      expect(mockFn()).toBe(true);
      expect(mockFn).toHaveBeenCalledTimes(1);

      mockFn.mockReset();

      expect(mockFn).not.toHaveBeenCalled();
      expect(mockFn()).toBeUndefined();
    });

    // restores the inner implementation to the original function.
    it('mockRestore | restores mock to impl', () => {
      const mockFn = vi.fn(() => 20);
      expect(mockFn()).toBe(20);

      mockFn.mockRestore();
      expect(mockFn()).toBe(20);
    });

    it('mockRestore | restores mock to vi.fn() that returns undefined', () => {
      const mockFn = vi.fn().mockImplementation(() => 20);
      expect(mockFn()).toBe(20);

      mockFn.mockRestore();
      expect(mockFn()).toBeUndefined();
    });

    it('mocking', () => {
      const mockFn = vi.fn();

      mockFn.mockReturnValue(10);
      console.log(mockFn()); // 10

      mockFn.mockReturnValue(20);
      console.log(mockFn()); // 20

      mockFn.mockReset();
      console.log(mockFn()); // undefined

      mockFn.mockImplementation((name) => `hello, ${name}`);
      console.log(mockFn('john')); // hello, john
      console.log(mockFn('sara')); // hello, sara

      mockFn.mockImplementationOnce(() => 20).mockImplementationOnce(() => 30);
      console.log(mockFn()); // 20
      console.log(mockFn()); // 30

      console.log(mockFn('sara')); // hello, sara

      mockFn.mockReset();

      expect(mockFn).not.toHaveBeenCalled();
      expect(mockFn()).toBeUndefined();
    });
  });
});

describe('Bad example', () => {
  const mock = vi.fn();
  const mock2 = vi.fn(() => '');

  it('test 1', () => {
    mock();
    mock();
    expect(mock2()).toBe('');
  });

  it('test 2', () => {
    mock();

    // Always remember to clear or restore mocks before or after each test run
    // to undo mock state changes between runs!

    // expect(mock).toHaveBeenCalledTimes(1); // ERROR: expected "spy" to be called 1 times, but got 3 times
  });
});

describe('with resetting after each test', () => {
  const mockFn = vi.fn();

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('test 1', () => {
    mockFn();
    mockFn();
    mockFn();
    mockFn();
    expect(mockFn).toHaveBeenCalledTimes(4);
  });

  it('test 2', () => {
    mockFn();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
