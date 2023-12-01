import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/lib/AuthOptions";
import { tweetSelect } from "@/lib/prismaTweetSelect";
import handelTweets from "@/lib/handelTweets";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(request.url);

  const id = params.id
  const take = searchParams.get("take")
  const lastCursor = searchParams.get("lastCursor")

  const session = await getServerSession(AuthOptions)
  const sessionUserId = session?.user.id as string

  const results = await prisma.like.findMany({
    take: take ? parseInt(take as string) : 10,
    ...(lastCursor && {
      skip: 1, // Do not include the cursor itself in the query result.
      cursor: {
        userId_tweetId: { userId: id, tweetId: lastCursor as string }
      }
    }),
    select: { Tweet: { select: tweetSelect } },
    where: {
      userId: id
    },
    orderBy: {
      tweetId: 'desc'
    }
  });

  if (results.length == 0) {
    return NextResponse.json({
      tweets: [],
      metaData: {
        lastCursor: null,
        hasNextPage: false,
      },
    })
  }

  const lastTweetInResults = results[results.length - 1];
  const cursor = lastTweetInResults.Tweet.id;

  const nextPage = await prisma.like.findMany({
    // Same as before, limit the number of events returned by this query.
    take: take ? parseInt(take as string) : 10,
    skip: 1, // Do not include the cursor itself in the query result.
    cursor: {
      userId_tweetId: { userId: id, tweetId: cursor }
    },
    where: { userId: id },
    select: { Tweet: { select: tweetSelect } },
    orderBy: {
      tweetId: 'desc'
    }
  });

  const myLikedTweets = results.map(tweeta => {
    return { ...tweeta.Tweet }
  })


  const tweets = await handelTweets(sessionUserId, myLikedTweets)

  const data = {
    tweets,
    metaData: {
      lastCursor: cursor,
      hasNextPage: nextPage.length > 0,
    }
  };

  return NextResponse.json(data)

}