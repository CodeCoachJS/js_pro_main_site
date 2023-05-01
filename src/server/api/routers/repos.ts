import type { PostgrestResponse } from "@supabase/supabase-js";

import { supabase } from "~/pages/api/trpc/[trpc]";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface Category {
  category: {
    name: string;
  };
}

interface Repo {
  id: number;
  name: string;
  url: string;
  description: string;
  updated_at: string;
  isPrivate: boolean;
  repo_categories: Category[];
}

interface RepoWithCategories extends Repo {
  categories: string[];
}

export const repos = createTRPCRouter({
  getRepos: publicProcedure.query(async (): Promise<RepoWithCategories[]> => {
    const { data, error }: PostgrestResponse<Repo> = await supabase
      .from("repos")
      .select(
        `
      id,
      name,
      url,
      description,
      updated_at,
      isPrivate,
      repo_categories (
        category: categories ( name )
      )
      sort: updated_at, desc
    `
      );

    if (error) {
      throw error;
    }

    const transformedData: RepoWithCategories[] =
      data.map((repo): RepoWithCategories => {
        const categories: string[] = repo.repo_categories.map(
          (category: Category) => {
            return category.category.name;
          }
        );
        return { ...repo, categories } as RepoWithCategories;
      }) || [];

    return transformedData;
  }),
});
