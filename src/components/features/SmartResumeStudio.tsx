import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Plus, 
  Star, 
  Target, 
  Brain, 
  Shield, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Zap, 
  RefreshCw, 
  CheckCircle,
  Download,
  Eye,
  Edit,
  Trash2,
  Save,
  X,
  AlertCircle
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
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: '1',
      title: 'Master Resume',
      type: 'master',
      content: `JOHN DOE
Software Engineer
john.doe@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years developing scalable web applications using React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering high-impact solutions that serve thousands of users.

CORE SKILLS
• Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
• Backend: Node.js, Python, Express.js, RESTful APIs, GraphQL
• Databases: PostgreSQL, MongoDB, Redis
• Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD, Jenkins
• Tools: Git, Jira, Figma, VS Code

EXPERIENCE

Senior Software Engineer | TechCorp Inc. | San Francisco, CA | 2022 - Present
• Led development of microservices architecture serving 100,000+ active users
• Implemented CI/CD pipelines reducing deployment time by 60% and improving reliability
• Mentored 3 junior developers and conducted comprehensive code reviews
• Collaborated with product managers and designers to deliver user-centric features

Software Engineer | StartupXYZ | Remote | 2020 - 2022
• Built responsive web applications using React and Node.js for B2B SaaS platform
• Optimized database queries and API endpoints improving application performance by 40%
• Participated in agile development cycles and sprint planning
• Integrated third-party APIs and payment processing systems

Junior Software Developer | WebSolutions LLC | Austin, TX | 2019 - 2020
• Developed and maintained client websites using modern web technologies
• Collaborated with design team to implement pixel-perfect UI components
• Performed testing and debugging to ensure cross-browser compatibility

EDUCATION
Bachelor of Science in Computer Science | University of Technology | 2015 - 2019
• Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems
• Senior Project: Built a real-time chat application using React and Socket.io

CERTIFICATIONS
• React Developer Certification - Meta (2022)

PROJECTS
E-commerce Platform | Personal Project
• Full-stack application built with React, Node.js, and PostgreSQL
• Implemented user authentication, payment processing, and inventory management
• Deployed on AWS with automated CI/CD pipeline

Task Management App | Open Source Contribution
• Contributed to popular open-source project with 2,000+ GitHub stars
• Implemented real-time collaboration features using WebSocket technology
• Improved application performance and user experience`,
      atsScore: 85,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Frontend Developer - Google',
      type: 'campaign',
      content: 'Tailored resume content for Google Frontend Developer position...',
      atsScore: 92,
      createdAt: '2024-01-18',
      updatedAt: '2024-01-21'
    },
    {
      id: '3',
      title: 'Full Stack Engineer - Meta',
      type: 'campaign',
      content: 'Tailored resume content for Meta Full Stack Engineer position...',
      atsScore: 88,
      createdAt: '2024-01-19',
      updatedAt: '2024-01-21'
    }
  ]);
  const [selectedText, setSelectedText] = useState('');
  const [aiProcessing, setAiProcessing] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');

  const activeResume = resumes.find(r => r.id === activeResumeId);

  const handleResumeSelect = (id: string) => {
    setActiveResumeId(id);
  };

  const handleSave = () => {
    // Simulate saving
    console.log('Saving resume...');
  };

  const runATSOptimization = async () => {
    if (!activeResume) return;
    
    setAiProcessing(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update ATS score
      setResumes(prev => prev.map(r => 
        r.id === activeResume.id 
          ? { ...r, atsScore: Math.min(100, r.atsScore + Math.floor(Math.random() * 10) + 5) }
          : r
      ));
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
      // Simulate AI text enhancement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock enhancement
      const enhanced = selectedText.replace(
        /responsible for/gi, 
        'successfully managed'
      ).replace(
        /worked on/gi,
        'delivered'
      );
      
      console.log('Enhanced text:', enhanced);
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
      console.log('Gap justification suggestions generated');
    } catch (error) {
      console.error('Error generating gap justification:', error);
    } finally {
      setAiProcessing(false);
    }
  };

  const createNewResume = () => {
    const newResume: Resume = {
      id: Date.now().toString(),
      title: \`New Resume ${resumes.length + 1}`,
      type: 'campaign',
      content: resumes.find(r => r.type === 'master')?.content || 'Start writing your resume...',
      atsScore: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setResumes(prev => [...prev, newResume]);
    setActiveResumeId(newResume.id);
  };

  const handleImportResume = () => {
    setShowImportModal(true);
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      setImportStatus('processing');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock extracted content
      const extractedContent = `IMPORTED RESUME CONTENT
${file.name}

This is mock content extracted from your uploaded resume file.
The actual implementation would parse PDF/DOCX files and extract the text content.

PROFESSIONAL SUMMARY
[Extracted summary from your resume...]

EXPERIENCE
[Extracted work experience...]

EDUCATION
[Extracted education information...]

SKILLS
[Extracted skills list...]`;

      const importedResume: Resume = {
        id: Date.now().toString(),
        title: `Imported - ${file.name.replace(/\.[^/.]+$/, '')}`,
        type: 'campaign',
        content: extractedContent,
        atsScore: Math.floor(Math.random() * 30) + 60, // Random score between 60-90
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setResumes(prev => [...prev, importedResume]);
      setActiveResumeId(importedResume.id);
      setImportStatus('success');
      
      // Close modal after success
      setTimeout(() => {
        setShowImportModal(false);
        setImportFile(null);
        setImportStatus('idle');
      }, 1500);
      
    } catch (error) {
      console.error('Error processing file:', error);
      setImportStatus('error');
    }
  };

  // If no resumes exist, show onboarding
  if (resumes.length === 0) {
    return (
      <div className={\`min-h-screen ${
        theme === 'light' ? 'bg-gray-50' : 'bg-slate-950'
      }`}>
        <div className="flex items-center justify-center min-h-screen p-6">
          <div className="text-center max-w-2xl">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className={\`text-3xl font-bold mb-4 ${
              theme === 'light' ? 'text-gray-900' : 'text-gray-50'
            }`}>Smart Resume Studio</h1>
            <p className={\`text-lg mb-8 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              AI-powered resume creation and optimization platform
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Choose CV Option */}
              <div className={\`rounded-2xl p-8 border text-center hover:transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                theme === 'light'
                  ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg'
                  : 'bg-[#111827] border-gray-700/50 hover:border-blue-400/50'
              }`}>
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-10 h-10 text-white" />
                </div>

                <h2 className={\`text-2xl font-bold mb-4 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>Choose your CV/Resume</h2>
                <p className={\`text-lg mb-6 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Upload an existing resume to get started with AI optimization
                </p>
                
                <button
                  onClick={handleImportResume}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Import Resume
                </button>
              </div>

              {/* Create New Option */}
              <div className={\`rounded-2xl p-8 border text-center hover:transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                theme === 'light'
                  ? 'bg-white border-gray-200 hover:border-green-300 hover:shadow-lg'
                  : 'bg-[#111827] border-gray-700/50 hover:border-green-400/50'
              }`}>
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Plus className="w-10 h-10 text-white" />
                </div>

                <h2 className={\`text-2xl font-bold mb-4 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>Create from Scratch</h2>
                <p className={\`text-lg mb-6 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Start with a blank template and build your resume with AI assistance
                </p>
                
                <button
                  onClick={createNewResume}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                >
                  Create New Resume
                </button>
              </div>
            </div>

            <div className={\`mt-12 p-6 rounded-xl border ${
              theme === 'light' 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-blue-500/10 border-blue-500/20'
            }`}>
              <h3 className={\`text-lg font-semibold mb-3 ${
                theme === 'light' ? 'text-blue-800' : 'text-blue-400'
              }`}>
                What makes Smart Resume Studio different?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Star className={\`w-5 h-5 mt-0.5 ${
                    theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                  }`} />
                  <div>
                    <p className={\`font-medium ${
                      theme === 'light' ? 'text-blue-800' : 'text-blue-300'
                    }`}>Master + Campaign Strategy</p>
                    <p className={theme === 'light' ? 'text-blue-700' : 'text-blue-200'}>
                      One foundational resume, infinite job-specific versions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Brain className={\`w-5 h-5 mt-0.5 ${
                    theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                  }`} />
                  <div>
                    <p className={\`font-medium ${
                      theme === 'light' ? 'text-blue-800' : 'text-blue-300'
                    }`}>AI-Powered Optimization</p>
                    <p className={theme === 'light' ? 'text-blue-700' : 'text-blue-200'}>
                      Real-time ATS scoring and intelligent suggestions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={\`flex h-screen ${
      theme === 'light' ? 'bg-gray-50' : 'bg-slate-950'
    }`}>
      {/* Left Panel - Resume Library */}
      <div className={\`w-80 border-r flex-shrink-0 ${
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
        />
      </div>

      {/* Center Panel - Resume Editor */}
      <div className="flex-1 flex flex-col">
        {activeResume ? (
          <>
            {/* Editor Header */}
            <div className={\`flex items-center justify-between p-4 border-b ${
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {activeResume.type === 'master' ? (
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  ) : (
                    <Target className="w-5 h-5 text-orange-400" />
                  )}
                  <h2 className={\`text-lg font-semibold ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {activeResume.title}
                  </h2>
                </div>
                <span className={\`text-xs px-2 py-1 rounded-full ${
                  activeResume.type === 'master' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {activeResume.type === 'master' ? 'Master Resume' : 'Campaign Resume'}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={\`w-2 h-2 rounded-full ${
                    activeResume.atsScore >= 90 ? 'bg-green-500' :
                    activeResume.atsScore >= 70 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}></div>
                  <span className={\`text-sm font-medium ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    ATS: {activeResume.atsScore}%
                  </span>
                </div>
                
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 flex">
              {/* Document Editor */}
              <div className={\`flex-1 p-6 overflow-y-auto ${
                theme === 'light' ? 'bg-white' : 'bg-slate-900'
              }`}>
                <div className="max-w-4xl mx-auto">
                  <textarea
                    value={activeResume.content}
                    onChange={(e) => {
                      const selection = e.target.selectionStart !== e.target.selectionEnd 
                        ? e.target.value.substring(e.target.selectionStart, e.target.selectionEnd)
                        : '';
                      setSelectedText(selection);
                      
                      // Update resume content
                      setResumes(prev => prev.map(r => 
                        r.id === activeResume.id 
                          ? { ...r, content: e.target.value, updatedAt: new Date().toISOString() }
                          : r
                      ));
                    }}
                    onSelect={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      const selection = target.selectionStart !== target.selectionEnd 
                        ? target.value.substring(target.selectionStart, target.selectionEnd)
                        : '';
                      setSelectedText(selection);
                    }}
                    className={\`w-full h-full min-h-96 p-4 border rounded-lg font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      theme === 'light'
                        ? 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                        : 'bg-slate-800 border-slate-700 text-gray-50 focus:border-blue-500'
                    }`}
                    placeholder="Start writing your resume content here..."
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={\`flex-1 flex items-center justify-center ${
            theme === 'light' ? 'bg-gray-50' : 'bg-slate-950'
          }`}>
            <div className="text-center">
              <FileText className={\`w-16 h-16 mx-auto mb-4 ${
                theme === 'light' ? 'text-gray-400' : 'text-slate-600'
              }`} />
              <h3 className={\`text-xl font-semibold mb-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Select a Resume to Get Started
              </h3>
              <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                Choose a resume from the library or create a new one
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - AI Copilot */}
      <div className={\`w-80 border-l flex-shrink-0 ${
        theme === 'light' 
          ? 'bg-gray-50 border-gray-200' 
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

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={\`w-full max-w-md rounded-2xl p-6 ${
            theme === 'light' ? 'bg-white' : 'bg-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={\`text-lg font-semibold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Import Resume
              </h3>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportFile(null);
                  setImportStatus('idle');
                }}
                className={\`text-gray-400 hover:text-gray-600 ${
                  theme === 'light' ? 'hover:text-gray-600' : 'hover:text-white'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {importStatus === 'idle' && (
              <div>
                <div className={\`border-2 border-dashed rounded-lg p-6 text-center mb-4 ${
                  theme === 'light' 
                    ? 'border-gray-300 hover:border-gray-400' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  
                  <Upload className={\`w-12 h-12 mx-auto mb-4 ${
                    theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer"
                  >
                    <div className={\`text-lg font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Choose File
                    </div>
                    <p className={\`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      PDF, DOCX, DOC, or TXT (Max 10MB)
                    </p>
                  </label>
                </div>

                <div className={\`text-xs p-3 rounded-lg ${
                  theme === 'light' ? 'bg-gray-100 text-gray-600' : 'bg-slate-700 text-gray-400'
                }`}>
                  <p className="font-medium mb-1">Supported formats:</p>
                  <p>• PDF (.pdf) • Word (.docx, .doc) • Text (.txt)</p>
                </div>
              </div>
            )}

            {importStatus === 'uploading' && (
              <div className="text-center py-8">
                <RefreshCw className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
                <h4 className={\`text-lg font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Uploading...
                </h4>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                  {importFile?.name}
                </p>
              </div>
            )}

            {importStatus === 'processing' && (
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4 animate-pulse" />
                <h4 className={\`text-lg font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Processing...
                </h4>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                  Extracting content and analyzing structure
                </p>
              </div>
            )}

            {importStatus === 'success' && (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className={\`text-lg font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Import Successful!
                </h4>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                  Your resume has been imported and is ready for optimization
                </p>
              </div>
            )}

            {importStatus === 'error' && (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h4 className={\`text-lg font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Import Failed
                </h4>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                  Please try again with a different file
                </p>
                <button
                  onClick={() => setImportStatus('idle')}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartResumeStudio;