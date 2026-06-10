import Navbar from "@/components/navbar";
import CreateSpaceCard from "@/components/space/createSpaceCard";
import SpaceCard from "@/components/space/spcaeCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export interface spaceTypes {
  id: string;
  createdAt: Date;
  name: string;
}

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;

  async function getSpaces() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/spaces?userId=${userId}`,
    );
    const spaces = await res.json();

    return spaces || [];
  }
  const fetchSpaces = await getSpaces();
  const spaces = fetchSpaces?.data || [];


  return (
    <div>
      <Navbar />
      Hello world
      <div className="mt-14 p-2 px-10">
        <div>
          <span className="text-2xl font-bold ">My Spaces</span>
        </div>

        <div className="mt-10">
          <CreateSpaceCard />
          <div className="mt-8 flex gap-8 flex-wrap">
            {spaces?.map((s: spaceTypes) => {
              return <SpaceCard space={s} key={s.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
