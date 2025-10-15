
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Search',
      description: 'Find the perfect car for your journey from our wide selection of quality vehicles',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80',
      alt: 'Search for cars'
    },
    {
      id: 2,
      title: 'Book',
      description: 'Secure your reservation with our simple and fast booking process',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      alt: 'Book your car'
    },
    {
      id: 3,
      title: 'Drive',
      description: 'Pick up your vehicle and enjoy the freedom of exploring Ethiopia',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&q=80',
      alt: 'Drive away'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#001F3F] mb-6">
            How Sabi Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Getting on the road is easy with our simple three-step process
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
            >
              {/* Image */}
              <div className="h-64 overflow-hidden">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#FFC300] text-[#001F3F] rounded-full flex items-center justify-center font-bold text-lg mr-4 shadow-md">
                    {step.id}
                  </div>
                  <h3 className="text-2xl font-bold text-[#001F3F]">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <button className="bg-[#001F3F] hover:bg-[#003366] text-white font-bold py-4 px-12 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
