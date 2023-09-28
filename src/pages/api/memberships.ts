import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from "~/env.mjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
        const { email } = req.body as { email: string };
        const githubRes = await sendGitHubInvite(email);

        if (githubRes.status == 200) {
            res.status(200).json({ message: "Invitation sent successfully. "});
        } else {
            res.status(githubRes.status).json({ message: 'Failed to send invite.' });
        }
    } catch (error) {
        console.error('Error sending GitHub invitation:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}

async function sendGitHubInvite(email: string) {
    const response = await fetch(env.GITHUB_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: env.GITHUB_PERSONAL_TOKEN,
        },
        body: JSON.stringify({ email }),
    });
    return response;
}