'use client';

import React from 'react';
import { Loader2, Music, Disc3, RotateCcw } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'dots' | 'pulse' | 'bounce' | 'music' | 'bars';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  text?: string;
  className?: string;
  fullscreen?: boolean;
  overlay?: boolean;
}

const sizeClasses = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

const colorClasses = {
  primary: 'text-blue-600 border-blue-600',
  secondary: 'text-gray-600 border-gray-600',
  white: 'text-white border-white',
  gray: 'text-gray-400 border-gray-400'
};

const textSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  color = 'primary',
  text,
  className = '',
  fullscreen = false,
  overlay = false
}) => {
  const renderSpinner = () => {
    const baseClasses = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;
    
    switch (variant) {
      case 'default':
        return (
          <Loader2 className={`${baseClasses} animate-spin`} />
        );
        
      case 'dots':
        return (
          <div className={`flex space-x-1 ${className}`}>
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`${sizeClasses[size]} ${colorClasses[color].split(' ')[0]} bg-current rounded-full animate-bounce`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '1.4s'
                }}
              />
            ))}
          </div>
        );
        
      case 'pulse':
        return (
          <div className={`${baseClasses} bg-current rounded-full animate-pulse`} />
        );
        
      case 'bounce':
        return (
          <div className={`${baseClasses} bg-current rounded-full animate-bounce`} />
        );
        
      case 'music':
        return (
          <div className="flex items-center space-x-1">
            <Music className={`${baseClasses} animate-pulse`} />
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-1 ${colorClasses[color].split(' ')[0]} bg-current rounded-full animate-pulse`}
                style={{
                  height: `${12 + index * 4}px`,
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        );
        
      case 'bars':
        return (
          <div className="flex items-end space-x-1">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={`w-2 ${colorClasses[color].split(' ')[0]} bg-current rounded-sm`}
                style={{
                  height: `${8 + (index % 3) * 8}px`,
                  animation: `loading-bars 1.2s ease-in-out ${index * 0.1}s infinite`
                }}
              />
            ))}
          </div>
        );
        
      default:
        return (
          <Loader2 className={`${baseClasses} animate-spin`} />
        );
    }
  };

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-4 ${
      fullscreen ? 'min-h-screen' : ''
    }`}>
      {renderSpinner()}
      {text && (
        <p className={`${textSizeClasses[size]} ${colorClasses[color].split(' ')[0]} font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 shadow-2xl">
          {content}
        </div>
      </div>
    );
  }

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

// Preset loading components
export const ButtonSpinner = () => (
  <LoadingSpinner size="sm" color="white" variant="default" />
);

export const PageSpinner = ({ text = "Loading..." }: { text?: string }) => (
  <LoadingSpinner size="lg" variant="default" text={text} fullscreen />
);

export const OverlaySpinner = ({ text = "Processing..." }: { text?: string }) => (
  <LoadingSpinner size="lg" variant="default" text={text} overlay />
);

export const MusicSpinner = ({ text = "Loading music..." }: { text?: string }) => (
  <LoadingSpinner size="md" variant="music" color="primary" text={text} />
);

export const CardSpinner = () => (
  <LoadingSpinner size="md" variant="pulse" />
);

// Loading skeleton components
interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = '100%',
  height = '1rem',
  rounded = false,
  lines = 1
}) => {
  const skeletonClasses = `
    bg-gray-200 animate-pulse
    ${rounded ? 'rounded-full' : 'rounded'}
    ${className}
  `;

  if (lines === 1) {
    return (
      <div
        className={skeletonClasses}
        style={{ width, height }}
      />
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={index}
          className={skeletonClasses}
          style={{
            width: index === lines - 1 ? '75%' : width,
            height
          }}
        />
      ))}
    </div>
  );
};

// Card skeleton
export const CardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton width={48} height={48} rounded />
      <div className="flex-1">
        <Skeleton height="1.25rem" width="60%" />
        <Skeleton height="1rem" width="40%" className="mt-2" />
      </div>
    </div>
    <Skeleton lines={3} />
    <div className="flex justify-between items-center mt-6">
      <Skeleton width={80} height="2rem" />
      <Skeleton width={100} height="2rem" />
    </div>
  </div>
);

// Table skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
    {/* Header */}
    <div className="bg-gray-50 border-b border-gray-200 p-4">
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }, (_, index) => (
          <Skeleton key={`header-${index}`} height="1rem" width="80%" />
        ))}
      </div>
    </div>
    
    {/* Rows */}
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div key={`row-${rowIndex}`} className="border-b border-gray-200 p-4 last:border-b-0">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }, (_, colIndex) => (
            <Skeleton key={`cell-${rowIndex}-${colIndex}`} height="1rem" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

// Custom CSS for bar animation
const LoadingStyles = () => (
  <style jsx>{`
    @keyframes loading-bars {
      0%, 80%, 100% {
        transform: scaleY(1);
      }
      40% {
        transform: scaleY(1.5);
      }
    }
  `}</style>
);

// Export styles component for use in layout
export { LoadingStyles };

export default LoadingSpinner;