import express from 'express';
import Camera from '../Camera';

export default (req: express.Request, res: express.Response) => {
  const camera = new Camera();
  camera.stop();

  res.send('Stream stopped!');
};
