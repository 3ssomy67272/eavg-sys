"use client";

import Link from "next/link";
import { CheckCircle } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function GettingStartedPage() {
  const steps = [
    {
      title: 'Meet the Requirements',
      description: 'Ensure you meet our basic requirements: Grade 3+ on Infinite Flight, positive landing/violation ratio, etc...'
    },
    {
      title: 'Read Our Guidelines',
      description: 'Familiarize yourself with our Code of Conduct, operational procedures, and the expectations.'
    },
    {
      title: 'Submit Your Application',
      description: 'Hit "Join Now" and Fill out our comprehensive application form with your details.'
    },
    {
      title: 'Wait for Review',
      description: 'Our recruitment team usually take 1 week maximum to review your application.'
    },
    {
      title: 'Join the Community',
      description: 'Once accepted, you\'ll receive a IFC forum private message with an invite link to our Discord server.'
    },
    {
      title: 'Pass Your Checkride',
      description: 'follow the steps that will be sent by recruitment team in order to pass the Checkride and get access to all EAVG Systems!'
    },
    {
      title: 'Complete Your First Flight',
      description: 'Choose from our extensive route network and file your first PIREP to become an Offcial EAVG Pilot.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#042C64] text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Getting Started with EAVG</h1>
            <p className="max-w-2xl mx-auto text-lg">
              Your journey to become an EgyptAir Virtual pilot starts here. Follow these simple steps to join our community.
            </p>
          </ScrollReveal>
       </div>
      </section>

      {/* Steps */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <ScrollReveal key={index} animation="slide-up" delay={index * 100}>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#042C64] rounded-full flex items-center justify-center text-white">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-[#042C64] font-bold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-8 text-center text-[#042C64] font-bold">Basic Requirements</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Active Infinite Flight subscribtion with Grade 3 or higher",
              "Positive landing-to-violation ratio",
              "Commitment to follow our Code of Conduct",
              "Discord account for community engagement",
              "Respectful and professional attitude",
              "good standing within the Infinite Flight Community"
            ].map((req, i) => (
              <ScrollReveal key={i} animation="fade-in" delay={i * 100}>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p>{req}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-8 text-center text-[#042C64] font-bold">What to Expect</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4 font-medium">Once you join EgyptAir Virtual Group, you will:</p>
              <ul className="space-y-2 mb-6 list-disc">
                <li>Be expected to open a ticket and provide your IFC username (case sensitive).</li>
                <li>Get contacted by a recruiter to schedule a checkride.</li>
                <li>Receive a warm welcome from our community.</li>
                <li>Gain access to all EAVG Systems.</li>
                <li>Be able to attend regular events and group flights.</li>
                <li>Fly codeshare routes with other premier virtual airlines when you reach first officer rank.</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#042C64] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="zoom-in">
            <h2 className="mb-6">Jump to next step. 	&rarr;</h2>
            <Link
              href="/join"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-[#042C64] transition-colors inline-block"
            >
              Join Now
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
