import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { galleryData } from '../utils/dummyData';
import { isValidSlug } from '../utils/slugUtils';
import type { GalleryItem } from '../types';
import logoSvg from '../assets/logo.svg';

function GalleryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<GalleryItem | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (slug) {
      // Validate slug format
      if (!isValidSlug(slug)) {
        navigate('/gallery');
        return;
      }

      // Find item by slug
      const foundItem = galleryData.find(item => item.slug === slug);
      if (foundItem) {
        setItem(foundItem);
      } else {
        // Redirect to gallery if item not found
        navigate('/gallery');
      }
    }
  }, [slug, navigate]);

  const handleImageLoad = (): void => {
    setImageLoaded(true);
  };

  const handleImageError = (): void => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleBackClick = (): void => {
    navigate('/gallery');
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-primary backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
        {/* Loading Background Ornaments */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-gray-300 rounded-full ornament-float"></div>
          <div className="absolute top-40 right-32 w-16 h-16 border border-gray-300 rounded-full ornament-float-delayed"></div>
          <div className="absolute bottom-40 left-40 w-24 h-24 border border-gray-300 rounded-full ornament-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 border border-gray-300 rounded-full ornament-pulse-delayed"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 text-base font-gotham">Loading gallery item...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white/80 backdrop-blur-sm relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute inset-0 opacity-3">
        {/* Geometric Circles */}
        <div className="absolute top-32 left-16 w-96 h-96 border border-gray-100 rounded-full ornament-float"></div>
        <div className="absolute top-64 right-24 w-64 h-64 border border-gray-100 rounded-full ornament-float-delayed"></div>
        <div className="absolute bottom-32 left-32 w-48 h-48 border border-gray-100 rounded-full ornament-pulse"></div>
        <div className="absolute bottom-64 right-16 w-80 h-80 border border-gray-100 rounded-full ornament-pulse-delayed"></div>
        
        {/* Geometric Squares */}
        <div className="absolute top-96 left-64 w-32 h-32 border border-gray-100 rotate-45 ornament-rotate"></div>
        <div className="absolute top-48 right-48 w-24 h-24 border border-gray-100 rotate-45 ornament-rotate-reverse"></div>
        <div className="absolute bottom-96 left-96 w-40 h-40 border border-gray-100 rotate-45 ornament-rotate"></div>
        
        {/* Dotted Lines */}
        <div className="absolute top-80 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent ornament-pulse"></div>
        <div className="absolute bottom-80 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent ornament-pulse-delayed"></div>
      </div>

      {/* Back Button */}
      <div className="bg-primary backdrop-blur-sm border-b border-gray-100/50 relative">

        {/* Header Background Ornaments */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-8 w-12 h-12 border border-gray-200 rounded-full ornament-float"></div>
          <div className="absolute top-2 right-12 w-6 h-6 border border-gray-200 rounded-full ornament-float-delayed"></div>
          <div className="absolute bottom-2 left-24 w-8 h-8 border border-gray-200 rounded-full ornament-pulse"></div>
          <div className="absolute bottom-4 right-8 w-16 h-16 border border-gray-200 rounded-full ornament-pulse-delayed"></div>
        </div>
        
        <div className="container mx-auto px-6 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackClick}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
            >
              <svg 
                className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform duration-200" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                color="white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium font-gotham text-white">Back to Gallery</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <div className="relative">
            {/* Image Background Ornaments */}
            <div className="absolute -inset-8 opacity-5">
              <div className="absolute top-0 left-0 w-24 h-24 border border-gray-200 rounded-full ornament-float"></div>
              <div className="absolute top-8 right-0 w-16 h-16 border border-gray-200 rounded-full ornament-float-delayed"></div>
              <div className="absolute bottom-0 left-8 w-20 h-20 border border-gray-200 rounded-full ornament-pulse"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 border border-gray-200 rounded-full ornament-pulse-delayed"></div>
            </div>
            
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm shadow-lg relative z-10">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
              )}
              
              {imageError ? (
                <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                  <div className="text-gray-400 text-center font-gotham">
                    <div className="text-5xl mb-4">📷</div>
                    <div className="text-lg font-medium">Image unavailable</div>
                  </div>
                </div>
              ) : (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={`
                    w-full h-full object-cover transition-opacity duration-500
                    ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                  `}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              )}

              {/* Category Badge */}
              <div className="absolute top-6 right-6 z-10">
                <span className="px-4 py-2 text-sm font-medium bg-white/95 text-gray-700 rounded-full shadow-sm backdrop-blur-sm font-gotham">
                  {item.category}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-10 relative">
            {/* Content Background Ornaments */}
            <div className="absolute -inset-8 opacity-5">
              <div className="absolute top-0 right-0 w-28 h-28 border border-gray-200 rounded-full ornament-float"></div>
              <div className="absolute top-24 left-0 w-16 h-16 border border-gray-200 rounded-full ornament-float-delayed"></div>
              <div className="absolute bottom-0 right-8 w-20 h-20 border border-gray-200 rounded-full ornament-pulse"></div>
              <div className="absolute bottom-24 left-8 w-12 h-12 border border-gray-200 rounded-full ornament-pulse-delayed"></div>
            </div>
            
            {/* Title */}
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight font-gotham">
                {item.title}
              </h1>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-0.5 bg-gray-300"></div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="w-8 h-0.5 bg-gray-300"></div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 relative z-10">
              <h2 className="text-xl font-medium text-gray-900 font-gotham">About</h2>
              <p className="text-gray-700 leading-relaxed text-lg font-gotham">
                {item.description}
              </p>
            </div>

            {/* Metadata */}
            <div className="space-y-6 relative z-10">
              <h2 className="text-xl font-medium text-gray-900 font-gotham">Details</h2>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm relative">
                {/* Metadata Background Ornaments */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-8 h-8 border border-gray-200 rounded-full ornament-float"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border border-gray-200 rounded-full ornament-float-delayed"></div>
                  <div className="absolute bottom-4 left-4 w-10 h-10 border border-gray-200 rounded-full ornament-pulse"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border border-gray-200 rounded-full ornament-pulse-delayed"></div>
                </div>
                
                <div className="grid gap-6 relative z-10">
                  {Object.entries(item.metadata).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-start border-b border-gray-200/50 pb-4 last:border-b-0 last:pb-0">
                      <div className="sm:w-1/3 mb-1 sm:mb-0">
                        <span className="text-gray-600 font-medium text-sm font-gotham">{key}</span>
                      </div>
                      <div className="sm:w-2/3">
                        <span className="text-gray-900 text-sm font-gotham">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Creation Date */}
            <div className="pt-6 border-t border-gray-100/50 relative z-10">
              <p className="text-sm text-gray-500 font-gotham">
                Added on {item.createdAt.toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryDetail; 