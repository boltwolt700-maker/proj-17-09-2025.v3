import React from 'react';
import { Check, Sparkles, Star, Building2, Zap, Crown } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Pricing = () => {
  const [ref, isInView] = useInView();

  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with career optimization",
      icon: <Sparkles className="w-6 h-6" />,
      features: [
        "5 AI-generated posts per month",
        "Basic resume ATS check",
        "3 carousel templates",
        "Basic scheduling",
        "Community support",
        "Job search basics"
      ],
      buttonText: "Start Free",
      buttonVariant: "outline",
      badge: null
    },
    {
      name: "Professional",
      price: "$29",
      period: "per month",
      description: "For serious career builders and content creators",
      icon: <Star className="w-6 h-6" />,
      features: [
        "Unlimited AI content generation",
        "Smart Resume Studio (Master + Campaign resumes)",
        "Application Tailor for job-specific optimization",
        "50+ professional templates",
        "Advanced scheduling & analytics",
        "LinkedIn engagement insights",
        "Cover letter generator",
        "Job finder with AI matching",
        "Interview prep kit",
        "Personal brand audit",
        "Priority support"
      ],
      buttonText: "Choose Professional",
      buttonVariant: "gradient",
      popular: true,
      badge: "Most Popular"
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For teams, agencies, and advanced professionals",
      icon: <Crown className="w-6 h-6" />,
      features: [
        "Everything in Professional",
        "AI Brand Intelligence & reputation monitoring",
        "Career portfolio/microsite generator",
        "Event scout & networking assistant",
        "Upskilling dashboard with skill radar",
        "Learning sprints & certification planning",
        "Team collaboration tools",
        "White-label solutions",
        "Advanced analytics dashboard",
        "Custom integrations",
        "Dedicated account manager"
      ],
      buttonText: "Choose Enterprise",
      buttonVariant: "outline",
      badge: "Full Suite"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-indigo-50/20 to-pink-50/30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Choose Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Career Growth Plan</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From getting started to complete career transformation - we have the right plan for your goals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:border-indigo-400/50 hover:shadow-indigo-500/20 ${
                plan.popular 
                  ? 'border-indigo-400 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-400/20' 
                  : 'border-slate-200/50'
              } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Top colored section */}
              <div className={`p-6 relative ${
                plan.popular 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600' 
                  : plan.name === 'Enterprise'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600'
                  : 'bg-gradient-to-r from-slate-400 to-slate-500'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white">
                    {plan.icon}
                  </div>
                  <div className="text-white/80 text-xs font-medium">PLAN</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              </div>
                
              {/* Bottom white section */}
              <div className="p-6 bg-white">
                <div className="text-center mb-6">
                  <p className="text-slate-600 mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                    <span className="text-slate-600">/{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-600 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.buttonVariant === 'gradient'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105'
                    : 'border border-slate-300 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50'
                }`}>
                  {plan.buttonText}
                </button>

                {/* Value Indicator */}
                {plan.popular && (
                  <div className="mt-4 text-center">
                    <span className="text-sm text-indigo-600 font-medium">⚡ Best value for most professionals</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className={`text-center mt-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.8s' }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-green-700">30-Day Money-Back Guarantee</h3>
            </div>
            <p className="text-green-600">
              Not seeing results? Get a full refund, no questions asked. We're that confident in our platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;