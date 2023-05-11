import type { PostgrestResponse } from "@supabase/supabase-js";

import { supabase } from "~/pages/api/trpc/[trpc]";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface Video {
  url: string;
  description: string;
  created_at: string;
  thumbnail_url?: string;
  isPublic: boolean;
}

export const videos = createTRPCRouter({
  getVideos: publicProcedure.query(async (): Promise<Video[]> => {
    const { data, error }: PostgrestResponse<Video> = await supabase
      .from("videos")
      .select("*")
      .order("isPublic", { ascending: false })
      .select("*");

    if (error) {
      throw error;
    }

    const videos: Video[] = data
      ? await Promise.all(
          data.map(async (video: Video) => {
            try {
              const res = await fetch(
                `https://www.loom.com/v1/oembed?url=${video.url}`
              );
              const json = (await res.json()) as { thumbnail_url: string };

              return { ...video, thumbnail_url: json.thumbnail_url };
            } catch (e) {
              return video;
            }
          })
        )
      : [];

    return videos;
  }),
});
