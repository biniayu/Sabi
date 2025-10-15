
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Car, Shield, Users, Calendar, MapPin, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-sabi-navy">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-sabi-navy mb-4">
                About Sabi
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Revolutionizing car rentals in Ethiopia with modern technology, trust, and exceptional service.
              </p>
            </div>

            {/* Who We Are Section */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <Car className="w-8 h-8 text-sabi-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-sabi-navy mb-4">Who We Are</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Sabi is Ethiopia's premier car rental platform, connecting travelers with quality vehicles for unforgettable journeys across our beautiful country. We bridge the gap between traditional car rental services and modern digital convenience, making it easier than ever to explore Ethiopia on your own terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Vision Section */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <Shield className="w-8 h-8 text-sabi-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-sabi-navy mb-4">Our Vision</h2>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed text-lg mb-4">
                      We envision a future where every Ethiopian and visitor can access reliable, affordable transportation with complete peace of mind. Our platform prioritizes safety, trust, and transparency in every interaction.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="text-center">
                        <Shield className="w-6 h-6 text-sabi-gold mx-auto mb-2" />
                        <h3 className="font-semibold text-sabi-navy">Safety First</h3>
                        <p className="text-sm text-gray-600">Verified vehicles and drivers</p>
                      </div>
                      <div className="text-center">
                        <Users className="w-6 h-6 text-sabi-gold mx-auto mb-2" />
                        <h3 className="font-semibold text-sabi-navy">Trust</h3>
                        <p className="text-sm text-gray-600">Transparent pricing and reviews</p>
                      </div>
                      <div className="text-center">
                        <Car className="w-6 h-6 text-sabi-gold mx-auto mb-2" />
                        <h3 className="font-semibold text-sabi-navy">Quality</h3>
                        <p className="text-sm text-gray-600">Well-maintained vehicles</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Story Section */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <Calendar className="w-8 h-8 text-sabi-gold" />
                </div>
                <div className="w-full">
                  <h2 className="text-2xl font-bold text-sabi-navy mb-6">Our Story</h2>
                  
                  {/* Timeline */}
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-sabi-gold rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-sabi-navy" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sabi-navy mb-2">2024 - Founded</h3>
                        <p className="text-gray-700">Sabi was born from a vision to modernize Ethiopia's transportation industry, making car rentals accessible to everyone.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-sabi-gold rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-sabi-navy" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sabi-navy mb-2">2024 - Addis Ababa Launch</h3>
                        <p className="text-gray-700">We started our journey in Ethiopia's capital, partnering with trusted local car owners and rental businesses.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-sabi-gold rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-sabi-navy" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sabi-navy mb-2">Growing Community</h3>
                        <p className="text-gray-700">Today, we're proud to serve thousands of customers while supporting local car owners and building a trusted community.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-sabi-gold rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-sabi-navy" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sabi-navy mb-2">Future Expansion</h3>
                        <p className="text-gray-700">We're expanding across Ethiopia, bringing convenient car rental services to more cities and communities.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-sabi-navy mb-4">Ready to Start Your Journey?</h3>
              <p className="text-gray-600 mb-6">Join thousands of satisfied customers who trust Sabi for their travel needs.</p>
              <button className="bg-sabi-gold hover:bg-sabi-gold-light text-sabi-navy px-8 py-3 rounded-lg font-bold transition-colors">
                Browse Cars
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
