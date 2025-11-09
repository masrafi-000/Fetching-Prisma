import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const description = await prisma.description.findUnique({
      where: { id },
    });

    if (!description)
      return NextResponse.json(
        { error: "Description not found" },
        { status: 400 }
      );

    return NextResponse.json(description);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch description" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const idParam = url.pathname.split("/").pop(); // get last segment
    const id = parseInt(idParam || "");

    if (isNaN(id))
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const body = await req.json();
    const { title, description } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    const existing = await prisma.description.findFirst({
      where: {
        AND: [
          { id: { not: id } },
          {
            OR: [{ title }, { description }],
          },
        ],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Title or description already exists" },
        { status: 409 }
      );
    }

    const updated = await prisma.description.update({
      where: { id },
      data: { title, description },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update description" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await prisma.description.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete description" },
      { status: 500 }
    );
  }
}
