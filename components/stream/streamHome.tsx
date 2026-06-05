
'use client'
import { useEffect, useState } from "react";
import {
  Play,
  ArrowUp,
  Link as LinkIcon,
  Clock,
  MessageCircle,
  User,
} from "lucide-react";
import QueueCard from "@/components/stream/QueueCard";
import { toast } from "sonner";
import YoutubeVideoPlayer from "./YoutubeVideoPlayer";
import Image from "next/image";
import Navbar from "../navbar";

type QueueItem = {
  id: string;
  title: string;
  author_name: string;
  thumbnail_url: string;
  votes: number;
  extractedId? : string;
  url: string;
  haveUpVoted?: boolean;
  upvotes : number,

};



export default function Streams({creatorId , isAdmin=false}: {creatorId: string, isAdmin:boolean}) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [currentSong, setCurrentSong] = useState<QueueItem | null>(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextStreamLoading, setNextStreamLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const userId = creatorId



  const handleVote = async (streamId: string, vote: "upvote" | "downvote") => {
    try {
        
        const res =  await fetch('/api/streams/'+vote, {
          method: "POSt",
          body: JSON.stringify({streamId})
        })
         await res.json()
         toast.success(`Your  ${vote} Added Successfully!`)
         if(vote === "upvote"){
            setQueue((q) => 
            q?.map(q => {
                if(q.id === streamId){
                    return {...q, upvotes: q.upvotes+1,haveUpVoted: true}
                }
                return {...q}
            })
            ?.sort((a: QueueItem,b: QueueItem) => b?.upvotes-a?.upvotes)
          )
         } else {

        setQueue((q) => 
            q?.map(q => {
                if(q.id === streamId){
                    return {...q, upvotes: q.upvotes-1, haveUpVoted: false}
                }
                return {...q}
            })
            ?.sort((a: QueueItem,b: QueueItem) => b?.upvotes-a?.upvotes)
        )

            
         }
    } catch (error) {
            toast.error(`${vote}ing Failed!`)
    }

  };

  const handleSubmit = async () => {
    if (!url.trim()) return;
     
    try {
        setLoading(true)
      const res = await fetch('/api/streams/?creatorId='+userId, {
        method: "POSt",
        body: JSON.stringify({url})
      })
      const result = await res.json()
    //   console.log('result ',result)
    if(result.newStream){
        if(result.newStream.active){
            setCurrentSong(result.newStream)
            // return
        } else {
            setQueue([...queue, result.newStream])
        }
    }
    setUrl("")
  
    } catch (error) {
        const errorMesssage =  "Unable to add it"
        setApiError(errorMesssage)

    } finally{
           setLoading(false)
    }

  };

  useEffect(()=> {
     let isFetching = false;
    const fetchStreams = async () => {
        if(isFetching) return

        isFetching = true
      try {
       const res = await fetch('/api/streams/?creatorId='+userId)
       const result = await res.json()
       const streams = result.streams
       const currentStream = result.currentStream

       setQueue(streams?.sort((a: QueueItem,b: QueueItem) => b?.upvotes-a?.upvotes))
       if(currentStream ){
           setCurrentSong(currentStream)
       }
      } catch (error) {
        console.log('error ',error)
      } finally{
        isFetching = false
      }
    }
    fetchStreams()

  const intervalId = setInterval(() => {
  console.log("polling...");
  fetchStreams();
}, 10000);

    // Cleanup function returned by useEffect
    return () => clearInterval(intervalId);
  },[])

  const handleShareUrl = () => {
    if(userId){
      const url = window.location.host+"/stream/"+userId
      navigator.clipboard.writeText(url)
      toast.success("copied!")
    } else {
      toast.error('failed to copy')
    }
  }


  const handlePlayStream = async () => {
    try {
        setNextStreamLoading(true)
        const res = await fetch("api/streams/next")
        const result = await res.json()

        if(result.nextStream){
           setCurrentSong(result.nextStream)
        }
        setQueue(q => q.filter(s => s.id !== result?.nextStream?.id))

        
    } catch (error) {
        toast.error('failed playing next song')
        console.log('error playing next song', error)
    } finally{
        setNextStreamLoading(false)
    }
  }


  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-[#131313] text-white">
      {/* Header */}
      <Navbar />

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(232,121,249,.08),transparent_35%)] p-10 mt-14">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Side */}
          <section className="flex flex-col gap-6 lg:col-span-7">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold">Main Stage</h2>
              <button onClick={handleShareUrl} className=" text-zinc-500 border py-2 px-4 rounded-xl  hover:bg-fuchsia-300/90 active:bg-fuchsia-300 cursor-pointer ">
                Share 
              </button>
            </div>

            {/* Hero Player */}
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="relative aspect-video">


              {(currentSong) ?
                <>
                {/* <iframe 
                allow="autoplay"
                width="560" 
                height="315" 
                style={{minWidth:'100%', minHeight:"100%"}}
                src={`https://www.youtube.com/embed/${currentSong.extractedId}?autoplay=1`}
                title="YouTube video player"
                 ></iframe> */}
                 {isAdmin ?
                    <YoutubeVideoPlayer videoId={currentSong.extractedId || ""} onEnd={handlePlayStream}/>
                    :
                    <Image
                    height={"100"}
                    width={"500"}
                      style={{minWidth:'100%', minHeight:"100%"}}
                  src={`https://img.youtube.com/vi/${currentSong.extractedId}/maxresdefault.jpg` }
                  alt="cover"
                  className="h-full w-full object-cover opacity-60 transition duration-700 hover:scale-105"
                /> 
                }

                 

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent hidden" />

                {/* <button className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fuchsia-300/90 text-black shadow-[0_0_30px_rgba(232,121,249,.4)]">
                  <Play className="h-10 w-10 fill-current" />
                </button> */}

                <div className="absolute bottom-8 left-10">
                  <span className="mb-4 inline-block rounded-full bg-fuchsia-300/90 px-3 py-1 text-xs font-bold text-black">
                    NOW STREAMING
                  </span>

                  {/* <h3 className="mb-2 text-5xl font-black">
                    Neon Drift - Synthwave Special
                  </h3>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-fuchsia-300">
                      <User size={14} />
                      Uploaded by: CyberArtisan
                    </div>

                    <span className="text-white/20">•</span>

                    <span className="text-zinc-400">
                      Duration: 04:22
                    </span>
                  </div> */}
                </div>
                </> : 
                  <div className="absolute top-1/2 left-1/2 -translate-1/2">
                  <span className="mb-4 inline-block rounded-full border border-fuchsia-300/80 px-8 py-4 text-xl font-bold text-fuchsia-300/90 ">
                    Nothing to Stream
                  </span>
                  </div>
                   }
              </div>
            </div>
             { isAdmin &&  
             <button 
             disabled={nextStreamLoading} 
             onClick={handlePlayStream} 
             className=" cursor-pointer rounded-full bg-fuchsia-300/90 px-3 py-2 text-xs font-bold text-black">
                    {nextStreamLoading ? "Loading Next...":"Play Next"}
                </button>}


            {/* Queue */}
            <div className="border p-6 mt-2 rounded-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">
                  Up Next
                </h3>

                {/* <button className="text-sm font-bold uppercase tracking-widest text-fuchsia-300">
                  View All
                </button> */}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {queue?.length === 0  ? <span className="text-center">No songs found</span >: queue.map((item) => (
                  <QueueCard
                    key={item.id}
                    item={item}
                    onVote={handleVote}
                  />
                ))}
              </div>

  
            </div>
          </section>

          {/* Right Side */}
          <aside className="lg:col-span-5">
            <div className="rounded-[32px] border border-fuchsia-300/90/20 bg-white/5 p-6 backdrop-blur-xl">
              <h4 className="mb-1 text-2xl font-semibold">
                Submit to the Pulse
              </h4>

              <p className="mb-4 text-zinc-400">
                Add your YouTube track to the queue.
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="YouTube URL..."
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 py-4 pl-12 pr-4 outline-none transition focus:border-fuchsia-300/90"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full rounded-xl bg-fuchsia-300/90 py-4 text-lg font-bold text-black transition hover:shadow-[0_0_30px_rgba(232,121,249,.35)] disabled:opacity-60"
                >
                  {loading
                    ? "Processing..."
                    : "Submit to Queue"}
                </button>
{apiError && <span className="text-red-400 block text-center">{apiError}</span>}
                <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
                  <Clock size={14} />
                  <span>Max track length: 8 mins</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="group fixed bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-full bg-fuchsia-300/90 text-black shadow-2xl transition hover:scale-110">
        <MessageCircle className="h-7 w-7 transition group-hover:rotate-12" />

        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          12
        </div>
      </button>
    </div>
  );
}