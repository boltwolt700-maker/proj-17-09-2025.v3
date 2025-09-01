import React from 'react';
import { Lightbulb, FileCheck, BarChart3, Target, Rocket, Users, Brain, Shield, Zap } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Solution = () => {
  const [ref, isInView] = useInView();

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Meet Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI-Powered Career Growth Engine</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            The first platform that understands a simple truth: your next job search and your personal brand aren't separate projects—they're part of one career growth system.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Content Creation */}
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '0.2s' }}>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 h-full">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Content Creation</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Generate authentic LinkedIn content in minutes, not hours. Build authority without the burnout.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600 text-sm">AI Post Generator</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600 text-sm">Professional Carousel Maker</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600 text-sm">Content Repurposing Engine</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600 text-sm">Thought Leadership Engine</span>
                </div>
              </div>
            </div>
          </div>

          {/* Career Hub */}
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 h-full">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Career Hub</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Beat ATS systems and land interviews with AI-optimized resumes and strategic job applications.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600 text-sm">Smart Resume Studio</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600 text-sm">Application Tailor</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600 text-sm">Job Finder & Tracker</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600 text-sm">Interview Prep Kit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upskilling */}
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '0.6s' }}>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 h-full">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Upskilling</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Stay ahead of market demands with AI-guided skill development and strategic learning paths.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-600 text-sm">Skill Radar & Market Intelligence</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-600 text-sm">Personalized Learning Paths</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-600 text-sm">Hands-on Learning Sprints</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-600 text-sm">Certification Planning</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Integration */}
        <div className={`text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Rocket className="w-10 h-10 text-green-600" />
              <h3 className="text-3xl font-bold text-green-800">The Career Clarified Difference</h3>
            </div>
            <p className="text-lg text-green-700 leading-relaxed mb-6">
              Our platform combines battle-tested resume optimization with authentic LinkedIn authority building. 
              The same AI that gets your resume past the robots also helps you create content that positions you as the expert you already are.
            </p>
            <div className="bg-white/60 rounded-lg p-6 border border-green-300">
              <p className="text-green-800 font-bold text-xl">
                The Result? You don't just land your next role—you build the reputation that makes future opportunities come to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;