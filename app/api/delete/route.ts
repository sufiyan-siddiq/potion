import prisma from "@/prisma"
import { connectToDB } from "@/utils"
import { NextRequest, NextResponse } from "next/server"

interface deleteDoc {
    id: number;
    userId: number;
    parentId: number;
}

export const DELETE = async (req: NextRequest, res: NextResponse) => {
    try {
        await connectToDB();
        const { id, userId, parentId }: deleteDoc = await req.json();

        const deleteDoc = await prisma.document.delete({ where: { id, userId, parentId } })

        return NextResponse.json({ deleteDoc }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    } finally {
        prisma.$disconnect()
    }
}