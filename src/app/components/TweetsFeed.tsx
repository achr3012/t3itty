"use client"

import useSWR from 'swr';
import Tweet, { TweetType } from "./Tweet";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from 'react';
import fetcher from '@/lib/fetcher';
import { usePathname } from 'next/navigation';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-52">
      <FaSpinner className="text-5xl animate-spin mb-3" />
      <p>Loading Teweets ...</p>
    </div>
  )
}

enum TAB {
  ALL,
  FOLLOWING,
  USER_TWEETS,
  LIKED_TWEETS
}

const TweetsFeed = ({ sessionUserId, userId }: { userId?: string | null, sessionUserId?: string | undefined }) => {
  const pathname = usePathname()
  const [tweets, setTweets] = useState<TweetType[]>()
  const [tab, setTab] = useState<TAB | null>(null)
  const [api, setApi] = useState<string>()


  // runs for the first time
  useEffect(() => {
    if (pathname == '/') {
      setTab(TAB.ALL)
      setApi('/api/tweets')
    }

    if (pathname.includes('/profile/')) {
      setTab(TAB.USER_TWEETS)
      setApi(`/api/tweets?userId${userId}`)
    }

  }, [])


  // runs everytime tab changes
  useEffect(() => {
    if (tab === TAB.ALL) setApi(`/api/tweets`)
    if (tab === TAB.FOLLOWING) setApi(`/api/tweets?followedBy=${sessionUserId}`)
    if (tab === TAB.USER_TWEETS) setApi(`/api/tweets?userId=${userId}`)
    if (tab === TAB.LIKED_TWEETS) setApi(`/api/tweets?likedBy=${userId}`)
  }, [tab])

  const { data, isLoading, error } = useSWR<TweetType[]>(api, fetcher)

  // runs whene data changes
  useEffect(() => {
    if (!isLoading && data) {
      setTweets(data)
    }
  }, [data])

  if (error) return <div>failed to load</div>

  if (isLoading) return <LoadingSpinner />

  if (!data) return <h1 className='text-4xl text-center'>No Tweets found</h1>

  return (
    <div className="flex flex-col gap-5 px-2 py-8 sm:px-0">
      <ul className="w-full bg-slate-300 flex items-center text-center">
        {sessionUserId && pathname == '/' && (
          <>
            <li className={`flex-grow cursor-pointer py-3 ${tab == TAB.ALL && 'font-semibold'}`} onClick={() => setTab(TAB.ALL)}>ALL</li>
            <li className={`flex-grow cursor-pointer py-3 ${tab == TAB.FOLLOWING && 'font-semibold'}`} onClick={() => setTab(TAB.FOLLOWING)}>Following</li>
          </>
        )}
        {pathname.includes('/profile/') && (
          <>
            <li className={`flex-grow cursor-pointer py-3 ${tab == TAB.USER_TWEETS && 'font-semibold'}`} onClick={() => setTab(TAB.USER_TWEETS)}>Tweets</li>
            <li className={`flex-grow cursor-pointer py-3 ${tab == TAB.LIKED_TWEETS && 'font-semibold'}`} onClick={() => setTab(TAB.LIKED_TWEETS)}>Liked</li>
          </>
        )}
      </ul>

      {tweets && tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet} userId={sessionUserId} />)}
    </div>
  )
}
export default TweetsFeed