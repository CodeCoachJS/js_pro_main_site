import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { env } from "~/env.mjs";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    isMember: boolean;
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

interface GitHubOrgUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session }) => {
      const perPageAmount = 100;
      const url = `https://api.github.com/orgs/CodeCoachJS/members?per_page=${perPageAmount}`;
      const headers = new Headers({
        Authorization: `Bearer ${env.GITHUB_PERSONAL_TOKEN || "NO_TOKEN"}`,
        Accept: "application/vnd.github+json",
      });

      try {
        let shouldFetch = true;
        let page = 1;
        let isMember = false;

        while (shouldFetch) {
          const res = await fetch(`${url}&page=${page}`, { headers });
          const data: GitHubOrgUser[] = (await res.json()) as GitHubOrgUser[];

          if (res.ok) {
            isMember = data.some(
              (member) => member.avatar_url === session.user.image
            );

            if (isMember) {
              return { ...session, isMember };
            }

            if (data.length < perPageAmount) {
              shouldFetch = false;
            }
            page += 1;
          } else {
            throw new Error(`Failed to fetch members: ${res.statusText}`);
          }
        }
        return { ...session, isMember };
      } catch (error) {
        return { ...session, isMember: false };
      }
    },
  },

  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
