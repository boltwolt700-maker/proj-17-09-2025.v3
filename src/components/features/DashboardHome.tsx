import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Star,
  PenTool,
  Image,
  FileText,
  Target,
  MessageCircle,
  RefreshCw,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const quickActions = [
    {
      title: 'Generate Post',
      description: 'Create an AI-powered LinkedIn post',
      icon: PenTool,
      path: '/dashboard/post-generator',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Create Carousel',
      description: 'Design a professional carousel',
      icon: Image,
      path: '/dashboard/carousel-maker',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Enhance Resume',
      description: 'Optimize your resume for ATS',
      icon: FileText,
      path: '/dashboard/resume-enhancer',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Schedule Content',
      description: 'Plan your content calendar',
      icon: Calendar,
      path: '/dashboard/calendar',
      gradient: 'from-green-500 to-teal-600'
    }
  ];

  const stats = [
    {
      title: 'Posts Generated',
      value: '24',
      change: '+12%',
      icon: PenTool,
      color: 'text-[var(--color-primary)]'
    },
    {
      title: 'Profile Views',
      value: '1,247',
      change: '+23%',
      icon: Users,
      color: 'text-emerald-600'
    },
    {
      title: 'Engagement Rate',
      value: '8.4%',
      change: '+5.2%',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Scheduled Posts',
      value: '12',
      change: '+4',
      icon: Calendar,
      color: 'text-blue-600'
    }
  ];

  const recentActivity = [
    {
      action: 'Generated LinkedIn post',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      action: 'Created carousel template',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      action: 'Enhanced resume',
      time: '1 day ago',
      status: 'completed'
    },
    {
      action: 'Scheduled 5 posts',
      time: '2 days ago',
      status: 'completed'
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto bg-white min-h-screen">
      {/* Welcome Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3 text-[var(--color-text)]">
          Welcome back to Career Clarified
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          Ready to accelerate your career growth? Let's create something amazing today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className="group glass-card rounded-3xl overflow-hidden transition-all duration-300 text-left hover:transform hover:scale-105"
            >
              {/* Top colored section */}
              <div className={`bg-gradient-to-r ${action.gradient} p-8 relative`}>
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-8 h-8 text-white" />
                  <div className="text-white/80 text-xs font-bold uppercase tracking-wider">ACTION</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                  {action.title}
                </h3>
              </div>
              
              {/* Bottom white section */}
              <div className="p-8 bg-white/95 backdrop-blur-sm">
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="surface-card rounded-3xl p-8 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-emerald-600 text-sm font-bold bg-emerald-100 px-4 py-2 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-2 text-[var(--color-text)]">
                {stat.value}
              </h3>
              <p className="text-base font-medium text-[var(--color-text-secondary)]">
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-3xl p-8 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-8 text-[var(--color-text)]">
              Recent Activity
            </h2>
            <div className="space-y-6">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-2xl surface-card-alt transition-all duration-300 hover:transform hover:scale-102">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-[var(--color-text)]">
                      {activity.action}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      {activity.time}
                    </p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="glass-card rounded-3xl p-8 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-8 text-[var(--color-text)]">
            Career Tips
          </h2>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 hover:border-violet-300 transition-all duration-300 hover:transform hover:scale-105">
              <h3 className="font-bold mb-3 text-violet-700 text-lg">
                Post Consistently
              </h3>
              <p className="text-sm text-violet-600 leading-relaxed">
                Share valuable content 3-5 times per week to build authority.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-pink-50 border border-fuchsia-200 hover:border-fuchsia-300 transition-all duration-300 hover:transform hover:scale-105">
              <h3 className="font-bold mb-3 text-fuchsia-700 text-lg">
                Optimize Keywords
              </h3>
              <p className="text-sm text-fuchsia-600 leading-relaxed">
                Use industry keywords in your profile and posts for better visibility.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:transform hover:scale-105">
              <h3 className="font-bold mb-3 text-emerald-700 text-lg">
                Engage Authentically
              </h3>
              <p className="text-sm text-emerald-600 leading-relaxed">
                Comment meaningfully on others' posts to build relationships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;