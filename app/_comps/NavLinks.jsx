import Link from 'next/link'
import Image from 'next/image';
import React from 'react'
import User from './User'
import { buttonVariants } from "@/components/ui/button"
import Toggle from '@/app/(users)/_user_comps/Toggle'
import Logout from './Logout';

const NavLinks = ({isLoggedIn, icon, name, email}) => {
    return (
        <div className='flex justify-between'>
            <Link href='/' className='flex items-center w-max'>
                <Image src='/download.png' width={50} height={50} className='rotate-45' alt='logo' />
                <h1 className='text-3xl nav'>Potion</h1>
            </Link>
            <div className='flex gap-5 items-center'>
                {isLoggedIn ? <Logout /> : <Link href='/authenticate' className={buttonVariants({ variant: "outline" })}>Log in</Link>}
                {isLoggedIn && <User icon={icon} name={name} email={email}/>}
            </div>
        </div>
    )
}

export default NavLinks
{/* <Toggle/> */ }