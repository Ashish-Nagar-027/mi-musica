import {
  Play,
  ArrowUp,
  Link as LinkIcon,
  Clock,
  MessageCircle,
  User,
} from "lucide-react";


type QueueItem = {
  id: string;
  title: string;
  author_name: string;
  thumbnail_url: string;

  extractedId? : string;
  url: string;
  haveUpVoted?: boolean;
  upvotes? : number
};

export default function QueueCard({
  item,
  onVote,
}: {
  item: QueueItem;
  onVote: (streamId: string, vote: "upvote" | "downvote") =>  Promise<void>;
}) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl transition-all hover:border-fuchsia-400/40 hover:bg-white/[0.08]">
      <div className="relative h-16 w-16 overflow-hidden rounded-xl">
        <img
          src={item.thumbnail_url}
          alt={item.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Play className="h-5 w-5 text-white" />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <h5 className="truncate font-semibold text-white">{item.title}</h5>
        <p className="text-sm text-zinc-400">{item.author_name}</p>
      </div>

      <button
        onClick={() => onVote(item.id, item.haveUpVoted ? "downvote": 'upvote')}
        className={`flex flex-col items-center gap-1 rounded-xl border
           ${item?.haveUpVoted ? "border-fuchsia-500" : "border-white/10"}
           ${!item?.haveUpVoted ? "bg-zinc-800": "bg-fuchsia-600/10"} px-3 py-2 transition
            hover:bg-fuchsia-500/10`}
      >
        <ArrowUp className="h-4 w-4 text-zinc-400" />
        <span className="text-sm font-semibold text-white">
          {item.upvotes}
        </span>
      </button>
    </div>
  );
}