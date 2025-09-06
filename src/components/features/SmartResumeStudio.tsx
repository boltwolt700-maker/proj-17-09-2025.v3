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
  Zap,
  Download,
  Save,
  Eye,
  RotateCcw,
  X
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import ResumeLibrary from './ResumeLibrary';
import AICopilot from './AICopilot';
import ResumePreview from './ResumePreview';
import ResumeListViewer from './ResumeListViewer';

interface Resume {
  id: string;
  title: string;
  type: 'master' | 'campaign';
  content: string;
  atsScore: number;
  createdAt: string;
  updatedAt: string;
}

interface FormattingSettings {
  fontStyle: string;
  fontSize: number;
  headingSize: number;
  sectionSpacing: number;
  paragraphSpacing: number;
  lineSpacing: number;
  topBottomMargin: number;
  sideMargins: number;
  paragraphIndent: number;
}

const SmartResumeStudio = () => {
  const { theme } = useTheme();
  const [step, setStep] = useState<'selection' | 'upload' | 'studio'>('selection');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [activeResume, setActiveResume] = useState<Resume | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const [viewMode, setViewMode] = useState<'edit' | 'manage'>('edit');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState('classic-1');
  const [selectedColors, setSelectedColors] = useState({
    primary: '#3B82F6',
    secondary: '#64748B',
    accent: '#8B5CF6'
  });
  const [formattingSettings, setFormattingSettings] = useState<FormattingSettings>({
    fontStyle: 'Inter',
    fontSize: 11,
    headingSize: 14,
    sectionSpacing: 16,
    paragraphSpacing: 8,
    lineSpacing: 1.4,
    topBottomMargin: 20,
    sideMargins: 20,
    paragraphIndent: 0
  });
  const [activeSections, setActiveSections] = useState<string[]>([
    'Heading',
    'Profile',
    'Core Skills',
    'Experience',
    'Education'
  ]);
  const [undoHistory, setUndoHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState(-1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('');
  const [newResumeType, setNewResumeType] = useState<'master' | 'campaign'>('campaign');
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [importError, setImportError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'design' | 'formatting' | 'sections' | 'ai'>('design');
  const [templateCategory, setTemplateCategory] = useState<'all' | 'classic' | 'photo' | 'modern'>('all');
  const [selectedText, setSelectedText] = useState('');
  const [aiProcessing, setAiProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock CV content for "Choose your CV/Resume" option
  const mockUserCV = `JOHN DOE
Software Engineer
john.doe@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years developing scalable web applications using React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering high-impact solutions.

CORE SKILLS
• Frontend: React, TypeScript, JavaScript, HTML5, CSS3
• Backend: Node.js, Python, Express.js, RESTful APIs
• Databases: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Docker, Kubernetes
• Tools: Git, Jenkins, Jira, Agile/Scrum

EXPERIENCE
Senior Software Engineer | TechCorp Inc. | 2022-Present
• Led development of microservices architecture serving 100K+ users
• Implemented CI/CD pipelines reducing deployment time by 60%
• Mentored 3 junior developers and conducted code reviews
• Collaborated with product team to define technical requirements

Software Engineer | StartupXYZ | 2020-2022
• Built responsive web applications using React and Node.js
• Optimized database queries improving application performance by 40%
• Integrated third-party APIs and payment processing systems
• Participated in agile development cycles and sprint planning

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2016-2020

CERTIFICATIONS
• AWS Certified Solutions Architect
• Certified Scrum Master (CSM)`;

  const handleChooseCV = () => {
    // Load user's existing CV
    const userResume: Resume = {
      id: 'user-cv-' + Date.now(),
      title: 'My CV',
      type: 'master',
      content: mockUserCV,
      atsScore: 78,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setResumes([userResume]);
    setActiveResumeId(userResume.id);
    setActiveResume(userResume);
    setEditorContent(userResume.content);
    setUndoHistory([userResume.content]);
    setHistoryPointer(0);
    setStep('studio');
  };

  const handleStartFromScratch = () => {
    // Create empty resume with basic structure
    const emptyResume: Resume = {
      id: 'new-cv-' + Date.now(),
      title: 'New Resume',
      type: 'master',
      content: `[YOUR NAME]
[Your Title/Position]
[Your Email] | [Your Phone] | [Your LinkedIn]

PROFESSIONAL SUMMARY
[Write a compelling summary of your professional background and key achievements]

CORE SKILLS
• [Skill 1]
• [Skill 2]
• [Skill 3]

EXPERIENCE
[Job Title] | [Company Name] | [Start Date - End Date]
• [Achievement or responsibility]
• [Achievement or responsibility]
• [Achievement or responsibility]

EDUCATION
[Degree] in [Field of Study]
[University Name] | [Graduation Year]`,
      atsScore: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setResumes([emptyResume]);
    setActiveResumeId(emptyResume.id);
    setActiveResume(emptyResume);
    setEditorContent(emptyResume.content);
    setUndoHistory([emptyResume.content]);
    setHistoryPointer(0);
    setStep('studio');
  };

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
        content: mockUserCV, // In real app, this would be extracted content
        atsScore: 75,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setResumes([newResume]);
      setActiveResumeId(newResume.id);
      setActiveResume(newResume);
      setEditorContent(newResume.content);
      setUndoHistory([newResume.content]);
      setHistoryPointer(0);
      setStep('studio');
    } catch (error) {
      setUploadError('Failed to process the uploaded file');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResumeSelect = (resumeId: string) => {
    const resume = resumes.find(r => r.id === resumeId);
    if (resume) {
      
      // Auto-proceed to preview after successful extraction
      setTimeout(() => {
        handleImportResume();
      }, 1000);
      setActiveResumeId(resumeId);
      setActiveResume(resume);
      setEditorContent(resume.content);
      setUndoHistory([resume.content]);
      setHistoryPointer(0);
      setViewMode('edit');
    }
  };

  const handleContentChange = (newContent: string) => {
    // Add current content to history before changing
    if (newContent !== editorContent) {
      const newHistory = undoHistory.slice(0, historyPointer + 1);
      newHistory.push(newContent);
      setUndoHistory(newHistory);
      setHistoryPointer(newHistory.length - 1);
      setEditorContent(newContent);
    }
  };

  const handleUndo = () => {
    if (historyPointer > 0) {
      setHistoryPointer(historyPointer - 1);
      setEditorContent(undoHistory[historyPointer - 1]);
    }
  };

  const handleSave = async () => {
    if (activeResume) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedResumes = resumes.map(r => 
        r.id === activeResume.id 
          ? { ...r, content: editorContent, updatedAt: new Date().toISOString() }
          : r
      );
      setResumes(updatedResumes);
      setActiveResume({ ...activeResume, content: editorContent, updatedAt: new Date().toISOString() });
      setIsLoading(false);
    }
  };

  const createNewResume = async () => {
    if (!newResumeTitle.trim()) return;
    
    const newResume: Resume = {
      id: Date.now().toString(),
      title: newResumeTitle,
      type: newResumeType,
      content: newResumeType === 'master' ? '' : resumes.find(r => r.type === 'master')?.content || '',
      atsScore: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setResumes([...resumes, newResume]);
    setActiveResumeId(newResume.id);
    setActiveResume(newResume);
    setEditorContent(newResume.content);
    setUndoHistory([newResume.content]);
    setHistoryPointer(0);
    setShowCreateModal(false);
    setNewResumeTitle('');
    setViewMode('edit');
  };

  const handleImportResume = async () => {
    if (!importFile) return;
    
    const extractedContent = await processImportedFile(importFile);
    
    if (!extractedContent || !extractedContent.trim()) {
      alert('Could not extract content from the file. Please try a different file.');
      return;
    }

    setShowImportModal(true);
    setImportFile(null);
    setImportStatus('idle');
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
      
      setImportFile(file);
      setImportError('');
    }
  };


  const handleAddSection = (sectionName: string) => {
    if (!activeSections.includes(sectionName)) {
      setActiveSections([...activeSections, sectionName]);
    }
  };

  const handleDeleteSection = (sectionName: string) => {
    setActiveSections(activeSections.filter(section => section !== sectionName));
  };

  const handleATSOptimization = async () => {
    setAiProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (activeResume) {
      const updatedResumes = resumes.map(r => 
        r.id === activeResume.id 
          ? { ...r, atsScore: Math.min(100, r.atsScore + 10) }
          : r
      );
      setResumes(updatedResumes);
      setActiveResume({ ...activeResume, atsScore: Math.min(100, activeResume.atsScore + 10) });
    }
    setAiProcessing(false);
  };

  const handleEnhanceText = async () => {
    setAiProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAiProcessing(false);
  };

  const handleGapJustification = async () => {
    setAiProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAiProcessing(false);
  };

  const getStatusIcon = () => {
    switch (importStatus) {
      case 'uploading':
        return <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'processing':
        return <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <FileText className="w-6 h-6 text-blue-500" />;
    }
  };

  const getStatusText = () => {
    switch (importStatus) {
      case 'uploading':
        return 'Uploading file...';
      case 'processing':
        return 'Processing resume content...';
      case 'success':
        return 'Resume imported successfully!';
      case 'error':
        return 'Import failed';
      default:
        return 'Select a file to import';
    }
  };

  // Design & Formatting Controls
  const colorPalettes = [
    { name: 'Blue', primary: '#3B82F6', secondary: '#64748B', accent: '#8B5CF6' },
    { name: 'Green', primary: '#10B981', secondary: '#64748B', accent: '#F59E0B' },
    { name: 'Purple', primary: '#8B5CF6', secondary: '#64748B', accent: '#EF4444' },
    { name: 'Orange', primary: '#F97316', secondary: '#64748B', accent: '#06B6D4' },
    { name: 'Red', primary: '#EF4444', secondary: '#64748B', accent: '#10B981' },
    { name: 'Teal', primary: '#14B8A6', secondary: '#64748B', accent: '#F59E0B' },
    { name: 'Indigo', primary: '#6366F1', secondary: '#64748B', accent: '#EC4899' },
    { name: 'Gray', primary: '#6B7280', secondary: '#9CA3AF', accent: '#3B82F6' }
  ];

  const templates = [
    // Classic Templates
    { id: 'classic-1', name: 'Professional Classic', category: 'classic', preview: 'bg-white border-2 border-gray-300', description: 'Traditional professional layout' },
    { id: 'classic-2', name: 'Executive Classic', category: 'classic', preview: 'bg-gray-50 border-2 border-gray-400', description: 'Executive-level traditional design' },
    { id: 'classic-3', name: 'Academic Classic', category: 'classic', preview: 'bg-white border-2 border-blue-300', description: 'Academic and research focused' },
    { id: 'classic-4', name: 'Corporate Classic', category: 'classic', preview: 'bg-blue-50 border-2 border-blue-400', description: 'Corporate environment optimized' },
    { id: 'classic-5', name: 'Minimal Classic', category: 'classic', preview: 'bg-white border border-gray-200', description: 'Clean minimal approach' },
    
    // Photo Templates
    { id: 'photo-1', name: 'Professional Photo', category: 'photo', preview: 'bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-300', description: 'Photo-centric professional' },
    { id: 'photo-2', name: 'Creative Photo', category: 'photo', preview: 'bg-gradient-to-r from-purple-100 to-pink-200 border-2 border-purple-300', description: 'Creative industries focused' },
    { id: 'photo-3', name: 'Executive Photo', category: 'photo', preview: 'bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-400', description: 'Executive with photo' },
    { id: 'photo-4', name: 'Modern Photo', category: 'photo', preview: 'bg-gradient-to-r from-green-100 to-teal-200 border-2 border-green-300', description: 'Modern photo layout' },
    { id: 'photo-5', name: 'Artistic Photo', category: 'photo', preview: 'bg-gradient-to-r from-orange-100 to-red-200 border-2 border-orange-300', description: 'Artistic and creative' },
    
    // Modern Templates
    { id: 'modern-1', name: 'Tech Modern', category: 'modern', preview: 'bg-gradient-to-br from-indigo-500 to-purple-600', description: 'Technology industry modern' },
    { id: 'modern-2', name: 'Creative Modern', category: 'modern', preview: 'bg-gradient-to-br from-pink-500 to-rose-600', description: 'Creative and bold design' },
    { id: 'modern-3', name: 'Business Modern', category: 'modern', preview: 'bg-gradient-to-br from-blue-500 to-cyan-600', description: 'Modern business approach' },
    { id: 'modern-4', name: 'Startup Modern', category: 'modern', preview: 'bg-gradient-to-br from-green-500 to-emerald-600', description: 'Startup environment focused' },
    { id: 'modern-5', name: 'Minimalist Modern', category: 'modern', preview: 'bg-gradient-to-br from-gray-500 to-slate-600', description: 'Ultra-modern minimal' }
  ];

  const availableSections = [
    'Heading',
    'Profile',
    'Core Skills',
    'Experience',
    'Education',
    'Initiatives Accomplishments',
    'Rewards Recognition',
    'Online Courses Certifications',
    'Activities',
    'Awards, Accomplishments, and Honors',
    'Certifications and Licenses',
    'Languages',
    'References',
    'Add Your Own'
  ];

  const fontStyles = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Source Sans Pro', 'Century Gothic'
  ];

  const filteredTemplates = templateCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === templateCategory);

  const updateFormatting = (key: keyof FormattingSettings, value: number | string) => {
    setFormattingSettings({
      ...formattingSettings,
      [key]: value
    });
  };

  // Step 1: Initial Selection
  if (step === 'selection') {
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Choose CV Option */}
          <div className={`rounded-2xl p-8 border text-center hover:transform hover:scale-105 transition-all duration-300 cursor-pointer ${
            theme === 'light' 
              ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg' 
              : 'bg-[#111827] border-gray-700/50 hover:border-blue-400/50'
          }`} onClick={handleImportResume}>
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="w-10 h-10 text-white" />
            </div>
            
            <h2 className={`text-2xl font-bold mb-4 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>Choose your CV/Resume</h2>
            <p className={`text-lg mb-6 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Load your existing CV and format it with our professional templates and AI optimization
            </p>
            
            <div className={`space-y-3 text-sm ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Upload PDF, DOCX, DOC, or TXT</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>AI content extraction and formatting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Professional template application</span>
              </div>
            </div>

            <button 
              onClick={() => setShowImportModal(true)}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2 mx-auto">
              Select Files
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Start from Scratch Option */}
          <div className={`rounded-2xl p-8 border text-center hover:transform hover:scale-105 transition-all duration-300 cursor-pointer ${
            theme === 'light' 
              ? 'bg-white border-gray-200 hover:border-green-300 hover:shadow-lg' 
              : 'bg-[#111827] border-gray-700/50 hover:border-green-400/50'
          }`} onClick={handleStartFromScratch}>
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-white" />
            </div>
            
            <h2 className={`text-2xl font-bold mb-4 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>Start from Scratch</h2>
            <p className={`text-lg mb-6 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Create a new resume from scratch with AI guidance and professional templates
            </p>
            
            <div className={`space-y-3 text-sm ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>AI-powered content suggestions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Step-by-step guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Professional formatting</span>
              </div>
            </div>

            <button className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center gap-2 mx-auto">
              Create New CV
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h3 className={`text-2xl font-bold text-center mb-8 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            What You'll Get with Smart Resume Studio
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`p-6 rounded-xl border ${
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-[#111827] border-gray-700/50'
            }`}>
              <Shield className="w-8 h-8 text-blue-400 mb-4" />
              <h4 className={`font-semibold mb-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>ATS Optimization</h4>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>Beat applicant tracking systems with AI-powered formatting</p>
            </div>

            <div className={`p-6 rounded-xl border ${
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-[#111827] border-gray-700/50'
            }`}>
              <TrendingUp className="w-8 h-8 text-green-400 mb-4" />
              <h4 className={`font-semibold mb-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>Impact Enhancement</h4>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>Transform job duties into quantifiable achievements</p>
            </div>

            <div className={`p-6 rounded-xl border ${
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-[#111827] border-gray-700/50'
            }`}>
              <Target className="w-8 h-8 text-purple-400 mb-4" />
              <h4 className={`font-semibold mb-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>Job Targeting</h4>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>Create tailored resumes for specific opportunities</p>
            </div>

            <div className={`p-6 rounded-xl border ${
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-[#111827] border-gray-700/50'
            }`}>
              <Brain className="w-8 h-8 text-orange-400 mb-4" />
              <h4 className={`font-semibold mb-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>AI Copilot</h4>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>Get intelligent suggestions and gap justification</p>
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
                        : 'border-slate-600 hover:border-slate-500'
                    }`}>
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc,.txt"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="resume-file-input"
                      />
                      
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                          <Upload className="w-8 h-8 text-white" />
                        </div>
                        
                        <div>
                          <h4 className={`text-lg font-medium mb-2 ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>
                            Choose your resume file
                          </h4>
                          <p className={`text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                          }`}>
                            PDF, DOCX, DOC, or TXT (Max 10MB)
                          </p>
                        </div>
                        
                        <label
                          htmlFor="resume-file-input"
                          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 cursor-pointer"
                        >
                          Select Files
                        </label>
                      </div>
                    </div>

                    {importError && (
                      <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <p className="text-red-600 text-sm">{importError}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {importStatus === 'processing' && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <RefreshCw className="w-8 h-8 text-white animate-spin" />
                    </div>
                    <h4 className={`text-lg font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Processing your resume...
                    </h4>
                    <p className={theme === 'light' ? 'text-gray-600' : 'text-slate-400'}>
                      Extracting content and analyzing structure
                    </p>
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
                    <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-slate-400'}`}>
                      {importError || 'Unable to process the selected file'}
                    </p>
                    <button
                      onClick={() => setImportStatus('idle')}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
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

  // Step 2: Upload (only shown if user clicked "Choose your CV/Resume")
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
            }`}>Upload Your CV/Resume</h1>
            <p className={`mt-1 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>Upload your existing CV to get started with formatting</p>
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
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
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
                       uploadedFile ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Processing complete` :
                       'PDF, DOCX, DOC, or TXT (Max 10MB)'}
                    </p>
                  </div>
                  
                  {!uploadedFile && !isProcessing && (
                    <label
                      htmlFor="resume-upload"
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer"
                    >
                      Select File
                    </label>
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
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Studio Interface (the main formatting interface)
  return (
    <div className="flex h-screen bg-slate-950">
      {/* Center Panel - Controls */}
      <div className="w-80 bg-slate-900 border-r border-slate-800 flex-shrink-0 border-l border-slate-800">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Smart Resume Studio</h2>
                <p className="text-xs text-slate-400">AI-Powered Resume Management</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="grid grid-cols-2 gap-1 bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('design')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'design' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Design
              </button>
              <button
                onClick={() => setActiveTab('formatting')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'formatting' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Formatting
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1 bg-slate-800 rounded-lg p-1 mt-2">
              <button
                onClick={() => setActiveTab('sections')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'sections' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Resume Sections
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'ai' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                AI Copilot
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'design' && (
              <div className="space-y-6">
                {/* Colors */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Colors</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {colorPalettes.map((palette) => (
                      <button
                        key={palette.name}
                        onClick={() => setSelectedColors(palette)}
                        className={`w-12 h-12 rounded-lg border-2 transition-all ${
                          selectedColors.primary === palette.primary
                            ? 'border-white scale-110'
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                        style={{ backgroundColor: palette.primary }}
                        title={palette.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Templates */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Templates</h4>
                  
                  {/* Template Categories */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    <button
                      onClick={() => setTemplateCategory('all')}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        templateCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setTemplateCategory('classic')}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        templateCategory === 'classic' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      Classic
                    </button>
                    <button
                      onClick={() => setTemplateCategory('photo')}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        templateCategory === 'photo' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      Photo
                    </button>
                    <button
                      onClick={() => setTemplateCategory('modern')}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        templateCategory === 'modern' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      Modern
                    </button>
                  </div>

                  {/* Template Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {filteredTemplates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplateId(template.id)}
                        className={`p-2 rounded-lg border transition-all ${
                          selectedTemplateId === template.id
                            ? 'border-indigo-500 bg-indigo-500/10'
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <div className={`w-full h-20 rounded mb-2 ${template.preview}`}></div>
                        <h5 className="text-xs font-medium text-white">{template.name}</h5>
                        <p className="text-xs text-slate-400 mt-1">{template.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'formatting' && (
              <div className="space-y-6">
                {/* Font Formatting */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Font Formatting</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">Font Style</label>
                      <select
                        value={formattingSettings.fontStyle}
                        onChange={(e) => updateFormatting('fontStyle', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                      >
                        {fontStyles.map((font) => (
                          <option key={font} value={font}>{font}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">
                        Font Size: {formattingSettings.fontSize}pt
                      </label>
                      <input
                        type="range"
                        min="8"
                        max="16"
                        value={formattingSettings.fontSize}
                        onChange={(e) => updateFormatting('fontSize', Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">
                        Heading Size: {formattingSettings.headingSize}pt
                      </label>
                      <input
                        type="range"
                        min="12"
                        max="20"
                        value={formattingSettings.headingSize}
                        onChange={(e) => updateFormatting('headingSize', Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                </div>

                {/* Document Formatting */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Document Formatting</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">Section Spacing</label>
                      <input
                        type="range"
                        min="8"
                        max="32"
                        value={formattingSettings.sectionSpacing}
                        onChange={(e) => updateFormatting('sectionSpacing', Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">Paragraph Spacing</label>
                      <input
                        type="range"
                        min="4"
                        max="16"
                        value={formattingSettings.paragraphSpacing}
                        onChange={(e) => updateFormatting('paragraphSpacing', Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">Line Spacing</label>
                      <input
                        type="range"
                        min="1"
                        max="2"
                        step="0.1"
                        value={formattingSettings.lineSpacing}
                        onChange={(e) => updateFormatting('lineSpacing', Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">Top & Bottom Margin</label>
                      <input
                        type="range"
                        min="10"
                        max="40"
                        value={formattingSettings.topBottomMargin}
                        onChange={(e) => updateFormatting('topBottomMargin', Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">Side Margins</label>
                      <input
                        type="range"
                        min="10"
                        max="40"
                        value={formattingSettings.sideMargins}
                        onChange={(e) => updateFormatting('sideMargins', Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">Paragraph Indent</label>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={formattingSettings.paragraphIndent}
                        onChange={(e) => updateFormatting('paragraphIndent', Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sections' && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white mb-3">Resume Sections</h4>
                
                <div className="space-y-2">
                  {availableSections.map((section) => {
                    const isActive = activeSections.includes(section);
                    return (
                      <div
                        key={section}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          isActive ? 'border-green-500 bg-green-500/10' : 'border-slate-600 bg-slate-700/30'
                        }`}
                      >
                        <span className={`text-sm ${isActive ? 'text-green-400' : 'text-slate-300'}`}>
                          {section}
                        </span>
                        {isActive ? (
                          <button
                            onClick={() => handleDeleteSection(section)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddSection(section)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <AICopilot
                activeResume={activeResume}
                selectedText={selectedText}
                aiProcessing={aiProcessing}
                onATSOptimization={handleATSOptimization}
                onEnhanceText={handleEnhanceText}
                onGapJustification={handleGapJustification}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t border-slate-800 space-y-2">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <CheckCircle className="w-4 h-4" />
              Create New Resume
            </button>
            <button 
              onClick={handleImportResume}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-slate-700 text-slate-300 rounded-lg hover:border-slate-600 hover:text-white transition-colors"
            >
              <FileText className="w-4 h-4" />
              Import Resume
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Expanded Resume Preview */}
      <div className="flex-1 bg-slate-900 flex flex-col">
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-white">
                {activeResume?.title || 'Select a Resume'}
              </h3>
              {activeResume && (
                <div className="px-2 py-1 rounded-full text-xs font-medium text-blue-400 bg-blue-500/20">
                  ATS: {activeResume.atsScore}%
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'edit' ? 'manage' : 'edit')}
                className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <Eye className="w-4 h-4" />
                {viewMode === 'edit' ? 'Manage CVs' : 'Back to Editor'}
              </button>
              <button
                onClick={handleUndo}
                disabled={historyPointer <= 0}
                className="flex items-center gap-2 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="w-4 h-4" />
                Undo
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading || viewMode === 'manage'}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                disabled={!activeResume || viewMode === 'manage'}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area - Expanded Preview */}
        <div className="flex-1 overflow-hidden">
          {viewMode === 'edit' ? (
            <ResumePreview
              content={editorContent}
              templateId={selectedTemplateId}
              colors={selectedColors}
              formatting={formattingSettings}
              activeSections={activeSections}
              onDeleteSection={handleDeleteSection}
            />
          ) : (
            <ResumeListViewer resumes={resumes} onSelectResume={handleResumeSelect} />
          )}
        </div>
      </div>

      {/* Create New Resume Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-white mb-4">Create New Resume</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Resume Title</label>
                <input
                  type="text"
                  value={newResumeTitle}
                  onChange={(e) => setNewResumeTitle(e.target.value)}
                  placeholder="e.g., Software Engineer - Google"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Resume Type</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-slate-600 rounded-lg cursor-pointer hover:border-slate-500">
                    <input
                      type="radio"
                      name="resumeType"
                      value="campaign"
                      checked={newResumeType === 'campaign'}
                      onChange={(e) => setNewResumeType(e.target.value as 'master' | 'campaign')}
                      className="text-blue-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-white">Campaign Resume</div>
                      <div className="text-xs text-slate-400">Job-specific tailored resume</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-slate-600 rounded-lg cursor-pointer hover:border-slate-500">
                    <input
                      type="radio"
                      name="resumeType"
                      value="master"
                      checked={newResumeType === 'master'}
                      onChange={(e) => setNewResumeType(e.target.value as 'master' | 'campaign')}
                      className="text-blue-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-white">Master Resume</div>
                      <div className="text-xs text-slate-400">Foundational resume template</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createNewResume}
                disabled={!newResumeTitle.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Create Resume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Resume Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Import Resume</h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <div className="flex flex-col items-center gap-3">
                  {getStatusIcon()}
                  <div>
                    <p className="text-white font-medium">{getStatusText()}</p>
                    {importFile && (
                      <p className="text-slate-400 text-sm mt-1">{importFile.name}</p>
                    )}
                  </div>
                  
                  {!importFile && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Choose File
                    </button>
                  )}
                </div>
              </div>

              {importError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{importError}</p>
                </div>
              )}

              {importFile && (
                <div className="bg-slate-700 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">{importFile.name}</p>
                      <p className="text-slate-400 text-xs">
                        {(importFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => setImportFile(null)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-slate-700 rounded-lg p-3">
                <h4 className="text-sm font-medium text-white mb-2">Supported Formats</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                  <div>• PDF (.pdf)</div>
                  <div>• Word (.docx)</div>
                  <div>• Word (.doc)</div>
                  <div>• Text (.txt)</div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Maximum file size: 10MB</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowImportModal(false)}
                className="flex-1 px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={processImportedFile}
                disabled={!importFile || importStatus === 'uploading' || importStatus === 'processing'}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {importStatus === 'uploading' ? 'Uploading...' : 
                 importStatus === 'processing' ? 'Processing...' : 
                 importStatus === 'success' ? 'Success!' : 'Import Resume'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Export Resume</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-slate-300">Choose your preferred export format:</p>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    alert('PDF download started!');
                    setShowExportModal(false);
                  }}
                  className="w-full flex items-center gap-3 p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Download as PDF</div>
                    <div className="text-sm opacity-80">Best for online applications</div>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    alert('Word document download started!');
                    setShowExportModal(false);
                  }}
                  className="w-full flex items-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Download as Word</div>
                    <div className="text-sm opacity-80">Editable document format</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartResumeStudio;