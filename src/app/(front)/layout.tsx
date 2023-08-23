import "../globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import CustomProvider from "../providers";
import BaseComponent from "@/components/base/BaseComponent";

export const metadata: Metadata = {
  title: "Threads App",
  description: "The Threads app to share your thoughts and much more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BaseComponent>{children}</BaseComponent>
        <Toaster />
      </ThemeProvider>
    </CustomProvider>
  );
}
