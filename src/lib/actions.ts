'use server'

import { prisma } from './prisma';
import { Tweet } from '@prisma/client';
import validTweet from './validTweet';

export async function addTweet(formData: FormData) {
  const tweet = {
    content: formData.get("tweet"),
    userId: formData.get("userId")
  } as Tweet

  if (validTweet(formData)) {
    await prisma.tweet.create({
      data: tweet
    })
  }
}