import prisma from "@/prisma"
import { connectToDB } from "@/utils"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        await connectToDB();
        const id = Number(req.nextUrl.searchParams.get('id'));
        const note = await prisma.document.findFirst({ where: { id } })
        return NextResponse.json({ note }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    } finally {
        prisma.$disconnect()
    }
}