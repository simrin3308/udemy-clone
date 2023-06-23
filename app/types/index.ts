import { Course, User } from "@prisma/client";

export type SafeUser = Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
  promise?: any;
};

export type safeCourse = Omit<Course, "createdAt"> & {
  createdAt: string;
};
