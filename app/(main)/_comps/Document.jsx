'use client'
import React, { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { revalidateList } from '../_comps/sidebar/DocList'
import { archive } from '@/utils/serverAction'
import { updateDoc, deleteDoc } from '@/app/_comps/actions'
import { useEdgeStore } from '@/lib/edgestore';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation'

import DialogButton from './doc/DialogButton'
import TextEditor from './doc/TextEditor'
import EmojiDialog from './doc/EmojiDialog'
import Spinner from '@/app/_comps/Spinner'
import { notFound } from 'next/navigation'

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { IoMdTrash } from "react-icons/io";

const fetcher = url => fetch(url).then(r => r.json())

const Document = ({ docID }) => {
  let router = useRouter()
  const { edgestore } = useEdgeStore();
  const [loading, setLoading] = useState(false)

  const { data: doc, error, isValidating, mutate } = useSWR(`https://potion-docs.vercel.app/api/getDoc?id=${docID}`, fetcher)

  if (!isValidating && (error || !doc?.note))
    return notFound()


  const update = () => {
    mutate(`https://potion-docs.vercel.app/api/getDoc?id=${docID}`)
  }

  const removeCover = async () => {
    setLoading(true)
    let x = doc?.note?.coverImg
    await edgestore.publicFiles.delete({ url: x });
    await updateDoc(docID, doc?.note?.userId, "");
    update()
    setLoading(false)
  }

  const handleTitle = debounce(async (event) => {
    const newTitle = event.target.value;
    let res = await updateDoc(docID, doc?.note?.userId, undefined, newTitle)
    if (res)
      setLoading(false)
    revalidateList(doc?.note?.userId, doc?.note?.parentId)
  }, 700);

  const handleArchieve = async () => {
    setLoading(true)
    let res = await archive(doc?.note?.id, doc?.note?.userId, doc?.note?.isArchived)
    if (res)
      setLoading(false)
    update()
    revalidateList(doc?.note?.userId, doc?.note?.parentId)
  }

  const handleDelete = async () => {
    setLoading(true)
    if (doc?.note?.coverImg)
      edgestore.publicFiles.delete({ url: doc?.note?.coverImg });
    let res = await deleteDoc(doc?.note?.id, doc?.note?.userId, doc?.note?.parentId)
    router.push('/')
    if (res)
      setLoading(false)
    update()
    revalidateList(doc?.note?.userId, doc?.note?.parentId)
  }

  const coverUpdate = doc?.note?.coverImg ? true : false

  return (
    <React.Fragment>
      {/* archive Banner */}
      {doc?.note?.isArchived && <div className='absolute top-0 z-20 w-[100%] h-10 text-xs bg-red-500 flex items-center gap-5 px-3'>
        <span>This item is Archived. Unarchive to make changes</span>
        <button onClick={handleArchieve} className='underline underline-offset-2 duration-100 hover:no-underline hover:text-black'>Unarchive</button>
        <button onClick={handleDelete} className='underline underline-offset-2 duration-100 hover:no-underline hover:text-black'>Delete permenantly</button>
      </div>}
      {/* Cover Image */}
      <div id='image' className='h-40 flex items-center justify-center relative overflow-hidden group/coverImg'>
        {/* dark screen */}
        {!doc?.note?.coverImg && <p className='absolute flex justify-center items-center top-0 left-0 w-[100%] h-[100%] bg-[#00000080]'>
          {isValidating && <Spinner />}
        </p>}
        {/* add button */}
        <span className='absolute hidden group-hover/coverImg:block bottom-0 right-0'>
          {!doc?.note?.isArchived ?
            <DialogButton edgestore={edgestore} coverUpdate={coverUpdate} id={docID} userId={doc?.note?.userId} coverImg={doc?.note?.coverImg} update={update} /> :
            <Button variant='outline' disabled={true}>Can&apos;t Change</Button>
          }
        </span>
        {/* remove button */}
        {doc?.note?.coverImg && !doc?.note?.isArchived &&
          <Button variant='outline'
            onClick={removeCover}
            disabled={loading}
            className='absolute hidden group-hover/coverImg:block top-0 right-0 text-lg'>
            <IoMdTrash />
          </Button>}
        {/* image */}
        {doc?.note?.coverImg ?
          <img src={doc?.note?.coverImg} alt='your cover image' style={{ maxWidth: '100%', height: 'auto' }} /> :
          <img src="/sample cover2.jpg" alt="sample image" style={{ maxWidth: '100%', height: 'auto' }} />
        }
      </div>

      {/* emoji icon */}
      <div className='h-12 flex justify-between items-center px-3 relative'>
        {!isValidating && <>
          <EmojiDialog id={docID} userId={doc?.note?.userId} emoji={doc?.note?.icon} loading={loading} setLoading={setLoading} />
          <Input type='text' onChange={handleTitle}
            className='border-none placeholder:text-white focus-visible:ring-0' defaultValue={doc?.note?.title} />
        </>}
        {isValidating || loading && <Spinner />}
      </div>

      {/* text editor */}
      <div className='h-[65%] md:h-80 overflow-y-auto relative' id='text-editor'>
        {isValidating && <span className='absolute top-[50%] left-[50%]'><Spinner /></span>}
        {!isValidating && <TextEditor id={docID} userId={doc?.note?.userId} parentId={doc?.note?.parentId} initialContent={doc?.note?.content} isValidating={isValidating} editable={!doc?.note?.isArchived} setLoading={setLoading} />}
        {/* <p className='absolute h-[100%] w-[100%] top-0 left-0 bg-gray-50'></p> */}
      </div>
    </React.Fragment>
  )
}

export default Document

export const revalidateDoc = (docID) => {
  mutate(`https://potion-docs.vercel.app/api/getDoc?id=${docID}`)
}