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

  //
  // バリデーション作成のためのロジック
  //
  // TODO: 最終的にはバリデーションを入れて、変なデータを入れられないようにする
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

  //
  // インデックス作成のためのロジック
  //
  const imagesCollection = dbPromise.collection("images");
  const existingIndexes = await imagesCollection.indexes();

  // 'prompt'フィールドにテキストインデックスが存在するか確認
  const hasPromptTextIndex = existingIndexes.some(
    (index) => index.name === "prompt_text"
  );
  if (!hasPromptTextIndex) {
    await imagesCollection.createIndex(
      { prompt: "text" },
      { name: "prompt_text" }
    );
    console.log("Text index created on prompt field");
  } else {
    console.log("prompt text index already exists, skipping creation");
  }

  // 'tags'フィールドにインデックスが存在するか確認
  const hasTagsIndex = existingIndexes.some((index) => index.key.tags === 1);
  if (!hasTagsIndex) {
    await imagesCollection.createIndex({ tags: 1 });
    console.log("Index created on tags field");
  } else {
    console.log("tags index already exists, skipping creation");
  }

  const usersCollection = dbPromise.collection("users");
  const existingUserIndexes = await usersCollection.indexes();

  // 'mail'フィールドに一意なインデックスが存在するか確認
  const hasMailUniqueIndex = existingUserIndexes.some(
    (index) => index.key.mail === 1 && index.unique
  );
  if (!hasMailUniqueIndex) {
    await usersCollection.createIndex({ mail: 1 }, { unique: true });
    console.log("Unique index created on mail field");
  } else {
    console.log("mail unique index already exists, skipping creation");
  }

  return dbPromise;
};

export const dbPromise = connectToMongoDb();
