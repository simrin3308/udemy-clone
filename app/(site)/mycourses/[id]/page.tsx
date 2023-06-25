import getCourseById from "@/app/actions/getCourseById";
import React from "react";
import UpdateCourseComponent from "./UpdateCourseComponent";

interface paramProps {
  id?: string;
}

export default async function page({ params }: { params: paramProps }) {
  const courses = await getCourseById(params);

  return (
    <div>
      <UpdateCourseComponent
        name={courses?.name}
        imageSrc={courses?.imageSrc}
        author={courses?.author}
        price={courses?.price}
        courseId={courses?.id}
        description={courses?.description}
      />
    </div>
  );
}
