'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, MessageSquare, Calendar, Music, Users, Star, ArrowRight, Send, CheckCircle, Quote } from 'lucide-react';
import ContactForm from '../components/forms/ContactForm';
import Hero from '../components/common/Hero';
import FeatureCard from '../components/common/FeatureCard';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team',
      value: '(02) 1234 5678',
      href: 'tel:+61212345678',
      badge: 'Available Now',
      badgeColor: 'green' as const
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us a detailed message',
      value: 'info@takaocello.com',
      href: 'mailto:info@takaocello.com',
      badge: '24hr Response',
      badgeColor: 'blue' as const
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      description: 'Quick chat on WhatsApp',
      value: '+61 412 345 678',
      href: 'https://wa.me/61412345678',
      badge: 'Instant',
      badgeColor: 'green' as const,
      external: true
    }
  ];

  const studioHours = [
    { day: 'Monday - Friday', hours: '3:00 PM - 8:00 PM', note: 'After school lessons' },
    { day: 'Saturday', hours: '9:00 AM - 5:00 PM', note: 'Full day sessions' },
    { day: 'Sunday', hours: '10:00 AM - 4:00 PM', note: 'Weekend programs' },
    { day: 'Public Holidays', hours: 'By appointment', note: 'Special arrangements' }
  ];

  const quickActions = [
    {
      icon: Calendar,
      title: 'Book Trial Lesson',
      description: 'Schedule your first lesson',
      href: '/contact?type=trial_lesson',
      color: 'blue',
      stats: '30min session'
    },
    {
      icon: Users,
      title: 'Group Class Info',
      description: 'Learn about our groups',
      href: '/lessons/group-lessons',
      color: 'purple',
      stats: 'All ages'
    },
    {
      icon: Music,
      title: 'Private Lessons',
      description: '1-on-1 instruction',
      href: '/lessons/private-lessons',
      color: 'green',
      stats: 'Personalized'
    }
  ];

  const locationInfo = {
    address: 'Studio 12, 123 Music Lane',
    suburb: 'Chatswood, NSW 2067',
    landmarks: 'Near Chatswood Station',
    parking: 'Free street parking available'
  };

  const faqs = [
    {
      question: 'How do I book a trial lesson?',
      answer: 'Use our contact form below or call us directly. Trial lessons are 30 minutes and help us understand your goals.'
    },
    {
      question: 'What age groups do you teach?',
      answer: 'We welcome students from 4 years old to adults. Our Suzuki method is particularly effective for young learners.'
    },
    {
      question: 'Do I need my own cello?',
      answer: 'Not initially! We can arrange cello rentals and will guide you on purchasing when you\'re ready.'
    },
    {
      question: 'How quickly will I see progress?',
      answer: 'Every student progresses at their own pace. With regular practice, most students play simple melodies within 2-3 months.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Get in Touch"
        subtitle="Ready to Start Your Musical Journey?"
        description="Whether you're booking your first lesson or have questions about our programs, we're here to help. Contact us today and let's create beautiful music together."
        size="medium"
        variant="centered"
        backgroundImage="/api/placeholder/1920/800"
        overlay="dark"
        actions={[
          {
            label: 'Book Trial Lesson',
            href: '#contact-form',
            variant: 'primary',
            icon: Calendar
          },
          {
            label: 'Call Now',
            href: 'tel:+61212345678',
            variant: 'outline',
            icon: Phone,
            external: true
          }
        ]}
        badge={{
          text: 'Responding within 24 hours',
          color: 'green'
        }}
        animated={true}
      />

      <main className="min-h-screen">
        {/* Contact Methods */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Multiple Ways to Reach Us
                </h2>
                <p className="text-lg text-gray-600">
                  Choose the contact method that works best for you
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {contactMethods.map((method, index) => (
                  <FeatureCard
                    key={index}
                    icon={method.icon}
                    title={method.title}
                    description={method.description}
                    href={method.href}
                    external={method.external}
                    variant="elevated"
                    size="medium"
                    badge={method.badge}
                    badgeColor={method.badgeColor}
                    metadata={{ location: method.value }}
                    className="text-center"
                  />
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-6">
                {quickActions.map((action, index) => (
                  <FeatureCard
                    key={index}
                    icon={action.icon}
                    title={action.title}
                    description={action.description}
                    href={action.href}
                    variant="gradient"
                    metadata={{ level: action.stats }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
              
              {/* Contact Form */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-lg text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours. 
                    For immediate assistance, give us a call!
                  </p>
                </div>
                
                <ContactForm 
                  onSubmitSuccess={() => {
                    // Could trigger success modal or redirect
                    console.log('Contact form submitted successfully');
                  }}
                />
              </div>

              {/* Studio Information */}
              <div className="space-y-8">
                
                {/* Studio Hours */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-blue-600" />
                    Studio Hours
                  </h3>
                  <div className="space-y-4">
                    {studioHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <div className="font-medium text-gray-900">{schedule.day}</div>
                          <div className="text-sm text-gray-500">{schedule.note}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">{schedule.hours}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center text-blue-800 mb-2">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Easy Scheduling</span>
                    </div>
                    <p className="text-blue-700 text-sm">
                      We offer flexible scheduling to accommodate your busy lifestyle. 
                      Evening and weekend slots available.
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-green-600" />
                    Visit Our Studio
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">{locationInfo.address}</div>
                        <div className="text-gray-600">{locationInfo.suburb}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0 text-center">🚊</div>
                      <div className="text-gray-600">{locationInfo.landmarks}</div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0 text-center">🅿️</div>
                      <div className="text-gray-600">{locationInfo.parking}</div>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p className="font-medium">Interactive Map</p>
                      <p className="text-sm">Studio location in Chatswood</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <a
                      href="https://maps.google.com/?q=Chatswood+NSW+Australia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View on Google Maps
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={index}>
                        <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">Can't find what you're looking for?</p>
                    <Link
                      href="/resources"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Browse our resources
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Need Immediate Assistance?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                For urgent lesson changes or emergencies, call us directly
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+61212345678"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call (02) 1234 5678
                </a>
                <a
                  href="https://wa.me/61412345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Preview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Families Say
              </h2>
              <p className="text-lg text-gray-600 mb-12">
                Don't just take our word for it - hear from our student families
              </p>

              <div className="bg-gray-50 rounded-2xl p-8">
                <Quote className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                <blockquote className="text-xl text-gray-700 mb-6 italic">
                  "Takao's teaching method is incredible. My daughter has progressed so much in just 6 months. 
                  The Suzuki approach really works, and the supportive community makes all the difference!"
                </blockquote>
                <footer className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                    <div className="text-sm text-gray-600">Parent of 8-year-old student</div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </footer>
              </div>

              <div className="mt-8">
                <Link
                  href="/about#testimonials"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read more testimonials
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}