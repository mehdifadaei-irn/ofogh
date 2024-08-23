import { UserProps } from "@/types";
import crypto from "crypto";
import fsPromises from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const statesFilePath = path.join(process.cwd(), "public/mocks/users.json");

export async function POST(req: NextRequest) {
  try {
    const users = await fsPromises.readFile(statesFilePath, "utf-8");

    const jsonArray: UserProps[] = JSON.parse(users);

    const { username, email, password } = await req.json();

    const token = crypto.randomBytes(16).toString("hex");

    jsonArray.push({ token, username, email, password });

    const updatedData = JSON.stringify(jsonArray);

    await fsPromises.writeFile(statesFilePath, updatedData);

    return new NextResponse(JSON.stringify({ token: token }), {
      status: 201,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
