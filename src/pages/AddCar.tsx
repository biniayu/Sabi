import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  Plus, 
  Calendar,
  User,
  Settings,
  LogOut,
  Upload,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AddCar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    dailyPrice: '',
    category: '',
    transmission: '',
    fuelType: '',
    seatingCapacity: '',
    location: '',
    description: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview('');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the car data
    console.log('Car data:', { ...formData, image: selectedImage });
    alert('Car added successfully!');
    navigate('/manage-cars');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">CarRental</h1>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                Welcome, {currentUser?.name || 'User'}
              </p>
              <p className="text-sm text-gray-500">{currentUser?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => handleNavigation('/dashboard')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => handleNavigation('/add-car')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Add Car</span>
            </button>
            <button
              onClick={() => handleNavigation('/manage-cars')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
            >
              <Car className="w-5 h-5" />
              <span>Manage Cars</span>
            </button>
            <button
              onClick={() => handleNavigation('/manage-bookings')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
            >
              <Calendar className="w-5 h-5" />
              <span>Manage Bookings</span>
            </button>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Add New Car</h1>
              <p className="text-gray-600 mt-1">
                Fill in details to list a new car for booking, including pricing, availability, and car specifications.
              </p>
            </div>
          </div>
        </header>

        {/* Form Content */}
        <div className="flex-1 overflow-auto p-8">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <Label htmlFor="image-upload" className="text-sm font-medium text-gray-700">
                    Upload a picture of your car
                  </Label>
                  <div className="mt-2">
                    {imagePreview ? (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Car preview" 
                          className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4">
                          <Label htmlFor="image-upload" className="cursor-pointer">
                            <span className="text-blue-600 hover:text-blue-500 font-medium">
                              Click to upload
                            </span>
                            <span className="text-gray-500"> or drag and drop</span>
                          </Label>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="brand" className="text-sm font-medium text-gray-700">
                      Brand
                    </Label>
                    <Input
                      id="brand"
                      placeholder="e.g. BMW, Mercedes, Audi..."
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="model" className="text-sm font-medium text-gray-700">
                      Model
                    </Label>
                    <Input
                      id="model"
                      placeholder="e.g. X-5, Class, M4..."
                      value={formData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="year" className="text-sm font-medium text-gray-700">
                      Year
                    </Label>
                    <Input
                      id="year"
                      type="number"
                      placeholder="0"
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dailyPrice" className="text-sm font-medium text-gray-700">
                      Daily Price ($)
                    </Label>
                    <Input
                      id="dailyPrice"
                      type="number"
                      placeholder="0"
                      value={formData.dailyPrice}
                      onChange={(e) => handleInputChange('dailyPrice', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                      Category
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="hatchback">Hatchback</SelectItem>
                        <SelectItem value="convertible">Convertible</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="transmission" className="text-sm font-medium text-gray-700">
                      Transmission
                    </Label>
                    <Select value={formData.transmission} onValueChange={(value) => handleInputChange('transmission', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="fuelType" className="text-sm font-medium text-gray-700">
                      Fuel Type
                    </Label>
                    <Select value={formData.fuelType} onValueChange={(value) => handleInputChange('fuelType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="seatingCapacity" className="text-sm font-medium text-gray-700">
                      Seating Capacity
                    </Label>
                    <Input
                      id="seatingCapacity"
                      type="number"
                      placeholder="0"
                      value={formData.seatingCapacity}
                      onChange={(e) => handleInputChange('seatingCapacity', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                      Location
                    </Label>
                    <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="addis-ababa">Addis Ababa</SelectItem>
                        <SelectItem value="bahir-dar">Bahir Dar</SelectItem>
                        <SelectItem value="gondar">Gondar</SelectItem>
                        <SelectItem value="hawassa">Hawassa</SelectItem>
                        <SelectItem value="mekelle">Mekelle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/manage-cars')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Add Car
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddCar; 