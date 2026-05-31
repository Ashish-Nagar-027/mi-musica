"use client";

import { useState } from "react";
import Signup from "./sign-up";
import SignIn from "./sign-in";
import { authClient, useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const AuthScreen = () => {
  const [showSignup, setshowSignup] = useState<boolean>(false);
      const { 
        data: session, 
        isPending
    } = useSession() 

    if(session){
        redirect('/')
    }

  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col">
      {isPending ? <p>Loading...</p>: showSignup ? <Signup setshowSignup={setshowSignup} /> : <SignIn setshowSignup={setshowSignup} />}
    </div>
  );
};

export default AuthScreen;
