import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import useSWR, { mutate, preload } from 'swr'

import { useRouter } from 'next/navigation';
import { revalidateDoc } from '../Document'
import { add_new_doc, deleteDoc } from '@/app/_comps/actions'
import { archive } from '@/utils/serverAction'

import Item from './Item'
import Loading from './Loading'
import { BsPlusCircleFill, BsPlusCircle } from "react-icons/bs";

const fetcher = url => fetch(url).then(r => r.json())

const DocList = ({ parentId = null, depth = 0, flag, trash }) => {
  let [expanded, setExpanded] = useState({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const session = useSession()
  var userId = useSWR(`https://potion-docs.vercel.app/api/getId?email=${session.data?.user?.email}`, fetcher,).data?.id

  preload(`https://potion-docs.vercel.app/api/getDocs?userId=${userId}&parentId=${parentId}`, fetcher)
  const { data, error, isValidating, mutate } = useSWR(`https://potion-docs.vercel.app/api/getDocs?userId=${userId}&parentId=${parentId}`, fetcher, {
    optimisticUpdates: true,
    fallbackData: { data: [] },
    errorRetry: 3,
  })
  if (error){
    router.push('/home')
    return <>error retrieving data</>
  }

  const onExpand = (documentId) => {
    setExpanded(prevExpanded => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId]
    }));
  };

  const newDoc = async (parentId) => {
    setLoading(true)
    let res = await add_new_doc(userId, parentId, "Untitled")
    mutate(`https://potion-docs.vercel.app/api/getDocs?userId=${userId}&parentId=${parentId}`)
    router.push(`/home/${res}`)
    setLoading(false)
  }

  const handleArchieve = async (id, userId, isArchived) => {
    setLoading(true)
    let res = await archive(id, userId, isArchived)
    if (res)
      setLoading(false)
    mutate(`https://potion-docs.vercel.app/api/getDocs?userId=${userId}&parentId=${parentId}`)
    revalidateDoc(id)
  }

  const handleDelete = async (id, userId, parentId) => {
    setLoading(true)
    let res = await deleteDoc(id, userId, parentId)
    router.push('/')
    mutate(`https://potion-docs.vercel.app/api/getDocs?userId=${userId}&parentId=${parentId}`)
    revalidateDoc(id)
    if (res)
      setLoading(false)
  }

  var fltrdData;
  if (trash)
    fltrdData = data.notes?.filter(note => note.isArchived === true)
  else
    fltrdData = data.notes?.filter(note => note.isArchived === false)

  return (
    <div className='px-2'>
      {flag && !trash &&
        <button
          disabled={loading || isValidating}
          onClick={() => newDoc()}
          className='my-3 flex justify-between items-center group/newDoc w-full disabled:text-muted-foreground disabled:cursor-progress'>
          New Doc <span>
            <BsPlusCircleFill className='hidden group-hover/newDoc:block' />
            <BsPlusCircle className='block group-hover/newDoc:hidden' /></span>
          {flag = false}
        </button>
      }

      {isValidating && <div className={`text-sm text-stone-500 ${depth > 0 && 'pl-5'}`} ><Loading /></div>}

      {!isValidating && fltrdData?.length === 0 && <div className={`text-sm text-slate-500 ${depth > 0 && 'pl-5'}`}> No docs</div>}

      {!isValidating && fltrdData?.map((item) => (
        <div key={item.id} className={`${depth > 0 && 'pl-5'}`}>

          <Item item={item} newDoc={newDoc} handleArchieve={handleArchieve} onExpand={onExpand} expanded={expanded[item.id]} loading={loading} setLoading={setLoading} trash={trash} handleDelete={handleDelete} />

          {trash ? (expanded[item.id] && <DocList parentId={item.id} depth={depth + 1} trash={true} />) :
            (expanded[item.id] && <DocList parentId={item.id} depth={depth + 1} trash={false} />)
          }
        </div>
      ))}
    </div>
  )
}

export default DocList
export const revalidateList = (userId, parentId) => {
  mutate(`https://potion-docs.vercel.app/api/getDocs?userId=${userId}&parentId=${parentId}`)
}