export class Logger {
  log(message: string, data: unknown) {
    console.log(message, data);
  }
}

export class UserService {
  constructor(private logger: Logger) {}

  async createUser(data: { id: string; name: string }) {
    this.logger.log('createUser', { id: data.id });

    return data;
  }
}
