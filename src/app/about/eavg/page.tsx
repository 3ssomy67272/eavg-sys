"use client";

import { useState, useEffect } from 'react';
import { Globe, Users, Target, Heart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import CountUp from '@/components/CountUp';

export default function AboutPage() {
  const [statsData, setStatsData] = useState({
    pilots: 8,
    routes: 200,
    hours: 1500,
    partners: 21
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
        const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;

        if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
          setLoading(false);
          return;
        }

        // Only fetch Partners data as requested
        const partnersRes = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Partners?maxRecords=100`, {
          headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
        });

        const partnersData = await partnersRes.json();
        const partnersCount = partnersData.records?.length || 21;

        setStatsData(prev => ({
          ...prev,
          partners: partnersCount
        }));
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statistics = [
    { label: "Active Pilots", value: statsData.pilots, link: "/about/rosters", suffix: "" },
    { label: "Routes", value: statsData.routes, link: "/operations/routes", suffix: "+" },
    { label: "Flight Hours", value: statsData.hours, link: "/about/rosters", suffix: "+" },
    { label: "Codeshare Partners", value: statsData.partners, link: "/operations/codeshares", suffix: "" }
  ];

  const offerings = [
    {
      title: "Realistic Operations",
      desc: "Fly routes based on real EgyptAir schedules with proper procedures and documentation."
    },
    {
      title: "Comprehensive Training",
      desc: "Access to training materials, mentorship programs, and resources for pilots of all levels."
    },
    {
      title: "Active Community",
      desc: "Engage with fellow pilots through Discord, IFC thread, group flights, and special events."
    },
    {
      title: "Partnership Network",
      desc: "Fly codeshare routes with our partner airlines and participate in collaborative events."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section 
        className="relative h-96 flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1692986172150-ec32dccfa5f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdCUyMGNhaXJvJTIwcHlyYW1pZHN8ZW58MXx8fHwxNzY2NzExMjAzfDA&ixlib=rb-4.1.0&q=80&w=1080)'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <ScrollReveal animation="fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">About EgyptAir Virtual Group</h1>
            <p className="max-w-2xl mx-auto text-lg">
              Bringing together aviation enthusiasts from around the world
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-8 text-center text-[#042C64] font-semibold">Who we are ?</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
              Founded in May 2024, EgyptAir Virtual Group (EAVG) is based at Cairo International Airport in North Africa. and a member of  Star Alliance Virtual, our mission is to create a welcoming environment for everyone. We offer pilots the opportunity to explore the world with our diverse African fleet, free of restrictions. and +15 codeshare partnerships with your favorite Virtual Airlines
              </p>
              <p>
                What sets us apart is our pledge to excellence while still having fun, fostering an inclusive space where everyone from newbies to seasoned virtual pilots is welcomed and respected.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal animation="slide-up" delay={0}>
              <div className="bg-white p-8 rounded-lg shadow-md h-full">
                <div className="w-16 h-16 bg-[#042C64] rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="mb-4 text-[#042C64]">Our Mission</h2>
                <p className="text-gray-700">
                  To provide a professional, realistic, and enjoyable virtual airline experience 
                  that celebrates Egyptian aviation while building lasting friendships within a 
                  global community of aviation enthusiasts.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={200}>
              <div className="bg-white p-8 rounded-lg shadow-md h-full">
                <div className="w-16 h-16 bg-[#042C64] rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="mb-4 text-[#042C64]">Our Vision</h2>
                <p className="text-gray-700">
                  To be recognized as one of the leading virtual airlines in the flight simulation 
                  community, known for our operational excellence, supportive culture, and commitment 
                  to continuous improvement and innovation.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* Statistics */}
      <section className="py-20 bg-[#042C64] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-12 text-center font-semibold">EAVG by the Numbers</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((stat, i) => (
              <ScrollReveal key={i} animation="fade-in" delay={i * 100}>
                <Link 
                  href={stat.link}
                  className="group block p-6 rounded-xl transition-all duration-300 hover:bg-white/10"
                >
                  <div className="mb-2 text-3xl font-bold flex items-center justify-center gap-1">
                    {loading ? (
                      <Loader2 className="w-8 h-8 animate-spin opacity-50" />
                    ) : (
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                  <p className="text-white/80 group-hover:text-white transition-colors">{stat.label}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-8 text-center text-[#042C64] font-semibold">What We Offer</h2>
          </ScrollReveal>
          <div className="space-y-6">
            {offerings.map((offering, i) => (
              <ScrollReveal key={i} animation="slide-up" delay={i * 100}>
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-[#042C64] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="mb-2 text-[#042C64]">{offering.title}</h3>
                    <p className="text-gray-700">{offering.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="zoom-in">
            <h2 className="mb-6 text-[#042C64] font-semibold">Ready to Join Our Family?</h2>
            <p className="mb-8 text-gray-700">
              Become part of the EAVG community and start your virtual aviation journey with us today.
            </p>
            <a
              href="/join"
              className="inline-block bg-[#042C64] text-white px-8 py-3 rounded-md hover:bg-[#042C64]/90 transition-colors"
            >
              Join Now
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
