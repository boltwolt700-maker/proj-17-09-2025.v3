import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  BarChart3, 
  Send, 
  Calendar as CalendarIcon, 
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const PostGenerator = () => {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('professional');
  const [industry, setIndustry] = useState('technology');

  const characterLimit = 3000;
  const characterCount = content.length;

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'thought-provoking', label: 'Thought-provoking' },
    { value: 'inspiring', label: 'Inspiring' },
    { value: 'educational', label: 'Educational' }
  ];

  const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'sales', label: 'Sales' },
    { value: 'education', label: 'Education' },
    { value: 'real-estate', label: 'Real Estate' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedContent = `💡 ${prompt}

Here's an insightful perspective on this topic that I've been thinking about:

In today's fast-paced business environment, understanding ${prompt.toLowerCase()} has become more crucial than ever. Here are 3 key insights I've learned:

1️⃣ First insight: The importance of staying ahead of industry trends
2️⃣ Second insight: Building strong professional relationships
3️⃣ Third insight: Continuous learning and adaptation

What's your experience with ${prompt.toLowerCase()}? I'd love to hear your thoughts in the comments below.

#LinkedIn #ProfessionalDevelopment #${industry.charAt(0).toUpperCase() + industry.slice(1)}`;

      setContent(generatedContent);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    
    setIsAnalyzing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockAnalysis = {
        clarity: 8,
        grammar: 10,
        hook: 7,
        cta: 9,
        formatting: 'A',
        suggestions: [
          'Consider adding more specific examples',
          'The hook could be stronger - try starting with a question',
          'Great use of emojis and formatting!'
        ]
      };
      
      const totalScore = Math.round(
        (mockAnalysis.clarity + mockAnalysis.grammar + mockAnalysis.hook + mockAnalysis.cta) / 4 * 10 + 
        (mockAnalysis.formatting === 'A' ? 20 : mockAnalysis.formatting === 'B' ? 15 : 10)
      );
      
      setScore(totalScore);
      setAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Error analyzing content:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePublish = () => {
    // Simulate publishing
    alert('Post published successfully!');
  };

  const handleSchedule = () => {
    // Open scheduling modal
    alert('Scheduling feature coming soon!');
  };

  const handleSaveDraft = () => {
    // Save to drafts
    alert('Draft saved successfully!');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-[var(--color-bg)] min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-r from-[var(--color-primary)] to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
          <PenTool className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-[var(--color-text)]">AI Post Generator</h1>
          <p className="text-lg text-[var(--color-text-secondary)] mt-2">Generate authentic LinkedIn posts in minutes with AI that learns your voice and expertise</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Generation */}
          <div className="glass-card-strong rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[var(--color-primary)]" />
              AI Content Generation
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
                    Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-3 surface-card border border-[var(--color-border)] rounded-2xl text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all duration-300"
                  >
                    {tones.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
                    Industry
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-3 surface-card border border-[var(--color-border)] rounded-2xl text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all duration-300"
                  >
                    {industries.map((i) => (
                      <option key={i.value} value={i.value}>{i.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
                  Topic or Idea
                </label>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., importance of networking in tech industry"
                  className="w-full px-4 py-3 surface-card border border-[var(--color-border)] rounded-2xl text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all duration-300"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full btn-primary px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Post
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Content Editor */}
          <div className="glass-card-strong rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-[var(--color-text)]">Content Editor</h3>
              <div className="text-sm text-[var(--color-text-secondary)]">
                {characterCount}/{characterLimit}
              </div>
            </div>
            
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your LinkedIn post here or generate content with AI..."
              className="w-full h-64 px-4 py-3 surface-card border border-[var(--color-border)] rounded-2xl text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none resize-none transition-all duration-300"
              maxLength={characterLimit}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAnalyze}
              disabled={!content.trim() || isAnalyzing}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:transform hover:scale-105 shadow-lg"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4" />
                  Check Score
                </>
              )}
            </button>
            
            <button
              onClick={handlePublish}
              disabled={!content.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:transform hover:scale-105 shadow-lg"
            >
              <Send className="w-4 h-4" />
              Publish Now
            </button>
            
            <button
              onClick={handleSchedule}
              disabled={!content.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:transform hover:scale-105 shadow-lg"
            >
              <CalendarIcon className="w-4 h-4" />
              Schedule
            </button>
            
            <button
              onClick={handleSaveDraft}
              disabled={!content.trim()}
              className="flex items-center gap-2 px-6 py-3 btn-glass rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:transform hover:scale-105"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Score Display */}
          {score !== null && (
            <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-4 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-[var(--color-primary)]" />
                Content Score
              </h3>
              
              <div className="text-center mb-6">
                <div className={`text-4xl font-bold mb-2 ${
                  score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {score}
                </div>
                <div className="text-[var(--color-text-secondary)]">out of 100</div>
              </div>

              {analysis && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--color-text)]">Clarity</span>
                      <span className="text-[var(--color-text)] font-semibold">{analysis.clarity}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--color-text)]">Grammar</span>
                      <span className="text-[var(--color-text)] font-semibold">{analysis.grammar}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--color-text)]">Hook Strength</span>
                      <span className="text-[var(--color-text)] font-semibold">{analysis.hook}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--color-text)]">Call-to-Action</span>
                      <span className="text-[var(--color-text)] font-semibold">{analysis.cta}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--color-text)]">Formatting</span>
                      <span className="text-[var(--color-text)] font-semibold">{analysis.formatting}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-border)]">
                    <h4 className="text-sm font-semibold text-[var(--color-text)] mb-3">Suggestions</h4>
                    <div className="space-y-2">
                      {analysis.suggestions.map((suggestion: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-[var(--color-text-secondary)]">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tips */}
          <div className="glass-card-strong rounded-3xl p-6 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Writing Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)]">Start with a hook</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">Begin with a question, statistic, or bold statement</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)]">Use emojis sparingly</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">1-3 emojis can enhance readability</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)]">Include a call-to-action</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">Ask for engagement or opinions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)]">Keep paragraphs short</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">1-3 sentences per paragraph for mobile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostGenerator;

