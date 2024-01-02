import nextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from '@/services/db'
import { compare } from 'bcrypt'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Username',
          type: 'text',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        })

        if (!existingUser) {
          return null
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password || '',
        )

        if (!passwordMatch) {
          return null
        }

        return {
          id: `${existingUser.id}`,
          email: existingUser.email,
        }
      },
    }),
  ],
  callbacks: {
    redirect: async ({ baseUrl, url }) => {
      url = `${baseUrl}/products`
      return url
    },
  },
  events: {
    signIn: async ({ user, account }) => {
      if (account?.provider === 'google') {
        try {
          const response = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            body: JSON.stringify({
              email: user.email,
            }),
          })
          if (response.ok) {
            console.log('deu certo')
          }
        } catch (error) {
          console.error('erro catch', error)
        }
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}

export const handler = nextAuth(authOptions)

export { handler as GET, handler as POST }
