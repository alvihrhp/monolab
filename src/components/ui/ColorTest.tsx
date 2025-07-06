import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import logoSvg from '../../assets/logo.svg';

function ColorTest() {
  return (
    <div className="min-h-screen bg-neutral relative">
      <Navbar />
      {/* Logo in top left corner */}
      <div className="absolute top-4 left-4 z-20">
        <Link to="/gallery" className="block">
          <img 
            src={logoSvg} 
            alt="MonoLab Logo" 
            className="w-16 h-16 md:w-20 md:h-20 hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>
      </div>

      <div className="p-8 space-y-8 pt-24">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">MonoLab Color System</h1>
          <p className="text-black-600">Testing the new color palette</p>
        </div>

      {/* Brand Colors */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary rounded-lg mx-auto mb-2 shadow-lg"></div>
          <h3 className="font-semibold text-primary">Primary</h3>
          <p className="text-sm text-black-600">#2f304e</p>
        </div>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-secondary rounded-lg mx-auto mb-2 shadow-lg"></div>
          <h3 className="font-semibold text-secondary">Secondary</h3>
          <p className="text-sm text-black-600">#0068b2</p>
        </div>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-tertiary rounded-lg mx-auto mb-2 shadow-lg"></div>
          <h3 className="font-semibold text-tertiary">Tertiary</h3>
          <p className="text-sm text-black-600">#f4961c</p>
        </div>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-neutral border-2 border-black-200 rounded-lg mx-auto mb-2 shadow-lg"></div>
          <h3 className="font-semibold text-black">Neutral</h3>
          <p className="text-sm text-black-600">#ffffff</p>
        </div>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-black rounded-lg mx-auto mb-2 shadow-lg"></div>
          <h3 className="font-semibold text-black">Black</h3>
          <p className="text-sm text-black-600">#000000</p>
        </div>
      </div>

      {/* Text Examples */}
      <div className="bg-neutral p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primary mb-4">Text Colors</h2>
        <div className="space-y-2">
          <p className="text-primary">Primary text color</p>
          <p className="text-secondary">Secondary text color</p>
          <p className="text-tertiary">Tertiary text color</p>
          <p className="text-black">Black text color</p>
          <p className="text-black-600">Black-600 text color</p>
        </div>
      </div>

      {/* Button Examples */}
      <div className="bg-neutral p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primary mb-4">Button Examples</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary hover:bg-primary-800 text-neutral px-4 py-2 rounded-lg font-medium transition-colors">
            Primary Button
          </button>
          <button className="bg-secondary hover:bg-secondary-800 text-neutral px-4 py-2 rounded-lg font-medium transition-colors">
            Secondary Button
          </button>
          <button className="bg-tertiary hover:bg-tertiary-800 text-neutral px-4 py-2 rounded-lg font-medium transition-colors">
            Tertiary Button
          </button>
          <button className="border-2 border-primary text-primary hover:bg-primary hover:text-neutral px-4 py-2 rounded-lg font-medium transition-colors">
            Outline Button
          </button>
        </div>
      </div>

      {/* Card Examples */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral p-6 rounded-lg shadow-lg border-l-4 border-primary">
          <h3 className="font-bold text-primary mb-2">Primary Card</h3>
          <p className="text-black-600">This is a card with primary accent color.</p>
        </div>
        
        <div className="bg-neutral p-6 rounded-lg shadow-lg border-l-4 border-secondary">
          <h3 className="font-bold text-secondary mb-2">Secondary Card</h3>
          <p className="text-black-600">This is a card with secondary accent color.</p>
        </div>
        
        <div className="bg-neutral p-6 rounded-lg shadow-lg border-l-4 border-tertiary">
          <h3 className="font-bold text-tertiary mb-2">Tertiary Card</h3>
          <p className="text-black-600">This is a card with tertiary accent color.</p>
        </div>
      </div>

      {/* Alert Examples */}
      <div className="space-y-4">
        <div className="bg-primary-50 border border-primary-200 text-primary-800 p-4 rounded-lg">
          <h4 className="font-semibold">Primary Alert</h4>
          <p>This is a primary alert with primary colors.</p>
        </div>
        
        <div className="bg-secondary-50 border border-secondary-200 text-secondary-800 p-4 rounded-lg">
          <h4 className="font-semibold">Secondary Alert</h4>
          <p>This is a secondary alert with secondary colors.</p>
        </div>
        
        <div className="bg-tertiary-50 border border-tertiary-200 text-tertiary-800 p-4 rounded-lg">
          <h4 className="font-semibold">Tertiary Alert</h4>
          <p>This is a tertiary alert with tertiary colors.</p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ColorTest; 