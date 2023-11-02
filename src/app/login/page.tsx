"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  const handelLogin = async (e: any) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const password = e.target[1].value;
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        userName,
        password,
        redirect: false,
      });
      setLoading(false);
      if (res?.error) return setErr(res.error);
      router.replace("/");
    } catch (error: any) {
      setLoading(false);
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
          <button
            className="border rounded-lg w-2/5 m-auto border-orange-300 bg-slate-700"
            disabled={loading}
            style={{ opacity: loading ? 0.5 : 1 }}
          >
            Login
          </button>
        </form>
        {err && <span className="block mt-7 text-red-500 text-sm">{err}</span>}
      </div>
    </div>
  );
};

export default Login;
