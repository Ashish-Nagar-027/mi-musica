import getCurrentUserId from "@/helpers/getUserId";

import prisma from "@/lib/prisma";

import { NextResponse, type NextRequest } from "next/server";
import z from "zod";

const upvoteSchema = z.object({
    streamId: z.string()
})

export async function POST(req: NextRequest) {
 try {

    const data = upvoteSchema.parse(await req.json())
    
    const userId = await getCurrentUserId()

    await prisma.upvote.create({
        data : {
            userId, 
            streamId: data.streamId
        }
    })
    return NextResponse.json({
        message: "upvoted"
    })
 } catch (error) {
    console.log(error)
    return NextResponse.json({
        message : "Failed upvoting stream"
    }, {
        status: 411
    })
 }
}


