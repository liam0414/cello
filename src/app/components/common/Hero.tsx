'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, ArrowRight, Calendar, MapPin, Clock, Users, Star, ChevronDown, ExternalLink } from 'lucide-react';

interface HeroAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant: 'primary' | 'secondary' | 'outline';
  icon?: React.ComponentType<any>;
  external?: boolean;
}

interface HeroBadge {
  text: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow';
}

interface HeroStats {
  value: string;
  label: string;
  icon?: React.ComponentType<any>;
  color?: string;
}

interface HeroProps {
  // Content
  title: string;
  subtitle?: string;
  description: string;
  
  // Visual
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: 'light' | 'dark' | 'gradient' | 'none';
  
  // Layout
  variant: 'default' | 'centered' | 'split' | 'minimal' | 'video' | 'image-right';
  size: 'small' | 'medium' | 'large' | 'fullscreen';
  
  // Elements
  actions?: HeroAction[];
  badge?: HeroBadge;
  stats?: HeroStats[];
  image?: string;
  imageAlt?: string;
  
  // Animation
  animated?: boolean;
  parallax?: boolean;
  
  // Customization
  className?: string;
  contentClassName?: string;
  
  // Scroll indicator
  showScrollIndicator?: boolean;
  
  // Background patterns
  showPattern?: boolean;
  patternType?: 'musical' | 'dots' | 'grid';
}

const overlayStyles = {
  light: 'bg-white/80',
  dark: 'bg-black/60',
  gradient: 'bg-gradient-to-r from-black/70 to-black/30',
  none: ''
};

const sizeStyles = {
  small: 'min-h-[60vh] py-16',
  medium: 'min-h-[70vh] py-20',
  large: 'min-h-[80vh] py-24',
  fullscreen: 'min-h-screen py-32'
};

