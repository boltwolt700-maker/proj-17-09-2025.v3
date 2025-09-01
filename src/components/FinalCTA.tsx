import React from 'react';
import { ArrowRight, CheckCircle, Clock, Star, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

const FinalCTA = () => {
  const [ref, isInView] = useInView();
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-purple-100/20 to-pink-100/30"></div>
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={ref} className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Your Career Breakthrough <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Starts Today</span>
          </h2>
          
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stop leaving your career to chance. Join thousands of professionals who discovered the secret to getting hired faster AND building unstoppable authority.
          </p>

          {/* Urgency Element */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-orange-200/50 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-orange-600 mb-3">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Limited Time: Free Career Analysis</span>
            </div>
            <p className="text-slate-700">Get your personalized brand audit and ATS optimization report before our AI waitlist fills up</p>
          </div>

          {/* Dual CTA Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Get My Free Career Analysis Now
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => navigate('/signup')}
              className="border-2 border-indigo-300 text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Start Building Authority
            </button>
          </div>

          {/* Risk Reversal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center justify-center gap-2 bg-white/60 rounded-lg p-4 border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-700 font-medium">Free analysis, no credit card</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/60 rounded-lg p-4 border border-blue-200">
              <Star className="w-5 h-5 text-blue-500" />
              <span className="text-blue-700 font-medium">See results in under 5 minutes</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/60 rounded-lg p-4 border border-purple-200">
              <Shield className="w-5 h-5 text-purple-500" />
              <span className="text-purple-700 font-medium">30-day money-back guarantee</span>
            </div>
          </div>

          {/* Final Trust Signal */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop" alt="" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop" alt="" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.pexels.com/photos/3206080/pexels-photo-3206080.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop" alt="" />
              </div>
              <span className="text-green-700 font-semibold">Join 10,000+ professionals already transforming their careers</span>
            </div>
            <p className="text-green-600 text-lg">
              "The best investment I've made in my career. Period." - Sarah C., Marketing Director at Google
            </p>
          </div>

          <div className="mt-8 text-slate-500">
            <p className="text-lg">Starting at $29/month • Cancel anytime • Results guaranteed</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;