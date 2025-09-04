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
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Create Carousel',
      description: 'Design a professional carousel',
      icon: Image,
      path: '/dashboard/carousel-maker',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Enhance Resume',
      description: 'Optimize your resume for ATS',
      icon: FileText,
      path: '/dashboard/resume-enhancer',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Schedule Content',
      description: 'Plan your content calendar',
      icon: Calendar,
      path: '/dashboard/calendar',
      color: 'from-green-500 to-teal-600'
    }
  ];

  const stats = [
    {
      title: 'Posts Generated',
      value: '24',
      change: '+12%',
      icon: PenTool,
      color: 'text-indigo-600'
    },
    {
      title: 'Profile Views',
      value: '1,247',
      change: '+23%',
      icon: Users,
      color: 'text-green-600'
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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          Welcome back to Career Clarified
        </h1>
        <p className={theme === 'light' ? 'text-gray-600' : 'text-slate-300'}>
          Ready to accelerate your career growth? Let's create something amazing today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className={`group card-metallic rounded-2xl overflow-hidden border transition-all duration-300 text-left ${
                theme === 'light'
                  ? 'bg-white border-gray-200 hover:border-violet-400/50'
                  : 'bg-slate-800 border-slate-700 hover:border-violet-400/50'
              }`}
            >
              {/* Top colored section */}
              <div className={`bg-gradient-to-r ${action.color} p-6 relative`}>
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-6 h-6 text-white" />
                  <div className="text-white/80 text-xs font-medium">ACTION</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                  {action.title}
                </h3>
              </div>
              
              {/* Bottom white section */}
              <div className={`p-6 ${
                theme === 'light' ? 'bg-white' : 'bg-slate-800'
              }`}>
                <p className={`text-sm ${
                  theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`card-metallic backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${
                theme === 'light'
                  ? 'bg-white/90 border-gray-200 hover:border-violet-400/30'
                  : 'bg-slate-800/50 border-slate-700/50 hover:border-violet-400/30 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-6 h-6 ${stat.color}`} />
                <span className="text-emerald-400 text-sm font-medium bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
                  {stat.change}
                </span>
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {stat.value}
              </h3>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-slate-300'
              }`}>
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className={`card-metallic backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${
            theme === 'light'
              ? 'bg-white/90 border-gray-200 hover:border-violet-400/30'
              : 'bg-slate-800/50 border-slate-700/50 hover:border-violet-400/30'
          }`}>
            <h2 className={`text-xl font-bold mb-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                  theme === 'light' 
                    ? 'hover:bg-gray-100' 
                    : 'hover:bg-slate-700/50'
                }`}>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-sm shadow-emerald-400/50"></div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {activity.action}
                    </p>
                    <p className={`text-sm ${
                      theme === 'light' ? 'text-gray-500' : 'text-slate-400'
                    }`}>
                      {activity.time}
                    </p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className={`card-metallic backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${
          theme === 'light'
            ? 'bg-white/90 border-gray-200 hover:border-violet-400/30'
            : 'bg-slate-800/50 border-slate-700/50 hover:border-violet-400/30'
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Career Tips
          </h2>
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              theme === 'light'
                ? 'bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200 hover:border-violet-300'
                : 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 border-violet-400/30 hover:border-violet-400/50'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                theme === 'light' ? 'text-violet-700' : 'text-violet-300'
              }`}>
                Post Consistently
              </h3>
              <p className={`text-sm ${
                theme === 'light' ? 'text-violet-600' : 'text-violet-200'
              }`}>
                Share valuable content 3-5 times per week to build authority.
              </p>
            </div>
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              theme === 'light'
                ? 'bg-gradient-to-r from-fuchsia-50 to-pink-50 border-fuchsia-200 hover:border-fuchsia-300'
                : 'bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 border-fuchsia-400/30 hover:border-fuchsia-400/50'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                theme === 'light' ? 'text-fuchsia-700' : 'text-fuchsia-300'
              }`}>
                Optimize Keywords
              </h3>
              <p className={`text-sm ${
                theme === 'light' ? 'text-fuchsia-600' : 'text-fuchsia-200'
              }`}>
                Use industry keywords in your profile and posts for better visibility.
              </p>
            </div>
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              theme === 'light'
                ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-300'
                : 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-400/30 hover:border-emerald-400/50'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'
              }`}>
                Engage Authentically
              </h3>
              <p className={`text-sm ${
                theme === 'light' ? 'text-emerald-600' : 'text-emerald-200'
              }`}>
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