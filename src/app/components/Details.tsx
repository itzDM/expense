"use client";
import React from "react";
import Detail from "./Detail";
interface dataType {
  _id: string;
  paidTo: string;
  by: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
}
const Details = ({ data }: { data: [] }) => {
  return (
    <main className=" h-[75vh] overflow-scroll   scroll-smooth border-t-[1px] ">
      {data?.length == 0 ? (
        <h2 className="text-center mt-4">No Record Found</h2>
      ) : (
        data?.map((item: dataType) => <Detail item={item} key={item._id} />)
      )}
    </main>
  );
};

export default Details;
