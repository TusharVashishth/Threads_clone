import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import vine, { errors } from "@vinejs/vine";
import { CustomErrorReporter } from "@/validators/CustomErrorReporter";
import prisma from "@/DB/db.config";
import { commentSchema } from "@/validators/commentSchema";

export async function GET(request: NextRequest) {
  // * Add Notification
  try {
    await prisma.notification.create({
      data: {
        user_id: Number(3),
        toUser_id: Number(2),
        content: "Commented on your post",
      },
    });

    return NextResponse.json({ status: 200, message: "Notification added" });
  } catch (error) {
    console.log("The error is", error);
    return NextResponse.json({ status: 400, error });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ status: 401, message: "Un-Authorized" });
    }
    const data = await request.json();

    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(commentSchema);
    const payload = await validator.validate(data);

    // * Increase the post comment count
    await prisma.post.update({
      where: {
        id: Number(payload.post_id),
      },
      data: {
        comment_count: {
          increment: 1,
        },
      },
    });

    // * Add Notification
    try {
      await prisma.notification.create({
        data: {
          user_id: Number(session?.user?.id),
          toUser_id: Number(payload.toUser_id),
          content: "Commented on your post",
        },
      });
    } catch (error) {
      console.log("The error is", error);
    }

    await prisma.comment.create({
      data: {
        post_id: Number(payload.post_id),
        content: payload.content,
        user_id: Number(session?.user?.id),
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Comment added successfully!",
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}
