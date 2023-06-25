import myUser from "@/app/actions/getUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface paramsProps {
  id?: string;
}

export async function POST(
  request: Request,
  { params }: { params: paramsProps }
) {
  // In post request we have to add id in basketIds

  const currentUser = await myUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { id } = params;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid Id");
  }

  let basketIds = [...(currentUser.basketIds || [])];

  basketIds.push(id);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      basketIds,
    },
  });
  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: paramsProps }
) {
  // In delete, we need to first take the current user. Set the basketIds to the currentUser.basketIds. Filter in basketIds and return basketIds without that particular id.

  // At last update basketIds in USER in prisma.

  const currentUser = await myUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { id } = params;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid Id");
  }

  let basketIds = [...(currentUser.basketIds || [])];

  basketIds = basketIds.filter((id) => id !== id);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      basketIds,
    },
  });
  return NextResponse.json(user);
}
