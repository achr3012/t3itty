'use server'

import { prisma } from './prisma';
import { Tweet } from '@prisma/client';
import validTweet from './validTweet';
import { revalidatePath } from 'next/cache';

export async function addTweet(formData: FormData) {
  const tweet = {
    content: formData.get("tweet"),
    userId: formData.get("userId")
  } as Tweet

  if (validTweet(formData)) {
    return await prisma.tweet.create({
      data: tweet
    })
  }
}

export async function toggleLike(tweetId: string, userId: string) {
  const data = { userId, tweetId }
  const liked = await prisma.like.findUnique({ where: { userId_tweetId: data }, select: { tweetId: true } })

  if (!liked) {
    const createLike = await prisma.like.create({ data, })
    if (createLike) return true
  } else {
    const deleteLike = await prisma.like.delete({ where: { userId_tweetId: data } })
    if (deleteLike) return true
  }
}

export async function follow(sessionUserId: string, profileId: string) {
  await prisma.user.update({
    where: {
      id: sessionUserId
    },
    data: {
      follows: { connect: { id: profileId } }
    }
  })
}

export async function unFollow(sessionUserId: string, profileId: string) {
  await prisma.user.update({
    where: {
      id: sessionUserId
    },
    data: {
      follows: { disconnect: { id: profileId } }
    }
  })
}

export async function revalidatePage(path: string) {
  return revalidatePath(path)
}