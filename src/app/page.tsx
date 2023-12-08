'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  console.log(session)
  if (session) {
    return (
      <div className="bg-slate-500">
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      {/* <Link href="/auth/signin">Login</Link> */}
    </>
  )
}
