import React from "react";

import Link from "next/link";
import ThemeToggleBtn from "../common/ThemeToggleBtn";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Bell, Home, Search, User2 } from "lucide-react";
import SignOutBtn from "./SignOutBtn";

export default function SideBarLinks() {
  const pathname = usePathname();
  return (
    <ul className="mt-10">
      <li>
        <Link
          href="/"
          className={`flex justify-start items-center hover:font-bold ${
            pathname == "/" ? "font-bold" : ""
          }`}
        >
          <Home className="text-2xl " height={25} width={25} />
          <h3 className="text-lg lg:text-xl ml-2">Home</h3>
        </Link>
      </li>
      <li>
        <Link
          href="/explore"
          className={`flex justify-start items-center hover:font-bold mt-6 ${
            pathname == "/explore" ? "font-bold" : ""
          }`}
        >
          <Search className="text-2xl" height={25} width={25} />
          <h3 className="text-lg lg:text-xl ml-2">Explore</h3>
        </Link>
      </li>
      <li>
        <Link
          href="/notifications"
          className={`flex justify-start items-center hover:font-bold mt-6 ${
            pathname == "/notifications" ? "font-bold" : ""
          }`}
        >
          <Bell className="text-2xl" height={25} width={25} />
          <h3 className=" text-lg lg:text-xl  ml-2">Notifications</h3>
        </Link>
      </li>
      <li>
        <Link
          href="/profile"
          className={`flex justify-start items-center hover:font-bold mt-6 ${
            pathname == "/profile" ? "font-bold" : ""
          }`}
        >
          <User2 className="text-2xl" height={25} width={25} />
          <h3 className="text-lg lg:text-xl  ml-2">Profile</h3>
        </Link>
      </li>

      <li className="flex items-center justify-between absolute bottom-10">
        <SignOutBtn />
        <ThemeToggleBtn />
      </li>
    </ul>
  );
}
