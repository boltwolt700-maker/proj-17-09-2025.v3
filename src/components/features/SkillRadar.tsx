import React, { useState, useEffect } from 'react';
import { 
  Radar, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Star, 
  Eye, 
  Bookmark, 
  Filter, 
  Search, 
  Bell, 
  BarChart3, 
  Clock, 
  DollarSign, 
  Users, 
  Target, 
  Zap, 
  ArrowRight, 
  Settings, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  BookOpen,
  ExternalLink,
  Plus,
  X
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'industry' | 'tools';
  demandScore: number;
  growthRate: number;
  salaryImpact: number;
  jobCount: number;
  trend: 'rising' | 'falling' | 'stable';
  position: { x: number; y: number };
  isWatched: boolean;
  emergingStatus: 'hot' | 'emerging' | 'established' | 'declining';
  learningResources: number;
  timeToLearn: string;
  relatedSkills: string[];
}

interface RadarQuadrant {
  id: string;
  name: string;
  color: string;
  skills: Skill[];
}

interface PersonalizationSettings {
  role: string;
  industry: string;
  location: string;
  experienceLevel: string;
  careerGoals: string[];
  skillLevel: string;
}

const SkillRadar = () => {
  const [activeView, setActiveView] = useState<'radar' | 'list' | 'watchlist' | 'insights'>('radar');
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'technical' | 'soft' | 'industry' | 'tools'>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showSkillDetail, setShowSkillDetail] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<string>('2024-01-21T10:30:00Z');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [personalization, setPersonalization] = useState<PersonalizationSettings>({
    role: 'software-engineer',
    industry: 'technology',
    location: 'united-states',
    experienceLevel: 'mid-level',
    careerGoals: ['career-advancement', 'salary-increase'],
    skillLevel: 'intermediate'
  });

  // Mock skill data
  const skills: Skill[] = [
    {
      id: '1',
      name: 'AI/Machine Learning',
      category: 'technical',
      demandScore: 95,
      growthRate: 45,
      salaryImpact: 25,
      jobCount: 15420,
      trend: 'rising',
      position: { x: 80, y: 20 },
      isWatched: true,
      emergingStatus: 'hot',
      learningResources: 156,
      timeToLearn: '3-6 months',
      relatedSkills: ['Python', 'TensorFlow', 'Data Science']
    },
    {
      id: '2',
      name: 'Kubernetes',
      category: 'tools',
      demandScore: 88,
      growthRate: 32,
      salaryImpact: 18,
      jobCount: 8930,
      trend: 'rising',
      position: { x: 70, y: 75 },
      isWatched: false,
      emergingStatus: 'emerging',
      learningResources: 89,
      timeToLearn: '2-4 months',
      relatedSkills: ['Docker', 'DevOps', 'Cloud Computing']
    },
    {
      id: '3',
      name: 'Product Management',
      category: 'soft',
      demandScore: 82,
      growthRate: 28,
      salaryImpact: 22,
      jobCount: 12450,
      trend: 'rising',
      position: { x: 25, y: 30 },
      isWatched: true,
      emergingStatus: 'established',
      learningResources: 234,
      timeToLearn: '6-12 months',
      relatedSkills: ['Strategy', 'Analytics', 'User Research']
    },
    {
      id: '4',
      name: 'Cybersecurity',
      category: 'technical',
      demandScore: 91,
      growthRate: 38,
      salaryImpact: 30,
      jobCount: 18750,
      trend: 'rising',
      position: { x: 85, y: 60 },
      isWatched: false,
      emergingStatus: 'hot',
      learningResources: 178,
      timeToLearn: '4-8 months',
      relatedSkills: ['Network Security', 'Ethical Hacking', 'Risk Management']
    },
    {
      id: '5',
      name: 'Blockchain',
      category: 'technical',
      demandScore: 65,
      growthRate: -12,
      salaryImpact: 15,
      jobCount: 3420,
      trend: 'falling',
      position: { x: 40, y: 85 },
      isWatched: false,
      emergingStatus: 'declining',
      learningResources: 67,
      timeToLearn: '3-5 months',
      relatedSkills: ['Cryptocurrency', 'Smart Contracts', 'Web3']
    },
    {
      id: '6',
      name: 'Data Visualization',
      category: 'technical',
      demandScore: 76,
      growthRate: 15,
      salaryImpact: 12,
      jobCount: 6780,
      trend: 'stable',
      position: { x: 55, y: 45 },
      isWatched: true,
      emergingStatus: 'established',
      learningResources: 145,
      timeToLearn: '2-3 months',
      relatedSkills: ['D3.js', 'Tableau', 'Power BI']
    }
  ];

  const quadrants: RadarQuadrant[] = [
    {
      id: 'technical',
      name: 'Technical Skills',
      color: 'from-blue-500 to-indigo-600',
      skills: skills.filter(s => s.category === 'technical')
    },
    {
      id: 'soft',
      name: 'Soft Skills',
      color: 'from-green-500 to-emerald-600',
      skills: skills.filter(s => s.category === 'soft')
    },
    {
      id: 'industry',
      name: 'Industry Knowledge',
      color: 'from-purple-500 to-violet-600',
      skills: skills.filter(s => s.category === 'industry')
    },
    {
      id: 'tools',
      name: 'Tools & Platforms',
      color: 'from-orange-500 to-amber-600',
      skills: skills.filter(s => s.category === 'tools')
    }
  ];

  const filteredSkills = skills.filter(skill => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.relatedSkills.some(related => related.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const watchedSkills = skills.filter(skill => skill.isWatched);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'falling': return <TrendingDown className="w-4 h-4 text-red-400" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-400" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getEmergingStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'text-red-400 bg-red-500/20';
      case 'emerging': return 'text-orange-400 bg-orange-500/20';
      case 'established': return 'text-blue-400 bg-blue-500/20';
      case 'declining': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getDemandColor = (score: number) => {
    if (score >= 90) return 'text-red-400';
    if (score >= 80) return 'text-orange-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 60) return 'text-blue-400';
    return 'text-gray-400';
  };

  const toggleWatchSkill = (skillId: string) => {
    const skillIndex = skills.findIndex(s => s.id === skillId);
    if (skillIndex !== -1) {
      skills[skillIndex].isWatched = !skills[skillIndex].isWatched;
    }
  };

  const startScan = async () => {
    setIsScanning(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      setLastScanTime(new Date().toISOString());
      
      // Add mock notification
      const newNotification = {
        id: Date.now().toString(),
        title: 'New Trending Skill Detected',
        message: 'AI/Machine Learning demand increased by 12% this week',
        type: 'skill_alert',
        createdAt: new Date().toISOString()
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error('Error scanning skills:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const openSkillDetail = (skill: Skill) => {
    setSelectedSkill(skill);
    setShowSkillDetail(true);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Radar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-50">Skill Radar</h1>
            <p className="text-gray-400 mt-1">Live market intelligence for trending skills and opportunities</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <button
            onClick={startScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Radar className="w-4 h-4" />
                Scan Market
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-[#111827] rounded-lg p-1 border border-gray-700 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveView('radar')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeView === 'radar' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Skill Radar
        </button>
        <button
          onClick={() => setActiveView('list')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeView === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Trending Skills
        </button>
        <button
          onClick={() => setActiveView('watchlist')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeView === 'watchlist' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          My Watchlist ({watchedSkills.length})
        </button>
        <button
          onClick={() => setActiveView('insights')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeView === 'insights' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          AI Insights
        </button>
      </div>

      {/* Radar View */}
      {activeView === 'radar' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-50 flex items-center gap-2">
                  <Radar className="w-5 h-5 text-blue-400" />
                  Live Skill Radar
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex bg-slate-800 rounded-lg p-1 border border-gray-700">
                    <button
                      onClick={() => setTimeframe('7d')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        timeframe === '7d' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      7 days
                    </button>
                    <button
                      onClick={() => setTimeframe('30d')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        timeframe === '30d' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      30 days
                    </button>
                    <button
                      onClick={() => setTimeframe('90d')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        timeframe === '90d' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      90 days
                    </button>
                  </div>
                  
                  <span className="text-sm text-gray-400">
                    Last scan: {new Date(lastScanTime).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Radar Visualization */}
              <div className="relative w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700 overflow-hidden">
                {/* Radar Grid */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* Concentric circles */}
                  <circle cx="50%" cy="50%" r="25%" fill="none" stroke="rgb(75 85 99)" strokeWidth="1" opacity="0.3" />
                  <circle cx="50%" cy="50%" r="50%" fill="none" stroke="rgb(75 85 99)" strokeWidth="1" opacity="0.3" />
                  <circle cx="50%" cy="50%" r="75%" fill="none" stroke="rgb(75 85 99)" strokeWidth="1" opacity="0.3" />
                  
                  {/* Cross lines */}
                  <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgb(75 85 99)" strokeWidth="1" opacity="0.3" />
                  <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="rgb(75 85 99)" strokeWidth="1" opacity="0.3" />
                </svg>

                {/* Quadrant Labels */}
                <div className="absolute top-4 left-4 text-xs font-medium text-blue-400">Technical Skills</div>
                <div className="absolute top-4 right-4 text-xs font-medium text-green-400">Soft Skills</div>
                <div className="absolute bottom-4 left-4 text-xs font-medium text-orange-400">Tools & Platforms</div>
                <div className="absolute bottom-4 right-4 text-xs font-medium text-purple-400">Industry Knowledge</div>

                {/* Skills as dots */}
                {filteredSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{
                      left: `${skill.position.x}%`,
                      top: `${skill.position.y}%`
                    }}
                    onClick={() => openSkillDetail(skill)}
                  >
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-150 ${
                      skill.emergingStatus === 'hot' ? 'bg-red-400 animate-pulse' :
                      skill.emergingStatus === 'emerging' ? 'bg-orange-400' :
                      skill.emergingStatus === 'established' ? 'bg-blue-400' :
                      'bg-gray-400'
                    } ${skill.isWatched ? 'ring-2 ring-yellow-400' : ''}`}>
                    </div>
                    
                    {/* Skill name tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {skill.name}
                        <div className="flex items-center gap-1 mt-1">
                          {getTrendIcon(skill.trend)}
                          <span>{skill.growthRate > 0 ? '+' : ''}{skill.growthRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Hot (High Growth)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Emerging</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Established</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Declining</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-400" />
                Filters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="technical">Technical Skills</option>
                    <option value="soft">Soft Skills</option>
                    <option value="industry">Industry Knowledge</option>
                    <option value="tools">Tools & Platforms</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Search Skills</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search skills..."
                      className="w-full pl-10 pr-4 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hot Skills */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-red-400" />
                Hot Skills This Week
              </h3>
              
              <div className="space-y-3">
                {skills
                  .filter(skill => skill.emergingStatus === 'hot')
                  .slice(0, 3)
                  .map((skill) => (
                    <div key={skill.id} className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-red-400 text-sm">{skill.name}</h4>
                        <span className="text-xs text-red-300">+{skill.growthRate}%</span>
                      </div>
                      <p className="text-gray-300 text-xs">{skill.jobCount.toLocaleString()} jobs available</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Market Stats */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Market Intelligence</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Skills Tracked</span>
                  <span className="text-blue-400 font-semibold">{skills.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Rising Skills</span>
                  <span className="text-green-400 font-semibold">
                    {skills.filter(s => s.trend === 'rising').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Hot Opportunities</span>
                  <span className="text-red-400 font-semibold">
                    {skills.filter(s => s.emergingStatus === 'hot').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Your Watchlist</span>
                  <span className="text-yellow-400 font-semibold">{watchedSkills.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {activeView === 'list' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-50">Trending Skills</h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search skills..."
                      className="pl-10 pr-4 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as any)}
                    className="px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="technical">Technical</option>
                    <option value="soft">Soft Skills</option>
                    <option value="industry">Industry</option>
                    <option value="tools">Tools</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredSkills
                  .sort((a, b) => b.demandScore - a.demandScore)
                  .map((skill) => (
                    <div key={skill.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-50">{skill.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEmergingStatusColor(skill.emergingStatus)}`}>
                              {skill.emergingStatus}
                            </span>
                            {getTrendIcon(skill.trend)}
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div>
                              <span className="text-gray-400">Demand:</span>
                              <span className={`ml-2 font-semibold ${getDemandColor(skill.demandScore)}`}>
                                {skill.demandScore}/100
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400">Growth:</span>
                              <span className={`ml-2 font-semibold ${skill.growthRate > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {skill.growthRate > 0 ? '+' : ''}{skill.growthRate}%
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400">Salary Impact:</span>
                              <span className="ml-2 font-semibold text-green-400">+{skill.salaryImpact}%</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Jobs:</span>
                              <span className="ml-2 font-semibold text-blue-400">{skill.jobCount.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {skill.relatedSkills.slice(0, 3).map((related) => (
                              <span key={related} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                                {related}
                              </span>
                            ))}
                            {skill.relatedSkills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded-full text-xs">
                                +{skill.relatedSkills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => toggleWatchSkill(skill.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              skill.isWatched 
                                ? 'bg-yellow-500/20 text-yellow-400' 
                                : 'bg-gray-700 text-gray-400 hover:text-yellow-400'
                            }`}
                            title={skill.isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openSkillDetail(skill)}
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Category Breakdown */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Category Breakdown</h3>
              <div className="space-y-3">
                {quadrants.map((quadrant) => (
                  <div key={quadrant.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${quadrant.color}`}></div>
                      <span className="text-gray-300 text-sm">{quadrant.name}</span>
                    </div>
                    <span className="text-gray-400 font-semibold">{quadrant.skills.length}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveView('watchlist')}
                  className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors"
                >
                  View my watchlist
                </button>
                <button
                  onClick={() => setActiveView('insights')}
                  className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors"
                >
                  Get AI recommendations
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors"
                >
                  Customize preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Watchlist View */}
      {activeView === 'watchlist' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                My Skill Watchlist
              </h3>
              
              {watchedSkills.length === 0 ? (
                <div className="text-center py-12">
                  <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">No Skills in Watchlist</h4>
                  <p className="text-gray-400 mb-6">Add skills to your watchlist to track their trends and get personalized insights</p>
                  <button
                    onClick={() => setActiveView('list')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Browse Trending Skills
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {watchedSkills.map((skill) => (
                    <div key={skill.id} className="bg-[#1F2937] rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-50">{skill.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEmergingStatusColor(skill.emergingStatus)}`}>
                              {skill.emergingStatus}
                            </span>
                            {getTrendIcon(skill.trend)}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div>
                              <span className="text-gray-400">Demand Score:</span>
                              <span className={`ml-2 font-semibold ${getDemandColor(skill.demandScore)}`}>
                                {skill.demandScore}/100
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400">Growth Rate:</span>
                              <span className={`ml-2 font-semibold ${skill.growthRate > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {skill.growthRate > 0 ? '+' : ''}{skill.growthRate}%
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-400 text-sm">
                            Learning time: {skill.timeToLearn} • {skill.learningResources} resources available
                          </p>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => toggleWatchSkill(skill.id)}
                            className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg transition-colors hover:bg-yellow-500/30"
                            title="Remove from watchlist"
                          >
                            <Star className="w-4 h-4 fill-current" />
                          </button>
                          <button
                            onClick={() => openSkillDetail(skill)}
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Watchlist Insights</h3>
              <div className="space-y-4">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm font-medium mb-1">Strong Portfolio</p>
                  <p className="text-gray-300 text-sm">Your watched skills show 23% average growth</p>
                </div>
                
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium mb-1">Learning Opportunity</p>
                  <p className="text-gray-300 text-sm">AI/ML skills could boost your salary by 25%</p>
                </div>
                
                <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <p className="text-orange-400 text-sm font-medium mb-1">Market Alert</p>
                  <p className="text-gray-300 text-sm">Cybersecurity demand spiked 38% this month</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Recommended Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors">
                  <div className="font-medium text-blue-400 text-sm mb-1">Start Learning AI/ML</div>
                  <div className="text-gray-300 text-xs">High ROI opportunity in your field</div>
                </button>
                
                <button className="w-full text-left p-3 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors">
                  <div className="font-medium text-green-400 text-sm mb-1">Explore Cybersecurity</div>
                  <div className="text-gray-300 text-xs">Emerging trend with high demand</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insights View */}
      {activeView === 'insights' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Personalized AI Insights
              </h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg p-6 border border-blue-500/30">
                  <h4 className="text-xl font-semibold text-blue-400 mb-3">🎯 Top Recommendation for You</h4>
                  <p className="text-gray-50 text-lg mb-4">
                    Focus on <strong>AI/Machine Learning</strong> skills in the next 3 months
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">+25%</div>
                      <div className="text-sm text-gray-300">Salary Impact</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">15.4K</div>
                      <div className="text-sm text-gray-300">Job Openings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">3-6mo</div>
                      <div className="text-sm text-gray-300">Learning Time</div>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Start Learning Path
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-50">Market Intelligence</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <h5 className="text-green-400 font-medium mb-2">Rising Fast</h5>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Kubernetes</strong> demand increased 32% this month
                      </p>
                      <p className="text-gray-400 text-xs">Perfect timing to start learning</p>
                    </div>
                    
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <h5 className="text-red-400 font-medium mb-2">Cooling Down</h5>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Blockchain</strong> demand dropped 12% this quarter
                      </p>
                      <p className="text-gray-400 text-xs">Consider other priorities</p>
                    </div>
                    
                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <h5 className="text-purple-400 font-medium mb-2">Your Industry</h5>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Product Management</strong> skills are highly valued in tech
                      </p>
                      <p className="text-gray-400 text-xs">Great for career advancement</p>
                    </div>
                    
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <h5 className="text-blue-400 font-medium mb-2">Skill Gap Alert</h5>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Cybersecurity</strong> knowledge could differentiate you
                      </p>
                      <p className="text-gray-400 text-xs">High ROI for your role</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Your Profile</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Role:</span>
                  <span className="text-gray-50 ml-2">Software Engineer</span>
                </div>
                <div>
                  <span className="text-gray-400">Industry:</span>
                  <span className="text-gray-50 ml-2">Technology</span>
                </div>
                <div>
                  <span className="text-gray-400">Experience:</span>
                  <span className="text-gray-50 ml-2">Mid-level</span>
                </div>
                <div>
                  <span className="text-gray-400">Location:</span>
                  <span className="text-gray-50 ml-2">United States</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowSettings(true)}
                className="w-full mt-4 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
              >
                Update Preferences
              </button>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Notifications</h3>
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <p className="text-gray-400 text-sm">No recent notifications</p>
                ) : (
                  notifications.map((notification) => (
                    <div key={notification.id} className="p-3 bg-[#1F2937] rounded-lg border border-gray-700">
                      <h4 className="font-medium text-gray-50 text-sm mb-1">{notification.title}</h4>
                      <p className="text-gray-300 text-xs">{notification.message}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skill Detail Modal */}
      {showSkillDetail && selectedSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-white">{selectedSkill.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEmergingStatusColor(selectedSkill.emergingStatus)}`}>
                  {selectedSkill.emergingStatus}
                </span>
                {getTrendIcon(selectedSkill.trend)}
              </div>
              <button
                onClick={() => setShowSkillDetail(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-96">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-white mb-4">Market Data</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#1F2937] rounded-lg p-4 text-center">
                        <div className={`text-2xl font-bold mb-1 ${getDemandColor(selectedSkill.demandScore)}`}>
                          {selectedSkill.demandScore}
                        </div>
                        <div className="text-gray-400 text-sm">Demand Score</div>
                      </div>
                      <div className="bg-[#1F2937] rounded-lg p-4 text-center">
                        <div className={`text-2xl font-bold mb-1 ${selectedSkill.growthRate > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {selectedSkill.growthRate > 0 ? '+' : ''}{selectedSkill.growthRate}%
                        </div>
                        <div className="text-gray-400 text-sm">Growth Rate</div>
                      </div>
                      <div className="bg-[#1F2937] rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-400 mb-1">+{selectedSkill.salaryImpact}%</div>
                        <div className="text-gray-400 text-sm">Salary Impact</div>
                      </div>
                      <div className="bg-[#1F2937] rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-1">
                          {selectedSkill.jobCount.toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-sm">Job Openings</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-4">Related Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.relatedSkills.map((related) => (
                        <span key={related} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                          {related}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-white mb-4">Learning Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Time to Learn</span>
                        <span className="text-blue-400 font-semibold">{selectedSkill.timeToLearn}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Resources Available</span>
                        <span className="text-green-400 font-semibold">{selectedSkill.learningResources}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Difficulty Level</span>
                        <span className="text-yellow-400 font-semibold">Intermediate</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <button
                        onClick={() => toggleWatchSkill(selectedSkill.id)}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                          selectedSkill.isWatched
                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                            : 'bg-gray-600 hover:bg-gray-700 text-white'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${selectedSkill.isWatched ? 'fill-current' : ''}`} />
                        {selectedSkill.isWatched ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      </button>
                      
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                        <BookOpen className="w-4 h-4" />
                        Start Learning Path
                      </button>
                      
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        View Job Opportunities
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Radar Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-white mb-4">Profile Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Current Role</label>
                      <select
                        value={personalization.role}
                        onChange={(e) => setPersonalization({...personalization, role: e.target.value})}
                        className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      >
                        <option value="software-engineer">Software Engineer</option>
                        <option value="product-manager">Product Manager</option>
                        <option value="data-scientist">Data Scientist</option>
                        <option value="designer">Designer</option>
                        <option value="marketing-manager">Marketing Manager</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                      <select
                        value={personalization.industry}
                        onChange={(e) => setPersonalization({...personalization, industry: e.target.value})}
                        className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      >
                        <option value="technology">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="consulting">Consulting</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level</label>
                      <select
                        value={personalization.experienceLevel}
                        onChange={(e) => setPersonalization({...personalization, experienceLevel: e.target.value})}
                        className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      >
                        <option value="entry-level">Entry Level (0-2 years)</option>
                        <option value="mid-level">Mid Level (3-5 years)</option>
                        <option value="senior-level">Senior Level (6-10 years)</option>
                        <option value="executive">Executive (10+ years)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                      <select
                        value={personalization.location}
                        onChange={(e) => setPersonalization({...personalization, location: e.target.value})}
                        className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      >
                        <option value="united-states">United States</option>
                        <option value="canada">Canada</option>
                        <option value="united-kingdom">United Kingdom</option>
                        <option value="germany">Germany</option>
                        <option value="australia">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-4">Notification Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-50">Weekly Skill Digest</div>
                        <div className="text-sm text-gray-400">Summary of trending skills in your domain</div>
                      </div>
                      <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-blue-600">
                        <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition"></span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-50">Hot Skill Alerts</div>
                        <div className="text-sm text-gray-400">Immediate alerts for rapidly growing skills</div>
                      </div>
                      <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-blue-600">
                        <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition"></span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-50">Watchlist Updates</div>
                        <div className="text-sm text-gray-400">Changes in your watched skills</div>
                      </div>
                      <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-blue-600">
                        <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition"></span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowSettings(false);
                      // Save settings logic here
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillRadar;