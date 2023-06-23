import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "../libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}
// This function is to get the current user.
export default async function myUser() {
  try {
    const session = await getSession();

    // if we do not get sessions, return null
    if (!session?.user?.email) {
      return null;
    }

    // if we get sessions, return currentUser
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });
    if (!currentUser) {
      return null;
    }
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
