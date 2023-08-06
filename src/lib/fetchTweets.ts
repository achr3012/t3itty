import axios from 'axios'

type TweetQueryParams = {
  take?: number;
  lastCursor?: string;
  api: string;
  id?: string
};

const fetchTweets = async ({ take, lastCursor, id, api }: TweetQueryParams) => {
  const response = await axios.get(api, {
    params: { take, lastCursor, id },
  });
  return response?.data;
};

export default fetchTweets