import { connectToMongoDb } from "@/lib/mongo";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  const client = await connectToMongoDb();
  const db = client.db("mydatabase");

  try {
    const collection = db.collection("test");
    const data = await collection.find({}).toArray();
    await client.close();
    return Response.json({ data }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { message: `Error inserting data, ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const client = await connectToMongoDb();
  const db = client.db("mydatabase");

  const { name, age, hoge } = await req.json();
  try {
    const collection = db.collection("test");
    const result = await collection.insertOne({ name, age, hoge });
    await client.close();
    return Response.json({ result }, { status: 201 });
  } catch (error: any) {
    return Response.json(
      { message: `Error inserting data, ${error.message}` },
      { status: 500 }
    );
  }
}
