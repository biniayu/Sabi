
import React, { useState } from 'react';
import { Star, Filter, User, ShoppingCart, Edit, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Cars = () => {
  const [showFilters, setShowFilters] = useState(false);

  const carData = [
    {
      id: 1,
      brand: "Toyota Corolla",
      year: "2023",
      image: "/placeholder.svg",
      rating: 4.9,
      price: 810,
      tag: "Popular"
    },
    {
      id: 2,
      brand: "Honda Civic",
      year: "2024",
      image: "/placeholder.svg",
      rating: 4.8,
      price: 920,
      tag: "New"
    },
    {
      id: 3,
      brand: "Nissan Sentra",
      year: "2023",
      image: "/placeholder.svg",
      rating: 4.7,
      price: 750,
      tag: "Eco"
    },
    {
      id: 4,
      brand: "Hyundai Elantra",
      year: "2024",
      image: "/placeholder.svg",
      rating: 4.9,
      price: 850,
      tag: "Featured"
    }
  ];

  const luxuryCars = [
    {
      id: 5,
      brand: "BMW 3 Series",
      year: "2024",
      image: "/placeholder.svg",
      rating: 4.9,
      price: 1500,
      tag: "Premium"
    },
    {
      id: 6,
      brand: "Mercedes C-Class",
      year: "2023",
      image: "/placeholder.svg",
      rating: 4.8,
      price: 1650,
      tag: "Luxury"
    }
  ];

  const CarCard = ({ car }: { car: any }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.year}`}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-white/90 text-sabi-navy hover:bg-white">
          <Edit size={12} className="mr-1" />
          {car.tag}
        </Badge>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-sabi-navy mb-2">
          {car.brand} {car.year}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={`${i < Math.floor(car.rating) ? 'text-sabi-gold fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="ml-2 font-bold text-sm text-sabi-navy">{car.rating}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-sabi-gold">${car.price}</span>
            <span className="text-gray-600 ml-1">per day</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button className="bg-sabi-gold hover:bg-sabi-gold-light text-sabi-navy font-bold px-6">
              View
            </Button>
            <button className="flex items-center text-sabi-navy hover:text-sabi-gold transition-colors">
              <span className="text-sm mr-1">View</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <header className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-sabi-navy text-center flex-1">Cars</h1>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-sabi-navy hover:text-sabi-gold transition-colors"
              >
                <Filter size={20} />
                <span className="font-medium">Filter</span>
              </button>
              <User size={20} className="text-gray-600 hover:text-sabi-gold cursor-pointer transition-colors" />
              <ShoppingCart size={20} className="text-gray-600 hover:text-sabi-gold cursor-pointer transition-colors" />
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Filter Tags</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-sabi-gold/10">Automatic</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-sabi-gold/10">Manual</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-sabi-gold/10">4 Seats</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-sabi-gold/10">5+ Seats</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-sabi-gold/10">GPS</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-sabi-gold/10">AC</Badge>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Popular in Addis Ababa Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-sabi-navy mb-6">Popular in Addis Ababa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {carData.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>

        {/* With Driver Available Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-sabi-navy mb-6">With Driver Available</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {carData.slice(0, 3).map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>

        {/* Affordable Picks Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-sabi-navy mb-6">Affordable Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {carData.slice(1, 4).map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>

        {/* Luxury Rides Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-sabi-navy mb-6">Luxury Rides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {luxuryCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>
      </main>

      {/* Trust Section */}
      <section className="bg-sabi-navy rounded-t-3xl mt-16 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Loved by 10,000+ travelers in Ethiopia
          </h2>
          <p className="text-xl text-gray-300">
            Join thousands of satisfied customers who trust Sabi for their travel needs
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cars;
