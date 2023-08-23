import Image from "next/image";
import { fetchPosts } from "@/lib/serverMethods";
import AddThread from "@/components/threads/AddThread";
import PostCard from "@/components/common/PostCard";
import { Suspense } from "react";
import Loading from "@/components/common/loading";

export default async function Home() {
  const posts: Array<PostType> | [] = await fetchPosts(1);
  return (
    <div>
      <div className="flex justify-center items-center">
        <Image
          src="/images/logo.svg"
          width={50}
          height={50}
          alt="Logo"
          className="hidden md:block"
        />
      </div>
      <AddThread />
      <Suspense fallback={<Loading />}>
        <div className="mt-10">
          {posts.map((item) => (
            <PostCard post={item} key={item.id} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
