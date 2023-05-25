"use client"

import { follow, revalidatePage, unFollow } from "@/lib/actions"
import { usePathname } from "next/navigation"
import { useState, useTransition } from "react"

const FollowButton = ({ sessionUserId, isFollowingProp, profileId }: {
  sessionUserId: string | undefined
  isFollowingProp: boolean
  profileId: string
}) => {
  const pathname = usePathname()
  const [isFollowing, setIsFollowing] = useState(isFollowingProp);

  const [isPending, startTransition] = useTransition();

  const handelToggleFollow = () => {
    if (!isPending && sessionUserId) {
      startTransition(async () => {
        if (isFollowing === false) {
          await follow(sessionUserId, profileId)
        } else {
          await unFollow(sessionUserId, profileId)
        }
        setIsFollowing(!isFollowing)
        revalidatePage(pathname)
      })
    }
  }

  return (
    <button onClick={handelToggleFollow}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  )
}

export default FollowButton