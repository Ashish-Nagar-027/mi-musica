import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'



const layout = async ({children}: {children: React.ReactNode}) => {
     
    const data = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })


    if(!data?.user){
      redirect('/auth')
    }
    
  return children
  
}

export default layout