import React, { useState } from 'react';
import { 
  BookOpen, 
  Target, 
  Clock, 
  Star, 
  Play, 
  CheckCircle, 
  Calendar, 
  TrendingUp, 
  Users, 
  Zap, 
  Award, 
  ArrowRight, 
  Plus, 
  Settings, 
  BarChart3, 
  Lightbulb, 
  Code, 
  Globe, 
  MessageCircle, 
  Download, 
  Share2, 
  RefreshCw, 
  Eye, 
  Edit, 
  Trash2, 
  Filter, 
  Search, 
  X, 
  ChevronRight, 
  ChevronDown, 
  Timer, 
  User, 
  Rocket, 
  Shield, 
  Sparkles 
} from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: number; // days
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  progress: number; // percentage
  status: 'not-started' | 'in-progress' | 'completed' | 'paused';
  estimatedHours: number;
  projects: number;
  createdAt: string;
  nextActivity?: string;
  streak: number;
}

interface LearningActivity {
  id: string;
  title: string;
  type: 'reading' | 'video' | 'project' | 'quiz' | 'practice';
  duration: number; // minutes
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  description: string;
  resources: string[];
}

interface WeeklySprint {
  week: number;
  title: string;
  objectives: string[];
  activities: LearningActivity[];
  project: {
    title: string;
    description: string;
    technologies: string[];
    estimatedTime: number;
  };
  completed: boolean;
}

