import { getServerSession } from "next-auth"
import { AuthOptions } from "@/lib/AuthOptions"
import { fetchUser } from "@/lib/fetchUser"
import Image from "next/image"
import Loading from "./components/Loading"
import FollowButton from "./components/FollowButton"

export default async function Profile({ params }: { params: { id: string } }) {
  const session = await getServerSession(AuthOptions)
  const sessionUserId = session?.user?.id
  const profile = await fetchUser(params.id)

  if (!profile) {
    return (<Loading>
      <p className="font-bold text-xl">@{params.id}</p>
      <div className="w-full flex justify-center py-20">
        <h2 className="font-bold text-3xl">Profile Does'nt Exist !</h2>
      </div>
    </Loading>)
  }
  const ImageSrc = profile.image ? profile.image : "/avatar.png"

  let isFollowing: boolean = false

  // Iterate over the array of followers and check if any follower has the target ID
  for (const follower of profile.followers) {
    if (follower.id === sessionUserId) {
      isFollowing = true
      break
    }
  }

  return (
    <div>
      <div className="w-full h-44 bg-slate-600 rounded-b-2xl" />
      <div className="flex flex-col px-5 -mt-20">
        <Image
          priority
          width={144}
          height={144}
          src={ImageSrc}
          alt={`${profile.name} profile image`}
          className="w-36 h-36 rounded-full mb-3 border-2 border-black"
        />
        <div className="flex justify-between w-full">
          <div>
            <p className="font-black text-xl">{profile.name}</p>
            <p className="font-semibold text-sm text-gray-600">{profile.email}</p>
          </div>
          {sessionUserId && profile.id !== sessionUserId && (
            <div>
              <FollowButton sessionUserId={sessionUserId} isFollowingProp={isFollowing} profileId={profile.id} />
            </div>
          )}
        </div>
        <div className="flex w-full gap-2 text-xs text-gray-600">
          <p>{profile._count.followers} Followers</p>
          <p>{profile._count.follows} Following</p>
        </div>
      </div>
    </div>
  )
}