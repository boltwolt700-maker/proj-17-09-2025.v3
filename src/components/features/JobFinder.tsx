import React, { useState } from 'react';
import { 
  Target, 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building, 
  Star,
  Play,
  Pause,
  Edit,
  Trash2,
  Plus,
  Filter,
  BarChart3,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Upload,
  Settings
} from 'lucide-react';

interface JobSearchCampaign {
  id: string;
  name: string;
  jobTitles: string[];
  location: string;
  workType: 'remote' | 'onsite' | 'hybrid';
  salaryRange: { min: number; max: number };
  matchThreshold: number;
  status: 'active' | 'paused';
  createdAt: string;
  lastRun: string;
  totalJobs: number;
  newJobs: number;
}

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  matchScore: number;
  postedDate: string;
  source: string;
  description: string;
  requirements: string[];
  benefits: string[];
  url: string;
}

const JobFinder = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'onboarding' | 'matches'>('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  
  // Onboarding form state
  const [workLocation, setWorkLocation] = useState<'remote' | 'onsite' | 'hybrid'>('remote');
  const [jobTypes, setJobTypes] = useState<string[]>(['fulltime']);
  const [jobTitles, setJobTitles] = useState('');
  const [seniority, setSeniority] = useState<string[]>([]);
  const [timeZones, setTimeZones] = useState<string[]>([]);
  const [matchThreshold, setMatchThreshold] = useState(75);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  // Mock data
  const campaigns: JobSearchCampaign[] = [
    {
      id: '1',
      name: 'Senior Frontend Developer',
      jobTitles: ['Senior Frontend Developer', 'Frontend Engineer', 'React Developer'],
      location: 'Remote',
      workType: 'remote',
      salaryRange: { min: 120000, max: 180000 },
      matchThreshold: 80,
      status: 'active',
      createdAt: '2024-01-15',
      lastRun: '2024-01-21 09:00',
      totalJobs: 47,
      newJobs: 3
    },
    {
      id: '2',
      name: 'Full Stack Engineer',
      jobTitles: ['Full Stack Engineer', 'Software Engineer', 'Backend Developer'],
      location: 'San Francisco, CA',
      workType: 'hybrid',
      salaryRange: { min: 140000, max: 200000 },
      matchThreshold: 75,
      status: 'paused',
      createdAt: '2024-01-10',
      lastRun: '2024-01-20 14:30',
      totalJobs: 23,
      newJobs: 0
    }
  ];

  const jobMatches: JobMatch[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      salary: '$130,000 - $170,000',
      matchScore: 94,
      postedDate: '2024-01-21',
      source: 'LinkedIn',
      description: 'We are looking for a Senior Frontend Developer to join our growing team...',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'Modern CSS'],
      benefits: ['Health insurance', 'Remote work', '401k matching'],
      url: 'https://example.com/job/1'
    },
    {
      id: '2',
      title: 'React Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      salary: '$120,000 - $150,000',
      matchScore: 87,
      postedDate: '2024-01-20',
      source: 'Indeed',
      description: 'Join our innovative team building the next generation of web applications...',
      requirements: ['React expertise', 'Node.js experience', 'Agile methodology'],
      benefits: ['Equity package', 'Flexible hours', 'Learning budget'],
      url: 'https://example.com/job/2'
    },
    {
      id: '3',
      title: 'Frontend Engineer',
      company: 'BigTech Corp',
      location: 'San Francisco, CA (Hybrid)',
      salary: '$150,000 - $190,000',
      matchScore: 82,
      postedDate: '2024-01-19',
      source: 'Company Website',
      description: 'We are seeking a talented Frontend Engineer to help build scalable web applications...',
      requirements: ['JavaScript/TypeScript', 'React/Vue/Angular', 'CSS frameworks'],
      benefits: ['Stock options', 'Health benefits', 'Gym membership'],
      url: 'https://example.com/job/3'
    }
  ];

  const handleStartOnboarding = () => {
    setShowOnboarding(true);
    setOnboardingStep(1);
    setActiveTab('onboarding');
  };

  const handleNextStep = () => {
    if (onboardingStep < 4) {
      setOnboardingStep(onboardingStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

  const handleFinishOnboarding = () => {
    // Create new campaign from onboarding data
    setShowOnboarding(false);
    setActiveTab('dashboard');
  };

  const toggleJobType = (type: string) => {
    setJobTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleSeniority = (level: string) => {
    setSeniority(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-[var(--color-bg)] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-lg">
            <Target className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[var(--color-text)]">Job Finder</h1>
            <p className="text-lg text-[var(--color-text-secondary)] mt-2">AI-powered job search and scoring engine</p>
          </div>
        </div>
        
        {!showOnboarding && (
          <button
            onClick={handleStartOnboarding}
            className="flex items-center gap-2 btn-primary px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            New Search Campaign
          </button>
        )}
      </div>

      {/* Onboarding Flow */}
      {showOnboarding && (
        <div className="glass-card-strong rounded-3xl p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--color-text)] mb-3">Copilot Configuration</h2>
            <p className="text-[var(--color-text-secondary)] text-lg">Step {onboardingStep} of 4</p>
            <p className="text-[var(--color-text)] mt-3 font-medium">
              {onboardingStep === 1 && "First, select the Work Location and Jobs you are looking for"}
              {onboardingStep === 2 && "Next, narrow your search with optional filters"}
              {onboardingStep === 3 && "Now let's complete screening questions"}
              {onboardingStep === 4 && "Final Step!"}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[var(--color-surface)] rounded-full h-3 mb-8 shadow-inner">
            <div 
              className="bg-gradient-to-r from-[var(--color-primary)] to-violet-500 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${(onboardingStep / 4) * 100}%` }}
            ></div>
          </div>

          {/* Step 1: Work Location & Job Types */}
          {onboardingStep === 1 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">Work Location</h3>
                <p className="text-[var(--color-text-secondary)] mb-6">Are you looking for jobs that are remote, have a physical location, or both?</p>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-6 border border-[var(--color-border)] rounded-2xl cursor-pointer hover:border-[var(--color-primary)]/50 surface-card hover:glass-card transition-all duration-300">
                    <input
                      type="radio"
                      name="workLocation"
                      value="remote"
                      checked={workLocation === 'remote'}
                      onChange={(e) => setWorkLocation(e.target.value as 'remote' | 'onsite' | 'hybrid')}
                      className="text-[var(--color-primary)] w-5 h-5"
                    />
                    <div>
                      <div className="text-[var(--color-text)] font-semibold text-lg">Remote Jobs</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-4 p-6 border border-[var(--color-border)] rounded-2xl cursor-pointer hover:border-[var(--color-primary)]/50 surface-card hover:glass-card transition-all duration-300">
                    <input
                      type="radio"
                      name="workLocation"
                      value="onsite"
                      checked={workLocation === 'onsite'}
                      onChange={(e) => setWorkLocation(e.target.value as 'remote' | 'onsite' | 'hybrid')}
                      className="text-[var(--color-primary)] w-5 h-5"
                    />
                    <div>
                      <div className="text-[var(--color-text)] font-semibold text-lg">On-site Jobs / Hybrid</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">Job Types</h3>
                <p className="text-[var(--color-text-secondary)] mb-6">What job types are you looking for? Select at least one.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Fulltime', 'Part-Time', 'Contractor / Temp', 'Internship'].map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleJobType(type.toLowerCase().replace(/\s+/g, ''))}
                      className={`p-4 rounded-2xl border text-center transition-all duration-300 hover:transform hover:scale-105 ${
                        jobTypes.includes(type.toLowerCase().replace(/\s+/g, ''))
                          ? 'border-[var(--color-primary)] glass-card text-[var(--color-primary)] font-semibold'
                          : 'border-[var(--color-border)] surface-card text-[var(--color-text)] hover:border-[var(--color-primary)]/50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">Job Titles</h3>
                <p className="text-[var(--color-text-secondary)] mb-6">What job titles are you looking for? Type in and select up to 5</p>
                
                <input
                  type="text"
                  value={jobTitles}
                  onChange={(e) => setJobTitles(e.target.value)}
                  placeholder="Job titles / keywords"
                  className="w-full px-4 py-4 surface-card border border-[var(--color-border)] rounded-2xl text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevStep}
              disabled={onboardingStep === 1}
              className="px-6 py-3 btn-glass rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50"
            >
              Back
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowOnboarding(false)}
                className="px-6 py-3 btn-glass rounded-2xl font-semibold transition-all duration-300"
              >
                Save & Close
              </button>
              
              {onboardingStep < 4 ? (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 btn-primary rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105"
                >
                  Next: {onboardingStep === 1 ? 'Optional Filters' : onboardingStep === 2 ? 'Profile Information' : 'Final Configuration'}
                </button>
              ) : (
                <button
                  onClick={handleFinishOnboarding}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
                >
                  Save Configuration
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard */}
      {!showOnboarding && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Campaigns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card-strong rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6">Active Search Campaigns</h3>
              
              {campaigns.length === 0 ? (
                <div className="text-center py-20">
                  <Target className="w-20 h-20 text-[var(--color-accent-alt)] mx-auto mb-6" />
                  <h4 className="text-2xl font-bold text-[var(--color-text)] mb-4">No Active Campaigns</h4>
                  <p className="text-[var(--color-text-secondary)] mb-8 text-lg">Create your first search campaign to start finding jobs</p>
                  <button
                    onClick={handleStartOnboarding}
                    className="btn-primary px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105"
                  >
                    Create Campaign
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="surface-card rounded-2xl p-6 border border-[var(--color-border)] hover:glass-card transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-4 h-4 rounded-full ${
                            campaign.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                          }`}></div>
                          <h4 className="font-bold text-[var(--color-text)] text-lg">{campaign.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            campaign.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                            title={campaign.status === 'active' ? 'Pause' : 'Resume'}
                          >
                            {campaign.status === 'active' ? 
                              <Pause className="w-5 h-5" /> : 
                              <Play className="w-5 h-5" />
                            }
                          </button>
                          <button className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors" title="Edit">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-[var(--color-text-secondary)] hover:text-red-600 transition-colors" title="Delete">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-[var(--color-text-secondary)]">Location:</span>
                          <p className="text-[var(--color-text)] font-semibold">{campaign.location}</p>
                        </div>
                        <div>
                          <span className="text-[var(--color-text-secondary)]">Salary:</span>
                          <p className="text-[var(--color-text)] font-semibold">
                            ${campaign.salaryRange.min.toLocaleString()} - ${campaign.salaryRange.max.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-[var(--color-text-secondary)]">Total Jobs:</span>
                          <p className="text-[var(--color-text)] font-semibold">{campaign.totalJobs}</p>
                        </div>
                        <div>
                          <span className="text-[var(--color-text-secondary)]">New Jobs:</span>
                          <p className="text-blue-600 font-semibold">{campaign.newJobs}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-xs text-[var(--color-text-secondary)]">
                        Last run: {campaign.lastRun} • Match threshold: {campaign.matchThreshold}%
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Job Matches */}
            <div className="glass-card-strong rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6">Recent Job Matches</h3>
              
              <div className="space-y-4">
                {jobMatches.map((job) => (
                  <div key={job.id} className="surface-card rounded-2xl p-6 border border-[var(--color-border)] hover:glass-card transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-[var(--color-text)] text-lg">{job.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getMatchScoreColor(job.matchScore)}`}>
                            {job.matchScore}% match
                          </span>
                        </div>
                        <p className="text-[var(--color-text)] text-sm mb-2 font-medium">{job.company}</p>
                        <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                          {job.salary && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {job.salary}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {job.postedDate}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.open(job.url, '_blank')}
                          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-lg"
                          title="View Job"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors shadow-lg"
                          title="Add to Tracker"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-[var(--color-text-secondary)] text-sm line-clamp-2">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search Stats */}
            <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Search Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-text)]">Active Campaigns</span>
                  <span className="text-[var(--color-primary)] font-bold">{campaigns.filter(c => c.status === 'active').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-text)]">Total Jobs Found</span>
                  <span className="text-green-600 font-bold">{campaigns.reduce((sum, c) => sum + c.totalJobs, 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-text)]">New This Week</span>
                  <span className="text-blue-600 font-bold">{campaigns.reduce((sum, c) => sum + c.newJobs, 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-text)]">Avg. Match Score</span>
                  <span className="text-purple-600 font-bold">87%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] rounded-xl transition-colors">
                  View all job matches
                </button>
                <button className="w-full text-left p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] rounded-xl transition-colors">
                  Export search results
                </button>
                <button className="w-full text-left p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] rounded-xl transition-colors">
                  Update search preferences
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">AI Insights</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <p className="text-blue-700 text-sm font-semibold mb-1">Market Trend</p>
                  <p className="text-[var(--color-text)] text-sm">Frontend roles are up 15% this month</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <p className="text-green-700 text-sm font-semibold mb-1">Skill Demand</p>
                  <p className="text-[var(--color-text)] text-sm">React and TypeScript are highly sought after</p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
                  <p className="text-purple-700 text-sm font-semibold mb-1">Salary Insight</p>
                  <p className="text-[var(--color-text)] text-sm">Your target range is competitive for your experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFinder;