'use client'
import useSWR from 'swr';
import { VscHeart, VscHeartFilled } from "react-icons/vsc"
import IconHoverEffect from "./IconHeverEffect"
import { useState, useEffect, useTransition } from 'react';
import { toggleLike } from '@/lib/actions';
import fetcher from '@/lib/fetcher';

const LikeTweet = ({ tweetId, userId, likes }: { tweetId: string, userId: string | undefined, likes: number }) => {

  let [isPending, startTransition] = useTransition();
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(likes)

  const { data, isLoading } = useSWR<{ likeExists: boolean }>(`/api/tweets/like-exists?userId=${userId}&tweetId=${tweetId}`, fetcher);

  useEffect(() => {
    if (!isLoading && data) {
      setIsLiked(data.likeExists)
    }
  }, [data])

  useEffect(() => {
    setLikesCount(likes)
  }, [likes])

  const handelLike = () => {
    if (!isPending && userId) {
      startTransition(async () => {

        if (await toggleLike(tweetId, userId)) {
          setIsLiked(!isLiked)
          if (isLiked) {
            setLikesCount(likesCount - 1)
          } else {
            setLikesCount(likesCount + 1)
          }
        }
      })
    }
  }

  return (
    <div className="flex items-center gap-1">
      {userId && !isLoading && (
        <IconHoverEffect classes="rounded-full flex" red>
          <button onClick={handelLike} className="p-2 text-xl hover:text-red-700 ">
            {isLiked ? <VscHeartFilled className="text-red-600" /> : <VscHeart />}
          </button>
        </IconHoverEffect>
      )}
      <span className="text-sm text-gray-700">{likesCount} {likesCount > 1 ? "Likes" : "like"}</span>
    </div>
  )
}

export default LikeTweet