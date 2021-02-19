import express from 'express';
import Camera from '../Camera';

export default async (req: express.Request, res: express.Response) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    res.send('ERROR: Invalid URL');
    return;
  }

  const camera = new Camera();
  camera.start(url);

  res.send(`Streaming to ${url}`);
};
