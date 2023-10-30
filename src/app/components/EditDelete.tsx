import React, { Dispatch, SetStateAction, useState } from "react";
interface dataType {
  _id: string;
  paidTo: string;
  by: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
}
const EditDelete = ({
  setOpen,
  item,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  item: dataType;
}) => {
  const [err, setErr] = useState<string>();

  const handelUpdate = async (e: any, id: string) => {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/expense`, {
        method: "PUT",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          paidTo,
          by,
          amount,
          desc,
          createdAt: date,
        }),
      });
      if (!res.ok) {
        setErr(res.statusText);
        return;
      }

      res.status === 201 && setOpen(false);
    } catch (error: any) {
      setErr(error.message);
    }
  };
  const handelDelete = async (e: any, id: string) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/expense`, {
        method: "DELETE",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
        }),
      });

      if (!res.ok) {
        setErr(res.statusText);
        return;
      }
      res.status === 201 && setOpen(false);
    } catch (error: any) {
      setErr(error.message);
    }
  };
  
  return (
    <div className="absolute  flex items-center justify-center top-0 right-0 left-0 bottom-0 m-auto  bg-[#202020f5] ">
      <div className="border rounded-md border-orange-300 text-center p-6 w-3/4 lg:w-2/4 top-0">
        <div className="flex items-center justify-between mb-3">
          <button
            className="border rounded-lg border-orange-400 bg-red-500 p-1"
            onClick={(e) => handelDelete(e, item._id)}
          >
            Delete
          </button>
          <button
            className="border rounded-lg w-7 h-7 "
            onClick={() => setOpen(false)}
          >
            X
          </button>
        </div>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={(e) => handelUpdate(e, item._id)}
        >
          <input
            className="p-2 border rounded-lg border-orange-300"
            type="text"
            placeholder="Type,Paid To"
            defaultValue={item.paidTo}
            required
          />
          <input
            className="p-2 border rounded-lg border-orange-300"
            type="text"
            placeholder="By"
            defaultValue={item.by}
            required
          />
          <input
            className="p-2 border rounded-lg border-orange-300"
            type="text"
            placeholder="Description"
            defaultValue={item.desc}
            required
          />
          <input
            className="p-2 border rounded-lg border-orange-300"
            type="text"
            defaultValue={item.amount}
            placeholder="Amount"
          />
          <input
            className="p-2 border rounded-lg border-orange-300"
            type="date"
            defaultValue={item.createdAt.slice(0, 10)}
          />
          <button className="border rounded-lg w-2/5 m-auto border-orange-300 bg-slate-700">
            Update
          </button>
        </form>
        {err && <span className="block mt-7 text-red-500 text-sm">{err}</span>}
      </div>
    </div>
  );
};

export default EditDelete;
