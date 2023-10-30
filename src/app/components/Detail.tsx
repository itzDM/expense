import React from "react";
import EditDelete from "./EditDelete";
import { useSession } from "next-auth/react";
interface dataType {
  _id: string;
  paidTo: string;
  by: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
}
const Detail = ({ item }: { item: dataType }) => {
  const isAdmin = true;
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const session = useSession();

  return (
    <>
      <div
        className="m-4 mb-8 flex justify-between items-center"
        key={item._id}
      >
        <div className="flex">
          <h3 className="w-12 h-12 flex justify-center items-center border rounded-full border-sky-500 ">
            {item.by.toUpperCase().slice(0, 2)}
          </h3>
          {session?.data?.user?.isAdmin ? (
            <div
              className="ml-2 cursor-pointer"
              onClick={() => setOpenEdit(true)}
            >
              <h3>{item.paidTo.toUpperCase()}</h3>
              <p className="text-stone-500">
                {new Date(item.createdAt).toDateString()}
              </p>
            </div>
          ) : (
            <div className="ml-2 ">
              <h3>{item.paidTo.toUpperCase()}</h3>
              <p className="text-stone-500">
                {new Date(item.createdAt).toDateString()}
              </p>
            </div>
          )}
        </div>
        <h3 className="cursor-pointer" onClick={() => setOpen(!open)}>
          {item.amount}
        </h3>
      </div>
      {open && <p className="ml-8 mt-[-17px]">{item.desc}</p>}
      {openEdit && <EditDelete setOpen={setOpenEdit} item={item} />}
    </>
  );
};

export default Detail;
