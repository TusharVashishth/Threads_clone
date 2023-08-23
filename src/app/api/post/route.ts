import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { CustomErrorReporter } from "@/validators/CustomErrorReporter";
import { postSchema } from "@/validators/postSchema";
import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { imagevalidator } from "@/validators/imageValidator";
import { join } from "path";
import { writeFile } from "fs/promises";
import { getRandomNumber } from "@/lib/utils";
import prisma from "@/DB/db.config";

export async function GET(request: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: "Un-Authorized" });
  }
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
      Likes: {
        take: 1,
        where: {
          user_id: Number(session?.user?.id),
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json({
    status: 200,
    data: posts,
  });
}

export async function POST(request: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ status: 401, message: "Un-Authorized" });
    }
    const formData = await request.formData();
    const data = {
      content: formData.get("content"),
      image: "",
    };
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(postSchema);
    const payload = await validator.validate(data);

    const image = formData.get("image") as Blob | null;
    // * IF image exist
    if (image) {
      const isImageNotValid = imagevalidator(image?.name, image?.size);
      if (isImageNotValid) {
        return NextResponse.json({
          status: 400,
          errors: {
            content: isImageNotValid,
          },
        });
      }

      // * Upload image if all good
      try {
        const buffer = Buffer.from(await image!.arrayBuffer());
        const uploadDir = join(process.cwd(), "public", "/uploads");
        const uniqueNmae = Date.now() + "_" + getRandomNumber(1, 999999);
        const imgExt = image?.name.split(".");
        const filename = uniqueNmae + "." + imgExt?.[1];
        await writeFile(`${uploadDir}/${filename}`, buffer);
        data.image = filename;
      } catch (error) {
        return NextResponse.json({
          status: 500,
          message: "Something went wrong.Please try again later.",
        });
      }
    }

    // * create post in DB
    await prisma.post.create({
      data: {
        content: payload.content,
        user_id: Number(session.user?.id),
        image: data.image ?? null,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Post created successfully!",
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
