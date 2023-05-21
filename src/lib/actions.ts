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
    if (await prisma.tweet.create({
      data: tweet
    })) {
      return true;
    }
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

export async function revalidatePage(path: string) {
  revalidatePath(path)
}