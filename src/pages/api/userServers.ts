import { auth } from '@/src/server/auth';
import { API_VERSION } from '@/src/utils/constants';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Guild = {
  id: string,
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth(req, res);

  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' });
    return;
  }

  try {
    const response = await axios.get<Guild[]>(`https://discord.com/api/v${API_VERSION}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const guildIds = response.data.map(guild => guild.id);

    res.status(200).json({ guildIds });
  } catch (error) {
    console.error('Error fetching guilds:', error);
    res.status(500).json({ error: 'Failed to fetch guilds' });
  }
}
