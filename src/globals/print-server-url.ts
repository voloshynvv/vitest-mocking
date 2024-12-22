interface Server {
  host: string;
  port?: number;
}

export function printServerUrl(server: Server) {
  const url = new URL(`http://${server.host}`);
  url.port = server.port?.toString() || '';

  console.log(`Server is listening at ${url.href}`);
}
