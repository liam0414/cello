'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Music, Users, Calendar, Camera, BookOpen, Facebook, Instagram, Youtube, Twitter, Heart, ArrowUp, Send } from 'lucide-react';

interface FooterProps {
  className?: string;
  showBackToTop?: boolean;
  showNewsletter?: boolean;
  showSocialMedia?: boolean;
}

// Quick links data
const quickLinks = [
  { href: '/lessons/group-lessons', label: 'Group Lessons' },
  { href: '/lessons/private-lessons', label: 'Private Lessons' },
  { href: '/resources/suzuki-big-kids', label: 'Adult Lessons' },
  { href: '/lessons/trial-lessons', label: 'Trial Lessons' },
];

const eventsLinks = [
  { href: '/events/concerts', label: 'Concerts' },
  { href: '/events/residential-camp', label: 'Residential Camp' },
  { href: '/events/takaos-talk', label: "Takao's Talk" },
  { href: '/events', label: 'All Events' },
];

const resourcesLinks = [
  { href: '/resources/cello-info', label: 'Cello Information' },
  { href: '/media/video-clips', label: 'Video Clips' },
  { href: '/media/studio-media', label: 'Studio Media' },
  { href: '/contact', label: 'Contact Us' },
];

// Business hours
const businessHours = [
  { day: 'Monday - Friday', hours: '3:00 PM - 8:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 5:00 PM' },
  { day: 'Sunday', hours: '10:00 AM - 4:00 PM' },
];

// Social media links
const socialLinks = [
  { 
    name: 'Facebook', 
    href: 'https://facebook.com/takaocellostudio', 
    icon: Facebook,
    color: 'hover:text-blue-600'
  },
  { 
    name: 'Instagram', 
    href: 'https://instagram.com/takaocellostudio', 
    icon: Instagram,
    color: 'hover:text-pink-600'
  },
  { 
    name: 'YouTube', 
    href: 'https://youtube.com/takaocellostudio', 
    icon: Youtube,
    color: 'hover:text-red-600'
  },
  { 
    name: 'Twitter', 
    href: 'https://twitter.com/takaocellostudio', 
    icon: Twitter,
    color: 'hover:text-blue-400'
  },
];

export default function Footer({ 
  className = '', 
  showBackToTop = true, 
  showNewsletter = true,
  showSocialMedia = true 
}: FooterProps) {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={`bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">🎵</div>
        <div className="absolute top-20 right-20 text-4xl">♪</div>
        <div className="absolute bottom-20 left-20 text-5xl">🎼</div>
        <div className="absolute bottom-10 right-40 text-3xl">♫</div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        {showNewsletter && (
          <div className="border-b border-slate-700">
            <div className="container mx-auto py-12">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
                <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter for updates on concerts, masterclasses, and new lesson offerings.
                </p>
                
                {subscribed ? (
                  <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-6 max-w-md mx-auto">
                    <div className="flex items-center justify-center text-green-400 mb-2">
                      <Music size={24} className="mr-2" />
                      <span className="font-semibold">Thank you!</span>
                    </div>
                    <p className="text-green-300">You've successfully subscribed to our newsletter.</p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Send size={18} className="mr-2" />
                          Subscribe
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="container mx-auto py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Studio Information */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-4xl">🎻</div>
                <div>
                  <h3 className="text-2xl font-bold">Takao's Cello Studio</h3>
                  <p className="text-slate-300">Professional Cello Instruction</p>
                </div>
              </div>
              
              <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                Nurturing musical excellence through the Suzuki method for over 15 years. 
                Join our community of passionate cellists and discover the joy of making beautiful music together.
              </p>

              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-slate-300 hover:text-white transition-colors">
                  <Mail size={18} className="mr-3 text-blue-400" />
                  <a href="mailto:info@takaocello.com">info@takaocello.com</a>
                </div>
                <div className="flex items-center text-slate-300 hover:text-white transition-colors">
                  <Phone size={18} className="mr-3 text-blue-400" />
                  <a href="tel:+61212345678">(02) 1234 5678</a>
                </div>
                <div className="flex items-center text-slate-300">
                  <MapPin size={18} className="mr-3 text-blue-400" />
                  <span>Sydney, NSW, Australia</span>
                </div>
              </div>

              {/* Social Media */}
              {showSocialMedia && (
                <div>
                  <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-slate-700/50 hover:bg-slate-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${social.color}`}
                        aria-label={`Follow us on ${social.name}`}
                      >
                        <social.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
                <Users size={20} className="mr-2 text-blue-400" />
                Lessons
              </h4>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-slate-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Events & Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
                <Calendar size={20} className="mr-2 text-blue-400" />
                Events & More
              </h4>
              <div className="space-y-3 mb-8">
                {eventsLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-slate-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Business Hours */}
              <div>
                <h5 className="font-semibold mb-4 text-white flex items-center">
                  <Clock size={18} className="mr-2 text-blue-400" />
                  Studio Hours
                </h5>
                <div className="space-y-2">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="text-sm">
                      <div className="text-slate-400">{schedule.day}</div>
                      <div className="text-slate-200 font-medium">{schedule.hours}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700">
          <div className="container mx-auto py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Copyright */}
              <div className="text-slate-400 text-center md:text-left mb-4 md:mb-0">
                <p>
                  © 2025 Takao's Cello Studio. All rights reserved.
                </p>
                <p className="text-sm mt-1">
                  Crafted with <Heart size={16} className="inline text-red-500" fill="currentColor" /> for music education
                </p>
              </div>

              {/* Legal Links & Back to Top */}
              <div className="flex items-center space-x-6">
                <div className="flex space-x-4 text-sm">
                  <Link 
                    href="/privacy" 
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link 
                    href="/terms" 
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                  <Link 
                    href="/accessibility" 
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Accessibility
                  </Link>
                </div>

                {/* Back to Top Button */}
                {showBackToTop && (
                  <button
                    onClick={scrollToTop}
                    className="w-12 h-12 bg-slate-700/50 hover:bg-blue-600 text-slate-300 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    aria-label="Back to top"
                  >
                    <ArrowUp size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-slate-700/50 text-center">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                <div className="flex items-center">
                  <Music size={16} className="mr-1 text-blue-400" />
                  Suzuki Method Certified
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-1 text-blue-400" />
                  200+ Students Taught
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1 text-blue-400" />
                  15+ Years Experience
                </div>
                <div className="flex items-center">
                  <Camera size={16} className="mr-1 text-blue-400" />
                  50+ Concerts Performed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}