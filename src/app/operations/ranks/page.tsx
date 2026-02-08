"use client";

import { Award, Star } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function RanksPage() {
  const ranks = [
    {
      id: '1',
      name: 'Cadet',
      minHours: 0,
      image: null,
      color: 'bg-gray-100',
      textColor: 'text-gray-700',
      features: [
        'Access to all aircraft',
        'Domestic Routes Up to 400NM',
        'Offcial EAVG Pilot'
      ]
    },
    {
      id: '2',
      name: 'Junior Officer',
      minHours: 20,
      image: null,
      color: 'bg-blue-100',
      textColor: 'text-blue-700',
      features: [
        'Regional Routes, Up to 1500NM'
      ]
    },
    {
      id: '3',
      name: 'First Officer',
      minHours: 50,
      image: null,
      color: 'bg-blue-100',
      textColor: 'text-blue-700',
      features: [
        'Short-Haul Routes, Up to 1500NM',
        'Codeshare Flights, Up to 1500NM',
        'Route Of The Week (ROTW)'
       ]
    },
    {
      id: '4',
      name: 'Senior Officer',
      minHours: 100 ,
      image: null,
      color: 'bg-blue-100',
      textColor: 'text-blue-700',
      features: [
        'Medium-Haul Routes, Up to 2000NM',
        'Codeshare Flights, Up to 2000NM'
      ]
    },
    {
      id: '5',
      name: 'Captain',
      minHours: 200,
      image: null,
      color: 'bg-blue-100',
      textColor: 'text-blue-700',
      features: [
        ' Long-Haul Routes, Up to 4000NM',
        'Codeshare Flights, Up to 4000NM'
      ]
    },
    {
      id: '6',
      name: 'Senior Captain',
      minHours: 500,
      image:  null,
      color: 'bg-blue-100',
      textColor: 'text-blue-700',
      features: [
        'Ultra Long-Haul Routes, 4500NM and more',
        'Codeshare Flights, 4500NM and more'
      ]
    },
    {
      id: '7',
      name: 'Commander',
      minHours: 500,
      image: null,
      color: 'bg-blue-100',
      textColor: 'text-blue-700',
      features: [
        'Military Missions (coming soon!)!',
        'x1.2 Multiplier on all Flights!'
      ]
    },
    {
      id: '8',
      name: 'Elite Commander',
      minHours: 700,
      image: null,
      color: 'bg-blue-100',
      textColor: 'text-blue-700',
      features: [
        'x1.3 multiplier on all Flights!'
      ]
    },
    {
      id: '9',
      name: 'Chief pilot',
      minHours: 1000,
      image: null,
      color: 'bg-blue-100',
      textColor: 'text-blue-700',
      features: [
        'x1.3 multiplier on all Flights!'
      ]
    },
    {
      id: '10',
      name: 'Legend',
      minHours: 1500,
      image: null,
      color: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      features: [
        'Special congrats on all EAVG Platforms !!',
        'x1.6 multiplier on all Flights'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#042C64] text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Rank System</h1>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={200}>
            <p className="max-w-2xl mx-auto text-lg">
              Progress through our comprehensive rank system as you log flight hours. 
              Each rank unlocks new features and opportunities within EgyptAir Virtual Group.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-gray-50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-6 text-[#042C64] font-semibold">How It Works</h2>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={200}>
            <p className="text-gray-700 mb-4 text-lg">
              Your rank is determined by your total flight hours logged with EAVG. As you complete 
              flights and submit PIREPs, your hours accumulate and you automatically advance through 
              the ranks.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={300}>
            <p className="text-gray-600 font-medium italic">
              Promotions are automatic and instant once you reach the required hours!
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Ranks Grid */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {ranks.map((rank, index) => (
              <ScrollReveal key={rank.id} animation="slide-up" delay={index * 100}>
                <div 
                  className={`${rank.color} rounded-lg p-6 border-2 ${
                    index === ranks.length - 1 ? 'border-[#042C64]' : 'border-transparent'
                  } hover:shadow-lg transition-all hover:-translate-y-1 h-full`}
                >
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center text-5xl bg-white/50 rounded-full shadow-sm">
                      {rank.image}
                    </div>
                    <h3 className={`mb-2 font-bold ${rank.textColor}`}>{rank.name}</h3>
                    <div className="flex items-center justify-center gap-2 text-gray-600 font-medium">
                      <Star className="w-4 h-4" />
                      <span>{rank.minHours}+ hours</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {rank.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2">
                        <Award className={`w-4 h-4 ${rank.textColor} flex-shrink-0 mt-0.5`} />
                        <span className="text-gray-700 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
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
