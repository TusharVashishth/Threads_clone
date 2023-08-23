"use client";
import { X } from "lucide-react";
import { Button } from "../ui/button";

export default function ImagePreviewCard({
  image,
  callback,
}: {
  image: string;
  callback: () => void;
}) {
  return (
    <div
      className="w-full h-72 bg-cover"
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="text-right mr-2">
        <Button size="icon" className="mt-2" onClick={callback}>
          <X />
        </Button>
      </div>
    </div>
  );
}
