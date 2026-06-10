import Streams from '@/components/stream/streamHome'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { headers } from 'next/headers'
import React from 'react'

export default async function page({params}: {params: Promise<{spaceId: string}>}) {
    const {spaceId} = await params

  const data = await auth.api.getSession({
      headers: await headers() // you need to pass the headers object.
  })

  const user = data?.user

    
    const getSpaceData = async () => {
           return await prisma.space.findUnique({
                where: {
                    id : spaceId
                }
            })
    }

    const spaceData = await getSpaceData()
    
    const isAdmin = spaceData?.hostId === user?.id

    


  return (
    // <div>hello worlld id {creatorId}</div>
    <Streams userId={ user?.id || ""} spaceId={spaceId} isAdmin={isAdmin}  />
  )
}

