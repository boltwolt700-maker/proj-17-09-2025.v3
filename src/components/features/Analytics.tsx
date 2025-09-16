import React, { useState } from 'react';
import { TrendingUp, BarChart3, Users, Eye, Heart, MessageCircle, Share, Calendar } from 'lucide-react';

import { useTheme } from '../../hooks/useTheme';

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('30d');
  
  const metrics = {
    followers: { value: '2,847', change: '+12%', trend: 'up' },
    impressions: { value: '45.2K', change: '+8%', trend: 'up' },
    engagement: { value: '3.4%', change: '+0.7%', trend: 'up' },
    profileViews: { value: '1,234', change: '+23%', trend: 'up' }
  };

  const topPosts = [
    {
      id: '1',
      title: '5 Tips for Remote Work Success',
      date: '2024-01-18',
      likes: 145,
      comments: 23,
      shares: 12,
      impressions: 3200
    },
    {
      id: '2',
      title: 'The Future of AI in Business',
      date: '2024-01-15',
      likes: 89,
      comments: 15,
      shares: 8,
      impressions: 2100
    },
    {
      id: '3',
      title: 'Leadership Lessons from 2023',
      date: '2024-01-12',
      likes: 67,
      comments: 9,
      shares: 5,
      impressions: 1800
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto bg-[var(--color-bg)] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[var(--color-text)]">Analytics</h1>
            <p className="text-lg text-[var(--color-text-secondary)] mt-2">Track performance and optimize strategy</p>
          </div>
        </div>
        
        <div className="flex surface-card rounded-2xl p-2 border border-[var(--color-border)] shadow-lg">
          <button
            onClick={() => setTimeframe('7d')}
            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              timeframe === '7d' 
                ? 'bg-[var(--color-primary)] text-white shadow-lg' 
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            }`}
          >
            7 days
          </button>
          <button
            onClick={() => setTimeframe('30d')}
            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              timeframe === '30d' 
                ? 'bg-[var(--color-primary)] text-white shadow-lg' 
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            }`}
          >
            30 days
          </button>
          <button
            onClick={() => setTimeframe('90d')}
            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              timeframe === '90d' 
                ? 'bg-[var(--color-primary)] text-white shadow-lg' 
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            }`}
          >
            90 days
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-blue-600" />
            <span className={`text-sm font-semibold ${
              metrics.followers.trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {metrics.followers.change}
            </span>
          </div>
          <div className="text-3xl font-bold mb-2 text-[var(--color-text)]">{metrics.followers.value}</div>
          <div className="text-sm text-[var(--color-text-secondary)]">Followers</div>
        </div>

        <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-8 h-8 text-purple-600" />
            <span className={`text-sm font-semibold ${
              metrics.impressions.trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {metrics.impressions.change}
            </span>
          </div>
          <div className="text-3xl font-bold mb-2 text-[var(--color-text)]">{metrics.impressions.value}</div>
          <div className="text-sm text-[var(--color-text-secondary)]">Impressions</div>
        </div>

        <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Heart className="w-8 h-8 text-red-600" />
            <span className={`text-sm font-semibold ${
              metrics.engagement.trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {metrics.engagement.change}
            </span>
          </div>
          <div className="text-3xl font-bold mb-2 text-[var(--color-text)]">{metrics.engagement.value}</div>
          <div className="text-sm text-[var(--color-text-secondary)]">Engagement Rate</div>
        </div>

        <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-8 h-8 text-green-600" />
            <span className={`text-sm font-semibold ${
              metrics.profileViews.trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {metrics.profileViews.change}
            </span>
          </div>
          <div className="text-3xl font-bold mb-2 text-[var(--color-text)]">{metrics.profileViews.value}</div>
          <div className="text-sm text-[var(--color-text-secondary)]">Profile Views</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart Placeholder */}
        <div className="lg:col-span-2">
          <div className="glass-card-strong rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[var(--color-text)]">
              <BarChart3 className="w-6 h-6 text-[var(--color-primary)]" />
              Performance Overview
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-[var(--color-border)] rounded-2xl">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-[var(--color-accent-alt)] mx-auto mb-4" />
                <p className="text-[var(--color-text-secondary)] text-lg">Interactive charts coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Posts */}
          <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 text-[var(--color-text)]">Top Performing Posts</h3>
            <div className="space-y-4">
              {topPosts.map((post, index) => (
                <div key={post.id} className="surface-card rounded-2xl p-4 hover:glass-card transition-all duration-300">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm leading-tight text-[var(--color-text)]">{post.title}</h4>
                    <span className="text-xs ml-2 text-[var(--color-text-secondary)]">{post.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share className="w-3 h-3" />
                        {post.shares}
                      </span>
                    </div>
                    <span>{post.impressions.toLocaleString()} views</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 text-[var(--color-text)]">AI Insights</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <p className="text-blue-700 text-sm font-semibold mb-1">Best Posting Time</p>
                <p className="text-[var(--color-text)] text-sm">Your audience is most active on Tuesdays at 2 PM</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <p className="text-green-700 text-sm font-semibold mb-1">Content Performance</p>
                <p className="text-[var(--color-text)] text-sm">Educational posts perform 40% better than promotional ones</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
                <p className="text-purple-700 text-sm font-semibold mb-1">Engagement Trend</p>
                <p className="text-[var(--color-text)] text-sm">Your engagement rate increased 23% this month</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 text-[var(--color-text)]">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] rounded-xl transition-colors">
                Export analytics report
              </button>
              <button className="w-full text-left p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] rounded-xl transition-colors">
                Schedule performance review
              </button>
              <button className="w-full text-left p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] rounded-xl transition-colors">
                Set up alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Analytics;