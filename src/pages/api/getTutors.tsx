import { auth } from "@/src/server/auth";
import { API_VERSION } from "@/src/utils/constants";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from 'next';

interface DiscordUser {
  id: string,
  username: string,
  global_name?: string
}
interface Tutor {
  displayName: string,
  id: string
}

interface GuildMember {
  user: DiscordUser,
  nick: string,
  roles: string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth(req, res);
  const { roleID, adminID, guildID } = req.query;
  
  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' });
    return;
  }
  if (!roleID || !adminID || !guildID || 
    Array.isArray(roleID) || Array.isArray(adminID) || Array.isArray(guildID)) {
  res.status(400).json({ message: 'Invalid query parameters' });
  return;
  }

  try {
    let allMembers: GuildMember[] = [];
    let lastMemberID: string | undefined;
    while (true) {
      const url = `https://discord.com/api/v${API_VERSION}/guilds/${guildID}/members?limit=1000${
        lastMemberID ? `&after=${lastMemberID}` : ''
      }`;
    
    const response = await axios.get<GuildMember[]>(url, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": 'application/json'
      }
    });

    const members = response.data;
    allMembers = [...allMembers, ...members];

    if (members.length < 1000) {
      break;
    }
    lastMemberID = members[members.length - 1].user.id;
  }

    // Filter members with the specific role and map to required format
    const tutors: Tutor[] = allMembers
      .filter(member => member.roles.includes(roleID) || member.roles.includes(adminID))
      .map(member => ({
        displayName: member.nick || member.user.global_name || member.user.username,
        id: member.user.id
      }));
    res.status(200).json({ tutors });
  } catch (err) {
    console.error('Failed to fetch tutors: ', err);
    res.status(500).json({ error: 'Failed to fetch tutorIds' })
  }
}
