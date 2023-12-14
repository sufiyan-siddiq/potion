'use client'
import React from 'react'
import Link from 'next/link'
import { useEdgeStore } from '@/lib/edgestore';

import { BsPlusCircleFill, BsPlusCircle, BsFileEarmark } from "react-icons/bs";
import { MdArchive, MdOutlineArchive, MdOutlineUnarchive, MdUnarchive } from "react-icons/md";
import { TbTrash, TbTrashFilled } from "react-icons/tb";

const Item = ({ item, expanded, onExpand, newDoc, handleArchieve, loading, handleDelete }) => {
  const { id, icon, userId, title, parentId, isArchived, coverImg } = item
  const { edgestore } = useEdgeStore()
  const handleDocDelete = () => {
    if (coverImg)
      edgestore.publicFiles.delete({ url: coverImg });
    handleDelete(id, userId, parentId)
  }
  return (
    <React.Fragment>
      <div className='w-full my-2 flex justify-between items-center group/expand'>

        <div className='flex items-center gap-2'>
          <span className='cursor-pointer' onClick={() => onExpand(id)}> {expanded ? "▽" : "▷"}</span>
          <Link href={`/home/${id}`}>
            {icon ? icon : <BsFileEarmark />}
          </Link>
          <Link href={`/home/${id}`}>
            {title}
          </Link>
        </div>

        <div className='opacity-0 flex group-hover/expand:opacity-100 gap-2'>
          {/* archive button */}
          {!parentId && (isArchived ? <button disabled={loading} className='group/archive' onClick={() => handleArchieve(id, userId, isArchived)}>
            <MdUnarchive className='hidden group-hover/archive:block' />
            <MdOutlineUnarchive className='block group-hover/archive:hidden' />
          </button> : <button disabled={loading} className='group/archive' onClick={() => handleArchieve(id, userId, isArchived)}>
            <MdArchive className='hidden group-hover/archive:block' />
            <MdOutlineArchive className='block group-hover/archive:hidden' />
          </button>)}

          {/* trash button */}
          {parentId && <button disabled={loading} className='group/trash' onClick={handleDocDelete}>
            <TbTrash className='block group-hover/trash:hidden' />
            <TbTrashFilled className='hidden group-hover/trash:block' />
          </button>}

          {
            !parentId && isArchived && <button disabled={loading} className='group/trash' onClick={handleDocDelete}>
              <TbTrash className='block group-hover/trash:hidden' />
              <TbTrashFilled className='hidden group-hover/trash:block' />
            </button>
          }

          {!isArchived && <button disabled={loading} className='group/addDoc' onClick={() => newDoc(id)}>
            <BsPlusCircleFill className='hidden group-hover/addDoc:block' />
            <BsPlusCircle className='block group-hover/addDoc:hidden' />
          </button>}
        </div>
      </div>
    </React.Fragment>
  )
}
export default Item