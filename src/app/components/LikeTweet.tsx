'use client'

import { VscHeart, VscHeartFilled } from "react-icons/vsc"
import IconHoverEffect from "./IconHeverEffect"
import { useState, useEffect, useTransition } from 'react';
import { toggleLike } from '@/lib/actions';

const LikeTweet = ({ tweetId, userId, likes, liked }: { tweetId: string, userId: string | null, likes: number, liked: boolean }) => {

  let [isPending, startTransition] = useTransition();
  const [isLiked, setIsLiked] = useState(liked)
  const [likesCount, setLikesCount] = useState(likes)

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
      {userId && (
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