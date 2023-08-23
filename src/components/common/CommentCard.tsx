import React from "react";
import UserAvatar from "./UserAvatar";
import { formateDate } from "@/lib/utils";
import DeleteCommentBtn from "../threads/DeleteCommentBtn";

export default function CommentCard({
  comment,
  isAuthCard,
}: {
  comment: CommentType;
  isAuthCard?: boolean;
}) {
  return (
    <div className="mb-3">
      <div className="flex items-center space-x-4">
        <UserAvatar name={comment.user.name} image="" />
        <div className="bg-muted w-full rounded-lg p-4">
          <div className="flex justify-between items-start w-full">
            <p className="font-bold">{comment.user.name}</p>
            <div className="flex">
              <span className="mr-4 text-sm">
                {formateDate(comment.created_at)}
              </span>
            </div>
          </div>
          <div className="mt-4">{comment.content}</div>

          {isAuthCard && (
            <div className="flex justify-end mt-3">
              <DeleteCommentBtn comment={comment} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
