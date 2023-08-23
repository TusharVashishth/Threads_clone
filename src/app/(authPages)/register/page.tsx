"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import ThemeToggleBtn from "@/components/common/ThemeToggleBtn";

export default function Register() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthStateType>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    username: "",
  });
  const [errors, setErrors] = useState<AuthErrorType>({});
  const [loading, setLoading] = useState<boolean>(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post("/api/auth/register", authState)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 400) {
          setErrors(response.errors);
        } else if (response.status == 200) {
          router.push(`/login?message=${response.message}`);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("The error is", err);
      });
  };

  return (
    <div className="bg-background">
      <div className=" h-screen w-screen flex justify-center items-center">
        <div className="w-full lg:w-1/3 bg-muted p-6 rounded-lg">
          <div className="flex justify-center">
            <Image src="/images/logo.svg" width={50} height={50} alt="Logo" />
          </div>
          <form onSubmit={submit}>
            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">Register</h1>
                  <p>Welcome to the threads</p>
                </div>
              </div>

              <div className="mt-5">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Type your name.."
                  onChange={(event) =>
                    setAuthState({ ...authState, name: event.target.value })
                  }
                />
                <span className="text-red-400 font-bold">{errors.name}</span>
              </div>
              <div className="mt-5">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Type your unique username"
                  onChange={(event) =>
                    setAuthState({ ...authState, username: event.target.value })
                  }
                />
                <span className="text-red-400 font-bold">
                  {errors.username}
                </span>
              </div>
              <div className="mt-5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Type your email.."
                  onChange={(event) =>
                    setAuthState({ ...authState, email: event.target.value })
                  }
                />
                <span className="text-red-400 font-bold">{errors.email}</span>
              </div>
              <div className="mt-5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Type your password.."
                  onChange={(event) =>
                    setAuthState({ ...authState, password: event.target.value })
                  }
                />
                <span className="text-red-400 font-bold">
                  {errors.password}
                </span>
              </div>
              <div className="mt-5">
                <Label htmlFor="cpassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="cpassword"
                  placeholder="Confirm password.."
                  onChange={(event) =>
                    setAuthState({
                      ...authState,
                      password_confirmation: event.target.value,
                    })
                  }
                />
              </div>
              <div className="mt-5">
                <Button className="w-full" disabled={loading}>
                  {loading ? "Processing..." : "Register"}
                </Button>
              </div>
              <div className="mt-5">
                <span>Already Have an account ? </span>
                <Link href="/login" className="text-orange-300 font-bold">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
