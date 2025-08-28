'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Music, 
  Award, 
  Users, 
  Heart, 
  Star, 
  Play, 
  ArrowRight, 
  Quote, 
  Calendar,
  BookOpen,
  Target,
  CheckCircle,
  Sparkles,
  Clock,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import Hero from '../components/common/Hero';
import FeatureCard from '../components/common/FeatureCard';
import { TestimonialSlider, TestimonialGrid } from '../components/common/TestimonialCard';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story');

  const studioValues = [
    {
      icon: Heart,
      title: 'Nurturing Environment',
      description: 'Every student receives personalized attention in a supportive, encouraging atmosphere where mistakes are learning opportunities.',
      stats: '200+ Happy Students'
    },
    {
      icon: Music,
      title: 'Suzuki Method Excellence',
      description: 'Authentic Suzuki instruction focusing on ear training, character development, and joyful music-making from day one.',
      stats: '15+ Years Experience'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'Our group lessons and studio events create lasting friendships and provide motivation through peer learning.',
      stats: '50+ Annual Concerts'
    },
    {
      icon: Target,
      title: 'Individual Growth',
      description: 'Tailored lesson plans that meet each student where they are and help them reach their musical goals.',
      stats: '95% Retention Rate'
    }
  ];

  const achievements = [
    {
      year: '2024',
      title: 'Excellence in Teaching Award',
      organization: 'Sydney Music Teachers Association',
      description: 'Recognized for outstanding contribution to music education'
    },
    {
      year: '2023',
      title: 'Community Music Impact',
      organization: 'NSW Arts Council',
      description: 'Awarded for fostering musical community in Northern Sydney'
    },
    {
      year: '2022',
      title: 'Suzuki Method Certification',
      organization: 'Suzuki Association of Australia',
      description: 'Advanced teacher training and methodology certification'
    }
  ];

  const milestones = [
    { year: '2009', event: 'Studio founded in Chatswood' },
    { year: '2012', event: 'First annual studio concert' },
    { year: '2015', event: '100th student milestone' },
    { year: '2018', event: 'Suzuki teacher training certification' },
    { year: '2020', event: 'Online lesson program launched' },
    { year: '2023', event: '200+ students and growing' },
    { year: '2024', event: 'Community outreach program established' }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Parent of 8-year-old student',
      content: "Takao's teaching method is incredible. My daughter has progressed so much in just 6 months. The Suzuki approach really works, and the studio feels like a second family!",
      rating: 5,
      image: '/api/placeholder/80/80',
      date: '2024',
      featured: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Adult beginner student',
      content: "I started learning at 45 and was worried it was too late. Takao made it possible and enjoyable. The patient, encouraging approach gave me confidence to pursue my musical dreams.",
      rating: 5,
      image: '/api/placeholder/80/80',
      date: '2024'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      role: 'Parent of teenage student',
      content: "The group lessons create such a supportive environment. My son loves coming to class and has made great friends. It's wonderful to see him grow musically and socially.",
      rating: 5,
      image: '/api/placeholder/80/80',
      date: '2024'
    },
    {
      id: 4,
      name: 'David Lee',
      role: 'Advanced student',
      content: "After studying with several teachers, I found my musical home here. The technique development and musicality focus has taken my playing to the next level.",
      rating: 5,
      image: '/api/placeholder/80/80',
      date: '2023'
    },
    {
      id: 5,
      name: 'Lisa Rodriguez',
      role: 'Parent of twin students',
      content: "Both my children have been learning here for 3 years. The individual attention each receives, even in group settings, is remarkable. Highly recommend!",
      rating: 5,
      image: '/api/placeholder/80/80',
      date: '2023'
    },
    {
      id: 6,
      name: 'James Thompson',
      role: 'Returning adult student',
      content: "I hadn't played cello for 20 years. Takao helped me rediscover my passion and technique. The lessons are perfectly paced for adult learners.",
      rating: 5,
      image: '/api/placeholder/80/80',
      date: '2024'
    }
  ];

  const tabs = [
    { id: 'story', label: 'Our Story', icon: BookOpen },
    { id: 'philosophy', label: 'Teaching Philosophy', icon: Target },
    { id: 'journey', label: 'Our Journey', icon: Clock }
  ];

  const tabContent = {
    story: (
      <div className="space-y-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Takao's Cello Studio was born from a simple belief: that every person, regardless of age or experience, 
                has the potential to create beautiful music. Founded in 2009 in the heart of Chatswood, our studio has 
                grown from a small teaching practice into a vibrant musical community.
              </p>
              <p>
                What started with just a handful of students has blossomed into a thriving studio serving over 200 families 
                across Sydney's North Shore. Our success isn't measured just in numbers, but in the countless moments of 
                musical breakthrough, the friendships formed, and the confidence built through music.
              </p>
              <p>
                We believe that music education is about more than just technical skill—it's about developing discipline, 
                creativity, and the joy that comes from expressing oneself through art. Every lesson is an opportunity to 
                nurture not just a musician, but a well-rounded individual.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/api/placeholder/500/400" 
              alt="Takao teaching in studio" 
              className="rounded-2xl shadow-lg"
            />
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">15+</div>
              <div className="text-sm">Years Teaching</div>
            </div>
          </div>
        </div>
      </div>
    ),
    
    philosophy: (
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Teaching Philosophy</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At the heart of our instruction is the Suzuki method, combined with modern teaching techniques 
            and a deep understanding of how students learn best.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {studioValues.map((value, index) => (
            <FeatureCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              variant="bordered"
              size="medium"
              metadata={{ capacity: value.stats }}
            />
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h4 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            The Suzuki Method Difference
          </h4>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Mother Tongue Approach
              </h5>
              <p className="text-gray-700 text-sm">
                Just as children learn to speak before reading, students learn to play by ear before reading music, 
                developing natural musicality and expression.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Character Development
              </h5>
              <p className="text-gray-700 text-sm">
                Music study develops concentration, discipline, and perseverance while building confidence 
                and self-expression in a supportive environment.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Parent Involvement
              </h5>
              <p className="text-gray-700 text-sm">
                Parents become practice partners, creating a triangle of support between teacher, student, 
                and family that accelerates learning and builds stronger bonds.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Community Learning
              </h5>
              <p className="text-gray-700 text-sm">
                Group classes and studio events create a musical community where students motivate each other 
                and celebrate collective achievements.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),

    journey: (
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h3>
          <p className="text-lg text-gray-600">From humble beginnings to a thriving musical community</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative flex items-center">
                <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="ml-16 bg-white rounded-lg p-6 shadow-md border border-gray-200 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{milestone.event}</div>
                      <div className="text-sm text-gray-600 mt-1">{milestone.year}</div>
                    </div>
                    <Sparkles className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-16">
          <h4 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Recognition & Awards</h4>
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Award className="w-8 h-8 text-yellow-600" />
                    <div>
                      <div className="font-semibold text-gray-900">{achievement.title}</div>
                      <div className="text-sm text-gray-600">{achievement.organization}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-400">{achievement.year}</div>
                </div>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Studio Statistics */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 mt-12">
          <h4 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Studio Impact</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">200+</div>
              <div className="text-gray-600">Students Taught</div>
              <div className="text-xs text-gray-500">Since 2009</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">50+</div>
              <div className="text-gray-600">Concerts Performed</div>
              <div className="text-xs text-gray-500">Annual events</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">95%</div>
              <div className="text-gray-600">Student Retention</div>
              <div className="text-xs text-gray-500">Year over year</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">15+</div>
              <div className="text-gray-600">Years Experience</div>
              <div className="text-xs text-gray-500">Professional teaching</div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="About Takao's Cello Studio"
        subtitle="Nurturing Musical Excellence Since 2009"
        description="Discover our passion for teaching, our commitment to the Suzuki method, and the vibrant musical community we've built together over 15 years."
        size="medium"
        variant="split"
        backgroundImage="/api/placeholder/1920/800"
        overlay="gradient"
        image="/api/placeholder/600/400"
        imageAlt="Takao teaching cello"
        actions={[
          {
            label: 'Start Your Journey',
            href: '/contact',
            variant: 'primary',
            icon: Music
          },
          {
            label: 'Watch Our Story',
            href: '/media/video-clips',
            variant: 'outline',
            icon: Play
          }
        ]}
        stats={[
          { value: '15+', label: 'Years Teaching', icon: Clock },
          { value: '200+', label: 'Students', icon: Users },
          { value: '50+', label: 'Concerts', icon: Calendar }
        ]}
        animated={true}
      />

      <main className="min-h-screen">
        {/* Studio Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our Studio?
              </h2>
              <p className="text-xl text-gray-600">
                Four core values that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {studioValues.map((value, index) => (
                <FeatureCard
                  key={index}
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  variant="elevated"
                  size="medium"
                  metadata={{ capacity: value.stats }}
                  className="text-center"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content Tabs */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              
              {/* Tab Navigation */}
              <div className="flex flex-col sm:flex-row justify-center mb-12 bg-gray-100 rounded-xl p-1 max-w-2xl mx-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1 ${
                      activeTab === tab.id
                        ? 'bg-white text-blue-600 shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[500px]">
                {tabContent[activeTab as keyof typeof tabContent]}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-white">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Student & Family Testimonials
                </h2>
                <p className="text-xl text-gray-600">
                  Real stories from our musical community
                </p>
              </div>

              {/* Featured Testimonial */}
              <div className="mb-16">
                <TestimonialSlider
                  testimonials={testimonials.filter(t => t.featured)}
                  variant="featured"
                  autoPlay={true}
                  interval={6000}
                />
              </div>

              {/* All Testimonials Grid */}
              <TestimonialGrid
                testimonials={testimonials}
                columns={3}
                variant="card"
                showLoadMore={true}
                initialCount={6}
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Join Our Musical Family?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Experience the joy of learning cello in our supportive community. 
                Book your trial lesson today and see why families choose us year after year.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact?type=trial_lesson"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Trial Lesson
                </Link>
                <Link
                  href="/lessons"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  <Music className="w-5 h-5 mr-2" />
                  Explore Lessons
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <Phone className="w-5 h-5" />
                    <span>(02) 1234 5678</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <Mail className="w-5 h-5" />
                    <span>info@takaocello.com</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <MapPin className="w-5 h-5" />
                    <span>Chatswood, NSW</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}