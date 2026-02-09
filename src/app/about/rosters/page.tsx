"use client";

import { useState } from 'react';
import { Search, ExternalLink, MapPin, Clock } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function PilotRosterPage() {
  const [searchTerm, setSearchTerm] = useState('');

  //  manual data input. to be linked with VA's future database
  const pilots = [
    {
      id: '1',
      name: 'Essam Morgan',
      callsign: 'MSR001VG',
      rank: 'Legend',
      hours: 1790,
      location: 'Egypt',
      joinDate: 'MAY 2024',
      forumProfile: 'https://community.infiniteflight.com/u/3ssomy167/'
    },
    {
      id: '2',
      name: 'Hussain Makhdoomi',
      callsign: 'MSR002VG',
      rank: 'Chief Pilot',
      hours: 1000,
      location: 'India',
      joinDate: 'FEB 2024',
      forumProfile: 'https://community.infiniteflight.com/u/hussain_makhdoomi2/'
    },
    {
      id: '3',
      name: 'Eyad Radwan',
      callsign: 'MSR003VG',
      rank: 'Chief Pilot',
      hours: 1355,
      location: 'Canada',
      joinDate: 'FEB 2025',
      forumProfile: 'https://community.infiniteflight.com/u/eyadradwan209/'
    },
    {
      id: '4',
      name: 'SirMJ9',
      callsign: 'MSR009VG',
      rank: 'Elite Commander',
      hours: 770,
      location: 'Egypt',
      joinDate: 'MAY 2024',
      forumProfile: 'https://community.infiniteflight.com/u/sirmj9/'
    },
    {
      id: '5',
      name: 'Saleh',
      callsign: 'MSR777VG',
      rank: 'Commander',
      hours: 650,
      location: 'Egypt',
      joinDate: 'JUL 2025',
      forumProfile: 'https://community.infiniteflight.com/u/_saleh/'
    },
    {
      id: '6',
      name: 'Vasto Lorde',
      callsign: 'MSR271VG',
      rank: 'First Officer',
      hours: 74,
      location: null,
      joinDate: 'JUL 2025',
      forumProfile: 'https://community.infiniteflight.com/u/ban-kai/'
    },
    {
      id: '7',
      name: 'Adam Ashraf',
      callsign: 'MSR990VG',
      rank: 'Captain',
      hours: 227,
      location: "Egypt",
      joinDate: 'SEP 2025',
      forumProfile: 'https://community.infiniteflight.com/u/adam_ashraf/'
    },
    {
      id: '8',
      name: 'ChrisIF',
      callsign: 'MSR248VG',
      rank: 'Senior Officer',
      hours: 167,
      location: null,
      joinDate: 'NOV 2025',
      forumProfile: 'https://community.infiniteflight.com/u/Krzysztof_Paszek/'
    },
  ];

  // search filter
  const filteredPilots = pilots.filter(pilot =>
    pilot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pilot.callsign.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pilot.location?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    pilot.rank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort by callsign descending
  const sortedPilots = [...filteredPilots].sort((a, b) => a.callsign.localeCompare(b.callsign));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#042C64] text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Pilot Roster</h1>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={200}>
            <p className="max-w-2xl mx-auto text-lg opacity-90">
              Meet our community of dedicated virtual pilots from around the world. 
              Click on any pilot's name to visit their forum profile.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50 border-b border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Pilots", value: pilots.length },
              { label: "Total Hours", value: pilots.reduce((sum, p) => sum + p.hours, 0).toLocaleString() },
              { label: "Countries", value: new Set(pilots.map(p => p.location)).size },
              { label: "Avg Hours/Pilot", value: Math.round(pilots.reduce((sum, p) => sum + p.hours, 0) / pilots.length) }
            ].map((stat, index) => (
              <ScrollReveal key={index} animation="slide-up" delay={index * 100}>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-[#042C64] mb-2">{stat.value}</div>
                  <p className="text-gray-500 font-medium">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roster Table */}
      <section className="py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <ScrollReveal animation="slide-up">
            <div className="mb-8">
              <div className="relative max-w-md mx-auto md:mx-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search pilots by name, callsign, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#042C64] shadow-sm transition-all"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Mobile View - Cards */}
          <div className="md:hidden space-y-4">
            {sortedPilots.map((pilot, index) => (
              <ScrollReveal key={pilot.id} animation="slide-up" delay={index * 50}>
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <a
                        href={pilot.forumProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-[#042C64] hover:underline flex items-center gap-2"
                      >
                        {pilot.name}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <p className="text-[#042C64]/70 font-semibold">{pilot.callsign}</p>
                    </div>
                    <span className="bg-[#042C64] text-white px-4 py-1 rounded-full text-sm font-bold">
                      {pilot.hours}h
                    </span>
                  </div>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">{pilot.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">Joined {pilot.joinDate}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Rank</span>
                      <p className="text-sm font-semibold text-gray-800">{pilot.rank}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden md:block">
            <ScrollReveal animation="fade-in">
              <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-[#042C64] text-white">
                      <th className="px-6 py-4 text-left font-semibold">Rank</th>
                      <th className="px-6 py-4 text-left font-semibold">Pilot Name</th>
                      <th className="px-6 py-4 text-left font-semibold">Callsign</th>
                      <th className="px-6 py-4 text-left font-semibold">Flight Hours</th>
                      <th className="px-6 py-4 text-left font-semibold">Location</th>
                      <th className="px-6 py-4 text-left font-semibold">Join Date</th>
                      <th className="px-6 py-4 text-left font-semibold">Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedPilots.map((pilot, index) => (
                      <tr
                        key={pilot.id}
                        className={`border-b border-gray-100 hover:bg-gray-50/80 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                        }`}
                      >
                        <td className="px-6 py-4 text-gray-700 font-medium">{pilot.rank}</td>
                        <td className="px-6 py-4 font-bold text-gray-900">{pilot.name}</td>
                        <td className="px-6 py-4 text-gray-600 font-semibold">{pilot.callsign}</td>
                        <td className="px-6 py-4">
                          <span className="bg-[#042C64]/10 text-[#042C64] px-4 py-1 rounded-full text-sm font-bold">
                            {pilot.hours} hours
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium">{pilot.location}</td>
                        <td className="px-6 py-4 text-gray-500">{pilot.joinDate}</td>
                        <td className="px-6 py-4">
                          <a
                            href={pilot.forumProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#042C64] hover:text-blue-700 transition-colors flex items-center gap-1 font-semibold"
                          >
                            View
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>

          {filteredPilots.length === 0 && (
            <ScrollReveal animation="fade-in">
              <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 mt-8">
                <p className="text-gray-500 font-medium">No pilots found matching your search criteria.</p>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal animation="slide-up">
            <div className="mt-8 text-center">
              <p className="text-gray-500 font-medium bg-gray-100 inline-block px-4 py-2 rounded-full text-sm">
                Showing <span className="text-[#042C64] font-bold">{filteredPilots.length}</span> of <span className="text-[#042C64] font-bold">{pilots.length}</span> active pilots
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-24 bg-[#042C64] text-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal animation="zoom-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Want to See Your Name Here?</h2>
            <p className="text-xl mb-10 opacity-80 max-w-2xl mx-auto">
              Become part of the EAVG community and start your virtual aviation journey with us today.
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
