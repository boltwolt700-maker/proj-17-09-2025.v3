import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Target, 
  BarChart3,
  Sparkles,
  RefreshCw,
  Calendar,
  User,
  Globe,
  Search,
  MessageCircle,
  Star,
  ArrowRight,
  ExternalLink,
  Bell,
  Zap,
  Award,
  Clock,
  Filter,
  Download
} from 'lucide-react';

interface BrandHealthScore {
  overall: number;
  visibility: number;
  engagement: number;
  reputation: number;
  authority: number;
  trend: 'up' | 'down' | 'stable';
}

interface MentorInsight {
  id: string;
  type: 'weekly' | 'monthly' | 'achievement' | 'reputation_alert';
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  actionItems: ActionItem[];
  estimatedImpact: string;
  createdAt: string;
  isRead: boolean;
}

interface ActionItem {
  id: string;
  title: string;
  description: string;
  category: 'content' | 'seo' | 'networking' | 'reputation';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  completed: boolean;
}

interface ReputationAlert {
  id: string;
  type: 'negative_mention' | 'visibility_drop' | 'ranking_change' | 'opportunity';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  isRead: boolean;
  actionRequired: boolean;
  createdAt: string;
}

interface BrandMention {
  id: string;
  platform: string;
  title: string;
  url: string;
  snippet: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  ranking: number;
  date: string;
  isOwned: boolean;
}

const AIBrandIntelligence = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'insights' | 'reputation' | 'analytics'>('overview');
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanDate, setLastScanDate] = useState<string | null>('2024-01-21T10:30:00Z');
  const [selectedInsight, setSelectedInsight] = useState<MentorInsight | null>(null);
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // Mock data
  const brandHealth: BrandHealthScore = {
    overall: 78,
    visibility: 82,
    engagement: 75,
    reputation: 85,
    authority: 71,
    trend: 'up'
  };

  const mentorInsights: MentorInsight[] = [
    {
      id: '1',
      type: 'reputation_alert',
      title: 'Boost Your Search Visibility 🔍',
      content: 'Your reputation scan shows you\'re not appearing prominently in search results. This is a major opportunity to increase your professional visibility.',
      priority: 'high',
      actionItems: [
        {
          id: '1a',
          title: 'Create a professional website',
          description: 'Build a personal website to rank on Page 1 of Google',
          category: 'seo',
          difficulty: 'medium',
          estimatedTime: '4-6 hours',
          completed: false
        },
        {
          id: '1b',
          title: 'Optimize LinkedIn for search',
          description: 'Update your LinkedIn headline with searchable keywords',
          category: 'seo',
          difficulty: 'easy',
          estimatedTime: '30 minutes',
          completed: false
        }
      ],
      estimatedImpact: '+25% online visibility',
      createdAt: '2024-01-21T09:00:00Z',
      isRead: false
    },
    {
      id: '2',
      type: 'weekly',
      title: 'Your LinkedIn Engagement is Trending Up! 📈',
      content: 'Great progress this week! Your brand score improved by 5 points. Your engagement metrics are trending upward.',
      priority: 'medium',
      actionItems: [
        {
          id: '2a',
          title: 'Share industry insights',
          description: 'Post about recent trends in your field',
          category: 'content',
          difficulty: 'medium',
          estimatedTime: '20 minutes',
          completed: false
        },
        {
          id: '2b',
          title: 'Engage with network posts',
          description: 'Comment meaningfully on 5 posts from your network',
          category: 'networking',
          difficulty: 'easy',
          estimatedTime: '15 minutes',
          completed: true
        }
      ],
      estimatedImpact: '+12% engagement growth',
      createdAt: '2024-01-20T08:00:00Z',
      isRead: true
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Milestone Unlocked: Consistent Creator! 🎉',
      content: 'Congratulations! You\'ve posted consistently for 4 weeks straight. This consistency is building real momentum in your personal brand.',
      priority: 'low',
      actionItems: [],
      estimatedImpact: 'Brand recognition boost',
      createdAt: '2024-01-19T12:00:00Z',
      isRead: true
    }
  ];

  const reputationAlerts: ReputationAlert[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'New High-Value Mention Opportunity',
      description: 'A popular industry blog mentioned topics related to your expertise. Consider engaging.',
      severity: 'info',
      isRead: false,
      actionRequired: false,
      createdAt: '2024-01-21T14:30:00Z'
    },
    {
      id: '2',
      type: 'visibility_drop',
      title: 'Search Ranking Needs Attention',
      description: 'Your name doesn\'t appear in the first page of Google results for your professional keywords.',
      severity: 'warning',
      isRead: false,
      actionRequired: true,
      createdAt: '2024-01-20T16:45:00Z'
    }
  ];

  const brandMentions: BrandMention[] = [
    {
      id: '1',
      platform: 'LinkedIn',
      title: 'John Doe - Senior Software Engineer',
      url: 'https://linkedin.com/in/johndoe',
      snippet: 'Experienced software engineer with expertise in React, Node.js...',
      sentiment: 'positive',
      ranking: 1,
      date: '2024-01-20',
      isOwned: true
    },
    {
      id: '2',
      platform: 'GitHub',
      title: 'johndoe (John Doe) · GitHub',
      url: 'https://github.com/johndoe',
      snippet: 'Software engineer building scalable web applications...',
      sentiment: 'positive',
      ranking: 2,
      date: '2024-01-19',
      isOwned: true
    },
    {
      id: '3',
      platform: 'Google',
      title: 'John Doe - Software Engineer Portfolio',
      url: 'https://johndoe.dev',
      snippet: 'Professional portfolio showcasing software engineering projects...',
      sentiment: 'positive',
      ranking: 3,
      date: '2024-01-18',
      isOwned: true
    }
  ];

  const startBrandScan = async () => {
    setIsScanning(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      setLastScanDate(new Date().toISOString());
    } catch (error) {
      console.error('Error starting brand scan:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'info': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400 bg-green-500/20';
      case 'negative': return 'text-red-400 bg-red-500/20';
      case 'neutral': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const filteredInsights = filterPriority === 'all' 
    ? mentorInsights 
    : mentorInsights.filter(insight => insight.priority === filterPriority);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-50">AI Brand Intelligence</h1>
            <p className="text-gray-400 mt-1">Your personal AI coach for brand growth and reputation management</p>
          </div>
        </div>
        
        <button
          onClick={startBrandScan}
          disabled={isScanning}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Run Brand Scan
            </>
          )}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-[#111827] rounded-lg p-1 border border-gray-700 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Brand Overview
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'insights' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          AI Insights & Actions
        </button>
        <button
          onClick={() => setActiveTab('reputation')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'reputation' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Reputation Monitor
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'analytics' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Analytics & Trends
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Brand Health Dashboard */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-50 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-indigo-400" />
                  Brand Health Dashboard
                </h3>
                {lastScanDate && (
                  <span className="text-sm text-gray-400">
                    Last scan: {new Date(lastScanDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${getScoreColor(brandHealth.overall)}`}>
                    {brandHealth.overall}
                  </div>
                  <div className="text-gray-400 text-sm">Overall Brand Score</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className={`w-4 h-4 ${brandHealth.trend === 'up' ? 'text-green-400' : 'text-gray-400'}`} />
                    <span className="text-xs text-green-400">+5 this week</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Visibility</span>
                    <span className={`font-semibold ${getScoreColor(brandHealth.visibility)}`}>
                      {brandHealth.visibility}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Engagement</span>
                    <span className={`font-semibold ${getScoreColor(brandHealth.engagement)}`}>
                      {brandHealth.engagement}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Reputation</span>
                    <span className={`font-semibold ${getScoreColor(brandHealth.reputation)}`}>
                      {brandHealth.reputation}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Authority</span>
                    <span className={`font-semibold ${getScoreColor(brandHealth.authority)}`}>
                      {brandHealth.authority}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg p-4 border border-indigo-500/30">
                  <h4 className="text-indigo-400 font-medium mb-2">AI Recommendation</h4>
                  <p className="text-gray-300 text-sm">
                    Focus on SEO optimization this week. Your visibility score has the highest improvement potential.
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('insights')}
                  className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors"
                >
                  <Brain className="w-5 h-5 text-blue-400" />
                  <div className="text-left">
                    <div className="font-medium text-blue-400">View AI Insights</div>
                    <div className="text-xs text-gray-400">3 new recommendations</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('reputation')}
                  className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition-colors"
                >
                  <Shield className="w-5 h-5 text-yellow-400" />
                  <div className="text-left">
                    <div className="font-medium text-yellow-400">Check Reputation</div>
                    <div className="text-xs text-gray-400">2 alerts pending</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  className="flex items-center gap-3 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors"
                >
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  <div className="text-left">
                    <div className="font-medium text-purple-400">View Analytics</div>
                    <div className="text-xs text-gray-400">Detailed metrics</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-400" />
                Recent Activity & Alerts
              </h3>
              
              <div className="space-y-4">
                {reputationAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-50 mb-1">{alert.title}</h4>
                        <p className="text-gray-300 text-sm">{alert.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                          <span>{new Date(alert.createdAt).toLocaleDateString()}</span>
                          {alert.actionRequired && (
                            <span className="text-orange-400">Action Required</span>
                          )}
                        </div>
                      </div>
                      {!alert.isRead && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Priority Actions */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-red-400" />
                Top Priority Actions
              </h3>
              
              <div className="space-y-3">
                {mentorInsights
                  .filter(insight => insight.priority === 'high')
                  .slice(0, 3)
                  .map((insight) => (
                    <div key={insight.id} className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <h4 className="font-medium text-red-400 text-sm mb-1">{insight.title}</h4>
                      <p className="text-gray-300 text-xs line-clamp-2">{insight.content}</p>
                      <button
                        onClick={() => {
                          setSelectedInsight(insight);
                          setActiveTab('insights');
                        }}
                        className="text-red-400 text-xs hover:text-red-300 mt-2 flex items-center gap-1"
                      >
                        View Details <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Brand Mentions Summary */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-400" />
                Online Presence
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Mentions</span>
                  <span className="text-blue-400 font-semibold">{brandMentions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Positive Sentiment</span>
                  <span className="text-green-400 font-semibold">
                    {brandMentions.filter(m => m.sentiment === 'positive').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Page 1 Rankings</span>
                  <span className="text-purple-400 font-semibold">
                    {brandMentions.filter(m => m.ranking <= 10).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Owned Content</span>
                  <span className="text-indigo-400 font-semibold">
                    {brandMentions.filter(m => m.isOwned).length}
                  </span>
                </div>
              </div>
            </div>

            {/* This Week's Progress */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-400" />
                This Week's Progress
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Actions Completed</span>
                  <span className="text-green-400 font-semibold">4/7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Brand Score Change</span>
                  <span className="text-green-400 font-semibold">+5 points</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">New Insights</span>
                  <span className="text-blue-400 font-semibold">3 generated</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Reputation Alerts</span>
                  <span className="text-yellow-400 font-semibold">2 new</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insights & Actions Tab */}
      {activeTab === 'insights' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-50 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  AI-Generated Insights & Recommendations
                </h3>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as any)}
                  className="px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
              
              <div className="space-y-4">
                {filteredInsights.map((insight) => (
                  <div key={insight.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-50">{insight.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(insight.priority)}`}>
                            {insight.priority} priority
                          </span>
                          <span className="text-xs text-gray-400">
                            {insight.type === 'reputation_alert' ? 'Reputation' : 
                             insight.type === 'weekly' ? 'Weekly' : 
                             insight.type === 'monthly' ? 'Monthly' : 'Achievement'}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{insight.content}</p>
                        
                        {insight.actionItems.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Action Items:</h5>
                            {insight.actionItems.map((action) => (
                              <div key={action.id} className="flex items-center gap-3 p-2 bg-[#111827] rounded-lg">
                                <input
                                  type="checkbox"
                                  checked={action.completed}
                                  onChange={() => {
                                    // Toggle completion status
                                    action.completed = !action.completed;
                                  }}
                                  className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                                />
                                <div className="flex-1">
                                  <div className={`text-sm font-medium ${action.completed ? 'text-gray-500 line-through' : 'text-gray-50'}`}>
                                    {action.title}
                                  </div>
                                  <div className="text-xs text-gray-400">{action.estimatedTime} • {action.difficulty}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xs text-gray-400 mb-1">Expected Impact</div>
                        <div className="text-sm font-medium text-indigo-400">{insight.estimatedImpact}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Action Progress</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">This Week</span>
                  <span className="text-green-400 font-semibold">4/7 completed</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '57%' }}></div>
                </div>
                <div className="text-xs text-gray-400">Great progress! Keep it up.</div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Quick Wins</h3>
              <div className="space-y-3">
                {mentorInsights
                  .flatMap(insight => insight.actionItems)
                  .filter(action => action.difficulty === 'easy' && !action.completed)
                  .slice(0, 3)
                  .map((action) => (
                    <div key={action.id} className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <h4 className="text-green-400 text-sm font-medium mb-1">{action.title}</h4>
                      <p className="text-gray-300 text-xs">{action.estimatedTime}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reputation Monitor Tab */}
      {activeTab === 'reputation' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-400" />
                Brand Mentions & Search Results
              </h3>
              
              <div className="space-y-4">
                {brandMentions.map((mention) => (
                  <div key={mention.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-gray-50">{mention.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(mention.sentiment)}`}>
                            {mention.sentiment}
                          </span>
                          <span className="text-xs text-gray-400">Rank #{mention.ranking}</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{mention.snippet}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {mention.platform}
                          </span>
                          <span>{mention.date}</span>
                          {mention.isOwned && (
                            <span className="text-green-400">Owned Content</span>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => window.open(mention.url, '_blank')}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Reputation Health</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-1 ${getScoreColor(brandHealth.reputation)}`}>
                    {brandHealth.reputation}%
                  </div>
                  <div className="text-gray-400 text-sm">Reputation Score</div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Search Visibility</span>
                    <span className={getScoreColor(brandHealth.visibility)}>{brandHealth.visibility}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Sentiment Analysis</span>
                    <span className="text-green-400">Positive</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Content Freshness</span>
                    <span className="text-yellow-400">Good</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Monitoring Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Auto-scan frequency</span>
                  <span className="text-indigo-400 text-sm">Daily</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Alert notifications</span>
                  <span className="text-green-400 text-sm">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Platforms monitored</span>
                  <span className="text-blue-400 text-sm">5 active</span>
                </div>
              </div>
              
              <button className="w-full mt-4 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors">
                Configure Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Brand Performance Analytics
              </h3>
              
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Interactive analytics charts coming soon</p>
                  <p className="text-gray-500 text-sm mt-2">Track brand score trends, engagement patterns, and reputation changes over time</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Key Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Brand Growth Rate</span>
                  <span className="text-green-400 font-semibold">+12% this month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Visibility Improvement</span>
                  <span className="text-blue-400 font-semibold">+8 points</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Actions Completed</span>
                  <span className="text-purple-400 font-semibold">23 this month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Reputation Alerts</span>
                  <span className="text-yellow-400 font-semibold">5 resolved</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Export Options</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Brand health report
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Reputation analysis
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Action plan summary
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBrandIntelligence;