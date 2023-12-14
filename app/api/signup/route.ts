import prisma from "@/prisma"
import { connectToDB } from "@/utils"
import { NextRequest, NextResponse } from "next/server"


export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        await connectToDB();
        const { name, email, password } = await req.json();
        const userExist = await prisma.user.findFirst({ where: { email } })
        if (userExist)
            return NextResponse.json({ message:"email already exist" }, { status: 403 })

        const user = await prisma.user.create({
            data: { name, email, password }
        })
        console.log("user: ",user)
        return NextResponse.json({ user }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    } finally {
        prisma.$disconnect()
    }
}