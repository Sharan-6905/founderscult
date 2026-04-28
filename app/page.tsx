'use client';

import { useState } from 'react';
import { Sparkles, Users, Lightbulb, ArrowRight, Code, Linkedin, X } from 'lucide-react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDirectory, setShowDirectory] = useState(false);

  const team = [
    {
      name: "Dhruv Pradeep",
      role: "Co-founder CEO",
      intro: "A visionary leader focused on building India's next generation of founders. Passionate about high agency and zero-to-one building.",
      linkedin: "https://www.linkedin.com/in/dhruv-pradeep-b40757344/",
      color: "text-neon-blue",
      border: "border-neon-blue"
    },
    {
      name: "Sharan S",
      role: "Co-founder CTO",
      intro: "Technical mastermind architecting the future of collaborative building. Expert in full-stack systems and high-scale applications.",
      linkedin: "https://www.linkedin.com/in/sharan-s-6278b3360/",
      color: "text-neon-green",
      border: "border-neon-green"
    },
    {
      name: "R.R Naveen Raj",
      role: "AI Engineer",
      intro: "Pushing the boundaries of AI-assisted building. Crafting the intelligence that powers the Founderscult network.",
      linkedin: "https://www.linkedin.com/in/r-r-naveen-raj-b7247a304",
      color: "text-neon-purple",
      border: "border-neon-purple"
    }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribed(true);
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-neon-green selection:text-black">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Floating Header */}
      <header className="relative z-50 p-4 sm:p-6 flex justify-between items-center">
        <div className="text-lg sm:text-2xl font-black tracking-tighter uppercase">
          Founderscult
        </div>

        <div className="flex gap-3 sm:gap-6 items-center">
          <button 
            onClick={() => setShowDirectory(true)}
            className="text-white/60 hover:text-neon-green font-bold uppercase tracking-widest text-[10px] sm:text-sm transition-colors"
          >
            Directories
          </button>
          <a 
            href="https://www.linkedin.com/company/founderscult/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white/60 hover:text-neon-blue transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="https://x.com/TheFoundersCult?s=20" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="sr-only">X (Twitter)</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          
          {/* Floating Section removed as requested */}

          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-sm font-bold text-neon-green uppercase tracking-widest mb-10">
            <Sparkles className="w-4 h-4" />
            Waitlist Now Open
          </div>

          <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] mb-8 uppercase">
            Where <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple">
              Ideas
            </span> <br/>
            Find Builders.
          </h1>

          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mx-auto mb-16 leading-tight">
            Not content. Not clout. Just building. <br className="hidden md:block" /> Founderscult is where India's next startups begin.
          </p>

          {/* Waitlist Form */}
          <div className="w-full max-w-md relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-neon-blue rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative bg-[#050505] p-2 rounded-full border-2 border-white/10 flex flex-col sm:flex-row gap-2">
              {subscribed ? (
                <div className="w-full text-center px-4 py-4 text-neon-green font-bold animate-in fade-in zoom-in duration-500">
                  ✦ Thank you for registering! Check your mail.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex w-full gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@student.edu.in"
                    className="flex-1 bg-transparent px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder:text-white/30 focus:outline-none font-medium"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-white text-black font-black uppercase px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-neon-green transition-colors whitespace-nowrap flex items-center gap-2 text-xs sm:text-sm"
                  >
                    {loading ? 'Joining...' : 'Join Cult'}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-white/40 font-medium text-sm">
              <a 
                href="https://chat.whatsapp.com/FrGV76OPyerGMw5MtOVQaB" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-neon-green transition-colors underline underline-offset-4 font-bold"
              >
                Join our community
              </a> to know more about the app.
            </p>
          </div>
        </div>
      </main>

      {/* Infinite Marquee Section */}
      <div className="relative py-8 border-y-2 border-white/10 bg-white/5 overflow-hidden flex whitespace-nowrap items-center">
        <div className="animate-marquee flex gap-16 items-center text-4xl font-black uppercase tracking-tight text-white/40">
          <span>Post Raw Ideas</span> <span className="text-neon-green">✦</span>
          <span>Find Co-Founders</span> <span className="text-neon-blue">✦</span>
          <span>High Agency</span> <span className="text-neon-purple">✦</span>
          <span>Zero Judgment</span> <span className="text-neon-pink">✦</span>
          
          {/* Duplicate for seamless looping */}
          <span>Post Raw Ideas</span> <span className="text-neon-green">✦</span>
          <span>Find Co-Founders</span> <span className="text-neon-blue">✦</span>
          <span>High Agency</span> <span className="text-neon-purple">✦</span>
          <span>Zero Judgment</span> <span className="text-neon-pink">✦</span>
        </div>
      </div>

      {/* Manifesto Section */}
      <section className="py-24 border-b-2 border-white/10 relative overflow-hidden bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24">
          <div className="-rotate-2 hover:rotate-0 transition-transform cursor-default">
            <span className="text-4xl md:text-5xl font-black uppercase text-neon-green block">High Agency</span>
          </div>
          <div className="rotate-3 hover:rotate-0 transition-transform cursor-default">
            <span className="text-4xl md:text-5xl font-black uppercase text-neon-blue block">Build before you're ready.</span>
          </div>
          <div className="-rotate-1 hover:rotate-0 transition-transform cursor-default">
            <span className="text-4xl md:text-5xl font-black uppercase text-neon-purple block">Ideas find teams here.</span>
          </div>
          <div className="rotate-2 hover:rotate-0 transition-transform cursor-default">
            <span className="text-4xl md:text-5xl font-black uppercase text-neon-pink block">Where builders begin</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16 text-center">
          How it <span className="text-neon-purple">Works</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-[#0a0a0a] p-8 rounded-3xl border-2 border-white/5 hover:border-neon-green hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-neon-green text-black rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black uppercase mb-4">Post Raw Ideas</h3>
            <p className="text-white/60 font-medium leading-relaxed">
              Share unvalidated, messy thoughts. Get structured, honest feedback from other students without fear of judgment.
            </p>
          </div>

            <div className="group p-8 rounded-3xl border-2 border-white/5 bg-white/[0.02] hover:bg-neon-blue/5 hover:border-neon-blue/50 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-neon-blue" />
              </div>
              <h3 className="text-2xl font-black uppercase mb-4">Find Hustlers</h3>
              <p className="text-white/60 font-medium leading-relaxed">
                Connect with passionate builders and hustlers who share your vision and hunger to create.
              </p>
            </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t-2 border-white/5">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16 text-center">
          What the <span className="text-neon-pink">Cult</span> says.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white/[0.03] border-2 border-black border-r-4 border-b-4 border-r-neon-green border-b-neon-green rotate-[-1deg] hover:rotate-0 transition-transform">
            <p className="text-lg font-medium mb-6 italic">"Found my technical co-founder in 2 days. We're now shipping our MVP. No fluff, just builders."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon-green" />
              <div>
                <p className="font-black uppercase text-sm">Adithya</p>
                <p className="text-xs text-white/40">Building a health startup</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white/[0.03] border-2 border-black border-r-4 border-b-4 border-r-neon-blue border-b-neon-blue rotate-[2deg] hover:rotate-0 transition-transform">
            <p className="text-lg font-medium mb-6 italic">"Finally a community for India's real builders. The high agency vibe here is unmatched."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon-blue" />
              <div>
                <p className="font-black uppercase text-sm">Riya Shah</p>
                <p className="text-xs text-white/40">Full-stack Dev</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white/[0.03] border-2 border-black border-r-4 border-b-4 border-r-neon-purple border-b-neon-purple rotate-[-2deg] hover:rotate-0 transition-transform">
            <p className="text-lg font-medium mb-6 italic">"The best place to find builders who actually care about shipping, not just social media clout."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon-purple" />
              <div>
                <p className="font-black uppercase text-sm">Karan Malhotra</p>
                <p className="text-xs text-white/40">Product Designer</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white/[0.03] border-2 border-black border-r-4 border-b-4 border-r-neon-pink border-b-neon-pink rotate-[1deg] hover:rotate-0 transition-transform">
            <p className="text-lg font-medium mb-6 italic">"The feedback loop here is insane. Posted a raw idea and got 5 people wanting to build it with me."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon-pink" />
              <div>
                <p className="font-black uppercase text-sm">Vikram Singh</p>
                <p className="text-xs text-white/40">AI Researcher</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white/[0.03] border-2 border-black border-r-4 border-b-4 border-r-neon-blue border-b-neon-blue rotate-[-1deg] hover:rotate-0 transition-transform">
            <p className="text-lg font-medium mb-6 italic">"No superficial networking. Just hardcore building and high agency individuals pushing each other."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon-blue" />
              <div>
                <p className="font-black uppercase text-sm">Neha Reddy</p>
                <p className="text-xs text-white/40">Student Entrepreneur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-white/10 py-12 text-center">
        <h2 className="text-[12vw] sm:text-[10vw] md:text-9xl font-black text-white/5 uppercase tracking-tighter select-none px-4 overflow-hidden leading-none">
          Founderscult
        </h2>
        <p className="text-white/40 mt-4 font-medium uppercase tracking-widest text-sm">
          Designed for Builders. Built for India’s next wave of founders.
        </p>
      </footer>

      {/* Team Directory Overlay */}
      {showDirectory && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 flex items-center justify-center p-6">
          <button 
            onClick={() => setShowDirectory(false)}
            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="max-w-5xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar px-2">
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-8 md:mb-12 text-center">
              The <span className="text-neon-green">Directory</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 pb-12">
              {team.map((member, idx) => (
                <div key={idx} className={`p-8 bg-white/[0.03] border-2 ${member.border} rounded-3xl hover:bg-white/[0.05] transition-all duration-300 group`}>
                  <div className="mb-6">
                    <h3 className={`text-2xl font-black uppercase ${member.color} mb-1`}>{member.name}</h3>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{member.role}</p>
                  </div>
                  <p className="text-white/70 font-medium leading-relaxed mb-8">
                    {member.intro}
                  </p>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest"
                  >
                    <Linkedin className="w-4 h-4" />
                    Connect
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
