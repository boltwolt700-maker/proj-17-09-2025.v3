import React, { useState } from 'react';
import { 
  Award, 
  Target, 
  Calendar, 
  Clock, 
  Star, 
  TrendingUp, 
  BookOpen, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Search,
  Filter,
  Eye,
  Download,
  Share2,
  Users,
  Zap,
  BarChart3,
  Trophy,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Play,
  Pause,
  Settings,
  Bell,
  DollarSign,
  MapPin,
  Building,
  User,
  Globe,
  Shield,
  Code,
  Database,
  Cloud,
  Cpu,
  Lock,
  Briefcase
} from 'lucide-react';

interface Certification {
  id: string;
  name: string;
  provider: string;
  category: 'cloud' | 'devops' | 'security' | 'programming' | 'project-management' | 'data';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  marketDemand: number;
  salaryImpact: string;
  studyTimeEstimate: string;
  passRate: number;
  renewalPeriod: string;
  prerequisites: string[];
  description: string;
  officialUrl: string;
  cost: string;
  isRecommended?: boolean;
  userStatus?: 'not-started' | 'planning' | 'studying' | 'scheduled' | 'completed' | 'expired';
  progress?: number;
  targetDate?: string;
  studyPlan?: StudyPlan;
}

interface StudyPlan {
  id: string;
  certificationId: string;
  targetDate: string;
  weeklyHours: number;
  currentWeek: number;
  totalWeeks: number;
  phases: StudyPhase[];
  resources: StudyResource[];
  assessments: Assessment[];
}

interface StudyPhase {
  id: string;
  name: string;
  description: string;
  weekStart: number;
  weekEnd: number;
  topics: string[];
  completed: boolean;
}

interface StudyResource {
  id: string;
  title: string;
  type: 'video' | 'documentation' | 'practice' | 'book' | 'course';
  provider: string;
  url: string;
  cost: 'free' | 'paid';
  rating: number;
  duration?: string;
}

interface Assessment {
  id: string;
  name: string;
  type: 'quiz' | 'practice-exam' | 'lab' | 'project';
  questions: number;
  timeLimit: string;
  passingScore: number;
  userScore?: number;
  completed: boolean;
  scheduledDate?: string;
}

