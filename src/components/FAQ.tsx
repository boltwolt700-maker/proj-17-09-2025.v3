import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const FAQ = () => {
  const [ref, isInView] = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How is Career Clarified different from other career tools?",
      answer: "Most tools treat job searching and personal branding as separate problems. Career Clarified is the first platform that integrates both into one powerful system. Our AI doesn't just format your resume—it optimizes it for ATS systems while simultaneously helping you build the authority that makes recruiters seek you out. It's a complete career growth ecosystem, not just individual tools."
    },
    {
      question: "I'm not a natural writer. Can this really help with LinkedIn content?",
      answer: "Absolutely! That's exactly why we built this. Our AI learns from thousands of high-performing posts and adapts to your expertise and voice. You don't need to be a writer—you just need to be an expert in what you do. The Content Engine generates authentic posts that sound like you, while the Thought Leadership features help you identify trending topics in your field."
    },
    {
      question: "How quickly will I see results?",
      answer: "Resume optimization results appear immediately—you'll see exactly how your ATS score improves in real-time. For LinkedIn, most users see engagement increases within the first week. Career opportunities typically accelerate within 30-60 days as both systems work together. Our users report 87% more interview callbacks and 3x LinkedIn engagement on average."
    },
    {
      question: "What if I'm happy with my current job?",
      answer: "Perfect! Building your personal brand while you're employed is the smartest strategy. You'll be positioned for internal promotions, speaking opportunities, consulting offers, and when you do decide to make a move, opportunities will come to you. Many of our users use Career Clarified to build authority in their current roles."
    },
    {
      question: "Is this suitable for senior executives and experienced professionals?",
      answer: "Absolutely. Senior executives often have the most to gain from strategic personal branding. Our platform adapts to your seniority level and industry, helping you build thought leadership that opens doors to board positions, speaking engagements, and executive opportunities. The AI Brand Intelligence feature is particularly powerful for C-level professionals."
    },
    {
      question: "What industries and roles does this work for?",
      answer: "Our AI is trained on successful professionals across all major industries—tech, finance, healthcare, consulting, marketing, sales, education, and more. The platform adapts its recommendations based on your specific industry and role. Whether you're a software engineer, marketing manager, consultant, or executive, Career Clarified tailors its approach to your field."
    },
    {
      question: "How does the upskilling feature help my career?",
      answer: "Our Skill Radar tracks rising skills in real-time across job boards and company needs, keeping you ahead of market demands. The Learning Sprints provide focused 2-3 week challenges with tangible deliverables, while Skill Benchmarking shows exactly how you compare to market requirements. It's like having a career strategist constantly monitoring what skills will be valuable next."
    },
    {
      question: "Can I use this if I'm not actively job searching?",
      answer: "Yes! Many of our most successful users aren't actively job searching. They use Career Clarified to build authority, expand their network, and position themselves for opportunities. The Content Engine helps you establish thought leadership, while the Brand Intelligence features ensure your online presence attracts the right opportunities when you're ready."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Questions? <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">We've Got Answers</span>
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to know about transforming your career with AI
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl border border-slate-200 overflow-hidden transition-all duration-1000 hover:shadow-lg hover:border-indigo-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-slate-800 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className={`text-center mt-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Still have questions?</h3>
            <p className="text-slate-600 mb-4">Our team is here to help you succeed</p>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;