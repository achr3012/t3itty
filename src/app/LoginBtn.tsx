'use client'

import { useSession, signOut, signIn } from 'next-auth/react'

const LoginBtn = () => {

  const { data: session } = useSession()

  return (
    <div>
      {session
        ? <button onClick={() => { signOut() }}>Sign out</button>
        : <button onClick={() => { signIn('google') }}>Sign in</button>}
    </div>
  )

}

export default LoginBtn