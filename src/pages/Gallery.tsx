import { useState, useEffect } from 'react';
import GalleryCard from '../components/ui/GalleryCard';
import { galleryData } from '../utils/dummyData';
import type { GalleryItem } from '../types';

function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(galleryData.map(item => item.category)))]

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setItems(galleryData);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white/80 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
        {/* Loading Background Ornaments */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-gray-300 rounded-full ornament-float"></div>
          <div className="absolute top-40 right-32 w-16 h-16 border border-gray-300 rounded-full ornament-float-delayed"></div>
          <div className="absolute bottom-40 left-40 w-24 h-24 border border-gray-300 rounded-full ornament-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 border border-gray-300 rounded-full ornament-pulse-delayed"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 text-base font-gotham">Loading gallery...</p>
        </div>
      </div>
    );
  }

  // Expose filter state to window for Navbar (temporary global state)
  if (typeof window !== 'undefined') {
    window.__galleryFilter = {
      categories,
      selectedCategory,
      setSelectedCategory,
    };
  }

  return (
    <div className="min-h-screen bg-white/80 backdrop-blur-sm relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute inset-0 opacity-3">
        {/* Geometric Circles */}
        <div className="absolute top-32 left-16 w-96 h-96 border border-gray-200 rounded-full ornament-float"></div>
        <div className="absolute top-64 right-24 w-64 h-64 border border-gray-200 rounded-full ornament-float-delayed"></div>
        <div className="absolute bottom-32 left-32 w-48 h-48 border border-gray-200 rounded-full ornament-pulse"></div>
        <div className="absolute bottom-64 right-16 w-80 h-80 border border-gray-200 rounded-full ornament-pulse-delayed"></div>
        {/* Geometric Squares */}
        <div className="absolute top-96 left-64 w-32 h-32 border border-gray-200 rotate-45 ornament-rotate"></div>
        <div className="absolute top-48 right-48 w-24 h-24 border border-gray-200 rotate-45 ornament-rotate-reverse"></div>
        <div className="absolute bottom-96 left-96 w-40 h-40 border border-gray-200 rotate-45 ornament-rotate"></div>
        {/* Dotted Lines */}
        <div className="absolute top-80 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent ornament-pulse"></div>
        <div className="absolute bottom-80 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent ornament-pulse-delayed"></div>
      </div>

      {/* Header Section */}
      <div className="bg-gray-400 backdrop-blur-sm border-b border-gray-200/50 relative">
        {/* Header Background Ornaments */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-8 left-8 w-16 h-16 border border-gray-300 rounded-full ornament-float"></div>
          <div className="absolute top-4 right-12 w-8 h-8 border border-gray-300 rounded-full ornament-float-delayed"></div>
          <div className="absolute bottom-4 left-24 w-12 h-12 border border-gray-300 rounded-full ornament-pulse"></div>
          <div className="absolute bottom-8 right-8 w-20 h-20 border border-gray-300 rounded-full ornament-pulse-delayed"></div>
        </div>
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-white leading-relaxed font-gotham">
              Discover our curated collection of cultural artifacts and artistic treasures
            </p>
            {/* Decorative Element */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-px bg-gray-300"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-8 h-px bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="grid grid-cols-8 gap-8 h-full">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="border-r border-gray-200 last:border-r-0"></div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="opacity-0 animate-fade-in"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <GalleryCard item={item} />
            </div>
          ))}
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center py-20 relative z-10">
            <div className="text-5xl mb-6 text-gray-300">🎨</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2 font-gotham">No items found</h3>
            <p className="text-gray-500 font-gotham">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery; 