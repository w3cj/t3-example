import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Example <span className="text-[hsl(280,100%,70%)]">T3</span> App
      </h1>
      {session && (
        <div className="grid place-items-center">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="/posts"
          >
            <h3 className="text-2xl font-bold">View Posts →</h3>
            <div className="text-lg">View all of your posts in one place.</div>
          </Link>
        </div>
      )}
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl text-white">
          {hello ? hello.greeting : "Loading tRPC query..."}
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl text-white">
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </div>
    </>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const posts = await api.post.getAll();

  return (
    <div className="w-full max-w-xs">
      <CreatePost />
      {posts.length ? (
        <div className="mt-2 flex flex-col gap-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            >
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {post.name}
                </h5>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
}
