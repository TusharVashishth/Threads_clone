"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";
import ThemeToggleBtn from "@/components/common/ThemeToggleBtn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const params = useSearchParams();
  const router = useRouter();
  const { status } = useSession();
  const [authState, setAuthState] = useState<AuthStateType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<AuthErrorType>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/");
    }
  }, [status]);

  const login = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/login", authState)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 200) {
          signIn("credentials", {
            email: authState.email,
            password: authState.password,
            callbackUrl: "/",
            redirect: true,
          });
        } else if (response.status == 400) {
          setErrors(response.errors);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("the error is", err);
      });
  };

  return (
    <div className="bg-background">
      <div className=" h-screen w-screen flex justify-center items-center">
        <div className="w-full mx-2 md:w-1/3 md:mx-0 bg-muted p-6 rounded-lg">
          <div className="flex justify-center">
            <Image src="/images/logo.svg" width={50} height={50} alt="Logo" />
          </div>
          {params.get("message") ? (
            <div className="bg-green-300 p-5 rounded-lg font-bold my-4 text-black">
              <strong>Success!</strong> {params.get("message")}
            </div>
          ) : (
            <></>
          )}
          <form onSubmit={login}>
            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">Login</h1>
                  <p>Welcome back</p>
                </div>
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
                <span className="text-red-400 font-bold">{errors?.email}</span>
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
                  {errors?.password}
                </span>
              </div>
              <div className="mt-5">
                <Button className="w-full" disabled={loading}>
                  {loading ? "Processing ..." : "Login"}
                </Button>
              </div>
              <div className="mt-5">
                <span>Don't Have an account ? </span>
                <Link href="/register" className="text-orange-300 font-bold">
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
