import DyanmicNavBar from "@/components/common/DyanmicNavBar";
import UserAvatar from "@/components/common/UserAvatar";
import { fetchNotifications } from "@/lib/serverMethods";
import { formateDate } from "@/lib/utils";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Notification",
  description: "Find your all notifications and who commented on your post.",
  openGraph: {
    title: "Search your notification",
  },
};

export default async function Notifications() {
  const notifications: Array<NotificationType> | [] =
    await fetchNotifications();
  return (
    <div>
      <DyanmicNavBar title="Notifications" />

      <div className="mt-5 w-full">
        {notifications &&
          notifications.length > 0 &&
          notifications.map((item) => (
            <div
              key={item.id}
              className="flex  items-start space-x-5 mb-3 w-full"
            >
              <UserAvatar name={item.user.name} image="" />
              <div className=" w-full">
                <div className="flex justify-between w-full items-center">
                  <p className="font-bold text-xl">{item.user.name}</p>
                  <span className="text-sm">
                    {formateDate(item.created_at)}
                  </span>
                </div>
                <p className="text-md">{item.content}</p>
              </div>
            </div>
          ))}
        {notifications && notifications.length < 1 && (
          <div className="text-center">
            <h1>No Notifications found!</h1>
          </div>
        )}
      </div>
    </div>
  );
}
