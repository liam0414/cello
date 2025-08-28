'use client';

import React from 'react';
import { Star, Quote, Music, User, Calendar, MapPin, Award, Heart } from 'lucide-react';

interface TestimonialData {
  id: string | number;
  name: string;
  role: string;
  content: string;
  rating?: number;
  avatar?: string;
  date?: string;
  location?: string;
  lessonType?: string;
  studentAge?: string;
  yearsWithStudio?: number;
  verified?: boolean;
  featured?: boolean;
}

interface TestimonialCardProps {
  testimonial: TestimonialData;
  variant?: 'default' | 'compact' | 'featured' | 'minimal' | 'card' | 'quote-style';
  layout?: 'vertical' | 'horizontal' | 'centered';
  showAvatar?: boolean;
  showRating?: boolean;
  showDate?: boolean;
  showMetadata?: boolean;
  showQuoteIcon?: boolean;
  maxContentLength?: number;
  className?: string;
  onClick?: (testimonial: TestimonialData) => void;
  hoverable?: boolean;
  animated?: boolean;
}

const variantStyles = {
  default: 'bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md',
  compact: 'bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500',
  featured: 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-8 shadow-lg',
  minimal: 'bg-transparent p-4',
  card: 'bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100',
  'quote-style': 'bg-white rounded-xl p-8 shadow-md border-l-8 border-blue-600 relative'
};

const roleColors = {
  'parent': 'text-green-600 bg-green-100',
  'student': 'text-blue-600 bg-blue-100',
  'adult student': 'text-purple-600 bg-purple-100',
  'teacher': 'text-orange-600 bg-orange-100',
  'professional': 'text-red-600 bg-red-100',
  'default': 'text-gray-600 bg-gray-100'
};

export default function TestimonialCard({
  testimonial,
  variant = 'default',
  layout = 'vertical',
  showAvatar = true,
  showRating = true,
  showDate = false,
  showMetadata = true,
  showQuoteIcon = true,
  maxContentLength,
  className = '',
  onClick,
  hoverable = false,
  animated = false
}: TestimonialCardProps) {
  
  const truncateContent = (content: string, maxLength?: number): string => {
    if (!maxLength || content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  const getRoleColor = (role: string): string => {
    const normalizedRole = role.toLowerCase();
    return roleColors[normalizedRole as keyof typeof roleColors] || roleColors.default;
  };

  const renderStars = (rating: number) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            } transition-colors duration-200`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600 font-medium">
          {rating}.0
        </span>
      </div>
    );
  };

  const renderAvatar = () => {
    if (!showAvatar) return null;

    return (
      <div className="flex-shrink-0">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
          />
        ) : (
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
        )}
      </div>
    );
  };

  const renderMetadata = () => {
    if (!showMetadata) return null;

    const metadata = [];
    
    if (testimonial.lessonType) {
      metadata.push({ icon: Music, text: testimonial.lessonType, color: 'text-blue-500' });
    }
    
    if (testimonial.studentAge) {
      metadata.push({ icon: User, text: `Age ${testimonial.studentAge}`, color: 'text-green-500' });
    }
    
    if (testimonial.yearsWithStudio) {
      metadata.push({ 
        icon: Award, 
        text: `${testimonial.yearsWithStudio} year${testimonial.yearsWithStudio > 1 ? 's' : ''} with studio`, 
        color: 'text-purple-500' 
      });
    }
    
    if (testimonial.location) {
      metadata.push({ icon: MapPin, text: testimonial.location, color: 'text-gray-500' });
    }

    if (metadata.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-3 mt-3">
        {metadata.map((item, index) => (
          <div key={index} className="flex items-center text-xs text-gray-600">
            <item.icon size={12} className={`mr-1 ${item.color}`} />
            {item.text}
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    const displayContent = truncateContent(testimonial.content, maxContentLength);
    
    return (
      <div className={`${layout === 'horizontal' ? 'flex-1' : ''}`}>
        {/* Quote Icon */}
        {showQuoteIcon && variant !== 'minimal' && (
          <Quote 
            size={variant === 'featured' ? 32 : 24} 
            className={`${
              variant === 'featured' ? 'text-blue-400' : 'text-gray-300'
            } mb-3 ${variant === 'quote-style' ? 'absolute -top-2 -left-2' : ''}`} 
          />
        )}

        {/* Content */}
        <blockquote className={`${
          variant === 'featured' ? 'text-lg' : variant === 'compact' ? 'text-sm' : 'text-base'
        } text-gray-700 leading-relaxed italic mb-4`}>
          "{displayContent}"
        </blockquote>

        {/* Author Info */}
        <div className={`${layout === 'horizontal' ? 'flex items-center space-x-4' : ''}`}>
          {layout !== 'horizontal' && renderAvatar()}
          
          <div className={`${layout === 'horizontal' ? 'flex-1' : 'mt-4'}`}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className={`font-bold text-gray-900 ${
                  variant === 'featured' ? 'text-lg' : 'text-base'
                }`}>
                  {testimonial.name}
                  {testimonial.verified && (
                    <span className="ml-2 inline-flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </span>
                  )}
                </h4>
                
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(testimonial.role)}`}>
                    {testimonial.role}
                  </span>
                  
                  {testimonial.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Rating */}
              {showRating && testimonial.rating && (
                <div className={layout === 'horizontal' ? 'ml-4' : 'mt-2'}>
                  {renderStars(testimonial.rating)}
                </div>
              )}
            </div>

            {/* Date */}
            {showDate && testimonial.date && (
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Calendar size={14} className="mr-1" />
                {new Date(testimonial.date).toLocaleDateString('en-AU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            )}

            {/* Metadata */}
            {renderMetadata()}
          </div>

          {layout === 'horizontal' && renderAvatar()}
        </div>
      </div>
    );
  };

  const cardClasses = `
    ${variantStyles[variant]}
    ${hoverable || onClick ? 'transition-all duration-300 hover:scale-105 cursor-pointer' : 'transition-all duration-300'}
    ${animated ? 'animate-fade-in-up' : ''}
    ${className}
  `;

  const handleClick = () => {
    if (onClick) {
      onClick(testimonial);
    }
  };

  return (
    <div 
      className={cardClasses}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      } : undefined}
    >
      {variant === 'quote-style' && showQuoteIcon && (
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <Quote size={16} className="text-white" />
        </div>
      )}
      
      {renderContent()}

      {/* Love indicator for high ratings */}
      {testimonial.rating && testimonial.rating >= 5 && (
        <div className="absolute top-4 right-4">
          <Heart size={18} className="text-red-500 fill-current animate-pulse" />
        </div>
      )}
    </div>
  );
}

