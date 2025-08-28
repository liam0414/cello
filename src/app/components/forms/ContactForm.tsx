'use client';

import React, { useState } from 'react';
import { Mail, Phone, User, MessageCircle, Calendar, Users, Music, Clock, Send, CheckCircle, AlertCircle, MapPin } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  contactType: 'general' | 'lesson_inquiry' | 'event_booking' | 'trial_lesson' | 'group_lesson' | 'private_lesson';
  subject: string;
  message: string;
  studentAge?: string;
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced' | 'returning';
  preferredTime?: string;
  hearAboutUs?: string;
  newsletter: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface ContactFormProps {
  className?: string;
  onSubmitSuccess?: () => void;
  defaultContactType?: ContactFormData['contactType'];
}

const contactTypeOptions = [
  { value: 'general', label: 'General Inquiry', icon: Mail, description: 'General questions about our studio' },
  { value: 'trial_lesson', label: 'Trial Lesson', icon: Music, description: 'Book a trial lesson to get started' },
  { value: 'lesson_inquiry', label: 'Lesson Information', icon: Users, description: 'Learn about our lesson programs' },
  { value: 'private_lesson', label: 'Private Lessons', icon: User, description: 'Individual instruction inquiry' },
  { value: 'group_lesson', label: 'Group Lessons', icon: Users, description: 'Group class information' },
  { value: 'event_booking', label: 'Event Inquiry', icon: Calendar, description: 'Concerts, workshops, and events' },
];

const experienceLevels = [
  { value: 'beginner', label: 'Complete Beginner', description: 'Never played cello before' },
  { value: 'intermediate', label: 'Some Experience', description: '1-3 years of playing' },
  { value: 'advanced', label: 'Advanced Player', description: '3+ years of experience' },
  { value: 'returning', label: 'Returning Student', description: 'Previously studied, returning to cello' },
];

const timePreferences = [
  'Weekday Mornings (9 AM - 12 PM)',
  'Weekday Afternoons (12 PM - 5 PM)',
  'Weekday Evenings (5 PM - 8 PM)',
  'Saturday Mornings (9 AM - 12 PM)',
  'Saturday Afternoons (12 PM - 5 PM)',
  'Sunday Mornings (10 AM - 1 PM)',
  'Sunday Afternoons (1 PM - 4 PM)',
  'Flexible - Any available time',
];

export default function ContactForm({ 
  className = '', 
  onSubmitSuccess,
  defaultContactType = 'general'
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    contactType: defaultContactType,
    subject: '',
    message: '',
    studentAge: '',
    experienceLevel: 'beginner',
    preferredTime: '',
    hearAboutUs: '',
    newsletter: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(1);

  const isLessonInquiry = ['lesson_inquiry', 'trial_lesson', 'private_lesson', 'group_lesson'].includes(formData.contactType);
  const totalSteps = isLessonInquiry ? 3 : 2;

  const validateForm = (step?: number): boolean => {
    const newErrors: FormErrors = {};

    if (!step || step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.contactType) newErrors.contactType = 'Please select a contact type';
    }

    if (!step || step === 2) {
      if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
      if (!formData.message.trim()) {
        newErrors.message = 'Message is required';
      } else if (formData.message.length < 10) {
        newErrors.message = 'Message must be at least 10 characters long';
      }
    }

    if ((!step || step === 3) && isLessonInquiry) {
      if (!formData.studentAge?.trim()) newErrors.studentAge = 'Student age is required for lesson inquiries';
      if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Auto-populate subject based on contact type
    if (field === 'contactType') {
      const selectedType = contactTypeOptions.find(option => option.value === value);
      if (selectedType && !formData.subject) {
        setFormData(prev => ({ 
          ...prev, 
          subject: `${selectedType.label} Inquiry`
        }));
      }
    }
  };

  const nextStep = () => {
    if (validateForm(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        onSubmitSuccess?.();
        
        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            contactType: 'general',
            subject: '',
            message: '',
            studentAge: '',
            experienceLevel: 'beginner',
            preferredTime: '',
            hearAboutUs: '',
            newsletter: false,
          });
          setCurrentStep(1);
          setSubmitStatus('idle');
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
        
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            <User size={16} className="inline mr-1" />
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail size={16} className="inline mr-1" />
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone size={16} className="inline mr-1" />
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="(02) 1234 5678"
          />
        </div>

        {/* Contact Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            <MessageCircle size={16} className="inline mr-1" />
            What can we help you with? *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {contactTypeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleInputChange('contactType', option.value)}
                className={`text-left p-4 border-2 rounded-xl transition-all duration-200 hover:shadow-md ${
                  formData.contactType === option.value
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center mb-2">
                  <option.icon size={20} className={`mr-2 ${
                    formData.contactType === option.value ? 'text-blue-600' : 'text-gray-500'
                  }`} />
                  <span className="font-medium text-gray-900">{option.label}</span>
                </div>
                <p className="text-sm text-gray-600">{option.description}</p>
              </button>
            ))}
          </div>
          {errors.contactType && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {errors.contactType}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Message</h3>
        
        {/* Subject */}
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Brief description of your inquiry"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
              errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Please provide details about your inquiry. The more information you share, the better we can help you!"
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message ? (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.message}
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                {formData.message.length}/500 characters
              </p>
            )}
          </div>
        </div>

        {/* How did you hear about us */}
        <div>
          <label htmlFor="hearAboutUs" className="block text-sm font-semibold text-gray-700 mb-2">
            How did you hear about us? (Optional)
          </label>
          <select
            id="hearAboutUs"
            value={formData.hearAboutUs}
            onChange={(e) => handleInputChange('hearAboutUs', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">Please select...</option>
            <option value="google">Google Search</option>
            <option value="social_media">Social Media</option>
            <option value="friend_referral">Friend or Family Referral</option>
            <option value="school">School Recommendation</option>
            <option value="concert">Attended a Concert</option>
            <option value="website">Found our Website</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Lesson Details</h3>
        
        {/* Student Age */}
        <div className="mb-4">
          <label htmlFor="studentAge" className="block text-sm font-semibold text-gray-700 mb-2">
            Student Age *
          </label>
          <input
            type="text"
            id="studentAge"
            value={formData.studentAge}
            onChange={(e) => handleInputChange('studentAge', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.studentAge ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="e.g., 8 years old, Adult, 25"
          />
          {errors.studentAge && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {errors.studentAge}
            </p>
          )}
        </div>

        {/* Experience Level */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            <Music size={16} className="inline mr-1" />
            Experience Level *
          </label>
          <div className="space-y-3">
            {experienceLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => handleInputChange('experienceLevel', level.value)}
                className={`w-full text-left p-4 border-2 rounded-xl transition-all duration-200 hover:shadow-md ${
                  formData.experienceLevel === level.value
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900 mb-1">{level.label}</div>
                <p className="text-sm text-gray-600">{level.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Time */}
        <div>
          <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 mb-2">
            <Clock size={16} className="inline mr-1" />
            Preferred Lesson Times (Optional)
          </label>
          <select
            id="preferredTime"
            value={formData.preferredTime}
            onChange={(e) => handleInputChange('preferredTime', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">Select preferred time...</option>
            {timePreferences.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  if (submitStatus === 'success') {
    return (
      <div className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <div className="bg-blue-50 rounded-xl p-4 text-left">
            <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• You'll receive a confirmation email shortly</li>
              <li>• We'll review your inquiry within 24 hours</li>
              <li>• You'll get a personalized response from our team</li>
              {isLessonInquiry && <li>• We'll help schedule your trial lesson or consultation</li>}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
      {/* Progress Bar */}
      <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
          <div className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {/* Render current step */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        {/* Newsletter Subscription */}
        {currentStep === totalSteps && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.newsletter}
                onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <div className="font-medium text-blue-900">Subscribe to our newsletter</div>
                <div className="text-sm text-blue-700">
                  Get updates on concerts, masterclasses, and new lesson offerings
                </div>
              </div>
            </label>
          </div>
        )}

        {/* Error Status */}
        {submitStatus === 'error' && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center text-red-800">
              <AlertCircle size={20} className="mr-2" />
              <span className="font-semibold">Failed to send message</span>
            </div>
            <p className="text-red-700 text-sm mt-1">
              Please try again or contact us directly at info@takaocello.com
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Previous
              </button>
            )}
          </div>

          <div>
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}