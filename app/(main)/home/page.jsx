import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <div className='w-[100%] h-[90vh] flex flex-col justify-center items-center'>
      <Image src='/sample.png' width={250} height={250}/>
      <span>Create Doc or Select one</span>
    </div>
  )
}

export default page
