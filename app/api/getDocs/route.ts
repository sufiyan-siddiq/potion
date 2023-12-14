// import prisma from "@/prisma"
// import { connectToDB } from "@/utils"
// import { NextRequest, NextResponse } from "next/server"

// interface details {
//     userId: number;
//     parentId: string;
// }

// export const GET = async (req: NextRequest, res: NextResponse) => {
//     try {
//         await connectToDB();
//         // const rqst = req.nextUrl.searchParams.get('userId')
//         const { userId, parentId }:details = await Object.fromEntries(req.nextUrl.searchParams)
//         const notes = await prisma.document.findMany({where: 
//             {userId, parentId}
//         })
//         return NextResponse.json({ notes }, { status: 200 })
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 })
//     } finally {
//         prisma.$disconnect()
//     }
// }
import prisma from "@/prisma"
import { connectToDB } from "@/utils"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        await connectToDB();

        const userId = Number(req.nextUrl.searchParams.get('userId'));
        const parentId = Number(req.nextUrl.searchParams.get('parentId'));
        const notes = await prisma.document.findMany({
            where: { userId, parentId }
        });

        return NextResponse.json({ notes }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        prisma.$disconnect();
    }
}