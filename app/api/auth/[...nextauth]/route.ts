import NextAuth from "next-auth/next";
import prisma from "../../../libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";

export const authOptions:AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Sam@gmail.com" },
        password: { label: "Password", type: "password" },
        username: {
          label: "Username",
          type: "text",
          placeholder: "John Smith",
        },
      },
      async authorize(credentials) {
        // Check to see if email and password is there
        if (!credentials?.email || !credentials.password) {
          throw new Error("Please enter an Email and Password");
        }

        // If user actually exists in database
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // If no user found
        if (!user || !user?.hashedPassword) {
          throw new Error("No user Found");
        }

        // If user found, we need to check the password match. This can be done by bcrypt compare
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // If wrong password
        if (!passwordMatch) {
          throw new Error("Password did not match");
        }

        return user;
      },
    }),
  ],

  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
