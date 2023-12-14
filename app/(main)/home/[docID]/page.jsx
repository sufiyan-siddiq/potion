import React from 'react'
import Document from '@/app/(main)/_comps/Document'

const page = ({params}) => {

  return (
    <div className='w-[100%]'>
      <Document docID={params.docID}/>
    </div>
  )
}

export default page
