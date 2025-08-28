'use client';

import React from 'react';
import Link from 'next/link';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'flat' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  border?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  default: 'bg-white border border-gray-200',
  outlined: 'bg-white border-2 border-gray-300',
  elevated: 'bg-white shadow-lg border border-gray-100',
  flat: 'bg-gray-50 border-0',
  gradient: 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200'
};

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl'
};

const paddingStyles = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
};

const roundedStyles = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
};

const shadowStyles = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl'
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size,
  padding = 'md',
  rounded = 'lg',
  shadow = 'sm',
  border = false,
  hoverable = false,
  clickable = false,
  href,
  external = false,
  className = '',
  onClick,
  disabled = false,
  loading = false
}) => {
  const isInteractive = clickable || onClick || href;
  
  const baseClasses = `
    transition-all duration-200
    ${variantStyles[variant]}
    ${size ? sizeStyles[size] : 'w-full'}
    ${paddingStyles[padding]}
    ${roundedStyles[rounded]}
    ${shadowStyles[shadow]}
    ${border ? 'border' : ''}
    ${isInteractive && !disabled ? 'cursor-pointer' : ''}
    ${hoverable && !disabled ? 'hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
    ${loading ? 'relative overflow-hidden' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const cardContent = (
    <>
      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      {children}
    </>
  );

  // Render as link if href is provided
  if (href && !disabled) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {cardContent}
        </a>
      );
    }
    
    return (
      <Link href={href} className={baseClasses}>
        {cardContent}
      </Link>
    );
  }

  // Render as button if onClick is provided
  if (onClick && !disabled) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} text-left`}
        disabled={disabled}
      >
        {cardContent}
      </button>
    );
  }

  // Render as div
  return (
    <div className={baseClasses}>
      {cardContent}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
    {children}
  </div>
);

export const CardBody: React.FC<CardBodyProps> = ({ 
  children, 
  className = '' 
}) => (
  <div className={className}>
    {children}
  </div>
);

export const CardFooter: React.FC<CardFooterProps> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>
    {children}
  </div>
);

// Preset card variants
export const SimpleCard = (props: Omit<CardProps, 'variant'>) => (
  <Card {...props} variant="default" />
);

export const ElevatedCard = (props: Omit<CardProps, 'variant' | 'shadow'>) => (
  <Card {...props} variant="elevated" shadow="lg" />
);

export const OutlinedCard = (props: Omit<CardProps, 'variant'>) => (
  <Card {...props} variant="outlined" />
);

export const GradientCard = (props: Omit<CardProps, 'variant'>) => (
  <Card {...props} variant="gradient" />
);

export const InteractiveCard = (props: Omit<CardProps, 'hoverable' | 'clickable'>) => (
  <Card {...props} hoverable={true} clickable={true} />
);

export default Card;