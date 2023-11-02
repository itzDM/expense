"use client";

import DateCom from "./components/DateCom";
import Details from "./components/Details";
import Filter from "./components/Filter";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Total from "./components/Total";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Skelton from "./components/Skelton";

export default function Home() {
  // getStart Date  and ENd Date

  const session = useSession();

  const router = useRouter();

  //

  const date: Date = new Date();
  const startDateFormat =
    date.getFullYear() +
    "-" +
    ((date.getMonth() + 1).toString().length != 2
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    "01";

  const endDateFormat =
    date.getFullYear() +
    "-" +
    ((date.getMonth() + 1).toString().length != 2
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  // End OF

  const [startDate, setStartDate] = useState<string>(startDateFormat);
  const [endDate, setEndDate] = useState<string>(endDateFormat);
  const [sort, setSort] = useState<string>("createdAt,-1");
  const [type, setType] = useState<string>("ALL");

  // Fetch data
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/expense?startDate=${startDate}&endDate=${endDate}&cat=${type.toLowerCase()}&sort=${sort}`,
    fetcher,
    { refreshInterval: 1000 }
  );

  // End

  let total: number = 0;
  data?.map((item: any) => (total += item.amount));

  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session]);

  return (
    <div className=" mx-4 lg:mx-10">
      <h1 className="my-4 text-center">Your Monthly Expense is Here</h1>
      <div className="sticky top-0 ">
        <DateCom
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

        {isLoading || session?.status === "loading" ? (
          <Skelton />
        ) : (
          <div>
            <Filter
              setSort={setSort}
              setType={setType}
              startDate={startDate}
              endDate={endDate}
              type={type}
            />
            <Details data={data} /> <Total totalExpense={total} />
          </div>
        )}
      </div>
    </div>
  );
}
