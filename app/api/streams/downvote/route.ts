import getCurrentUserId from "@/helpers/getUserId";

import prisma from "@/lib/prisma";

import { NextResponse, type NextRequest } from "next/server";
import z from "zod";

const downvoteSchema = z.object({
    streamId: z.string()
})

export async function POST(req: NextRequest) {
 try {

    const data = downvoteSchema.parse(await req.json())
      const userId = await getCurrentUserId()

      await prisma.upvote.delete({
        where : {
            userId_streamId : {
                userId, 
                streamId: data.streamId
            }
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