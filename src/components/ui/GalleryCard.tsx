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

        {/* Main Overlay System */}
        {/* Bottom gradient overlay for title area */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
        
        {/* Top gradient overlay for badge area */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
        
        {/* Cyberpunk corner accents */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/30 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/30 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Scan line effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
        
        {/* Enhanced Category Badge */}
        <div className="absolute top-3 right-3 z-20">
          {/* Badge background glow */}
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-sm scale-110" />
          {/* Main badge */}
          <span className="relative px-3 py-1.5 text-xs font-bold bg-black/70 text-cyan-300 border border-cyan-500/60 rounded-full backdrop-blur-md shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 group-hover:border-cyan-400/80 group-hover:text-cyan-200 transition-all duration-300">
            {item.category}
          </span>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-xl transition-all duration-500 pointer-events-none" />
        
        {/* Corner tech details */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-purple-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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