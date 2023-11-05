import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    interface RequestBody {
      email: string;
    }

    const { email } = req.body as RequestBody;

    const githubToken = env.GITHUB_PERSONAL_TOKEN;

    if (req.headers.key !== env.CODECOACH_KEY) {
      return res.status(401).json("Invalid key");
    }

    const config = {
      method: "POST",
      headers: {
        Authorization: `token ${githubToken}`,
      },
      body: JSON.stringify({
        role: "direct_member",
        email,
      }),
    };

    try {
      interface ApiResponse {
        message: string;
      }

      const request = await fetch(env.GITHUB_API_URL, config);
      const response = (await request.json()) as ApiResponse;

      return res.status(200).json({ message: `${email} added` });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json("An error occurred while adding the user to CodeCoachJS");
    }
  }
}
