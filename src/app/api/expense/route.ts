import { NextRequest, NextResponse } from "next/server";
import Expense from "../../models/expenseModel";
import { db } from "../../utils/db";
import { getAuthSession } from "../auth/[...nextauth]/authOptions";

export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      await db();
      const { searchParams } = new URL(req.url);

      let startDate = searchParams.get("startDate");
      let endDate = searchParams.get("endDate");
      let cat: any = searchParams.get("cat");
      let sort: any = searchParams.get("sort");
      sort = sort?.split(",");

      const paymentType: string[] = [];

      const paidToCat = await Expense.find({}, { paidTo: 1, _id: 0 });

      let sortBy: any = {};
      sortBy[sort[0]] = sort[1];

      paidToCat.forEach((item: any) => {
        if (!paymentType.includes(item.paidTo)) {
          paymentType.push(item.paidTo);
        }
      });
      cat === "all" || !cat ? (cat = [...paymentType]) : (cat = cat.split(","));

      const allExpense = await Expense.find({
        createdAt: { $gte: startDate, $lte: endDate },
      })
        .where("paidTo")
        .in(cat)
        .sort(sortBy);

      if (allExpense.length == 0) {
        const allExpense = await Expense.find({
          createdAt: { $gte: startDate, $lte: endDate },
        })
          .where("by")
          .in(cat)
          .sort(sortBy);
        return new NextResponse(JSON.stringify(allExpense));
      }

      return new NextResponse(JSON.stringify(allExpense));

      // sortBy[sort[0]] = sort[1];
    } catch (error: any) {
      return new NextResponse(JSON.stringify({ message: error.message }), {
        status: 501,
      });
    }
  } else {
    return new NextResponse("You are Not Authenticate", {
      status: 501,
    });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { paidTo, by, amount, desc, date } = await req.json();
  await db();

  const newExpense = new Expense({
    paidTo,
    amount,
    by,
    desc,
    createdAt: date,
  });
  const session = await getAuthSession();

  if (session?.user?.isAdmin) {
    try {
      await newExpense.save();

      return new NextResponse("Expense Has been Created", {
        status: 201,
      });
    } catch (error: any) {
      return new NextResponse(error, {
        status: 500,
      });
    }
  } else {
    return new NextResponse("You are Not Allow", {
      status: 401,
    });
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  const { id } = await req.json();

  await db();
  const session = await getAuthSession();

  if (session?.user?.isAdmin) {
    try {
      const expense: any = await Expense.findByIdAndDelete(id);
      if (!expense) {
        return new NextResponse(JSON.stringify("No data Found"), {
          status: 404,
        });
      }
      return new NextResponse(JSON.stringify("Item Deleted"), {
        status: 201,
      });
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: "Something Went Wrong" }),
        {
          status: 501,
        }
      );
    }
  } else {
    return new NextResponse("You are Not Allow", {
      status: 401,
    });
  }
};

// update data

export const PUT = async (req: NextRequest, res: NextResponse) => {
  const { id, ...data } = await req.json();

  await db();
  const session = await getAuthSession();
  if (session?.user?.isAdmin) {
    try {
      const expense: any = await Expense.findByIdAndUpdate(
        id,
        {
          $set: data,
        },
        { upsert: true }
      );
      if (!expense) {
        return new NextResponse(JSON.stringify("No data Found"), {
          status: 404,
        });
      }
      return new NextResponse(JSON.stringify("Item Updated"), {
        status: 201,
      });
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: "Something Went Wrong" }),
        {
          status: 501,
        }
      );
    }
  } else {
    return new NextResponse("You Are Not Allow", {
      status: 401,
    });
  }
};
