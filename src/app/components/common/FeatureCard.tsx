'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Calendar, Clock, MapPin, Users, Star, DollarSign, Award, Music } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ComponentType<any>;
  image?: string;
  imageAlt?: string;
  href?: string;
  external?: boolean;
  variant?: 'default' | 'elevated' | 'minimal' | 'gradient' | 'bordered';
  size?: 'small' | 'medium' | 'large';
  orientation?: 'vertical' | 'horizontal';
  actionText?: string;
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow' | 'teal';
  price?: string;
  rating?: number;
  features?: string[];
  metadata?: {
    date?: string;
    time?: string;
    location?: string;
    capacity?: string | number;
    duration?: string;
    level?: string;
  };
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const badgeColors = {
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  green: 'bg-green-100 text-green-800 border-green-200',
  purple: 'bg-purple-100 text-purple-800 border-purple-200',
  orange: 'bg-orange-100 text-orange-800 border-orange-200',
  red: 'bg-red-100 text-red-800 border-red-200',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  teal: 'bg-teal-100 text-teal-800 border-teal-200',
};

const variantStyles = {
  default: 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg',
  elevated: 'bg-white shadow-lg hover:shadow-xl border border-gray-100',
  minimal: 'bg-transparent hover:bg-gray-50 border border-transparent hover:border-gray-200',
  gradient: 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 hover:shadow-lg',
  bordered: 'bg-white border-2 border-blue-200 hover:border-blue-300 hover:shadow-md',
};

const sizeStyles = {
  small: 'p-4',
  medium: 'p-6',
  large: 'p-8',
};

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  image,
  imageAlt,
  href,
  external = false,
  variant = 'default',
  size = 'medium',
  orientation = 'vertical',
  actionText = 'Learn More',
  badge,
  badgeColor = 'blue',
  price,
  rating,
  features = [],
  metadata = {},
  className = '',
  onClick,
  disabled = false,
  loading = false,
}: FeatureCardProps) {
  const isClickable = !disabled && (href || onClick);
  const isHorizontal = orientation === 'horizontal';

  const cardClasses = `
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    rounded-xl transition-all duration-300 transform
    ${isClickable ? 'hover:-translate-y-1 cursor-pointer' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${isHorizontal ? 'flex items-center space-x-6' : ''}
    ${className}
  `;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  const renderMetadata = () => {
    if (!Object.keys(metadata).length) return null;

    return (
      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
        {metadata.date && (
          <div className="flex items-center">
            <Calendar size={14} className="mr-1 text-blue-500" />
            {metadata.date}
          </div>
        )}
        {metadata.time && (
          <div className="flex items-center">
            <Clock size={14} className="mr-1 text-blue-500" />
            {metadata.time}
          </div>
        )}
        {metadata.location && (
          <div className="flex items-center">
            <MapPin size={14} className="mr-1 text-blue-500" />
            {metadata.location}
          </div>
        )}
        {metadata.capacity && (
          <div className="flex items-center">
            <Users size={14} className="mr-1 text-blue-500" />
            {metadata.capacity} spots
          </div>
        )}
        {metadata.duration && (
          <div className="flex items-center">
            <Clock size={14} className="mr-1 text-green-500" />
            {metadata.duration}
          </div>
        )}
        {metadata.level && (
          <div className="flex items-center">
            <Award size={14} className="mr-1 text-purple-500" />
            {metadata.level}
          </div>
        )}
      </div>
    );
  };

  const renderFeatures = () => {
    if (!features.length) return null;

    return (
      <div className="mb-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderContent = () => (
    <>
      {/* Image */}
      {image && (
        <div className={`${isHorizontal ? 'w-48 h-32' : 'w-full h-48'} relative overflow-hidden rounded-lg mb-4 bg-gray-200`}>
          {loading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400">Loading...</div>
            </div>
          ) : (
            <img
              src={image}
              alt={imageAlt || title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          {badge && (
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${badgeColors[badgeColor]}`}>
                {badge}
              </span>
            </div>
          )}
          {price && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
              <div className="flex items-center text-sm font-semibold text-gray-900">
                <DollarSign size={14} className="mr-1" />
                {price}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className={isHorizontal ? 'flex-1' : ''}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            {/* Badge (if no image) */}
            {badge && !image && (
              <div className="mb-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${badgeColors[badgeColor]}`}>
                  {badge}
                </span>
              </div>
            )}

            {/* Title with Icon */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
              {Icon && (
                <div className="mr-3 p-2 bg-blue-100 rounded-lg">
                  <Icon size={20} className="text-blue-600" />
                </div>
              )}
              {title}
            </h3>
          </div>

          {/* Price (if no image) */}
          {price && !image && (
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900 flex items-center">
                <DollarSign size={18} className="mr-1" />
                {price}
              </div>
            </div>
          )}
        </div>

        {/* Rating */}
        {rating && (
          <div className="mb-3">
            {renderStars(rating)}
          </div>
        )}

        {/* Metadata */}
        {renderMetadata()}

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-4">
          {description}
        </p>

        {/* Features */}
        {renderFeatures()}

        {/* Action */}
        {isClickable && (
          <div className="flex items-center justify-between">
            <div className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Loading...
                </>
              ) : (
                <>
                  {actionText}
                  {external ? (
                    <ExternalLink size={16} className="ml-2" />
                  ) : (
                    <ArrowRight size={16} className="ml-2 transform transition-transform group-hover:translate-x-1" />
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );

  // Wrapper with link or button
  if (href && !disabled) {
    return (
      <div className={`group ${cardClasses}`}>
        {external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {renderContent()}
          </a>
        ) : (
          <Link href={href} className="block">
            {renderContent()}
          </Link>
        )}
      </div>
    );
  }

  if (onClick && !disabled) {
    return (
      <button
        onClick={onClick}
        className={`group text-left w-full ${cardClasses}`}
        disabled={loading}
      >
        {renderContent()}
      </button>
    );
  }

  return (
    <div className={`group ${cardClasses}`}>
      {renderContent()}
    </div>
  );
}

// Preset configurations for common use cases
export const LessonCard = (props: Omit<FeatureCardProps, 'icon' | 'variant'>) => (
  <FeatureCard {...props} icon={Music} variant="elevated" />
);

export const EventCard = (props: Omit<FeatureCardProps, 'icon' | 'variant' | 'badgeColor'>) => (
  <FeatureCard {...props} icon={Calendar} variant="gradient" badgeColor="purple" />
);

export const ServiceCard = (props: Omit<FeatureCardProps, 'variant' | 'size'>) => (
  <FeatureCard {...props} variant="bordered" size="large" />
);

export const TestimonialCard = (props: Omit<FeatureCardProps, 'variant' | 'orientation'>) => (
  <FeatureCard {...props} variant="minimal" orientation="horizontal" />
);