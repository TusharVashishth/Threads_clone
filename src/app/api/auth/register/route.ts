import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { CustomErrorReporter } from "@/validators/CustomErrorReporter";
import { registerSchema } from "@/validators/authSchema";
import prisma from "@/DB/db.config";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(registerSchema);
    const payload = await validator.validate(body);

    // * Check email if it already exist
    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
      },
    });

    if (isEmailExist) {
      return NextResponse.json({
        status: 400,
        errors: {
          email: "Email already taken. please use another email.",
        },
      });
    }

    // * Check username if it already exist
    const isUsernameExist = await prisma.user.findUnique({
      where: {
        username: payload.username,
      },
      select: {
        id: true,
      },
    });

    if (isUsernameExist) {
      return NextResponse.json({
        status: 400,
        errors: {
          username: "Username already taken. please use another email.",
        },
      });
    }

    // * Encrypt the password
    const salt = bcrypt.genSaltSync(10);
    payload.password = bcrypt.hashSync(payload.password, salt);

    await prisma.user.create({ data: payload });
    return NextResponse.json({
      status: 200,
      message: "Account created successfully.Please login into your account!",
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
