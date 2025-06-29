import type { PostgrestResponse } from "@supabase/supabase-js";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

interface Document {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const documents = createTRPCRouter({
  getDocuments: protectedProcedure.query(
    async ({ ctx }): Promise<Document[]> => {
      if (!ctx.supabase) {
        throw new Error("Supabase client not available");
      }

      const { data, error }: PostgrestResponse<Document> = await ctx.supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    },
  ),
});
