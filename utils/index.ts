import prisma from "@/prisma"
import {db} from '@vercel/postgres'
export const connectToDB = async ()=>{
    try {
        await db.connect()
        await prisma.$connect();
    } catch (error:any) {
        return new Error(error.message)
    }
}