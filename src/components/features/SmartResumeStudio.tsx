import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Plus, 
  AlertCircle, 
  CheckCircle, 
  RefreshCw,
  ArrowRight,
  Star,
  Target,
  Brain,
  Shield,
  TrendingUp,
  Clock,
  Sparkles,
  Zap
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import ResumeLibrary from './ResumeLibrary';
import AICopilot from './AICopilot';

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
  const { theme } = useTheme();
  const [step, setStep] = useState<'upload' | 'studio'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const [aiProcessing, setAiProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'text/plain'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Please select a valid file type (PDF, DOCX, DOC, or TXT)');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        return;
      }
      
      setUploadedFile(file);
      setUploadError('');
      processImportedFile(file);
    }
  };

  const processImportedFile = async (file: File) => {
    setIsProcessing(true);
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a new resume from imported file
      const newResume: Resume = {
        id: Date.now().toString(),
        title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
        type: 'master',
        content: 'Imported resume content...', // In real app, this would be extracted content
        atsScore: 75,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setResumes([newResume]);
      setActiveResumeId(newResume.id);
      setStep('studio');
    } catch (error) {
      setUploadError('Failed to process the uploaded file');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreateNew = () => {
    // Create a new blank resume
    const newResume: Resume = {
      id: Date.now().toString(),
      title: 'New Resume',
      type: 'master',
      content: 'Start writing your resume here...',
      atsScore: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setResumes([newResume]);
    setActiveResumeId(newResume.id);
    setStep('studio');
  };

  const handleResumeSelect = (id: string) => {
    setActiveResumeId(id);
  };

  const handleSave = () => {
    // Save resume logic here
    console.log('Saving resume...');
  };

  const runATSOptimization = async () => {
    setAiProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Update ATS score
      if (activeResumeId) {
        setResumes(prev => prev.map(resume => 
          resume.id === activeResumeId 
            ? { ...resume, atsScore: Math.min(100, resume.atsScore + 10) }
            : resume
        ));
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

  const justifyGaps = async () => {
    setAiProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Gap justification suggestions generated!');
    } finally {
      setAiProcessing(false);
    }
  };

  const activeResume = resumes.find(r => r.id === activeResumeId) || null;

  // Upload/Create Screen
  if (step === 'upload') {
    return (
      <div className={`p-6 lg:p-8 max-w-6xl mx-auto ${
        theme === 'light' ? 'bg-gray-50' : 'bg-slate-950'
      }`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-gray-50'
            }`}>Smart Resume Studio</h1>
            <p className={`mt-1 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>AI-powered resume creation and optimization</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Resume */}
            <div className={`rounded-2xl p-6 border ${
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-[#111827] border-gray-700/50'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-gray-50'
              }`}>
                <Upload className="w-5 h-5 text-blue-400" />
                Upload Your CV/Resume
              </h3>
              
              <div className={`border-2 border-dashed rounded-xl p-8 text-center hover:border-opacity-80 transition-colors ${
                theme === 'light' 
                  ? 'border-gray-300 hover:border-gray-400' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                    {isProcessing ? (
                      <RefreshCw className="w-8 h-8 text-white animate-spin" />
                    ) : uploadedFile ? (
                      <CheckCircle className="w-8 h-8 text-white" />
                    ) : (
                      <Upload className="w-8 h-8 text-white" />
                    )}
                  </div>
                  
                  <div>
                    <h4 className={`text-lg font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-900' : 'text-gray-50'
                    }`}>
                      {isProcessing ? 'Processing...' :
                       uploadedFile ? uploadedFile.name : 'Choose your CV/Resume'}
                    </h4>
                    <p className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {isProcessing ? 'Extracting content and analyzing...' :
                       uploadedFile ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Ready to proceed` :
                       'PDF, DOCX, DOC, or TXT (Max 10MB)'}
                    </p>
                  </div>
                  
                  {!uploadedFile && !isProcessing && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                    >
                      Select File
                    </button>
                  )}
                </div>
              </div>

              {uploadError && (
                <div className={`mt-4 rounded-lg p-3 border ${
                  theme === 'light' 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-red-500/10 border-red-500/20'
                }`}>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <p className="text-red-400 text-sm">{uploadError}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Create New Resume Option */}
            <div className={`rounded-2xl p-6 border ${
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-[#111827] border-gray-700/50'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-gray-50'
              }`}>
                <Plus className="w-5 h-5 text-green-400" />
                Create New CV
              </h3>
              
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                
                <h4 className={`text-lg font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-900' : 'text-gray-50'
                }`}>
                  Start from Scratch
                </h4>
                <p className={`text-sm mb-6 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Create a new resume using our AI-powered templates and guidance
                </p>
                
                <button
                  onClick={handleCreateNew}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                >
                  Create New CV
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className={`rounded-2xl p-6 border ${
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-[#111827] border-gray-700/50'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'light' ? 'text-gray-900' : 'text-gray-50'
              }`}>Supported Formats</h3>
              <div className={`grid grid-cols-2 gap-2 text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                <div>• PDF (.pdf)</div>
                <div>• Word (.docx)</div>
                <div>• Word (.doc)</div>
                <div>• Text (.txt)</div>
              </div>
            </div>

            <div className={`rounded-2xl p-6 border ${
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-[#111827] border-gray-700/50'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'light' ? 'text-gray-900' : 'text-gray-50'
              }`}>What We Analyze</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-400 mt-1" />
                  <div>
                    <h4 className={`font-medium mb-1 ${
                      theme === 'light' ? 'text-gray-900' : 'text-gray-50'
                    }`}>ATS Compatibility</h4>
                    <p className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Format, keywords, and structure optimization</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h4 className={`font-medium mb-1 ${
                      theme === 'light' ? 'text-gray-900' : 'text-gray-50'
                    }`}>Impact Enhancement</h4>
                    <p className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Transform duties into quantifiable achievements</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className={`font-medium mb-1 ${
                      theme === 'light' ? 'text-gray-900' : 'text-gray-50'
                    }`}>Job Targeting</h4>
                    <p className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Tailor content for specific opportunities</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-400 mt-1" />
                  <div>
                    <h4 className={`font-medium mb-1 ${
                      theme === 'light' ? 'text-gray-900' : 'text-gray-50'
                    }`}>Gap Justification</h4>
                    <p className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Address career breaks professionally</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-6 border ${
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-[#111827] border-gray-700/50'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'light' ? 'text-gray-900' : 'text-gray-50'
              }`}>AI Features</h3>
              <div className={`space-y-3 text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Real-time ATS compatibility scoring</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>AI-powered content enhancement</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Industry-specific optimization</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Master and campaign resume management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Studio Interface
  return (
    <div className={`h-screen flex ${
      theme === 'light' ? 'bg-gray-50' : 'bg-slate-950'
    }`}>
      {/* Left Panel - Resume Library */}
      <div className={`w-80 border-r flex-shrink-0 ${
        theme === 'light' 
          ? 'bg-white border-gray-200' 
          : 'bg-slate-900 border-slate-800'
      }`}>
        <ResumeLibrary
          resumes={resumes}
          activeResumeId={activeResumeId}
          onSelectResume={handleResumeSelect}
        />
      </div>

      {/* Center Panel - Resume Editor */}
      <div className="flex-1 flex flex-col">
        {/* Editor Header */}
        <div className={`p-4 border-b ${
          theme === 'light' 
            ? 'bg-white border-gray-200' 
            : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className={`text-lg font-semibold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {activeResume ? activeResume.title : 'Select a Resume'}
              </h2>
              {activeResume && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activeResume.type === 'master' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : theme === 'light'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {activeResume.type === 'master' ? 'Master Resume' : 'Campaign Resume'}
                </span>
              )}
            </div>
            
            {activeResume && (
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    activeResume.atsScore >= 90 ? 'bg-green-500' : 
                    activeResume.atsScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span>ATS: {activeResume.atsScore}%</span>
                </div>
                
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 p-6">
          {activeResume ? (
            <div className={`h-full rounded-lg border p-4 ${
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-slate-800 border-slate-700'
            }`}>
              <textarea
                value={activeResume.content}
                onChange={(e) => {
                  const selection = e.target.value.substring(e.target.selectionStart, e.target.selectionEnd);
                  setSelectedText(selection);
                  
                  // Update resume content
                  setResumes(prev => prev.map(resume => 
                    resume.id === activeResume.id 
                      ? { ...resume, content: e.target.value }
                      : resume
                  ));
                }}
                onSelect={(e: any) => {
                  const selection = e.target.value.substring(e.target.selectionStart, e.target.selectionEnd);
                  setSelectedText(selection);
                }}
                className={`w-full h-full p-4 rounded-lg border resize-none focus:ring-2 focus:outline-none ${
                  theme === 'light'
                    ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                    : 'bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
                placeholder="Start writing your resume content here..."
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <FileText className={`w-16 h-16 mx-auto mb-4 ${
                  theme === 'light' ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Welcome to Smart Resume Studio
                </h3>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                  Select a resume from the library to start editing
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - AI Copilot */}
      <div className={`w-80 border-l flex-shrink-0 ${
        theme === 'light' 
          ? 'bg-white border-gray-200' 
          : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="p-4">
          <AICopilot
            activeResume={activeResume}
            selectedText={selectedText}
            aiProcessing={aiProcessing}
            onATSOptimization={runATSOptimization}
            onEnhanceText={enhanceSelectedText}
            onGapJustification={justifyGaps}
          />
        </div>
      </div>
    </div>
  );
};

export default SmartResumeStudio;