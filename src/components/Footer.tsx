
import React, { useState } from 'react';
import { Globe, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const [language, setLanguage] = useState('English');

  const toggleLanguage = () => {
    setLanguage(language === 'English' ? 'አማርኛ' : 'English');
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Sabi */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#001F3F] mb-4">About Sabi</h3>
            <p className="text-gray-600 leading-relaxed">
              Sabi is Ethiopia's premier car rental platform, connecting travelers with quality vehicles for unforgettable journeys across our beautiful country. Experience reliability, affordability, and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#001F3F] mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Cars', 'Blog', 'Contact', 'Terms of Service', 'Privacy Policy', 'Help Center'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-[#FFC300] hover:underline transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Language & Social */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#001F3F] mb-4">Language</h3>
              <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-gray-600 hover:text-[#FFC300] transition-colors bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg"
              >
                <Globe size={16} />
                <span className="text-sm">{language === 'English' ? '🇬🇧' : '🇪🇹'} {language}</span>
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#001F3F] mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Linkedin, label: 'LinkedIn' }
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="text-gray-400 hover:text-[#FFC300] transition-colors p-2 rounded-lg hover:bg-gray-50"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2025 Sabi Technologies — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
