'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, X, ZoomIn, Download } from 'lucide-react';

interface Photo {
  id: number;
  src: string;
  alt: string;
  title: string;
  description?: string;
  category: 'lesson' | 'concert' | 'event' | 'studio';
}

interface PhotoCarouselProps {
  photos?: Photo[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showThumbnails?: boolean;
  showControls?: boolean;
  showFullscreen?: boolean;
  className?: string;
}

// Sample photos data
const defaultPhotos: Photo[] = [
  {
    id: 1,
    src: '/images/gallery/lesson1.jpg',
    alt: 'Group lesson with young students',
    title: 'Beginner Group Lesson',
    description: 'Our youngest students learning the basics of cello posture and bow hold',
    category: 'lesson'
  },
  {
    id: 2,
    src: '/images/gallery/concert1.jpg',
    alt: 'Students performing at spring concert',
    title: 'Spring Concert 2024',
    description: 'Annual student showcase at Sydney Opera House',
    category: 'concert'
  },
  {
    id: 3,
    src: '/images/gallery/lesson2.jpg',
    alt: 'Private lesson in progress',
    title: 'One-on-One Instruction',
    description: 'Personalized guidance for advanced technique development',
    category: 'lesson'
  },
  {
    id: 4,
    src: '/images/gallery/event1.jpg',
    alt: 'Residential camp activities',
    title: 'Annual Residential Camp',
    description: 'Students bonding over music in the Blue Mountains',
    category: 'event'
  },
  {
    id: 5,
    src: '/images/gallery/studio1.jpg',
    alt: 'Beautiful studio interior',
    title: 'Professional Studio Space',
    description: 'Our welcoming and acoustically-designed teaching space',
    category: 'studio'
  },
  {
    id: 6,
    src: '/images/gallery/concert2.jpg',
    alt: 'Advanced ensemble performance',
    title: 'Chamber Music Ensemble',
    description: 'Advanced students performing Bach Brandenburg Concerto',
    category: 'concert'
  }
];

export default function PhotoCarousel({
  photos = defaultPhotos,
  autoPlay = true,
  autoPlayInterval = 5000,
  showThumbnails = true,
  showControls = true,
  showFullscreen = true,
  className = ''
}: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isFullscreen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, isFullscreen, photos.length, autoPlayInterval]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isFullscreen) return;

      switch (event.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          setIsFullscreen(false);
          break;
        case ' ':
          event.preventDefault();
          setIsPlaying(!isPlaying);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, isPlaying]);

  // Preload images
  useEffect(() => {
    const preloadImage = (src: string, id: number) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, id]));
      };
      img.src = src;
    };

    photos.forEach(photo => {
      preloadImage(photo.src, photo.id);
    });
  }, [photos]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    setIsPlaying(false);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lesson':
        return 'bg-blue-500';
      case 'concert':
        return 'bg-purple-500';
      case 'event':
        return 'bg-green-500';
      case 'studio':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const currentPhoto = photos[currentIndex];

  return (
    <>
      {/* Main Carousel */}
      <div className={`relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl ${className}`}>
        {/* Main Image Container */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {/* Image */}
          <div className="relative w-full h-full">
            <img
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              className="w-full h-full object-cover transition-opacity duration-500"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
            
            {/* Loading placeholder */}
            {isLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-gray-400">Loading...</div>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getCategoryColor(currentPhoto.category)}`}>
                {currentPhoto.category.charAt(0).toUpperCase() + currentPhoto.category.slice(1)}
              </span>
            </div>

            {/* Navigation Arrows */}
            {showControls && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Control Panel */}
            {showControls && (
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={togglePlayPause}
                  className="w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
                  aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                
                {showFullscreen && (
                  <button
                    onClick={openFullscreen}
                    className="w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
                    aria-label="Open fullscreen"
                  >
                    <ZoomIn size={18} />
                  </button>
                )}
              </div>
            )}

            {/* Photo Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{currentPhoto.title}</h3>
              {currentPhoto.description && (
                <p className="text-gray-200 text-sm leading-relaxed">
                  {currentPhoto.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: `${((Date.now() % autoPlayInterval) / autoPlayInterval) * 100}%`
              }}
            />
          </div>
        )}

        {/* Thumbnails */}
        {showThumbnails && (
          <div className="p-4 bg-gray-800">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => goToSlide(index)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                    index === currentIndex 
                      ? 'ring-2 ring-white scale-110' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Slide Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full backdrop-blur-sm">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black">
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
            aria-label="Close fullscreen"
          >
            <X size={24} />
          </button>

          {/* Fullscreen Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              className="max-w-full max-h-full object-contain"
            />

            {/* Fullscreen Navigation */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <ChevronRight size={32} />
            </button>

            {/* Fullscreen Info */}
            <div className="absolute bottom-8 left-8 right-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-2">{currentPhoto.title}</h3>
              {currentPhoto.description && (
                <p className="text-gray-300 max-w-2xl mx-auto">
                  {currentPhoto.description}
                </p>
              )}
            </div>

            {/* Fullscreen Counter */}
            <div className="absolute top-4 left-4 px-4 py-2 bg-black/50 text-white rounded-full">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}