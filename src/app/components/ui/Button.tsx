'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';
import { Loader2, ExternalLink } from 'lucide-react';

type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost' 
  | 'link' 
  | 'destructive' 
  | 'success' 
  | 'warning'
  | 'gradient';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface BaseButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  icon?: React.ComponentType<any>;
  iconPosition?: 'left' | 'right';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
  external?: boolean;
}

interface ButtonAsButtonProps extends BaseButtonProps {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  href?: never;
  target?: never;
  rel?: never;
}

interface ButtonAsLinkProps extends BaseButtonProps {
  as: 'link';
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
  type?: never;
  target?: never;
  rel?: never;
}

interface ButtonAsExternalProps extends BaseButtonProps {
  as: 'external';
  href: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
  type?: never;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps | ButtonAsExternalProps;

// Variant styles
const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm focus:ring-blue-500',
  secondary: 'bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white shadow-sm focus:ring-gray-500',
  outline: 'border-2 border-gray-300 hover:border-gray-400 active:border-gray-500 bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-gray-500',
  ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 focus:ring-gray-500',
  link: 'bg-transparent hover:bg-transparent active:bg-transparent text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline focus:ring-blue-500',
  destructive: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm focus:ring-red-500',
  success: 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white shadow-sm focus:ring-green-500',
  warning: 'bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 text-white shadow-sm focus:ring-yellow-500',
  gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:from-blue-800 active:to-purple-800 text-white shadow-sm focus:ring-blue-500'
};

// Size styles
const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-2.5 py-1.5 text-xs font-medium',
  sm: 'px-3 py-2 text-sm font-medium',
  md: 'px-4 py-2.5 text-sm font-medium',
  lg: 'px-6 py-3 text-base font-medium',
  xl: 'px-8 py-4 text-lg font-semibold'
};

// Rounded styles
const roundedStyles = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
};

// Shadow styles
const shadowStyles = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl'
};

// Icon size mapping
const iconSizes: Record<ButtonSize, number> = {
  xs: 14,
  sm: 16,
  md: 16,
  lg: 20,
  xl: 24
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    loadingText,
    disabled = false,
    icon: Icon,
    iconPosition = 'left',
    rounded = 'md',
    shadow = 'sm',
    className = '',
    animate = true,
    external = false,
    as,
    ...props
  }, ref) => {
    
    // Auto-detect button type based on props
    const buttonType = as || (props.href ? (external ? 'external' : 'link') : 'button');
    
    // Base classes that apply to all buttons
    const baseClasses = `
      inline-flex items-center justify-center
      font-medium
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
      select-none
      ${fullWidth ? 'w-full' : ''}
      ${animate ? 'transform hover:scale-105 active:scale-95' : ''}
      ${roundedStyles[rounded]}
      ${shadowStyles[shadow]}
      ${sizeStyles[size]}
      ${variantStyles[variant]}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    // Handle loading state
    const isDisabled = disabled || loading;

    // Render icon
    const renderIcon = (position: 'left' | 'right') => {
      if (loading && position === 'left') {
        return <Loader2 size={iconSizes[size]} className="animate-spin mr-2" />;
      }
      
      if (Icon && iconPosition === position) {
        return (
          <Icon 
            size={iconSizes[size]} 
            className={position === 'left' ? 'mr-2' : 'ml-2'} 
          />
        );
      }
      
      if (external && position === 'right' && !Icon) {
        return <ExternalLink size={iconSizes[size]} className="ml-2" />;
      }
      
      return null;
    };

    // Button content
    const buttonContent = (
      <>
        {renderIcon('left')}
        <span className={loading ? 'opacity-0' : ''}>
          {loading && loadingText ? loadingText : children}
        </span>
        {renderIcon('right')}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 size={iconSizes[size]} className="animate-spin" />
            {loadingText && <span className="ml-2">{loadingText}</span>}
          </div>
        )}
      </>
    );

    // Render as Next.js Link
    if (buttonType === 'link' && 'href' in props && props.href) {
      const linkProps = props as ButtonAsLinkProps;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={linkProps.href}
          className={baseClasses}
          onClick={linkProps.onClick}
          onFocus={linkProps.onFocus}
          onBlur={linkProps.onBlur}
          tabIndex={isDisabled ? -1 : undefined}
          aria-disabled={isDisabled}
        >
          {buttonContent}
        </Link>
      );
    }

    // Render as external link
    if (buttonType === 'external' && 'href' in props && props.href) {
      const externalProps = props as ButtonAsExternalProps;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={externalProps.href}
          target={externalProps.target || '_blank'}
          rel={externalProps.rel || 'noopener noreferrer'}
          className={baseClasses}
          onClick={externalProps.onClick}
          onFocus={externalProps.onFocus}
          onBlur={externalProps.onBlur}
          tabIndex={isDisabled ? -1 : undefined}
          aria-disabled={isDisabled}
        >
          {buttonContent}
        </a>
      );
    }

    // Render as button
    const buttonProps = props as ButtonAsButtonProps;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={buttonProps.type || 'button'}
        disabled={isDisabled}
        className={`${baseClasses} ${loading ? 'relative' : ''}`}
        onClick={buttonProps.onClick}
        onFocus={buttonProps.onFocus}
        onBlur={buttonProps.onBlur}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

// Preset button components for common use cases
export const PrimaryButton = (props: Omit<ButtonAsButtonProps, 'variant'>) => (
  <Button {...props} variant="primary" />
);

export const SecondaryButton = (props: Omit<ButtonAsButtonProps, 'variant'>) => (
  <Button {...props} variant="secondary" />
);

export const OutlineButton = (props: Omit<ButtonAsButtonProps, 'variant'>) => (
  <Button {...props} variant="outline" />
);

export const GhostButton = (props: Omit<ButtonAsButtonProps, 'variant'>) => (
  <Button {...props} variant="ghost" />
);

export const LinkButton = (props: Omit<ButtonAsButtonProps, 'variant'>) => (
  <Button {...props} variant="link" />
);

export const DestructiveButton = (props: Omit<ButtonAsButtonProps, 'variant'>) => (
  <Button {...props} variant="destructive" />
);

export const SuccessButton = (props: Omit<ButtonAsButtonProps, 'variant'>) => (
  <Button {...props} variant="success" />
);

export const GradientButton = (props: Omit<ButtonAsButtonProps, 'variant'>) => (
  <Button {...props} variant="gradient" />
);

// Button group component
interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const ButtonGroup = ({ 
  children, 
  orientation = 'horizontal', 
  spacing = 'md',
  className = '' 
}: ButtonGroupProps) => {
  const spacingClasses = {
    none: '',
    sm: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
    md: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4',
    lg: orientation === 'horizontal' ? 'space-x-6' : 'space-y-6'
  };

  return (
    <div className={`
      flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'}
      ${spacingClasses[spacing]}
      ${className}
    `}>
      {children}
    </div>
  );
};

// Icon button component
interface IconButtonProps extends Omit<ButtonAsButtonProps, 'children' | 'icon' | 'iconPosition'> {
  icon: React.ComponentType<any>;
  'aria-label': string;
}

export const IconButton = ({ icon: Icon, ...props }: IconButtonProps) => (
  <Button {...props} className={`p-2 ${props.className || ''}`}>
    <Icon size={iconSizes[props.size || 'md']} />
  </Button>
);

// Loading button hook for async operations
export const useAsyncButton = (asyncFn: () => Promise<void>) => {
  const [loading, setLoading] = React.useState(false);
  
  const execute = React.useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      await asyncFn();
    } finally {
      setLoading(false);
    }
  }, [asyncFn, loading]);
  
  return { loading, execute };
};