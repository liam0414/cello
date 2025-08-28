'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  X, 
  ChevronDown, 
  ChevronRight, 
  Lock, 
  LogIn, 
  LogOut, 
  Home,
  Mail,
  Phone,
  MapPin,
  Clock,
  User,
  Settings
} from 'lucide-react';
import { NavigationItem } from '@/data/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
  className?: string;
}

interface ExpandedMenus {
  [key: number]: boolean;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navigation,
  isLoggedIn = false,
  onLogin,
  onLogout,
  className = ''
}: MobileMenuProps) {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<ExpandedMenus>({});
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle menu open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll when menu closes
      document.body.style.overflow = '';
      // Collapse all expanded menus when closing
      setExpandedMenus({});
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle animation end
  useEffect(() => {
    if (!isOpen && isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, isAnimating]);

  const toggleSubmenu = (index: number) => {
    setExpandedMenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleLinkClick = () => {
    onClose();
  };

  const handleLogin = () => {
    onLogin?.();
    onClose();
  };

  const handleLogout = () => {
    onLogout?.();
    onClose();
  };

  // Don't render if not open and not animating
  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-50 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />
      
      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${className}`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🎻</div>
            <div>
              <h2 className="text-lg font-bold">Takao's Cello Studio</h2>
              <p className="text-xs text-slate-300">Menu</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-600/50 hover:bg-slate-600 text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto">
          {/* User Status */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isLoggedIn ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                <User size={20} />
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {isLoggedIn ? 'Admin User' : 'Guest User'}
                </div>
                <div className="text-sm text-gray-500">
                  {isLoggedIn ? 'Authenticated' : 'Not logged in'}
                </div>
              </div>
              {isLoggedIn && (
                <div className="ml-auto">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="py-2">
            {navigation.map((item, index) => (
              <div key={index}>
                {item.submenu ? (
                  <div>
                    {/* Parent Menu Item */}
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className="w-full flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        {item.icon && (
                          <item.icon size={20} className="mr-4 text-gray-500" />
                        )}
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={`text-gray-400 transition-transform duration-200 ${
                          expandedMenus[index] ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {/* Submenu */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedMenus[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="bg-gray-50/50">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href!}
                            onClick={handleLinkClick}
                            className={`flex items-center justify-between px-10 py-3 text-gray-600 hover:text-gray-900 hover:bg-white transition-colors border-l-4 ml-6 ${
                              pathname === subItem.href 
                                ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' 
                                : 'border-transparent'
                            }`}
                          >
                            <span>{subItem.label}</span>
                            <div className="flex items-center space-x-2">
                              {subItem.protected && (
                                <Lock 
                                  size={14} 
                                  className={isLoggedIn ? 'text-green-500' : 'text-gray-400'} 
                                />
                              )}
                              <ChevronRight size={16} className="text-gray-300" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={handleLinkClick}
                    className={`flex items-center px-6 py-4 transition-colors ${
                      pathname === item.href 
                        ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-500 font-medium' 
                        : 'text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon && (
                      <item.icon 
                        size={20} 
                        className={`mr-4 ${
                          pathname === item.href ? 'text-blue-600' : 'text-gray-500'
                        }`} 
                      />
                    )}
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Quick Contact Section */}
          <div className="mx-4 my-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Mail size={16} className="mr-2 text-blue-600" />
              Quick Contact
            </h3>
            <div className="space-y-2 text-sm">
              <a 
                href="tel:+61212345678"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Phone size={14} className="mr-2 text-blue-500" />
                (02) 1234 5678
              </a>
              <a 
                href="mailto:info@takaocello.com"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Mail size={14} className="mr-2 text-blue-500" />
                info@takaocello.com
              </a>
              <div className="flex items-center text-gray-600">
                <MapPin size={14} className="mr-2 text-blue-500" />
                Sydney, NSW
              </div>
            </div>
          </div>

          {/* Studio Hours */}
          <div className="mx-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Clock size={16} className="mr-2 text-slate-600" />
              Studio Hours
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Mon - Fri</span>
                <span>3:00 PM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {/* Authentication */}
          <div className="mb-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors font-medium"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
              >
                <LogIn size={18} className="mr-2" />
                Admin Login
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className="flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Mail size={16} className="mr-1" />
              Contact
            </Link>
            <Link
              href="/events"
              onClick={handleLinkClick}
              className="flex items-center justify-center px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Home size={16} className="mr-1" />
              Events
            </Link>
          </div>

          {/* Copyright */}
          <div className="mt-4 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © 2025 Takao's Cello Studio
            </p>
          </div>
        </div>
      </div>
    </>
  );
}