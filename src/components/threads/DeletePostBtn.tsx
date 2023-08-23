"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeletePostBtn({ post }: { post: PostType }) {
  const { toast } = useToast();
  const router = useRouter();
  const deletePost = () => {
    axios
      .delete(`/api/post/${post.id}`)
      .then((res) => {
        const response = res.data;

        if (response.status == 401) {
          toast({
            title: "Error",
            description: "Un-Authorized",
            className: "bg-red-400",
          });
        } else if (response.status == 200) {
          toast({
            title: "Success",
            description: response.message,
            className: "bg-green-400",
          });
          router.refresh();
        }
      })
      .catch((err) => {
        console.log("The error is", err);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2
          height={22}
          width={22}
          className="cursor-pointer text-red-400"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-400" onClick={deletePost}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
