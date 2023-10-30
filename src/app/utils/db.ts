import { connect } from "mongoose";
let isConnected = false;
export const db = async () => {
  try {
    if (isConnected === true) return;

    const connectDb = await connect(process.env.MONGO_URI!);
    isConnected = true;
    console.log("Database is Connected With ", connectDb.connection.host);
  } catch (err) {
    console.log(err);
    process.exit();
  }
};
