
'use client'
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";


const Navbar = () => {

  const { data, refetch } = useSession();

  const router = useRouter();
  const  pathName = usePathname()
  console.log('path', pathName)

  const handleLogout = async () => {

    await authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          await authClient.signOut();
          await refetch();
          router.replace("/auth");
        },
      },
    });
  };

  return (
      
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-surface/80 px-10 py-4 backdrop-blur-xl">
        {/* Logo + Links */}
        <div className="flex items-center gap-8">
          <Link href={'/'} className="font-sans text-fuchsia-300/90  text-2xl font-bold tracking-tight">
            SonicPulse
          </Link>

          <div className="hidden gap-6 md:flex"></div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {data?.session ? (
            <>
             {pathName === "/" && <Link
                href={"/stream"}
                className="material-symbols-outlined transition hover:text-primary active:scale-95"
              >
                Dashboard
              </Link>}
              <button
                onClick={handleLogout}
                className="material-symbols-outlined transition hover:text-primary active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href={"/auth"}
              className="material-symbols-outlined transition hover:text-primary active:scale-95"
            >
              Login
            </Link>
          )}

          <div className="h-8 w-8 overflow-hidden rounded-full border border-white/10 cursor-pointer">
            {data?.user?.image ? (
              <Image
                src={data?.user?.image}
                alt="User Avatar"
                width={50}
                height={50}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full object-cover grid place-items-center font-bold text-xl">
                {data?.user?.name[0]?.toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </nav>
  )
}

export default Navbar