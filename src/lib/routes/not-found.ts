import express from 'express';

export default (req: express.Request, res: express.Response) => {
  res.send('I think you are lost...');
};
