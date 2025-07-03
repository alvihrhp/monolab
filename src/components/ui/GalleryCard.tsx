import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { GalleryCardProps } from '../../types';

function GalleryCard({ item, onImageLoad }: GalleryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleImageLoad = (): void => {
    setImageLoaded(true);
    onImageLoad?.();
  };

  const handleImageError = (): void => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleCardClick = (): void => {
    navigate(`/gallery/${item.slug}`);
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100/50"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="aspect-[4/5] overflow-hidden relative bg-gray-50/50 backdrop-blur-sm">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        
        {imageError ? (
          <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
            <div className="text-gray-400 text-center font-gotham">
              <div className="text-3xl mb-2">📷</div>
              <div className="text-sm font-medium">Image unavailable</div>
            </div>
          </div>
        ) : (
          <img
            src={item.imageUrl}
            alt={item.title}
            className={`
              w-full h-full object-cover transition-all duration-500
              group-hover:scale-105
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}

        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 text-xs font-medium bg-white/95 text-gray-700 rounded-full backdrop-blur-sm shadow-sm font-gotham">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200 line-clamp-2 leading-tight font-gotham">
          {item.title}
        </h3>
        
        {/* Simple underline accent */}
        <div className="mt-3 w-8 h-0.5 bg-gray-300 group-hover:bg-gray-400 group-hover:w-12 transition-all duration-300" />
      </div>
    </div>
  );
}

export default GalleryCard; 