'use client'
import React, { useState } from "react"
import { iconUpdate } from '@/app/_comps/actions'
import { revalidateList } from '../sidebar/DocList'

import EmojiPicker from 'emoji-picker-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { BsFileEarmark } from "react-icons/bs";
import { LuDelete } from "react-icons/lu";

const EmojiDialog = ({ id, userId, emoji, parentId, loading, setLoading }) => {
    let [icon, setIcon] = useState(emoji)

    const handleEmojiClick = async ({ emoji }) => {
        setLoading(true)
        setIcon(emoji)
        await iconUpdate(id, userId, emoji)
        setLoading(false)
        revalidateList(userId, parentId)
    }
    const deleteIcon = async () => {
        setLoading(true)
        setIcon('')
        await iconUpdate(id, userId, "")
        setLoading(false)
        revalidateList(userId, parentId)
    }
    return (
        <Dialog className='w-max'>
            <DialogTrigger>{icon ? icon : <BsFileEarmark />}</DialogTrigger>
            <DialogContent className='w-max'>
                <DialogHeader className='space-y-4'>
                    <DialogTitle className='text-center flex justify-between pr-4'>
                        <span className="flex">Current Emoji - &nbsp; {icon ? icon : <BsFileEarmark />}</span>
                        {icon && <button onClick={deleteIcon}><LuDelete /></button>}
                    </DialogTitle>
                    <DialogDescription className='relative'>
                        <EmojiPicker theme="dark" emojiStyle="google" onEmojiClick={handleEmojiClick} height={350} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default EmojiDialog