'use client'

import Link from "next/link"
import { useParams, usePathname } from 'next/navigation';
import IconHoverEffect from "./IconHeverEffect"
import { FaHome, FaUserCircle, FaGoogle, FaSignOutAlt } from 'react-icons/fa'
import { signIn, signOut, useSession } from "next-auth/react"
import { User } from "@prisma/client"

const Navigation = () => {
  const { data, status } = useSession();
  const user = data?.user as User;
  const params = useParams();
  const pathname = usePathname();

  const isItProfilePageFunc = () => {
    if (
      status == 'authenticated'
      && pathname.startsWith('/profile')
      && user.id === params.id
    ) return true;
  }

  const isItHomePage = pathname === '/'
  const isItProfilePage = isItProfilePageFunc()

  return (

    <ul className="flex sm:flex-col items-center py-2 justify-evenly border-gray-200 border-t-2  gap-2 sm:h-full sm:justify-center sm:gap-3 sm:border-t-0 sm:border-r-2 lg:justify-start lg:pt-16">

      <li>
        <Link className={isItHomePage ? "font-bold" : ""} href="/" prefetch={false}>
          <IconHoverEffect classes="text-lg p-3 rounded-full lg:flex lg:items-center lg:gap-4 lg:py-1 lg:px-4">
            <FaHome />
            <span className="hidden lg:inline">Home</span>
          </IconHoverEffect>
        </Link></li>

      {status == "authenticated" && data?.user && (
        <>
          <li>
            <Link className={isItProfilePage && "font-bold"} href={`/profile/${user.id}`} >
              <IconHoverEffect classes="text-lg p-3 rounded-full lg:flex lg:items-center lg:gap-4 lg:py-1 lg:px-4">
                <FaUserCircle />
                <span className="hidden lg:inline">Profile</span>
              </IconHoverEffect>
            </Link></li>
          <li>
            <button className="md:w-full" onClick={() => signOut()}>
              <IconHoverEffect classes="text-lg p-3 rounded-full lg:flex lg:items-center lg:gap-4 lg:py-1 lg:px-4">
                <FaSignOutAlt />
                <span className="hidden lg:inline">Logout</span>
              </IconHoverEffect>
            </button></li>
        </>
      )}
      {status == "unauthenticated" && (
        <li>
          <button className="md:w-full" onClick={() => signIn('google')}>
            <IconHoverEffect classes="text-lg p-3 rounded-full lg:flex lg:items-center lg:gap-4 lg:py-1 lg:px-4">
              <FaGoogle />
              <span className="hidden lg:inline">Login with Google</span>
            </IconHoverEffect>
          </button></li>
      )}
    </ul>
  )
}

export default Navigation