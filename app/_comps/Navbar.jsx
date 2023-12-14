'use client'
import React from 'react'
import NavLinks from './NavLinks'
import { useSession } from 'next-auth/react'

const Navbar = () => {
    let session = useSession()
    var name = session.data?.user?.name
    var email = session.data?.user?.email
    var icon;
    if (name?.indexOf(' ') !== -1) {
        var split = name?.split(' ')
        var frstChrs = split?.map(wrd => wrd[0])
        icon = frstChrs?.join('');
        icon = icon?.length > 2 ? icon.slice(0, 2) : icon
    }
    else icon = name.charAt(0)

    let isLoggedIn = session.status === 'authenticated'
    return (
        <nav className='h-16 p-3 gap-2'>
            <NavLinks isLoggedIn={isLoggedIn} icon={icon} name={name} email={email}/>
        </nav>
    )
}

export default Navbar