import { Tweet } from '@prisma/client';
import { object, string } from 'zod'

export default function validTweet(formData: FormData) {
  const tweetSchema = object({
    content: string().min(1).max(191),
    userId: string()
  })

  const tweet = {
    content: formData.get("tweet"),
    userId: formData.get("userId")
  } as Tweet

  const result = tweetSchema.safeParse(tweet);

  if (result.success) return true
}