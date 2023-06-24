"use client";

import { MdOutlineShoppingCart } from "react-icons/md";

import Link from "next/link";
import React, { useState } from "react";
import { User } from "@prisma/client";
import { SafeUser } from "@/app/types";
import UserMenu from "./UserMenu";

interface UserMenuProps {
  myUser: SafeUser | null;
}

export const Navbar = ({ myUser }: UserMenuProps) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  const onSearch = () => {};

  return (
    <div className="shadow-xl bg-white z-[99999] sticky">
      <div className="p-3 px-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-6 flex-1 relative">
            <Link href="#">
              <img src="/logo.svg" alt="Logo" width={91} height={34} />
            </Link>

            <form className="lg:flex-1 lg:flex hidden" onSubmit={onSearch}>
              <input
                type="text"
                placeholder="Search for anything ..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 font-light bg-white rounded-full border-black border-[1px] outline-none"
              />
            </form>
          </div>

          <div className="items-center gap-4 text-[.8rem] px-2 hidden lg:flex">
            <div>
              <Link href="#">Udemy Business</Link>
            </div>

            <div>
              <a href={myUser ? "/create" : "/login"}>Teach on Udemy</a>
            </div>

            <div className="relative">
              <Link href="/basket">
                <MdOutlineShoppingCart className="h-6 w-10" />
              </Link>
              <div className="absolute -right-1 -bottom-2 bg-blue-500 rounded-full w-6 h-6 flex justify-center items-center text-white">
                3
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!myUser && (
              <>
                <div>
                  <Link
                    href="/login"
                    className="py-2 px-6 border-black border-[1px]"
                  >
                    Login
                  </Link>
                </div>

                <div>
                  <Link
                    href="/register"
                    className="py-2 px-6 bg-black text-white border-[1px] border-black "
                  >
                    Sign up
                  </Link>
                </div>
              </>
            )}

            {myUser && (
              <div
                className="w-[40px] h-[40px] rounded-full bg-black flex items-center justify-center text-white cursor-pointer"
                onClick={() => setUserMenuOpen((prev) => !prev)}
              >
                <span>{myUser.name?.at(0)?.toUpperCase()}</span>
                <span>{myUser.name?.at(1)?.toUpperCase()}</span>
              </div>
            )}

            {userMenuOpen && (
              <div className="absolute bottom-0 top-20 right-20">
                <UserMenu currentUser={myUser} closeUserMenu={closeUserMenu} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
