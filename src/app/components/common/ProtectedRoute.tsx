'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Lock, Shield, Eye, EyeOff, User, AlertCircle, CheckCircle, ArrowLeft, LogIn } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  // Authentication requirements
  requireAuth?: boolean;
  adminOnly?: boolean;
  
  // Alternative password protection (simpler than full auth)
  passwordProtected?: boolean;
  password?: string;
  
  // UI customization
  fallbackComponent?: React.ComponentType<any>;
  redirectTo?: string;
  showBackButton?: boolean;
  
  // Access levels
  allowedRoles?: string[];
  
  // Custom validation
  customValidation?: () => boolean;
  
  // Loading states
  loadingComponent?: React.ComponentType;
  
  // Messages
  unauthorizedMessage?: string;
  passwordPromptTitle?: string;
  
  className?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user?: {
    username: string;
    role: string;
    loginTime: string;
  };
  isLoading: boolean;
}

interface PasswordFormData {
  password: string;
  rememberAccess: boolean;
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  adminOnly = false,
  passwordProtected = false,
  password = 'cello2024',
  fallbackComponent: FallbackComponent,
  redirectTo = '/login',
  showBackButton = true,
  allowedRoles = [],
  customValidation,
  loadingComponent: LoadingComponent,
  unauthorizedMessage = 'You need to be logged in to access this content.',
  passwordPromptTitle = 'Protected Content',
  className = ''
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true
  });
  
  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    password: '',
    rememberAccess: false
  });
  
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordAttempts, setPasswordAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);

  // Check authentication state on mount and when dependencies change
  useEffect(() => {
    checkAuthentication();
  }, [requireAuth, adminOnly, allowedRoles, customValidation]);

  // Handle password protection
  useEffect(() => {
    if (passwordProtected && !requireAuth) {
      checkPasswordAccess();
    }
  }, [passwordProtected, pathname]);

  // Block timer
  useEffect(() => {
    if (isBlocked && blockTimeRemaining > 0) {
      const timer = setInterval(() => {
        setBlockTimeRemaining(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            setPasswordAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isBlocked, blockTimeRemaining]);

  const checkAuthentication = () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      // Check localStorage first (persistent login)
      let authData = localStorage.getItem('adminLoggedIn');
      let userData = localStorage.getItem('adminUser');

      // If not in localStorage, check sessionStorage (session login)
      if (!authData) {
        authData = sessionStorage.getItem('adminLoggedIn');
        userData = sessionStorage.getItem('adminUser');
      }

      const isAuthenticated = authData === 'true';
      let user = null;

      if (isAuthenticated && userData) {
        try {
          user = JSON.parse(userData);
          
          // Check if login has expired (optional - 24 hour expiration)
          if (user.loginTime) {
            const loginTime = new Date(user.loginTime);
            const now = new Date();
            const hoursSinceLogin = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
            
            if (hoursSinceLogin > 24) {
              // Login expired
              logout();
              setAuthState({ isAuthenticated: false, isLoading: false });
              return;
            }
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          logout();
        }
      }

      // Validate custom requirements
      let hasAccess = isAuthenticated;

      if (hasAccess && adminOnly) {
        hasAccess = user?.role === 'admin';
      }

      if (hasAccess && allowedRoles.length > 0) {
        hasAccess = allowedRoles.includes(user?.role || '');
      }

      if (hasAccess && customValidation) {
        hasAccess = customValidation();
      }

      setAuthState({
        isAuthenticated: hasAccess,
        user: hasAccess ? user : undefined,
        isLoading: false
      });

    } catch (error) {
      console.error('Authentication check failed:', error);
      setAuthState({ isAuthenticated: false, isLoading: false });
    }
  };

  const checkPasswordAccess = () => {
    const accessKey = `password_access_${pathname}`;
    const hasAccess = localStorage.getItem(accessKey) === 'true';
    
    if (!hasAccess) {
      setShowPasswordForm(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUser');
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUser');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isBlocked) {
      setPasswordError(`Too many attempts. Please wait ${formatTime(blockTimeRemaining)}.`);
      return;
    }

    if (passwordForm.password === password) {
      // Success
      const accessKey = `password_access_${pathname}`;
      
      if (passwordForm.rememberAccess) {
        localStorage.setItem(accessKey, 'true');
      } else {
        sessionStorage.setItem(accessKey, 'true');
      }
      
      setShowPasswordForm(false);
      setPasswordError('');
      setPasswordAttempts(0);
      setPasswordForm({ password: '', rememberAccess: false });
      
    } else {
      // Failed
      const newAttempts = passwordAttempts + 1;
      setPasswordAttempts(newAttempts);

      if (newAttempts >= 3) {
        setIsBlocked(true);
        setBlockTimeRemaining(30);
        setPasswordError('Too many failed attempts. Access blocked for 30 seconds.');
      } else {
        setPasswordError(`Incorrect password. ${3 - newAttempts} attempts remaining.`);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLogin = () => {
    // Store return URL for after login
    localStorage.setItem('returnUrl', pathname);
    router.push(redirectTo);
  };

  const handleBack = () => {
    router.back();
  };

  // Loading state
  if (authState.isLoading) {
    if (LoadingComponent) {
      return <LoadingComponent />;
    }

    return (
      <div className={`flex items-center justify-center min-h-[50vh] ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking access permissions...</p>
        </div>
      </div>
    );
  }

  // Password protection form
  if (passwordProtected && showPasswordForm) {
    return (
      <div className={`flex items-center justify-center min-h-[60vh] p-4 ${className}`}>
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{passwordPromptTitle}</h2>
            <p className="text-gray-600">Enter the password to access this content</p>
          </div>

          {/* Form */}
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={passwordForm.password}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, password: e.target.value }))}
                  disabled={isBlocked}
                  className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                    passwordError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isBlocked}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Access */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberAccess"
                checked={passwordForm.rememberAccess}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, rememberAccess: e.target.checked }))}
                disabled={isBlocked}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed"
              />
              <label htmlFor="rememberAccess" className="ml-2 text-sm text-gray-700">
                Remember my access for this session
              </label>
            </div>

            {/* Error */}
            {passwordError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center text-red-800">
                  <AlertCircle size={20} className="mr-2" />
                  <span className="font-semibold">Access Denied</span>
                </div>
                <p className="text-red-700 text-sm mt-1">{passwordError}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isBlocked}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isBlocked ? (
                <>
                  <Lock size={20} className="mr-2" />
                  Blocked ({formatTime(blockTimeRemaining)})
                </>
              ) : (
                <>
                  <Eye size={20} className="mr-2" />
                  Access Content
                </>
              )}
            </button>
          </form>

          {/* Back Button */}
          {showBackButton && (
            <button
              onClick={handleBack}
              className="w-full mt-4 text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center"
            >
              <ArrowLeft size={18} className="mr-2" />
              Go Back
            </button>
          )}

          {/* Help Text */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-600 text-center">
              This content is protected for current students and their families. 
              Contact the studio if you need access credentials.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Authentication required but user not authenticated
  if (requireAuth && !authState.isAuthenticated) {
    if (FallbackComponent) {
      return <FallbackComponent />;
    }

    return (
      <div className={`flex items-center justify-center min-h-[60vh] p-4 ${className}`}>
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield size={32} className="text-red-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Required</h2>
          <p className="text-gray-600 mb-8">{unauthorizedMessage}</p>
          
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
            >
              <LogIn size={20} className="mr-2" />
              Sign In
            </button>
            
            {showBackButton && (
              <button
                onClick={handleBack}
                className="w-full text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center"
              >
                <ArrowLeft size={18} className="mr-2" />
                Go Back
              </button>
            )}
          </div>
          
          {/* User Status */}
          {authState.user && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-center text-sm text-gray-600">
                <User size={16} className="mr-2" />
                Signed in as: <strong className="ml-1">{authState.user.username}</strong>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your current role doesn't have access to this content.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Success - render protected content
  return (
    <div className={className}>
      {children}
      
      {/* Success indicator for authenticated users */}
      {authState.isAuthenticated && authState.user && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-100 border border-green-300 rounded-lg px-4 py-2 shadow-lg">
            <div className="flex items-center text-green-800 text-sm">
              <CheckCircle size={16} className="mr-2" />
              <span>Authenticated as <strong>{authState.user.username}</strong></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Preset configurations for common use cases
export const AdminOnly = ({ children, ...props }: Omit<ProtectedRouteProps, 'adminOnly'>) => (
  <ProtectedRoute {...props} adminOnly={true}>
    {children}
  </ProtectedRoute>
);

export const PasswordProtected = ({ 
  children, 
  password = 'cello2024', 
  ...props 
}: Omit<ProtectedRouteProps, 'passwordProtected' | 'requireAuth'>) => (
  <ProtectedRoute {...props} passwordProtected={true} requireAuth={false} password={password}>
    {children}
  </ProtectedRoute>
);

export const StudentContent = ({ children, ...props }: Omit<ProtectedRouteProps, 'allowedRoles'>) => (
  <ProtectedRoute {...props} allowedRoles={['admin', 'student']}>
    {children}
  </ProtectedRoute>
);