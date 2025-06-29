import type { PostgrestResponse } from "@supabase/supabase-js";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

interface Video {
  url: string;
  description: string;
  created_at: string;
  thumbnail_url?: string;
  isPublic: boolean;
}

export type WeeklyVideo = Omit<Video, "isPublic" | "thumbnail_url">;

export const videos = createTRPCRouter({
  getWeeklyMeetings: protectedProcedure.query(
    async ({ ctx }): Promise<WeeklyVideo[]> => {
      if (!ctx.supabase) {
        throw new Error("Supabase client not available");
      }

      const { data, error }: PostgrestResponse<WeeklyVideo> = await ctx.supabase
        .from("weekly_meetups")
        .select("*")
        .order("created_at", { ascending: false })
        .select("*");

      if (error) {
        throw error;
      }

      return data;
    },
  ),
  getVideos: publicProcedure.query(async ({ ctx }): Promise<Video[]> => {
    if (!ctx.supabase) {
      throw new Error("Supabase client not available");
    }

    const { data, error }: PostgrestResponse<Video> = await ctx.supabase
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
                `https://www.loom.com/v1/oembed?url=${video.url}`,
              );
              const json = (await res.json()) as { thumbnail_url: string };

              return { ...video, thumbnail_url: json.thumbnail_url };
            } catch (e) {
              return video;
            }
          }),
        )
      : [];

    return videos;
  }),
});
