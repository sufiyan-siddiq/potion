'use client'
import React, { useState } from 'react'
import { Sun, Moon } from 'lucide-react'

const Toggle = () => {
    const [mode, setMode] = useState(false)
    console.log("mode: ", mode)
    return (
        <div className='flex items-center border rounded py-5 px-2 cursor-pointer' onClick={() => { setMode(!mode) }}>
            <Sun className={`transition-all duration-200  ${mode ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
            <Moon className={`absolute transition-all duration-200 ${mode ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
        </div>
    )
}

export default Toggle
