"use client";

import { useState, useEffect } from 'react';
import { Calendar, MapPin, ExternalLink, Clock } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function EventsPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Manual Event Data until linked we create a database and link when the system fully ready
  const events = [
    // Example Event copy the template and fill the details as needed. don't forget to remove slashes
    // {
    //   id: number,
    //   title: 'event title',
    //   startTime: 'YYYY-MM-DDTHH:MM:SSZ', //example: '2026-02-01T14:30:00Z',
    //   durationMinutes: number,  // minutes
    //   route: 'route',
    //   aircraft: 'aircraft',
    //   forumLink: 'event link',
    // },
    {
      id: 1,
      title: `EAVG Represents: NEW BEGINNINGS | Cairo FLY OUT`,
      startTime: '2026-04-19T16:00:00Z',
      durationMinutes: 300,  // 5:00 hours
      route: 'HECA -> EGLL',
      aircraft: `EgyptAir | Boeing 777-300ER`,
      forumLink: 'https://community.infiniteflight.com/t/19th-april-eavg-presents-new-beginnings/1169496',
    },
    {
      id: 2,
      title: `Qatari Virtual | 3 Years Anniversary!`,
      startTime: '2026-04-18T02:00:00Z',
      durationMinutes: 900,  // 15:00 hours
      route: 'SBGR -> OTHH',
      aircraft: `Qatari | Airbus A350-900`,
      forumLink: 'https://community.infiniteflight.com/t/qatari-virtual-presents-3-year-anniversary/',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const getEventStatus = (startTimeStr: string, durationMinutes: number) => {
    const now = currentTime.getTime();
    const start = new Date(startTimeStr).getTime();
    const end = start + (durationMinutes * 60000);

    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'running';
    return 'completed';
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
            <Clock className="w-3 h-3" />
            Upcoming
          </span>
        );
      case 'running':
        return (
          <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase animate-pulse">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Running Now
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#042C64] text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Events</h1>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={200}>
            <p className="max-w-2xl mx-auto text-lg opacity-90">
              Join our community events and group flights. Experience the joy of flying together 
              with fellow EAVG pilots on special routes and occasions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-12 text-[#042C64] font-semibold">Upcoming Events</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events
              .filter(event => getEventStatus(event.startTime, event.durationMinutes) !== 'completed')
              .map((event, index) => {
                const status = getEventStatus(event.startTime, event.durationMinutes);
                const startDate = new Date(event.startTime);
                const dateStr = startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                const timeStr = startDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' }) + ' UTC';

                return (
                  <ScrollReveal key={event.id} animation="slide-up" delay={index * 100}>
                    <div
                      className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
                      onClick={() => window.open(event.forumLink, '_blank')}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <h3 className="text-[#042C64] flex-1 font-bold group-hover:text-blue-700 transition-colors">{event.title}</h3>
                        <ExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4 group-hover:text-[#042C64] transition-colors" />
                      </div>
                      
                      <div className="space-y-4 text-gray-600 mb-8">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-[#042C64]" />
                          </div>
                          <span className="font-medium">{dateStr}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-[#042C64]" />
                          </div>
                          <span className="font-medium">{event.route}</span>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Aircraft</p>
                          <p className="text-sm font-semibold text-gray-800">{event.aircraft}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Time</p>
                          <p className="text-sm font-semibold text-gray-800">{timeStr}</p>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        {getStatusDisplay(status)}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-12 text-[#042C64] font-semibold">Past Events (This Month)</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events
              .filter(event => getEventStatus(event.startTime, event.durationMinutes) === 'completed')
              .map((event, index) => {
                const startDate = new Date(event.startTime);
                const dateStr = startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                const timeStr = startDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }) + ' UTC';

                return (
                  <ScrollReveal key={event.id} animation="slide-up" delay={index * 100}>
                    <div
                      className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all cursor-pointer opacity-80 hover:opacity-100 group"
                      onClick={() => window.open(event.forumLink, '_blank')}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <h3 className="text-[#042C64] flex-1 font-bold">{event.title}</h3>
                        <ExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4 group-hover:text-[#042C64] transition-colors" />
                      </div>
                      
                      <div className="space-y-4 text-gray-500 mb-8">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{dateStr}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4" />
                          <span className="font-medium">{event.route}</span>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Aircraft</p>
                            <p className="text-sm font-semibold text-gray-600">{event.aircraft}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Time</p>
                            <p className="text-sm font-semibold text-gray-600">{timeStr}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <span className="inline-block bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
                          Completed
                        </span>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
          </div>
        </div>
      </section>

      {/* end of event page */}
      <section className="py-24 bg-[#042C64] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="zoom-in">
            <h3 className="text-3xl md:text-5xl font-bold mb-6">Don't miss more events!</h3>
            <p className="text-xl mb-10 opacity-80 max-w-2xl mx-auto">
              We're missing a lot of fun without having you participating. Join us today!
            </p>
            <a
              href="/join"
              className="inline-block bg-white text-[#042C64] px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
            >
              Join Now
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
