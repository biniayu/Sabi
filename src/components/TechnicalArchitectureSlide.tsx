
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Database, Server, Globe, Shield, Upload, CreditCard, Languages } from 'lucide-react';

const TechnicalArchitectureSlide = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#001F3F] mb-2">Technical Architecture</h1>
        <p className="text-lg text-gray-600">How Sabi Works Under the Hood</p>
        <div className="w-24 h-1 bg-[#FFC300] mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* System Flow Diagram */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#001F3F] mb-4">System Flow</h2>
          
          {/* User Layer */}
          <Card className="border-2 border-[#FFC300]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8 text-[#FFC300]" />
                <div>
                  <h3 className="font-semibold text-[#001F3F]">User Interface</h3>
                  <p className="text-sm text-gray-600">Web browsers, mobile responsive</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <ArrowRight className="w-6 h-6 text-[#001F3F] mx-auto" />

          {/* Frontend Layer */}
          <Card className="border-2 border-green-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FE</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#001F3F]">Frontend (Current)</h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Live on Vercel</Badge>
                </div>
              </div>
              <div className="text-xs space-y-1">
                <div>• React 18 + TypeScript</div>
                <div>• Tailwind CSS + Radix UI</div>
                <div>• React Router v6</div>
                <div>• React Query + Local State</div>
              </div>
            </CardContent>
          </Card>

          <ArrowRight className="w-6 h-6 text-[#001F3F] mx-auto" />

          {/* Backend Layer */}
          <Card className="border-2 border-orange-500 border-dashed">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Server className="w-8 h-8 text-orange-500" />
                <div>
                  <h3 className="font-semibold text-[#001F3F]">Backend API (Planned)</h3>
                  <Badge variant="outline" className="border-orange-500 text-orange-700">In Development</Badge>
                </div>
              </div>
              <div className="text-xs space-y-1">
                <div>• Node.js + Express</div>
                <div>• JWT + bcrypt Authentication</div>
                <div>• RESTful Endpoints</div>
                <div>• Role-based Access Control</div>
              </div>
            </CardContent>
          </Card>

          <ArrowRight className="w-6 h-6 text-[#001F3F] mx-auto" />

          {/* Database Layer */}
          <Card className="border-2 border-blue-500 border-dashed">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-8 h-8 text-blue-500" />
                <div>
                  <h3 className="font-semibold text-[#001F3F]">MySQL Database</h3>
                  <Badge variant="outline" className="border-blue-500 text-blue-700">Schema Designed</Badge>
                </div>
              </div>
              <div className="text-xs space-y-1">
                <div>• Users, Cars, Bookings tables</div>
                <div>• Normalized schema design</div>
                <div>• AWS RDS or XAMPP local</div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Services */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Card className="border border-gray-300 border-dashed">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-gray-500" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#001F3F]">File Storage</h4>
                    <p className="text-xs text-gray-600">Images & Documents</p>
                    <Badge variant="outline" className="text-xs mt-1">Future</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-300 border-dashed">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#001F3F]">Payment Gateway</h4>
                    <p className="text-xs text-gray-600">Secure Transactions</p>
                    <Badge variant="outline" className="text-xs mt-1">Future</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technical Details */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#001F3F] mb-4">Technical Specifications</h2>
          
          {/* Current Implementation */}
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#001F3F] mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Current Implementation
              </h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#FFC300]">•</span>
                  <span><strong>Frontend:</strong> Built with React 18 + TypeScript for type safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFC300]">•</span>
                  <span><strong>UI:</strong> Radix UI + Tailwind CSS for responsive, accessible design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFC300]">•</span>
                  <span><strong>Routing:</strong> React Router v6 with protected routes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFC300]">•</span>
                  <span><strong>State:</strong> React Query for server state + local state management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFC300]">•</span>
                  <span><strong>Responsive:</strong> Mobile-first design with breakpoint optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFC300]">•</span>
                  <span><strong>Language:</strong> 
                    <Languages className="w-4 h-4 inline mx-1" />
                    Components support Amharic/English switching
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Planned Backend */}
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#001F3F] mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                Planned Backend Architecture
              </h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#FFC300]">•</span>
                  <span><strong>API Server:</strong> Node.js + Express with CORS enabled</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFC300]">•</span>
                  <span><strong>Authentication:</strong> 
                    <Shield className="w-4 h-4 inline mx-1" />
                    JWT tokens + bcrypt password hashing
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFC300]">•</span>
                  <span><strong>Database:</strong> MySQL with normalized schema (3 main tables)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFC300]">•</span>
                  <span><strong>File Upload:</strong> Images & ID documents to cloud storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFC300]">•</span>
                  <span><strong>Security:</strong> Input validation, rate limiting, SQL injection protection</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Performance & Deployment */}
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#001F3F] mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Performance & Deployment
              </h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#FFC300]">•</span>
                  <span><strong>Frontend:</strong> Deployed on Vercel with automatic deployments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFC300]">•</span>
                  <span><strong>API:</strong> Planned deployment on AWS/Railway with auto-scaling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFC300]">•</span>
                  <span><strong>Database:</strong> AWS RDS for production, XAMPP for local dev</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFC300]">•</span>
                  <span><strong>Optimization:</strong> Code splitting, image compression, lazy loading</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Current Data Flow */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#001F3F] mb-3">Current Data Flow</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Currently using static JSON data and mock APIs to simulate backend responses. 
                User interactions trigger state updates through React Query, 
                with data persistence handled via localStorage for demo purposes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Built with modern web technologies • Designed for scalability and performance
        </p>
      </div>
    </div>
  );
};

export default TechnicalArchitectureSlide;
