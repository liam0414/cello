'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Lock, Music, Users, Calendar, Camera, BookOpen, Mail, LogIn, LogOut } from 'lucide-react';
import { navigation } from '@/data/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock login check - in real app this would check actual auth state
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-gradient-to-r from-slate-800 to-slate-700 text-white'
      }`}>
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              onClick={closeMenus}
            >
              <div className="text-4xl">🎻</div>
              <div className="hidden sm:block">
                <h1 className={`text-2xl font-bold ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  Takao's Cello Studio
                </h1>
                <p className={`text-sm ${
                  isScrolled ? 'text-gray-600' : 'text-slate-300'
                }`}>
                  Professional Cello Instruction
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item, index) => (
                <div key={index} className="relative group">
                  {item.submenu ? (
                    <div className="relative">
                      <button
                        onMouseEnter={() => setOpenDropdown(index)}
                        onMouseLeave={() => setOpenDropdown(null)}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                          isScrolled
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-white hover:bg-slate-600'
                        }`}
                      >
                        <item.icon size={18} className="mr-2" />
                        {item.label}
                        <ChevronDown size={16} className="ml-2 transition-transform group-hover:rotate-180" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div
                        className={`absolute top-full left-0 mt-2 min-w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 transition-all duration-200 ${
                          openDropdown === index ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}
                        onMouseEnter={() => setOpenDropdown(index)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href!}
                            onClick={closeMenus}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                              pathname === subItem.href ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-700'
                            }`}
                          >
                            <span>{subItem.label}</span>
                            {subItem.protected && (
                              <Lock size={14} className={isLoggedIn ? 'text-green-500' : 'text-gray-400'} />
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={closeMenus}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                        pathname === item.href
                          ? isScrolled 
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-slate-600 text-white'
                          : isScrolled
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-white hover:bg-slate-600'
                      }`}
                    >
                      <item.icon size={18} className="mr-2" />
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Auth & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Login/Logout */}
              <div className="hidden md:block">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white hover:bg-slate-600'
                    }`}
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMenus}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white hover:bg-slate-600'
                    }`}
                  >
                    <LogIn size={18} className="mr-2" />
                    Admin Login
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-slate-600'
                }`}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute top-20 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 max-h-[calc(100vh-5rem)] overflow-y-auto transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="py-4">
            {navigation.map((item, index) => (
              <div key={index}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="w-full flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <item.icon size={20} className="mr-3 text-gray-600" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={`text-gray-400 transition-transform ${
                          openDropdown === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {/* Mobile Submenu */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      openDropdown === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href!}
                          onClick={closeMenus}
                          className={`w-full text-left px-12 py-3 transition-colors flex items-center justify-between ${
                            pathname === subItem.href 
                              ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span>{subItem.label}</span>
                          {subItem.protected && (
                            <Lock size={16} className={isLoggedIn ? 'text-green-500' : 'text-gray-400'} />
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={closeMenus}
                    className={`w-full flex items-center px-6 py-4 transition-colors ${
                      pathname === item.href 
                        ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                        : 'text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={20} className="mr-3 text-gray-600" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Auth */}
            <div className="border-t border-gray-200 mt-4 pt-4 px-6">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center py-3 text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  <LogOut size={20} className="mr-3 text-gray-600" />
                  <span className="font-medium">Logout</span>
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="w-full flex items-center py-3 text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  <LogIn size={20} className="mr-3 text-gray-600" />
                  <span className="font-medium">Admin Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}