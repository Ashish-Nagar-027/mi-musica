import {signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const Signup = ({setshowSignup}: {setshowSignup: React.Dispatch<React.SetStateAction<boolean>>}) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if(error){
        setError('')
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {name, email , password} = formData
   if (!name || !email || !password) return

    const { data, error } = await signUp.email({
...formData,
},
{
        onRequest: (ctx) => {
            //show loading
            setLoading(true)
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
             console.log('sign up succesfully ', ctx.data.message)
      router.push("/");
        },
        onError: (ctx) => {

             console.log('sign up failed  ', error)
    if(ctx.error.message) setError(ctx.error.message)


            
        },
}

);

  };

  const handleGoogleLogin = async () => {
    console.log("Google Login");
    await signIn.social({
    provider: "google",
    callbackURL: "/", 
});
  };

  return (
    <div className="min-h-fit flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-blue-500">
          Create Account
        </h1>
        {error && <p className="p-2 text-center text-red-500 border-2 my-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-950">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

         <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
            disabled={loading}
          >
          { loading ? "Signing up ..." :  "Sign Up"}
          </button>
        </form>

        <div className="my-5 flex items-center">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-800 text-gray-800 py-2 font-medium transition hover:bg-gray-50"
        >
          <FaGoogle size={18} />
          Continue with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button onClick={() => setshowSignup(false)} className="font-medium text-blue-600 hover:underline  cursor-pointer">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;