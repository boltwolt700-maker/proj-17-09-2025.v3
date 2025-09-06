import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Brain, 
  Shield, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Zap, 
  RefreshCw, 
  CheckCircle,
  Star,
  Target,
  X,
  AlertCircle,
  Eye,
  Download
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
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const [aiProcessing, setAiProcessing] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'preview' | 'success' | 'error'>('idle');
  const [extractedContent, setExtractedContent] = useState('');
  const [importError, setImportError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeResume = resumes.find(r => r.id === activeResumeId) || null;

  const handleResumeSelect = (id: string) => {
    setActiveResumeId(id);
  };

  const handleSave = () => {
    // Save functionality would be implemented here
    console.log('Saving resume...');
  };

  const createNewResume = () => {
    const newResume: Resume = {
      id: Date.now().toString(),
      title: `New Resume ${resumes.length + 1}`,
      type: 'campaign',
      content: resumes.find(r => r.type === 'master')?.content || 'Start writing your resume...',
      atsScore: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setResumes([...resumes, newResume]);
    setActiveResumeId(newResume.id);
  };

  const handleImportResume = () => {
    setShowImportModal(true);
    setImportStatus('idle');
    setSelectedFile(null);
    setExtractedContent('');
    setImportError('');
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
        setImportError('Please select a valid file type (PDF, DOCX, DOC, or TXT)');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        setImportError('File size must be less than 10MB');
        return;
      }
      
      setSelectedFile(file);
      setImportError('');
      processImportedFile(file);
    }
  };

  const processImportedFile = async (file: File) => {
    setImportStatus('processing');
    
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock extracted content based on file type
      const mockContent = `JOHN DOE
Senior Software Engineer
john.doe@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years of experience developing scalable web applications using React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering high-impact solutions that serve thousands of users.

CORE SKILLS
• Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
• Backend: Node.js, Python, Express.js, RESTful APIs, GraphQL
• Databases: PostgreSQL, MongoDB, Redis
• Cloud: AWS (EC2, S3, Lambda), Docker, Kubernetes
• Tools: Git, Jest, Webpack, Vite, CI/CD pipelines

PROFESSIONAL EXPERIENCE

Senior Software Engineer | TechCorp Inc. | San Francisco, CA | 2022 - Present
• Led development of microservices architecture serving 100,000+ daily active users
• Implemented CI/CD pipelines reducing deployment time by 60% and improving reliability
• Mentored 3 junior developers and conducted comprehensive code reviews
• Collaborated with product managers and designers to deliver user-centric features
• Optimized application performance resulting in 40% faster load times

Software Engineer | StartupXYZ | Remote | 2020 - 2022
• Built responsive web applications using React and Node.js for B2B SaaS platform
• Designed and implemented RESTful APIs handling 10M+ requests per month
• Integrated third-party services including payment processing and analytics
• Participated in agile development cycles with 2-week sprints
• Improved application performance through database optimization and caching

Junior Software Developer | WebSolutions LLC | Austin, TX | 2019 - 2020
• Developed and maintained client websites using modern web technologies
• Collaborated with design team to implement pixel-perfect user interfaces
• Fixed bugs and implemented new features based on client feedback
• Learned best practices for code organization and version control

EDUCATION
Bachelor of Science in Computer Science
University of Technology | Austin, TX | 2016 - 2020
• Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems
• Senior Project: Built a task management application using React and Firebase

CERTIFICATIONS
• AWS Certified Solutions Architect - Associate (2023)
• React Developer Certification - Meta (2022)

PROJECTS
E-commerce Platform | Personal Project
• Full-stack application built with React, Node.js, and PostgreSQL
• Implemented user authentication, payment processing, and inventory management
• Deployed on AWS with automated CI/CD pipeline

Task Management App | Open Source
• Collaborative tool with real-time updates using WebSocket technology
• 500+ GitHub stars and active community contributions
• Built with React, Firebase, and Material-UI`;

      setExtractedContent(mockContent);
      setImportStatus('preview');
    } catch (error) {
      setImportError('Failed to process file. Please try again.');
      setImportStatus('error');
    }
  };

  const confirmImport = () => {
    if (!extractedContent || !selectedFile) return;
    
    const importedResume: Resume = {
      id: Date.now().toString(),
      title: selectedFile.name.replace(/\.[^/.]+$/, ''), // Remove file extension
      type: resumes.length === 0 ? 'master' : 'campaign',
      content: extractedContent,
      atsScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setResumes([...resumes, importedResume]);
    setActiveResumeId(importedResume.id);
    setShowImportModal(false);
    setImportStatus('success');
  };

  const runATSOptimization = async () => {
    if (!activeResume) return;
    
    setAiProcessing(true);
    try {
      // Simulate ATS optimization
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update ATS score
      const updatedResumes = resumes.map(r => 
        r.id === activeResumeId 
          ? { ...r, atsScore: Math.min(100, r.atsScore + Math.floor(Math.random() * 20) + 5) }
          : r
      );
      setResumes(updatedResumes);
      
      alert('ATS optimization complete! Your resume score has been improved.');
    } catch (error) {
      console.error('Error running ATS optimization:', error);
    } finally {
      setAiProcessing(false);
    }
  };

  const enhanceSelectedText = async () => {
    if (!selectedText || !activeResume) return;
    
    setAiProcessing(true);
    try {
      // Simulate text enhancement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const enhancedText = selectedText.replace(
        /responsible for/gi, 
        'successfully managed'
      ).replace(
        /worked on/gi,
        'delivered'
      );
      
      // Update resume content
      const updatedContent = activeResume.content.replace(selectedText, enhancedText);
      const updatedResumes = resumes.map(r => 
        r.id === activeResumeId 
          ? { ...r, content: updatedContent, updatedAt: new Date().toISOString() }
          : r
      );
      setResumes(updatedResumes);
      setSelectedText('');
      
      alert('Text enhanced successfully!');
    } catch (error) {
      console.error('Error enhancing text:', error);
    } finally {
      setAiProcessing(false);
    }
  };

  const justifyGaps = async () => {
    setAiProcessing(true);
    try {
      // Simulate gap justification
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Gap justification suggestions generated!');
    } catch (error) {
      console.error('Error justifying gaps:', error);
    } finally {
      setAiProcessing(false);
    }
  };

  // Empty state when no resumes exist
  if (resumes.length === 0) {
    return (
      <div className={`min-h-screen ${
        theme === 'light' ? 'bg-gray-50' : 'bg-slate-950'
      }`}>
        <div className="flex items-center justify-center min-h-screen p-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className={`text-3xl font-bold mb-4 ${
              theme === 'light' ? 'text-gray-900' : 'text-gray-50'
            }`}>Smart Resume Studio</h1>
            <p className={`text-lg mb-8 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              AI-powered resume creation and optimization
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handleImportResume}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <Upload className="w-5 h-5" />
                Select File
              </button>
              
              <button
                onClick={createNewResume}
                className={`w-full py-3 px-6 border-2 border-dashed rounded-xl font-semibold transition-all duration-300 ${
                  theme === 'light'
                    ? 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800'
                    : 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                }`}
              >
                Create New Resume
              </button>
            </div>
            
            <div className={`mt-8 p-4 rounded-lg ${
              theme === 'light' ? 'bg-blue-50 border border-blue-200' : 'bg-blue-500/10 border border-blue-500/20'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                theme === 'light' ? 'text-blue-800' : 'text-blue-400'
              }`}>
                What you can do:
              </h3>
              <ul className={`text-sm space-y-1 ${
                theme === 'light' ? 'text-blue-700' : 'text-blue-300'
              }`}>
                <li>• Import existing resumes (PDF, DOCX, DOC, TXT)</li>
                <li>• Create master and campaign resumes</li>
                <li>• AI-powered ATS optimization</li>
                <li>• Real-time content enhancement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`w-full max-w-2xl rounded-2xl border ${
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-slate-800 border-slate-700'
            }`}>
              {/* Modal Header */}
              <div className={`flex items-center justify-between p-6 border-b ${
                theme === 'light' ? 'border-gray-200' : 'border-slate-700'
              }`}>
                <h3 className={`text-xl font-semibold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Import Resume
                </h3>
                <button
                  onClick={() => setShowImportModal(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'light' 
                      ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-100' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {importStatus === 'idle' && (
                  <div>
                    <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      theme === 'light' 
                        ? 'border-gray-300 hover:border-gray-400' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.docx,.doc,.txt"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                          <Upload className="w-8 h-8 text-white" />
                        </div>
                        
                        <div>
                          <h4 className={`text-lg font-medium mb-2 ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>
                            Choose your resume file
                          </h4>
                          <p className={`text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            PDF, DOCX, DOC, or TXT (Max 10MB)
                          </p>
                        </div>
                        
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                        >
                          Select File
                        </button>
                      </div>
                    </div>

                    {importError && (
                      <div className={`mt-4 p-3 rounded-lg border ${
                        theme === 'light' 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-red-500/10 border-red-500/20'
                      }`}>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400" />
                          <p className="text-red-400 text-sm">{importError}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {importStatus === 'processing' && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <RefreshCw className="w-8 h-8 text-white animate-spin" />
                    </div>
                    <h4 className={`text-lg font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Processing your resume...
                    </h4>
                    <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                      Extracting content from {selectedFile?.name}
                    </p>
                  </div>
                )}

                {importStatus === 'preview' && (
                  <div>
                    <h4 className={`text-lg font-medium mb-4 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Preview Extracted Content
                    </h4>
                    
                    <div className={`border rounded-lg p-4 max-h-64 overflow-y-auto mb-4 ${
                      theme === 'light' 
                        ? 'border-gray-300 bg-gray-50' 
                        : 'border-gray-600 bg-slate-700'
                    }`}>
                      <pre className={`text-sm whitespace-pre-wrap ${
                        theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                      }`}>
                        {extractedContent}
                      </pre>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setImportStatus('idle')}
                        className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                          theme === 'light'
                            ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            : 'border-gray-600 text-gray-300 hover:bg-slate-700'
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmImport}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                      >
                        Import Resume
                      </button>
                    </div>
                  </div>
                )}

                {importStatus === 'error' && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-white" />
                    </div>
                    <h4 className={`text-lg font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Import Failed
                    </h4>
                    <p className={`mb-4 ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {importError || 'Unable to process the selected file'}
                    </p>
                    <button
                      onClick={() => setImportStatus('idle')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
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
  }

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
          onCreateNew={createNewResume}
          onImport={handleImportResume}
          theme={theme}
        />
      </div>

      {/* Center Panel - Resume Preview/Editor */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className={`p-4 border-b ${
          theme === 'light' 
            ? 'bg-white border-gray-200' 
            : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {activeResume ? activeResume.title : 'Resume Preview'}
            </h2>
            {activeResume && (
              <div className="flex items-center gap-3">
                <div className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  ATS Score: <span className={`font-semibold ${
                    activeResume.atsScore >= 90 ? 'text-green-500' :
                    activeResume.atsScore >= 70 ? 'text-yellow-500' :
                    'text-red-500'
                  }`}>{activeResume.atsScore}%</span>
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

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeResume ? (
            <div className="h-full p-6">
              <div className={`h-full border rounded-lg overflow-y-auto ${
                theme === 'light' 
                  ? 'bg-white border-gray-300' 
                  : 'bg-slate-800 border-slate-700'
              }`}>
                <div className="p-6">
                  <pre 
                    className={`whitespace-pre-wrap font-sans leading-relaxed cursor-text ${
                      theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                    }`}
                    onMouseUp={() => {
                      const selection = window.getSelection();
                      if (selection && selection.toString().trim()) {
                        setSelectedText(selection.toString().trim());
                      }
                    }}
                  >
                    {activeResume.content}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FileText className={`w-16 h-16 mx-auto mb-4 ${
                  theme === 'light' ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <h3 className={`text-lg font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  No Resume Selected
                </h3>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                  Select a resume from the library to view and edit
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
        <div className="p-4 h-full">
          <AICopilot
            activeResume={activeResume}
            selectedText={selectedText}
            aiProcessing={aiProcessing}
            onATSOptimization={runATSOptimization}
            onEnhanceText={enhanceSelectedText}
            onGapJustification={justifyGaps}
            theme={theme}
          />
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-2xl border ${
            theme === 'light' 
              ? 'bg-white border-gray-200' 
              : 'bg-slate-800 border-slate-700'
          }`}>
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              theme === 'light' ? 'border-gray-200' : 'border-slate-700'
            }`}>
              <h3 className={`text-xl font-semibold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Import Resume
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'light' 
                    ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-100' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {importStatus === 'idle' && (
                <div>
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    theme === 'light' 
                      ? 'border-gray-300 hover:border-gray-400' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.docx,.doc,.txt"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      
                      <div>
                        <h4 className={`text-lg font-medium mb-2 ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          Choose your resume file
                        </h4>
                        <p className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          PDF, DOCX, DOC, or TXT (Max 10MB)
                        </p>
                      </div>
                      
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        Select File
                      </button>
                    </div>
                  </div>

                  {importError && (
                    <div className={`mt-4 p-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'bg-red-50 border-red-200' 
                        : 'bg-red-500/10 border-red-500/20'
                    }`}>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <p className="text-red-400 text-sm">{importError}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {importStatus === 'processing' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <h4 className={`text-lg font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Processing your resume...
                  </h4>
                  <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                    Extracting content from {selectedFile?.name}
                  </p>
                </div>
              )}

              {importStatus === 'preview' && (
                <div>
                  <h4 className={`text-lg font-medium mb-4 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Preview Extracted Content
                  </h4>
                  
                  <div className={`border rounded-lg p-4 max-h-64 overflow-y-auto mb-4 ${
                    theme === 'light' 
                      ? 'border-gray-300 bg-gray-50' 
                      : 'border-gray-600 bg-slate-700'
                  }`}>
                    <pre className={`text-sm whitespace-pre-wrap ${
                      theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                    }`}>
                      {extractedContent}
                    </pre>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setImportStatus('idle')}
                      className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                        theme === 'light'
                          ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          : 'border-gray-600 text-gray-300 hover:bg-slate-700'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmImport}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                      Import Resume
                    </button>
                  </div>
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