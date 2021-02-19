import Server from './lib/Server';

const server = new Server();

server.init()
  .then(async () => {
    console.log('server running on pid', process.pid);
  })
  .catch((error) => {
    console.error('Exiting', error);
  });