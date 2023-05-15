'use client'

import Link from "next/link"
import IconHoverEffect from "./IconHeverEffect"
import { FaHome, FaUserCircle, FaGoogle, FaSignOutAlt } from 'react-icons/fa'
import { signIn, signOut, useSession } from "next-auth/react"

const Navigation = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="w-full md:w-96 sticky md:top-0 px-2 py-4">
      <ul className="flex flex-row md:flex-col items-center justify-center md:items-start gap-2">
        <li>
          <Link href="/"><IconHoverEffect><FaHome /><span className="hidden md:block"> Home</span></IconHoverEffect></Link>
        </li>
        {status !== "loading" && session?.user
          ? (
            <>
              <li><Link href="/"><IconHoverEffect><FaUserCircle /><span className="hidden md:block"> Profile</span></IconHoverEffect></Link></li>
              <li><button onClick={() => signOut()}><IconHoverEffect><FaSignOutAlt /><span className="hidden md:block"> Logout</span></IconHoverEffect></button></li>
            </>
          ) : (
            <li><button onClick={() => signIn('google')}><IconHoverEffect><FaGoogle /><span className="hidden md:block"> Sign in with Google</span></IconHoverEffect></button></li>
          )}
      </ul>
    </nav>
  )
}

export default Navigation