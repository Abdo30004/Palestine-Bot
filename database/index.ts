import mongoose from "mongoose";
import { Guild } from "./models/guild";

async function connect(uri: string) {
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  await mongoose.connect(uri, {
    appName: "Palestine-Bot",
    dbName: "Palestine",
  });

  return mongoose.connection;
}

export default connect;
export { connect, Guild };
