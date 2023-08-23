import vine from "@vinejs/vine";

export const commentSchema = vine.object({
  content: vine.string().trim().minLength(2),
  post_id: vine.string().trim(),
  toUser_id: vine.string().trim(),
});
