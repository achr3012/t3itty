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
    if (status == 'authenticated') {
      if (pathname.startsWith('/profile') && user.id === params.id) {
        return true;
      }
    }
  }

  const isItHomePage = pathname === '/'
  const isItProfilePage = isItProfilePageFunc()

  return (
    <nav className="w-full md:w-96 sticky md:top-0 px-2 py-4">
      <ul className="flex flex-row md:flex-col items-center justify-center md:items-start gap-2">

        <li className="text-lg md:text-base md:w-full">
          <Link className={isItHomePage ? "font-bold" : ""} href="/">
            <IconHoverEffect classes="flex p-2 flex-col md:flex-row md:gap-2 items-center">
              <FaHome />
              <span>Home</span>
            </IconHoverEffect>
          </Link></li>

        {status == "authenticated" && data?.user && (
          <>
            <li className="text-lg md:text-base md:w-full">
              <Link className={isItProfilePage && "font-bold"} href={`/profile/${user.id}`} >
                <IconHoverEffect classes="flex p-2 flex-col md:flex-row md:gap-2 items-center">
                  <FaUserCircle />
                  <span>Profile</span>
                </IconHoverEffect>
              </Link></li>
            <li className="text-lg md:text-base md:w-full">
              <button className="md:w-full" onClick={() => signOut()}>
                <IconHoverEffect classes="flex p-2 flex-col md:flex-row md:gap-2 items-center">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </IconHoverEffect>
              </button></li>
          </>
        )}
        {status == "unauthenticated" && (
          <li className="text-lg md:text-base md:w-full">
            <button className="md:w-full" onClick={() => signIn('google')}>
              <IconHoverEffect classes="flex p-2 flex-col md:flex-row md:gap-2 items-center">
                <FaGoogle />
                <span>Login with Google</span>
              </IconHoverEffect>
            </button></li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation