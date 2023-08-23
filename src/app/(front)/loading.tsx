import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center my-5">
      <div className="animate-spin w-20 h-20 border-t-4 border-b-4  border-orange-400 rounded-full"></div>
    </div>
  );
}
