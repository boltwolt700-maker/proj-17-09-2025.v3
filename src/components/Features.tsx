import React from 'react';
import { 
  Brain, 
  Shield, 
  Zap, 
  FileText, 
  Target, 
  Users, 
  TrendingUp, 
  Calendar,
  Image,
  RefreshCw,
  MessageCircle,
  Globe,
  Award,
  BarChart3,
  Rocket
} from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Features = () => {
  const [ref, isInView] = useInView();

  const contentCreationFeatures = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Post Generator",
      description: "Generate authentic LinkedIn posts in minutes with AI that learns your voice and expertise.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: "Professional Carousel Maker",
      description: "Create stunning multi-slide carousels with professional templates and AI content generation.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Content Repurposing Engine",
      description: "Transform existing articles, videos, and podcasts into multiple LinkedIn post formats.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Thought Leadership Engine",
      description: "Build authority with AI-powered content strategy and trending topic identification.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const careerHubFeatures = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Smart Resume Studio",
      description: "AI-powered resume optimization with real-time ATS scoring and master/campaign resume management.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Application Tailor",
      description: "Create laser-focused applications tailored to specific job postings with AI analysis.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Job Finder & Tracker",
      description: "AI-powered job discovery with Kanban-style application pipeline management.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Interview Prep Kit",
      description: "AI mock interviews, question banks, and performance analytics for interview mastery.",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const upskillingFeatures = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Skill Radar",
      description: "Live market intelligence tracking rising skills and high-ROI learning opportunities.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Learning Sprints",
      description: "Focused 2-3 week learning missions with tangible deliverables and portfolio artifacts.",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certification Planning",
      description: "Strategic certification roadmap with study guides and market value analysis.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Skill Benchmarking",
      description: "Real-time comparison against market demand with weekly alignment scoring.",
      gradient: "from-violet-500 to-purple-500"
    }
  ];

  const FeatureCard = ({ feature, index, delay }: { feature: any, index: number, delay: string }) => (
    <div
      className={`group card-metallic bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-indigo-300/50 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: delay }}
    >
      {/* Top colored section */}
      <div className={`bg-gradient-to-r ${feature.gradient} p-6 relative`}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-white">
            {feature.icon}
          </div>
          <div className="text-white/80 text-xs font-medium">FEATURE</div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
          {feature.title}
        </h3>
      </div>
      
      {/* Bottom white section */}
      <div className="p-6 bg-white">
        <p className="text-slate-600 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Your Complete <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Career Growth Ecosystem</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Three integrated pillars working together to accelerate your career and build unstoppable authority
          </p>
        </div>

        {/* Content Creation Section */}
        <div className="mb-20">
          <div className={`text-center mb-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-full border border-blue-200 mb-4">
              <Brain className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-semibold">Content Creation</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Build Authority Without the Burnout</h3>
            <p className="text-slate-600">Generate authentic content that builds real authority while you focus on your actual work</p>
          </div>
          
          <div className="cards-container scroll-cards">
            {contentCreationFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="card__image">
                  <div className="card__icon">
                    {feature.icon}
                  </div>
                </div>
                <div className="card__content">
                  <span className="card__title">{feature.title}</span>
                  <p className="card__describe">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Hub Section */}
        <div className="mb-20">
          <div className={`text-center mb-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-3 bg-green-50 px-6 py-3 rounded-full border border-green-200 mb-4">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-semibold">Career Hub</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Beat The ATS Systems That Reject 75% of Resumes</h3>
            <p className="text-slate-600">AI analyzes your resume against 1,000+ ATS patterns, then rewrites it to pass the robots AND impress humans</p>
          </div>
          
          <div className="cards-container scroll-cards">
            {careerHubFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="card__image">
                  <div className="card__icon">
                    {feature.icon}
                  </div>
                </div>
                <div className="card__content">
                  <span className="card__title">{feature.title}</span>
                  <p className="card__describe">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upskilling Section */}
        <div className="mb-12">
          <div className={`text-center mb-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-3 bg-purple-50 px-6 py-3 rounded-full border border-purple-200 mb-4">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-semibold">Upskilling</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Stay Ahead of Market Demands</h3>
            <p className="text-slate-600">AI-guided skill development that keeps you competitive and future-ready</p>
          </div>
          
          <div className="cards-container scroll-cards">
            {upskillingFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="card__image">
                  <div className="card__icon">
                    {feature.icon}
                  </div>
                </div>
                <div className="card__content">
                  <span className="card__title">{feature.title}</span>
                  <p className="card__describe">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Message */}
        <div className={`text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Rocket className="w-8 h-8 text-indigo-600" />
              <h3 className="text-2xl font-bold text-slate-800">The Integrated Growth Loop</h3>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed">
              The better your role, the stronger your content becomes. The stronger your content, the better your opportunities. 
              <strong className="text-indigo-600"> Career Clarified creates this virtuous cycle automatically.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;