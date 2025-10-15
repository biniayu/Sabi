
import React, { useState } from 'react';
import { MapPin, Calendar, User, Search } from 'lucide-react';

const HeroSection = () => {
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [withDriver, setWithDriver] = useState(false);

  const handleSearch = () => {
    console.log('Search:', { location, dateRange, withDriver });
  };

  return (
    <div className="bg-[#001F3F] min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Your Journey Starts with{' '}
          <span className="text-[#FFC300]">Sabi</span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Experience Ethiopia with our premium car rental service. Quality vehicles, competitive prices, exceptional service.
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            {/* Location Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFC300] focus:border-transparent outline-none text-gray-700 bg-gray-50 hover:bg-white transition-colors"
                >
                  <option value="">Select location</option>
                  <option value="addis-ababa">Addis Ababa</option>
                  <option value="dire-dawa">Dire Dawa</option>
                  <option value="mekelle">Mekelle</option>
                  <option value="gondar">Gondar</option>
                  <option value="hawassa">Hawassa</option>
                  <option value="bahir-dar">Bahir Dar</option>
                  <option value="jimma">Jimma</option>
                </select>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Date Range</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFC300] focus:border-transparent outline-none text-gray-700 bg-gray-50 hover:bg-white transition-colors"
                />
              </div>
            </div>

            {/* With Driver Toggle */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Driver Option</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <button
                  onClick={() => setWithDriver(!withDriver)}
                  className={`w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFC300] focus:border-transparent outline-none text-left transition-colors ${
                    withDriver 
                      ? 'bg-[#FFC300] text-[#001F3F] border-[#FFC300]' 
                      : 'text-gray-700 bg-gray-50 hover:bg-white'
                  }`}
                >
                  {withDriver ? 'With Driver' : 'Self Drive'}
                </button>
              </div>
            </div>

            {/* Search Button */}
            <div>
              <button
                onClick={handleSearch}
                className="w-full bg-[#FFC300] hover:bg-[#FFD700] text-[#001F3F] font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Search size={24} />
                <span className="text-lg">Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
