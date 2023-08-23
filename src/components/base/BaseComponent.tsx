import React, { Suspense } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { ScrollArea } from "../ui/scroll-area";
import MobileNavBar from "./MobileNavBar";
import Loading from "../common/loading";

export default async function BaseComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:container p-5">
      <div className="flex">
        <LeftSidebar />
        <ScrollArea className="h-screen w-full lg:w-2/4 md:w-3/4 lg:px-8 lg:py-4 xl:px-12  md:p-6">
          <MobileNavBar />
          {children}
        </ScrollArea>
        <Suspense fallback={<Loading />}>
          <RightSidebar />
        </Suspense>
      </div>
    </div>
  );
}
