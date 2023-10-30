"use client";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

const Add = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const [err, setErr] = useState<string>();

  const router = useRouter();

  const handelSubmit = async (e: any) => {
    e.preventDefault();
    const paidTo = e.target[0].value.toLowerCase();
    const by = e.target[1].value.toLowerCase();
    const desc = e.target[2].value;
    const amount = parseInt(e.target[3].value);
    if (!amount) {
      setErr("Please Enter A Valid Amount");
      return;
    }
    const date = e.target[4].value;

    try {
      const res = await fetch("http://localhost:3000/api/expense", {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paidTo,
          by,
          amount,
          desc,
          date,
        }),
      });

      res.status === 201 && e.target.reset();
    } catch (error: any) {
      setErr(error.message);
    }
  };
  return (
    <div className="absolute  flex items-center justify-center top-0 right-0 left-0 bottom-0 m-auto  bg-[#202020f5] ">
      <div className="border rounded-md border-orange-300 text-center p-6 w-3/4 lg:w-2/4 top-0">
        <button
          className="border rounded-lg w-7 h-7  mb-4"
          onClick={() => setOpen(false)}
        >
          X
        </button>
        <form className="flex flex-col gap-4 w-full" onSubmit={handelSubmit}>
          <input
            className="p-2 border rounded-lg border-orange-300"
            type="text"
            placeholder="Type,Paid To"
            required
          />
          <input
            className="p-2 border rounded-lg border-orange-300"
            type="text"
            placeholder="By"
            required
          />
          <input
            className="p-2 border rounded-lg border-orange-300"
            type="text"
            placeholder="Description"
            required
          />
          <input
            className="p-2 border rounded-lg border-orange-300"
            type="text"
            placeholder="Amount"
            required
          />
          <input
            className="p-2 border rounded-lg border-orange-300"
            type="date"
            defaultValue={new Date().toJSON().slice(0, 10)}
          />
          <button className="border rounded-lg w-2/5 m-auto border-orange-300 bg-slate-700">
            ADD
          </button>
        </form>
        {err && <span className="block mt-7 text-red-500 text-sm">{err}</span>}
      </div>
    </div>
  );
};

export default Add;
