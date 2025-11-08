import { NextResponse } from "next/server";

const reviewData = [
  { id: 1, user: "Alice", rating: 5, comment: "Absolutely love it!" },
  {
    id: 2,
    user: "Bob",
    rating: 4,
    comment: "Very good, but could improve packaging.",
  },
  { id: 3, user: "Charlie", rating: 3, comment: "Average experience." },
];

export async function GET() {
  return NextResponse.json(reviewData, { status: 200 });
}
