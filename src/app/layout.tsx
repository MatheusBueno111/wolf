import './globals.css'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { SessionProvider } from '@/providers/SessionProvider'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en" className="antialiased">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="min-h-screen bg-zinc-50">{children}</div>
        </SessionProvider>
        <ToastContainer autoClose={1500} />
      </body>
    </html>
  )
}