const LearningPath = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'paths' | 'create' | 'community' | 'analytics'>('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [showPathDetails, setShowPathDetails] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  
  // Onboarding form state
  const [learningGoals, setLearningGoals] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [timeCommitment, setTimeCommitment] = useState(2);
  const [learningStyle, setLearningStyle] = useState<string[]>([]);
  const [targetRole, setTargetRole] = useState('');

  // Mock data
  const learningPaths: LearningPath[] = [
    {
      id: '1',
      title: 'Full-Stack React Development',
      description: 'Master React, Node.js, and MongoDB to build complete web applications',
      duration: 90,
      difficulty: 'intermediate',
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'],
      progress: 65,
      status: 'in-progress',
      estimatedHours: 120,
      projects: 8,
      createdAt: '2024-01-01',
      nextActivity: 'Build REST API with Express',
      streak: 7
    },
    {
      id: '2',
      title: 'Modern Frontend with TypeScript',
      description: 'Learn TypeScript, React, and modern frontend development practices',
      duration: 60,
      difficulty: 'beginner',
      skills: ['TypeScript', 'React', 'CSS', 'HTML', 'Git'],
      progress: 0,
      status: 'not-started',
      estimatedHours: 80,
      projects: 6,
      createdAt: '2024-01-15',
      streak: 0
    },
    {
      id: '3',
      title: 'DevOps & Cloud Deployment',
      description: 'Master Docker, AWS, and CI/CD for modern application deployment',
      duration: 75,
      difficulty: 'advanced',
      skills: ['Docker', 'AWS', 'CI/CD', 'Kubernetes', 'Linux'],
      progress: 100,
      status: 'completed',
      estimatedHours: 100,
      projects: 5,
      createdAt: '2023-10-01',
      streak: 0
    }
  ];

  const weeklySprintData: WeeklySprint[] = [
    {
      week: 1,
      title: 'React Fundamentals',
      objectives: [
        'Understand React components and JSX',
        'Learn about props and state',
        'Build your first React app'
      ],
      activities: [
        {
          id: '1-1',
          title: 'Introduction to React',
          type: 'reading',
          duration: 30,
          difficulty: 'easy',
          completed: true,
          description: 'Learn the basics of React and its ecosystem',
          resources: ['React Documentation', 'Interactive Tutorial']
        },
        {
          id: '1-2',
          title: 'Building Components',
          type: 'video',
          duration: 45,
          difficulty: 'easy',
          completed: true,
          description: 'Watch tutorial on creating React components',
          resources: ['YouTube Tutorial', 'Code Examples']
        },
        {
          id: '1-3',
          title: 'Props and State Quiz',
          type: 'quiz',
          duration: 15,
          difficulty: 'medium',
          completed: true,
          description: 'Test your understanding of React concepts',
          resources: ['Interactive Quiz']
        }
      ],
      project: {
        title: 'Personal Portfolio Website',
        description: 'Build a responsive portfolio website using React',
        technologies: ['React', 'CSS', 'HTML'],
        estimatedTime: 180
      },
      completed: true
    },
    {
      week: 2,
      title: 'State Management & Hooks',
      objectives: [
        'Master React hooks (useState, useEffect)',
        'Understand component lifecycle',
        'Implement state management patterns'
      ],
      activities: [
        {
          id: '2-1',
          title: 'React Hooks Deep Dive',
          type: 'video',
          duration: 60,
          difficulty: 'medium',
          completed: true,
          description: 'Comprehensive guide to React hooks',
          resources: ['Video Course', 'Practice Exercises']
        },
        {
          id: '2-2',
          title: 'Todo App with Hooks',
          type: 'project',
          duration: 120,
          difficulty: 'medium',
          completed: false,
          description: 'Build a todo application using React hooks',
          resources: ['Project Template', 'Step-by-step Guide']
        }
      ],
      project: {
        title: 'Interactive Todo Application',
        description: 'Build a feature-rich todo app with local storage',
        technologies: ['React', 'Hooks', 'Local Storage'],
        estimatedTime: 240
      },
      completed: false
    }
  ];

  const availableSkills = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'TypeScript', 
    'JavaScript', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes'
  ];

  const learningStyles = [
    'Video Tutorials', 'Documentation Reading', 'Hands-on Projects', 
    'Interactive Coding', 'Community Learning', 'Mentorship'
  ];

  const targetRoles = [
    'Frontend Developer', 'Backend Developer', 'Full-Stack Developer',
    'DevOps Engineer', 'Mobile Developer', 'Data Scientist'
  ];

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
    setActiveTab('paths');
    // Here you would typically create a new learning path based on the selections
  };

  const toggleSkill = (skill: string) => {
    setLearningGoals(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const toggleLearningStyle = (style: string) => {
    setLearningStyle(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-500/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'in-progress': return 'text-blue-400 bg-blue-500/20';
      case 'paused': return 'text-yellow-400 bg-yellow-500/20';
      case 'not-started': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'reading': return BookOpen;
      case 'video': return Play;
      case 'project': return Code;
      case 'quiz': return Target;
      case 'practice': return Zap;
      default: return BookOpen;
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-50">AI-Powered Learning Paths</h1>
            <p className="text-gray-400 mt-1">Personalized 90-day skill-building roadmaps</p>
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

      {/* Onboarding Flow */}
      {showOnboarding && (
        <div className="bg-[#111827] rounded-2xl p-8 border border-gray-700/50 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Create Your Personalized Learning Path</h2>
            <p className="text-gray-400">Step {onboardingStep} of 5</p>
            <p className="text-gray-300 mt-2">
              {onboardingStep === 1 && "What would you like to learn?"}
              {onboardingStep === 2 && "What's your current experience level?"}
              {onboardingStep === 3 && "How much time can you dedicate?"}
              {onboardingStep === 4 && "What's your preferred learning style?"}
              {onboardingStep === 5 && "What's your target role?"}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(onboardingStep / 5) * 100}%` }}
            ></div>
          </div>

          {/* Step 1: Learning Goals */}
          {onboardingStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Select the skills you want to learn</h3>
                <p className="text-gray-400 mb-6">Choose up to 5 skills to focus on in your learning path</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {availableSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        learningGoals.includes(skill)
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                          : 'border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Experience Level */}
          {onboardingStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">What's your current experience level?</h3>
                <p className="text-gray-400 mb-6">This helps us customize the difficulty and pace of your learning path</p>
                
                <div className="space-y-3">
                  {[
                    { value: 'beginner', label: 'Beginner', desc: 'New to programming or these technologies' },
                    { value: 'intermediate', label: 'Intermediate', desc: 'Some experience with basic concepts' },
                    { value: 'advanced', label: 'Advanced', desc: 'Experienced developer looking to specialize' }
                  ].map((level) => (
                    <label key={level.value} className="flex items-center gap-3 p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-gray-500">
                      <input
                        type="radio"
                        name="experienceLevel"
                        value={level.value}
                        checked={experienceLevel === level.value}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        className="text-indigo-500"
                      />
                      <div>
                        <div className="text-white font-medium">{level.label}</div>
                        <div className="text-gray-400 text-sm">{level.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Time Commitment */}
          {onboardingStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">How much time can you dedicate daily?</h3>
                <p className="text-gray-400 mb-6">We'll create a realistic schedule that fits your availability</p>
                
                <div className="bg-[#1F2937] rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white">Daily Time Commitment: {timeCommitment} hours</span>
                    <span className="text-indigo-400 text-sm">
                      {timeCommitment * 7} hours/week
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="8"
                    step="0.5"
                    value={timeCommitment}
                    onChange={(e) => setTimeCommitment(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>30 min</span>
                    <span>4 hours</span>
                    <span>8 hours</span>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="text-blue-400 font-medium mb-2">Recommended Schedule</h4>
                  <p className="text-gray-300 text-sm">
                    With {timeCommitment} hours daily, you can complete your learning path in approximately{' '}
                    <strong>{Math.ceil(120 / (timeCommitment * 7))} weeks</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Learning Style */}
          {onboardingStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">What's your preferred learning style?</h3>
                <p className="text-gray-400 mb-6">Select all that apply - we'll customize your path accordingly</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {learningStyles.map((style) => (
                    <button
                      key={style}
                      onClick={() => toggleLearningStyle(style)}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        learningStyle.includes(style)
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                          : 'border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Target Role */}
          {onboardingStep === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">What's your target role?</h3>
                <p className="text-gray-400 mb-6">This helps us align your learning path with industry requirements</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {targetRoles.map((role) => (
                    <button
                      key={role}
                      onClick={() => setTargetRole(role)}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        targetRole === role
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                          : 'border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#1F2937] rounded-lg p-6">
                <h4 className="text-white font-medium mb-3">Your Learning Path Summary:</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div><strong>Skills:</strong> {learningGoals.join(', ')}</div>
                  <div><strong>Experience:</strong> {experienceLevel}</div>
                  <div><strong>Time Commitment:</strong> {timeCommitment} hours/day</div>
                  <div><strong>Learning Style:</strong> {learningStyle.join(', ')}</div>
                  <div><strong>Target Role:</strong> {targetRole}</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevStep}
              disabled={onboardingStep === 1}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors disabled:opacity-50"
            >
              Back
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowOnboarding(false)}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors"
              >
                Save & Close
              </button>
              
              {onboardingStep < 5 ? (
                <button
                  onClick={handleNextStep}
                  disabled={
                    (onboardingStep === 1 && learningGoals.length === 0) ||
                    (onboardingStep === 2 && !experienceLevel) ||
                    (onboardingStep === 5 && !targetRole)
                  }
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleFinishOnboarding}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Generate Learning Path
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!showOnboarding && (
        <>
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
              onClick={() => setActiveTab('paths')}
              className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'paths' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              My Learning Paths
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'create' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Discover Paths
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

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Current Learning Path */}
                {learningPaths.find(p => p.status === 'in-progress') ? (
                  <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-400" />
                      Current Learning Path
                    </h3>
                    
                    {(() => {
                      const currentPath = learningPaths.find(p => p.status === 'in-progress')!;
                      return (
                        <div className="bg-[#1F2937] rounded-lg p-6 border border-gray-700">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-xl font-semibold text-gray-50 mb-2">{currentPath.title}</h4>
                              <p className="text-gray-300 mb-4">{currentPath.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  Day {Math.floor((currentPath.progress / 100) * currentPath.duration)} of {currentPath.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {currentPath.estimatedHours} hours total
                                </span>
                                <span className="flex items-center gap-1">
                                  <Zap className="w-4 h-4" />
                                  {currentPath.streak} day streak
                                </span>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentPath.difficulty)}`}>
                              {currentPath.difficulty}
                            </span>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-300">Progress</span>
                              <span className="text-indigo-400 font-semibold">{currentPath.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-indigo-500 to-violet-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${currentPath.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          {currentPath.nextActivity && (
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                              <h5 className="text-blue-400 font-medium mb-1">Next Activity</h5>
                              <p className="text-gray-300 text-sm">{currentPath.nextActivity}</p>
                            </div>
                          )}

                          <div className="flex gap-3">
                            <button
                              onClick={() => {
                                setSelectedPath(currentPath);
                                setShowPathDetails(true);
                              }}
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                            >
                              <Play className="w-4 h-4" />
                              Continue Learning
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="bg-[#111827] rounded-2xl p-8 border border-gray-700/50 text-center">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Active Learning Path</h3>
                    <p className="text-gray-400 mb-6">Create your first AI-powered learning path to get started</p>
                    <button
                      onClick={handleStartOnboarding}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                      Create Learning Path
                    </button>
                  </div>
                )}

                {/* Today's Activities */}
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-400" />
                    Today's Learning Activities
                  </h3>
                  
                  <div className="space-y-4">
                    {weeklySprintData[1].activities.slice(0, 3).map((activity) => {
                      const Icon = getActivityIcon(activity.type);
                      return (
                        <div key={activity.id} className="flex items-center gap-4 p-4 bg-[#1F2937] rounded-lg border border-gray-700">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            activity.completed ? 'bg-green-500/20' : 'bg-blue-500/20'
                          }`}>
                            {activity.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <Icon className="w-5 h-5 text-blue-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${activity.completed ? 'text-gray-500 line-through' : 'text-gray-50'}`}>
                              {activity.title}
                            </h4>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                              <span>{activity.duration} minutes</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                activity.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                                activity.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {activity.difficulty}
                              </span>
                            </div>
                          </div>
                          {!activity.completed && (
                            <button className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                              Start
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Learning Stats */}
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-4">Learning Stats</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-400 mb-1">7</div>
                      <div className="text-gray-400 text-sm">Day Streak</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">This Week</span>
                        <span className="text-green-400 font-semibold">6/7 goals</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Total Hours</span>
                        <span className="text-blue-400 font-semibold">24.5 hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Projects Built</span>
                        <span className="text-purple-400 font-semibold">3 completed</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Skills Learned</span>
                        <span className="text-yellow-400 font-semibold">8 concepts</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                      Continue today's session
                    </button>
                    <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                      Review completed projects
                    </button>
                    <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                      Join study group
                    </button>
                    <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                      Ask AI tutor
                    </button>
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-4">Recent Achievements</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <Award className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-gray-50 text-sm font-medium">7-Day Streak</p>
                        <p className="text-gray-400 text-xs">Completed daily goals for a week</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-gray-50 text-sm font-medium">First Project</p>
                        <p className="text-gray-400 text-xs">Built and deployed portfolio site</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Code className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-gray-50 text-sm font-medium">React Master</p>
                        <p className="text-gray-400 text-xs">Completed React fundamentals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* My Learning Paths Tab */}
          {activeTab === 'paths' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-6">My Learning Paths</h3>
                  
                  {learningPaths.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-white mb-2">No Learning Paths Yet</h4>
                      <p className="text-gray-400 mb-6">Create your first AI-powered learning path to get started</p>
                      <button
                        onClick={handleStartOnboarding}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                      >
                        Create Learning Path
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {learningPaths.map((path) => (
                        <div key={path.id} className="bg-[#1F2937] rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-xl font-semibold text-gray-50">{path.title}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(path.status)}`}>
                                  {path.status.replace('-', ' ')}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                                  {path.difficulty}
                                </span>
                              </div>
                              <p className="text-gray-300 mb-4">{path.description}</p>
                              
                              <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {path.duration} days
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {path.estimatedHours} hours
                                </span>
                                <span className="flex items-center gap-1">
                                  <Code className="w-4 h-4" />
                                  {path.projects} projects
                                </span>
                                {path.status === 'in-progress' && (
                                  <span className="flex items-center gap-1">
                                    <Zap className="w-4 h-4" />
                                    {path.streak} day streak
                                  </span>
                                )}
                              </div>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {path.skills.map((skill) => (
                                  <span key={skill} className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs">
                                    {skill}
                                  </span>
                                ))}
                              </div>

                              {path.status === 'in-progress' && (
                                <div className="mb-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-300">Progress</span>
                                    <span className="text-indigo-400 font-semibold">{path.progress}%</span>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div 
                                      className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full"
                                      style={{ width: `${path.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-3">
                            {path.status === 'in-progress' ? (
                              <button
                                onClick={() => {
                                  setSelectedPath(path);
                                  setShowPathDetails(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                              >
                                <Play className="w-4 h-4" />
                                Continue
                              </button>
                            ) : path.status === 'not-started' ? (
                              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                                <Play className="w-4 h-4" />
                                Start Path
                              </button>
                            ) : (
                              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                                <Eye className="w-4 h-4" />
                                View Certificate
                              </button>
                            )}
                            
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
                              <Eye className="w-4 h-4" />
                              Details
                            </button>
                            
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
                              <Settings className="w-4 h-4" />
                              Customize
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {/* Learning Progress */}
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-4">Overall Progress</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-400 mb-1">
                        {learningPaths.filter(p => p.status === 'completed').length}
                      </div>
                      <div className="text-gray-400 text-sm">Paths Completed</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Active Paths</span>
                        <span className="text-blue-400 font-semibold">
                          {learningPaths.filter(p => p.status === 'in-progress').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Total Skills</span>
                        <span className="text-purple-400 font-semibold">
                          {[...new Set(learningPaths.flatMap(p => p.skills))].length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Projects Built</span>
                        <span className="text-green-400 font-semibold">
                          {learningPaths.reduce((sum, p) => sum + (p.status === 'completed' ? p.projects : Math.floor(p.projects * p.progress / 100)), 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommended Paths */}
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-4">Recommended for You</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <h4 className="text-purple-400 font-medium text-sm mb-1">Advanced React Patterns</h4>
                      <p className="text-gray-300 text-xs">Based on your React progress</p>
                    </div>
                    
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <h4 className="text-blue-400 font-medium text-sm mb-1">GraphQL & Apollo</h4>
                      <p className="text-gray-300 text-xs">Perfect next step for APIs</p>
                    </div>
                    
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <h4 className="text-green-400 font-medium text-sm mb-1">Testing with Jest</h4>
                      <p className="text-gray-300 text-xs">Essential for production apps</p>
                    </div>
                  </div>
                </div>

                {/* Community Activity */}
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-4">Community</h3>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="text-gray-50 font-medium">React Study Group</p>
                      <p className="text-gray-400">5 new discussions today</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-50 font-medium">Project Showcase</p>
                      <p className="text-gray-400">12 new projects shared</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-50 font-medium">Mentorship</p>
                      <p className="text-gray-400">3 mentors available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Discover Paths Tab */}
          {activeTab === 'create' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-50">Discover Learning Paths</h3>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search paths..."
                          className="pl-10 pr-4 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                        />
                      </div>
                      <button className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                        <Filter className="w-4 h-4" />
                        Filter
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Popular Learning Paths */}
                    {[
                      {
                        title: 'Frontend Mastery with React',
                        description: 'Complete frontend development with React, TypeScript, and modern tools',
                        duration: 90,
                        difficulty: 'intermediate',
                        skills: ['React', 'TypeScript', 'CSS', 'Testing'],
                        students: 1247,
                        rating: 4.8,
                        projects: 10
                      },
                      {
                        title: 'Backend Development with Node.js',
                        description: 'Build scalable APIs and microservices with Node.js and databases',
                        duration: 75,
                        difficulty: 'intermediate',
                        skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
                        students: 892,
                        rating: 4.7,
                        projects: 8
                      },
                      {
                        title: 'DevOps & Cloud Engineering',
                        description: 'Master Docker, Kubernetes, AWS, and CI/CD for modern deployments',
                        duration: 120,
                        difficulty: 'advanced',
                        skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
                        students: 634,
                        rating: 4.9,
                        projects: 12
                      },
                      {
                        title: 'Mobile Development with React Native',
                        description: 'Build cross-platform mobile apps with React Native and Expo',
                        duration: 60,
                        difficulty: 'beginner',
                        skills: ['React Native', 'Expo', 'Mobile UI', 'APIs'],
                        students: 456,
                        rating: 4.6,
                        projects: 6
                      }
                    ].map((path, index) => (
                      <div key={index} className="bg-[#1F2937] rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-50 mb-2">{path.title}</h4>
                            <p className="text-gray-300 text-sm mb-4">{path.description}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {path.duration} days
                              </span>
                              <span className="flex items-center gap-1">
                                <Code className="w-4 h-4" />
                                {path.projects} projects
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {path.students} students
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(path.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                                ))}
                              </div>
                              <span className="text-gray-400 text-sm">{path.rating} ({path.students} reviews)</span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {path.skills.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(path.difficulty)}`}>
                            {path.difficulty}
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                            <Plus className="w-4 h-4" />
                            Start Path
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
                            <Eye className="w-4 h-4" />
                            Preview
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Frontend Development', count: 24 },
                      { name: 'Backend Development', count: 18 },
                      { name: 'Full-Stack', count: 15 },
                      { name: 'DevOps & Cloud', count: 12 },
                      { name: 'Mobile Development', count: 9 },
                      { name: 'Data Science', count: 8 }
                    ].map((category) => (
                      <button key={category.name} className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="text-gray-400 text-sm">{category.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-4">Popular This Week</h3>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="text-gray-50 font-medium">Next.js 14 Mastery</p>
                      <p className="text-gray-400">+234 new students</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-50 font-medium">AI Integration Basics</p>
                      <p className="text-gray-400">+189 new students</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-50 font-medium">Serverless Architecture</p>
                      <p className="text-gray-400">+156 new students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Community Tab */}
          {activeTab === 'community' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-6">Learning Community</h3>
                  
                  <div className="space-y-6">
                    {/* Study Groups */}
                    <div>
                      <h4 className="font-medium text-gray-50 mb-4">Active Study Groups</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: 'React Beginners', members: 234, activity: 'Very Active', topic: 'Week 3: State Management' },
                          { name: 'Full-Stack Builders', members: 156, activity: 'Active', topic: 'API Integration Patterns' },
                          { name: 'DevOps Learning', members: 89, activity: 'Moderate', topic: 'Docker Fundamentals' },
                          { name: 'TypeScript Masters', members: 67, activity: 'Active', topic: 'Advanced Types' }
                        ].map((group) => (
                          <div key={group.name} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-gray-50">{group.name}</h5>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                group.activity === 'Very Active' ? 'bg-green-500/20 text-green-400' :
                                group.activity === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-yellow-500/20 text-yellow-400'
                              }`}>
                                {group.activity}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">{group.topic}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-xs">{group.members} members</span>
                              <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-medium transition-colors">
                                Join
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Projects */}
                    <div>
                      <h4 className="font-medium text-gray-50 mb-4">Community Projects</h4>
                      <div className="space-y-4">
                        {[
                          { title: 'E-commerce Dashboard', author: 'Sarah M.', tech: ['React', 'Node.js'], likes: 23 },
                          { title: 'Weather App PWA', author: 'Mike R.', tech: ['Vue.js', 'PWA'], likes: 18 },
                          { title: 'Task Management API', author: 'Alex K.', tech: ['Express', 'MongoDB'], likes: 15 }
                        ].map((project, index) => (
                          <div key={index} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h5 className="font-medium text-gray-50">{project.title}</h5>
                                <p className="text-gray-400 text-sm">by {project.author}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span className="text-gray-400 text-sm">{project.likes}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {project.tech.map((tech) => (
                                <span key={tech} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-4">Your Activity</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Study Groups</span>
                      <span className="text-blue-400 font-semibold">2 joined</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Projects Shared</span>
                      <span className="text-green-400 font-semibold">3 projects</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Peer Reviews</span>
                      <span className="text-purple-400 font-semibold">8 given</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Mentorship</span>
                      <span className="text-yellow-400 font-semibold">1 mentor</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-4">Trending Topics</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-blue-400 text-sm font-medium">AI Integration</p>
                      <p className="text-gray-300 text-xs">+45% interest this week</p>
                    </div>
                    
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-green-400 text-sm font-medium">Serverless Functions</p>
                      <p className="text-gray-300 text-xs">Hot topic in backend</p>
                    </div>
                    
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <p className="text-purple-400 text-sm font-medium">Web3 Development</p>
                      <p className="text-gray-300 text-xs">Emerging opportunity</p>
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
                  <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-400" />
                    Learning Analytics
                  </h3>
                  
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">Interactive learning analytics coming soon</p>
                      <p className="text-gray-500 text-sm mt-2">Track progress, time spent, and skill development over time</p>
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
                      <span className="text-indigo-400 font-semibold">47.5 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Concepts Mastered</span>
                      <span className="text-green-400 font-semibold">23 concepts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Projects Completed</span>
                      <span className="text-purple-400 font-semibold">5 projects</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Learning Velocity</span>
                      <span className="text-blue-400 font-semibold">1.2x target</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-4">Skill Progress</h3>
                  <div className="space-y-3">
                    {[
                      { skill: 'React', progress: 85, level: 'Advanced' },
                      { skill: 'TypeScript', progress: 72, level: 'Intermediate' },
                      { skill: 'Node.js', progress: 68, level: 'Intermediate' },
                      { skill: 'MongoDB', progress: 45, level: 'Beginner' }
                    ].map((skill) => (
                      <div key={skill.skill}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-300 text-sm">{skill.skill}</span>
                          <span className="text-gray-400 text-xs">{skill.level}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              skill.progress >= 80 ? 'bg-green-400' :
                              skill.progress >= 60 ? 'bg-blue-400' :
                              skill.progress >= 40 ? 'bg-yellow-400' :
                              'bg-red-400'
                            }`}
                            style={{ width: `${skill.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Learning Path Details Modal */}
      {showPathDetails && selectedPath && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">{selectedPath.title}</h3>
              <button
                onClick={() => setShowPathDetails(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    {/* Weekly Sprints */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Weekly Learning Sprints</h4>
                      <div className="space-y-4">
                        {weeklySprintData.map((sprint) => (
                          <div key={sprint.week} className="bg-[#1F2937] rounded-lg border border-gray-700">
                            <button
                              onClick={() => setExpandedWeek(expandedWeek === sprint.week ? null : sprint.week)}
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/30 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  sprint.completed ? 'bg-green-500/20' : 'bg-blue-500/20'
                                }`}>
                                  {sprint.completed ? (
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                  ) : (
                                    <span className="text-blue-400 font-semibold text-sm">{sprint.week}</span>
                                  )}
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-50">Week {sprint.week}: {sprint.title}</h5>
                                  <p className="text-gray-400 text-sm">{sprint.project.title}</p>
                                </div>
                              </div>
                              {expandedWeek === sprint.week ? (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                              )}
                            </button>

                            {expandedWeek === sprint.week && (
                              <div className="px-4 pb-4 border-t border-gray-700">
                                <div className="pt-4 space-y-4">
                                  <div>
                                    <h6 className="font-medium text-gray-50 mb-2">Learning Objectives</h6>
                                    <ul className="space-y-1">
                                      {sprint.objectives.map((objective, index) => (
                                        <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                                          {objective}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div>
                                    <h6 className="font-medium text-gray-50 mb-2">Activities</h6>
                                    <div className="space-y-2">
                                      {sprint.activities.map((activity) => {
                                        const Icon = getActivityIcon(activity.type);
                                        return (
                                          <div key={activity.id} className="flex items-center gap-3 p-2 bg-[#111827] rounded">
                                            <Icon className={`w-4 h-4 ${activity.completed ? 'text-green-400' : 'text-blue-400'}`} />
                                            <div className="flex-1">
                                              <span className={`text-sm ${activity.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                                                {activity.title}
                                              </span>
                                              <div className="text-xs text-gray-400">{activity.duration} min</div>
                                            </div>
                                            {activity.completed && <CheckCircle className="w-4 h-4 text-green-400" />}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                                    <h6 className="text-blue-400 font-medium text-sm mb-1">Week Project</h6>
                                    <p className="text-gray-300 text-sm mb-2">{sprint.project.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                      <Timer className="w-3 h-3" />
                                      <span>{sprint.project.estimatedTime} minutes</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-[#1F2937] rounded-lg p-4">
                    <h4 className="font-medium text-gray-50 mb-3">Path Overview</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Duration</span>
                        <span className="text-gray-50">{selectedPath.duration} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total Hours</span>
                        <span className="text-gray-50">{selectedPath.estimatedHours} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Projects</span>
                        <span className="text-gray-50">{selectedPath.projects} projects</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Difficulty</span>
                        <span className="text-gray-50">{selectedPath.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1F2937] rounded-lg p-4">
                    <h4 className="font-medium text-gray-50 mb-3">Skills You'll Learn</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPath.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowPathDetails(false)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Start This Path
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

export default LearningPath;