'use client';

import { useState } from 'react';
import { Sparkles, Users, Lightbulb, ArrowRight, Code, Linkedin } from 'lucide-react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

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
      <header className="relative z-50 p-6 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter uppercase">
          Founderscult
        </div>

        <div className="flex gap-4 items-center">
          <a href="#" className="text-white/60 hover:text-neon-blue transition-colors">
            <Linkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="#" className="text-white/60 hover:text-white transition-colors">
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
          
          {/* Floating Student Pills */}
          <div className="absolute top-40 left-10 md:left-20 animate-bounce duration-[3000ms] hidden lg:flex items-center gap-2 bg-neon-blue text-black px-4 py-2 rounded-full font-bold border-2 border-black rotate-[-6deg] hover:scale-110 transition-transform">
            <span>Dhruv Pradeep</span>
            <span className="text-xs opacity-75">• CEO</span>
          </div>

          <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="absolute top-60 right-10 md:right-32 animate-bounce duration-[4000ms] hidden lg:flex items-center gap-2 bg-neon-green text-black px-4 py-2 rounded-full font-bold border-2 border-black rotate-[4deg] hover:scale-110 transition-transform cursor-pointer">
            <span>[ CTO Name ]</span>
            <Linkedin className="w-4 h-4" />
            <span className="text-xs opacity-75">• Technical Co-Founder</span>
          </a>

          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-sm font-bold text-neon-green uppercase tracking-widest mb-10">
            <Sparkles className="w-4 h-4" />
            Waitlist Now Open
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] mb-8 uppercase">
            Where <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple">
              Ideas
            </span> <br/>
            Find Builders.
          </h1>

          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mx-auto mb-16 leading-tight">
            We bridge the gap between startup ideas and co-founders. Drop a raw idea, get validation, and find your team before writing a single line of code.
          </p>

          {/* Waitlist Form */}
          <div className="w-full max-w-md relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-neon-blue rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative bg-[#050505] p-2 rounded-full border-2 border-white/10 flex flex-col sm:flex-row gap-2">
              {subscribed ? (
                <div className="w-full text-center px-4 py-4 text-neon-green font-bold">
                  ✓ You're on the list!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex w-full gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@student.edu.in"
                    className="flex-1 bg-transparent px-6 py-4 text-white placeholder:text-white/30 focus:outline-none font-medium"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-white text-black font-black uppercase px-8 py-4 rounded-full hover:bg-neon-green transition-colors whitespace-nowrap flex items-center gap-2"
                  >
                    {loading ? 'Joining...' : 'Join Cult'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-white/40 font-medium text-sm">
              <a href="#" className="hover:text-neon-green transition-colors underline underline-offset-4 font-bold">Join our community</a> to know more about the app.
            </p>
          </div>
        </div>
      </main>

      {/* Infinite Marquee Section */}
      <div className="relative py-8 border-y-2 border-white/10 bg-white/5 overflow-hidden flex whitespace-nowrap items-center">
        <div className="animate-marquee flex gap-16 items-center text-4xl font-black uppercase tracking-tight text-white/40">
          <span>Post Raw Ideas</span> <span className="text-neon-green">✦</span>
          <span>Find Co-Founders</span> <span className="text-neon-blue">✦</span>
          <span>Zero Judgment</span> <span className="text-neon-pink">✦</span>
          
          {/* Duplicate for seamless looping */}
          <span>Post Raw Ideas</span> <span className="text-neon-green">✦</span>
          <span>Find Co-Founders</span> <span className="text-neon-blue">✦</span>
          <span>Zero Judgment</span> <span className="text-neon-pink">✦</span>
        </div>
      </div>

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

          <div className="bg-[#0a0a0a] p-8 rounded-3xl border-2 border-white/5 hover:border-neon-blue hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-neon-blue text-black rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black uppercase mb-4">Find Co-Founders</h3>
            <p className="text-white/60 font-medium leading-relaxed">
              Every upvote is a potential teammate. Connect with designers, developers, and marketers in your campus or city.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-white/10 py-12 text-center">
        <h2 className="text-6xl md:text-9xl font-black text-white/5 uppercase tracking-tighter select-none">
          Founderscult
        </h2>
        <p className="text-white/40 mt-4 font-medium uppercase tracking-widest text-sm">
          Designed for Builders. Coming to India.
        </p>
      </footer>
    </div>
  );
}
