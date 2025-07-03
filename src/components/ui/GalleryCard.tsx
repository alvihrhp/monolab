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
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-cyan-500/25 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="aspect-[4/5] overflow-hidden relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
        )}
        
        {imageError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-gray-900 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">🖼️</div>
              <div className="text-sm">Image not available</div>
            </div>
          </div>
        ) : (
          <img
            src={item.imageUrl}
            alt={item.title}
            className={`
              w-full h-full object-cover transition-all duration-700
              group-hover:scale-110 group-hover:brightness-110
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full backdrop-blur-sm">
            {item.category}
          </span>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-xl transition-all duration-500 pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="p-4 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
          {item.title}
        </h3>
        
        {/* Decorative Line */}
        <div className="mt-2 h-px bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-transparent group-hover:from-cyan-400 group-hover:via-purple-400 transition-all duration-500" />
      </div>

      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500 -z-10" />
    </div>
  );
}

export default GalleryCard; 