// Preset configurations for common use cases
export const FeaturedTestimonial = (props: Omit<TestimonialCardProps, 'variant' | 'showQuoteIcon'>) => (
  <TestimonialCard {...props} variant="featured" showQuoteIcon={true} />
);

export const CompactTestimonial = (props: Omit<TestimonialCardProps, 'variant' | 'showAvatar' | 'showMetadata'>) => (
  <TestimonialCard {...props} variant="compact" showAvatar={false} showMetadata={false} />
);

export const HorizontalTestimonial = (props: Omit<TestimonialCardProps, 'layout'>) => (
  <TestimonialCard {...props} layout="horizontal" />
);

export const MinimalTestimonial = (props: Omit<TestimonialCardProps, 'variant' | 'showQuoteIcon'>) => (
  <TestimonialCard {...props} variant="minimal" showQuoteIcon={false} />
);

// Testimonial carousel/slider component
interface TestimonialSliderProps {
  testimonials: TestimonialData[];
  autoPlay?: boolean;
  interval?: number;
  variant?: TestimonialCardProps['variant'];
  className?: string;
}

export const TestimonialSlider = ({
  testimonials,
  autoPlay = true,
  interval = 5000,
  variant = 'card',
  className = ''
}: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, testimonials.length, interval]);

  if (testimonials.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <TestimonialCard
        testimonial={testimonials[currentIndex]}
        variant={variant}
        animated={true}
        key={currentIndex} // Force re-render for animation
      />
      
      {/* Indicators */}
      {testimonials.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-600 scale-110' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Testimonial grid component
interface TestimonialGridProps {
  testimonials: TestimonialData[];
  columns?: 1 | 2 | 3 | 4;
  variant?: TestimonialCardProps['variant'];
  showLoadMore?: boolean;
  initialCount?: number;
  className?: string;
}

export const TestimonialGrid = ({
  testimonials,
  columns = 3,
  variant = 'default',
  showLoadMore = false,
  initialCount = 6,
  className = ''
}: TestimonialGridProps) => {
  const [visibleCount, setVisibleCount] = React.useState(initialCount);
  
  const visibleTestimonials = showLoadMore 
    ? testimonials.slice(0, visibleCount)
    : testimonials;

  const hasMore = visibleCount < testimonials.length;

  return (
    <div className={className}>
      <div className={`grid grid-cols-1 md:grid-cols-2 ${columns >= 3 ? 'lg:grid-cols-3' : ''} ${columns === 4 ? 'xl:grid-cols-4' : ''} gap-6`}>
        {visibleTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            variant={variant}
            animated={true}
            hoverable={true}
          />
        ))}
      </div>

      {showLoadMore && hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount(prev => prev + initialCount)}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors duration-300"
          >
            Load More Testimonials
          </button>
        </div>
      )}
    </div>
  );
};