import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/app/_comps/Navbar'

export const metadata: Metadata = {
  title: 'Potion - login/signup',
  description: 'Log in to potion',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
