'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from './components/layout/Navbar';
import { Star, Award, Users, Music, Calendar, Clock, MapPin, Phone, Mail, Play, ArrowRight, Quote } from 'lucide-react';

// Sample testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Parent of 8-year-old student",
    content: "Takao's teaching method is incredible. My daughter has progressed so much in just 6 months. The Suzuki approach really works!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Adult beginner student",
    content: "I started learning at 45 and was worried it was too late. Takao made it possible and enjoyable. Highly recommend!",
    rating: 5
  },
  {
    name: "Emma Wilson",
    role: "Parent of teenage student",
    content: "The group lessons create such a supportive environment. My son loves coming to class and has made great friends.",
    rating: 5
  }
];

// Upcoming events
const upcomingEvents = [
  {
    title: "Spring Concert 2025",
    date: "March 15, 2025",
    time: "7:00 PM",
    location: "Sydney Opera House",
    description: "Annual student showcase featuring all skill levels"
  },
  {
    title: "Masterclass Series",
    date: "April 8, 2025", 
    time: "2:00 PM",
    location: "Studio",
    description: "Guest artist workshop with Maria Rodriguez"
  },
  {
    title: "Residential Camp 2026",
    date: "January 2026",
    time: "5 Days",
    location: "Blue Mountains",
    description: "Intensive learning retreat in beautiful surroundings"
  }
];

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 text-9xl animate-float">🎵</div>
            <div className="absolute top-40 right-40 text-6xl animate-float" style={{ animationDelay: '1s' }}>🎼</div>
            <div className="absolute bottom-40 left-40 text-7xl animate-float" style={{ animationDelay: '2s' }}>♪</div>
            <div className="absolute bottom-20 right-20 text-8xl animate-float" style={{ animationDelay: '3s' }}>♫</div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Discover the
                <span className="text-gradient">
                  {" "}Beauty{" "}
                </span>
                of Cello
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                Professional cello instruction for students of all ages. 
                From your first bow hold to advanced technique, let's create beautiful music together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center justify-center"
                >
                  Start Your Journey
                </Link>
                <Link
                  href="/media/video-clips"
                  className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Play size={20} className="mr-2" />
                  Watch Student Performances
                </Link>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
                  <div className="text-slate-300">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">200+</div>
                  <div className="text-slate-300">Students Taught</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                  <div className="text-slate-300">Concerts Performed</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Why Choose Takao's Cello Studio?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  With over 15 years of teaching experience and a passion for the Suzuki method, 
                  we create a nurturing environment where students flourish musically and personally.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Award className="text-blue-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Suzuki Method Expert</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Certified in the renowned Suzuki method, focusing on developing musical ability, 
                    character, and a lifelong love of music in every student.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="bg-gradient-to-br from-green-100 to-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">All Ages Welcome</h3>
                  <p className="text-gray-600 leading-relaxed">
                    From 4-year-old beginners to adult learners, we tailor our approach to each 
                    student's unique learning style and musical goals.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Star className="text-purple-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Opportunities</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Regular concerts, masterclasses, and our annual residential camp provide 
                    exciting opportunities for students to showcase their progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lesson Types Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Find the Perfect Lesson for You
                </h2>
                <p className="text-xl text-gray-600">
                  Whether you prefer individual attention or the energy of group learning, 
                  we have options to suit every learning style.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="card">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                      <Users className="text-blue-600" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Group Lessons</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Learn alongside peers in a supportive, collaborative environment. Group lessons 
                    foster musical friendships and healthy competition while being cost-effective.
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      Ages 4-7: Beginner groups
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      Ages 8-12: Intermediate groups
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      Teen ensembles
                    </li>
                  </ul>
                  <Link
                    href="/lessons/group-lessons"
                    className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
                  >
                    Learn More <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>

                <div className="card">
                  <div className="flex items-center mb-6">
                    <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                      <Music className="text-purple-600" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Private Lessons</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    One-on-one instruction tailored to your specific goals, skill level, and learning pace. 
                    Perfect for focused technical development and repertoire study.
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      Customized lesson plans
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      Flexible scheduling
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      Competition preparation
                    </li>
                  </ul>
                  <Link
                    href="/contact"
                    className="text-purple-600 hover:text-purple-800 font-semibold flex items-center"
                  >
                    Book Consultation <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">What Our Students Say</h2>
              <p className="text-xl text-blue-100 mb-16">
                Hear from our community of students and families
              </p>

              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                  <Quote className="text-blue-200 mx-auto mb-6" size={48} />
                  <blockquote className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="text-yellow-400 fill-current" size={20} />
                        ))}
                      </div>
                      <div className="font-semibold text-blue-100">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-blue-200">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 bg-white">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Upcoming Events
                </h2>
                <p className="text-xl text-gray-600">
                  Join us for concerts, masterclasses, and special events throughout the year
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>
                    <div className="space-y-2 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-blue-600" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-blue-600" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-blue-600" />
                        {event.location}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/events"
                  className="btn-primary inline-flex items-center"
                >
                  View All Events
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Musical Journey?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Contact us today to schedule a trial lesson and discover the joy of playing cello
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center justify-center"
                >
                  Contact Us Today
                </Link>
                <Link
                  href="/media/video-clips"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center"
                >
                  Watch Performances
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-16">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Studio Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-3xl">🎻</div>
                  <div>
                    <h3 className="text-2xl font-bold">Takao's Cello Studio</h3>
                    <p className="text-slate-300">Professional Cello Instruction</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                  Nurturing musical excellence through the Suzuki method. 
                  Join our community of passionate cellists and discover the joy of making beautiful music.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 cursor-pointer transition-colors">
                    <span className="text-sm">📧</span>
                  </div>
                  <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 cursor-pointer transition-colors">
                    <span className="text-sm">📱</span>
                  </div>
                  <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 cursor-pointer transition-colors">
                    <span className="text-sm">🎵</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
                <div className="space-y-3">
                  <Link href="/lessons/group-lessons" className="block text-slate-300 hover:text-white transition-colors">
                    Group Lessons
                  </Link>
                  <Link href="/contact" className="block text-slate-300 hover:text-white transition-colors">
                    Private Lessons
                  </Link>
                  <Link href="/events" className="block text-slate-300 hover:text-white transition-colors">
                    Events & Concerts
                  </Link>
                  <Link href="/resources/suzuki-big-kids" className="block text-slate-300 hover:text-white transition-colors">
                    Adult Lessons
                  </Link>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Contact Info</h4>
                <div className="space-y-4">
                  <div className="flex items-center text-slate-300">
                    <Mail size={18} className="mr-3 text-blue-400" />
                    <span>info@takaocello.com</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Phone size={18} className="mr-3 text-blue-400" />
                    <span>(02) 1234 5678</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <MapPin size={18} className="mr-3 text-blue-400" />
                    <span>Sydney, NSW</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Clock size={18} className="mr-3 text-blue-400" />
                    <div>
                      <div>Mon-Fri: 3:00 PM - 8:00 PM</div>
                      <div>Sat: 9:00 AM - 5:00 PM</div>
                      <div>Sun: 10:00 AM - 4:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-slate-600 mt-12 pt-8 text-center">
              <p className="text-slate-400">
                © 2025 Takao's Cello Studio. All rights reserved. | 
                <span className="ml-2">
                  Crafted with ❤️ for music education
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}