"use client";

import ScrollReveal from '@/components/ScrollReveal';
import { Award } from 'lucide-react';

export default function StaffPage() {
  const staff = [
    {
      id: "2",
      name: "Hussain Makhdomi",
      position: "Chief Operating Officer",
      image: "https://sea1.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/hussain_makhdoomi2/144/1565919_2.png",
      bio: "Oversees daily operations and ensures smooth running of all departments.",
      url: "https://community.infiniteflight.com/u/hussain_makhdoomi2/",
    },
    {
      id: "1",
      name: "3Ssomy167",
      position: "Chief Executive Officer",
      image: "https://www.globalaviationresource.com/reports/2009/scottloughran/images/19.jpg",
      bio: "Leading EAVG with a vision to create a professional yet welcoming VA community.",
      url: "https://community.infiniteflight.com/u/3Ssomy167/",
    },
    {
      id: "3",
      name: "Eyadradwan9",
      position: "Chief Adminstration Officer",
      image: 'https://sea1.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/eyadradwan209/144/1467299_2.png',
      bio: "Overseeing staff team coordination and activties, and CoC enforcement.",
      url: "https://community.infiniteflight.com/u/eyadradwan209/",
    },
    {
      id: "4",
      name: "_Saleh",
      position: "Head of Recruitment",
      image: "https://avatars.discourse-cdn.com/v4/letter/_/da6949/144.png",
      bio: "Processes applications and onboards new pilots.",
      url: "https://community.infiniteflight.com/u/_saleh/",
    },
    {
      id: "5",
      name: "SirMj9",
      position: "Head External Affairs",
      image: "https://sea1.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/sirmj9/144/1297381_2.png",
      bio: "Helps Event Manger in planning and coordinating events with other Virtual Airlines.",
      url: "https://community.infiniteflight.com/u/sirmj9/",
    },
    {
      id: "6",
      name: "_Saleh",
      position: "Events Manager",
      image: "https://avatars.discourse-cdn.com/v4/letter/_/da6949/144.png",
      bio: "Plans and coordinates community events.",
      url: "https://community.infiniteflight.com/u/_saleh/",
    },
    {
      id: "7",
      name: "Vecant",
      position: "Route Manager",
      image: "👩‍✈️",
      bio: "Maintains our comprehensive route network.",
      url: "#",
    },
    {
      id: "8",
      name: "Vecant",
      position: "Community Manager",
      image: "👨‍✈️",
      bio: "Manages Discord, IFC thread, and VA actvties such as Group Flights and events leading.",
      url: "#",
    },
    {
      id: "9",
      name: "Vecant",
      position: "Marketing Officer",
      image: "👨‍✈️",
      bio: "Creates content, manages social media and IFC thread presence.",
      url: "#",
    },
  ];

  const departments = [
    {
      name: "VA Directors",
      members: staff.filter(
        (s) =>
          s.position.includes("Chief")
      ),
    },
    {
      name: "VA Staff",
      members: staff.filter(
        (s) =>
          s.position.includes("Head") ||
          s.position.includes("Manager") ||
          s.position.includes("Market") 
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#042C64] text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Our Staff Team</h1>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={200}>
            <p className="max-w-2xl mx-auto text-lg opacity-90">
              Meet the dedicated team that keeps EgyptAir Virtual
              Group running smoothly. Our staff members volunteer
              their time to ensure all pilots have an exceptional
              experience.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Staff by Department */}
      {departments.map((dept, index) => (
        <section
          key={index}
          className={`py-20 overflow-hidden ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="slide-up">
              <h2 className="mb-12 text-[#042C64] font-semibold">
                {dept.name}
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dept.members.map((member, mIndex) => (
                <ScrollReveal key={member.id} animation="slide-up" delay={mIndex * 100}>
                  <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1 group"
                  onClick={() => window.open(member.url, '_blank')}
                  >
                    <div className="w-24 h-24 mx-auto mb-6 bg-[#042C64] rounded-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                      {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" />
                    ) : member.name !== 'Vecant' ? (
                      <img src={member.image} alt="logo"/>
                    ) : (
                      <span className="text-white">?</span>
                    )}
                    </div>
                    <h3 className="mb-2 text-[#042C64]">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-4">
                      {member.position}
                    </p>
                    <p className="text-gray-500 leading-relaxed">{member.bio}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}