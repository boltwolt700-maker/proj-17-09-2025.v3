import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  TrendingUp, 
  Target, 
  Calendar, 
  Award, 
  BarChart3,
  Zap,
  Brain,
  Users,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  Plus,
  Eye,
  Share2,
  Filter,
  Search,
  Settings,
  Sparkles,
  Trophy,
  Flame,
  BookOpen,
  Code,
  Globe,
  Lightbulb,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  X
} from 'lucide-react';

interface SkillAlignment {
  overall: number;
  frontend: number;
  backend: number;
  devops: number;
  mobile: number;
  data: number;
}

interface LearningSprint {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  technologies: string[];
  nextMilestone: string;
  daysRemaining: number;
  totalActivities: number;
  completedActivities: number;
}

interface Recommendation {
  id: string;
  type: 'skill' | 'certification' | 'project' | 'trend';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  marketDemand: number;
  salaryImpact: string;
  timeEstimate: string;
  trending: boolean;
}

interface UserStats {
  learningStreak: number;
  weeklyGoalsMet: number;
  totalWeeklyGoals: number;
  skillsImproved: number;
  certificationsEarned: number;
  projectsCompleted: number;
  studyHoursThisWeek: number;
  averageSessionTime: number;
}

const UpskillingDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'sprints' | 'community' | 'analytics'>('overview');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [learningGoals, setLearningGoals] = useState<string[]>([]);
  const [timeCommitment, setTimeCommitment] = useState(2);
  const [learningStyle, setLearningStyle] = useState('');

  // Mock data
  const skillAlignment: SkillAlignment = {
    overall: 72,
    frontend: 85,
    backend: 68,
    devops: 45,
    mobile: 30,
    data: 55
  };

  const userStats: UserStats = {
    learningStreak: 7,
    weeklyGoalsMet: 5,
    totalWeeklyGoals: 7,
    skillsImproved: 3,
    certificationsEarned: 2,
    projectsCompleted: 8,
    studyHoursThisWeek: 12,
    averageSessionTime: 35
  };

  const activeSprints: LearningSprint[] = [
    {
      id: '1',
      title: 'React Advanced Patterns',
      description: 'Master advanced React concepts including hooks, context, and performance optimization',
      duration: '3 weeks',
      progress: 65,
      status: 'active',
      difficulty: 'intermediate',
      technologies: ['React', 'TypeScript', 'Testing'],
      nextMilestone: 'Build custom hooks',
      daysRemaining: 8,
      totalActivities: 15,
      completedActivities: 10
    },
    {
      id: '2',
      title: 'Node.js & Express Mastery',
      description: 'Build scalable backend applications with Node.js and Express',
      duration: '4 weeks',
      progress: 30,
      status: 'active',
      difficulty: 'beginner',
      technologies: ['Node.js', 'Express', 'MongoDB'],
      nextMilestone: 'Create REST API',
      daysRemaining: 18,
      totalActivities: 20,
      completedActivities: 6
    },
    {
      id: '3',
      title: 'DevOps Fundamentals',
      description: 'Learn Docker, CI/CD, and cloud deployment strategies',
      duration: '6 weeks',
      progress: 15,
      status: 'paused',
      difficulty: 'intermediate',
      technologies: ['Docker', 'AWS', 'CI/CD'],
      nextMilestone: 'Set up Docker environment',
      daysRemaining: 35,
      totalActivities: 25,
      completedActivities: 4
    }
  ];

  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'skill',
      title: 'Learn TypeScript',
      description: 'TypeScript demand increased 40% this quarter. High ROI skill for React developers.',
      impact: 'high',
      effort: 'medium',
      marketDemand: 92,
      salaryImpact: '+$8K average',
      timeEstimate: '2-3 weeks',
      trending: true
    },
    {
      id: '2',
      type: 'certification',
      title: 'AWS Cloud Practitioner',
      description: 'Entry-level cloud certification with strong market recognition.',
      impact: 'high',
      effort: 'low',
      marketDemand: 88,
      salaryImpact: '+$12K average',
      timeEstimate: '4-6 weeks',
      trending: false
    },
    {
      id: '3',
      type: 'project',
      title: 'Build a Full-Stack E-commerce App',
      description: 'Showcase end-to-end development skills with a portfolio project.',
      impact: 'medium',
      effort: 'high',
      marketDemand: 85,
      salaryImpact: 'Portfolio boost',
      timeEstimate: '6-8 weeks',
      trending: false
    },
    {
      id: '4',
      type: 'trend',
      title: 'Explore AI/ML Integration',
      description: 'AI integration skills are becoming essential for modern developers.',
      impact: 'high',
      effort: 'high',
      marketDemand: 95,
      salaryImpact: '+$15K average',
      timeEstimate: '8-12 weeks',
      trending: true
    }
  ];

  const skillCategories = [
    { name: 'Frontend', score: skillAlignment.frontend, color: 'text-blue-400' },
    { name: 'Backend', score: skillAlignment.backend, color: 'text-green-400' },
    { name: 'DevOps', score: skillAlignment.devops, color: 'text-orange-400' },
    { name: 'Mobile', score: skillAlignment.mobile, color: 'text-purple-400' },
    { name: 'Data', score: skillAlignment.data, color: 'text-pink-400' }
  ];

  const roles = [
    'Frontend Developer',
    'Backend Developer',
    'Full-Stack Developer',
    'DevOps Engineer',
    'Mobile Developer',
    'Data Engineer',
    'Software Architect',
    'Product Manager'
  ];

  const goals = [
    'Get promoted to senior role',
    'Switch to a new technology stack',
    'Prepare for job interviews',
    'Build a portfolio project',
    'Learn emerging technologies',
    'Improve code quality',
    'Understand system design',
    'Master testing practices'
  ];

  const learningStyles = [
    { id: 'project-based', name: 'Project-Based Learning', description: 'Learn by building real applications' },
    { id: 'tutorial-focused', name: 'Tutorial-Focused', description: 'Follow structured courses and tutorials' },
    { id: 'documentation', name: 'Documentation Reading', description: 'Learn from official docs and guides' },
    { id: 'community', name: 'Community Learning', description: 'Learn through discussions and peer interaction' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'completed': return 'text-blue-400 bg-blue-500/20';
      case 'paused': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const toggleGoal = (goal: string) => {
    setLearningGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleStartOnboarding = () => {
    setShowOnboarding(true);
    setOnboardingStep(1);
  };

  const handleNextStep = () => {
    if (onboardingStep < 5) {
      setOnboardingStep(onboardingStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

  const handleFinishOnboarding = () => {
    setShowOnboarding(false);
    // Here you would typically save the user's preferences and generate their learning path
    alert('Learning path created! Your personalized dashboard is ready.');
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-50">Upskilling Dashboard</h1>
            <p className="text-gray-400 mt-1">Your personalized learning journey and skill development center</p>
          </div>
        </div>
        
        {!showOnboarding && (
          <button
            onClick={handleStartOnboarding}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            Create Learning Path
          </button>
        )}
      </div>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Create Your Learning Path</h3>
              <button
                onClick={() => setShowOnboarding(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(onboardingStep / 5) * 100}%` }}
                ></div>
              </div>

              {/* Step 1: Role Selection */}
              {onboardingStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-white mb-2">What's your target role?</h4>
                    <p className="text-gray-400">This helps us customize your learning path</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {roles.map((role) => (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          selectedRole === role
                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                            : 'border-gray-600 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Experience Level */}
              {onboardingStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-white mb-2">What's your experience level?</h4>
                    <p className="text-gray-400">Help us set the right difficulty level</p>
                  </div>
                  
                  <div className="space-y-3">
                    {['Beginner (0-1 years)', 'Intermediate (2-4 years)', 'Advanced (5+ years)'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setExperienceLevel(level)}
                        className={`w-full p-4 rounded-lg border text-left transition-all ${
                          experienceLevel === level
                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                            : 'border-gray-600 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        <div className="font-medium">{level.split(' ')[0]}</div>
                        <div className="text-sm text-gray-400">{level}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Learning Goals */}
              {onboardingStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-white mb-2">What are your learning goals?</h4>
                    <p className="text-gray-400">Select all that apply (you can choose multiple)</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {goals.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          learningGoals.includes(goal)
                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                            : 'border-gray-600 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{goal}</span>
                          {learningGoals.includes(goal) && (
                            <CheckCircle className="w-5 h-5 text-indigo-400" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Time Commitment */}
              {onboardingStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-white mb-2">How much time can you dedicate?</h4>
                    <p className="text-gray-400">We'll create a realistic schedule for you</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Hours per day: {timeCommitment} hours
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="8"
                        step="0.5"
                        value={timeCommitment}
                        onChange={(e) => setTimeCommitment(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>30 min</span>
                        <span>8 hours</span>
                      </div>
                    </div>

                    <div className="bg-[#1F2937] rounded-lg p-4">
                      <h5 className="font-medium text-white mb-2">Estimated Timeline</h5>
                      <div className="text-sm text-gray-300">
                        <p>With {timeCommitment} hours per day, you can:</p>
                        <ul className="mt-2 space-y-1">
                          <li>• Complete a skill sprint in {Math.ceil(20 / (timeCommitment * 7))} weeks</li>
                          <li>• Build {Math.floor(timeCommitment * 2)} portfolio projects per month</li>
                          <li>• Achieve certification readiness in {Math.ceil(40 / (timeCommitment * 7))} weeks</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Learning Style */}
              {onboardingStep === 5 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-white mb-2">How do you prefer to learn?</h4>
                    <p className="text-gray-400">We'll tailor your experience accordingly</p>
                  </div>
                  
                  <div className="space-y-3">
                    {learningStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setLearningStyle(style.id)}
                        className={`w-full p-4 rounded-lg border text-left transition-all ${
                          learningStyle === style.id
                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                            : 'border-gray-600 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        <div className="font-medium mb-1">{style.name}</div>
                        <div className="text-sm text-gray-400">{style.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevStep}
                  disabled={onboardingStep === 1}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors disabled:opacity-50"
                >
                  Back
                </button>
                
                {onboardingStep < 5 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={
                      (onboardingStep === 1 && !selectedRole) ||
                      (onboardingStep === 2 && !experienceLevel) ||
                      (onboardingStep === 3 && learningGoals.length === 0) ||
                      (onboardingStep === 5 && !learningStyle)
                    }
                    className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleFinishOnboarding}
                    disabled={!learningStyle}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    Create Learning Path
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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
          Skills Radar
        </button>
        <button
          onClick={() => setActiveTab('sprints')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'sprints' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Learning Sprints
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'community' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Community
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'analytics' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Analytics
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Skill Alignment Widget */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-indigo-400" />
                Market Skill Alignment
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className={`text-5xl font-bold mb-2 ${getScoreColor(skillAlignment.overall)}`}>
                    {skillAlignment.overall}%
                  </div>
                  <div className="text-gray-400">Overall Alignment</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {selectedRole || 'Full-Stack Developer'} roles
                  </div>
                </div>

                <div className="space-y-3">
                  {skillCategories.map((category) => (
                    <div key={category.name} className="flex justify-between items-center">
                      <span className="text-gray-300">{category.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-700 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${
                              category.score >= 80 ? 'bg-green-400' :
                              category.score >= 60 ? 'bg-yellow-400' :
                              'bg-red-400'
                            }`}
                            style={{ width: `${category.score}%` }}
                          ></div>
                        </div>
                        <span className={`font-semibold text-sm ${category.color}`}>
                          {category.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                View Detailed Skills Analysis
              </button>
            </div>

            {/* Active Learning Sprints */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-50 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  Active Learning Sprints
                </h3>
                <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                  View All Sprints
                </button>
              </div>
              
              <div className="space-y-4">
                {activeSprints.filter(sprint => sprint.status === 'active').map((sprint) => (
                  <div key={sprint.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-50">{sprint.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(sprint.difficulty)}`}>
                            {sprint.difficulty}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sprint.status)}`}>
                            {sprint.status}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{sprint.description}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {sprint.daysRemaining} days left
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {sprint.completedActivities}/{sprint.totalActivities} activities
                          </span>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">Progress</span>
                            <span className="text-gray-300">{sprint.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${sprint.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {sprint.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="bg-[#111827] rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-orange-400" />
                            <span className="text-orange-400 font-medium text-sm">Next Milestone:</span>
                          </div>
                          <p className="text-gray-300 text-sm mt-1">{sprint.nextMilestone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                        <Play className="w-4 h-4" />
                        Continue Learning
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Brain className="w-6 h-6 text-purple-400" />
                AI-Powered Recommendations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.slice(0, 4).map((rec) => (
                  <div key={rec.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-50 text-sm">{rec.title}</h4>
                          {rec.trending && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs">
                              <TrendingUp className="w-3 h-3" />
                              Trending
                            </div>
                          )}
                        </div>
                        <p className="text-gray-300 text-xs mb-3">{rec.description}</p>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                          <div>
                            <span className="text-gray-400">Impact:</span>
                            <span className={`ml-1 font-medium ${getImpactColor(rec.impact).split(' ')[0]}`}>
                              {rec.impact}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Effort:</span>
                            <span className={`ml-1 font-medium ${getEffortColor(rec.effort)}`}>
                              {rec.effort}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Demand:</span>
                            <span className="text-indigo-400 ml-1 font-medium">{rec.marketDemand}%</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Time:</span>
                            <span className="text-gray-300 ml-1">{rec.timeEstimate}</span>
                          </div>
                        </div>

                        <div className="text-xs text-green-400 font-medium mb-3">
                          {rec.salaryImpact}
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                      Start Learning
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Stats */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Learning Stats
              </h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Flame className="w-6 h-6 text-orange-400" />
                    <span className="text-2xl font-bold text-orange-400">{userStats.learningStreak}</span>
                  </div>
                  <div className="text-gray-400 text-sm">Day Learning Streak</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Weekly Goals</span>
                    <span className="text-green-400 font-semibold">
                      {userStats.weeklyGoalsMet}/{userStats.totalWeeklyGoals}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Skills Improved</span>
                    <span className="text-blue-400 font-semibold">{userStats.skillsImproved}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Certifications</span>
                    <span className="text-purple-400 font-semibold">{userStats.certificationsEarned}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Projects Built</span>
                    <span className="text-indigo-400 font-semibold">{userStats.projectsCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Study Hours</span>
                    <span className="text-green-400 font-semibold">{userStats.studyHoursThisWeek}h this week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Activities */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Today's Activities
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div className="flex-1">
                    <div className="font-medium text-green-400 text-sm">React Hooks Deep Dive</div>
                    <div className="text-xs text-gray-400">Completed • 45 minutes</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <Play className="w-5 h-5 text-blue-400" />
                  <div className="flex-1">
                    <div className="font-medium text-blue-400 text-sm">Build Custom Hook Project</div>
                    <div className="text-xs text-gray-400">In Progress • 30 min remaining</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-500/10 border border-gray-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-400 text-sm">React Testing Patterns</div>
                    <div className="text-xs text-gray-400">Scheduled • 6:00 PM</div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                Continue Learning Session
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button className="flex items-center gap-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors">
                  <Plus className="w-5 h-5 text-purple-400" />
                  <div className="text-left">
                    <div className="font-medium text-purple-400 text-sm">Start New Sprint</div>
                    <div className="text-xs text-gray-400">Create focused learning goal</div>
                  </div>
                </button>
                
                <button className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors">
                  <Award className="w-5 h-5 text-blue-400" />
                  <div className="text-left">
                    <div className="font-medium text-blue-400 text-sm">Browse Certifications</div>
                    <div className="text-xs text-gray-400">Explore certification paths</div>
                  </div>
                </button>
                
                <button className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors">
                  <Users className="w-5 h-5 text-green-400" />
                  <div className="text-left">
                    <div className="font-medium text-green-400 text-sm">Join Study Group</div>
                    <div className="text-xs text-gray-400">Learn with peers</div>
                  </div>
                </button>
                
                <button className="flex items-center gap-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg hover:bg-orange-500/20 transition-colors">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  <div className="text-left">
                    <div className="font-medium text-orange-400 text-sm">Skill Assessment</div>
                    <div className="text-xs text-gray-400">Test your knowledge</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Weekly Progress */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">This Week's Progress</h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">
                    {Math.round((userStats.weeklyGoalsMet / userStats.totalWeeklyGoals) * 100)}%
                  </div>
                  <div className="text-gray-400 text-sm">Goals Completed</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(userStats.weeklyGoalsMet / userStats.totalWeeklyGoals) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Study Time</span>
                    <span className="text-blue-400">{userStats.studyHoursThisWeek}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Avg. Session</span>
                    <span className="text-purple-400">{userStats.averageSessionTime}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Streak</span>
                    <span className="text-orange-400">{userStats.learningStreak} days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Skills */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                Trending This Week
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#1F2937] rounded-lg">
                  <div>
                    <div className="font-medium text-gray-50 text-sm">Next.js 14</div>
                    <div className="text-xs text-gray-400">+25% job postings</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Hot</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-[#1F2937] rounded-lg">
                  <div>
                    <div className="font-medium text-gray-50 text-sm">Rust</div>
                    <div className="text-xs text-gray-400">+18% demand</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm">Rising</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-[#1F2937] rounded-lg">
                  <div>
                    <div className="font-medium text-gray-50 text-sm">AI/ML APIs</div>
                    <div className="text-xs text-gray-400">+35% mentions</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400 text-sm">New</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Recent Achievements
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="font-medium text-yellow-400 text-sm">React Expert</div>
                    <div className="text-xs text-gray-400">Completed advanced patterns sprint</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="font-medium text-green-400 text-sm">7-Day Streak</div>
                    <div className="text-xs text-gray-400">Consistent daily learning</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <Code className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="font-medium text-blue-400 text-sm">Portfolio Project</div>
                    <div className="text-xs text-gray-400">Built full-stack todo app</div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                View All Achievements
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-indigo-400" />
                Skills Radar & Market Alignment
              </h3>
              
              {/* Skills Radar Visualization */}
              <div className="relative mb-8">
                <div className="w-80 h-80 mx-auto relative">
                  {/* Radar Chart Background */}
                  <div className="absolute inset-0 rounded-full border-2 border-gray-600"></div>
                  <div className="absolute inset-4 rounded-full border border-gray-700"></div>
                  <div className="absolute inset-8 rounded-full border border-gray-700"></div>
                  <div className="absolute inset-12 rounded-full border border-gray-700"></div>
                  
                  {/* Skill Points */}
                  {skillCategories.map((category, index) => {
                    const angle = (index * 72) - 90; // 360/5 = 72 degrees between points
                    const radius = (category.score / 100) * 140; // Max radius of 140px
                    const x = Math.cos(angle * Math.PI / 180) * radius + 160;
                    const y = Math.sin(angle * Math.PI / 180) * radius + 160;
                    
                    return (
                      <div
                        key={category.name}
                        className="absolute w-4 h-4 rounded-full bg-indigo-500 border-2 border-white transform -translate-x-2 -translate-y-2"
                        style={{ left: x, top: y }}
                        title={`${category.name}: ${category.score}%`}
                      ></div>
                    );
                  })}
                  
                  {/* Center Score */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(skillAlignment.overall)}`}>
                        {skillAlignment.overall}%
                      </div>
                      <div className="text-xs text-gray-400">Market Aligned</div>
                    </div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                  {skillCategories.map((category) => (
                    <div key={category.name} className="text-center">
                      <div className={`font-medium text-sm ${category.color}`}>{category.name}</div>
                      <div className="text-xs text-gray-400">{category.score}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Breakdown */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-50">Detailed Skill Analysis</h4>
                {skillCategories.map((category) => (
                  <div key={category.name} className="bg-[#1F2937] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-50">{category.name}</span>
                      <span className={`font-semibold ${category.color}`}>{category.score}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full ${
                          category.score >= 80 ? 'bg-green-400' :
                          category.score >= 60 ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`}
                        style={{ width: `${category.score}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {category.score >= 80 ? 'Strong alignment with market demand' :
                       category.score >= 60 ? 'Good foundation, room for improvement' :
                       'Significant opportunity for growth'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Market Insights</h3>
              <div className="space-y-4">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="text-green-400 font-medium text-sm mb-1">Strength</h4>
                  <p className="text-gray-300 text-sm">Your frontend skills are above market average</p>
                </div>
                
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h4 className="text-red-400 font-medium text-sm mb-1">Opportunity</h4>
                  <p className="text-gray-300 text-sm">DevOps skills have high demand and salary impact</p>
                </div>
                
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-blue-400 font-medium text-sm mb-1">Trending</h4>
                  <p className="text-gray-300 text-sm">AI/ML integration skills are rapidly growing</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Skill Improvement Goals</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">DevOps Fundamentals</span>
                  <span className="text-orange-400 text-sm">In Progress</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">TypeScript Mastery</span>
                  <span className="text-blue-400 text-sm">Planned</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Testing Best Practices</span>
                  <span className="text-green-400 text-sm">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sprints Tab */}
      {activeTab === 'sprints' && (
        <div className="space-y-6">
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-50 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                Learning Sprints Management
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                <Plus className="w-4 h-4" />
                New Sprint
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeSprints.map((sprint) => (
                <div key={sprint.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-50">{sprint.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sprint.status)}`}>
                          {sprint.status}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{sprint.description}</p>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {sprint.duration}
                        </span>
                        <span className={`flex items-center gap-1 ${getDifficultyColor(sprint.difficulty)}`}>
                          <Target className="w-3 h-3" />
                          {sprint.difficulty}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Progress</span>
                          <span className="text-gray-300">{sprint.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${sprint.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {sprint.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="text-xs text-gray-400 mb-3">
                        Next: {sprint.nextMilestone}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {sprint.status === 'active' ? (
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                        Continue
                      </button>
                    ) : sprint.status === 'paused' ? (
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                        Resume
                      </button>
                    ) : (
                      <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                        View
                      </button>
                    )}
                    <button className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Community Tab */}
      {activeTab === 'community' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-green-400" />
                Learning Community
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <h4 className="font-semibold text-gray-50 mb-2">React Study Group</h4>
                    <p className="text-gray-300 text-sm mb-3">Weekly discussions on React patterns and best practices</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">24 members</span>
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
                        Join
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <h4 className="font-semibold text-gray-50 mb-2">DevOps Beginners</h4>
                    <p className="text-gray-300 text-sm mb-3">Learn Docker, CI/CD, and cloud deployment together</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">18 members</span>
                      <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs">
                        Joined
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-50 mb-4">Recent Community Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-[#1F2937] rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">JS</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-50 text-sm">Sarah shared a React project</div>
                        <div className="text-xs text-gray-400">Built a weather app with hooks • 2 hours ago</div>
                      </div>
                      <button className="text-blue-400 hover:text-blue-300 text-sm">View</button>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-[#1F2937] rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">MK</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-50 text-sm">Mike completed TypeScript sprint</div>
                        <div className="text-xs text-gray-400">Earned TypeScript Expert badge • 5 hours ago</div>
                      </div>
                      <button className="text-green-400 hover:text-green-300 text-sm">Congrats</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Your Study Groups</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="text-green-400 font-medium text-sm">DevOps Beginners</h4>
                  <p className="text-gray-300 text-xs">Next session: Tomorrow 7 PM</p>
                </div>
                
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-blue-400 font-medium text-sm">React Advanced</h4>
                  <p className="text-gray-300 text-xs">Weekly code review: Friday</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Leaderboard</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">Sarah C.</span>
                  </div>
                  <span className="text-yellow-400 text-sm">2,450 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">2</span>
                    </div>
                    <span className="text-gray-300 text-sm">Mike R.</span>
                  </div>
                  <span className="text-gray-300 text-sm">2,180 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">3</span>
                    </div>
                    <span className="text-indigo-400 text-sm">You</span>
                  </div>
                  <span className="text-indigo-400 text-sm">1,890 XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-green-400" />
                Learning Analytics & Progress Trends
              </h3>
              
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Interactive learning analytics charts coming soon</p>
                  <p className="text-gray-500 text-sm mt-2">Track skill progression, study time, and achievement trends</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Learning Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Study Time</span>
                  <span className="text-blue-400 font-semibold">47h this month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Skills Improved</span>
                  <span className="text-green-400 font-semibold">+5 this month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Projects Completed</span>
                  <span className="text-purple-400 font-semibold">8 total</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Certifications</span>
                  <span className="text-yellow-400 font-semibold">2 earned</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Performance Insights</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="text-green-400 font-medium text-sm mb-1">Strong Momentum</h4>
                  <p className="text-gray-300 text-sm">Your learning consistency is excellent</p>
                </div>
                
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-blue-400 font-medium text-sm mb-1">Optimal Schedule</h4>
                  <p className="text-gray-300 text-sm">You learn best during evening sessions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpskillingDashboard;