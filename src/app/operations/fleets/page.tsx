"use client";

import { Plane } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function FleetsPage() {
  const fleets = [
    {
      id: '1',
      name: 'Boeing 777-300ER',
      image: 'https://i.postimg.cc/x1vbkNbs/Screenshot-3.png',
      count: 6,
      range: '7,370 NM',
      speed: 'Mach 0.84',
      capacity: '503 passengers',
      description: null,
      voteUrl: null
    },
    {
      id: '2',
      name: 'Boeing 787-9 Dreamliner',
      image: 'https://i.postimg.cc/V5yWwy35/Screenshot-4.png',
      count: 4,
      range: '7,635 NM',
      speed: 'Mach 0.85',
      capacity: '364 passengers',
      description: null,
      voteUrl: 'https://community.infiniteflight.com/t/egyptair-boeing-787-9-dreamliner/349791'
    },
    {
      id: '3',
      name: 'Airbus A330-300',
      image: 'https://i.postimg.cc/DzdGJJRn/Screenshot-6.png',   //https://postimg.cc/delete/LGvPzBgP/536abe24
      count: 8,
      range: '7,250 NM',
      speed: 'Mach 0.82',
      capacity: '287 passengers',
      description: null,
      voteUrl: null
    },
    {
      id: '4',
      name: 'Airbus A320neo',
      image: 'https://i.postimg.cc/m22rtckg/su-gfp-egyptair-airbus-a320-251n-Planespotters-Net-1844971-7d457066ca-o.jpg',     //https://postimg.cc/delete/x7qdHvxG/42104b30
      count: 12,
      range: '3,300 NM',
      speed: 'Mach 0.78',
      capacity: '175 passengers',
      description: null,
      voteUrl: 'https://community.infiniteflight.com/t/egyptair-airbus-a320neo/876928'
    },
    {
      id: '5',
      name: 'Airbus A321neo',
      image: 'https://i.postimg.cc/TP8GqhdS/Egytpair-A321N.jpg',    //https://postimg.cc/delete/XtW32dLY/6a278700
      count: 8,
      range: '3,200 NM',
      speed: 'Mach 0.78',
      capacity: '239 passengers',
      description: null,
      voteUrl: 'https://community.infiniteflight.com/t/egyptair-a321neo/943584'
    },
    {
      id: '6',
      name: 'Boeing 737-800',
      image: 'https://i.postimg.cc/yddfDXMG/Egytpair-B738.jpg',     //https://postimg.cc/delete/PBL6YFDr/3a7ac0be
      count: 30,
      range: '2,935 NM',
      speed: 'Mach 0.78',
      capacity: '189 passengers',
      description: null,  
      voteUrl: null
    },
    {
      id: '7',
      name: 'Airbus A220-300',
      image: 'https://i.postimg.cc/SxbkcJxF/Egytpair-BCS3.jpg',   //https://postimg.cc/delete/ytssj0vD/57c98baa
      count: 4,
      range: '3,600 NM',
      speed: 'Mach 0.78',
      capacity: '160 passengers',
      description: null,
      voteUrl: null
    },
    {
      id: '8',
      name: 'Airbus A350-900',
      image: 'https://i.postimg.cc/g0nWPvSX/A359.jpg',   //https://postimg.cc/delete/JSBL7Tnp/1e761bfe
      count: 0,
      range: '8,100 NM',
      speed: 'Mach 0.85',
      capacity: '440 passengers',
      description: null,
      voteUrl: 'https://community.infiniteflight.com/t/egyptair-a350-900/1150828'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#042C64] text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Our Fleet</h1>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={200}>
            <p className="max-w-2xl mx-auto text-lg">
              EgyptAir Virtual Group operates a modern fleet of aircraft to serve destinations 
              across the globe.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Fleet Statistics */}
      <section className="py-12 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-center">
            {[
              {
                value: 8,
                label: "Aircraft Types"
              },
              {
                value: "8,100 NM",
                label: "Max Range"
              },
              {
                value: 440,
                label: "Max Capacity"
              }
            ].map((stat, index) => (
              <ScrollReveal key={index} animation="slide-up" delay={index * 100}>
                <div>
                  <div className="text-[#042C64] mb-2 font-bold text-3xl">
                    {stat.value}
                  </div>
                  <p className="text-gray-600 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Cards */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fleets.map((fleet, index) => (
              <ScrollReveal key={fleet.id} animation="slide-up" delay={index * 100}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={fleet.image}
                      alt={fleet.name}
                      className="w-full h-full object-cover"
                    />
                    {fleet.voteUrl && (
                      <a 
                        href={fleet.voteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 bg-[#042C64] text-white px-3 py-1 rounded-full text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg"
                      >
                        Click to vote
                      </a>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Plane className="w-5 h-5 text-[#042C64]" />
                      <h3 className="text-[#042C64] font-bold">{fleet.name}</h3>
                    </div>
                    {fleet.voteUrl ? (
                      <p className="text-gray-600 mb-6">
                        <a 
                          href={fleet.voteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#042C64] font-bold hover:underline inline-flex items-center gap-1"
                        >
                          Vote for the livery to be added in the simulator!
                        </a>
                      </p>
                    ) : (
                      <p className="text-gray-600 mb-6 line-clamp-3">{fleet.description}</p>
                    )}
                    
                    <div className="space-y-3 border-t border-gray-100 pt-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">Range</span>
                        <span className="text-gray-900 font-bold">{fleet.range}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">Cruise Speed</span>
                        <span className="text-gray-900 font-bold">{fleet.speed}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">Capacity</span>
                        <span className="text-gray-900 font-bold">{fleet.capacity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
