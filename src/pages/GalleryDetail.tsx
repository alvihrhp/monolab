import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { galleryData } from '../utils/dummyData';
import { isValidSlug } from '../utils/slugUtils';
import type { GalleryItem } from '../types';

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading gallery item...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <button
          onClick={handleBackClick}
          className="flex items-center space-x-2 text-gray-400 hover:text-cyan-300 transition-colors duration-300 group"
        >
          <svg 
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Back to Gallery</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 relative group">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
              )}
              
              {imageError ? (
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-gray-900 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="text-6xl mb-4">🖼️</div>
                    <div className="text-lg">Image not available</div>
                  </div>
                </div>
              ) : (
                    <img
                    src={item.imageUrl}
                    alt={item.title}
                    className={`
                      w-full h-full object-cover transition-all duration-700
                      ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                    `}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
              )}

              {/* Category Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 text-sm font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full backdrop-blur-sm">
                  {item.category}
                </span>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur -z-10" />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
                {item.title}
              </h1>
              <div className="h-px bg-gradient-to-r from-cyan-500 via-purple-500 to-transparent"></div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Deskripsi</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {item.description}
              </p>
            </div>

            {/* Metadata */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Detail Informasi</h2>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
                <div className="grid gap-4">
                  {Object.entries(item.metadata).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-center border-b border-gray-700/30 pb-3 last:border-b-0 last:pb-0">
                      <div className="sm:w-1/3 mb-1 sm:mb-0">
                        <span className="text-cyan-300 font-medium text-sm sm:text-base">{key}</span>
                      </div>
                      <div className="sm:w-2/3">
                        <span className="text-gray-300 text-sm sm:text-base">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Creation Date */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-400">Ditambahkan pada</h3>
              <p className="text-gray-500">
                {item.createdAt.toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

export default GalleryDetail; 