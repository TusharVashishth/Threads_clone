import CommentCard from "@/components/common/CommentCard";
import PostCard from "@/components/common/PostCard";
import DynamicNavbar from "@/components/common/DyanmicNavBar";
import { fetchPost } from "@/lib/serverMethods";
import React from "react";

export default async function ShowPost({ params }: { params: { id: number } }) {
  const post = await fetchPost(params.id);

  return (
    <div>
      <DynamicNavbar title="Show Post" />
      {post && (
        <div className="mt-7">
          <PostCard post={post} noRedirect={true} />
        </div>
      )}

      <div className="mt-5">
        <h1 className="font-bold text-lg mb-5">Comments</h1>

        {post?.Comment ? (
          <div>
            {post.Comment.map((item: CommentType) => (
              <CommentCard comment={item} key={item.id} />
            ))}
          </div>
        ) : (
          <div>No Comments Found</div>
        )}
      </div>
    </div>
  );
}
