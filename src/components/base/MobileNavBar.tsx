"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import Link from "next/link";
import SideBarLinks from "../common/SideBarLinks";
import { HammerIcon, Menu, User2 } from "lucide-react";

export default function MobileNavBar() {
  return (
    <nav className="md:hidden flex justify-between items-center">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger>
            <Menu height={30} width={30} className="font-bold" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <div className="flex justify-start items-center">
                  <Image
                    src="/images/logo.svg"
                    width={50}
                    height={50}
                    alt="logo"
                  />
                  <h1 className="font-bold text-xl ml-2">Threads</h1>
                </div>
              </SheetTitle>
              <SheetDescription>
                <SideBarLinks />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="">
        <Image src="/images/logo.svg" width={30} height={30} alt="Logo" />
      </div>
      <Link href="/profile">
        <User2 height={25} width={25} />
      </Link>
    </nav>
  );
}
