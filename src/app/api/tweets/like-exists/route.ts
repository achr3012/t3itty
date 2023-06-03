import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId")
  const tweetId = searchParams.get("tweetId")

  if (!userId || !tweetId) return new Response("Yaw rahi m9aawdaa")

  const like = await prisma.like.findUnique({ where: { userId_tweetId: { userId, tweetId } }, select: { tweetId: true } })
  if (like) {
    return NextResponse.json({ likeExists: true })
  } else {
    return NextResponse.json({ likeExists: false })
  }
}