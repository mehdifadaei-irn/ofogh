import fsPromises from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const statesFilePath = path.join(process.cwd(), "public/mocks/users.json");

export async function GET() {
  try {
    const users = await fsPromises.readFile(statesFilePath, "utf-8");
    const json = JSON.parse(users);
    return NextResponse.json(json);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "No users found!" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }
}
