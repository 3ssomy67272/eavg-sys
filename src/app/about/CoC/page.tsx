"use client";

import { Construction } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function CodeOfConductPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#042C64] text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Code of Conduct</h1>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={200}>
            <p className="max-w-2xl mx-auto text-lg">
              Guidelines and expectations for all EAVG community members and pilots.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Under Development Notice */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="slide-up">
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-12">
              <Construction className="w-16 h-16 text-yellow-600 mx-auto mb-6" />
              <h2 className="mb-4 text-yellow-900">Under Development</h2>
              <p className="text-yellow-800 mb-6 text-lg">
                Our comprehensive Code of Conduct is currently being finalized. 
                This page will be updated soon with detailed guidelines.
              </p>
              <p className="text-yellow-700 font-medium">
                In the meantime, we expect all members to:
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Temporary Guidelines */}
      <section className="py-12 bg-gray-50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-12 text-center text-[#042C64] font-bold">Core Principles</h2>
          </ScrollReveal>
          <div className="grid gap-6">
            {[
              {
                title: "Respect & Professionalism",
                content: "Treat all members with respect and courtesy. Avoid engaging in any form of drama, racism, sexism, hate speech, or expressing hate towards other members."
              },
              {
                title: "Integrity",
                content: "Be honest in all your interactions. Do not falsify flight reports, statistics, or any other information."
              },
              {
                title: "Community Spirit",
                content: "Help create a positive and welcoming environment. Support fellow pilots and contribute constructively to discussions."
              },
              {
                title: "Operational Standards",
                content: "Follow proper procedures and maintain the quality standards as insrtucted by your recruiter during checkride."
              }
            ].map((principle, index) => (
              <ScrollReveal key={index} animation="slide-up" delay={index * 100}>
                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="mb-3 text-[#042C64] flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#042C64]/5 text-[#042C64] flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {principle.content}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="zoom-in">
            <h2 className="mb-6 text-[#042C64] font-semibold">Questions or Concerns?</h2>
            <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">
              If you have questions about expected conduct or need to report a concern, 
              please contact our staff team immediately.
            </p>
            <a
              href="/about/contacts"
              className="inline-block bg-[#042C64] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#042C64]/90 transition-all hover:scale-105 shadow-lg"
            >
              Contact Staff
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
