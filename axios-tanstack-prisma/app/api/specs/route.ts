import { NextResponse } from "next/server";

const specsData = {
  weight: "1.2kg",
  dimensions: "25cm x 15cm x 10cm",
  color: "Black",
  warranty: "1 year",
  material: "Aluminum & Plastic",
};

export async function GET() {
  return NextResponse.json(specsData);
}
