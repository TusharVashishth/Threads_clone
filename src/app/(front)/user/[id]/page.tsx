import DyanmicNavBar from "@/components/common/DyanmicNavBar";
import UserProfileAvatar from "@/components/common/UserProfileAvatar";
import { fetchUser } from "@/lib/serverMethods";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/common/PostCard";
import CommentCard from "@/components/common/CommentCard";

export default async function ShowUser({ params }: { params: { id: number } }) {
  const user: ShowUserType | undefined = await fetchUser(params.id);
  return (
    <div>
      <DyanmicNavBar title="Show User" />
      <div>
        {user && (
          <div className="flex items-center space-x-4 mt-5">
            <div>
              <UserProfileAvatar name={user.name} image="" />
            </div>
            <div>
              <h1 className="text-2xl font-bold ">{user.name}</h1>
              <p className="text-md text-orange-300 ">@{user.username}</p>
              <h1 className="text-xl">{user.email}</h1>
            </div>
          </div>
        )}

        <div className="mt-10 ">
          <Tabs defaultValue="post" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="post" className="w-full">
                Posts
              </TabsTrigger>
              <TabsTrigger value="comment" className="w-full">
                Comments
              </TabsTrigger>
            </TabsList>
            <TabsContent value="post">
              <div className="mt-5">
                {user?.Post &&
                  user.Post.map((item) => <PostCard post={item} />)}

                {user?.Post && user.Post.length < 1 && (
                  <h1 className="text-center mt-5">No Post Found</h1>
                )}
              </div>
            </TabsContent>
            <TabsContent value="comment">
              <div className="mt-5">
                {user?.Comment &&
                  user.Comment.map((item) => <CommentCard comment={item} />)}

                {user?.Comment && user.Comment.length < 1 && (
                  <h1 className="text-center mt-5">No Comment found</h1>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
