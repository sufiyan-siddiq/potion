import prisma from "@/prisma"
import { connectToDB } from "@/utils"
import { NextRequest, NextResponse } from "next/server"

interface newDoc {
    title: string;
    userId: number;
    parentId: number;
    content: string;
}

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        await connectToDB();
        const { title, userId, parentId }:newDoc = await req.json();

        const newDoc = await prisma.document.create(
            { data: { title, userId, parentId, isArchived: false } }
        )
        return NextResponse.json({ newDoc }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    } finally {
        prisma.$disconnect()
    }
}