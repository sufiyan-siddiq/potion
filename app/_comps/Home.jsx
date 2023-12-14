import Link from 'next/link'
import Image from 'next/image'
import Navbar from "../_comps/Navbar"

import { FaFacebookSquare, FaLinkedin, FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";
import { PiArrowRightBold } from "react-icons/pi";
import { buttonVariants } from '@/components/ui/button';


export default function Home() {
    return (
        <>
            <Navbar />
            <main className='overflow-hidden'>
                <header className='flex flex-col md:flex-row items-center justify-around h-[80vh] mt-5' >
                    <div className='text-center space-y-5'>
                        <h1 className='text-5xl font-bold'>Your Ideas, Documents & <br /> Plans Unified</h1>
                        <h2 className="text-center my-3 text-4xl">Welcome to <span className="nav" style={{ fontSize: '2.5rem' }}>Potion</span>.</h2>
                        <Link href='/authenticate' className={buttonVariants({ variant: 'default' })}>
                            <span>Get for free</span>
                            <span><PiArrowRightBold /></span>
                        </Link>
                    </div>
                    <Image src='/banner.png' width={400} height={400} alt='cartoon' />
                </header>

                {/* why us */}
                <div className='w-[100vw] h-[30vh] md:h-[65vh] my-10 relative'>
                    <Image src='/whyus.png' layout='fill' alt='Why Us?' />
                </div>
            </main>

            <div className='flex flex-col gap-16 lg:flex-row items-center justify-around my-16'>
                <section className='text-center space-y-5'>
                    <h1 className='text-4xl'>Thousands run Potion Daily</h1>
                    <p>Powering the world’s best teams, <br /> from next-generation startups to established enterprises.</p>
                </section>
                <section className='space-y-10'>
                    <div className='flex justify-center items-center gap-2 md:gap-10 ' >
                        <Image src='/figma.png' width={100} height={100} alt='figma' />
                        <Image src='/pixar.jpg' width={100} height={100} alt='pixar' />
                        <Image src='https://images.ctfassets.net/spoqsaf9291f/1jlyWNfa8mnYxJtmzu5lpV/4072e10330206f9057fe77ab19ce1bca/doordash.png' width={100} height={100} alt='dooddash' />
                        <Image src='/nike.jpg' width={70} height={70} alt='nike' />
                    </div>
                    <div className='flex justify-center items-center gap-2 md:gap-10' >
                        <Image src='/amazon.png' width={80} height={80} alt='amazon' />
                        <Image src='https://images.ctfassets.net/spoqsaf9291f/6WgTu82608DIXfxu9KliYL/326d36bbde762fd9c1800872db81244c/pinterest.png' width={100} height={100} alt='pintrest' />
                        <Image src='https://images.ctfassets.net/spoqsaf9291f/LnKYnStAE4vKs51ejLRj2/69cb3e0382538d4c925208ea24f253f5/General_Electric_logo.svg__1_.png' width={50} height={50} alt='General_Electric' />
                        <Image src='/uber.png' width={70} height={70} alt='Uber' />
                    </div>
                    <div className='flex justify-center items-center gap-2 md:gap-10'>
                        <Image src='/plaid.png' width={120} height={120} alt='Plaid' />
                        <Image src='https://images.ctfassets.net/spoqsaf9291f/346udUCJm76OzP8M0yI78w/81099c4f771df9286782581fe18d0efc/snowflake.png' width={100} height={100} alt='snow flake' />
                        <Image src='/headspace.jpg' width={100} height={100} alt='headspace' />
                    </div>
                </section>
            </div>

            <div className='text-center'>
                <h1 className='text-4xl my-5'>Join a global movement. <br /> Unleash your creativity.</h1>
                <div className='flex flex-col md:flex-row justify-center items-center gap-5'>
                    <section className='border p-6 rounded'>
                        <h1 className='text-4xl text-[#c55df6]'>1M+</h1>
                        <p>community members</p>
                    </section>
                    <section className='border p-6 rounded'>
                        <h1 className='text-4xl text-[#c55df6]'>150+</h1>
                        <p>community groups</p>
                    </section>
                    <section className='border p-6 rounded'>
                        <h1 className='text-4xl text-[#c55df6]'>50+</h1>
                        <p>countries represented</p>
                    </section>
                </div>
            </div>

            <div className='flex flex-col md:flex-row justify-around items-center my-16'>
                <Image src='/sample.png' width={300} height={300} alt='image' />
                <section className='text-center space-y-5'>
                    <h1 className='text-4xl'>Get started for free</h1>
                    <p>Potion is a practice webapp created to replicate a few functionalities of <Link href='https://www.notion.so/' className='duration-150 underline underline-offset-2 hover:underline-offset-4'>Notion </Link></p>
                    <Link href='/authenticate' className={buttonVariants({ variant: 'default' })}>
                        <span>Get for free</span>
                        <span><PiArrowRightBold /></span>
                    </Link>
                </section>
            </div>
            <hr />
            <footer className='flex flex-col md:flex-row justify-between items-center px-5 py-2 my-5 gap-10'>
                <div>
                    <p>Copyright ©️ 2023 Potion®️</p>
                </div>
                <div className='flex gap-3 text-xl'>
                    <Link className='duration-100 hover:text-[#c55df6] cursor-pointer' href='https://www.linkedin.com/in/sufiyan-siddiqui-a59457283/'><FaFacebookSquare /></Link>
                    <Link className='duration-100 hover:text-[#c55df6] cursor-pointer' href='https://www.linkedin.com/in/sufiyan-siddiqui-a59457283/'><FaLinkedin /></Link>
                    <Link className='duration-100 hover:text-[#c55df6] cursor-pointer' href='https://www.linkedin.com/in/sufiyan-siddiqui-a59457283/'><FaTwitter /></Link>
                    <Link className='duration-100 hover:text-[#c55df6] cursor-pointer' href='https://www.linkedin.com/in/sufiyan-siddiqui-a59457283/'><FaDiscord /></Link>
                </div>
            </footer>
        </>
    )
}
