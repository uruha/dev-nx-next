import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {

  res.setHeader('Content-type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({ message: 'Hello' }));
};
