"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [err, setErr] = useState(null);
  const { status } = useSession();
  const router = useRouter();

  const handelLogin = async (e: any) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const password = e.target[1].value;
    try {
      signIn("credentials", { userName, password, redirect: false }).then(
        ({ ok, error }) => {
          if (ok) {
            router.push("/");
          } else {
            setErr(error);
          }
        }
      );
    } catch (error: any) {
      console.log(error);
      setErr(error.message);
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="border rounded border-orange-300 text-center p-6 ">
        <form className="flex flex-col gap-5 " onSubmit={handelLogin}>
          <h2 className="text-orange-500 font-semibold">Login</h2>
          <input
            className="p-2 border rounded-lg border-orange-300"
            type="text"
            placeholder="username"
            name="userName"
            required
          />
          <input
            className="p-2 border rounded-lg border-orange-300"
            type="password"
            placeholder="password"
            name="password"
            required
          />
          <button className="border rounded-lg w-2/5 m-auto border-orange-300 bg-slate-700">
            Login
          </button>
        </form>
        {err && <span className="block mt-7 text-red-500 text-sm">{err}</span>}
      </div>
    </div>
  );
};

export default Login;
