import Navbar from '@/app/_comps/Navbar'
import { EdgeStoreProvider } from '@/lib/edgestore';
import type { Metadata } from 'next'
import '../globals.css'

import Sidebar from '@/app/(main)/_comps/Sidebar'

export const metadata: Metadata = {
  title: 'Potion - home',
  description: 'Workspace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <EdgeStoreProvider>
      <main id='main' className='w-[100vw] h-[100vh] relative overflow-hidden'>
        <Navbar />
        <div className='flex mt-3 w-[100%] h-[100%] relative'>
          <Sidebar />
            {children}
        </div>
      </main>
    </EdgeStoreProvider>
  )
}