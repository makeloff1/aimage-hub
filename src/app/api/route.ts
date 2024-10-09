import { dbPromise } from "@/lib/mongo";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  try {
    const db = await dbPromise;
    const data = await db.collection("test").find({}).toArray();
    return Response.json({ data }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { message: `Error inserting data, ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { name, age, hoge } = await req.json();
  try {
    const db = await dbPromise;
    const result = await db.collection("test2").insertOne({ name, age, hoge });
    return Response.json({ result }, { status: 201 });
  } catch (error: any) {
    return Response.json(
      { message: `Error inserting data, ${error.message}` },
      { status: 500 }
    );
  }
}
