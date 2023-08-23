import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function bytesToMB(bytes: number): number {
  const MB = 1048576;
  return bytes / MB;
}

export function getRandomNumber(min: number, max: number): string {
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

export function formateDate(date: string): string {
  return moment(date).fromNow();
}

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
