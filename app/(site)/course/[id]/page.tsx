import Button from "@/app/(components)/Button/Button";
import getCourseById from "@/app/actions/getCourseById";
import myUser from "@/app/actions/getUser";
import useBasket from "@/app/hooks/useBasket";
import React from "react";
import Individual from "../Individual";
import { SafeUser } from "@/app/types";

interface paramsProps {
  id?: string;
}
interface Props {
  author?: string;
  price?: string;
  imageSrc?: string;
  name?: string;
  description?: string | null;
  courseId: any;
  currentUser: SafeUser | null;
}
const page = async ({ params }: { params: paramsProps }) => {
  const course = await getCourseById(params);
  const { id, name, author, price, description, imageSrc } = course;

  const currentUser = await myUser();

  return (
    <Individual
      id={id}
      name={name}
      author={author}
      price={price}
      description={description}
      imageSrc={imageSrc}
      currentUser={currentUser}
    />
  );
};

export default page;
