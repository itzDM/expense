import React from "react";

const Skelton = () => {
  const counter = 10;
  const FilterSkelton = () => {
    return (
      <div
        className="flex justify-between gap-4 my-3 animate-pulse text-slate-500 opacity-20 "
        key={counter}
      >
        <div className="w-12 h-12 border rounded-full "></div>
        <div className="flex flex-col items-start w-full gap-2">
          <h1 className=" w-2/4 border rounded-md h-4"></h1>
          <h1 className=" w-2/5 border rounded-md h-2"></h1>
        </div>
        <h1 className=" border rounded-md w-9  h-3"></h1>
      </div>
    );
  };
  return Array.from(Array(counter), (_, i) => <FilterSkelton key={i} />);
};

export default Skelton;
