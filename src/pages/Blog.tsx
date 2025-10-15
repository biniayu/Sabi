
import React, { useState } from 'react';
import { Search, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Badge } from '../components/ui/badge';

const Blog = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('English');

  const toggleLanguage = () => {
    setLanguage(language === 'English' ? 'አማርኛ' : 'English');
  };

  const blogPosts = [
    {
      id: 1,
      title: 'Exploring the Simien Mountains: A Road Trip Guide',
      excerpt: 'Discover the breathtaking landscapes and unique wildlife of Ethiopia\'s UNESCO World Heritage site with your rental car.',
      category: 'Travel',
      author: 'Sarah Tadesse',
      date: 'Dec 15, 2024',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      readTime: '8 min read'
    },
    {
      id: 2,
      title: 'Best Car Rental Tips for First-Time Visitors to Ethiopia',
      excerpt: 'Everything you need to know about renting a car in Ethiopia, from required documents to local driving customs.',
      category: 'Tips',
      author: 'Michael Alemayehu',
      date: 'Dec 12, 2024',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop',
      readTime: '5 min read'
    },
    {
      id: 3,
      title: 'Lake Tana Circuit: The Perfect Weekend Getaway',
      excerpt: 'Experience the largest lake in Ethiopia and its historic monasteries on this scenic 3-day road trip.',
      category: 'Travel',
      author: 'Hanan Bekele',
      date: 'Dec 10, 2024',
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop',
      readTime: '12 min read'
    },
    {
      id: 4,
      title: 'Ethiopian Coffee Route: A Cultural Journey by Car',
      excerpt: 'Follow the birthplace of coffee through rural Ethiopia and discover authentic coffee ceremonies.',
      category: 'Culture',
      author: 'Dawit Mekonnen',
      date: 'Dec 8, 2024',
      image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&h=600&fit=crop',
      readTime: '10 min read'
    },
    {
      id: 5,
      title: 'Starting Your Car Rental Business in Ethiopia',
      excerpt: 'Learn about the growing opportunities in Ethiopia\'s car rental market and how to get started.',
      category: 'Business',
      author: 'Almaz Girma',
      date: 'Dec 5, 2024',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
      readTime: '15 min read'
    },
    {
      id: 6,
      title: 'Community Stories: How Sabi Changed Our Adventures',
      excerpt: 'Real stories from our customers about unforgettable journeys and experiences across Ethiopia.',
      category: 'Community',
      author: 'Sabi Team',
      date: 'Dec 3, 2024',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop',
      readTime: '6 min read'
    }
  ];

  const categories = ['All', 'Travel', 'Tips', 'Culture', 'Business', 'Community'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesFilter = selectedFilter === 'All' || post.category === selectedFilter;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      Travel: 'bg-blue-100 text-blue-800',
      Tips: 'bg-green-100 text-green-800',
      Culture: 'bg-purple-100 text-purple-800',
      Business: 'bg-orange-100 text-orange-800',
      Community: 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Banner */}
      <div 
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 31, 63, 0.6), rgba(0, 31, 63, 0.4)), url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=800&fit=crop")'
        }}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Road Stories from Sabi</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Tips, destinations, and travel journals from Ethiopia and beyond.
          </p>
        </div>
        
        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          className="absolute top-6 right-6 flex items-center space-x-2 text-white hover:text-[#FFC300] transition-colors bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm"
        >
          <Globe size={20} />
          <span>{language === 'English' ? '🇬🇧' : '🇪🇹'} {language}</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 text-lg border-gray-200 focus:border-[#FFC300] focus:ring-[#FFC300]"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-32">
                  {selectedFilter} ▼
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedFilter(category)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className={`absolute top-4 left-4 ${getCategoryColor(post.category)}`}>
                  {post.category}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#001F3F] mb-3 group-hover:text-[#FFC300] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{post.date}</span>
                  <button className="text-[#FFC300] hover:text-[#FFD700] font-medium transition-colors">
                    Read More →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-400 mb-4">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-[#001F3F] rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Sabi Stories</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get the latest travel tips, destination guides, and road stories delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white text-gray-900"
            />
            <Button className="bg-[#FFC300] hover:bg-[#FFD700] text-[#001F3F] font-bold px-8">
              Subscribe
            </Button>
          </div>
          
          <div className="mt-6">
            <button 
              onClick={toggleLanguage}
              className="text-[#FFC300] hover:text-[#FFD700] transition-colors"
            >
              Read in {language === 'English' ? 'አማርኛ' : 'English'}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
