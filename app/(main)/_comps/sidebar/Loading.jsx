import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (
        <div className='my-4'>
            <div className='flex gap-2'><Skeleton className="h-2 w-2 rounded-full" /><Skeleton className="h-2 w-2 rounded-full" /><Skeleton className="h-2 w-20" /><Skeleton className="h-2 w-2 rounded-full" /></div>
        </div>
    )
}

export default Loading
