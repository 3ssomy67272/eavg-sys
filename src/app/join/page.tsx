"use client";

import { useState } from 'react';
import { CheckCircle, ChevronRight, Send, X } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function JoinNowPage() {
  const [showForm, setShowForm] = useState(false);
  const [formPage, setFormPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    pilotName: '',
    email: '',
    age: '',
    ifcName: '',
    ifcGrade: '',
    landingViolationRatio: '',
    heardFromIFC: false,
    heardFromOther: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNextPage = () => {
    setFormPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    setFormPage(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const approveRedirectUrl = `${window.location.origin}/approve?username=${encodeURIComponent(formData.ifcName)}`;
    const ifcProfileUrl = `https://community.infiniteflight.com/u/${encodeURIComponent(formData.ifcName)}/summary`;

    const discordPayload = {
      content: "📢 **New Pilot Application Received!**",
      embeds: [
        {
          title: "✈️ EgyptAir Virtual Application",
          color: 0x0070f3, // EgyptAir blue color
          fields: [
            { name: "Pilot Name", value: formData.pilotName, inline: true },
            { name: "Email", value: formData.email, inline: true },
            { name: "Age", value: formData.age, inline: true },
            { name: "IFC Name", value: formData.ifcName, inline: true },
            { name: "IFC Grade", value: formData.ifcGrade, inline: true },
            { name: "Landing/Violation Ratio", value: formData.landingViolationRatio, inline: true },
            { name: "How did you hear about us?", value: formData.heardFromIFC ? 'IFC Thread' : formData.heardFromOther, inline: false },
            { name: "Actions", value: `✅ [Approve Applicant](${approveRedirectUrl}) • 👤 [View IFC Profile](${ifcProfileUrl})`, inline: false }
          ],
          footer: {
            text: `Submitted at ${new Date().toLocaleString()}`
          }
        }
      ]
    };

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload),
      });

      const result = await response.json();

      if (!response.ok) {
        const error = new Error(result.error || 'Failed to send application') as any;
        error.details = result.details;
        throw error;
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      setIsSubmitting(false);
      
      let errorMessage = error.message;
      if (error.details) {
        try {
          const details = JSON.parse(error.details);
          errorMessage += ` - ${JSON.stringify(details)}`;
        } catch {
          errorMessage += ` - ${error.details}`;
        }
      }
      
      alert(`There was an error submitting your application: ${errorMessage}. Please try again.`);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setFormPage(1);
    setSubmitSuccess(false);
    setFormData({
      pilotName: '',
      email: '',
      age: '',
      ifcName: '',
      ifcGrade: '',
      landingViolationRatio: '',
      heardFromIFC: false,
      heardFromOther: ''
    });
  };

  const isPage1Valid = formData.pilotName && formData.email && formData.age;
  const isPage2Valid = formData.ifcName && formData.ifcGrade;
  const isPage3Valid = formData.landingViolationRatio;
  const isPage4Valid = formData.heardFromIFC || formData.heardFromOther;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#042C64] text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Join EgyptAir Virtual Group</h1>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={200}>
            <p className="max-w-2xl mx-auto text-lg">
              Ready to become part of our community? Review the requirements below and 
              submit your application to start your journey with EAVG.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-8 text-center text-[#042C64] font-bold">Application Requirements</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                title: "Infinite Flight Account",
                desc: "Active subscription with Grade 3 or higher"
              },
              {
                title: "Flight Record",
                desc: "Positive landing-to-violation ratio"
              },
              {
                title: "Minimum Age",
                desc: "Must be 13 years old or above."
              },
              {
                title: "Discord Account",
                desc: "Required for community access"
              },
              {
                title: "Minimum Server access",
                desc: "Must have access to Expert server on time of applying"
              },
              {
                title: "IFC Standing",
                desc: "Must NOT be on IFVARB blacklist and/or watchlist."
              }
            ].map((req, index) => (
              <ScrollReveal key={index} animation="slide-up" delay={index * 100}>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg h-full">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="mb-1 text-[#042C64]">{req.title}</h3>
                    <p className="text-gray-600">{req.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="slide-up" delay={600} className="text-center">
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#042C64] text-white px-8 py-3 rounded-md hover:bg-[#042C64]/90 transition-colors inline-flex items-center gap-2"
            >
              Let's Apply!
              <ChevronRight className="w-5 h-5" />
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-8 text-center text-[#042C64] font-bold">What Happens Next?</h2>
          </ScrollReveal>
          
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Application Review",
                desc: "Our recruitment team will review your application within 1 week maximum."
              },
              {
                step: 2,
                title: "Decision Notification",
                desc: "You'll receive an email and IFC message with the decision and next steps."
              },
              {
                step: 3,
                title: "Onboarding",
                desc: "If accepted, you'll receive Discord server access link."
              },
              {
                step: 4,
                title: "Start Flying",
                desc: "Complete your Checkride with your recruiter to become a full member of EAVG!"
              }
            ].map((item, index) => (
              <ScrollReveal key={index} animation="slide-up" delay={index * 100}>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#042C64] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="mb-2 text-[#042C64] font-semibold">{item.title}</h3>
                    <p className="text-gray-700">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-[#042C64]">Pilot Application</h2>
                <p className="text-gray-600">Step {formPage} of 4</p>
              </div>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!submitSuccess ? (
              <form onSubmit={handleSubmit} className="p-6">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    {[1, 2, 3, 4].map(step => (
                      <div
                        key={step}
                        className={`w-1/4 h-2 rounded-full mx-1 ${
                          step <= formPage ? 'bg-[#042C64]' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Page 1: Basic Information */}
                {formPage === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="pilotName" className="block text-gray-700 mb-2">
                        Pilot Name *
                      </label>
                      <input
                        type="text"
                        id="pilotName"
                        name="pilotName"
                        value={formData.pilotName}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#042C64]"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#042C64]"
                      />
                    </div>

                    <div>
                      <label htmlFor="age" className="block text-gray-700 mb-2">
                        Age *
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        min="13"
                        placeholder="Must be 13 or older"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#042C64]"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextPage}
                        disabled={!isPage1Valid}
                        className="bg-[#042C64] text-white px-6 py-2 rounded-md hover:bg-[#042C64]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Page 2: Infinite Flight Information */}
                {formPage === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="ifcName" className="block text-gray-700 mb-2">
                        Infinite Flight Community (IFC) Username *
                      </label>
                      <input
                        type="text"
                        id="ifcName"
                        name="ifcName"
                        value={formData.ifcName}
                        onChange={handleInputChange}
                        required
                        placeholder="Your IFC username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#042C64]"
                      />
                      <p className="text-gray-500 mt-1">
                        This will be used to verify your account
                      </p>
                    </div>

                    <div>
                      <label htmlFor="ifcGrade" className="block text-gray-700 mb-2">
                        Current Infinite Flight Grade *
                      </label>
                      <select
                        id="ifcGrade"
                        name="ifcGrade"
                        value={formData.ifcGrade}
                        onChange={(e) => handleInputChange(e as any)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#042C64]"
                      >
                        <option value="">Select your grade</option>
                        <option value="Grade 1">Grade 1</option>
                        <option value="Grade 2">Grade 2</option>
                        <option value="Grade 3">Grade 3</option>
                        <option value="Grade 4">Grade 4</option>
                        <option value="Grade 5">Grade 5</option>
                      </select>
                      <p className="text-gray-500 mt-1">
                        Minimum requirement: Grade 3
                      </p>
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
                        type="button"
                        onClick={handleNextPage}
                        disabled={!isPage2Valid}
                        className="bg-[#042C64] text-white px-6 py-2 rounded-md hover:bg-[#042C64]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Page 3: Flight Record */}
                {formPage === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="landingViolationRatio" className="block text-gray-700 mb-2">
                        Landing-to-Violation Ratio *
                      </label>
                      <input
                        type="text"
                        id="landingViolationRatio"
                        name="landingViolationRatio"
                        value={formData.landingViolationRatio}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 3.5:1 or 500 landings / 142 violations"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#042C64]"
                      />
                      <p className="text-gray-500 mt-1">
                        You can find this in your Infinite Flight profile stats
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <p className="text-blue-900">
                        <strong>Note:</strong> We require a positive ratio (more landings than violations) 
                        to ensure all pilots maintain good flight practices.
                      </p>
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
                        type="button"
                        onClick={handleNextPage}
                        disabled={!isPage3Valid}
                        className="bg-[#042C64] text-white px-6 py-2 rounded-md hover:bg-[#042C64]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Page 4: How did you hear about us */}
                {formPage === 4 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 mb-3">
                        How did you hear about us? *
                      </label>
                      
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                          <input
                            type="checkbox"
                            name="heardFromIFC"
                            checked={formData.heardFromIFC}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-[#042C64] border-gray-300 rounded focus:ring-[#042C64]"
                          />
                          <span>IFC Thread (Infinite Flight Community)</span>
                        </label>

                        <div>
                          <label htmlFor="heardFromOther" className="block text-gray-700 mb-2">
                            Other Source:
                          </label>
                          <input
                            type="text"
                            id="heardFromOther"
                            name="heardFromOther"
                            value={formData.heardFromOther}
                            onChange={handleInputChange}
                            disabled={formData.heardFromIFC}
                            placeholder="e.g., Discord, Friend, Social Media..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#042C64] disabled:bg-gray-100 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                      <p className="text-yellow-900">
                        <strong>Before submitting:</strong> Please ensure all information provided 
                        is accurate. False information may result in application rejection.
                      </p>
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
                        disabled={!isPage4Valid || isSubmitting}
                        className="bg-[#042C64] text-white px-6 py-2 rounded-md hover:bg-[#042C64]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        {!isSubmitting && <Send className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="mb-2 text-green-600">Application Submitted!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for applying to EgyptAir Virtual Group. Our recruitment team 
                  will review your application and contact you within 1 week maximum.
                </p>
                <button
                  onClick={resetForm}
                  className="bg-[#042C64] text-white px-6 py-2 rounded-md hover:bg-[#042C64]/90 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
