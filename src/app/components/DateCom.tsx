import React, { Dispatch, SetStateAction } from "react";

interface propType {
  startDate: string;
  endDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
}
const Date = ({ startDate, setStartDate, setEndDate, endDate }: propType) => {
  return (
    <main className="my-2">
      <div className="flex justify-between items-center text-base">
        <input
          className="w-36 border p-2 border-sky-800 rounded outline-none"
          type="date"
          defaultValue={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <p>To</p>
        <input
          className="w-36 border p-2 border-sky-800 rounded outline-none"
          type="date"
          defaultValue={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </main>
  );
};

export default Date;
