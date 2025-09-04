import React from 'react';
import { Star, BarChart3, UserCheck, DollarSign, TrendingUp, Award } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const SocialProof = () => {
  const [ref, isInView] = useInView();

  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Marketing Director",
      company: "TechFlow",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "I was stuck in the same role for 3 years. Within 6 weeks of using Career Clarified, I had interviews at 3 companies and landed a 40% salary increase. The resume optimization was like having a secret weapon.",
      rating: 5,
      result: "40% salary increase",
      category: "Career Advancement"
    },
    {
      name: "Marcus Rodriguez",
      title: "Business Consultant",
      company: "Independent",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "My LinkedIn posts went from 50 likes to 2,000+ views consistently. More importantly, I've generated $120K in new business from connections made through my content. This platform changed everything.",
      rating: 5,
      result: "$120K new business",
      category: "Authority Building"
    },
    {
      name: "Jennifer Walsh",
      title: "Software Engineer",
      company: "Microsoft",
      image: "https://images.pexels.com/photos/3206080/pexels-photo-3206080.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "Finally broke through the ATS nightmare. Got callbacks from Google, Microsoft, and Amazon using their optimized resume. The best part? I barely had to think about it - the AI did the heavy lifting.",
      rating: 5,
      result: "3 FAANG interviews",
      category: "ATS Optimization"
    },
    {
      name: "David Kim",
      title: "Product Manager",
      company: "Stripe",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "The upskilling features helped me identify exactly which skills were trending in my field. I focused my learning, got certified, and landed a PM role at Stripe within 4 months.",
      rating: 5,
      result: "Dream job at Stripe",
      category: "Skill Development"
    },
    {
      name: "Lisa Thompson",
      title: "Data Scientist",
      company: "Netflix",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "The AI Brand Intelligence feature showed me exactly where my online presence was weak. After following their recommendations, my profile views increased 300% and I started getting recruiter messages weekly.",
      rating: 5,
      result: "300% profile view increase",
      category: "Brand Intelligence"
    },
    {
      name: "Robert Chen",
      title: "Engineering Manager",
      company: "Uber",
      image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "The integrated approach is genius. My resume got me past ATS systems, my LinkedIn content built my reputation, and the networking assistant connected me with the right people. Complete career transformation.",
      rating: 5,
      result: "Engineering Manager at Uber",
      category: "Complete Transformation"
    }
  ];

  const stats = [
    {
      icon: UserCheck,
      number: "87%",
      label: "Get more interview callbacks",
      color: "text-blue-600",
      description: "vs. traditional resume approaches"
    },
    {
      icon: TrendingUp,
      number: "3x",
      label: "Average LinkedIn engagement increase",
      color: "text-green-600",
      description: "within first 30 days"
    },
    {
      icon: UserCheck,
      number: "10,000+",
      label: "Professionals transformed",
      color: "text-purple-600",
      description: "across all industries"
    },
    {
      icon: DollarSign,
      number: "$2.3M+",
      label: "In salary increases secured",
      color: "text-indigo-600",
      description: "by our users this year"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Career Advancement': return 'bg-blue-500/20 text-blue-400';
      case 'Authority Building': return 'bg-green-500/20 text-green-400';
      case 'ATS Optimization': return 'bg-purple-500/20 text-purple-400';
      case 'Skill Development': return 'bg-orange-500/20 text-orange-400';
      case 'Brand Intelligence': return 'bg-pink-500/20 text-pink-400';
      case 'Complete Transformation': return 'bg-indigo-500/20 text-indigo-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <section id="success-stories" className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Real Results From <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Real Professionals</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join thousands of professionals who discovered the secret to getting hired faster AND building unstoppable authority
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 text-center">
                  <Icon className={`w-8 h-8 ${stat.color} mb-4 mx-auto`} />
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                  <div className="text-slate-600 font-medium mb-1">{stat.label}</div>
                  <div className="text-slate-400 text-xs">{stat.description}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Top colored section */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-white fill-current" />
                    ))}
                  </div>
                  <div className="text-white/80 text-xs font-medium">{testimonial.category.toUpperCase()}</div>
                </div>
              </div>

              {/* Bottom white section */}
              <div className="p-6 bg-white">
                {/* Quote */}
                <p className="text-slate-600 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>

                {/* Result Badge */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 mb-6 border border-green-100">
                  <div className="text-green-700 font-semibold text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Result: {testimonial.result}
                  </div>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-slate-800 font-semibold">{testimonial.name}</h4>
                    <p className="text-slate-500 text-sm">{testimonial.title}</p>
                    <p className="text-slate-400 text-xs">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Logos */}
        <div className={`text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.8s' }}>
          <p className="text-slate-500 mb-8 font-medium">Trusted by professionals at leading companies worldwide</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Google</div>
            <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Microsoft</div>
            <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Amazon</div>
            <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Meta</div>
            <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Tesla</div>
            <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Apple</div>
            <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Netflix</div>
            <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Uber</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;