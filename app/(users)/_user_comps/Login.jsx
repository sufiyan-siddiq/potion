'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { signup } from '@/app/_comps/actions';
import { useRouter } from 'next/navigation';

import Spinner from '@/app/_comps/Spinner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";

const Login = ({ authType }) => {
    const { toast } = useToast();
    const router = useRouter()

    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);

    if (typeof window === undefined) return

    const handleLogin = async (data) => {
        setLoading(true);
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        });
        if (res.ok) {
            toast({ description: 'Login Succesfull !' });
            router.push('/home')
            location.reload()
        }
        else
            toast({
                variant: 'destructive',
                title: 'Not Found',
                description: 'Make sure the credentials are correct',
            });
        setLoading(false);
    };

    const handleSignUp = async (data) => {
        setLoading(true);
        let res = await signup(data.name, data.email, data.password);
        if (!res.ok) {
            let response = await res.json()
            toast({
                variant: 'destructive',
                title: 'Error: ',
                description: response.message,
            });

        }
        else
            toast({ title: 'Signup Succesfull', description: "Login to continue" });
        setTimeout(() => {
            location.reload()
        }, 700)
        setLoading(false)
    }

    return (
        <section>
            <form onSubmit={authType === 'login' ? handleSubmit(handleLogin) : handleSubmit(handleSignUp)} className='flex flex-col gap-5 mt-5'>
                {authType === 'signup' && (
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <Input placeholder='Name' name='name' type='name' {...register('name')} className='w-64 md:w-96 mt-2' required />
                    </div>
                )}
                <div>
                    <label htmlFor='email'>Email:</label>
                    <Input placeholder='Email' name='email' type='email' {...register('email')} className='w-64 md:w-96 mt-2' required />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <Input placeholder='Password' name='password' type='password' minLength={6} {...register('password')} className='w-64 md:w-96 mt-2' required />
                </div>
                <Button variant='outline' type='submit' disabled={loading}>
                    {authType === 'login' ? 'Login' : 'Signup'} &nbsp; {loading && <Spinner />}
                </Button>
                <Separator />
            </form>
            <Button
                variant='outline'
                className='mt-5 w-full'
                onClick={() => { setLoading(true); signIn('google', { redirect: false }) }}
                disabled={loading}>
                <FaGoogle /> &nbsp; Google &nbsp; {loading && <Spinner />}
            </Button>
        </section>
    );
};

export default Login;