import { redirect } from "next/navigation";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Posts() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  const posts = await api.post.getAll();

  return (
    <>
      <div className="grid place-items-center">
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          href="/"
        >
          <h3 className="text-2xl font-bold">Go Home →</h3>
        </Link>
      </div>
      <div className="w-full max-w-xs">
        <CreatePost />
        {posts.length ? (
          <div className="mt-2 flex flex-col gap-2">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4"
              >
                <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {post.name}
                </h5>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no posts yet.</p>
        )}
      </div>
    </>
  );
}
