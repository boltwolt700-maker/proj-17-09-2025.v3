import React, { useState } from 'react';
import { 
  Target, 
  Upload, 
  FileText, 
  Sparkles, 
  Download, 
  Eye, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  X,
  Building,
  User,
  Briefcase
} from 'lucide-react';

const ApplicationTailor = () => {
  const [step, setStep] = useState<'upload' | 'job-input' | 'analysis' | 'results'>('upload');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Please select a valid file type (PDF or DOCX)');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        return;
      }
      
      setResumeFile(file);
      setUploadError('');
      setStep('job-input');
    }
  };

  const handleAnalysis = async () => {
    if (!jobDescription.trim()) return;
    
    setIsProcessing(true);
    setStep('analysis');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setStep('results');
    } catch (error) {
      console.error('Error during analysis:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-[var(--color-bg)] min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-r from-[var(--color-primary)] to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
          <Target className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-[var(--color-text)]">Application Tailor</h1>
          <p className="text-lg text-[var(--color-text-secondary)] mt-2">Tailor resumes for specific job applications</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-[var(--color-text)]">Progress</span>
          <span className="text-sm text-[var(--color-text-secondary)]">
            Step {step === 'upload' ? 1 : step === 'job-input' ? 2 : step === 'analysis' ? 3 : 4} of 4
          </span>
        </div>
        <div className="w-full bg-[var(--color-surface)] rounded-full h-3 shadow-inner">
          <div 
            className="bg-gradient-to-r from-[var(--color-primary)] to-purple-600 h-3 rounded-full transition-all duration-500 shadow-lg"
            style={{ 
              width: step === 'upload' ? '25%' : 
                     step === 'job-input' ? '50%' : 
                     step === 'analysis' ? '75%' : '100%' 
            }}
          ></div>
        </div>
      </div>

      {/* Step 1: Resume Upload */}
      {step === 'upload' && (
        <div className="max-w-2xl mx-auto">
          <div className="glass-card-strong rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6 text-center">Upload Your Resume</h3>
            
            <div className="border-2 border-dashed border-[var(--color-border)] rounded-3xl p-12 text-center hover:border-[var(--color-primary)]/50 transition-colors">
              <input
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-r from-[var(--color-primary)] to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-[var(--color-text)] mb-3">
                    {resumeFile ? resumeFile.name : 'Choose your resume file'}
                  </h4>
                  <p className="text-[var(--color-text-secondary)]">
                    {resumeFile ? 
                      `${(resumeFile.size / 1024 / 1024).toFixed(2)} MB • Ready to proceed` :
                      'PDF or DOCX format (Max 10MB)'
                    }
                  </p>
                </div>
                
                <label
                  htmlFor="resume-upload"
                  className="btn-primary px-8 py-4 rounded-2xl font-semibold cursor-pointer transition-all duration-300 hover:transform hover:scale-105"
                >
                  {resumeFile ? 'Change File' : 'Select File'}
                </label>
              </div>
            </div>

            {uploadError && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-700 font-medium">{uploadError}</p>
                </div>
              </div>
            )}

            {resumeFile && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep('job-input')}
                  className="btn-primary px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105"
                >
                  Continue to Job Details
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Job Input */}
      {step === 'job-input' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card-strong rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6 flex items-center gap-3">
                <Building className="w-6 h-6 text-[var(--color-primary)]" />
                Company Information
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
                  Company Website or Job Posting URL (Optional)
                </label>
                <input
                  type="url"
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                  placeholder="https://company.com or job posting URL"
                  className="w-full px-4 py-3 surface-card border border-[var(--color-border)] rounded-2xl text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all duration-300"
                />
                <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                  AI will analyze company culture and values for better personalization
                </p>
              </div>
            </div>

            <div className="glass-card-strong rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-purple-600" />
                Job Description
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
                  Complete Job Posting
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here..."
                  rows={12}
                  className="w-full px-4 py-3 surface-card border border-[var(--color-border)] rounded-2xl text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none resize-none transition-all duration-300"
                />
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Include job title, requirements, responsibilities, and company information
                  </p>
                  <span className="text-xs text-[var(--color-text-secondary)]">
                    {jobDescription.length} characters
                  </span>
                </div>
              </div>

              <button
                onClick={handleAnalysis}
                disabled={!jobDescription.trim() || isProcessing}
                className="w-full mt-6 btn-primary px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze & Tailor Resume
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card-strong rounded-3xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-4">Resume Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-[var(--color-text)] text-sm">Resume uploaded successfully</span>
                </div>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  <strong className="text-[var(--color-text)]">File:</strong> {resumeFile?.name}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  <strong className="text-[var(--color-text)]">Size:</strong> {resumeFile ? (resumeFile.size / 1024 / 1024).toFixed(2) : '0'} MB
                </div>
              </div>
            </div>

            <div className="glass-card-strong rounded-3xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-4">Tips for Best Results</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-[var(--color-text-secondary)]">Include the complete job posting for better analysis</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-[var(--color-text-secondary)]">Company URL helps personalize the application</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-[var(--color-text-secondary)]">More details = better customization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Analysis */}
      {step === 'analysis' && (
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card-strong rounded-3xl p-12">
            <div className="w-24 h-24 bg-gradient-to-r from-[var(--color-primary)] to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Sparkles className="w-12 h-12 text-white animate-pulse" />
            </div>
            <h3 className="text-3xl font-bold text-[var(--color-text)] mb-4">Analyzing Job Requirements</h3>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">Our AI is analyzing the job posting and tailoring your resume...</p>
            
            <div className="w-full bg-[var(--color-surface)] rounded-full h-4 mb-6 shadow-inner">
              <div className="bg-gradient-to-r from-[var(--color-primary)] to-purple-600 h-4 rounded-full transition-all duration-1000 shadow-lg animate-pulse" style={{ width: '75%' }}></div>
            </div>
            
            <div className="surface-card rounded-2xl p-6">
              <h4 className="text-sm font-semibold text-[var(--color-text)] mb-3">Processing Steps</h4>
              <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Extracting job requirements</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Analyzing skill matches</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[var(--color-primary)] animate-spin" />
                  <span>Optimizing content alignment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                  <span>Generating tailored resume</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {step === 'results' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass-card-strong rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[var(--color-text)] flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-[var(--color-primary)]" />
                  Your Tailored Resume
                </h3>
                <div className="flex gap-3">
                  <button className="btn-glass px-4 py-2 rounded-xl font-medium flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button className="btn-primary px-4 py-2 rounded-xl font-medium flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
              
              <div className="surface-card rounded-2xl p-6 min-h-96">
                <div className="text-center py-20">
                  <FileText className="w-16 h-16 text-[var(--color-accent-alt)] mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-[var(--color-text)] mb-2">Tailored Resume Ready</h4>
                  <p className="text-[var(--color-text-secondary)]">Your resume has been optimized for this specific job posting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card-strong rounded-3xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-4">Tailoring Results</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">94%</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">Job Match Score</div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text)]">Keyword Alignment</span>
                    <span className="text-green-600 font-semibold">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text)]">Skill Matching</span>
                    <span className="text-green-600 font-semibold">Very Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text)]">Experience Relevance</span>
                    <span className="text-green-600 font-semibold">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text)]">ATS Compatibility</span>
                    <span className="text-green-600 font-semibold">Perfect</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card-strong rounded-3xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-4">Key Optimizations</h3>
              <div className="space-y-3">
                <div className="surface-card rounded-xl p-3">
                  <h4 className="text-green-600 text-sm font-semibold mb-1">Keywords Added</h4>
                  <p className="text-[var(--color-text-secondary)] text-sm">12 relevant keywords integrated naturally</p>
                </div>
                
                <div className="surface-card rounded-xl p-3">
                  <h4 className="text-blue-600 text-sm font-semibold mb-1">Skills Emphasized</h4>
                  <p className="text-[var(--color-text-secondary)] text-sm">Highlighted matching technical skills</p>
                </div>
                
                <div className="surface-card rounded-xl p-3">
                  <h4 className="text-purple-600 text-sm font-semibold mb-1">Experience Reordered</h4>
                  <p className="text-[var(--color-text-secondary)] text-sm">Most relevant experience prioritized</p>
                </div>
              </div>
            </div>

            <div className="glass-card-strong rounded-3xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setStep('job-input')}
                  className="w-full text-left p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] rounded-xl transition-colors"
                >
                  Edit job description
                </button>
                <button
                  onClick={() => setStep('upload')}
                  className="w-full text-left p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] rounded-xl transition-colors"
                >
                  Use different resume
                </button>
                <button className="w-full text-left p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] rounded-xl transition-colors">
                  Generate cover letter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationTailor;