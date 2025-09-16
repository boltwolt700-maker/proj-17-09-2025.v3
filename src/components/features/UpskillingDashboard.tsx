import React, { useState } from 'react';
import { 
  GraduationCap, 
  TrendingUp, 
  Target, 
  Calendar, 
  Award, 
  BarChart3,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  BookOpen,
  Users,
  Globe
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  currentLevel: number;
  targetLevel: number;
  marketDemand: 'high' | 'medium' | 'low';
  trendDirection: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  progress: number;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  nextMilestone: string;
}

interface Sprint {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'active' | 'completed' | 'upcoming';
  progress: number;
  deliverable: string;
  startDate: string;
  endDate: string;
}

const UpskillingDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'paths' | 'sprints' | 'certifications'>('overview');

  // Mock data
  const skills: Skill[] = [
    {
      id: '1',
      name: 'React',
      currentLevel: 85,
      targetLevel: 95,
      marketDemand: 'high',
      trendDirection: 'up',
      lastUpdated: '2024-01-20'
    },
    {
      id: '2',
      name: 'TypeScript',
      currentLevel: 75,
      targetLevel: 90,
      marketDemand: 'high',
      trendDirection: 'up',
      lastUpdated: '2024-01-19'
    },
    {
      id: '3',
      name: 'Node.js',
      currentLevel: 70,
      targetLevel: 85,
      marketDemand: 'medium',
      trendDirection: 'stable',
      lastUpdated: '2024-01-18'
    }
  ];

  const learningPaths: LearningPath[] = [
    {
      id: '1',
      title: 'Full Stack Development Mastery',
      description: 'Complete path from frontend to backend development',
      progress: 65,
      estimatedTime: '3 months',
      difficulty: 'intermediate',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      nextMilestone: 'Complete Node.js Advanced Course'
    },
    {
      id: '2',
      title: 'AI/ML Engineering Track',
      description: 'Machine learning and AI development fundamentals',
      progress: 25,
      estimatedTime: '6 months',
      difficulty: 'advanced',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Science'],
      nextMilestone: 'Start Python for ML Course'
    }
  ];

  const sprints: Sprint[] = [
    {
      id: '1',
      title: 'React Performance Optimization',
      description: 'Learn advanced React optimization techniques',
      duration: '2 weeks',
      status: 'active',
      progress: 60,
      deliverable: 'Optimized React app with performance metrics',
      startDate: '2024-01-15',
      endDate: '2024-01-29'
    },
    {
      id: '2',
      title: 'TypeScript Advanced Patterns',
      description: 'Master advanced TypeScript patterns and best practices',
      duration: '3 weeks',
      status: 'upcoming',
      progress: 0,
      deliverable: 'Type-safe library with comprehensive documentation',
      startDate: '2024-02-01',
      endDate: '2024-02-22'
    }
  ];

  const getSkillLevelColor = (level: number) => {
    if (level >= 80) return 'text-green-600 bg-green-100';
    if (level >= 60) return 'text-blue-600 bg-blue-100';
    if (level >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      case 'stable': return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'upcoming': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-[var(--color-bg)] min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg">
          <GraduationCap className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-[var(--color-text)]">Upskilling Dashboard</h1>
          <p className="text-lg text-[var(--color-text-secondary)] mt-2">Personalized learning paths and progress tracking</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex surface-card rounded-2xl p-2 border border-[var(--color-border)] mb-8 overflow-x-auto shadow-lg">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'overview' ? 'bg-[var(--color-primary)] text-white shadow-lg' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-6 py-3 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'skills' ? 'bg-[var(--color-primary)] text-white shadow-lg' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
          }`}
        >
          Skills Radar
        </button>
        <button
          onClick={() => setActiveTab('paths')}
          className={`px-6 py-3 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'paths' ? 'bg-[var(--color-primary)] text-white shadow-lg' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
          }`}
        >
          Learning Paths
        </button>
        <button
          onClick={() => setActiveTab('sprints')}
          className={`px-6 py-3 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'sprints' ? 'bg-[var(--color-primary)] text-white shadow-lg' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
          }`}
        >
          Learning Sprints
        </button>
        <button
          onClick={() => setActiveTab('certifications')}
          className={`px-6 py-3 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'certifications' ? 'bg-[var(--color-primary)] text-white shadow-lg' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
          }`}
        >
          Certifications
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <div className="glass-card-strong rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6">Learning Progress Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">12</div>
                  <div className="text-[var(--color-text-secondary)]">Skills Tracked</div>
                  <div className="text-green-600 text-sm mt-1">+3 this month</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">65%</div>
                  <div className="text-[var(--color-text-secondary)]">Avg. Progress</div>
                  <div className="text-green-600 text-sm mt-1">+15% improvement</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">8</div>
                  <div className="text-[var(--color-text-secondary)]">Completed Sprints</div>
                  <div className="text-green-600 text-sm mt-1">2 active</div>
                </div>
              </div>

              {/* Active Learning Paths */}
              <div>
                <h4 className="text-xl font-bold text-[var(--color-text)] mb-4">Active Learning Paths</h4>
                <div className="space-y-4">
                  {learningPaths.map((path) => (
                    <div key={path.id} className="surface-card rounded-2xl p-6 border border-[var(--color-border)] hover:glass-card transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h5 className="font-bold text-[var(--color-text)] text-lg mb-2">{path.title}</h5>
                          <p className="text-[var(--color-text-secondary)] text-sm mb-3">{path.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className={`px-3 py-1 rounded-full font-semibold ${
                              path.difficulty === 'advanced' ? 'bg-red-100 text-red-700' :
                              path.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {path.difficulty}
                            </span>
                            <span className="text-[var(--color-text-secondary)]">{path.estimatedTime}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[var(--color-primary)] mb-1">{path.progress}%</div>
                          <div className="text-xs text-[var(--color-text-secondary)]">Complete</div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-[var(--color-surface)] rounded-full h-3 mb-4 shadow-inner">
                        <div 
                          className="bg-gradient-to-r from-[var(--color-primary)] to-purple-600 h-3 rounded-full shadow-lg"
                          style={{ width: `${path.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--color-text-secondary)]">Next: {path.nextMilestone}</span>
                        <button className="btn-glass px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
                          Continue <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Sprints */}
            <div className="glass-card-strong rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6">Current Learning Sprints</h3>
              
              <div className="space-y-4">
                {sprints.filter(s => s.status === 'active').map((sprint) => (
                  <div key={sprint.id} className="surface-card rounded-2xl p-6 border border-[var(--color-border)] hover:glass-card transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h5 className="font-bold text-[var(--color-text)] text-lg">{sprint.title}</h5>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(sprint.status)}`}>
                            {sprint.status}
                          </span>
                        </div>
                        <p className="text-[var(--color-text-secondary)] text-sm mb-3">{sprint.description}</p>
                        <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {sprint.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {sprint.deliverable}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[var(--color-primary)] mb-1">{sprint.progress}%</div>
                        <div className="text-xs text-[var(--color-text-secondary)]">Complete</div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-[var(--color-surface)] rounded-full h-3 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full shadow-lg"
                        style={{ width: `${sprint.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skill Radar Summary */}
            <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Skill Radar</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-text)]">High Demand Skills</span>
                  <span className="text-green-600 font-bold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-text)]">Trending Up</span>
                  <span className="text-blue-600 font-bold">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-text)]">Skills to Learn</span>
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-text)]">Market Alignment</span>
                  <span className="text-green-600 font-bold">87%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary px-4 py-3 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Start New Sprint
                </button>
                <button className="w-full btn-glass px-4 py-3 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Browse Learning Paths
                </button>
                <button className="w-full btn-glass px-4 py-3 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Plan Certifications
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="text-green-700 font-semibold text-sm">Sprint Completed</span>
                  </div>
                  <p className="text-[var(--color-text)] text-sm">Finished React Hooks Mastery</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-700 font-semibold text-sm">Skill Milestone</span>
                  </div>
                  <p className="text-[var(--color-text)] text-sm">TypeScript level increased to 75%</p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-700 font-semibold text-sm">Market Alignment</span>
                  </div>
                  <p className="text-[var(--color-text)] text-sm">Skills now 87% market-aligned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass-card-strong rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6">Your Skills Portfolio</h3>
              
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="surface-card rounded-2xl p-6 border border-[var(--color-border)] hover:glass-card transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <h4 className="font-bold text-[var(--color-text)] text-lg">{skill.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDemandColor(skill.marketDemand)}`}>
                          {skill.marketDemand} demand
                        </span>
                        {getTrendIcon(skill.trendDirection)}
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-[var(--color-primary)]">{skill.currentLevel}%</div>
                        <div className="text-xs text-[var(--color-text-secondary)]">Current Level</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-text-secondary)]">Current</span>
                        <span className="text-[var(--color-text-secondary)]">Target: {skill.targetLevel}%</span>
                      </div>
                      <div className="w-full bg-[var(--color-surface)] rounded-full h-3 shadow-inner">
                        <div 
                          className="bg-gradient-to-r from-[var(--color-primary)] to-purple-600 h-3 rounded-full shadow-lg"
                          style={{ width: `${skill.currentLevel}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Market Insights</h3>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <p className="text-green-700 text-sm font-semibold mb-1">Trending Skill</p>
                  <p className="text-[var(--color-text)] text-sm">AI/ML skills are up 40% in demand</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <p className="text-blue-700 text-sm font-semibold mb-1">Opportunity</p>
                  <p className="text-[var(--color-text)] text-sm">Cloud architecture roles increasing</p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
                  <p className="text-purple-700 text-sm font-semibold mb-1">Recommendation</p>
                  <p className="text-[var(--color-text)] text-sm">Focus on TypeScript advancement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Learning Paths Tab */}
      {activeTab === 'paths' && (
        <div className="glass-card-strong rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6">Learning Paths</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <div key={path.id} className="surface-card rounded-2xl p-6 border border-[var(--color-border)] hover:glass-card transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-[var(--color-text)] text-xl mb-2">{path.title}</h4>
                    <p className="text-[var(--color-text-secondary)] mb-4">{path.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {path.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="w-full bg-[var(--color-surface)] rounded-full h-3 mb-4 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-[var(--color-primary)] to-purple-600 h-3 rounded-full shadow-lg"
                        style={{ width: `${path.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--color-text-secondary)]">{path.progress}% complete</span>
                      <span className="text-sm text-[var(--color-text-secondary)]">{path.estimatedTime} remaining</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full btn-primary px-4 py-3 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105">
                  Continue Learning
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sprints Tab */}
      {activeTab === 'sprints' && (
        <div className="glass-card-strong rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-[var(--color-text)]">Learning Sprints</h3>
            <button className="btn-primary px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Start New Sprint
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sprints.map((sprint) => (
              <div key={sprint.id} className="surface-card rounded-2xl p-6 border border-[var(--color-border)] hover:glass-card transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <h4 className="font-bold text-[var(--color-text)] text-lg">{sprint.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(sprint.status)}`}>
                    {sprint.status}
                  </span>
                </div>
                
                <p className="text-[var(--color-text-secondary)] text-sm mb-4">{sprint.description}</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Duration:</span>
                    <span className="text-[var(--color-text)] font-semibold">{sprint.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Progress:</span>
                    <span className="text-[var(--color-primary)] font-bold">{sprint.progress}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Deliverable:</span>
                    <span className="text-[var(--color-text)] font-semibold text-right">{sprint.deliverable}</span>
                  </div>
                </div>
                
                {sprint.status === 'active' && (
                  <div className="mt-4">
                    <div className="w-full bg-[var(--color-surface)] rounded-full h-2 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full shadow-lg"
                        style={{ width: `${sprint.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <button className={`w-full mt-4 px-4 py-3 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105 ${
                  sprint.status === 'active' ? 'btn-primary' : 'btn-glass'
                }`}>
                  {sprint.status === 'active' ? 'Continue Sprint' : 
                   sprint.status === 'completed' ? 'View Results' : 'Start Sprint'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Tab */}
      {activeTab === 'certifications' && (
        <div className="glass-card-strong rounded-3xl p-8">
          <div className="text-center py-20">
            <Award className="w-20 h-20 text-[var(--color-accent-alt)] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">Certification Planning</h3>
            <p className="text-[var(--color-text-secondary)] text-lg">Track and plan your professional certifications</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpskillingDashboard;