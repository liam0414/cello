'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, User, AlertCircle, CheckCircle, Shield, LogIn, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onLoginSuccess?: (userData: { username: string; loginTime: string }) => void;
  onBack?: () => void;
  className?: string;
  showBackButton?: boolean;
  redirectTo?: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}

export default function LoginForm({ 
  onLoginSuccess,
  onBack,
  className = '',
  showBackButton = true,
  redirectTo = '/'
}: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Block timer effect
  useEffect(() => {
    if (isBlocked && blockTimeRemaining > 0) {
      const timer = setInterval(() => {
        setBlockTimeRemaining(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isBlocked, blockTimeRemaining]);

  // Auto-focus username field
  useEffect(() => {
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
      usernameInput.focus();
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific field error
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear general error
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }));
    }
  };

  const simulateLogin = async (username: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple credential check (in real app, this would be secure server-side)
    const validCredentials = [
      { username: 'admin', password: 'cello2024' },
      { username: 'takao', password: 'studio123' },
    ];

    return validCredentials.some(cred => 
      cred.username === username && cred.password === password
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      setErrors({ general: `Too many login attempts. Please wait ${blockTimeRemaining} seconds.` });
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const isValidLogin = await simulateLogin(formData.username, formData.password);

      if (isValidLogin) {
        // Success
        setLoginSuccess(true);
        
        // Store login state
        const loginData = {
          username: formData.username,
          loginTime: new Date().toISOString(),
          rememberMe: formData.rememberMe
        };

        if (formData.rememberMe) {
          localStorage.setItem('adminLoggedIn', 'true');
          localStorage.setItem('adminUser', JSON.stringify(loginData));
        } else {
          sessionStorage.setItem('adminLoggedIn', 'true');
          sessionStorage.setItem('adminUser', JSON.stringify(loginData));
        }

        // Reset login attempts
        setLoginAttempts(0);

        // Call success callback after animation
        setTimeout(() => {
          onLoginSuccess?.(loginData);
        }, 1500);

      } else {
        // Failed login
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);

        if (newAttempts >= 3) {
          setIsBlocked(true);
          setBlockTimeRemaining(30); // 30 second block
          setErrors({ 
            general: 'Too many failed attempts. Access blocked for 30 seconds.' 
          });
        } else {
          setErrors({ 
            general: `Invalid username or password. ${3 - newAttempts} attempts remaining.` 
          });
        }
      }
    } catch (error) {
      setErrors({ 
        general: 'Login failed. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Success state
  if (loginSuccess) {
    return (
      <div className={`bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Successful!</h2>
          <p className="text-gray-600 mb-6">
            Welcome back, {formData.username}. Redirecting you now...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-8 text-center">
        <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
        <p className="text-slate-300">Access protected content and settings</p>
      </div>

      <div className="p-8">
        {/* Back Button */}
        {showBackButton && onBack && (
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Website
          </button>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              <User size={16} className="inline mr-1" />
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              disabled={isSubmitting || isBlocked}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your username"
              autoComplete="username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              <Lock size={16} className="inline mr-1" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                disabled={isSubmitting || isBlocked}
                className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isSubmitting || isBlocked}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                disabled={isSubmitting || isBlocked}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed"
              />
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
            
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              disabled={isSubmitting || isBlocked}
            >
              Forgot password?
            </button>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className={`p-4 rounded-xl border ${
              isBlocked 
                ? 'bg-red-50 border-red-200' 
                : 'bg-orange-50 border-orange-200'
            }`}>
              <div className="flex items-center">
                <AlertCircle size={20} className={`mr-2 ${
                  isBlocked ? 'text-red-600' : 'text-orange-600'
                }`} />
                <span className={`font-semibold ${
                  isBlocked ? 'text-red-800' : 'text-orange-800'
                }`}>
                  {isBlocked ? 'Access Blocked' : 'Login Failed'}
                </span>
              </div>
              <p className={`text-sm mt-1 ${
                isBlocked ? 'text-red-700' : 'text-orange-700'
              }`}>
                {errors.general}
              </p>
              {isBlocked && (
                <div className="mt-2 text-sm text-red-700">
                  Time remaining: <span className="font-mono font-bold">
                    {formatTime(blockTimeRemaining)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isBlocked}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Authenticating...
              </>
            ) : isBlocked ? (
              <>
                <Lock size={20} className="mr-2" />
                Blocked ({formatTime(blockTimeRemaining)})
              </>
            ) : (
              <>
                <LogIn size={20} className="mr-2" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Login Attempts Indicator */}
        {loginAttempts > 0 && !isBlocked && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center text-yellow-800">
              <AlertCircle size={16} className="mr-2" />
              <span className="text-sm">
                Login attempts: {loginAttempts}/3
              </span>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-start">
            <Shield size={16} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-600">
              <div className="font-medium text-gray-700 mb-1">Security Notice</div>
              <div>This is a protected admin area. All login attempts are logged and monitored.</div>
            </div>
          </div>
        </div>

        {/* Demo Credentials (Remove in production) */}
        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="text-sm text-blue-800">
            <div className="font-medium mb-2">Demo Credentials:</div>
            <div className="font-mono text-xs space-y-1">
              <div>Username: <strong>admin</strong> | Password: <strong>cello2024</strong></div>
              <div>Username: <strong>takao</strong> | Password: <strong>studio123</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}