"use client";

import { useEffect, useState } from "react";
import Signup from "./sign-up";
import SignIn from "./sign-in";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const AuthScreen = () => {
  const [showSignup, setshowSignup] = useState<boolean>(false);

  const router = useRouter()
      const { 
        data: session, 
        isPending 
    } = useSession() 

  useEffect(() => {
   if(session && !isPending){
        router.replace('/')
    }
  },[router, session, isPending,])



  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col">
      {isPending ? <p>Loading...</p>: showSignup ? <Signup setshowSignup={setshowSignup} /> : <SignIn setshowSignup={setshowSignup} />}
    </div>
  );
};

export default AuthScreen;
