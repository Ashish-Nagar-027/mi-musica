import Streams from '@/components/stream/streamHome'
import React from 'react'

export default async function page({params}: {params: Promise<{creatorId: string}>}) {
    const {creatorId} = await params
   
  return (
    // <div>hello worlld id {creatorId}</div>
    <Streams creatorId={creatorId} isAdmin={false} />
  )
}

