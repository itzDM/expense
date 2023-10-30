import { signOut } from "next-auth/react";
import React from "react";
type props = {
  totalExpense: number;
};
const Total = ({ totalExpense }: props) => {
  return (
    <div className="flex mx-2 justify-between items-center text-center font-bold text-xl p-2 bg-gray-700 text-slate-100 sticky bottom-0">
      <button
        className="border border-orange-300 p-1 rounded-lg"
        onClick={() => signOut()}
      >
        Log-out
      </button>
      <h2>
        Total : <span className="text-lg">{totalExpense}</span>
      </h2>
    </div>
  );
};

export default Total;
