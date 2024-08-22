import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fsPromises from "fs/promises";
import crypto from "crypto";
import { StateProps } from "@/types";

const statesFilePath = path.join(process.cwd(), "public/mocks/states.json");

export async function GET() {
  try {
    const states = await fsPromises.readFile(statesFilePath, "utf-8");
    const json = JSON.parse(states);
    return NextResponse.json(json);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "No states found!" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const states = await fsPromises.readFile(statesFilePath, "utf-8");

    const jsonArray: StateProps[] = JSON.parse(states);

    const { id, title, description, phonenumber, position1, price, position2 } =
      await req.json();

    const userIndex = jsonArray.findIndex((user: StateProps) => user.id === id);

    if (userIndex < 0) {
      return new NextResponse(JSON.stringify({ message: "State not found!" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    let desiredState: StateProps = jsonArray[userIndex];

    desiredState.title = title ? title : desiredState.title;
    desiredState.description = description
      ? description
      : desiredState.description;
    desiredState.phonenumber = phonenumber
      ? phonenumber
      : desiredState.phonenumber;
    desiredState.position1 = position1 ? position1 : desiredState.position1;
    desiredState.position2 = position2 ? position2 : desiredState.position2;
    desiredState.price = price ? price : desiredState.price;

    jsonArray[userIndex] = desiredState;

    const updatedData = JSON.stringify(jsonArray);

    await fsPromises.writeFile(statesFilePath, updatedData);

    return new NextResponse(
      JSON.stringify({ message: "State patched successfully!" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const states = await fsPromises.readFile(statesFilePath, "utf-8");

    const jsonArray = JSON.parse(states);

    const { title, description, phonenumber, position1, price, position2 } =
      await req.json();

    const id = crypto.randomBytes(16).toString("hex");

    jsonArray.push({
      id,
      title,
      description,
      phonenumber,
      position1,
      price,
      position2,
    });

    const updatedData = JSON.stringify(jsonArray);

    await fsPromises.writeFile(statesFilePath, updatedData);

    return new NextResponse(
      JSON.stringify({ message: "States created successfully!" }),
      { status: 201, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const states = await fsPromises.readFile(statesFilePath, "utf-8");

    const jsonArray = JSON.parse(states);

    const userIndex = jsonArray.findIndex((user: StateProps) => user.id === id);

    if (userIndex < 0) {
      return new NextResponse(JSON.stringify({ message: "state not found!" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    jsonArray.splice(userIndex, 1);

    const updatedData = JSON.stringify(jsonArray);

    await fsPromises.writeFile(statesFilePath, updatedData);

    return new NextResponse(
      JSON.stringify({ message: "state deleted successfully!" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
