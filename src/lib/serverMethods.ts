import Env from "@/config/env";
import { headers } from "next/headers";
import { wait } from "./utils";

export async function fetchPosts(page: number) {
  const res = await fetch(`${Env.APP_URL}/api/post?page=${page}`, {
    cache: "no-cache",
    headers: headers(),
  });
  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }
  const response = await res.json();

  return response!.data;
}

export async function fetchUsers() {
  const res = await fetch(`${Env.APP_URL}/api/user`, {
    headers: headers(),
    next: {
      revalidate: 3600,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }
  const response = await res.json();
  return response?.data;
}

// * Fetch user posts
export async function fetchUserPosts() {
  const res = await fetch(`${Env.APP_URL}/api/user/post`, {
    headers: headers(),
    cache: "no-cache",
    next: {
      revalidate: 3600,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }
  const response = await res.json();
  return response!.data;
}

// * Fetch user comments
export async function fetchUserComments() {
  const res = await fetch(`${Env.APP_URL}/api/user/comment`, {
    headers: headers(),
    cache: "default",
    next: {
      revalidate: 3600,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }
  const response = await res.json();
  return response!.data;
}

// * display post
export async function fetchPost(id: number) {
  const res = await fetch(`${Env.APP_URL}/api/post/${id}`, {
    cache: "no-cache",
    headers: headers(),
  });
  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }
  const response = await res.json();
  return response?.data;
}

// * Fetch user Notifications
export async function fetchNotifications() {
  const res = await fetch(`${Env.APP_URL}/api/notifications`, {
    headers: headers(),
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }
  const response = await res.json();
  return response?.data;
}

// * Show user with their posts and comments
export async function fetchUser(id: number) {
  const res = await fetch(`${Env.APP_URL}/api/user/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }
  const response = await res.json();
  return response?.data;
}

// *  explore the users
export async function searchUser(query: string) {
  const res = await fetch(`${Env.APP_URL}/api/explore?query=${query}`, {
    cache: "no-cache",
    headers: headers(),
  });
  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }

  const response = await res.json();
  return response?.data;
}
