import React, { Dispatch, SetStateAction, useState } from "react";
import useSWR from "swr";
import Add from "./Add";
import { useSession } from "next-auth/react";

interface propType {
  setSort: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<string>>;
}

const Filter = ({ setSort, setType }: propType) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/expense/expensetype`,
    fetcher
  );

  const session = useSession();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <main className="my-2 ">
      <div className="flex  justify-between  items-center ">
        <div>
          <select
            className="p-1 border border-sky-800  rounded mr-4"
            onChange={(e) => setType(e.target.value)}
            // defaultValue="ALL"
          >
            {data?.map((item: string) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className="p-1 border border-sky-800  rounded ml-4"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="createdAt,-1">Latest</option>
            <option value="amount,1">Low-High</option>
            <option value="amount,-1">High-Low</option>
          </select>
        </div>
        {session?.data?.user?.isAdmin && (
          <button
            className=" border rounded border-red-400 py-1 px-3 text-base bg-sky-950 text-white"
            type="button"
            onClick={() => setOpen(true)}
          >
            Add
          </button>
        )}
        {open && <Add setOpen={setOpen} />}
      </div>
    </main>
  );
};

export default Filter;
