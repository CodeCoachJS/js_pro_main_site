import { supabase } from "~/pages/api/trpc/[trpc]";
import type { PostgrestResponse } from "@supabase/supabase-js";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface Repo {
  id: number;
  name: string;
  url: string;
  description: string;
  updated_at: string;
  isPrivate: boolean;
}

export const repos = createTRPCRouter({
  getRepos: publicProcedure.query(async (): Promise<Repo[]> => {
    const { data, error }: PostgrestResponse<unknown> = await supabase
      .from("repos")
      .select("*");

    if (error) {
      throw error;
    }
    return data as Repo[];
  }),
});