const badgeColors = {
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  green: 'bg-green-100 text-green-800 border-green-200',
  purple: 'bg-purple-100 text-purple-800 border-purple-200',
  orange: 'bg-orange-100 text-orange-800 border-orange-200',
  red: 'bg-red-100 text-red-800 border-red-200',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export default function Hero({
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundVideo,
  overlay = 'dark',
  variant = 'default',
  size = 'large',
  actions = [],
  badge,
  stats = [],
  image,
  imageAlt,
  animated = true,
  parallax = false,
  className = '',
  contentClassName = '',
  showScrollIndicator = false,
  showPattern = false,
  patternType = 'musical'
}: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (animated) {
      setIsVisible(true);
    }
  }, [animated]);

  useEffect(() => {
    if (parallax) {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [parallax]);

  const renderPattern = () => {
    if (!showPattern) return null;

    const patterns = {
      musical: (
        <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 text-6xl animate-float">🎵</div>
          <div className="absolute top-40 right-40 text-4xl animate-float" style={{ animationDelay: '1s' }}>🎼</div>
          <div className="absolute bottom-40 left-40 text-5xl animate-float" style={{ animationDelay: '2s' }}>♪</div>
          <div className="absolute bottom-20 right-20 text-6xl animate-float" style={{ animationDelay: '3s' }}>♫</div>
          <div className="absolute top-1/2 left-1/4 text-3xl animate-float" style={{ animationDelay: '4s' }}>🎻</div>
          <div className="absolute top-1/3 right-1/4 text-4xl animate-float" style={{ animationDelay: '5s' }}>🎶</div>
        </div>
      ),
      dots: (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
      ),
      grid: (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
      )
    };

    return patterns[patternType];
  };

  const renderBackground = () => (
    <div className="absolute inset-0 z-0">
      {backgroundVideo ? (
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
          style={{ transform: parallax ? `translateY(${scrollY * 0.5}px)` : undefined }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : backgroundImage ? (
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: parallax ? `translateY(${scrollY * 0.5}px)` : undefined
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900" />
      )}
      
      {/* Overlay */}
      {overlay !== 'none' && (
        <div className={`absolute inset-0 ${overlayStyles[overlay]}`} />
      )}
      
      {/* Pattern */}
      {renderPattern()}
    </div>
  );

  const renderBadge = () => {
    if (!badge) return null;
    
    return (
      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${badgeColors[badge.color]} mb-6 ${
        animated ? 'animate-fade-in-up' : ''
      }`} style={{ animationDelay: '0.2s' }}>
        {badge.text}
      </div>
    );
  };

  const renderActions = () => {
    if (!actions.length) return null;

    return (
      <div className={`flex flex-col sm:flex-row gap-4 ${
        animated ? 'animate-fade-in-up' : ''
      }`} style={{ animationDelay: '0.8s' }}>
        {actions.map((action, index) => {
          const buttonClasses = `
            inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105
            ${action.variant === 'primary' 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg' 
              : action.variant === 'secondary'
              ? 'bg-white text-gray-900 hover:bg-gray-50 shadow-lg'
              : 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
            }
          `;

          const content = (
            <>
              {action.icon && <action.icon size={20} className="mr-2" />}
              {action.label}
              {action.external ? (
                <ExternalLink size={18} className="ml-2" />
              ) : (
                <ArrowRight size={18} className="ml-2" />
              )}
            </>
          );

          if (action.href) {
            if (action.external) {
              return (
                <a
                  key={index}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses}
                >
                  {content}
                </a>
              );
            }
            return (
              <Link key={index} href={action.href} className={buttonClasses}>
                {content}
              </Link>
            );
          }

          return (
            <button key={index} onClick={action.onClick} className={buttonClasses}>
              {content}
            </button>
          );
        })}
      </div>
    );
  };

  const renderStats = () => {
    if (!stats.length) return null;

    return (
      <div className={`grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} gap-8 ${
        animated ? 'animate-fade-in-up' : ''
      }`} style={{ animationDelay: '1s' }}>
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-3xl font-bold mb-2 ${stat.color || 'text-blue-400'}`}>
              {stat.value}
            </div>
            <div className="text-slate-300 flex items-center justify-center">
              {stat.icon && <stat.icon size={16} className="mr-1" />}
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderScrollIndicator = () => {
    if (!showScrollIndicator) return null;

    return (
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown size={32} />
      </div>
    );
  };

  const renderContent = () => {
    const textColor = overlay === 'light' ? 'text-gray-900' : 'text-white';
    const subtitleColor = overlay === 'light' ? 'text-gray-600' : 'text-slate-300';

    return (
      <div className={`relative z-10 ${contentClassName}`}>
        <div className="container mx-auto">
          {variant === 'split' || variant === 'image-right' ? (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={variant === 'image-right' ? 'lg:order-1' : ''}>
                {renderBadge()}
                
                {subtitle && (
                  <div className={`text-lg font-medium ${subtitleColor} mb-4 ${
                    animated ? 'animate-fade-in-up' : ''
                  }`} style={{ animationDelay: '0.4s' }}>
                    {subtitle}
                  </div>
                )}

                <h1 className={`text-4xl md:text-6xl font-bold ${textColor} mb-6 leading-tight ${
                  animated ? 'animate-fade-in-up' : ''
                }`} style={{ animationDelay: '0.6s' }}>
                  {title}
                </h1>

                <p className={`text-xl ${subtitleColor} mb-8 leading-relaxed max-w-2xl ${
                  animated ? 'animate-fade-in-up' : ''
                }`} style={{ animationDelay: '0.7s' }}>
                  {description}
                </p>

                {renderActions()}
              </div>

              {image && (
                <div className={`${variant === 'image-right' ? 'lg:order-2' : ''} ${
                  animated ? 'animate-fade-in-right' : ''
                }`} style={{ animationDelay: '0.3s' }}>
                  <img
                    src={image}
                    alt={imageAlt || title}
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={`max-w-4xl ${variant === 'centered' ? 'mx-auto text-center' : ''}`}>
              {renderBadge()}
              
              {subtitle && (
                <div className={`text-lg font-medium ${subtitleColor} mb-4 ${
                  animated ? 'animate-fade-in-up' : ''
                }`} style={{ animationDelay: '0.4s' }}>
                  {subtitle}
                </div>
              )}

              <h1 className={`text-5xl md:text-7xl font-bold ${textColor} mb-6 leading-tight ${
                animated ? 'animate-fade-in-up' : ''
              }`} style={{ animationDelay: '0.6s' }}>
                {title}
              </h1>

              <p className={`text-xl md:text-2xl ${subtitleColor} mb-12 leading-relaxed ${
                variant === 'centered' ? 'max-w-3xl mx-auto' : 'max-w-2xl'
              } ${animated ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.7s' }}>
                {description}
              </p>

              {renderActions()}
              
              {stats.length > 0 && (
                <div className="mt-16">
                  {renderStats()}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className={`relative flex items-center ${sizeStyles[size]} overflow-hidden ${className}`}>
      {renderBackground()}
      {renderContent()}
      {renderScrollIndicator()}
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}

// Preset Hero configurations
export const HomeHero = (props: Omit<HeroProps, 'variant' | 'size' | 'showPattern'>) => (
  <Hero {...props} variant="centered" size="fullscreen" showPattern={true} />
);

export const PageHero = (props: Omit<HeroProps, 'variant' | 'size' | 'overlay'>) => (
  <Hero {...props} variant="default" size="medium" overlay="gradient" />
);

export const EventHero = (props: Omit<HeroProps, 'variant' | 'showScrollIndicator'>) => (
  <Hero {...props} variant="split" showScrollIndicator={true} />
);

export const VideoHero = (props: Omit<HeroProps, 'variant' | 'overlay'>) => (
  <Hero {...props} variant="video" overlay="dark" />
);

export const MinimalHero = (props: Omit<HeroProps, 'variant' | 'size' | 'animated'>) => (
  <Hero {...props} variant="minimal" size="small" animated={false} />
);