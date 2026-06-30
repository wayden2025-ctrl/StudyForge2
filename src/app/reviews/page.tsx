import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const REVIEWS = [
  {
    name: "Sarah M.",
    role: "Pre-Med Student",
    text: "okay so i was literally about to fail bio and i tried this as a last resort. made flashcards from my entire lecture in like 10 seconds?? my grade actually went up a whole letter. im not even kidding lol",
    stars: 5,
  },
  {
    name: "James L.",
    role: "Computer Science Major",
    text: "bro the notes it generates are better than the ones i take in class. i shared my data structures study guide with my whole group chat and now everyone wants pro. this thing is insane",
    stars: 5,
  },
  {
    name: "Priya K.",
    role: "Law Student",
    text: "I have 200+ pages of reading every week and this tool actually summarizes everything perfectly. The quiz feature caught gaps in my knowledge I didn't even know I had. Worth every penny of pro.",
    stars: 4.5,
  },
  {
    name: "Marcus T.",
    role: "Engineering Student",
    text: "i used to pull all nighters before exams trying to rewrite my notes. now i just paste them in and get perfect study material in seconds. my sleep schedule has never been better honestly",
    stars: 5,
  },
  {
    name: "Emily R.",
    role: "Nursing Student",
    text: "the mnemonics feature is SO underrated. it gave me memory tricks for pharmacology that actually stuck. i went from a 68 to an 89 on my midterm. actual lifesaver",
    stars: 4.5,
  },
  {
    name: "Daniel W.",
    role: "History Major",
    text: "shared my study notes with my roommate through the app and he literally signed up for pro the same day. the generated quizzes feel like they were written by my professor its kinda scary",
    stars: 5,
  },
  {
    name: "Aisha N.",
    role: "Psychology Student",
    text: "i genuinely don't know how i studied before this. i paste in my psych textbook chapters and it pulls out exactly what i need for the exam. saved me so many hours this semester alone",
    stars: 5,
  },
  {
    name: "Ryan C.",
    role: "Business Major",
    text: "the study plans feature is lowkey amazing. it mapped out my entire finals week for me and told me what to study and when. i actually felt organized for once in my life lmao",
    stars: 4.5,
  },
  {
    name: "Sofia A.",
    role: "Chemistry Student",
    text: "used to dread orgo but now i just upload my notes and get perfect flashcards. the spaced repetition-style review helps SO much. went from a C to a B+ this quarter",
    stars: 5,
  },
  {
    name: "Kevin H.",
    role: "Political Science",
    text: "my professor assigns 3 readings per class and i literally cannot keep up. this app summarizes them perfectly and the quiz mode makes sure i actually understood them. absolute game changer",
    stars: 5,
  },
  {
    name: "Olivia T.",
    role: "Education Major",
    text: "i recommended this to my entire cohort. we all use the share feature now to send each other study guides before exams. it feels like cheating but its not lol",
    stars: 4.5,
  },
  {
    name: "Tyler B.",
    role: "Pre-Law Student",
    text: "the detailed notes section is genuinely better than anything i could write myself. it reorganizes messy lecture content into clean bullet points. my GPA has never been higher",
    stars: 5,
  },
];

function StarRating({ stars, id }: { stars: number; id: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: Math.floor(stars) }).map((_, s) => (
        <svg key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      {stars % 1 !== 0 && (
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <defs>
            <linearGradient id={`half-${id}`}>
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="50%" stopColor="#333" />
            </linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`url(#half-${id})`} />
        </svg>
      )}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Ambient Glows */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-purple/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-cyan/10 blur-[150px]" />
      </div>

      {/* Top Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden">
              <Image src="/logo.png" alt="Notiq AI" fill className="object-contain" />
            </div>
            <span className="font-bold text-lg group-hover:text-brand-cyan transition-colors">Notiq AI</span>
          </Link>
          <Link href="/signup" className="bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-bold text-sm px-5 py-2.5 rounded-full hover:from-brand-cyan hover:to-brand-purple transition-all shadow-lg">
            Start Free →
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400/20 bg-yellow-400/5">
            <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            <span className="text-yellow-400 font-bold text-sm">4.8 out of 5 stars</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]" style={{ fontFamily: 'var(--font-syne, system-ui)' }}>
            Students Don&apos;t Just Like It.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">They&apos;re Obsessed.</span>
          </h1>

          <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Thousands of students across the world have transformed the way they study with Notiq AI.
            From failing grades to dean&apos;s list, from all-nighters to sleeping peacefully before exams —
            these are their real stories.
          </p>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-green-500/20 bg-green-500/5">
            <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            <span className="text-white text-sm"><strong className="font-extrabold text-green-400">Authenticated by Proof</strong></span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { value: "10,000+", label: "Students Helped" },
            { value: "4.8★", label: "Average Rating" },
            { value: "500K+", label: "Notes Generated" },
            { value: "92%", label: "Grade Improvement" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">{stat.value}</p>
              <p className="text-neutral-400 text-sm mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Impact Statement */}
        <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-syne, system-ui)' }}>
            Helping Students Succeed, One Note at a Time
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed">
            We built Notiq AI because we know how overwhelming studying can be. Long textbooks, dense lectures,
            and impossible deadlines — we&apos;ve been there. That&apos;s why we created an AI that does the heavy lifting
            for you, so you can focus on actually understanding the material instead of just copying it down.
            The results speak for themselves: students who use Notiq AI consistently report higher grades,
            less stress, and more confidence walking into exams.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 flex flex-col"
            >
              <StarRating stars={review.stars} id={`r-${i}`} />
              <p className="text-white/80 text-sm leading-relaxed mt-4 mb-6 flex-1">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{review.name}</p>
                  <p className="text-white/40 text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 space-y-6 pb-8">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-brand-purple/50 mx-auto" />
          <h2 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-syne, system-ui)' }}>
            Ready to Join Them?
          </h2>
          <p className="text-neutral-400 text-lg max-w-md mx-auto">
            Start generating AI-powered study materials in seconds. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-bold px-8 py-4 rounded-full text-lg hover:from-brand-cyan hover:to-brand-purple transition-all shadow-[0_4px_20px_rgba(168,85,247,0.5)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.6)] hover:-translate-y-1"
          >
            Create Your Free Account <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
