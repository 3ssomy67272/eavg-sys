"use client";

import { useState } from 'react';
import { ChevronDown, Trophy, Award } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function NewsPage() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  // Pilot of the month list
  const pilotOfTheMonth = {
    '2026': [
      { month: 'January', name: 'EyadRadwan209', hours: 54, image: "https://sea1.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/eyadradwan209/144/1467299_2.png" },
      { month: 'February', name: 'TBA', hours: 0, image: null },
      { month: 'March', name: 'TBA', hours: 0, image: null },
      { month: 'April', name: 'TBA', hours: 0, image: null },
      { month: 'May', name: 'TBA', hours: 0, image: null },
      { month: 'June', name: 'TBA', hours: 0, image: null },
      { month: 'July', name: 'TBA', hours: 0, image: null },
      { month: 'August', name: 'TBA', hours: 0, image: null },
      { month: 'September', name: 'TBA', hours: 0, image: null },
      { month: 'October', name: 'TBA', hours: 0, image: null },
      { month: 'November', name: 'TBA', hours: 0, image: null },
      { month: 'December', name: 'TBA', hours: 0, image: null },
    ],
    '2025': [
      { month: 'January', name: 'IFSpencer', hours: 23, image: "https://sea1.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/ifspencer/144/1408212_2.png" },
      { month: 'February', name: 'IFSpencer', hours: 20, image: "https://sea1.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/ifspencer/144/1408212_2.png" },
      { month: 'March', name: 'EyadRadwan209', hours: 162, image: "https://sea1.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/eyadradwan209/144/1467299_2.png" },
      { month: 'April', name: 'EyadRadwan209', hours: 203, image: "https://sea1.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/eyadradwan209/144/1467299_2.png" },
      { month: 'May', name: 'Abdelrahman.zaki', hours: 295, image: "https://sea1.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/abdelrahman.zaki/144/1527836_2.png" },
      { month: 'June', name: 'Abdelrahman.zaki', hours: 200, image: "https://sea1.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/abdelrahman.zaki/144/1527836_2.png" },
      { month: 'July', name: 'EyadRadwan209', hours: 287, image: "https://sea1.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/eyadradwan209/144/1467299_2.png" },
      { month: 'August', name: 'EyadRadwan209', hours: 278, image: "https://sea1.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/eyadradwan209/144/1467299_2.png" },
      { month: 'September', name: '_saleh', hours: 260, image: "https://avatars.discourse-cdn.com/v4/letter/_/da6949/144.png" },
      { month: 'October', name: '_saleh', hours: 245, image: "https://avatars.discourse-cdn.com/v4/letter/_/da6949/144.png" },
      { month: 'November', name: 'Adam_Ashraf', hours: 88, image: "https://sea1.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/adam_ashraf/144/1588954_2.png" },
      { month: 'January', name: 'Krzysztof_Paszek', hours: 27, image: "https://sea1.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/krzysztof_paszek/144/1596663_2.png" },
    ]
  };

  // Mock Recent News data
  const newsByTopic = [
    // {
    //   topic: 'catagory',
    //   news: [
    //     {
    //       title: 'post1',
    //       date: 'date',
    //       summary: 'desc.'
    //     },
    //     {
    //       title: 'post2',
    //       date: 'date',
    //       summary: 'desc.'
    //     },
    //   ]
    // },
    {
      topic: 'VA Announcments',
      news: [
        {
          title: 'EAVG CREW CENTER TRANSITION — IMPORTANT UPDATE ',
          date: '15 December 2025',
          summary: 'Due to the shutdown of Digital Crew, EgyptAir Virtual Group (EAVG) will officially move its Crew Center to Atlas. This change is mandatory and affects all pilots..'
        },
      ]
    },
    {
      topic: 'VA Updates',
      news: [
        {
          title: '✈️ New Codeshare Announcement! ✈️',
          date: '11 January 2026',
          summary: 'We’re excited to announce a new codeshare partnership with Lufty Virtual, expanding our European network with key regional, continental, and long-haul connections operated from Germany’s major hubs. 🤝✨.'
        },
        {
          title: '🚨 Route Termination Notice🚨',
          date: '27 December 2025',
          summary: 'Effective Wednesday, January 1, 2025 2:00 AM all Norwegian routes will be terminated.Any PIREPs filed on Norwegian routes after this time will be automatically rejected..'
        },
      ]
    },
    {
      topic: 'Pilots Achievements',
      news: [
        {
          title: '🌟December Pilot of the Month (POTM)🌟',
          date: '2 January 2026',
          summary: 'Having only joined EAVG in late November ChrisIF | 248VG has shoqn exceptional dedication and climbed quickly through the ranks. Please join us in congratulating Captain ChrisIF | 248VG  in our forum thread for being December Pilot of the Month (POTM) as well as gaining the last POTM in 2025! 👏✈️.'
        },
        {
          title: '🌟November Pilot of the Month (POTM)🌟',
          date: '4 December 2025',
          summary: `When a pilot consistently tracks their progress throughout the month, boom! They earn the title of Pilot of the Month! 🎉
           Please join us in congratulating Captain Adam Ashraf | 990VG in our forum thread for being November Pilot of the Month (POTM)! 👏✈️.`
        },
      ]
    },
    
  ];

  // Pilot of the month Code Source
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#042C64] text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">News & Recognition</h1>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={200}>
            <p className="max-w-2xl mx-auto text-lg">
              Stay updated with the latest announcements, achievements, and celebrate 
              our outstanding pilots.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pilot of the Month */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-[#042C64]" />
                <h2 className="text-[#042C64] font-bold">Pilot of the Month</h2>
              </div>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#042C64]"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pilotOfTheMonth[selectedYear as keyof typeof pilotOfTheMonth].map((pilot, index) => (
              <ScrollReveal key={index} animation="slide-up" delay={index * 50}>
                <div
                  className={`bg-white border rounded-lg p-6 text-center h-full ${
                    pilot.name !== 'TBA' 
                      ? 'border-[#042C64] shadow-md' 
                      : 'border-gray-200 opacity-50'
                  }`}
                >
                  <div className="w-20 h-20 bg-[#042C64] rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden border-2 border-[#042C64]">
                    {pilot.image ? (
                      <img src={pilot.image} alt={pilot.name} className="w-full h-full object-cover" />
                    ) : pilot.name !== 'TBA' ? (
                      <Award className="w-10 h-10 text-white" />
                    ) : (
                      <span className="text-white">?</span>
                    )}
                  </div>
                  <h3 className="mb-2 text-[#042C64]">{pilot.month}</h3>
                  <p className="mb-1">{pilot.name}</p>
                  {pilot.hours > 0 && (
                    <p className="text-gray-500">{pilot.hours} hours</p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-8 text-[#042C64] font-semibold">Recent News</h2>
          </ScrollReveal>
          
          <div className="space-y-4">
            {newsByTopic.map((category, index) => (
              <ScrollReveal key={index} animation="slide-up" delay={index * 100}>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setExpandedTopic(expandedTopic === category.topic ? null : category.topic)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-[#042C64]">{category.topic}</h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedTopic === category.topic ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {expandedTopic === category.topic && (
                    <div className="px-6 pb-4 space-y-4 border-t border-gray-200">
                      {category.news.map((item, newsIndex) => (
                        <div key={newsIndex} className="pt-4">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h4 className="text-gray-900">{item.title}</h4>
                            <span className="text-gray-500 whitespace-nowrap">{item.date}</span>
                          </div>
                          <p className="text-gray-600">{item.summary}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-[#042C64] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="zoom-in">
            <h2 className="mb-6">Stay Informed</h2>
            <p className="mb-8">
              we are doing our best to keep the community informed about VA news, events, and important announcements. have a visit to our IFC thread to stay in touch
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-[#042C64] transition-colors"
              >
                IFC thread
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
