'use client';

import React, { useEffect, useRef } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle, Loader2 } from 'lucide-react';

type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ModalVariant = 'default' | 'danger' | 'success' | 'warning' | 'info';

interface ModalAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ComponentType<any>;
}

interface ModalProps {
  // Core props
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  
  // Layout
  size?: ModalSize;
  variant?: ModalVariant;
  
  // Behavior
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  preventClose?: boolean;
  centerContent?: boolean;
  
  // Actions
  actions?: ModalAction[];
  showCloseButton?: boolean;
  
  // Styling
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  
  // Animation
  animated?: boolean;
  
  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  
  // Loading state
  loading?: boolean;
  
  // Icon
  icon?: React.ComponentType<any>;
  hideIcon?: boolean;
}

const sizeClasses = {
  xs: 'max-w-sm',
  sm: 'max-w-md',
  md: 'max-w-lg', 
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4'
};

const variantStyles = {
  default: {
    overlay: 'bg-black/50',
    container: 'bg-white',
    border: 'border-gray-200',
    icon: Info,
    iconColor: 'text-blue-600'
  },
  danger: {
    overlay: 'bg-red-900/20',
    container: 'bg-white',
    border: 'border-red-200',
    icon: AlertCircle,
    iconColor: 'text-red-600'
  },
  success: {
    overlay: 'bg-green-900/20',
    container: 'bg-white',
    border: 'border-green-200',
    icon: CheckCircle,
    iconColor: 'text-green-600'
  },
  warning: {
    overlay: 'bg-yellow-900/20',
    container: 'bg-white',
    border: 'border-yellow-200',
    icon: AlertTriangle,
    iconColor: 'text-yellow-600'
  },
  info: {
    overlay: 'bg-blue-900/20',
    container: 'bg-white',
    border: 'border-blue-200',
    icon: Info,
    iconColor: 'text-blue-600'
  }
};

const actionVariantStyles = {
  primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
  outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
  ghost: 'text-gray-700 hover:bg-gray-100',
  destructive: 'bg-red-600 hover:bg-red-700 text-white'
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  variant = 'default',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  preventClose = false,
  centerContent = false,
  actions = [],
  showCloseButton = true,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  animated = true,
  ariaLabel,
  ariaDescribedBy,
  loading = false,
  icon,
  hideIcon = false
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store current focused element
      previousFocus.current = document.activeElement as HTMLElement;
      
      // Focus the modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore focus and scroll
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !preventClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, preventClose, onClose]);

  if (!isOpen) return null;

  const variantStyle = variantStyles[variant];
  const IconComponent = icon || variantStyle.icon;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick && !preventClose) {
      onClose();
    }
  };

  const handleClose = () => {
    if (!preventClose) {
      onClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        animated ? 'animate-fade-in' : ''
      }`}
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ${
        variantStyle.overlay
      } ${overlayClassName}`} />

      {/* Modal Container */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
        className={`relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden ${
          variantStyle.container
        } ${variantStyle.border} border rounded-2xl shadow-2xl ${
          animated ? 'animate-scale-in' : ''
        } ${contentClassName}`}
      >
        {loading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
            <div className="flex flex-col items-center space-y-3">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-sm text-gray-600">Loading...</p>
            </div>
          </div>
        )}

        {/* Header */}
        {(title || showCloseButton) && (
          <div className={`flex items-start justify-between p-6 ${
            children || actions.length ? 'border-b border-gray-200' : ''
          } ${headerClassName}`}>
            <div className="flex items-center space-x-3">
              {!hideIcon && IconComponent && (
                <IconComponent className={`w-6 h-6 ${variantStyle.iconColor} flex-shrink-0`} />
              )}
              <div>
                {title && (
                  <h2 className="text-xl font-semibold text-gray-900 leading-6">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-gray-600 leading-5">
                    {description}
                  </p>
                )}
              </div>
            </div>
            
            {showCloseButton && !preventClose && (
              <button
                onClick={handleClose}
                className="ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        {children && (
          <div className={`${
            centerContent ? 'flex items-center justify-center' : ''
          } ${
            title || showCloseButton ? 'p-6' : 'p-6 pt-6'
          } ${
            actions.length ? 'pb-4' : ''
          } overflow-y-auto max-h-[60vh] ${bodyClassName}`}>
            {children}
          </div>
        )}

        {/* Footer */}
        {actions.length > 0 && (
          <div className={`flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 border-t border-gray-200 ${footerClassName}`}>
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                disabled={action.disabled || action.loading}
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  actionVariantStyles[action.variant || 'secondary']
                } ${
                  action.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:transform hover:scale-105'
                }`}
              >
                {action.loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : action.icon ? (
                  <action.icon className="w-4 h-4 mr-2" />
                ) : null}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Preset modal components for common use cases
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ModalVariant;
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  loading = false
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant={variant}
      size="sm"
      actions={[
        {
          label: cancelLabel,
          onClick: onClose,
          variant: 'outline',
          disabled: loading
        },
        {
          label: confirmLabel,
          onClick: onConfirm,
          variant: variant === 'danger' ? 'destructive' : 'primary',
          loading: loading
        }
      ]}
    >
      <p className="text-gray-700">{message}</p>
    </Modal>
  );
};

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  variant?: ModalVariant;
  actionLabel?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  variant = 'info',
  actionLabel = 'OK'
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant={variant}
      size="sm"
      actions={[
        {
          label: actionLabel,
          onClick: onClose,
          variant: 'primary'
        }
      ]}
    >
      <p className="text-gray-700">{message}</p>
    </Modal>
  );
};

interface LoadingModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  size?: ModalSize;
  className?: string;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen,
  title = 'Loading',
  message = 'Please wait...',
  size = 'sm',
  className = ''
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}} // No-op - loading modals shouldn't be closeable
      title={title}
      size={size}
      preventClose={true}
      showCloseButton={false}
      closeOnOverlayClick={false}
      closeOnEscape={false}
      centerContent={true}
      className={className}
    >
      <div className="flex flex-col items-center space-y-4 py-4">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-gray-600 text-center">{message}</p>
      </div>
    </Modal>
  );
};

// Hook for managing modal state
export const useModal = (defaultOpen: boolean = false) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const toggle = React.useCallback(() => setIsOpen(prev => !prev), []);

  return { isOpen, open, close, toggle };
};

// Higher-order component for modal triggers
interface ModalTriggerProps {
  children: (props: { open: () => void; close: () => void; isOpen: boolean }) => React.ReactNode;
  modal: (props: { isOpen: boolean; onClose: () => void }) => React.ReactNode;
  defaultOpen?: boolean;
}

export const ModalTrigger: React.FC<ModalTriggerProps> = ({
  children,
  modal,
  defaultOpen = false
}) => {
  const { isOpen, open, close } = useModal(defaultOpen);

  return (
    <>
      {children({ open, close, isOpen })}
      {modal({ isOpen, onClose: close })}
    </>
  );
};

// Portal component for rendering modals
interface ModalPortalProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalPortal: React.FC<ModalPortalProps> = ({ 
  children, 
  className = '' 
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  if (typeof window !== 'undefined') {
    const portalRoot = document.getElementById('modal-portal') || document.body;
    
    return (
      <div className={`modal-portal ${className}`}>
        {children}
      </div>
    );
  }

  return null;
};

export default Modal;