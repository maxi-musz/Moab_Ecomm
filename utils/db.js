import mongoose, { connection, connections } from "mongoose";
const conection = {};

export async function connectDb() {
  if (connection.isConnected) {
    console.log("Älready connected to the database.");
    return;
  }
  if (mongoose.connections.length > 0) {
    connections.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Use previous connection to the database.");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("New connection to database successful.");
  connection.isConnected = db.connections[0].readyState;
}

// in production mode it is good to always disconnect from the database when the database is not needed so as to reduce traffic
export async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_END === "production") {
      console.log("Not disconnecting from the database.");
    }
  }
}
