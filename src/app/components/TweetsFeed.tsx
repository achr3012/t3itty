"use client"

import Tweet, { TweetType } from "./Tweet";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import fetchTweets from "@/lib/fetchTweets";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-52">
      <FaSpinner className="text-4xl animate-spin mb-3" />
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
  const [tab, setTab] = useState<TAB | null>(null)
  const [api, setApi] = useState<string>("")

  // to know when the last element is in view
  const { ref, inView } = useInView();

  // runs for the first time
  useEffect(() => {
    if (pathname == '/') {
      setTab(TAB.ALL)
      setApi("/api/tweets")
    }

    if (pathname.includes('/profile')) {
      setTab(TAB.USER_TWEETS)
      setApi(`/api/tweets/user/${userId}`)
    }

  }, [])

  // runs everytime tab changes
  useEffect(() => {
    if (tab === TAB.ALL) setApi("/api/tweets")
    if (tab === TAB.FOLLOWING) setApi(`/api/tweets/followings/${sessionUserId}`)
    if (tab === TAB.USER_TWEETS) setApi(`/api/tweets/user/${userId}`)
    if (tab === TAB.LIKED_TWEETS) setApi(`/api/tweets/likedBy/${userId}`)
  }, [tab])

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = "" }) =>
      fetchTweets({ take: 10, lastCursor: pageParam, api }),
    queryKey: ["tweets", api],
    // getNextPageParam is used to get the cursor of the last element in the current page
    // which is then used as the pageParam in the queryFn
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
    },
    enabled: !!api,
  });

  useEffect(() => {
    // if the last element is in view and there is a next page, fetch the next page
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  if (error as any)
    return (
      <div className="mt-10">
        {"An error has occurred: " + (error as any).message}
      </div>
    );

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

      {isSuccess &&
        data?.pages.map((page) =>
          page.tweets.map((tweet: TweetType, index: number) => {
            // if the last element in the page is in view, add a ref to it
            if (page.tweets.length === index + 1) {
              return (
                <div ref={ref} key={index}>
                  <Tweet tweet={tweet} userId={sessionUserId} />
                </div>
              );
            } else {
              return (
                <Tweet key={tweet.id} tweet={tweet} userId={sessionUserId} />
              );
            }
          })
        )}

      {(isLoading || isFetchingNextPage) && <p className="mb-4">Loading...</p>}

    </div>
  )
}
export default TweetsFeed