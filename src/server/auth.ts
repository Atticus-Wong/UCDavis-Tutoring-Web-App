import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import {
  DefaultSession,
  DefaultUser,
  NextAuthOptions,
  getServerSession,
} from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'
import DiscordProvider, { DiscordProfile } from 'next-auth/providers/discord'
import { auth as adminAuth } from '@/src/utils/firebase-admin'
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string
    firebaseToken?: string
    user: {
      id?: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id?: string
    accessToken?: string
    iat?: number
    exp?: number
    jti?: string
    firebaseToken?: string
  }
}
declare module 'next-auth' {
  interface User {
    firebaseToken?: string
    id: string
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: `https://discord.com/api/oauth2/authorize?scope=identify+email+guilds+guilds.members.read`,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return true
    },
    async jwt({ token, account, user }) {
      if (user?.id && !token.firebaseToken) {
        console.log('token', token)
        try {
          const firebaseToken = await adminAuth.createCustomToken(user.id)
          token.firebaseToken = firebaseToken
        } catch (error) {
          console.error('Firebase custom token error:', error)
        }
      }
      // Add access token to token
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Assign access token and user ID to session
      session.accessToken = token.accessToken
      session.firebaseToken = token.firebaseToken
      session.user.id = token.sub

      return session
    },
  },
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions)
}
