import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

interface UseCase {
  title: string;
  desc: string;
  tags: string[];
  image: string;
}

interface ScrollSyncedCarouselProps {
  useCases: UseCase[];
  id: string;
}

const ScrollSyncedCarousel: React.FC<ScrollSyncedCarouselProps> = ({ useCases, id }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const contentCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = scrollWrapperRef.current;
      if (!wrapper) return;
      const wrapperRect = wrapper.getBoundingClientRect();
      if (wrapperRect.bottom < 0 || wrapperRect.top > window.innerHeight) return;
      const scrollableHeight = wrapper.offsetHeight - window.innerHeight;
      const pixelsScrolled = Math.max(0, window.scrollY - wrapper.offsetTop);
      const progress = scrollableHeight > 0 ? pixelsScrolled / scrollableHeight : 0;
      let newActiveIndex = Math.floor(progress * useCases.length);
      newActiveIndex = Math.min(useCases.length - 1, newActiveIndex);
      setActiveIndex(newActiveIndex);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [useCases]);

  useEffect(() => {
    const contentPanel = contentCarouselRef.current;
    const activeItem = contentRefs.current[activeIndex];
    if (contentPanel && activeItem) {
      const panelHeight = contentPanel.clientHeight;
      const itemHeight = activeItem.clientHeight;
      const itemOffsetTop = activeItem.offsetTop;
      const targetScrollTop = itemOffsetTop - (panelHeight / 2) + (itemHeight / 2);
      contentPanel.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
    }
  }, [activeIndex]);

  return (
    <div className="scroll-wrapper" ref={scrollWrapperRef} style={{ minHeight: '250vh', position: 'relative' }}>
      <section className="sticky-container" style={{
        position: 'sticky',
        top: '10vh',
        height: '80vh',
        maxHeight: '700px',
        width: '100%',
        display: 'flex',
        alignItems: 'stretch',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '15px 15px 30px #8fa7e9, -15px -15px 30px #eaeefa',
        overflow: 'hidden'
      }}>
        <div 
          className="content-carousel" 
          ref={contentCarouselRef}
          style={{
            flex: 1,
            height: '100%',
            padding: '0 1.5rem 0 3rem',
            boxSizing: 'border-box',
            overflowY: 'scroll',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {useCases.map((useCase, i) => (
            <div 
              key={useCase.title} 
              ref={el => (contentRefs.current[i] = el)} 
              className="content-item"
              style={{
                height: '80vh',
                maxWidth: '450px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                transition: 'opacity 0.5s ease-in-out',
                opacity: activeIndex === i ? 1 : 0.3
              }}
            >
              <span className="tag" style={{
                display: 'inline-block',
                background: '#eef2ff',
                color: '#4f46e5',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600',
                padding: '0.25rem 0.75rem'
              }}>
                {useCase.tags[0]}
              </span>
              <h3 className="content-title" style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1f2937',
                marginTop: '0.75rem'
              }}>
                {useCase.title}
              </h3>
              <p className="content-desc" style={{
                fontSize: '1.125rem',
                color: '#4b5563',
                marginTop: '0.75rem',
                lineHeight: '1.75'
              }}>
                {useCase.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="image-display" style={{
          flex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem'
        }}>
          <div className="image-card" style={{
            width: '100%',
            height: '100%',
            background: 'white',
            borderRadius: '1.5rem',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {useCases.map((useCase, i) => (
              <img 
                key={useCase.image} 
                src={useCase.image} 
                alt={useCase.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: activeIndex === i ? 1 : 0
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const useCases = [
    {
      title: "AI Post Generator",
      desc: "Generate authentic LinkedIn posts in minutes with AI that learns your voice and expertise.",
      tags: ["AI"],
      image: "https://placehold.co/600x400/4f46e5/white?text=AI+Post+Generator",
    },
    {
      title: "Professional Carousel Maker",
      desc: "Create stunning multi-slide carousels with professional templates and AI content generation.",
      tags: ["Design"],
      image: "https://placehold.co/600x400/be185d/white?text=Carousel+Maker",
    },
    {
      title: "Content Repurposing Engine",
      desc: "Transform existing articles, videos, and podcasts into multiple LinkedIn post formats.",
      tags: ["Content"],
      image: "https://placehold.co/600x400/059669/white?text=Repurposing+Engine",
    },
    {
      title: "Thought Leadership Engine",
      desc: "Build authority with AI-powered content strategy and trending topic identification.",
      tags: ["Strategy"],
      image: "https://placehold.co/600x400/d97706/white?text=Leadership+Engine",
    },
  ];

  const useCases2 = [
    {
      title: "Smart Resume Studio",
      desc: "AI-powered resume optimization with real-time ATS scoring and master/campaign resume management.",
      tags: ["Resume"],
      image: "https://placehold.co/600x400/1d4ed8/white?text=Resume+Studio",
    },
    {
      title: "Application Tailor",
      desc: "Create laser-focused applications tailored to specific job postings with AI analysis.",
      tags: ["Applications"],
      image: "https://placehold.co/600x400/9333ea/white?text=Application+Tailor",
    },
    {
      title: "Job Finder & Tracker",
      desc: "AI-powered job discovery with Kanban-style application pipeline management.",
      tags: ["Jobs"],
      image: "https://placehold.co/600x400/c026d3/white?text=Job+Tracker",
    },
    {
      title: "Interview Prep Kit",
      desc: "AI mock interviews, question banks, and performance analytics for interview mastery.",
      tags: ["Interview"],
      image: "https://placehold.co/600x400/db2777/white?text=Interview+Prep",
    },
  ];

  const useCases3 = [
    {
      title: "Skill Radar",
      desc: "Live market intelligence tracking rising skills and high-ROI learning opportunities.",
      tags: ["Radar"],
      image: "https://placehold.co/600x400/7c3aed/white?text=Skill+Radar",
    },
    {
      title: "Learning Sprints",
      desc: "Focused 2-3 week learning missions with tangible deliverables and portfolio artifacts.",
      tags: ["Sprints"],
      image: "https://placehold.co/600x400/6d28d9/white?text=Learning+Sprints",
    },
    {
      title: "Certification Planning",
      desc: "Strategic certification roadmap with study guides and market value analysis.",
      tags: ["Certs"],
      image: "https://placehold.co/600x400/5b21b6/white?text=Cert+Planning",
    },
    {
      title: "Skill Benchmarking",
      desc: "Real-time comparison against market demand with weekly alignment scoring.",
      tags: ["Benchmark"],
      image: "https://placehold.co/600x400/4c1d95/white?text=Benchmarking",
    },
  ];

  return (
    <div style={{ scrollBehavior: 'smooth' }}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 rounded-full ${
          isScrolled 
            ? 'glass-effect' 
            : 'bg-white/25 backdrop-blur-sm border border-white/18'
        }`}>
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
            <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
              <a href="#benefits" className="text-lg text-slate-600 hover:text-slate-900 font-medium transition-colors">Benefits</a>
              <a href="#pricing" className="text-lg text-slate-600 hover:text-slate-900 font-medium transition-colors">Pricing</a>
              <a href="#success-stories" className="text-lg text-slate-600 hover:text-slate-900 font-medium transition-colors">Success Stories</a>
              <a href="#faq" className="text-lg text-slate-600 hover:text-slate-900 font-medium transition-colors">FAQ</a>
            </nav>
            <div className="hidden md:flex items-center space-x-2">
              <button 
                onClick={() => navigate('/signin')}
                className="bg-slate-100 text-slate-900 px-4 py-2 rounded-full font-medium transition-colors border border-slate-200 hover:bg-slate-200"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-full font-medium transition-all hover:bg-indigo-700 hover:shadow-lg"
              >
                Start Free Trial
              </button>
            </div>
            <button 
              className="md:hidden text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full mt-2 left-0 right-0 p-2">
            <div className="glass-header rounded-2xl" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
            }}>
              <nav className="flex flex-col p-4 space-y-2">
                <a href="#benefits" className="text-lg text-slate-600 hover:text-slate-900 font-medium transition-colors p-2 text-center rounded-lg">Benefits</a>
                <a href="#pricing" className="text-lg text-slate-600 hover:text-slate-900 font-medium transition-colors p-2 text-center rounded-lg">Pricing</a>
                <a href="#success-stories" className="text-lg text-slate-600 hover:text-slate-900 font-medium transition-colors p-2 text-center rounded-lg">Success Stories</a>
                <a href="#faq" className="text-lg text-slate-600 hover:text-slate-900 font-medium transition-colors p-2 text-center rounded-lg">FAQ</a>
                <div className="flex flex-col items-center space-y-4 pt-4 border-t border-slate-200">
                  <button 
                    onClick={() => navigate('/signin')}
                    className="bg-slate-100 text-slate-900 px-4 py-2 rounded-full font-medium transition-colors border border-slate-200 hover:bg-slate-200 w-full"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => navigate('/signup')}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-full font-medium transition-all hover:bg-indigo-700 hover:shadow-lg w-full"
                  >
                    Start Free Trial
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-20 overflow-hidden"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/fdd16n9cy/di.png?updatedAt=1757770843990')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Sun Animation */}
        <div className="relative mb-8">
          <div className="section-banner-sun" style={{
            height: '300px',
            width: '300px',
            position: 'relative',
            transition: 'left 0.3s linear',
            backgroundColor: '#E6E6FA',
            borderRadius: '50%',
            animation: 'shadowPulse 5s ease-in-out infinite',
            boxShadow: `
              0px 0px 40px 20px #7891D5,
              -5px 0px 10px 1px #E8F0FF inset,
              15px 2px 40px 20px #4D69B4c5 inset,
              -24px -2px 50px 25px #7891D5c2 inset,
              150px 0px 80px 35px #2B448Caa inset
            `
          }}>
            {/* Stars */}
            {[1, 2, 3, 4, 5, 6, 7].map((star) => (
              <div 
                key={star}
                className={`absolute`}
                style={{
                  left: star === 1 ? '-20px' : 
                        star === 2 ? '-40px' : 
                        star === 3 ? '350px' : 
                        star === 4 ? '200px' : 
                        star === 5 ? '50px' : 
                        star === 6 ? '250px' : '290px',
                  top: star === 1 ? '0px' : 
                       star === 2 ? '30px' : 
                       star === 3 ? '90px' : 
                       star === 4 ? '290px' : 
                       star === 5 ? '270px' : 
                       star === 6 ? '-50px' : '60px',
                  animation: `twinkling ${star === 1 ? '3s' : star === 2 ? '2s' : star === 3 ? '4s' : star === 4 ? '3s' : star === 5 ? '1.5s' : star === 6 ? '4s' : '2s'} infinite`
                }}
              >
                <div className="curved-corner-star flex relative">
                  <div className="w-1 h-1.5 overflow-hidden relative">
                    <div className="absolute bottom-0 right-0 w-full h-full rounded-full" style={{
                      boxShadow: '5px 5px 0 0 #E8F0FF'
                    }}></div>
                  </div>
                  <div className="w-1 h-1.5 overflow-hidden relative">
                    <div className="absolute bottom-0 left-0 w-full h-full rounded-full" style={{
                      boxShadow: '-5px 5px 0 0 #E8F0FF'
                    }}></div>
                  </div>
                </div>
                <div className="curved-corner-star flex relative">
                  <div className="w-1 h-1.5 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-full h-full rounded-full" style={{
                      boxShadow: '5px -5px 0 0 #E8F0FF'
                    }}></div>
                  </div>
                  <div className="w-1 h-1.5 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full rounded-full" style={{
                      boxShadow: '-5px -5px 0 0 #E8F0FF'
                    }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Shadow Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Trusted By Section */}
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Trusted by the world's most innovative teams
          </h2>
          <div className="mt-10 w-full overflow-hidden" style={{
            maskImage: 'linear-gradient(to right, transparent 0, black 128px, black calc(100% - 128px), transparent 100%)'
          }}>
            <div className="flex">
              <div className="flex w-max items-center space-x-16 hover:animation-play-state-paused" style={{
                animation: 'scroll 40s linear infinite'
              }}>
                {/* Company Logos */}
                <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Google</div>
                <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Microsoft</div>
                <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Amazon</div>
                <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Meta</div>
                <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Tesla</div>
                <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Apple</div>
              </div>
              <div className="flex w-max items-center space-x-16 hover:animation-play-state-paused" style={{
                animation: 'scroll 40s linear infinite'
              }} aria-hidden="true">
                <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Google</div>
                <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Microsoft</div>
                <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Amazon</div>
                <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Meta</div>
                <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Tesla</div>
                <div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">Apple</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <div className="pt-16">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">Challenges Employees Face</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              If You're Qualified But Still Struggling, You're Not Alone.
            </h1>
            <h2 className="mt-6 text-lg md:text-xl text-gray-600">
              75% of qualified professionals are stuck in the same broken system. Here's why traditional approaches fail.
            </h2>
          </div>
        </div>

        {/* Challenge Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Career Hub Challenge */}
          <section id="career-hub" className="scroll-section">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-3xl overflow-hidden" style={{
              boxShadow: '15px 15px 30px #8fa7e9, -15px -15px 30px #eaeefa'
            }}>
              <div className="p-8 md:p-12 order-2 md:order-1">
                <div className="flex items-center text-2xl font-bold text-gray-800 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mr-4 text-red-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  The ATS Black Hole
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="text-red-600 mr-3 mt-1">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414l-3-3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-800">75% of resumes never reach human eyes</h3>
                      <p className="text-red-700 text-sm mt-1">ATS systems reject qualified candidates due to formatting issues, missing keywords, or poor optimization</p>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="h-6 w-6 flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-3 flex-shrink-0">•</span>
                    <span>You spend hours tailoring each application, only to hear nothing back</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-3 flex-shrink-0">•</span>
                    <span>Less qualified candidates get interviews while you're stuck in the system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-3 flex-shrink-0">•</span>
                    <span>The whole process feels like throwing darts in the dark</span>
                  </li>
                </ul>
              </div>
              <div className="h-64 md:h-full order-1 md:order-2 flex items-center justify-center p-8">
                <img 
                  src="https://ik.imagekit.io/fdd16n9cy/-a-sleek--modern-laptop-sits-on-a-dark-desk--the-s.png?updatedAt=1757888837988" 
                  alt="ATS Black Hole Visual" 
                  className="w-full h-full object-cover rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </section>

          {/* Brand Building Challenge */}
          <section id="brand-building" className="scroll-section">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-3xl overflow-hidden" style={{
              boxShadow: '15px 15px 30px #8fa7e9, -15px -15px 30px #eaeefa'
            }}>
              <div className="p-8 md:p-12 order-2 md:order-1">
                <div className="flex items-center text-2xl font-bold text-gray-800 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4 text-blue-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  The Authority Gap
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="text-blue-600 mr-3 mt-1">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800">Your expertise stays hidden</h3>
                      <p className="text-blue-700 text-sm mt-1">While louder voices get the opportunities, your knowledge and skills remain invisible to decision-makers</p>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">•</span>
                    <span>You know you should be posting on LinkedIn, but staring at that blank text box gives you instant writer's block</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">•</span>
                    <span>You see others building authority while you struggle to find time for consistent content creation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">•</span>
                    <span>Opportunities go to those who are visible, not necessarily those who are most qualified</span>
                  </li>
                </ul>
              </div>
              <div className="h-64 md:h-full order-1 md:order-2">
                <img 
                  src="https://ik.imagekit.io/fdd16n9cy/_Isometric%20illustration%20of%20a%20LinkedIn%20feed%20with%20blue%20tones,%20cards,%20and%20interaction%20buttons%20(thumbs%20up,%20comment%20icons),%20but%20avoid%20using%20the%20exact%20logo.%20Minimalist%20blue%20and%20white%20color%20palette,%20clean%20lines,%20mo.jpg?updatedAt=1757931363825" 
                  alt="Brand Building Visual" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* Upskilling Challenge */}
          <section id="upskilling" className="scroll-section">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-3xl overflow-hidden" style={{
              boxShadow: '15px 15px 30px #8fa7e9, -15px -15px 30px #eaeefa'
            }}>
              <div className="p-8 md:p-12 order-2 md:order-1">
                <div className="flex items-center text-2xl font-bold text-gray-800 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-4 text-green-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0112 3c1.398 0 2.743.57 3.714 1.543C18.5 6.5 19 9 19 11c2 1 2.657 1.657 2.657 1.657a8 8 0 01-4.001 6.001z" />
                    </svg>
                  </div>
                  Staying Future-Proof
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="text-green-600 mr-3 mt-1">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 011.414-1.414L8 12.586V5a1 1 0 012 0v7.586l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">The Upskilling Dilemma</h3>
                      <p className="text-green-700 text-sm mt-1">It's not about finding time to learn; it's about the fear of learning the wrong thing.</p>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">•</span>
                    <span>Struggling to decide which career path or skill set to pursue for long-term growth.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">•</span>
                    <span>Lack of clear insights into how industries, technologies, and job demands will shift in the future.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">•</span>
                    <span>Mental struggles of upskilling—less about "I don't have time" and more about "Am I even going in the right direction?</span>
                  </li>
                </ul>
              </div>
              <div className="h-64 md:h-full order-1 md:order-2 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Upskilling Visual</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Career Growth Ecosystem Title */}
      <div className="text-center pt-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Your Complete Career Growth Ecosystem
        </h1>
        <h2 className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Three integrated pillars working together to accelerate your career and build unstoppable authority
        </h2>
      </div>

      {/* Content Creation Section */}
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-4 py-2 mb-6">
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Content Creation
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Build Authority Without the Burnout</h3>
        <p className="text-gray-600">
          Generate authentic content that builds real authority while you focus on your actual work
        </p>
      </div>

      {/* React Carousel Section 1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSyncedCarousel useCases={useCases} id="carousel1" />
      </div>

      {/* Career Hub Section Title */}
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="inline-flex items-center rounded-full bg-indigo-100 text-indigo-800 px-4 py-2 mb-6">
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Career Hub
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Land Your Dream Job Faster</h3>
        <p className="text-gray-600">
          Optimize your resume, tailor applications, and ace interviews with powerful AI tools.
        </p>
      </div>

      {/* React Carousel Section 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSyncedCarousel useCases={useCases2} id="carousel2" />
      </div>

      {/* Upskilling Section Title */}
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="inline-flex items-center rounded-full bg-purple-100 text-purple-800 px-4 py-2 mb-6">
          <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3.5 2.5a.5.5 0 00-1 0V3a2 2 0 00-2 2v9.5a.5.5 0 001 0V5a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1v-2.5a.5.5 0 00-1 0V15a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H3.5v-.5z" />
            <path d="M14.354 1.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L7 8.293l6.646-6.647a.5.5 0 01.708 0z" />
          </svg>
          Upskilling
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Stay Ahead of Market Demands</h3>
        <p className="text-gray-600">
          AI-guided skill development that keeps you competitive and future-ready
        </p>
      </div>

      {/* React Carousel Section 3 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSyncedCarousel useCases={useCases3} id="carousel3" />
      </div>

      {/* Stats Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12" style={{
            boxShadow: '15px 15px 30px #8fa7e9, -15px -15px 30px #eaeefa'
          }}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-base font-semibold leading-7 text-indigo-600">Results</p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Proven Career Transformation</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">Join thousands of professionals who've accelerated their careers with our AI-powered platform. Real results from real users.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Stat 1 */}
              <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
                <p className="text-7xl font-bold text-indigo-600">87%</p>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">Get more interview callbacks</h3>
                <p className="mt-2 text-gray-600">vs. traditional resume approaches</p>
              </div>
              {/* Stat 2 */}
              <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
                <p className="text-7xl font-bold text-indigo-600">3x</p>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">LinkedIn engagement increase</h3>
                <p className="mt-2 text-gray-600">within first 30 days</p>
              </div>
              {/* Stat 3 */}
              <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
                <p className="text-7xl font-bold text-indigo-600">$2.3M+</p>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">In salary increases secured</h3>
                <p className="mt-2 text-gray-600">by our users this year</p>
              </div>
            </div>
            <div className="mt-16 flex justify-center items-center gap-x-6">
              <button 
                onClick={() => navigate('/signup')}
                className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Start Free Trial
              </button>
              <a href="#success-stories" className="text-base font-semibold leading-6 text-gray-900 group">
                View Success Stories <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12" style={{
            boxShadow: '15px 15px 30px #8fa7e9, -15px -15px 30px #eaeefa'
          }}>
            <div className="max-w-3xl">
              <p className="text-base font-semibold leading-7 text-indigo-600">Benefits</p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Automated job application process</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">Transform your career journey with an intelligent platform that combines cutting-edge AI technology and comprehensive professional development tools.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src="https://placehold.co/395x240/ddd6fe/3730a3?text=Brand+Building" alt="Professional brand building" />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">Build your professional brand</h3>
                    <p className="mt-3 text-base text-gray-600">Create authentic LinkedIn content that builds real authority while you focus on your actual work. Our AI learns your voice and expertise.</p>
                  </div>
                </div>
              </div>
              {/* Benefit 2 */}
              <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src="https://placehold.co/395x240/c7d2fe/3730a3?text=Skill+Development" alt="Skill development" />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">Future-ready skill development</h3>
                    <p className="mt-3 text-base text-gray-600">Stay competitive with AI-guided skill development and strategic learning paths that align with market demands.</p>
                  </div>
                </div>
              </div>
              {/* Benefit 3 */}
              <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src="https://placehold.co/395x240/a5b4fc/3730a3?text=Career+Growth" alt="Career growth acceleration" />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">Accelerate career growth</h3>
                    <p className="mt-3 text-base text-gray-600">Beat ATS systems and land interviews with AI-optimized resumes and strategic job applications.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 flex items-center gap-x-6">
              <button 
                onClick={() => navigate('/signup')}
                className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </button>
              <a href="#success-stories" className="text-base font-semibold leading-6 text-gray-900 group">
                Learn more <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories Section */}
      <div id="success-stories" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12" style={{
            boxShadow: '15px 15px 30px #8fa7e9, -15px -15px 30px #eaeefa'
          }}>
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Success stories</h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">Real professionals, real transformations</p>
            </div>
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Story 1 */}
              <div className="p-8 border border-gray-200 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="h-8">
                    <div className="text-2xl font-bold text-indigo-600">TechCorp</div>
                  </div>
                  <blockquote className="mt-8 text-xl font-medium text-gray-900">
                    <p>"Career Clarified helped me land my dream job in tech within weeks"</p>
                  </blockquote>
                </div>
                <div className="mt-6">
                  <div className="flex items-center gap-x-4">
                    <img className="h-14 w-14 rounded-full" src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="Sarah Johnson" />
                    <div>
                      <div className="font-semibold text-gray-900">Sarah Johnson</div>
                      <div className="text-gray-600">Senior product manager</div>
                    </div>
                  </div>
                  <a href="#" className="mt-8 text-indigo-600 font-semibold flex items-center group">
                    Read case study
                    <span className="transition-transform group-hover:translate-x-1 ml-2" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              {/* Story 2 */}
              <div className="p-8 border border-gray-200 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="h-8">
                    <div className="text-2xl font-bold text-indigo-600">Microsoft</div>
                  </div>
                  <blockquote className="mt-8 text-xl font-medium text-gray-900">
                    <p>"The AI resume builder is a game-changer for job seekers"</p>
                  </blockquote>
                </div>
                <div className="mt-6">
                  <div className="flex items-center gap-x-4">
                    <img className="h-14 w-14 rounded-full" src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="Michael Chen" />
                    <div>
                      <div className="font-semibold text-gray-900">Michael Chen</div>
                      <div className="text-gray-600">Software engineer</div>
                    </div>
                  </div>
                  <a href="#" className="mt-8 text-indigo-600 font-semibold flex items-center group">
                    Read case study
                    <span className="transition-transform group-hover:translate-x-1 ml-2" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:rounded-3xl sm:px-24 xl:py-32 xl:px-32" style={{
            boxShadow: '15px 15px 30px #8fa7e9, -15px -15px 30px #eaeefa'
          }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side: Text and Form */}
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Ready to transform your career?</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">Start your professional growth journey with our comprehensive AI-powered career development platform.</p>
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full sm:flex-auto rounded-md border-0 bg-gray-100 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button 
                    onClick={() => navigate('/signup')}
                    className="w-full sm:w-auto flex-none rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign Up
                  </button>
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  By clicking Sign Up you're confirming that you agree with our{' '}
                  <a href="#" className="underline hover:text-gray-900">Terms and Conditions</a>.
                </p>
              </div>
              {/* Right Side: Image */}
              <div className="hidden lg:block">
                <img 
                  className="w-full h-auto rounded-xl object-cover" 
                  src="https://ik.imagekit.io/fdd16n9cy/di.png?updatedAt=1757770843990" 
                  alt="Career transformation visual"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer 
        className="relative bg-cover bg-center py-8 sm:py-12 md:py-20 px-4"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/fdd16n9cy/di.png?updatedAt=1757770843990')"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/40 z-0"></div>

        <div className="relative container mx-auto">
          <div className="max-w-7xl mx-auto p-8 sm:p-12 md:p-20 rounded-2xl" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
          }}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 md:mb-20">
              <div className="max-w-3xl mb-8 md:mb-0">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-indigo-600">
                  Empower Your Career Journey Today
                </h2>
                <p className="text-base sm:text-lg text-slate-600">
                  Join thousands transforming their careers with our innovative AI-driven platform.
                </p>
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={() => navigate('/signup')}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 shadow-sm"
                >
                  Subscribe
                </button>
                <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-50 transition-colors duration-300">
                  Contact
                </button>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-violet-200 mb-12" />

            {/* Footer Links Section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
              {/* Resources */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-indigo-600">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Blog Posts</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">FAQs</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Help Center</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Privacy Policy</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Terms of Use</a></li>
                </ul>
              </div>
              {/* Company */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-indigo-600">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">About Us</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Careers</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Press Releases</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Contact Us</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Support</a></li>
                </ul>
              </div>
              {/* Connect */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-indigo-600">Connect</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">LinkedIn</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Twitter</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Facebook</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Instagram</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">YouTube</a></li>
                </ul>
              </div>
              {/* Community */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-indigo-600">Community</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">User Forum</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Feedback</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Events</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Webinars</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Workshops</a></li>
                </ul>
              </div>
              {/* Newsletters */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-indigo-600">Newsletters</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Join Our Community</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Stay Updated</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Get Involved</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Share Your Story</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Explore Opportunities</a></li>
                </ul>
              </div>
              {/* Legal */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-indigo-600">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Cookie Policy</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Accessibility</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">User Agreement</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Sitemap</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-indigo-600">Contact</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="mt-16 space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                  <Logo />
                </div>

                {/* Overlapping Avatars */}
                <div className="flex -space-x-4">
                  <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="User 1" />
                  <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="User 2" />
                  <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.pexels.com/photos/3206080/pexels-photo-3206080.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="User 3" />
                  <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="User 4" />
                  <div className="flex items-center justify-center h-12 w-12 rounded-full ring-2 ring-white bg-gray-200 text-gray-600 font-semibold">+99</div>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-violet-200" />

              <div className="flex flex-col-reverse sm:flex-row justify-between items-center space-y-4 space-y-reverse sm:space-y-0">
                <p className="text-sm text-slate-500">© 2025 Career Clarified. All rights reserved.</p>
                <div className="flex space-x-4">
                  {/* Social Icons */}
                  <a href="#" className="text-slate-500 hover:text-indigo-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-slate-500 hover:text-indigo-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-slate-500 hover:text-indigo-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm-1.163 1.943h.001c-2.296 0-2.586.01-3.486.05-1.178.05-1.84.21-2.494.45-1.025.38-1.88.94-2.73 1.78a6.8 6.8 0 00-1.78 2.73c-.24 1.15-.4 1.81-.45 2.49-.04 1.02-.05 1.28-.05 3.48s.01 2.46.05 3.48c.05 1.18.21 1.84.45 2.49.38 1.02.94 1.88 1.78 2.73a6.8 6.8 0 002.73 1.78c1.15.24 1.81.4 2.49.45 1.02.04 1.28.05 3.48.05s2.46-.01 3.48-.05c1.18-.05 1.84-.21 2.49-.45.99-.38 1.84-.94 2.73-1.78.79-.85 1.35-1.7 1.78-2.73.24-1.15.4-1.81.45-2.49.04-1.02.05-1.28.05-3.48s-.01-2.46-.05-3.48c-.05-1.18-.21-1.84-.45-2.49-.38-.99-.94-1.84-1.78-2.73-.85-.79-1.7-1.35-2.73-1.78-1.15-.24-1.81-.4-2.49-.45-1.02-.04-1.28-.05-3.48-.05zm-4.4 2.61a5.4 5.4 0 1110.8 0 5.4 5.4 0 01-10.8 0zM12 15.11a3.11 3.11 0 100-6.22 3.11 3.11 0 000 6.22zm4.3-8.11a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-slate-500 hover:text-indigo-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.701V8.115l6.5 4.333-6.5 4.437z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        @keyframes twinkling {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes shadowPulse {
          0%, 100% {
            box-shadow:
              0px 0px 40px 20px #7891D5,
              -5px 0px 10px 1px #E8F0FF inset,
              15px 2px 40px 20px #4D69B4c5 inset,
              -24px -2px 50px 25px #7891D5c2 inset,
              150px 0px 80px 35px #2B448Caa inset;
          }
          50% {
            box-shadow:
              0px 0px 60px 30px #AEBFE3,
              -5px 0px 20px 5px #E8F0FF inset,
              15px 2px 60px 30px #4D69B4c5 inset,
              -24px -2px 70px 35px #7891D5c2 inset,
              150px 0px 100px 45px #2B448Caa inset;
          }
        }

        .glass-header {
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }

        .glass-effect {
          background-color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          border: none;
        }

        .scroll-section {
          scroll-margin-top: 120px;
        }

        .content-carousel::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 1024px) {
          .sticky-container {
            flex-direction: column !important;
            height: 90vh !important;
            top: 5vh !important;
          }
          .content-carousel {
            padding: 2rem !important;
            flex: 0 0 50% !important;
          }
          .image-display {
            padding: 0 2rem 2rem 2rem !important;
            flex: 1 !important;
          }
        }

        @media (max-width: 640px) {
          .content-carousel {
            padding: 1.5rem !important;
          }
          .image-display {
            padding: 0 1.5rem 1.5rem 1.5rem !important;
          }
          .content-title {
            font-size: 1.5rem !important;
          }
          .content-desc {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;