import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-background/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground font-medium transition-colors">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground font-medium transition-colors">Pricing</a>
            <a href="#success-stories" className="text-muted-foreground hover:text-foreground font-medium transition-colors">Success Stories</a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground font-medium transition-colors">FAQ</a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => navigate('/signin')}
              className="text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="btn-primary"
            >
              Start Free Trial
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border shadow-lg">
            <nav className="flex flex-col p-4 space-y-4">
              <a href="#features" className="text-muted-foreground hover:text-foreground font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>Pricing</a>
              <a href="#success-stories" className="text-muted-foreground hover:text-foreground font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>Success Stories</a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>FAQ</a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <button 
                  onClick={() => {
                    navigate('/signin');
                    setIsMenuOpen(false);
                  }}
                  className="text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg font-medium transition-colors text-left"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    navigate('/signup');
                    setIsMenuOpen(false);
                  }}
                  className="btn-primary"
                >
                  Start Free Trial
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;