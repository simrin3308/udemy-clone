import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, password } = body;

  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    return new NextResponse("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });
  return NextResponse.json(user);
}
