import getCurrentUserId from "@/helpers/getUserId";
import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    try {
          const currentUserId = await getCurrentUserId()
          const spaceId = await req.nextUrl.searchParams.get('spaceId')
          

          const updateStreams = await prisma.stream.updateMany({
             where: {
               spaceId: spaceId,
               active: true,
             },
             data: {
                active : false,
                played: true,
                PlayedTs: new Date()

             }
          })
       
          const activateNextStream = await prisma.stream.findFirst({
            where: {
                spaceId : spaceId,
                active: false,
                played: false,
            },
           orderBy: {
            upvotes: {
                _count: "desc"
            }
           }
          })


          if(!activateNextStream){
          return  NextResponse.json({message: "no next stream found",  nextStream: null})
          }
          const nextStream = await prisma.stream.update({
            where: {
                id: activateNextStream.id
            },
            data: {
                active: true
            }
          })

         return NextResponse.json({
            mesage: 'play next stream', 
            nextStream
         })

    } catch (error) {
        console.log('error playing next song ', error)
        return NextResponse.json({
            error: 'failed update next stream'
        })
    }
    
}