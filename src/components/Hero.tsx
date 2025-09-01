import React from 'react';
import { ArrowRight, Play, Users, CheckCircle, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 pb-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-20 w-12 h-12 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200/50 shadow-lg mb-8">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-slate-700">Trusted by 10,000+ professionals at Fortune 500 companies</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
            Stop Playing Career Roulette - <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Get The Job AND Build The Authority
            </span> You Deserve
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            The only AI-powered career platform that treats your job search and personal brand as one powerful system. 
            No more ATS black holes. No more content creation burnout. Just results.
          </p>

          {/* Value Props */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">87% get more interviews</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">3x LinkedIn engagement</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full border border-purple-200">
              <Star className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-medium">$2.3M+ in salary increases</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <button 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Start Your Career Transformation
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors group">
              <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white transition-colors shadow-lg">
                <Play className="w-5 h-5" />
              </div>
              <span className="font-medium">Watch 2-Min Demo</span>
            </button>
          </div>

          {/* Social Proof */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-center gap-2 text-slate-600 mb-8">
              <Users className="w-5 h-5 text-indigo-500" />
              <span className="font-medium">Join professionals who landed roles at:</span>
            </div>
            
            {/* Company Logos */}
            <div className="flex items-center justify-center gap-8 opacity-70">
              <div className="bg-white/80 px-6 py-3 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Google</div>
              <div className="bg-white/80 px-6 py-3 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Microsoft</div>
              <div className="bg-white/80 px-6 py-3 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Amazon</div>
              <div className="bg-white/80 px-6 py-3 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Meta</div>
              <div className="bg-white/80 px-6 py-3 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Tesla</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;