import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import SignupForm from '../components/SignupForm';

const Login = () => {
  const navigate = useNavigate();
  const { login, register, users } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [loginMessage, setLoginMessage] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginMessage('');
    
    if (!loginForm.email || !loginForm.password) {
      setLoginMessage('Please enter both email and password.');
      return;
    }
    
    if (!validateEmail(loginForm.email)) {
      setLoginMessage('Please enter a valid email.');
      return;
    }

    // Check if user exists first
    const userExists = users.find(u => u.email === loginForm.email);
    if (!userExists) {
      setLoginMessage('No account found, please sign up.');
      return;
    }

    // Try to login using AuthContext
    const success = login(loginForm.email, loginForm.password);
    
    if (success) {
      navigate('/');
    } else {
      setLoginMessage('Incorrect password.');
    }
  };

  const handleInputChange = (form: 'login', field: string, value: string) => {
    if (form === 'login') {
      setLoginForm(prev => ({ ...prev, [field]: value }));
      setLoginMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Card className="w-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-xl font-semibold text-[#001F3F]">
                User Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    {loginMessage && (
                      <Alert variant="destructive">
                        <AlertDescription>{loginMessage}</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <label htmlFor="login-email" className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          value={loginForm.email}
                          onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="login-password" className="text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={loginForm.password}
                          onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                          className="pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-[#FFC300] hover:bg-[#FFD700] text-[#001F3F] font-bold">
                      Login
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="signup" className="space-y-4">
                  <div className="p-4">
                    <SignupForm />
                    </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login; 