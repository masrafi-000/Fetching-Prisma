
import {  NextResponse } from "next/server";

const descriptionData = {
  id: 1,
  title: "Awesome Product",
  description:
    "This is a high-quality product with amazing features. Perfect for everyday use.",
};

// Named export for GET method
export async function GET() {
  return NextResponse.json(descriptionData);
}
