"use client";

import { useState } from 'react';
import { X, Mail, MessageSquare, Send, AlertCircle } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContactPage() {
  const [showForm, setShowForm] = useState(false);
  const [formPage, setFormPage] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ifcName: '',
    subject: '',
    message: '',
    understood: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      understood: e.target.checked
    });
  };

  const handleNextPage = () => {
    setFormPage(2);
  };

  const handlePrevPage = () => {
    setFormPage(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ifcProfileUrl = `https://community.infiniteflight.com/u/${encodeURIComponent(formData.ifcName)}`;

    const discordPayload = {
      type: 'contact',
      content: "📨 **New Message to directors team submitted via website!**",
      embeds: [{
        title: '📬 EgyptAir Virtual - Contact Submission',
        color: 0x042C64, // EAVG Dark Blue
        fields: [
          { name: 'Name', value: formData.name, inline: true },
          { name: 'Email', value: formData.email, inline: true },
          { name: 'IFC Username', value: `[${formData.ifcName}](${ifcProfileUrl})`, inline: true },
          { name: 'Subject', value: formData.subject, inline: false },
          { name: 'Message', value: formData.message, inline: false }
        ],
        footer: {
          text: `Submitted via EAVG Website • ${new Date().toLocaleString()}`
        }
      }]
    };

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to send message');
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setShowForm(false);
        setFormPage(1);
        setSubmitSuccess(false);
        setFormData({
          name: '',
          email: '',
          ifcName: '',
          subject: '',
          message: '',
          understood: false
        });
      }, 5000);
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      setIsSubmitting(false);
      alert(`There was an error sending your message: ${error.message}. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#042C64] text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="max-w-2xl mx-auto text-lg">
              Have questions or need assistance? Our team is here to help.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-12 text-center text-[#042C64] font-semibold">Get in Touch</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <MessageSquare className="w-8 h-8 text-white" />,
                title: "Forum Message",
                desc: "Contact us privatly via Infinite Flight Community Forum",
                link: "Send a Message →",
                href: "https://community.infiniteflight.com/new-message?username=egyptairvirtualgroup"
              },
              {
                icon: <Mail className="w-8 h-8 text-white" />,
                title: "Thread",
                desc: "Post your questions or feedback on our community thread.",
                link: "Visit Thread →",
                href: "https://community.infiniteflight.com/t/egypt-air-virtual-group-fly-with-pride-fly-with-us-official-thread-2024/899511?u=egyptairvirtualgroup"
              },
              {
                icon: <Send className="w-8 h-8 text-white" />,
                title: "Contact Form",
                desc: "Send us a message directly through our contact form.",
                link: "Open Form →",
                action: () => setShowForm(true)
              }
            ].map((method, i) => (
              <ScrollReveal key={i} animation="slide-up" delay={i * 100}>
                <div className="text-center p-6 bg-gray-50 rounded-lg h-full hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-[#042C64] rounded-full flex items-center justify-center mx-auto mb-4">
                    {method.icon}
                  </div>
                  <h3 className="mb-3 text-[#042C64]">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.desc}</p>
                  {method.href ? (
                    <a href={method.href} className="text-[#042C64] hover:underline">
                      {method.link}
                    </a>
                  ) : (
                    <button onClick={method.action} className="text-[#042C64] hover:underline">
                      {method.link}
                    </button>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-8 text-center text-[#042C64] font-semibold">Frequently Asked Questions</h2>
          </ScrollReveal>
          <div className="space-y-6">
            {[
              {
                q: "What is the response time?",
                a: "We aim to respond to all inquiries within 24-72 hours. For urgent matters. however we highly recommned to post your general questions in our thread this is where you can get faster answers from other community members too."
              },
              {
                q: "Can I report an issue?",
                a: "Yes, please use the contact form For sensitive matters, you can also request to speak privately with a staff member."
              },
              {
                q: "How do I suggest improvements?",
                a: "We welcome suggestions! Share your ideas on our thread or use the (contact form)."
              }
            ].map((faq, i) => (
              <ScrollReveal key={i} animation="slide-up" delay={i * 100}>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="mb-2 text-[#042C64]">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Modal remains the same */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-[#042C64]">Contact Form</h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setFormPage(1);
                  setSubmitSuccess(false);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!submitSuccess ? (
              <form onSubmit={handleSubmit} className="p-6">
                {formPage === 1 ? (
                  <>
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#042C64]"
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="email" className="block text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#042C64]"
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="ifcName" className="block text-gray-700 mb-2">
                        IFC Username *
                      </label>
                      <input
                        type="text"
                        id="ifcName"
                        name="ifcName"
                        value={formData.ifcName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#042C64]"
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#042C64]"
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="block text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#042C64]"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextPage}
                        disabled={!formData.name || !formData.email || !formData.ifcName || !formData.subject || !formData.message}
                        className="bg-[#042C64] text-white px-6 py-2 rounded-md hover:bg-[#042C64]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-blue-900">
                          <p className="mb-2">
                            <strong>Important Notice:</strong>
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-blue-800">
                            <li>This form is for general inquiries only</li>
                            <li>Do not submit personal or sensitive information</li>
                            <li>EAVG is not intended for collecting PII</li>
                            <li>Response time is typically 24-72 hours</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.understood}
                          onChange={handleCheckboxChange}
                          required
                          className="mt-1 w-5 h-5 text-[#042C64] border-gray-300 rounded focus:ring-[#042C64]"
                        />
                        <span className="text-gray-700">
                          I understand and acknowledge the above notices. I confirm that my 
                          message does not contain sensitive personal information.
                        </span>
                      </label>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={handlePrevPage}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!formData.understood || isSubmitting}
                        className="bg-[#042C64] text-white px-6 py-2 rounded-md hover:bg-[#042C64]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                        {!isSubmitting && <Send className="w-4 h-4" />}
                      </button>
                    </div>
                  </>
                )}
              </form>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="mb-2 text-green-600">Message Sent!</h3>
                <p className="text-gray-600">
                  Thank you for contacting us. We'll get back to you within 24-48 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
