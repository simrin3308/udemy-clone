import prisma from "../libs/prismadb";

export default async function getAllCourses(params: any) {
  try {
    const { result } = params;

    let query: any = {};
    if (result) {
      query.name = {
        contains: result,
      };
    }

    const allCourses = await prisma.course.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeCourse = allCourses.map((course: any) => ({
      ...course,
      createdAt: course.createdAt.toISOstring,
    }));

    return safeCourse;
  } catch (error: any) {
    throw new Error(error);
  }
}
