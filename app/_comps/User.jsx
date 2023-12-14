import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { TiUser,TiMail  } from "react-icons/ti";

const User = ({ icon, name, email }) => {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <Avatar><AvatarFallback>{icon?.toLocaleUpperCase()}</AvatarFallback></Avatar>
            </HoverCardTrigger>
            <HoverCardContent className='w-max text-sm'>
                <div className='flex items-center'><TiUser /> &nbsp;{name}</div>
                <div className='flex items-center'><TiMail /> &nbsp;{email}</div>
            </HoverCardContent>
        </HoverCard>
    )
}

export default User
