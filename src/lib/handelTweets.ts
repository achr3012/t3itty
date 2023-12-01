import { Tweet } from "@prisma/client"
import { prisma } from "./prisma"

export default async function handelTweets(sessionUserId: any, preTweets: Tweet[]) {
  if (sessionUserId) {

    const tweetsPromise = preTweets.map(tweet => {
      const userId = sessionUserId
      const tweetId = tweet.id

      return prisma.like.findUnique({ where: { userId_tweetId: { userId, tweetId } }, select: { tweetId: true } }).then((like) => {

        if (like) {
          return { ...tweet, liked: true }
        } else {
          return { ...tweet, liked: false }
        }
      })
    })

    const tweets = await Promise.all(tweetsPromise).then(results => results)

    return tweets

  } else {
    return preTweets
  }
}