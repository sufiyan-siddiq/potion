import prisma from "@/prisma"
import { connectToDB } from "@/utils"
import { NextRequest, NextResponse } from "next/server"


interface UpdateDocumentRequest {
    id: number;
    userId: number;
    title: string;
    coverImg: string;
    content: string;
    isArchived: boolean;
    icon: string;
}

export const PUT = async (req: NextRequest, res: NextResponse) => {
    try {
        await connectToDB();
        var { id, userId, title, coverImg, content, isArchived, icon }: UpdateDocumentRequest = await req.json();
        id = Number(id)
        const note = await prisma.document.update(
            {
                where: { id, userId },
                data: { title, coverImg, content, isArchived, icon }
            }
        )
        return NextResponse.json({ note }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    } finally {
        prisma.$disconnect()
    }
}