const Certifications = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'discover' | 'planning' | 'studying' | 'achievements'>('dashboard');
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);

  // Mock data
  const certifications: Certification[] = [
    {
      id: 'aws-saa-c03',
      name: 'AWS Solutions Architect Associate',
      provider: 'Amazon Web Services',
      category: 'cloud',
      level: 'intermediate',
      marketDemand: 95,
      salaryImpact: '+$15,000 - $25,000',
      studyTimeEstimate: '3-4 months',
      passRate: 72,
      renewalPeriod: '3 years',
      prerequisites: ['Basic AWS knowledge', '1+ years cloud experience'],
      description: 'Validates expertise in designing distributed systems on AWS',
      officialUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
      cost: '$150',
      isRecommended: true,
      userStatus: 'studying',
      progress: 68,
      targetDate: '2024-03-15'
    },
    {
      id: 'azure-az-104',
      name: 'Azure Administrator Associate',
      provider: 'Microsoft',
      category: 'cloud',
      level: 'intermediate',
      marketDemand: 88,
      salaryImpact: '+$12,000 - $20,000',
      studyTimeEstimate: '2-3 months',
      passRate: 65,
      renewalPeriod: '2 years',
      prerequisites: ['Basic Azure knowledge'],
      description: 'Validates skills in implementing, managing, and monitoring Azure environments',
      officialUrl: 'https://docs.microsoft.com/en-us/learn/certifications/azure-administrator/',
      cost: '$165',
      userStatus: 'planning',
      targetDate: '2024-04-20'
    },
    {
      id: 'cka',
      name: 'Certified Kubernetes Administrator',
      provider: 'Cloud Native Computing Foundation',
      category: 'devops',
      level: 'advanced',
      marketDemand: 82,
      salaryImpact: '+$18,000 - $30,000',
      studyTimeEstimate: '4-6 months',
      passRate: 58,
      renewalPeriod: '3 years',
      prerequisites: ['Container experience', 'Linux administration'],
      description: 'Validates skills in Kubernetes cluster administration',
      officialUrl: 'https://www.cncf.io/certification/cka/',
      cost: '$395',
      userStatus: 'not-started'
    },
    {
      id: 'cissp',
      name: 'Certified Information Systems Security Professional',
      provider: 'ISC2',
      category: 'security',
      level: 'expert',
      marketDemand: 91,
      salaryImpact: '+$25,000 - $40,000',
      studyTimeEstimate: '6-8 months',
      passRate: 45,
      renewalPeriod: '3 years',
      prerequisites: ['5 years security experience'],
      description: 'Premier certification for information security professionals',
      officialUrl: 'https://www.isc2.org/Certifications/CISSP',
      cost: '$749',
      userStatus: 'not-started'
    },
    {
      id: 'pmp',
      name: 'Project Management Professional',
      provider: 'Project Management Institute',
      category: 'project-management',
      level: 'advanced',
      marketDemand: 78,
      salaryImpact: '+$20,000 - $35,000',
      studyTimeEstimate: '4-5 months',
      passRate: 61,
      renewalPeriod: '3 years',
      prerequisites: ['4,500 hours project management experience'],
      description: 'Globally recognized project management certification',
      officialUrl: 'https://www.pmi.org/certifications/project-management-pmp',
      cost: '$555',
      userStatus: 'completed'
    }
  ];

  const userCertifications = certifications.filter(cert => 
    cert.userStatus && cert.userStatus !== 'not-started'
  );

  const recommendedCertifications = certifications.filter(cert => cert.isRecommended);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cloud': return Cloud;
      case 'devops': return Cpu;
      case 'security': return Shield;
      case 'programming': return Code;
      case 'project-management': return Briefcase;
      case 'data': return Database;
      default: return Award;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cloud': return 'text-blue-400 bg-blue-500/20';
      case 'devops': return 'text-green-400 bg-green-500/20';
      case 'security': return 'text-red-400 bg-red-500/20';
      case 'programming': return 'text-purple-400 bg-purple-500/20';
      case 'project-management': return 'text-orange-400 bg-orange-500/20';
      case 'data': return 'text-cyan-400 bg-cyan-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'studying': return 'text-blue-400 bg-blue-500/20';
      case 'planning': return 'text-yellow-400 bg-yellow-500/20';
      case 'scheduled': return 'text-purple-400 bg-purple-500/20';
      case 'expired': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-orange-400';
      case 'expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getMarketDemandColor = (demand: number) => {
    if (demand >= 90) return 'text-green-400';
    if (demand >= 80) return 'text-blue-400';
    if (demand >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || cert.category === filterCategory;
    const matchesLevel = filterLevel === 'all' || cert.level === filterLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleStartCertification = (cert: Certification) => {
    setSelectedCertification(cert);
    setShowOnboarding(true);
    setOnboardingStep(1);
  };

  const handleViewDetails = (cert: Certification) => {
    setSelectedCertification(cert);
    setShowCertModal(true);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-50">Certifications</h1>
            <p className="text-gray-400 mt-1">Track and plan your professional certifications</p>
          </div>
        </div>
        
        <button
          onClick={() => setActiveTab('discover')}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          Discover Certifications
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-[#111827] rounded-lg p-1 border border-gray-700 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('discover')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'discover' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Discover
        </button>
        <button
          onClick={() => setActiveTab('planning')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'planning' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          My Roadmap
        </button>
        <button
          onClick={() => setActiveTab('studying')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'studying' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Active Studies
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'achievements' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Achievements
        </button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Certification Progress Overview
              </h3>
              
              {userCertifications.length === 0 ? (
                <div className="text-center py-12">
                  <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">Start Your Certification Journey</h4>
                  <p className="text-gray-400 mb-6">Discover certifications that align with your career goals</p>
                  <button
                    onClick={() => setActiveTab('discover')}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Explore Certifications
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userCertifications.map((cert) => (
                    <div key={cert.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                            {(() => {
                              const Icon = getCategoryIcon(cert.category);
                              return <Icon className="w-6 h-6 text-white" />;
                            })()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-50">{cert.name}</h4>
                            <p className="text-gray-300 text-sm">{cert.provider}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(cert.userStatus!)}`}>
                            {cert.userStatus?.replace('-', ' ')}
                          </span>
                          {cert.targetDate && (
                            <span className="text-gray-400 text-sm">
                              Target: {new Date(cert.targetDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {cert.progress !== undefined && (
                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300 text-sm">Study Progress</span>
                            <span className="text-gray-300 text-sm">{cert.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${cert.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(cert)}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        {cert.userStatus === 'studying' && (
                          <button className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
                            <Play className="w-4 h-4" />
                            Continue Study
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Recommendations */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                AI-Powered Recommendations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedCertifications.slice(0, 4).map((cert) => (
                  <div key={cert.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                          {(() => {
                            const Icon = getCategoryIcon(cert.category);
                            return <Icon className="w-5 h-5 text-white" />;
                          })()}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-50 text-sm">{cert.name}</h4>
                          <p className="text-gray-400 text-xs">{cert.provider}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMarketDemandColor(cert.marketDemand)}`}>
                        {cert.marketDemand}% demand
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-400 mb-3">
                      <div className="flex items-center justify-between">
                        <span>Salary Impact: {cert.salaryImpact}</span>
                        <span className={getLevelColor(cert.level)}>{cert.level}</span>
                      </div>
                      <div className="mt-1">Study Time: {cert.studyTimeEstimate}</div>
                    </div>
                    
                    <button
                      onClick={() => handleStartCertification(cert)}
                      className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Start Planning
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Studies</span>
                  <span className="text-blue-400 font-semibold">
                    {userCertifications.filter(c => c.userStatus === 'studying').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Completed</span>
                  <span className="text-green-400 font-semibold">
                    {userCertifications.filter(c => c.userStatus === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">In Planning</span>
                  <span className="text-yellow-400 font-semibold">
                    {userCertifications.filter(c => c.userStatus === 'planning').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Value</span>
                  <span className="text-purple-400 font-semibold">$45K+</span>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-400" />
                Upcoming Deadlines
              </h3>
              
              <div className="space-y-3">
                {userCertifications
                  .filter(cert => cert.targetDate)
                  .sort((a, b) => new Date(a.targetDate!).getTime() - new Date(b.targetDate!).getTime())
                  .slice(0, 3)
                  .map((cert) => {
                    const daysUntil = Math.ceil((new Date(cert.targetDate!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                    return (
                      <div key={cert.id} className="p-3 bg-[#1F2937] rounded-lg">
                        <h4 className="font-medium text-gray-50 text-sm mb-1">{cert.name}</h4>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">{new Date(cert.targetDate!).toLocaleDateString()}</span>
                          <span className={`font-medium ${
                            daysUntil <= 30 ? 'text-red-400' : 
                            daysUntil <= 60 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {daysUntil} days
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">AI Insights</h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium mb-1">Market Trend</p>
                  <p className="text-gray-300 text-sm">Cloud certifications are in high demand this quarter</p>
                </div>
                
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm font-medium mb-1">Study Tip</p>
                  <p className="text-gray-300 text-sm">You're 68% through AWS SAA - stay consistent!</p>
                </div>
                
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-purple-400 text-sm font-medium mb-1">Next Step</p>
                  <p className="text-gray-300 text-sm">Consider Azure after completing AWS for multi-cloud expertise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discover Tab */}
      {activeTab === 'discover' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-50">Discover Certifications</h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search certifications..."
                      className="pl-10 pr-4 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="cloud">Cloud</option>
                    <option value="devops">DevOps</option>
                    <option value="security">Security</option>
                    <option value="programming">Programming</option>
                    <option value="project-management">Project Management</option>
                    <option value="data">Data</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCertifications.map((cert) => (
                  <div key={cert.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                          {(() => {
                            const Icon = getCategoryIcon(cert.category);
                            return <Icon className="w-5 h-5 text-white" />;
                          })()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-50 text-sm">{cert.name}</h4>
                          <p className="text-gray-400 text-xs">{cert.provider}</p>
                        </div>
                      </div>
                      {cert.isRecommended && (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">
                          Recommended
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 mb-4">
                      <div>
                        <span className="text-gray-300">Market Demand:</span>
                        <div className={`font-medium ${getMarketDemandColor(cert.marketDemand)}`}>
                          {cert.marketDemand}%
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-300">Level:</span>
                        <div className={`font-medium ${getLevelColor(cert.level)}`}>
                          {cert.level}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-300">Study Time:</span>
                        <div className="text-gray-50">{cert.studyTimeEstimate}</div>
                      </div>
                      <div>
                        <span className="text-gray-300">Pass Rate:</span>
                        <div className="text-gray-50">{cert.passRate}%</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-green-400 font-medium text-sm mb-1">Salary Impact</div>
                      <div className="text-gray-300 text-sm">{cert.salaryImpact}</div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(cert)}
                        className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                      >
                        Learn More
                      </button>
                      <button
                        onClick={() => handleStartCertification(cert)}
                        className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors"
                      >
                        Add to Plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Popular This Month</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Cloud className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-50 text-sm">AWS Solutions Architect</h4>
                    <p className="text-gray-400 text-xs">+23% interest</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-50 text-sm">Kubernetes CKA</h4>
                    <p className="text-gray-400 text-xs">+18% interest</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-50 text-sm">CISSP</h4>
                    <p className="text-gray-400 text-xs">+15% interest</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Career Impact</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Certifications increase salary by 15-25% on average</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">87% of hiring managers prefer certified candidates</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Cloud certifications have the highest ROI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Planning Tab */}
      {activeTab === 'planning' && (
        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            My Certification Roadmap
          </h3>
          
          <div className="text-center py-20">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Build Your Roadmap</h4>
            <p className="text-gray-400 mb-6">Create a strategic plan for your certification journey</p>
            <button
              onClick={() => setActiveTab('discover')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Start Planning
            </button>
          </div>
        </div>
      )}

      {/* Studying Tab */}
      {activeTab === 'studying' && (
        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-400" />
            Active Study Sessions
          </h3>
          
          {userCertifications.filter(c => c.userStatus === 'studying').length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">No Active Studies</h4>
              <p className="text-gray-400 mb-6">Start studying for a certification to see your progress here</p>
              <button
                onClick={() => setActiveTab('discover')}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Find Certifications
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {userCertifications
                .filter(c => c.userStatus === 'studying')
                .map((cert) => (
                  <div key={cert.id} className="bg-[#1F2937] rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                          {(() => {
                            const Icon = getCategoryIcon(cert.category);
                            return <Icon className="w-6 h-6 text-white" />;
                          })()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-50">{cert.name}</h4>
                          <p className="text-gray-300 text-sm">{cert.provider}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-indigo-400">{cert.progress}%</div>
                        <div className="text-xs text-gray-400">Complete</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm">Overall Progress</span>
                        <span className="text-gray-300 text-sm">{cert.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-violet-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${cert.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-[#111827] rounded-lg p-3">
                        <div className="text-green-400 text-lg font-bold">85%</div>
                        <div className="text-gray-400 text-xs">Compute Services</div>
                      </div>
                      <div className="bg-[#111827] rounded-lg p-3">
                        <div className="text-yellow-400 text-lg font-bold">72%</div>
                        <div className="text-gray-400 text-xs">Storage & Databases</div>
                      </div>
                      <div className="bg-[#111827] rounded-lg p-3">
                        <div className="text-red-400 text-lg font-bold">45%</div>
                        <div className="text-gray-400 text-xs">Networking & Security</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                        <Play className="w-4 h-4" />
                        Continue Study
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                        <BarChart3 className="w-4 h-4" />
                        Take Practice Test
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                        <Calendar className="w-4 h-4" />
                        Schedule Exam
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Your Certification Achievements
              </h3>
              
              {userCertifications.filter(c => c.userStatus === 'completed').length === 0 ? (
                <div className="text-center py-20">
                  <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">No Certifications Yet</h4>
                  <p className="text-gray-400 mb-6">Complete your first certification to see it here</p>
                  <button
                    onClick={() => setActiveTab('discover')}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Start Your Journey
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {userCertifications
                    .filter(c => c.userStatus === 'completed')
                    .map((cert) => (
                      <div key={cert.id} className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-6 border border-yellow-500/30">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                              <Trophy className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h4 className="text-xl font-semibold text-yellow-400">{cert.name}</h4>
                              <p className="text-gray-300">{cert.provider}</p>
                              <p className="text-gray-400 text-sm">Completed: March 2024</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-[#111827] rounded-lg p-3">
                            <div className="text-green-400 font-bold">Passed</div>
                            <div className="text-gray-400 text-sm">Score: 850/1000</div>
                          </div>
                          <div className="bg-[#111827] rounded-lg p-3">
                            <div className="text-blue-400 font-bold">3 Years</div>
                            <div className="text-gray-400 text-sm">Valid Until 2027</div>
                          </div>
                          <div className="bg-[#111827] rounded-lg p-3">
                            <div className="text-purple-400 font-bold">$20K+</div>
                            <div className="text-gray-400 text-sm">Salary Impact</div>
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
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Achievement Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Certifications</span>
                  <span className="text-yellow-400 font-semibold">
                    {userCertifications.filter(c => c.userStatus === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Study Hours</span>
                  <span className="text-blue-400 font-semibold">247 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Success Rate</span>
                  <span className="text-green-400 font-semibold">100%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Career Value</span>
                  <span className="text-purple-400 font-semibold">$45K+</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Next Milestones</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-blue-400 font-medium text-sm mb-1">Azure Administrator</h4>
                  <p className="text-gray-300 text-xs">Target: April 2024</p>
                </div>
                
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="text-green-400 font-medium text-sm mb-1">Multi-Cloud Expert</h4>
                  <p className="text-gray-300 text-xs">Complete 3 cloud certifications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certification Details Modal */}
      {showCertModal && selectedCertification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">{selectedCertification.name}</h3>
              <button
                onClick={() => setShowCertModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-96">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-4">Certification Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Provider:</span>
                      <span className="text-white">{selectedCertification.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Level:</span>
                      <span className={getLevelColor(selectedCertification.level)}>
                        {selectedCertification.level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Study Time:</span>
                      <span className="text-white">{selectedCertification.studyTimeEstimate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Pass Rate:</span>
                      <span className="text-white">{selectedCertification.passRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Cost:</span>
                      <span className="text-white">{selectedCertification.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Renewal:</span>
                      <span className="text-white">{selectedCertification.renewalPeriod}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-4">Career Impact</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <h5 className="text-green-400 font-medium text-sm mb-1">Salary Impact</h5>
                      <p className="text-gray-300 text-sm">{selectedCertification.salaryImpact}</p>
                    </div>
                    
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <h5 className="text-blue-400 font-medium text-sm mb-1">Market Demand</h5>
                      <p className="text-gray-300 text-sm">{selectedCertification.marketDemand}% of job postings</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-white mb-3">Description</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedCertification.description}</p>
              </div>

              {selectedCertification.prerequisites.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-white mb-3">Prerequisites</h4>
                  <div className="space-y-2">
                    {selectedCertification.prerequisites.map((prereq, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300 text-sm">{prereq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleStartCertification(selectedCertification)}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                  Add to My Plan
                </button>
                <button
                  onClick={() => window.open(selectedCertification.officialUrl, '_blank')}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Official Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Modal */}
      {showOnboarding && selectedCertification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Plan Your Certification</h3>
              <button
                onClick={() => setShowOnboarding(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">{selectedCertification.name}</h4>
                <p className="text-gray-400">Let's create your personalized study plan</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Exam Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Weekly Study Hours
                  </label>
                  <select className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none">
                    <option value="5">5 hours/week</option>
                    <option value="10">10 hours/week</option>
                    <option value="15">15 hours/week</option>
                    <option value="20">20+ hours/week</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Learning Style Preference
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 border border-indigo-500 bg-indigo-500/10 rounded-lg text-indigo-400 text-sm">
                      Video Courses
                    </button>
                    <button className="p-3 border border-gray-600 rounded-lg text-gray-300 text-sm hover:border-gray-500">
                      Practice Labs
                    </button>
                    <button className="p-3 border border-gray-600 rounded-lg text-gray-300 text-sm hover:border-gray-500">
                      Documentation
                    </button>
                    <button className="p-3 border border-gray-600 rounded-lg text-gray-300 text-sm hover:border-gray-500">
                      Practice Exams
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowOnboarding(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowOnboarding(false);
                      setActiveTab('planning');
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Create Study Plan
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

export default Certifications;