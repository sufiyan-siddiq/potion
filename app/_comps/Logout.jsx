'use client'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const Logout = () => {
  const { toast } = useToast()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    toast({ description: "Logged out !" })
    console.log(localStorage.getItem('userId'))
    router.push('/')
    location.reload();
  }

  return (
    <div>
      <Button variant='destructive' onClick={handleLogout}> Logout </Button>
    </div>
  )
}

export default Logout