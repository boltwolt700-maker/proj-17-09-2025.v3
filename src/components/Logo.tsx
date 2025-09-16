import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <svg 
        className={`${sizeClasses[size]} text-indigo-600`} 
        viewBox="0 0 32 32" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 4H20V20H4V4Z"></path>
        <path d="M12 12H28V28H12V12Z" fillOpacity="0.7"></path>
      </svg>
      {showText && (
        <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent`}>
          Career Clarified
        </span>
      )}
    </div>
  );
};

export default Logo;