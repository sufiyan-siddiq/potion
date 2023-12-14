import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import SessionProvider from './SessionProvider'
import { getServerSession } from 'next-auth'
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({
  subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'Potion',
  description: 'A notes app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body className={poppins.className} suppressHydrationWarning>
        <SessionProvider session={session}>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
