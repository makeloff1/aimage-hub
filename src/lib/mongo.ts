import { MongoClient, Db } from "mongodb";

const options = {
  minPoolSize: 10,
  maxPoolSize: 50,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 60000,
  maxIdleTimeMS: 300000,
  maxConnecting: 2,
};

let db: Db;

export const connectToMongoDb = async (): Promise<MongoClient> => {
  let mongoClient;
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Need Env MONGODB_URI");
  }

  try {
    mongoClient = new MongoClient(uri);
    console.log("Connecting to MongoDB Atlas cluster...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
};
