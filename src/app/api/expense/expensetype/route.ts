import Expense from "@/app/models/expenseModel";
import { db } from "@/app/utils/db";
import { NextResponse, NextRequest } from "next/server";
import { getAuthSession } from "../../auth/[...nextauth]/authOptions";

export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();
  if (session) {
    try {
      await db();
      const { searchParams } = new URL(req.url);

      const startDate = searchParams.get("startDate");
      const endDate = searchParams.get("endDate");

      const allExpense = await Expense.find(
        {
          createdAt: { $gte: startDate, $lte: endDate },
        },
        { paidTo: 1, by: 1, _id: 0 }
      );

      const filterOpt: string[] = ["ALL"];
      allExpense?.filter((item) => {
        if (!filterOpt.includes(item.paidTo.toUpperCase())) {
          filterOpt.push(item.paidTo.toUpperCase());
        }
        if (!filterOpt.includes(item.by.toUpperCase())) {
          filterOpt.push(item.by.toUpperCase());
        }
      });

      return new NextResponse(JSON.stringify(filterOpt));
    } catch (error: any) {
      return new NextResponse(JSON.stringify(error.message));
    }
  } else {
    return new NextResponse("You are Not Authenticated ", { status: 401 });
  }
};
