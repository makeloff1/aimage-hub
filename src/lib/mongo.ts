import { MongoClient, Db } from "mongodb";

const options = {
  minPoolSize: 10,
  maxPoolSize: 50,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 60000,
  maxIdleTimeMS: 300000,
  maxConnecting: 2,
};

// mongo dbへの接続を再利用するため、グローバル変数として宣言
let mongoClient: MongoClient | null = null;

export const connectToMongoDb = async (): Promise<Db> => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Need Env MONGODB_URI");
  }
  const databaseName = process.env.MONGODB_DATABASE_NAME;
  if (!databaseName) {
    throw new Error("Need Env MONGODB_DATABASE_NAME");
  }

  if (!mongoClient) {
    try {
      mongoClient = new MongoClient(uri, options);
      console.log("Connecting to MongoDB Atlas cluster...");
      await mongoClient.connect();
      console.log("Successfully connected to MongoDB Atlas!");
    } catch (error) {
      console.error("Connection to MongoDB Atlas failed!", error);
      process.exit();
    }
  }
  const dbPromise = mongoClient.db(databaseName);
  console.log("Connected to database");

  // TODO: 最終的にはバリデーションを入れて、変なデータを入れられないようにする
  // 各コレクションのバリデーション
  const collectionName = "test2";
  const collections = await dbPromise
    .listCollections({ name: collectionName })
    .toArray();
  if (collections.length === 0) {
    await dbPromise.createCollection(collectionName, {
      validator: { $expr: { $in: ["$kind", ["dog", "cat", "fish"]] } },
    });
    console.log(`Collection ${collectionName} created with validation.`);
  }

  return dbPromise;
};

export const dbPromise = connectToMongoDb();
