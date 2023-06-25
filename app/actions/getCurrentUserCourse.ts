import prisma from "../libs/prismadb";
import myUser from "./getUser";

export default async function getCurrentUserCourse() {
  const user = await myUser();

  const courses = await prisma.course.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const safeCourse = courses.map((course: any) => ({
    ...course,
    createdAt: course.createdAt.toDateString(),
  }));

  return safeCourse;
}
