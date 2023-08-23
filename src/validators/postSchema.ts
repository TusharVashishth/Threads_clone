import vine from "@vinejs/vine";

export const postSchema = vine.object({
  content: vine.string().trim().minLength(2),
});
