import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Named export for GET method
export async function GET() {
  try {
    const description = await prisma.description.findMany();
    return NextResponse.json(description);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch descriptions" });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description } = body;

    if (!title || !description)
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );

    const existingDescription = await prisma.description.findFirst({
      where: {
        OR: [{ title: title }, { description: description }],
      },
    });

    if (existingDescription) {
      return NextResponse.json(
        { error: "Title or description already exists" },
        { status: 409 }
      );
    }

    const newDescription = await prisma.description.create({
      data: { title, description },
    });

    return NextResponse.json(newDescription, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create descripton" },
      { status: 500 }
    );
  }
}
