'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const Products: React.FC = () => {
  const { data: session, status } = useSession()
  console.log('Home session', session)
  console.log('status', status)
  if (session) {
    return (
      <div className="bg-slate-500">
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <div>products</div>
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

export default Products
