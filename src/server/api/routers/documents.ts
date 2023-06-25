import type { PostgrestResponse } from "@supabase/supabase-js";

import { supabase } from "~/pages/api/trpc/[trpc]";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

interface Document {
  url: string;
  description: string;
  created_at: string;
  name: string;
}

export const documents = createTRPCRouter({
  getDocuments: protectedProcedure.query(async (): Promise<Document[]> => {
    const { data, error }: PostgrestResponse<Document> = await supabase
      .from("documents")
      .select("*");

    if (error) {
      throw error;
    }

    return data;
  }),
});
