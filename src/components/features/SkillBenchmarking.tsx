import React, { useState } from 'react';
import { 
  BarChart2, 
  Target, 
  TrendingUp, 
  Users, 
  Award, 
  Brain,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Eye,
  BookOpen,
  Code,
  Globe,
  Zap,
  Star,
  Clock,
  Filter,
  Search,
  Download,
  Settings,
  Play,
  Plus,
  Lightbulb,
  MapPin,
  Building
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  userLevel: number; // 0-100
  marketDemand: number; // 0-100
  averageLevel: number; // 0-100
  topPerformerLevel: number; // 0-100
  salaryImpact: string;
  trendDirection: 'up' | 'down' | 'stable';
  jobPostings: number;
  gap: number; // Calculated gap
}

interface JobRole {
  id: string;
  title: string;
  category: string;
  alignment: number; // 0-100
  averageSalary: string;
  jobCount: number;
  topSkills: string[];
  location: string;
}

interface Recommendation {
  id: string;
  type: 'skill_gap' | 'trending_skill' | 'career_pivot' | 'project_suggestion';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  effort: 'low' | 'medium' | 'high';
  timeline: string;
  actionSteps: string[];
}

const SkillBenchmarking = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'roles' | 'recommendations' | 'progress'>('overview');
  const [selectedRole, setSelectedRole] = useState<string>('frontend-developer');
  const [selectedLocation, setSelectedLocation] = useState<string>('us-remote');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [userProfile, setUserProfile] = useState({
    role: 'frontend-developer',
    experience: 'intermediate',
    location: 'us-remote',
    goals: ['salary_increase', 'skill_growth']
  });

  // Mock data
  const skills: Skill[] = [
    {
      id: 'react',
      name: 'React',
      category: 'Frontend',
      userLevel: 85,
      marketDemand: 95,
      averageLevel: 70,
      topPerformerLevel: 90,
      salaryImpact: '+$15K',
      trendDirection: 'up',
      jobPostings: 12500,
      gap: 5
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Language',
      userLevel: 75,
      marketDemand: 90,
      averageLevel: 65,
      topPerformerLevel: 85,
      salaryImpact: '+$12K',
      trendDirection: 'up',
      jobPostings: 8900,
      gap: 10
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Backend',
      userLevel: 70,
      marketDemand: 85,
      averageLevel: 68,
      topPerformerLevel: 88,
      salaryImpact: '+$10K',
      trendDirection: 'stable',
      jobPostings: 7200,
      gap: 18
    },
    {
      id: 'aws',
      name: 'AWS',
      category: 'Cloud',
      userLevel: 45,
      marketDemand: 88,
      averageLevel: 60,
      topPerformerLevel: 85,
      salaryImpact: '+$18K',
      trendDirection: 'up',
      jobPostings: 9800,
      gap: 40
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'DevOps',
      userLevel: 55,
      marketDemand: 82,
      averageLevel: 58,
      topPerformerLevel: 80,
      salaryImpact: '+$8K',
      trendDirection: 'up',
      jobPostings: 6500,
      gap: 25
    },
    {
      id: 'graphql',
      name: 'GraphQL',
      category: 'API',
      userLevel: 30,
      marketDemand: 75,
      averageLevel: 45,
      topPerformerLevel: 75,
      salaryImpact: '+$6K',
      trendDirection: 'up',
      jobPostings: 3200,
      gap: 45
    }
  ];

  const jobRoles: JobRole[] = [
    {
      id: 'frontend-developer',
      title: 'Frontend Developer',
      category: 'Development',
      alignment: 78,
      averageSalary: '$85,000 - $120,000',
      jobCount: 15600,
      topSkills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
      location: 'Remote'
    },
    {
      id: 'fullstack-developer',
      title: 'Full-Stack Developer',
      category: 'Development',
      alignment: 65,
      averageSalary: '$90,000 - $135,000',
      jobCount: 18900,
      topSkills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      location: 'Remote'
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      category: 'Infrastructure',
      alignment: 52,
      averageSalary: '$95,000 - $145,000',
      jobCount: 8700,
      topSkills: ['AWS', 'Docker', 'Kubernetes', 'Python'],
      location: 'Remote'
    },
    {
      id: 'backend-developer',
      title: 'Backend Developer',
      category: 'Development',
      alignment: 72,
      averageSalary: '$88,000 - $125,000',
      jobCount: 12300,
      topSkills: ['Node.js', 'Python', 'AWS', 'PostgreSQL'],
      location: 'Remote'
    }
  ];

  const recommendations: Recommendation[] = [
    {
      id: 'aws-learning',
      type: 'skill_gap',
      title: 'Learn AWS Cloud Services',
      description: 'AWS skills are in high demand and could increase your salary by $18K. Your current level is below market average.',
      priority: 'high',
      impact: '+$18K salary potential',
      effort: 'medium',
      timeline: '2-3 months',
      actionSteps: [
        'Complete AWS Fundamentals course',
        'Build a cloud-native project in Bolt.new',
        'Practice with AWS Free Tier',
        'Consider AWS Solutions Architect certification'
      ]
    },
    {
      id: 'docker-containerization',
      type: 'trending_skill',
      title: 'Master Docker & Containerization',
      description: 'Docker adoption is growing rapidly. Closing this gap would improve your DevOps alignment significantly.',
      priority: 'medium',
      impact: '+25% DevOps role alignment',
      effort: 'low',
      timeline: '3-4 weeks',
      actionSteps: [
        'Learn Docker fundamentals',
        'Containerize existing Bolt.new projects',
        'Practice with Docker Compose',
        'Deploy containerized apps'
      ]
    },
    {
      id: 'graphql-api',
      type: 'project_suggestion',
      title: 'Build GraphQL API Project',
      description: 'GraphQL is trending and would complement your React skills perfectly. Build a project to demonstrate this skill.',
      priority: 'medium',
      impact: '+15% frontend role competitiveness',
      effort: 'medium',
      timeline: '2-3 weeks',
      actionSteps: [
        'Learn GraphQL basics',
        'Build a GraphQL API in Bolt.new',
        'Connect React frontend to GraphQL',
        'Add to your portfolio'
      ]
    }
  ];

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate API analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      // Analysis complete - data is already loaded
    } catch (error) {
      console.error('Error running analysis:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getAlignmentColor = (alignment: number) => {
    if (alignment >= 80) return 'text-green-400';
    if (alignment >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGapColor = (gap: number) => {
    if (gap <= 10) return 'bg-green-500';
    if (gap <= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
      case 'stable': return <ArrowRight className="w-4 h-4 text-gray-400" />;
      default: return <ArrowRight className="w-4 h-4 text-gray-400" />;
    }
  };

  const selectedRoleData = jobRoles.find(role => role.id === selectedRole);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <BarChart2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-50">Skill Benchmarking</h1>
            <p className="text-gray-400 mt-1">Compare your skills against market demand and top performers</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSetup(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            <Settings className="w-4 h-4" />
            Setup
          </button>
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Run Analysis
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-[#111827] rounded-lg p-1 border border-gray-700 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'skills' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Skills Analysis
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'roles' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Role Comparison
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'recommendations' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Recommendations
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'progress' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Progress Tracking
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Market Alignment Dashboard */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-50 flex items-center gap-2">
                  <Target className="w-6 h-6 text-indigo-400" />
                  Market Alignment Dashboard
                </h3>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    {jobRoles.map((role) => (
                      <option key={role.id} value={role.id}>{role.title}</option>
                    ))}
                  </select>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    <option value="us-remote">US Remote</option>
                    <option value="us-onsite">US On-site</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                  </select>
                </div>
              </div>
              
              {selectedRoleData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className={`text-5xl font-bold mb-2 ${getAlignmentColor(selectedRoleData.alignment)}`}>
                      {selectedRoleData.alignment}%
                    </div>
                    <div className="text-gray-400">Market Alignment</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {selectedRoleData.alignment >= 80 ? 'Excellent match' : 
                       selectedRoleData.alignment >= 60 ? 'Good match' : 'Needs improvement'}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Average Salary</span>
                      <span className="text-green-400 font-semibold">{selectedRoleData.averageSalary}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Job Openings</span>
                      <span className="text-blue-400 font-semibold">{selectedRoleData.jobCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Location</span>
                      <span className="text-purple-400 font-semibold">{selectedRoleData.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Category</span>
                      <span className="text-indigo-400 font-semibold">{selectedRoleData.category}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Skills Heatmap */}
              <div className="bg-[#1F2937] rounded-lg p-4">
                <h4 className="font-semibold text-gray-50 mb-4">Skills Heatmap</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className={`p-3 rounded-lg border text-center cursor-pointer hover:scale-105 transition-transform ${
                        skill.gap <= 10 ? 'bg-green-500/20 border-green-500/30' :
                        skill.gap <= 30 ? 'bg-yellow-500/20 border-yellow-500/30' :
                        'bg-red-500/20 border-red-500/30'
                      }`}
                      title={`Gap: ${skill.gap} points`}
                    >
                      <div className="font-medium text-gray-50 text-sm mb-1">{skill.name}</div>
                      <div className={`text-xs ${
                        skill.gap <= 10 ? 'text-green-400' :
                        skill.gap <= 30 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {skill.userLevel}% vs {skill.topPerformerLevel}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Skill Gaps */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                Top Skill Gaps to Address
              </h3>
              
              <div className="space-y-4">
                {skills
                  .sort((a, b) => b.gap - a.gap)
                  .slice(0, 3)
                  .map((skill) => (
                    <div key={skill.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-gray-50">{skill.name}</h4>
                          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                            {skill.category}
                          </span>
                          {getTrendIcon(skill.trendDirection)}
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${skill.gap <= 10 ? 'text-green-400' : skill.gap <= 30 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {skill.gap} point gap
                          </div>
                          <div className="text-xs text-gray-400">vs top performers</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Your Level:</span>
                          <div className="text-gray-50 font-medium">{skill.userLevel}%</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Market Average:</span>
                          <div className="text-gray-50 font-medium">{skill.averageLevel}%</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Top Performers:</span>
                          <div className="text-gray-50 font-medium">{skill.topPerformerLevel}%</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-gray-400">Salary Impact:</span>
                          <span className="text-green-400 font-medium ml-2">{skill.salaryImpact}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-400">Job Postings:</span>
                          <span className="text-blue-400 font-medium ml-2">{skill.jobPostings.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Skills Analyzed</span>
                  <span className="text-indigo-400 font-semibold">{skills.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Above Average</span>
                  <span className="text-green-400 font-semibold">
                    {skills.filter(s => s.userLevel > s.averageLevel).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Need Improvement</span>
                  <span className="text-red-400 font-semibold">
                    {skills.filter(s => s.gap > 20).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Trending Skills</span>
                  <span className="text-purple-400 font-semibold">
                    {skills.filter(s => s.trendDirection === 'up').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Market Insights */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Market Insights</h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium mb-1">Hot Skill</p>
                  <p className="text-gray-300 text-sm">AWS demand increased 25% this quarter</p>
                </div>
                
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm font-medium mb-1">Your Strength</p>
                  <p className="text-gray-300 text-sm">React skills are above 85% of developers</p>
                </div>
                
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-purple-400 text-sm font-medium mb-1">Opportunity</p>
                  <p className="text-gray-300 text-sm">GraphQL adoption growing rapidly</p>
                </div>
              </div>
            </div>

            {/* Next Actions */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Recommended Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab('recommendations')}
                  className="w-full text-left p-3 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <div className="font-medium text-red-400 text-sm">High Priority</div>
                  <div className="text-gray-300 text-xs">Learn AWS Cloud Services</div>
                </button>
                
                <button
                  onClick={() => setActiveTab('recommendations')}
                  className="w-full text-left p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition-colors"
                >
                  <div className="font-medium text-yellow-400 text-sm">Medium Priority</div>
                  <div className="text-gray-300 text-xs">Master Docker & Containers</div>
                </button>
                
                <button
                  onClick={() => setActiveTab('recommendations')}
                  className="w-full text-left p-3 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors"
                >
                  <div className="font-medium text-green-400 text-sm">Quick Win</div>
                  <div className="text-gray-300 text-xs">Build GraphQL API project</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skills Analysis Tab */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Detailed Skills Analysis</h3>
              
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl font-semibold text-gray-50">{skill.name}</h4>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          {skill.category}
                        </span>
                        {getTrendIcon(skill.trendDirection)}
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getAlignmentColor(100 - skill.gap)}`}>
                          {skill.userLevel}%
                        </div>
                        <div className="text-xs text-gray-400">Your Level</div>
                      </div>
                    </div>
                    
                    {/* Progress Bars */}
                    <div className="space-y-3 mb-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Your Level</span>
                          <span className="text-gray-50">{skill.userLevel}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.userLevel}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Market Average</span>
                          <span className="text-gray-50">{skill.averageLevel}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.averageLevel}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Top Performers</span>
                          <span className="text-gray-50">{skill.topPerformerLevel}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.topPerformerLevel}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Market Demand:</span>
                        <div className="text-gray-50 font-medium">{skill.marketDemand}%</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Salary Impact:</span>
                        <div className="text-green-400 font-medium">{skill.salaryImpact}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Job Postings:</span>
                        <div className="text-blue-400 font-medium">{skill.jobPostings.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Skill Categories</h3>
              <div className="space-y-3">
                {['Frontend', 'Backend', 'Cloud', 'DevOps', 'Language', 'API'].map((category) => {
                  const categorySkills = skills.filter(s => s.category === category);
                  const avgLevel = categorySkills.reduce((sum, s) => sum + s.userLevel, 0) / categorySkills.length;
                  
                  return (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-gray-300">{category}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getGapColor(100 - avgLevel)}`}
                            style={{ width: `${avgLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-50 text-sm font-medium">{Math.round(avgLevel)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Trending Skills</h3>
              <div className="space-y-3">
                {skills
                  .filter(s => s.trendDirection === 'up')
                  .slice(0, 4)
                  .map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300 text-sm">{skill.name}</span>
                      </div>
                      <span className="text-green-400 text-sm">{skill.salaryImpact}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Comparison Tab */}
      {activeTab === 'roles' && (
        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-gray-50 mb-6">Role Alignment Comparison</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobRoles.map((role) => (
              <div
                key={role.id}
                className={`p-6 rounded-xl border cursor-pointer transition-all duration-200 ${
                  selectedRole === role.id
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="text-center mb-4">
                  <div className={`text-3xl font-bold mb-2 ${getAlignmentColor(role.alignment)}`}>
                    {role.alignment}%
                  </div>
                  <div className="text-gray-400 text-sm">Alignment</div>
                </div>
                
                <h4 className={`font-semibold mb-2 text-center ${
                  selectedRole === role.id ? 'text-indigo-400' : 'text-gray-50'
                }`}>
                  {role.title}
                </h4>
                
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    <span>{role.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{role.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    <span>{role.jobCount.toLocaleString()} jobs</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="text-xs text-gray-400 mb-1">Salary Range:</div>
                  <div className="text-green-400 font-medium text-sm">{role.averageSalary}</div>
                </div>
                
                <div className="mt-3">
                  <div className="text-xs text-gray-400 mb-2">Top Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    {role.topSkills.slice(0, 3).map((skill) => (
                      <span key={skill} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                AI-Powered Improvement Recommendations
              </h3>
              
              <div className="space-y-6">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="bg-[#1F2937] rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-semibold text-gray-50">{rec.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                            {rec.priority} priority
                          </span>
                        </div>
                        <p className="text-gray-300 mb-4">{rec.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <span className="text-gray-400 text-sm">Impact:</span>
                            <div className="text-green-400 font-medium">{rec.impact}</div>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm">Effort:</span>
                            <div className={`font-medium ${getEffortColor(rec.effort)}`}>{rec.effort}</div>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm">Timeline:</span>
                            <div className="text-blue-400 font-medium">{rec.timeline}</div>
                          </div>
                        </div>
                        
                        <div className="bg-[#111827] rounded-lg p-4">
                          <h5 className="text-sm font-medium text-gray-50 mb-3">Action Steps:</h5>
                          <div className="space-y-2">
                            {rec.actionSteps.map((step, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                  {index + 1}
                                </div>
                                <span className="text-gray-300 text-sm">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                        <Play className="w-4 h-4" />
                        Start Learning
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
                        <BookOpen className="w-4 h-4" />
                        Learn More
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                        <Plus className="w-4 h-4" />
                        Add to Goals
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Impact vs Effort</h3>
              <div className="space-y-3">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="p-3 bg-[#1F2937] rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-50 text-sm">{rec.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(rec.priority)}`}>
                        {rec.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Effort: {rec.effort}</span>
                      <span className="text-green-400">{rec.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Learning Resources</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  AWS Documentation
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Docker Tutorial Series
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  GraphQL Course
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  TypeScript Deep Dive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Tracking Tab */}
      {activeTab === 'progress' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                Skill Development Progress
              </h3>
              
              <div className="space-y-6">
                <div className="bg-[#1F2937] rounded-lg p-4">
                  <h4 className="font-semibold text-gray-50 mb-4">30-Day Progress Overview</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">+12</div>
                      <div className="text-gray-400 text-sm">Points Gained</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">3</div>
                      <div className="text-gray-400 text-sm">Skills Improved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">85%</div>
                      <div className="text-gray-400 text-sm">Goal Progress</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-50">Recent Improvements</h4>
                  {skills
                    .filter(s => s.userLevel > s.averageLevel)
                    .slice(0, 3)
                    .map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <div>
                            <h5 className="font-medium text-gray-50">{skill.name}</h5>
                            <p className="text-gray-400 text-sm">Improved to {skill.userLevel}%</p>
                          </div>
                        </div>
                        <div className="text-green-400 font-medium">+{skill.userLevel - skill.averageLevel} pts</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Current Goals</h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-blue-400 font-medium text-sm mb-1">AWS Mastery</h4>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <p className="text-gray-300 text-xs">45% complete • 6 weeks remaining</p>
                </div>
                
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <h4 className="text-yellow-400 font-medium text-sm mb-1">Docker Proficiency</h4>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <p className="text-gray-300 text-xs">70% complete • 2 weeks remaining</p>
                </div>
              </div>
              
              <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                <Plus className="w-4 h-4" />
                Set New Goal
              </button>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Weekly Tracking</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Study Hours</span>
                  <span className="text-indigo-400 font-semibold">8.5 hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Projects Completed</span>
                  <span className="text-green-400 font-semibold">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Skills Practiced</span>
                  <span className="text-purple-400 font-semibold">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Streak</span>
                  <span className="text-yellow-400 font-semibold">12 days</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Export & Share</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Skills Report
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Progress Data
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Share on LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Setup Modal */}
      {showSetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Benchmarking Setup</h3>
              <button
                onClick={() => setShowSetup(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Target Role</label>
                  <select
                    value={userProfile.role}
                    onChange={(e) => setUserProfile({...userProfile, role: e.target.value})}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    {jobRoles.map((role) => (
                      <option key={role.id} value={role.id}>{role.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level</label>
                  <select
                    value={userProfile.experience}
                    onChange={(e) => setUserProfile({...userProfile, experience: e.target.value})}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    <option value="junior">Junior (0-2 years)</option>
                    <option value="intermediate">Intermediate (2-5 years)</option>
                    <option value="senior">Senior (5+ years)</option>
                    <option value="lead">Lead/Principal (8+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location/Market</label>
                  <select
                    value={userProfile.location}
                    onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    <option value="us-remote">US Remote</option>
                    <option value="us-onsite">US On-site</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="global">Global</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Career Goals</label>
                  <div className="space-y-2">
                    {[
                      { id: 'salary_increase', label: 'Increase Salary' },
                      { id: 'skill_growth', label: 'Skill Development' },
                      { id: 'career_change', label: 'Career Change' },
                      { id: 'leadership', label: 'Leadership Role' }
                    ].map((goal) => (
                      <label key={goal.id} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={userProfile.goals.includes(goal.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setUserProfile({
                                ...userProfile,
                                goals: [...userProfile.goals, goal.id]
                              });
                            } else {
                              setUserProfile({
                                ...userProfile,
                                goals: userProfile.goals.filter(g => g !== goal.id)
                              });
                            }
                          }}
                          className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                        />
                        <span className="text-gray-300">{goal.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSetup(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowSetup(false);
                      runAnalysis();
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Save & Analyze
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

export default SkillBenchmarking;