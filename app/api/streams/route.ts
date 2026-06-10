import getCurrentUserId from "@/helpers/getUserId";
import { getYoutubeData } from "@/helpers/youtubeHelper";
import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";
import z from "zod";



const createStreamSchema = z.object({
//   creatorId: z.string(),
  url: z.string().url().refine((value) => {
    const parsedUrl = new URL(value);



    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1).length === 11;
    }

    if (
      parsedUrl.hostname === "youtube.com" ||
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "m.youtube.com"
    ) {
      return (
        parsedUrl.pathname === "/watch" &&
        parsedUrl.searchParams.get("v")?.length === 11
      );
    }

    return false;
  }, {
    message: "Invalid YouTube URL",
  }),
  spaceId : z.string()
});



export async function POST(req: NextRequest){
    try {
        const data =  createStreamSchema.parse(await req.json())

        // const currentUserId = await getCurrentUserId()
         const creatorId = req.nextUrl.searchParams.get('creatorId')
        const parsedUrl = new URL(data.url);
        const extractedId = parsedUrl.hostname === "youtu.be"
        ? parsedUrl.pathname.slice(1)
        : parsedUrl.searchParams.get('v');

        if(!extractedId){
            throw new Error("Invalid Youtube URl")
        }

        if(!creatorId){
             throw new Error("Please send creator Id")
        }

        const videoData = await getYoutubeData(extractedId)

        let title = "" , author_name = "", thumbnail_url=""


        if(videoData.data){
            title=videoData.data.title
            author_name=videoData.data.author_name
            thumbnail_url=videoData.data.thumbnail_url
        }

      const existingStreams = await prisma.stream.findFirst({
        where : {
            spaceId: data.spaceId,
            played: false
        }, 
        select: {
            id: true,
        }
      })

      const newStream = await prisma.stream.create({
            data: {
                title, author_name , thumbnail_url,
                userId: creatorId,
                url: data.url,
                extractedId,
                active: !existingStreams,
                spaceId: data.spaceId
            }
        })

        return NextResponse.json({
            status: 201,
            message: "stream created succesfully",
            newStream: newStream,
        })

    } catch (error) {
        console.log('error ',error)
        return NextResponse.json({
            message: 'failed creating streams'
        }, {
            status: 411
        })
    }
}


export async function GET(req: NextRequest){
    try {

        const spaceId = req.nextUrl.searchParams.get('spaceId')
        const currentUserId = await getCurrentUserId()

        const streams = await prisma.stream.findMany({
            where: {
                spaceId: spaceId ?? "",
                played: false
            },
            include: {
                _count: {
                    select: {
                        upvotes: true
                    }
                },
                upvotes: {
                    where: {
                        userId: currentUserId
                    }
                }

            },  
        })
        const currentStream = streams.filter(s => s.active)
   
        return NextResponse.json(
            {streams: streams?.filter(s => !s?.active )
                .map((s) => (
                    {...s, 
                        upvotes:s._count?.upvotes, 
                        haveUpVoted: s.upvotes.length ? true : false 
                    })), 

                currentStream:currentStream.length > 0 ? currentStream[0] : null
            })
        
    } catch (error) {
          console.log('error ',error)
        return NextResponse.json({
            message: 'Internal server error'
        }, {
            status: 500
        })
    
    }
}