"use client";

import React, { FormEvent, useState } from "react";
import ImageUpload from "../../(components)/Inputs/ImageUpload";

import Button from "@/app/(components)/Button/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface InitialValue {
  name: string;
  imageSrc: string;
  author: string;
  price: string;
  description: string;
}

const initialValue: InitialValue = {
  name: "",
  imageSrc: "",
  author: "",
  description: "",
  price: "",
};

const page = () => {
  const router = useRouter();
  const [course, setCourse] = useState(initialValue);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    axios
      .post("/api/course", course)
      .then(() => {
        router.push("/");
        toast.success("courses added successfully");
      })
      .catch((err) => {
        toast.error("Something went wrong");
        throw new Error(err);
      });
  };

  // on change on image upload
  const setCustomValue = (id: any, value: any) => {
    setCourse((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="flex justify-center">
      <form
        className="w-[600px] h-[700px] py-12 flex flex-col items-center gap-4"
        onSubmit={submitHandler}
      >
        <div className="w-[500px]">
          <ImageUpload
            value={course.imageSrc}
            onChange={(value) => setCustomValue("imageSrc", value)}
          />
        </div>

        <div className="flex flex-col gap-2 py-4">
          <input
            id="name"
            placeholder="Name"
            name="name"
            type="text"
            required
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <input
            id="name"
            name="name"
            type="text"
            placeholder="author"
            required
            value={course.author}
            onChange={(e) => setCourse({ ...course, author: e.target.value })}
            className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <input
            id="description"
            name="description"
            type="text"
            placeholder="description"
            required
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <input
            id="price"
            name="price"
            type="number"
            placeholder="price"
            required
            value={course.price}
            onChange={(e) => setCourse({ ...course, price: e.target.value })}
            className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <Button label="Submit" type="Submit" />
      </form>
    </div>
  );
};

export default page;
