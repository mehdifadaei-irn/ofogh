import { UserProps } from "@/types";
import fsPromises from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const statesFilePath = path.join(process.cwd(), "public/mocks/users.json");

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const states = await fsPromises.readFile(statesFilePath, "utf-8");

    const jsonArray = JSON.parse(states);

    const userIndex = jsonArray.findIndex(
      (user: UserProps) => user.email === email && user.password === password
    );

    if (userIndex < 0) {
      return new NextResponse(JSON.stringify({ message: "User not found!" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    return new NextResponse(
      JSON.stringify({ token: jsonArray.at(userIndex).token }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
