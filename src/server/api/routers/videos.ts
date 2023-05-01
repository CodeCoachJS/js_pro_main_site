import type { PostgrestResponse } from "@supabase/supabase-js";

import { supabase } from "~/pages/api/trpc/[trpc]";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface Video {
  url: string;
  description: string;
  created_at: string;
}

export const videos = createTRPCRouter({
  getVideos: publicProcedure.query(async (): Promise<Video[]> => {
    const { data, error }: PostgrestResponse<Video> = await supabase
      .from("videos")
      .select("*");

    if (error) {
      throw error;
    }

    return data;
  }),
});
