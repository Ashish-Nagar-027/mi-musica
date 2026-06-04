import Streams from '@/components/stream/streamHome'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const page = async () => {
  
 
const data = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})

const userId = data?.user?.id ;

if(!userId){
  return <p>not found</p>
}

  return (
     <Streams creatorId={userId} isAdmin={true} />
  )
}

export default page