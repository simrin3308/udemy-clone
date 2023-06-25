import getCurrentUserCourse from "@/app/actions/getCurrentUserCourse";
import myUser from "@/app/actions/getUser";
import MyCourseClient from "./myCourseClient";
import { safeCourse } from "@/app/types";

interface paramProps {
  id?: string;
}

const page = async ({ params }: { params: paramProps }) => {
  const { id } = params;
  const currentUser = await myUser();

  const courses = await getCurrentUserCourse();

  return (
    <div className="flex gap-6 px-12 py-8">
      {courses.map((item: safeCourse) => (
        <MyCourseClient data={item} currentUser={currentUser} key={item.id} />
      ))}
    </div>
  );
};

export default page;
