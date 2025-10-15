
import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    privacyAgreed: false
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      privacyAgreed: false
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Company Address',
      value: 'Mahre Adder, Addis Ababa'
    },
    {
      icon: Phone,
      label: 'Phone Number',
      value: '+251 912 273 460'
    },
    {
      icon: Mail,
      label: 'Email Address',
      value: 'sable@gmail.com'
    },
    {
      icon: Mail,
      label: 'Support Email',
      value: 'sabi@gmail.com'
    }
  ];

  return (
    <div className="min-h-screen bg-[#001F3F]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Get in touch with our team. We're here to help you with your car rental needs.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form - Left Side */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#001F3F] mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full h-12 px-4 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-[#FFC300] focus:ring-0 text-base"
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full h-12 px-4 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-[#FFC300] focus:ring-0 text-base"
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full h-12 px-4 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-[#FFC300] focus:ring-0 text-base"
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-[#FFC300] focus:ring-0 text-base resize-none"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacyAgreed}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, privacyAgreed: checked as boolean }))
                    }
                    className="border-gray-300"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600 cursor-pointer">
                    I agree to the privacy policy and terms of service
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#FFC300] hover:bg-[#FFD700] text-[#001F3F] font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 hover:shadow-lg group"
                >
                  Send Message
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            {/* Contact Info - Right Side */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Get in Touch
                </h2>
                <p className="text-blue-200 text-lg leading-relaxed mb-8">
                  We're always happy to help. Reach out to us through any of the following channels, and we'll respond as quickly as possible.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#FFC300] rounded-full flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-[#001F3F]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-200 text-sm font-medium">
                        {item.label}
                      </p>
                      <p className="text-white text-lg font-semibold">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Hours */}
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <h3 className="text-xl font-bold text-white mb-4">
                  Office Hours
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-200">Monday - Friday</span>
                    <span className="text-white font-semibold">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Saturday</span>
                    <span className="text-white font-semibold">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Sunday</span>
                    <span className="text-white font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
