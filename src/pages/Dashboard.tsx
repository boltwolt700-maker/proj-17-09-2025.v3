import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  LogOut,
  Settings,
  Sun,
  Moon,
  PenTool, 
  Image, 
  RefreshCw, 
  FileText, 
  Target, 
  Calendar, 
  TrendingUp, 
  MessageCircle, 
  Users,
  FolderOpen,
  Menu,
  X,
  Home, // For Dashboard Home
  GraduationCap, // For Upskilling category
  Radar, // For Skill Radar
  BookOpen, // For Learning Path
  Zap, // For Sprints
  Award, // For Certifications
  BarChart2, // For Skill Benchmarking

  Brain,
  Globe,
  Shield
} from 'lucide-react';
import { signOut } from '../lib/supabase';
import { useTheme } from '../hooks/useTheme';
import Logo from '../components/Logo';
import SettingsModal from '../components/SettingsModal';

// Import feature components
import PostGenerator from '../components/features/PostGenerator';
import CarouselMaker from '../components/features/CarouselMaker';
import RepurposeContent from '../components/features/RepurposeContent';
import SmartResumeStudio from '../components/features/SmartResumeStudio';
import ApplicationTailor from '../components/features/ApplicationTailor';
import CoverLetterGenerator from '../components/features/CoverLetterGenerator';
import ResumeManager from '../components/features/ResumeManager';
import CalendarPostQueue from '../components/features/CalendarPostQueue';
import Analytics from '../components/features/Analytics';
import CommentHelper from '../components/features/CommentHelper';
import TeamManagement from '../components/features/TeamManagement';
import DashboardHome from '../components/features/DashboardHome';
import BrandAudit from '../components/features/BrandAudit';
import JobFinder from '../components/features/JobFinder';
import JobTracker from '../components/features/JobTracker';
import InterviewPrepKit from '../components/features/InterviewPrepKit';
import ContentEngine from '../components/features/ContentEngine';
import CareerPortfolio from '../components/features/CareerPortfolio';
import AIMentor from '../components/features/AIMentor';
import CareerEventScout from '../components/features/CareerEventScout';
import AIBrandIntelligence from '../components/features/AIBrandIntelligence';
import SkillRadar from '../components/features/SkillRadar';
import LearningPath from '../components/features/LearningPath';
import Sprints from '../components/features/Sprints';
import Certifications from '../components/features/Certifications';
import SkillBenchmarking from '../components/features/SkillBenchmarking';
import UpskillingDashboard from '../components/features/UpskillingDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    {
      category: 'Overview',
      items: [
        {
          name: 'Dashboard',
          path: '/dashboard',
          icon: Home,
        }
      ]
    },
    {
      category: 'Career Hub',
      items: [
        {
          name: 'Smart Resume Studio',
          path: '/dashboard/smart-resume-studio',
          icon: FileText,
          description: 'AI-powered resume creation and optimization'
        },
        {
          name: 'Application Tailor',
          path: '/dashboard/application-tailor',
          icon: Target,
          description: 'Tailor resumes for specific job applications'
        },
        {
          name: 'Cover Letter Generator',
          path: '/dashboard/cover-letter-generator',
          icon: FileText,
          description: 'AI-powered personalized cover letters'
        },
        {
          name: 'Job Finder',
          path: '/dashboard/job-finder',
          icon: Target,
          description: 'AI-powered job search and scoring'
        },
        {
          name: 'Job Tracker',
          path: '/dashboard/job-tracker',
          icon: FolderOpen,
          description: 'Kanban board for application pipeline'
        },
        {
          name: 'Interview Prep Kit',
          path: '/dashboard/interview-prep',
          icon: Users,
          description: 'AI-powered interview preparation'
        },
        {
          name: 'Work History Manager',
          path: '/dashboard/work-history-manager',
          icon: FolderOpen,
          description: 'Manage saved resumes, cover letters, and documents'
        }
      ]
    },
    {
      category: 'Brand Building',
      items: [
        {
          name: 'AI-Powered Personal Brand Audit',
          path: '/dashboard/brand-audit',
          icon: TrendingUp,
          description: 'Comprehensive analysis of your digital brand presence'
        },
        {
          name: 'Content Engine for Thought Leadership',
          path: '/dashboard/content-engine',
          icon: Brain,
          description: 'AI-powered thought leadership content generation'
        },
        {
          name: 'AI-Generated Career Portfolio/Microsite',
          path: '/dashboard/career-portfolio',
          icon: Globe,
          description: 'Create professional portfolio websites with AI'
        },
        {
          name: 'AI Career Event Scout & Networking Assistant',
          path: '/dashboard/career-event-scout',
          icon: Users,
          description: 'Discover events, track role models, and build meaningful connections'
        },
        {
          name: 'AI Brand Intelligence',
          path: '/dashboard/ai-brand-intelligence',
          icon: Brain,
          description: 'Unified AI coach for brand growth and reputation management'
        }
      ]
    },
    {
      category: 'Upskilling',
      items: [
        {
          name: 'Upskilling Dashboard',
          path: '/dashboard/upskilling-dashboard',
          icon: GraduationCap,
          description: 'Personalized learning paths and progress tracking'
        },
        {
          name: 'Skill Radar',
          path: '/dashboard/skill-radar',
          icon: Radar,
          description: 'Discover in-demand skills and market signals'
        },
        {
          name: 'Learning Path',
          path: '/dashboard/learning-path',
          icon: BookOpen,
          description: 'Manage your personalized learning roadmap'
        },
        {
          name: 'Sprints',
          path: '/dashboard/sprints',
          icon: Zap,
          description: 'Accelerated learning sprints for skill acquisition'
        },
        {
          name: 'Certifications',
          path: '/dashboard/certifications',
          icon: Award,
          description: 'Track and plan your professional certifications'
        },
        {
          name: 'Skill Benchmarking',
          path: '/dashboard/skill-benchmarking',
          icon: BarChart2,
          description: 'Compare your skills against market and top performers'
        }
      ]
    }
  ];

  const isActivePath = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    return location.pathname.startsWith(path) && path !== '/dashboard';
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col glass-card-strong`}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
            <Logo />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-[var(--color-text-secondary)] px-3">
                  {section.category}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIdx) => {
                    const Icon = item.icon;
                    const isActive = isActivePath(item.path);
                    
                    return (
                      <button
                        key={itemIdx}
                        onClick={() => {
                          navigate(item.path);
                          closeSidebar();
                        }}
                        className={`w-full flex items-start space-x-3 px-4 py-4 rounded-2xl text-left transition-all duration-300 group ${
                          isActive
                            ? 'nav-item active'
                            : 'nav-item'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mt-0.5 flex-shrink-0 transition-colors ${
                          isActive
                            ? 'text-[var(--color-primary)]'
                            : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]'
                        }`} />
                        <div>
                          <div className={`font-semibold text-sm ${
                            isActive
                              ? 'text-[var(--color-primary)]'
                              : 'text-[var(--color-text)] group-hover:text-[var(--color-primary)]'
                          }`}>
                            {item.name}
                          </div>
                          {item.description && (
                            <div className="text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Sign Out */}
          <div className="p-6 border-t border-[var(--color-border)]">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl nav-item"
            >
              <LogOut className="w-6 h-6" />
              <span className="font-semibold">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden glass-card border-b border-[var(--color-border)] px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors p-2 rounded-xl"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Logo size="sm" />
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-3 rounded-xl btn-glass transition-colors"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="p-3 rounded-xl btn-glass transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-end gap-4 p-6 glass-card border-b border-[var(--color-border)] flex-shrink-0">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl btn-glass transition-all duration-300"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="p-3 rounded-xl btn-glass transition-all duration-300"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </header>
        
        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto scrollbar-thin bg-white">
          <div className="relative min-h-full">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/brand-audit" element={<BrandAudit />} />
              <Route path="/content-engine" element={<ContentEngine />} />
              <Route path="/career-portfolio" element={<CareerPortfolio />} />
              <Route path="/job-finder" element={<JobFinder />} />
              <Route path="/job-tracker" element={<JobTracker />} />
              <Route path="/interview-prep" element={<InterviewPrepKit />} />
              <Route path="/smart-resume-studio" element={<SmartResumeStudio />} />
              <Route path="/application-tailor" element={<ApplicationTailor />} />
              <Route path="/upskilling-dashboard" element={<UpskillingDashboard />} />
              <Route path="/skill-radar" element={<SkillRadar />} />
              <Route path="/learning-path" element={<LearningPath />} />
              <Route path="/sprints" element={<Sprints />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/skill-benchmarking" element={<SkillBenchmarking />} />
              <Route path="/cover-letter-generator" element={<CoverLetterGenerator />} />
              <Route path="/work-history-manager" element={<ResumeManager />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/comment-helper" element={<CommentHelper />} />
              <Route path="/team-management" element={<TeamManagement />} />
              <Route path="/ai-brand-intelligence" element={<AIBrandIntelligence />} />
              <Route path="/career-event-scout" element={<CareerEventScout />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
};

export default Dashboard;