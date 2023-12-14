import { connectToDB } from "@/utils";
import prisma from "@/prisma";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await connectToDB();
          const user = await prisma.user.findFirst({ where: { email: credentials?.email } })
          if (!user) {
            return null
          }
          if (user?.password === credentials?.password)
            return user
          return null
        } catch (error) {
          console.log(error);
          return null
        } finally {
          prisma.$disconnect();
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account }: { user: any, account: any }) {
      if (account.provider === 'google')
        try {
          const { name, email } = user;
          await connectToDB();
          let userExist = await prisma.user.findFirst({ where: { email } })
          if (userExist) 
            return userExist
          
          const Newuser = await prisma.user.create({
            //@ts-ignore
            data: { name, email }
          })
          return Newuser
        } catch (error: any) {
          console.log(error)
        } finally {
          prisma.$disconnect()
        }
        return user
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.id = user.id
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.id = token.id;
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === "development"
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }