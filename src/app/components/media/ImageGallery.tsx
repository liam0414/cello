'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, X, ChevronLeft, ChevronRight, Download, Share2, Calendar, MapPin, Users, Eye, Heart } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  thumbnail: string;
  alt: string;
  title: string;
  description?: string;
  category: 'lessons' | 'concerts' | 'events' | 'studio' | 'students' | 'instruments';
  date?: string;
  location?: string;
  tags?: string[];
  photographer?: string;
  featured?: boolean;
}

interface ImageGalleryProps {
  images?: GalleryImage[];
  columns?: 2 | 3 | 4;
  showSearch?: boolean;
  showFilters?: boolean;
  showImageInfo?: boolean;
  masonry?: boolean;
  className?: string;
}

// Sample gallery images
const defaultImages: GalleryImage[] = [
  {
    id: 1,
    src: '/images/gallery/lesson-group-1.jpg',
    thumbnail: '/images/gallery/thumbs/lesson-group-1.jpg',
    alt: 'Young students in group lesson',
    title: 'Beginner Group Lesson',
    description: 'Our youngest students aged 4-6 learning proper cello posture and basic bowing techniques.',
    category: 'lessons',
    date: '2024-03-15',
    location: 'Main Studio',
    tags: ['beginners', 'group', 'suzuki', 'children'],
    featured: true
  },
  {
    id: 2,
    src: '/images/gallery/concert-spring-2024.jpg',
    thumbnail: '/images/gallery/thumbs/concert-spring-2024.jpg',
    alt: 'Spring concert performance',
    title: 'Spring Concert 2024',
    description: 'Annual spring concert at Sydney Opera House featuring students of all levels.',
    category: 'concerts',
    date: '2024-03-20',
    location: 'Sydney Opera House',
    tags: ['performance', 'concert', 'recital', 'opera house'],
    featured: true
  },
  {
    id: 3,
    src: '/images/gallery/private-lesson-1.jpg',
    thumbnail: '/images/gallery/thumbs/private-lesson-1.jpg',
    alt: 'One-on-one private lesson',
    title: 'Private Lesson Session',
    description: 'Focused individual instruction working on advanced bowing techniques.',
    category: 'lessons',
    date: '2024-02-28',
    location: 'Private Studio Room',
    tags: ['private', 'advanced', 'technique', 'individual']
  },
  {
    id: 4,
    src: '/images/gallery/residential-camp-2024.jpg',
    thumbnail: '/images/gallery/thumbs/residential-camp-2024.jpg',
    alt: 'Students at residential camp',
    title: 'Blue Mountains Residential Camp',
    description: 'Five-day intensive music camp in the beautiful Blue Mountains with ensemble playing.',
    category: 'events',
    date: '2024-01-15',
    location: 'Blue Mountains, NSW',
    tags: ['camp', 'residential', 'intensive', 'mountains', 'ensemble']
  },
  {
    id: 5,
    src: '/images/gallery/studio-interior.jpg',
    thumbnail: '/images/gallery/thumbs/studio-interior.jpg',
    alt: 'Professional studio interior',
    title: 'Teaching Studio',
    description: 'Our acoustically designed teaching space with professional instruments.',
    category: 'studio',
    date: '2024-01-10',
    location: 'Takao\'s Cello Studio',
    tags: ['studio', 'interior', 'acoustic', 'professional']
  },
  {
    id: 6,
    src: '/images/gallery/masterclass-2024.jpg',
    thumbnail: '/images/gallery/thumbs/masterclass-2024.jpg',
    alt: 'Guest artist masterclass',
    title: 'Guest Artist Masterclass',
    description: 'Special masterclass with internationally renowned cellist Maria Rodriguez.',
    category: 'events',
    date: '2024-04-08',
    location: 'Main Studio',
    tags: ['masterclass', 'guest', 'professional', 'workshop'],
    featured: true
  },
  {
    id: 7,
    src: '/images/gallery/student-practice.jpg',
    thumbnail: '/images/gallery/thumbs/student-practice.jpg',
    alt: 'Student practicing alone',
    title: 'Dedicated Practice',
    description: 'Student practicing diligently during individual practice time.',
    category: 'students',
    date: '2024-02-20',
    location: 'Practice Room',
    tags: ['practice', 'dedication', 'solo', 'focus']
  },
  {
    id: 8,
    src: '/images/gallery/cello-collection.jpg',
    thumbnail: '/images/gallery/thumbs/cello-collection.jpg',
    alt: 'Collection of cellos',
    title: 'Instrument Collection',
    description: 'Our collection of quality cellos in various sizes for student use.',
    category: 'instruments',
    date: '2024-01-05',
    location: 'Studio',
    tags: ['instruments', 'cellos', 'collection', 'rental']
  },
  {
    id: 9,
    src: '/images/gallery/ensemble-practice.jpg',
    thumbnail: '/images/gallery/thumbs/ensemble-practice.jpg',
    alt: 'Ensemble rehearsal',
    title: 'Chamber Ensemble Rehearsal',
    description: 'Advanced students preparing for chamber music performance.',
    category: 'lessons',
    date: '2024-03-10',
    location: 'Ensemble Room',
    tags: ['ensemble', 'chamber', 'advanced', 'collaboration']
  }
];

const categoryLabels = {
  lessons: 'Lessons',
  concerts: 'Concerts',
  events: 'Events',
  studio: 'Studio',
  students: 'Students',
  instruments: 'Instruments'
};

const categoryColors = {
  lessons: 'bg-blue-500',
  concerts: 'bg-purple-500',
  events: 'bg-green-500',
  studio: 'bg-orange-500',
  students: 'bg-pink-500',
  instruments: 'bg-teal-500'
};

export default function ImageGallery({
  images = defaultImages,
  columns = 3,
  showSearch = true,
  showFilters = true,
  showImageInfo = true,
  masonry = true,
  className = ''
}: ImageGalleryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'category'>('date');
  const [isLoading, setIsLoading] = useState(true);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort images
  const filteredImages = useMemo(() => {
    let filtered = images;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }

    // Sort images
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [images, searchTerm, selectedCategory, sortBy]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(images.map(img => img.category)));
    return cats.sort();
  }, [images]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      switch (e.key) {
        case 'Escape':
          setSelectedImage(null);
          break;
        case 'ArrowLeft':
          navigateImage(-1);
          break;
        case 'ArrowRight':
          navigateImage(1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex]);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    const index = filteredImages.findIndex(img => img.id === image.id);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: number) => {
    const newIndex = (currentImageIndex + direction + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const toggleLike = (imageId: number) => {
    setLikedImages(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(imageId)) {
        newLikes.delete(imageId);
      } else {
        newLikes.add(imageId);
      }
      return newLikes;
    });
  };

  const getGridClassName = () => {
    const baseClass = "grid gap-4";
    if (masonry) {
      return `${baseClass} grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`;
    }
    return `${baseClass} grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`;
  };

  const getImageHeight = (index: number) => {
    if (!masonry) return 'aspect-[4/3]';
    // Create varied heights for masonry layout
    const heights = ['aspect-square', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-[16/9]'];
    return heights[index % heights.length];
  };

  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        {/* Loading skeleton */}
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg mb-6"></div>
          <div className={getGridClassName()}>
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl aspect-[4/3]"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Header with Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            {showSearch && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Filters and Controls */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Category Filter */}
              {showFilters && (
                <div className="flex items-center space-x-2">
                  <Filter size={16} className="text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {categoryLabels[cat as keyof typeof categoryLabels]}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'category')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="category">Sort by Category</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`px-3 py-2 text-sm ${
                    viewMode === 'masonry' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Masonry
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm ${
                    viewMode === 'grid' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Grid
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-gray-600">
            Showing {filteredImages.length} of {images.length} photos
            {selectedCategory !== 'all' && (
              <span className="ml-2">
                in <span className="font-medium">{categoryLabels[selectedCategory as keyof typeof categoryLabels]}</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Image Grid */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No photos found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className={getGridClassName()}>
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative ${getImageHeight(index)} cursor-pointer overflow-hidden rounded-xl bg-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
              onClick={() => openLightbox(image)}
            >
              {/* Image */}
              <img
                src={image.thumbnail}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Featured Badge */}
              {image.featured && (
                <div className="absolute top-3 left-3">
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                </div>
              )}

              {/* Category Badge */}
              <div className="absolute top-3 right-3">
                <span className={`${categoryColors[image.category]} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                  {categoryLabels[image.category]}
                </span>
              </div>

              {/* Image Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                {showImageInfo && image.description && (
                  <p className="text-sm text-gray-200 line-clamp-2">
                    {image.description}
                  </p>
                )}
                
                {/* Quick Actions */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-3 text-sm">
                    {image.date && (
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {new Date(image.date).toLocaleDateString()}
                      </div>
                    )}
                    {image.location && (
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {image.location}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(image.id);
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      likedImages.has(image.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart size={16} fill={likedImages.has(image.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <X size={24} />
          </button>

          {/* Navigation Buttons */}
          {filteredImages.length > 1 && (
            <>
              <button
                onClick={() => navigateImage(-1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => navigateImage(1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image Container */}
          <div className="relative max-w-7xl max-h-full">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[80vh] object-contain"
            />

            {/* Image Info Panel */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                  {selectedImage.description && (
                    <p className="text-gray-300 mb-3">{selectedImage.description}</p>
                  )}
                  
                  {/* Metadata */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                    {selectedImage.date && (
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {new Date(selectedImage.date).toLocaleDateString()}
                      </div>
                    )}
                    {selectedImage.location && (
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {selectedImage.location}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Eye size={16} className="mr-1" />
                      {currentImageIndex + 1} of {filteredImages.length}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(selectedImage.id);
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      likedImages.has(selectedImage.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    <Heart size={20} fill={likedImages.has(selectedImage.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors">
                    <Share2 size={20} />
                  </button>
                  <button className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10"
            onClick={closeLightbox}
          />
        </div>
      )}
    </div>
  );
}