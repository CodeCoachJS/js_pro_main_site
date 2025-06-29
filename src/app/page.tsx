import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import HomePage from "~/components/HomePage";
import { authOptions } from "~/server/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.isMember) {
    redirect("/challenges");
  }

  return <HomePage />;
}
