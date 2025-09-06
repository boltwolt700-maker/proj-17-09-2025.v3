import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { ArrowRight, Play, Users, CheckCircle, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const Hero = () => {
  const navigate = useNavigate();
  const [splineError, setSplineError] = useState(true);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [SplineComponent, setSplineComponent] = useState<any>(null);

  useEffect(() => {
    // Dynamically import Spline to handle loading errors gracefully
    const loadSpline = async () => {
      try {
        const { default: Spline } = await import('@splinetool/react-spline');
        setSplineComponent(() => Spline);
      } catch (error) {
        console.warn('Failed to load Spline component:', error);
        setSplineError(true);
      }
    };

    loadSpline();
  }, []);

  const onSplineLoad = useCallback(() => {
    setSplineLoaded(true);
  }, []);

  const onSplineError = useCallback((error: any) => {
    console.warn('Spline loading error:', error);
    setSplineError(true);
  }, []);

  const handleSplineError = useCallback(() => {
    setSplineError(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 pb-20 overflow-hidden">
      {/* Spline 3D Background */}
      {!splineError && SplineComponent && (
        <ErrorBoundary onCatch={handleSplineError}>
          <div className="absolute inset-0 z-0">
            <div style={{ width: '100%', height: '100%' }}>
              <SplineComponent
                scene="https://my.spline.design/aiassistanthoverandclickinteraction-SpTH6FiO0zIigjJdHqcNf8ZR/"
                onLoad={onSplineLoad}
                onError={handleSplineError}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'transparent'
                }}
              />
            </div>
          </div>
        </ErrorBoundary>
      )}

      {/* Fallback Background (if Spline fails to load) */}
      {(splineError || !SplineComponent) && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-accent via-background to-secondary">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_70%)]" style={{ opacity: 0.15 }}></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-40 right-32 w-24 h-24 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-40 w-20 h-20 bg-chart-2/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      )}
      
      {/* Gradient Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/20 z-10"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_50%)] z-20" style={{ opacity: 0.1 }}></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary rounded-full opacity-20 animate-pulse z-30"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-accent rounded-full opacity-20 animate-pulse z-30" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-20 w-12 h-12 bg-chart-2 rounded-full opacity-20 animate-pulse z-30" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-40">
        <div className="animate-fade-in-up">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-card/95 backdrop-blur-md px-4 py-2 rounded-full border border-border shadow-lg mb-8">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-card-foreground">Trusted by 10,000+ professionals at Fortune 500 companies</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight drop-shadow-lg">
            Stop Playing Career Roulette - <br />
            <span className="gradient-text">
              Get The Job AND Build The Authority
            </span> You Deserve
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
            The only AI-powered career platform that treats your job search and personal brand as one powerful system. 
            No more ATS black holes. No more content creation burnout. Just results.
          </p>

          {/* Value Props */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-card/95 backdrop-blur-md px-4 py-2 rounded-full border border-border shadow-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">87% get more interviews</span>
            </div>
            <div className="flex items-center gap-2 bg-card/95 backdrop-blur-md px-4 py-2 rounded-full border border-border shadow-lg">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">3x LinkedIn engagement</span>
            </div>
            <div className="flex items-center gap-2 bg-card/95 backdrop-blur-md px-4 py-2 rounded-full border border-border shadow-lg">
              <Star className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-medium">$2.3M+ in salary increases</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <button 
              onClick={() => navigate('/signup')}
              className="btn-primary px-8 py-4 text-lg flex items-center gap-2 shadow-xl backdrop-blur-md"
            >
              Start Your Career Transformation
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <div className="w-12 h-12 bg-card/95 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-card transition-colors shadow-lg">
                <Play className="w-5 h-5" />
              </div>
              <span className="font-medium">Watch 2-Min Demo</span>
            </button>
          </div>

          {/* Social Proof */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-medium">Join professionals who landed roles at:</span>
            </div>
            
            {/* Company Logos */}
            <div className="flex items-center justify-center gap-8 opacity-70">
              <div className="bg-card/95 backdrop-blur-md px-6 py-3 rounded-lg shadow-lg border border-border font-bold text-card-foreground">Google</div>
              <div className="bg-card/95 backdrop-blur-md px-6 py-3 rounded-lg shadow-lg border border-border font-bold text-card-foreground">Microsoft</div>
              <div className="bg-card/95 backdrop-blur-md px-6 py-3 rounded-lg shadow-lg border border-border font-bold text-card-foreground">Amazon</div>
              <div className="bg-card/95 backdrop-blur-md px-6 py-3 rounded-lg shadow-lg border border-border font-bold text-card-foreground">Meta</div>
              <div className="bg-card/95 backdrop-blur-md px-6 py-3 rounded-lg shadow-lg border border-border font-bold text-card-foreground">Tesla</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;