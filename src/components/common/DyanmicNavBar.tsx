"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { MoveLeft } from "lucide-react";

export default function DyanmicNavBar({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div>
      <div className="flex space-x-10">
        <MoveLeft onClick={() => router.back()} className="cursor-pointer" />

        <h1 className="text-xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
