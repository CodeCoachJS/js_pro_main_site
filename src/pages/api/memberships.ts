/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { createAppAuth } from "@octokit/auth-app";
// import { Octokit } from "@octokit/rest";
import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from "../../env.mjs";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (req.headers.key === env.CODECOACH_KEY) {
      return res.json('correct key')
    }

    console.log(req.headers)
    return res.json('THE error')


  }
   

  }

      // const response = await octokit.request('POST /orgs/CodeCoachJS/invitations', {
      //   org: 'CodeCoachJS',
      //   email,
      //   role: 'direct_member',
      //   request: {
      //     headers: {
      //       'X-GitHub-Api-Version': '2022-11-28',
      //     },
      //   },
      // });

    //   return res.send({
    //     data: response.data,
    //   });
    // } catch (error) {
    //   console.error("Error:", error);
    //   return res.status(500).json({ error: "An error occurred" });
  //   }
  // }





