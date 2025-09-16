import React, { useState } from 'react';
import { 
  FileText, 
  Star, 
  Target, 
  Plus, 
  Upload, 
  Brain, 
  Shield, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Zap, 
  RefreshCw, 
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

interface Resume {
  id: string;
  title: string;
  type: 'master' | 'campaign';
  content: string;
  atsScore: number;
  createdAt: string;
  updatedAt: string;
}

const SmartResumeStudio = () => {
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: '1',
      title: 'Master Resume',
      type: 'master',
      content: 'Master resume content...',
      atsScore: 85,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Frontend Developer - Google',
      type: 'campaign',
      content: 'Tailored resume content...',
      atsScore: 92,
      createdAt: '2024-01-18',
      updatedAt: '2024-01-21'
    }
  ]);
  
  const [activeResumeId, setActiveResumeId] = useState<string | null>(resumes[0]?.id || null);
  const [selectedText, setSelectedText] = useState('');
  const [aiProcessing, setAiProcessing] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');

  const activeResume = resumes.find(r => r.id === activeResumeId);
  const masterResume = resumes.find(r => r.type === 'master');
  const campaignResumes = resumes.filter(r => r.type === 'campaign');

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-700';
    if (score >= 70) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'text/plain'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid file type (PDF, DOCX, DOC, or TXT)');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      
      setImportFile(file);
      processImportedFile(file);
    }
  };

  const processImportedFile = async (file: File) => {
    setImportStatus('uploading');
    
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setImportStatus('processing');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new resume from imported file
      const newResume: Resume = {
        id: Date.now().toString(),
        title: `Imported Resume - ${file.name.replace(/\.[^/.]+$/, "")}`,
        type: resumes.length === 0 ? 'master' : 'campaign',
        content: `Imported content from ${file.name}...`,
        atsScore: Math.floor(Math.random() * 30) + 70,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setResumes([...resumes, newResume]);
      setActiveResumeId(newResume.id);
      setImportStatus('success');
      
      setTimeout(() => {
        setShowImportModal(false);
        setImportFile(null);
        setImportStatus('idle');
      }, 1500);
      
    } catch (error) {
      setImportStatus('error');
    }
  };

  const createNewResume = () => {
    const newResume: Resume = {
      id: Date.now().toString(),
      title: `New Resume ${resumes.length + 1}`,
      type: resumes.length === 0 ? 'master' : 'campaign',
      content: 'Start writing your resume content here...',
      atsScore: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setResumes([...resumes, newResume]);
    setActiveResumeId(newResume.id);
  };

  const runATSOptimization = async () => {
    setAiProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Update ATS score
      if (activeResume) {
        const updatedResumes = resumes.map(r => 
          r.id === activeResume.id 
            ? { ...r, atsScore: Math.min(100, r.atsScore + Math.floor(Math.random() * 15) + 5) }
            : r
        );
        setResumes(updatedResumes);
      }
    } finally {
      setAiProcessing(false);
    }
  };

  const enhanceSelectedText = async () => {
    if (!selectedText) return;
    setAiProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Simulate text enhancement
      alert('Text enhanced successfully!');
    } finally {
      setAiProcessing(false);
    }
  };

  const handleGapJustification = async () => {
    setAiProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Gap justification suggestions generated!');
    } finally {
      setAiProcessing(false);
    }
  };

  return (
    <div className="h-screen flex bg-[var(--color-bg)]">
      {/* Left Panel - Resume Library */}
      <div className="w-80 glass-card-strong border-r border-[var(--color-border)] flex-shrink-0">
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-[var(--color-primary)] to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text)]">Smart Resume Studio</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">AI-Powered Resume Management</p>
            </div>
          </div>

          {/* Master Resume */}
          {masterResume && (
            <div
              className={`p-4 rounded-2xl border-2 mb-6 cursor-pointer transition-all duration-300 hover:transform hover:scale-105 ${
                activeResumeId === masterResume.id
                  ? 'border-[var(--color-primary)] glass-card'
                  : 'border-[var(--color-border)] surface-card hover:border-[var(--color-primary)]/50'
              }`}
              onClick={() => setActiveResumeId(masterResume.id)}
            >
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-semibold text-[var(--color-text)]">Master Resume</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  masterResume.atsScore >= 90 ? 'bg-green-500' :
                  masterResume.atsScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  ATS Optimized: {masterResume.atsScore}%
                </span>
              </div>
            </div>
          )}

          {/* Campaign Resumes */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-6">
            <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">
              Campaign Resumes
            </h3>
            {campaignResumes.map((resume) => (
              <div
                key={resume.id}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 hover:transform hover:scale-105 ${
                  activeResumeId === resume.id
                    ? 'border-[var(--color-primary)] glass-card'
                    : 'border-[var(--color-border)] surface-card hover:border-[var(--color-primary)]/50'
                }`}
                onClick={() => setActiveResumeId(resume.id)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-4 h-4 text-[var(--color-primary)]" />
                  <span className="font-medium text-[var(--color-text)] text-sm line-clamp-1">
                    {resume.title}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    {new Date(resume.updatedAt).toLocaleDateString()}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getScoreBadgeColor(resume.atsScore)}`}>
                    {resume.atsScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={createNewResume}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 btn-primary rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Create New Resume
            </button>
            <button 
              onClick={() => setShowImportModal(true)}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 btn-glass rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105"
            >
              <Upload className="w-5 h-5" />
              Import Resume
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Editor & AI Copilot */}
      <div className="flex-1 flex">
        {/* Main Editor Area */}
        <div className="flex-1 glass-card m-6 rounded-3xl overflow-hidden">
          {!activeResumeId ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FileText className="w-16 h-16 text-[var(--color-accent-alt)] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">
                  Welcome to Smart Resume Studio
                </h3>
                <p className="text-[var(--color-text-secondary)] max-w-md">
                  Select a resume from the library or create a new one to get started with AI-powered optimization.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              {/* Editor Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[var(--color-primary)] to-purple-600 rounded-xl flex items-center justify-center">
                    {activeResume?.type === 'master' ? 
                      <Star className="w-5 h-5 text-white" /> : 
                      <Target className="w-5 h-5 text-white" />
                    }
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text)]">{activeResume?.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {activeResume?.type === 'master' ? 'Master Resume' : 'Campaign Resume'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-2 rounded-xl font-medium text-sm ${getScoreBadgeColor(activeResume?.atsScore || 0)}`}>
                    ATS Score: {activeResume?.atsScore}%
                  </div>
                  <button className="btn-glass px-4 py-2 rounded-xl font-medium text-sm">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Editor Content */}
              <div className="flex-1 p-6">
                <textarea
                  value={activeResume?.content || ''}
                  onChange={(e) => {
                    if (activeResume) {
                      const updatedResumes = resumes.map(r => 
                        r.id === activeResume.id 
                          ? { ...r, content: e.target.value, updatedAt: new Date().toISOString() }
                          : r
                      );
                      setResumes(updatedResumes);
                    }
                  }}
                  onSelect={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    const selectedText = target.value.substring(target.selectionStart, target.selectionEnd);
                    setSelectedText(selectedText);
                  }}
                  placeholder="Start writing your resume content here..."
                  className="w-full h-full p-6 surface-card rounded-2xl border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none resize-none transition-all duration-300"
                />
              </div>
            </div>
          )}
        </div>

        {/* AI Copilot Sidebar */}
        <div className="w-80 glass-card-strong border-l border-[var(--color-border)] m-6 ml-0 rounded-3xl">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-[var(--color-primary)]" />
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text)]">AI Copilot</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {activeResume?.type === 'master' ? 'Foundational Check' : 'Targeted Optimization'}
                </p>
              </div>
            </div>

            {activeResume && (
              <>
                {/* ATS Score Display */}
                <div className="surface-card rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-[var(--color-text)]">ATS Compatibility</span>
                    <Shield className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div className={`text-3xl font-bold mb-2 ${getScoreColor(activeResume.atsScore)}`}>
                    {activeResume.atsScore}%
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    {activeResume.atsScore >= 90 ? 'Excellent' : 
                     activeResume.atsScore >= 70 ? 'Good' : 'Needs Improvement'}
                  </div>
                </div>

                {/* AI Tools */}
                <div className="space-y-4 mb-6">
                  <button
                    onClick={runATSOptimization}
                    disabled={aiProcessing}
                    className="w-full flex items-center gap-4 p-4 surface-card hover:glass-card rounded-2xl transition-all duration-300 hover:transform hover:scale-105 disabled:opacity-50"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div className="text-left flex-1">
                      <div className="text-sm font-semibold text-[var(--color-text)]">ATS Compatibility</div>
                      <div className="text-xs text-[var(--color-text-secondary)]">Scan for formatting issues</div>
                    </div>
                    {aiProcessing && <RefreshCw className="w-4 h-4 animate-spin text-[var(--color-primary)]" />}
                  </button>

                  <button
                    onClick={enhanceSelectedText}
                    disabled={!selectedText || aiProcessing}
                    className="w-full flex items-center gap-4 p-4 surface-card hover:glass-card rounded-2xl transition-all duration-300 hover:transform hover:scale-105 disabled:opacity-50"
                  >
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <div className="text-left flex-1">
                      <div className="text-sm font-semibold text-[var(--color-text)]">Impact Enhancer</div>
                      <div className="text-xs text-[var(--color-text-secondary)]">Transform bullets into achievements</div>
                    </div>
                  </button>

                  <button
                    onClick={handleGapJustification}
                    disabled={aiProcessing}
                    className="w-full flex items-center gap-4 p-4 surface-card hover:glass-card rounded-2xl transition-all duration-300 hover:transform hover:scale-105 disabled:opacity-50"
                  >
                    <Clock className="w-5 h-5 text-orange-600" />
                    <div className="text-left flex-1">
                      <div className="text-sm font-semibold text-[var(--color-text)]">Gap Justifier</div>
                      <div className="text-xs text-[var(--color-text-secondary)]">Address career breaks</div>
                    </div>
                  </button>
                </div>

                {/* Selected Text Enhancement */}
                {selectedText && (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
                    <h4 className="text-sm font-semibold text-blue-800 mb-2">Selected Text</h4>
                    <p className="text-xs text-blue-700 mb-3 line-clamp-3">{selectedText}</p>
                    <button
                      onClick={enhanceSelectedText}
                      disabled={aiProcessing}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-50"
                    >
                      <Zap className="w-4 h-4" />
                      Enhance Text
                    </button>
                  </div>
                )}

                {/* AI Tips */}
                <div className="surface-card rounded-2xl p-4">
                  <h4 className="text-sm font-semibold text-[var(--color-text)] mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
                    AI Tips
                  </h4>
                  <div className="space-y-3 text-xs text-[var(--color-text-secondary)]">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full mt-1.5 flex-shrink-0"></div>
                      <p>Use action verbs to start bullet points</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full mt-1.5 flex-shrink-0"></div>
                      <p>Include quantifiable achievements</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full mt-1.5 flex-shrink-0"></div>
                      <p>Match keywords from job descriptions</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="glass-card-strong rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h3 className="text-xl font-bold text-[var(--color-text)]">Import Resume</h3>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportFile(null);
                  setImportStatus('idle');
                }}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {importStatus === 'idle' && (
                <div className="border-2 border-dashed border-[var(--color-border)] rounded-2xl p-8 text-center hover:border-[var(--color-primary)]/50 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[var(--color-primary)] to-purple-600 rounded-3xl flex items-center justify-center">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                        Choose your resume file
                      </h4>
                      <p className="text-[var(--color-text-secondary)] text-sm">
                        PDF, DOCX, DOC, or TXT (Max 10MB)
                      </p>
                    </div>
                    
                    <label
                      htmlFor="file-upload"
                      className="btn-primary px-6 py-3 rounded-2xl font-semibold cursor-pointer transition-all duration-300 hover:transform hover:scale-105"
                    >
                      Select File
                    </label>
                  </div>
                </div>
              )}

              {(importStatus === 'uploading' || importStatus === 'processing') && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-[var(--color-primary)] to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <RefreshCw className="w-10 h-10 text-white animate-spin" />
                  </div>
                  <h4 className="text-xl font-bold text-[var(--color-text)] mb-2">
                    {importStatus === 'uploading' ? 'Uploading...' : 'Processing...'}
                  </h4>
                  <p className="text-[var(--color-text-secondary)]">
                    {importStatus === 'uploading' ? 'Uploading your resume file' : 'Extracting and analyzing content'}
                  </p>
                </div>
              )}

              {importStatus === 'success' && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-[var(--color-text)] mb-2">Import Successful!</h4>
                  <p className="text-[var(--color-text-secondary)]">Your resume has been imported and is ready for optimization.</p>
                </div>
              )}

              {importStatus === 'error' && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-[var(--color-text)] mb-2">Import Failed</h4>
                  <p className="text-[var(--color-text-secondary)] mb-4">There was an error processing your file. Please try again.</p>
                  <button
                    onClick={() => setImportStatus('idle')}
                    className="btn-primary px-6 py-3 rounded-2xl font-semibold"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartResumeStudio;