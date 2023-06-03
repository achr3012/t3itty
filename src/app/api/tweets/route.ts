import { NextResponse } from "next/server";
import { fetchTweets, fetchUserLikedTweets, fetchUserTweets } from "@/lib/fetchTweets";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId")
  const likedBy = searchParams.get("likedBy")

  if (userId) {
    const tweets = await fetchUserTweets(userId)
    return NextResponse.json(tweets)
  }

  if (likedBy) {
    const likedTweets = await fetchUserLikedTweets(likedBy)
    const tweets = likedTweets.map(tweet => tweet.Tweet)
    return NextResponse.json(tweets)
  }

  const tweets = await fetchTweets()
  return NextResponse.json(tweets)
}