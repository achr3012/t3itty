export const tweetSelect = {
  user: {
    select: {
      id: true,
      name: true,
      image: true
    }
  },
  id: true,
  userId: true,
  content: true,
  createdAt: true,
  _count: { select: { likes: true } }
}