import getCurrentUserId from "@/helpers/getUserId";
import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";
import z from "zod";

const createSpaceSchema = z.object({
  name: z.string(),
});

//create space
export async function POST(req: NextRequest) {
    const body =await req.json()

  const data =  createSpaceSchema.parse(body);
  try {
    const currentUserId = await getCurrentUserId();

    await prisma.space.create({
      data: {
        hostId: currentUserId,
        name: data.name,
      },
    });

    return NextResponse.json({
      status: "ok",
      message: "Space created Succesfully",
    });
  } catch (error) {
    return NextResponse.json({ message: "something went wrong" });
  }
}

//  get spaces
export async function GET(request: NextRequest) {
  try {

      // console.log("currentUserIdcurrentUserIdcurrentUserId", request.headers.get("cookie"));
  // const currentUserId = await getCurrentUserId()

  const userId = request.nextUrl.searchParams.get('userId')

  if(!userId){
    return NextResponse.json({ message: "userId is required" });
  }

    const spaces = await prisma.space.findMany({
      where: {
        hostId: userId,
      },
    });

    return NextResponse.json({ status: "ok", data: spaces });
  } catch (err) {
    console.log('error ', err)
    return NextResponse.json({ message: "something went wrong" });
  }
}

//delete space
export async function DELETE(req: NextRequest) {
  try {
    const spaceId = await req.nextUrl.searchParams.get("spaceId");
    if (!spaceId) {
      return NextResponse.json({ message: "spaceId is required" });
    }

    const currentUserId = await getCurrentUserId();

    const space = await prisma.space.findFirst({
      where: {
        id: spaceId,
        hostId: currentUserId,
      },
    });

    if (!space) {
      return NextResponse.json({ message: "space not found" });
    }

    await prisma.space.delete({
      where: {
        id: spaceId,
      },
    });

    await prisma.stream.deleteMany({
      where: {
        spaceId: spaceId
      }
    })

    return NextResponse.json({
      status: "ok",
      message: "Space deleted succesfully",
    });
  } catch (error) {
    return NextResponse.json({ message: "something went wrong" });
  }
}
