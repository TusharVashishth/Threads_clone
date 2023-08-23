"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PostUserBar from "../common/PostUserBar";
import { useSession } from "next-auth/react";
import UserAvatar from "../common/UserAvatar";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { MessageCircle } from "lucide-react";

export default function AddComment({ post }: { post: PostType }) {
  const { data } = useSession();
  const { toast } = useToast();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<PostErrorType>({});

  const submit = () => {
    setLoading(true);
    const data = {
      content: content,
      post_id: post.id.toString(),
      toUser_id: post.user_id.toString(),
    };
    axios
      .post("/api/comment", data)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 200) {
          setContent("");
          setErrors({});
          toast({
            title: "Success",
            description: response.message,
            className: "bg-green-400",
          });
        } else if (response.status == 400) {
          setErrors(response.errors);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("The error is", err);
      });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <MessageCircle width={20} height={20} className="ml-3" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Comment</DialogTitle>
          <DialogDescription>
            <div className="mt-5">
              <PostUserBar post={post} />
              <div className="ml-12 mt-[-10px]">{post.content}</div>
            </div>
            <div className="flex justify-start items-start mt-6">
              <UserAvatar name={data?.user?.name ?? "T"} image="" />
              <textarea
                className="w-full h-24 text-md p-2 bg-background outline-none  resize-none rounded-lg placeholder:font-normal ml-2"
                placeholder="Type somthing great...."
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </div>
            <span className="text-red-400 font-bold ml-12">
              {errors?.content}
            </span>

            <div className="mt-5 text-right">
              <Button size="sm" disabled={loading} onClick={submit}>
                {loading ? "Processing..." : "Post Comment"}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
