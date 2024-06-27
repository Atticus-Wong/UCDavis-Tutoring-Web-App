// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth } from '@/src/server/auth';
import { API_VERSION } from '@/src/utils/constants';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth(req, res);

  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' });
    return;
  }

}
