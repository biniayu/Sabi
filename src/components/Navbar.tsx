import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('English');

  const toggleLanguage = () => {
    setLanguage(language === 'English' ? 'አማርኛ' : 'English');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl font-bold text-[#001F3F]">Sabi</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-[#001F3F] hover:text-[#FFC300] px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-[#FFC300] px-3 py-2 text-sm font-medium transition-colors">
                About
              </Link>
              <Link to="/cars" className="text-gray-600 hover:text-[#FFC300] px-3 py-2 text-sm font-medium transition-colors">
                Cars
              </Link>
              <Link to="/blog" className="text-gray-600 hover:text-[#FFC300] px-3 py-2 text-sm font-medium transition-colors">
                Blog
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-[#FFC300] px-3 py-2 text-sm font-medium transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Desktop Right Side Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-600 hover:text-[#FFC300] transition-colors px-3 py-1 rounded-md"
            >
              <Globe size={16} />
              <span className="text-sm">{language === 'English' ? '🇬🇧' : '🇪🇹'} {language}</span>
            </button>
            <button className="text-[#001F3F] hover:text-[#FFC300] px-4 py-2 text-sm font-medium transition-colors">
              Sign In
            </button>
            <button className="bg-[#FFC300] hover:bg-[#FFD700] text-[#001F3F] px-4 py-2 rounded-lg text-sm font-bold transition-colors">
              List Your Car
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link to="/" className="text-[#001F3F] hover:text-[#FFC300] block px-3 py-2 text-base font-medium">
                Home
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-[#FFC300] block px-3 py-2 text-base font-medium">
                About
              </Link>
              <Link to="/cars" className="text-gray-600 hover:text-[#FFC300] block px-3 py-2 text-base font-medium">
                Cars
              </Link>
              <Link to="/blog" className="text-gray-600 hover:text-[#FFC300] block px-3 py-2 text-base font-medium">
                Blog
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-[#FFC300] block px-3 py-2 text-base font-medium">
                Contact Us
              </Link>
              <div className="flex flex-col space-y-2 px-3 py-2">
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center space-x-1 text-gray-600 hover:text-[#FFC300] self-start"
                >
                  <Globe size={16} />
                  <span className="text-sm">{language === 'English' ? '🇬🇧' : '🇪🇹'} {language}</span>
                </button>
                <div className="flex space-x-2">
                  <button className="text-[#001F3F] hover:text-[#FFC300] px-4 py-2 text-sm font-medium">
                    Sign In
                  </button>
                  <button className="bg-[#FFC300] hover:bg-[#FFD700] text-[#001F3F] px-4 py-2 rounded-lg text-sm font-bold">
                    List Your Car
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
