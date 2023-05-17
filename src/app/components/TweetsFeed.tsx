import fetchTweets from "@/lib/fetchTweets"

const TweetsFeed = async () => {

  const tweets = await fetchTweets()

  return (
    <ul className="pl-10 list-disc">
      {tweets.map(tweet => (<li key={tweet.id}>{tweet.content}</li>))}
    </ul>
  )
}

export default TweetsFeed