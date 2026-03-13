import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import  {prisma}  from "./prisma"
import bcrypt from "bcrypt"

export const { handlers, auth, signIn, signOut } = NextAuth({

  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    Credentials({
      name: "credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email as string }
        })

        if (!user) return null

        const isValid = await bcrypt.compare(
          credentials?.password as string,
          user.password!
        )

        if (!isValid) return null

        return user
      }
    })
  ],

})