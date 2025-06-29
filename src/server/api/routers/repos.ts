import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface Repo {
  id: number;
  name: string;
  description: string;
  url: string;
  created_at: string;
  updated_at: string;
  isPrivate: boolean;
  categories: string[];
}

export const repos = createTRPCRouter({
  getRepos: publicProcedure.query(({ ctx }): Repo[] => {
    if (!ctx.supabase) {
      throw new Error("Supabase client not available");
    }

    // Mock data that matches the expected interface
    return [
      {
        id: 1,
        name: "JavaScript Fundamentals",
        description: "Learn the basics of JavaScript programming",
        url: "https://github.com/example/js-fundamentals",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-15T00:00:00Z",
        isPrivate: false,
        categories: ["javascript", "beginner"],
      },
      {
        id: 2,
        name: "React Mastery",
        description: "Advanced React patterns and techniques",
        url: "https://github.com/example/react-mastery",
        created_at: "2023-02-01T00:00:00Z",
        updated_at: "2023-02-15T00:00:00Z",
        isPrivate: true,
        categories: ["react", "advanced"],
      },
    ];
  }),
});
