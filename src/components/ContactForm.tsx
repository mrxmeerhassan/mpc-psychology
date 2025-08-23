"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    concerns: "",
    therapyType: "",
    urgency: "low"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      console.log("Submitting form data:", formData);
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("API response:", result);

      if (response.ok) {
        setStatus("success");
        setFormData({ 
          name: "", 
          email: "", 
          phone: "", 
          preferredTime: "", 
          concerns: "", 
          therapyType: "", 
          urgency: "low" 
        });
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to submit booking request");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage("Network error. Please try again or contact us directly.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Free Consultation</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your mental health journey with a complimentary 15-minute consultation. 
            Let&apos;s discuss your needs and see how we can help you.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">What to Expect</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Free 15-Minute Session</h4>
                    <p className="text-gray-600">No cost, no obligation - just a conversation to see if we&apos;re a good fit.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Discuss Your Needs</h4>
                    <p className="text-gray-600">Share your concerns and goals in a safe, confidential environment.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Get Personalized Recommendations</h4>
                    <p className="text-gray-600">Receive tailored suggestions for your mental health journey.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">Why Choose MPC?</h3>
              <ul className="space-y-2 text-cyan-100">
                <li>• Evidence-based therapeutic approaches</li>
                <li>• Experienced, licensed professionals</li>
                <li>• Flexible online and in-person sessions</li>
                <li>• Compassionate, judgment-free environment</li>
                <li>• Personalized treatment plans</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            {status === "success" && (
              <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-800">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Booking Confirmed!</span>
                </div>
                <p className="mt-1 text-sm">Thank you for your consultation request. We&apos;ll contact you within 24 hours to schedule your session.</p>
              </div>
            )}
            {status === "error" && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Booking Failed</span>
                </div>
                <p className="mt-1 text-sm">{errorMessage || "Please try again or contact us directly."}</p>
                <p className="mt-2 text-xs">You can also email us directly at: meerhassan11@icloud.com</p>
              </div>
            )}
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Book Your Consultation</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="rounded-lg border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address"
                  type="email"
                  className="rounded-lg border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number (Optional)"
                  className="rounded-lg border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="rounded-lg border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="low">Low Urgency</option>
                  <option value="medium">Medium Urgency</option>
                  <option value="high">High Urgency</option>
                </select>
              </div>
              
              <select
                name="therapyType"
                value={formData.therapyType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Select Therapy Type (Optional)</option>
                <option value="cbt">Cognitive Behavioral Therapy (CBT)</option>
                <option value="act">Acceptance & Commitment Therapy (ACT)</option>
                <option value="dbt">Dialectical Behavior Therapy (DBT)</option>
                <option value="psychodynamic">Psychodynamic Therapy</option>
                <option value="person-centered">Person-Centered Therapy</option>
                <option value="not-sure">Not Sure - Need Guidance</option>
              </select>
              
              <input
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                placeholder="Preferred Consultation Time (e.g., Weekday evenings, Weekend mornings)"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              
              <textarea
                name="concerns"
                value={formData.concerns}
                onChange={handleChange}
                required
                placeholder="Please describe what you&apos;d like help with and any specific concerns you have..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                rows={4}
              />
            </div>
            
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full mt-6 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4 text-white font-semibold hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {status === "loading" ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Booking Consultation...
                </div>
              ) : (
                "Book Free Consultation"
              )}
            </button>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              By submitting this form, you agree to our privacy policy and consent to being contacted about your consultation request.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

