'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from "@uidotdev/usehooks";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { BsFileEarmarkFill, BsTrashFill } from "react-icons/bs";
import { cn } from '@/lib/utils';

import DocList from './sidebar/DocList'

const Sidebar = () => {
  const sliderRef = useRef()
  const menuRef = useRef()
  let resizing = false

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  let [collapsed, setCollapsed] = useState(isSmallDevice)
  useEffect(() => {
    if (collapsed) menuRef.current.style.width = `0px`
    else {
      if (isSmallDevice) menuRef.current.style.width = `70vw`
      else menuRef.current.style.width = `22vw`
    }
  }, [collapsed])

  const handleMouseDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    resizing = true
    sliderRef.current.classList.add('bg-[#bfacfb]');
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  const handleMouseMove = (event) => {
    if (!resizing) return
    var width = event.clientX
    if (!isSmallDevice && width < 200) width = 200;
    else if (!isSmallDevice && width > 600) width = 600;
    menuRef.current.style.width = `${width}px`
  }
  const handleMouseUp = () => {
    resizing = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    sliderRef.current.classList.remove('bg-[#bfacfb]')
  }

  return (
    <div>

      {collapsed && <span className='cursor-pointer' onClick={() => setCollapsed(!collapsed)}><ChevronsRight /></span>}

      <aside className={cn('group/sidebar h-[100%] transition duration-200 relative bg-neutral-900 rounded overflow-auto', collapsed && 'w-0 px-0', isSmallDevice && 'w-[70vw] max-w-[70vw]', isSmallDevice && collapsed && 'w-0')} ref={menuRef}>

        {!collapsed && <span
          className={cn('absolute top-2 right-2 cursor-pointer hidden group-hover/sidebar:block')}
          onClick={() => setCollapsed(!collapsed)}>
          <ChevronsLeft />
        </span>}

        {/* Slider  */}
        <div
          onMouseDown={handleMouseDown}
          className={'absolute bg-neutral-700 top-0 right-0 h-full grid place-items-center hover:text-black hover:bg-[#bfacfb] cursor-ew-resize'}
          ref={sliderRef}>⁝</div>

        <Tabs defaultValue="docs" className="w-[100%] max-h-[80%] mt-3 overflow-x-hidden overflow-y-auto">
          <TabsList className='bg-background w-[90%] h-12 text-white'>
            <TabsTrigger value="docs" className='w-[70%] h-10 data-[state=active]:bg-neutral-900'>Docs <BsFileEarmarkFill className='ml-4' /> </TabsTrigger>
            <TabsTrigger value="trash" className='w-[30%] h-10 data-[state=active]:bg-neutral-900'><BsTrashFill /></TabsTrigger>
          </TabsList>
          <TabsContent value="docs" className='px-3'>
            <DocList flag={true} trash={false} />
          </TabsContent>
          <TabsContent value="trash">
            <div className='mx-2 my-3'>Archived Box</div>
            <DocList flag={true} trash={true} />
          </TabsContent>
        </Tabs>

      </aside>
    </div>
  )
}

export default Sidebar