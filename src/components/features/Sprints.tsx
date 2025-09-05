import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  Target, 
  Star, 
  Users, 
  Trophy, 
  Play, 
  CheckCircle, 
  ArrowRight,
  Filter,
  Search,
  Calendar,
  Code,
  Smartphone,
  Globe,
  Database,
  Brain,
  Award,
  TrendingUp,
  BookOpen,
  Sparkles,
  X,
  Timer,
  User,
  BarChart3,
  Lightbulb,
  Rocket,
  Shield,
  Palette,
  Settings,
  Eye,
  Download,
  Share2,
  MessageCircle,
  Heart,
  Coffee,
  Briefcase
} from 'lucide-react';

interface Sprint {
  id: string;
  title: string;
  description: string;
  technology: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  participants: number;
  rating: number;
  deliverable: string;
  skills: string[];
  prerequisites: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'ai' | 'devops';
  featured: boolean;
  completionRate: number;
  estimatedHours: number;
  industry: string;
  thumbnail: string;
}

interface UserProgress {
  sprintId: string;
  progress: number;
  currentMilestone: number;
  totalMilestones: number;
  timeSpent: number;
  startDate: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'paused';
}

const Sprints = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'my-sprints' | 'achievements'>('browse');
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null);
  const [showSprintDetail, setShowSprintDetail] = useState(false);
  const [filterTechnology, setFilterTechnology] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterDuration, setFilterDuration] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [enrolledSprints, setEnrolledSprints] = useState<string[]>(['1', '3']); // Mock enrolled sprints

  // Mock data
  const sprints: Sprint[] = [
    {
      id: '1',
      title: 'Build a Modern E-commerce Platform',
      description: 'Create a full-featured e-commerce platform with React, Node.js, and Stripe integration. Learn modern development practices while building a real-world application.',
      technology: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      difficulty: 'intermediate',
      duration: '3 weeks',
      participants: 1247,
      rating: 4.8,
      deliverable: 'Fully functional e-commerce website',
      skills: ['React Hooks', 'API Integration', 'Payment Processing', 'Database Design'],
      prerequisites: ['Basic JavaScript', 'HTML/CSS'],
      category: 'fullstack',
      featured: true,
      completionRate: 78,
      estimatedHours: 45,
      industry: 'E-commerce',
      thumbnail: 'bg-gradient-to-br from-blue-500 to-purple-600'
    },
    {
      id: '2',
      title: 'AI-Powered Chat Application',
      description: 'Build an intelligent chat application using OpenAI API, WebSockets, and modern React patterns. Perfect for learning AI integration.',
      technology: ['React', 'TypeScript', 'OpenAI', 'WebSocket'],
      difficulty: 'advanced',
      duration: '2 weeks',
      participants: 892,
      rating: 4.9,
      deliverable: 'AI chat application with real-time messaging',
      skills: ['AI Integration', 'Real-time Communication', 'TypeScript', 'API Design'],
      prerequisites: ['React experience', 'JavaScript ES6+'],
      category: 'ai',
      featured: true,
      completionRate: 65,
      estimatedHours: 35,
      industry: 'AI/Tech',
      thumbnail: 'bg-gradient-to-br from-green-500 to-teal-600'
    },
    {
      id: '3',
      title: 'Mobile-First Dashboard Design',
      description: 'Master responsive design and mobile-first development by creating a comprehensive analytics dashboard.',
      technology: ['React', 'Tailwind CSS', 'Chart.js'],
      difficulty: 'beginner',
      duration: '2 weeks',
      participants: 2156,
      rating: 4.7,
      deliverable: 'Responsive analytics dashboard',
      skills: ['Responsive Design', 'Data Visualization', 'Mobile UX', 'CSS Grid'],
      prerequisites: ['Basic HTML/CSS'],
      category: 'frontend',
      featured: false,
      completionRate: 82,
      estimatedHours: 25,
      industry: 'Design/UX',
      thumbnail: 'bg-gradient-to-br from-pink-500 to-rose-600'
    },
    {
      id: '4',
      title: 'DevOps Pipeline Mastery',
      description: 'Learn modern DevOps practices by setting up CI/CD pipelines, containerization, and cloud deployment.',
      technology: ['Docker', 'GitHub Actions', 'AWS', 'Kubernetes'],
      difficulty: 'advanced',
      duration: '3 weeks',
      participants: 634,
      rating: 4.6,
      deliverable: 'Complete DevOps pipeline setup',
      skills: ['CI/CD', 'Containerization', 'Cloud Deployment', 'Infrastructure'],
      prerequisites: ['Backend development', 'Command line'],
      category: 'devops',
      featured: false,
      completionRate: 58,
      estimatedHours: 50,
      industry: 'Infrastructure',
      thumbnail: 'bg-gradient-to-br from-orange-500 to-red-600'
    },
    {
      id: '5',
      title: 'React Native Mobile App',
      description: 'Build your first mobile application using React Native. Create a cross-platform app with native features.',
      technology: ['React Native', 'Expo', 'Firebase'],
      difficulty: 'intermediate',
      duration: '3 weeks',
      participants: 1089,
      rating: 4.5,
      deliverable: 'Published mobile application',
      skills: ['Mobile Development', 'Cross-platform', 'Native APIs', 'App Store'],
      prerequisites: ['React knowledge', 'JavaScript'],
      category: 'mobile',
      featured: false,
      completionRate: 71,
      estimatedHours: 40,
      industry: 'Mobile',
      thumbnail: 'bg-gradient-to-br from-indigo-500 to-blue-600'
    },
    {
      id: '6',
      title: 'Microservices Architecture Sprint',
      description: 'Design and implement a microservices architecture using Node.js, Docker, and API Gateway patterns.',
      technology: ['Node.js', 'Docker', 'Redis', 'PostgreSQL'],
      difficulty: 'advanced',
      duration: '3 weeks',
      participants: 445,
      rating: 4.8,
      deliverable: 'Scalable microservices system',
      skills: ['System Design', 'Microservices', 'API Gateway', 'Scalability'],
      prerequisites: ['Backend development', 'Database knowledge'],
      category: 'backend',
      featured: false,
      completionRate: 62,
      estimatedHours: 55,
      industry: 'Enterprise',
      thumbnail: 'bg-gradient-to-br from-purple-500 to-indigo-600'
    }
  ];

  const userProgress: UserProgress[] = [
    {
      sprintId: '1',
      progress: 65,
      currentMilestone: 8,
      totalMilestones: 12,
      timeSpent: 28,
      startDate: '2024-01-15',
      status: 'in_progress'
    },
    {
      sprintId: '3',
      progress: 100,
      currentMilestone: 10,
      totalMilestones: 10,
      timeSpent: 22,
      startDate: '2024-01-08',
      status: 'completed'
    }
  ];

  const achievements = [
    {
      id: '1',
      title: 'First Sprint Completed',
      description: 'Completed your first learning sprint',
      icon: Trophy,
      earned: true,
      earnedDate: '2024-01-20'
    },
    {
      id: '2',
      title: 'Speed Learner',
      description: 'Completed a sprint 20% faster than average',
      icon: Zap,
      earned: true,
      earnedDate: '2024-01-20'
    },
    {
      id: '3',
      title: 'Consistency Champion',
      description: 'Maintained a 7-day learning streak',
      icon: Flame,
      earned: false,
      earnedDate: null
    },
    {
      id: '4',
      title: 'Technology Explorer',
      description: 'Completed sprints in 3 different technologies',
      icon: Rocket,
      earned: false,
      earnedDate: null
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-500/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return Code;
      case 'backend': return Database;
      case 'fullstack': return Globe;
      case 'mobile': return Smartphone;
      case 'ai': return Brain;
      case 'devops': return Settings;
      default: return Code;
    }
  };

  const filteredSprints = sprints.filter(sprint => {
    const matchesSearch = sprint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sprint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sprint.technology.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTechnology = filterTechnology === 'all' || 
                             sprint.technology.some(tech => tech.toLowerCase().includes(filterTechnology.toLowerCase()));
    
    const matchesDifficulty = filterDifficulty === 'all' || sprint.difficulty === filterDifficulty;
    
    const matchesDuration = filterDuration === 'all' || 
                           (filterDuration === 'short' && sprint.duration.includes('1-2')) ||
                           (filterDuration === 'medium' && sprint.duration.includes('2-3')) ||
                           (filterDuration === 'long' && sprint.duration.includes('3+'));
    
    return matchesSearch && matchesTechnology && matchesDifficulty && matchesDuration;
  });

  const getSprintProgress = (sprintId: string) => {
    return userProgress.find(p => p.sprintId === sprintId);
  };

  const isEnrolled = (sprintId: string) => {
    return enrolledSprints.includes(sprintId);
  };

  const enrollInSprint = (sprintId: string) => {
    setEnrolledSprints([...enrolledSprints, sprintId]);
    // In real implementation, this would call an API
  };

  const openSprintDetail = (sprint: Sprint) => {
    setSelectedSprint(sprint);
    setShowSprintDetail(true);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-50">Learning Sprints</h1>
          <p className="text-gray-400 mt-1">Focused 2-3 week learning missions with real-world projects</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-[#111827] rounded-lg p-1 border border-gray-700 mb-8 w-fit">
        <button
          onClick={() => setActiveTab('browse')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'browse' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Browse Sprints
        </button>
        <button
          onClick={() => setActiveTab('my-sprints')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'my-sprints' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          My Sprints
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'achievements' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Achievements
        </button>
      </div>

      {/* Browse Sprints Tab */}
      {activeTab === 'browse' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                <div className="relative flex-1 lg:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sprints..."
                    className="w-full pl-10 pr-4 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                </div>
                
                <div className="flex gap-3 w-full lg:w-auto">
                  <select
                    value={filterTechnology}
                    onChange={(e) => setFilterTechnology(e.target.value)}
                    className="px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    <option value="all">All Technologies</option>
                    <option value="react">React</option>
                    <option value="node">Node.js</option>
                    <option value="python">Python</option>
                    <option value="typescript">TypeScript</option>
                    <option value="vue">Vue.js</option>
                  </select>
                  
                  <select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    className="px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  
                  <select
                    value={filterDuration}
                    onChange={(e) => setFilterDuration(e.target.value)}
                    className="px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    <option value="all">All Durations</option>
                    <option value="short">1-2 weeks</option>
                    <option value="medium">2-3 weeks</option>
                    <option value="long">3+ weeks</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Featured Sprints */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Featured Sprints
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sprints.filter(sprint => sprint.featured).map((sprint) => {
                  const Icon = getCategoryIcon(sprint.category);
                  const progress = getSprintProgress(sprint.id);
                  const enrolled = isEnrolled(sprint.id);
                  
                  return (
                    <div
                      key={sprint.id}
                      className="group bg-[#111827] rounded-2xl overflow-hidden border border-gray-700/50 hover:border-indigo-400/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                      onClick={() => openSprintDetail(sprint)}
                    >
                      {/* Thumbnail */}
                      <div className={`h-32 ${sprint.thumbnail} relative`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(sprint.difficulty)}`}>
                            {sprint.difficulty}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className="text-white text-xs bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                            {sprint.duration}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-gray-50 text-lg group-hover:text-indigo-400 transition-colors">
                            {sprint.title}
                          </h4>
                          {enrolled && (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-green-400 text-xs">Enrolled</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{sprint.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {sprint.technology.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                              {tech}
                            </span>
                          ))}
                          {sprint.technology.length > 3 && (
                            <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs">
                              +{sprint.technology.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {sprint.participants.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400" />
                              {sprint.rating}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {sprint.estimatedHours}h
                            </span>
                          </div>
                        </div>

                        {progress ? (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">Progress</span>
                              <span className="text-indigo-400">{progress.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-indigo-400 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              enrollInSprint(sprint.id);
                            }}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
                          >
                            Start Sprint
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* All Sprints */}
            <div>
              <h3 className="text-xl font-semibold text-gray-50 mb-4">All Sprints</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSprints.map((sprint) => {
                  const Icon = getCategoryIcon(sprint.category);
                  const progress = getSprintProgress(sprint.id);
                  const enrolled = isEnrolled(sprint.id);
                  
                  return (
                    <div
                      key={sprint.id}
                      className="bg-[#111827] rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                      onClick={() => openSprintDetail(sprint)}
                    >
                      {/* Thumbnail */}
                      <div className={`h-24 ${sprint.thumbnail} relative`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute top-2 left-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(sprint.difficulty)}`}>
                            {sprint.difficulty}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-50 text-sm line-clamp-2">{sprint.title}</h4>
                          {enrolled && (
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 ml-2" />
                          )}
                        </div>
                        
                        <p className="text-gray-400 text-xs mb-3 line-clamp-2">{sprint.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {sprint.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {sprint.participants}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            {sprint.rating}
                          </span>
                        </div>

                        {progress ? (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-300">Progress</span>
                              <span className="text-indigo-400">{progress.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-indigo-400 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${progress.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              enrollInSprint(sprint.id);
                            }}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:shadow-lg transition-all duration-300"
                          >
                            Start Sprint
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
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
                  <span className="text-gray-300">Active Sprints</span>
                  <span className="text-indigo-400 font-semibold">
                    {userProgress.filter(p => p.status === 'in_progress').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Completed</span>
                  <span className="text-green-400 font-semibold">
                    {userProgress.filter(p => p.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Hours</span>
                  <span className="text-purple-400 font-semibold">
                    {userProgress.reduce((sum, p) => sum + p.timeSpent, 0)}h
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Achievements</span>
                  <span className="text-yellow-400 font-semibold">
                    {achievements.filter(a => a.earned).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Trending Technologies */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Trending This Week</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">React 18</span>
                  </div>
                  <span className="text-green-400 text-xs">+15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">TypeScript</span>
                  </div>
                  <span className="text-blue-400 text-xs">+12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Next.js 14</span>
                  </div>
                  <span className="text-purple-400 text-xs">+18%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">AI Integration</span>
                  </div>
                  <span className="text-orange-400 text-xs">+25%</span>
                </div>
              </div>
            </div>

            {/* Learning Tips */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Sprint Tips</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Set aside 1-2 hours daily for consistent progress</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Focus on building, not just watching tutorials</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Join the community for support and motivation</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Document your learning journey for portfolio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* My Sprints Tab */}
      {activeTab === 'my-sprints' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Active Sprints */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Active Sprints</h3>
              
              {userProgress.filter(p => p.status === 'in_progress').length === 0 ? (
                <div className="text-center py-12">
                  <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">No Active Sprints</h4>
                  <p className="text-gray-400 mb-6">Start your first learning sprint to begin building skills</p>
                  <button
                    onClick={() => setActiveTab('browse')}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Browse Sprints
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userProgress.filter(p => p.status === 'in_progress').map((progress) => {
                    const sprint = sprints.find(s => s.id === progress.sprintId);
                    if (!sprint) return null;
                    
                    const Icon = getCategoryIcon(sprint.category);
                    
                    return (
                      <div key={progress.sprintId} className="bg-[#1F2937] rounded-lg p-6 border border-gray-700">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 ${sprint.thumbnail} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-50 mb-2">{sprint.title}</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                              <div>
                                <span className="text-gray-400">Progress:</span>
                                <p className="text-indigo-400 font-medium">{progress.progress}%</p>
                              </div>
                              <div>
                                <span className="text-gray-400">Milestone:</span>
                                <p className="text-gray-50">{progress.currentMilestone}/{progress.totalMilestones}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">Time Spent:</span>
                                <p className="text-purple-400">{progress.timeSpent}h</p>
                              </div>
                              <div>
                                <span className="text-gray-400">Started:</span>
                                <p className="text-gray-50">{new Date(progress.startDate).toLocaleDateString()}</p>
                              </div>
                            </div>
                            
                            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                              <div 
                                className="bg-indigo-400 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress.progress}%` }}
                              ></div>
                            </div>
                            
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                              <Play className="w-4 h-4" />
                              Continue Sprint
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Completed Sprints */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Completed Sprints</h3>
              
              <div className="space-y-4">
                {userProgress.filter(p => p.status === 'completed').map((progress) => {
                  const sprint = sprints.find(s => s.id === progress.sprintId);
                  if (!sprint) return null;
                  
                  const Icon = getCategoryIcon(sprint.category);
                  
                  return (
                    <div key={progress.sprintId} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 ${sprint.thumbnail} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-50 mb-1">{sprint.title}</h4>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>Completed in {progress.timeSpent}h</span>
                            <span className="flex items-center gap-1">
                              <Trophy className="w-3 h-3 text-yellow-400" />
                              Certificate earned
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Sprint Progress */}
            {userProgress.filter(p => p.status === 'in_progress').length > 0 && (
              <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-50 mb-4">Current Sprint</h3>
                {userProgress.filter(p => p.status === 'in_progress').map((progress) => {
                  const sprint = sprints.find(s => s.id === progress.sprintId);
                  if (!sprint) return null;
                  
                  return (
                    <div key={progress.sprintId} className="space-y-4">
                      <h4 className="font-medium text-gray-50">{sprint.title}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Overall Progress</span>
                          <span className="text-indigo-400">{progress.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-indigo-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        Milestone {progress.currentMilestone} of {progress.totalMilestones}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Learning Streak */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Learning Streak</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">7</div>
                <div className="text-gray-400 text-sm">Days in a row</div>
                <div className="flex items-center justify-center gap-1 mt-3">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Recommended Sprint */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Recommended Next</h3>
              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg border border-purple-500/30">
                <h4 className="font-medium text-purple-400 mb-2">AI-Powered Chat Application</h4>
                <p className="text-gray-300 text-sm mb-3">Perfect next step based on your React skills</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <span>Advanced</span>
                  <span>•</span>
                  <span>2 weeks</span>
                  <span>•</span>
                  <span>4.9 ⭐</span>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  Start Sprint
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Your Achievements</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  
                  return (
                    <div
                      key={achievement.id}
                      className={`p-6 rounded-xl border transition-all duration-300 ${
                        achievement.earned
                          ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 hover:border-yellow-500/50'
                          : 'bg-gray-700/30 border-gray-600 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.earned 
                            ? 'bg-yellow-500/20 text-yellow-400' 
                            : 'bg-gray-600/20 text-gray-500'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${
                            achievement.earned ? 'text-yellow-400' : 'text-gray-500'
                          }`}>
                            {achievement.title}
                          </h4>
                          {achievement.earned && achievement.earnedDate && (
                            <p className="text-gray-400 text-xs">
                              Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        {achievement.earned && (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        )}
                      </div>
                      <p className={`text-sm ${
                        achievement.earned ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Achievement Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Earned</span>
                  <span className="text-yellow-400 font-semibold">
                    {achievements.filter(a => a.earned).length}/{achievements.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Completion Rate</span>
                  <span className="text-green-400 font-semibold">
                    {Math.round((achievements.filter(a => a.earned).length / achievements.length) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Next Achievement</span>
                  <span className="text-purple-400 font-semibold">2 sprints away</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Skill Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">React</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-700 rounded-full">
                      <div className="w-12 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                    <span className="text-blue-400 text-sm">75%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">TypeScript</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-700 rounded-full">
                      <div className="w-8 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-green-400 text-sm">50%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Node.js</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-700 rounded-full">
                      <div className="w-10 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                    <span className="text-purple-400 text-sm">60%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sprint Detail Modal */}
      {showSprintDetail && selectedSprint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${selectedSprint.thumbnail} rounded-lg flex items-center justify-center`}>
                  {(() => {
                    const Icon = getCategoryIcon(selectedSprint.category);
                    return <Icon className="w-5 h-5 text-white" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{selectedSprint.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedSprint.difficulty)}`}>
                      {selectedSprint.difficulty}
                    </span>
                    <span className="text-gray-400 text-sm">{selectedSprint.duration}</span>
                    <span className="text-gray-400 text-sm">{selectedSprint.estimatedHours} hours</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowSprintDetail(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">What You'll Build</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">{selectedSprint.description}</p>
                    <div className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                      <h5 className="font-medium text-gray-50 mb-2">Final Deliverable</h5>
                      <p className="text-gray-300 text-sm">{selectedSprint.deliverable}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSprint.technology.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Skills You'll Learn</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedSprint.skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Prerequisites</h4>
                    <div className="space-y-2">
                      {selectedSprint.prerequisites.map((prereq) => (
                        <div key={prereq} className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-orange-400" />
                          <span className="text-gray-300 text-sm">{prereq}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <h4 className="font-semibold text-white mb-4">Sprint Stats</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Participants</span>
                        <span className="text-indigo-400">{selectedSprint.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Rating</span>
                        <span className="text-yellow-400">{selectedSprint.rating} ⭐</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Completion Rate</span>
                        <span className="text-green-400">{selectedSprint.completionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Industry</span>
                        <span className="text-purple-400">{selectedSprint.industry}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {isEnrolled(selectedSprint.id) ? (
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                        <Play className="w-5 h-5" />
                        Continue Sprint
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          enrollInSprint(selectedSprint.id);
                          setShowSprintDetail(false);
                        }}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Zap className="w-5 h-5" />
                        Start Sprint
                      </button>
                    )}
                    
                    <button className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      <Heart className="w-4 h-4" />
                      Add to Wishlist
                    </button>
                    
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share Sprint
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sprints;