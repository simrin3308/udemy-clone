import myUser from "@/app/actions/getUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await myUser();

  if (!currentUser) {
    console.log("No permission, no user registered");
  }

  const body = await request.json();

  const { name, author, imageSrc, description, price } = body;

  const course = await prisma.course.create({
    data: {
      name,
      author,
      imageSrc,
      description,
      price,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(course);
}
