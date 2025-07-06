import { Link } from 'react-router-dom';
import logoSvg from '../../assets/logo.svg';

interface NavbarProps {
  categories?: string[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

declare global {
  interface Window {
    __galleryFilter?: {
      categories: string[];
      selectedCategory: string;
      setSelectedCategory: (category: string) => void;
    };
  }
}

function Navbar(props: NavbarProps) {
  // Prefer props, fallback to window.__galleryFilter
  const categories = props.categories ?? window.__galleryFilter?.categories;
  const selectedCategory = props.selectedCategory ?? window.__galleryFilter?.selectedCategory;
  const onSelectCategory = props.onSelectCategory ?? window.__galleryFilter?.setSelectedCategory;
  const showFilter = categories && selectedCategory && onSelectCategory;

  return (
    <nav className="relative z-50">
      {/* Top bar */}
      <div className="w-full bg-gray-900 text-gray-200 text-xs flex justify-end items-center px-6 h-10">
        <div className="flex gap-4 items-center">
          <button className="hover:underline">About Us</button>
          <button className="hover:underline">Contact us</button>
          <button className="hover:underline">Projects</button>
          <button className="hover:underline">Team</button>
          <button className="hover:underline">Partners</button>
          <button className="hover:underline">Clients</button>
        </div>
      </div>

      {/* Main navbar */}
      <div className="w-full bg-primary text-white shadow-sm border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-8 h-16">
          {/* Left: Logo & Title + Filter */}
          <div className="flex items-center gap-10">
            <Link to="/gallery" className="flex items-center gap-6">
              <img src={logoSvg} alt="MonoLab Logo" className="w-14 h-14 md:w-16 md:h-16" />
              {/* Separator */}
              {showFilter && (
                <div className="h-10 border-l border-white/20 mx-2" />
              )}
              <span className="font-bold text-2xl md:text-3xl tracking-tight sm:inline">Gallery</span>
            </Link>
            {/* Category Filter Buttons (only if props provided) */}
            {showFilter && (
              <div className="md:flex gap-2 lg:gap-4 ml-2">
                {categories!.map(category => (
                  <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`px-2 py-1 text-base font-medium font-gotham transition-colors duration-150
                      ${selectedCategory === category
                        ? 'text-white font-bold'
                        : 'text-white/60 hover:text-white'
                      }`
                    }
                    style={{ background: 'none', border: 'none', borderRadius: 0, boxShadow: 'none' }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 