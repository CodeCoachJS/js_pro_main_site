import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions } from "next-auth";
import type { DefaultSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import type { GithubProfile } from "next-auth/providers/github";
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
      name: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface Profile {
    id: string;
    image?: string;
    login?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    profile: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      login?: string;
    };
  }
}

async function _checkOrgMembership(
  org: { name: string; token: string },
  userName: string
): Promise<boolean> {
  const url = `https://api.github.com/orgs/${org.name}/members/${userName}`;

  const headers = new Headers({
    Authorization: `Bearer ${org.token}`,
    Accept: "application/vnd.github+json",
  });

  try {
    const response = await fetch(url, { headers });
    return response.ok; // Returns true if the member exists in org
  } catch (error) {
    console.error(`Failed to check membership for ${org.name}`);
    return false; // Continue checking other orgs
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/require-await
    jwt: async ({ profile, token }) => {
      console.log({ profile, token });
      if (profile?.login) {
        token.profile = {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.image,
          login: profile.login,
        };
      }
      return token;
    },

    session: async ({ session, token }) => {
      console.log({ session, token });
      const ORG_TOKENS = [
        { name: "CodeCoachJS", token: env.GITHUB_PERSONAL_TOKEN },
        { name: "projectshft", token: env.GITHUB_PARSITY_TOKEN },
      ];

      const loginName = token.profile.login ?? "";

      const results = await Promise.allSettled(
        ORG_TOKENS.map((org) =>
          _checkOrgMembership(org, loginName).catch((e) => {
            console.error(e);
            console.error(`Failed to check membership for ${org.name}`);
            return false;
          })
        )
      );

      console.info({ results });

      const isMember = results.some(
        (result) => result.status === "fulfilled" && result.value
      );

      // If we're in development, we'll just assume the user is a member.
      if (process.env.NODE_ENV === "development") {
        return { ...session, isMember: true };
      }
      return { ...session, isMember };
    },
  },

  providers: [
    GitHubProvider<GithubProfile>({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      profile(profile: GithubProfile) {
        console.log({ profile }, "profile");
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          login: profile.login,
        };
      },
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
