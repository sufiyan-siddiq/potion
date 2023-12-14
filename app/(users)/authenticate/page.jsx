import React from 'react'
import Login from '@/app/(users)/_user_comps/Login'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const page = () => {
    return (
        <div className='flex justify-center items-center py-10'>
            <Tabs defaultValue="Login" className="w-[80vw] md:w-[60vw] flex flex-col justify-center items-center">
                <TabsList>
                    <TabsTrigger value="Login" className='w-32 md:w-52'>Login</TabsTrigger>
                    <TabsTrigger value="Sign up" className='w-32 md:w-52'>Sign up</TabsTrigger>
                </TabsList>
                <TabsContent value="Login">
                    <Login authType='login' />
                </TabsContent>
                <TabsContent value="Sign up">
                    <Login authType='signup' />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default page
