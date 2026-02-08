"use client";

import  Link  from 'next/link';
import { useEffect, useState } from 'react';
import { Users, Globe, Trophy, ChevronDown, ArrowRight, Play } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Zoom Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20000ms] scale-100 hover:scale-100"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1742431179550-377d14c97ede?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGFpciUyMGFpcnBsYW5lJTIwZmxpZ2h0fGVufDF8fHx8MTc2NjcxMDk4Nnww&ixlib=rb-4.1.0&q=80&w=1080)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#042C64]/80"></div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          {/* Logo Animation */}
          <div className="mb-8 flex justify-center animate-in fade-in slide-in-from-top-8 duration-1000">
            <img
              src="https://i.postimg.cc/wjgZtDXk/whitelogo.png"
              alt="EgyptAir Virtual Logo"
              className="h-24 md:h-32 drop-shadow-2xl"
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Soar Like an African <span className="text-blue-400">Falcon</span> 
          </h1>
          
          <div className="relative h-20 md:h-16 flex items-center justify-center mb-12">
            <p
              className={`absolute w-full text-xl md:text-2xl font-light tracking-wide transition-all duration-1000 ${
                activeIndex === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              Join a thriving community of <span className="font-semibold text-blue-300">passionate virtual pilots</span>
            </p>
            <p
              className={`absolute w-full text-xl md:text-2xl font-light tracking-wide transition-all duration-1000 ${
                activeIndex === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              Experience <span className="italic underline decoration-blue-500/50">professional operations</span> & realistic flights
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <Link
              href="/getting-started"
              className="group relative flex items-center gap-2 bg-[#042C64] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-[0_0_20px_rgba(4,44,100,0.5)] overflow-hidden"
            >
              <span className="relative z-10">Start Your Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <Link
              href="/about/eavg"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all hover:scale-105"
            >
              <Play className="w-5 h-5 fill-current" />
              Learn More
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
          <ChevronDown className="w-10 h-10 text-white" />
        </div>
      </section>

      {/* Why Choose EgyptAir */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <h2 className="text-center mb-12 text-[#042C64] font-semibold">Why Choose EgyptAir Virtual Group</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Professional Staff */}
            <ScrollReveal animation="slide-up" delay={100}>
              <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow h-full">
                <div className="w-16 h-16 bg-[#042C64] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-4 text-[#042C64]">Professional Staff</h3>
                <p className="text-gray-600">
                  Our dedicated team of experienced staff members ensures smooth operations and 
                  provides excellent support to all pilots.
                </p>
              </div>
            </ScrollReveal>

            {/* Realistic Operations */}
            <ScrollReveal animation="slide-up" delay={200}>
              <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow h-full">
                <div className="w-16 h-16 bg-[#042C64] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-4 text-[#042C64]">Realistic Operations</h3>
                <p className="text-gray-600">
                  Fly realistic routes based on real-world EgyptAir Route database  proper 
                  procedures and operational standards.
                </p>
              </div>
            </ScrollReveal>

            {/* Active Community */}
            <ScrollReveal animation="slide-up" delay={300}>
              <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow h-full">
                <div className="w-16 h-16 bg-[#042C64] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-4 text-[#042C64]">Active Community</h3>
                <p className="text-gray-600">
                  Connect with fellow aviation enthusiasts through our active Discord server where you share your dadication, progress and join community activties
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Message from CEO */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal animation="slide-left">
              <div>
                <img
                  src="https://www.globalaviationresource.com/reports/2009/scottloughran/images/19.jpg"
                  alt="CEO"
                  className="rounded-lg shadow-lg w-full object-cover h-96"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal animation="slide-right">
              <div>
                <h2 className="mb-6 text-[#042C64] font-semibold">Message from Our CEO</h2>
                <p className="text-gray-700 mb-4">
                  Hi, this is Essam Morgan, CEO of EgyptAir Virtual Group (EAVG).

                  I’m an aviation enthusiast from Giza, Egypt, with a strong passion for air traffic control and a deep curiosity about how aviation truly works. I'm honored to lead this incredible community of aviation enthusiasts who share a passion for realistic flight simulation and aviation fundamentals.
                </p>
                <p className="text-gray-700 mb-4">
                  Since our founding, we have been committed to providing a professional and welcoming 
                  environment for the community and pilots. We aim to build the genuine EgyptAir experience and create friendships and lasting memories..
                </p>
                <p className="text-gray-700">
                  I look forward to welcoming you aboard!
                </p>
                <p className="mt-6 text-[#042C64]">
                  3Ssomy167
                  <br />
                  <span className="text-gray-600">CEO, EgyptAir Virtual Group</span>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Live Map - Coming Soon */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="zoom-in">
            <div className="text-center">
              <h2 className="mb-6 text-[#042C64] font-semibold">Live Flight Tracking</h2>
              <div className="bg-gray-100 rounded-lg p-16 border-2 border-dashed border-gray-300">
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Live Map – Coming Soon
                </p>
                <p className="text-gray-400 mt-2">
                  Track active EAVG pilots in real-time across the globe
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#042C64] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-6">Ready to Take Flight?</h2>
            <p className="mb-8">
              Join community of pilots who have already chosen EgyptAir Virtual Group as their home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/join"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-[#042C64] transition-colors"
              >
                Join Now
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
