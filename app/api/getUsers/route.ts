import prisma from "@/prisma"
import { connectToDB } from "@/utils"
import { NextRequest, NextResponse } from "next/server"


export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        await connectToDB();
        const users = await prisma.user.findMany()
        return NextResponse.json({ users }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    } finally {
        prisma.$disconnect()
    }
}