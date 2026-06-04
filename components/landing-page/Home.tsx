
import Link from "next/link";
import Navbar from "../navbar";

export default function HomePage() {

  return (
    <div className="bg-background text-on-background min-h-screen overflow-x-hidden">
    {/* ========================================
          TOP NAVIGATION
      ======================================== */}
      <Navbar />

      {/* ========================================
          MAIN CONTENT
      ======================================== */}
      <main className="mx-auto max-w-[1440px] px-4 pb-24 pt-32 md:px-10">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
          {/* ========================================
              HERO SECTION
          ======================================== */}
          <section className="flex flex-col gap-8 lg:col-span-7">
            {/* Beta Badge */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-blue-300">
                Live Beta
              </span>
            </div>

            {/* Hero Heading */}
            <h1 className="max-w-2xl text-6xl font-bold leading-none">
              Your Stream,
              <span className="text-primary italic"> Their Choice.</span>
            </h1>

            {/* Hero Description */}
            <p className="max-w-lg text-lg leading-relaxed text-on-surface-variant">
              The first interactive music platform where creators and fans sync
              in real-time. Broadcast your sound and let your audience decide
              the vibe.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href={'/stream'}  className="rounded-xl bg-primary px-8 py-4 font-bold text-black transition hover:shadow-lg hover:shadow-primary/20 active:scale-95">
                Start Your Stream
              </Link>

              <button className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold backdrop-blur-md transition hover:bg-white/10">
                Explore Live Channels
              </button>
            </div>

            {/* ========================================
                HOW IT WORKS
            ======================================== */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/5 pt-12">
              <div className="flex flex-col gap-2">
                <span className="text-2xl font-bold text-primary">01.</span>

                <p className="font-bold uppercase tracking-wider">Go Live</p>

                <p className="text-sm text-on-surface-variant">
                  Sync your studio in seconds.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-2xl font-bold text-primary">02.</span>

                <p className="font-bold uppercase tracking-wider">Share Link</p>

                <p className="text-sm text-on-surface-variant">
                  Invite your fans to the booth.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-2xl font-bold text-primary">03.</span>

                <p className="font-bold uppercase tracking-wider">Votes Flow</p>

                <p className="text-sm text-on-surface-variant">
                  Real-time track selection.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================
              LIVE PREVIEW CARD
          ======================================== */}
          <section className="relative lg:col-span-5">
            {/* Background Glow */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-[120px]" />

            <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />

            {/* Card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqp_koBRPanar3w3Jwi3mY6zvt5ILWo168ibEArSagTOOFRDZC8JcEvomY8OILR1Ktpm2qDbT4xJdnqfrDo1vE_ON35e2CBLs37P7kUTk0jiVZdJTeF6wRP9pJRsc5zg-2eeAeKcM97E4S670AXodBu3nVxZJGgfeNCLDKVRxukfWYCKX8nJWlyO7bhGOAZvxgsUvIoS9xHRissCln3vIFVBQA1MC8cIlvt-wI84bZx779KUCF_wHMEj7isUpYFKtcj49gE8y95WLa"
                alt="SonicPulse Headphones"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
          </section>
        </div>
      </main>

      {/* ========================================
          MOBILE FOOTER
      ======================================== */}
      <footer className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t border-white/10 bg-surface-container/90 backdrop-blur-2xl md:hidden">
        <a
          href="#"
          className="flex flex-col items-center justify-center text-primary"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="text-xs">Home</span>
        </a>

        <a href="#" className="flex flex-col items-center justify-center">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-xs">Discover</span>
        </a>

        <a href="#" className="flex flex-col items-center justify-center">
          <span className="material-symbols-outlined">sensors</span>
          <span className="text-xs">Stream</span>
        </a>

        <a href="#" className="flex flex-col items-center justify-center">
          <span className="material-symbols-outlined">info</span>
          <span className="text-xs">About</span>
        </a>
      </footer>
    </div>
  );
}
