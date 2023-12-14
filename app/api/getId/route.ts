import prisma from "@/prisma"
import { connectToDB } from "@/utils"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        await connectToDB();
        // const rqst = req.nextUrl.searchParams.get('userId')
        const { email } = Object.fromEntries(req.nextUrl.searchParams)
        var id:any = await prisma.user.findFirst({
            where:
                //@ts-ignore
                { email }
        })
        id = id?.id
        return NextResponse.json({ id }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    } finally {
        prisma.$disconnect()
    }
}