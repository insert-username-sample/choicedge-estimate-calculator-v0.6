import React from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Laptop } from 'lucide-react';

function AboutDevPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <header className="p-6 flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-[#9c8b75] transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <Laptop className="w-16 h-16 mx-auto mb-4 text-gray-700" />
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            <a 
              href="https://www.linkedin.com/in/manas-khobrekar/" 
              className="hover:text-[#d2b48c] transition-colors"
            >
              Manas Khobrekar
            </a>
          </h1>
          <p className="text-gray-600">Content & Copy Writer</p>
          <p className="text-gray-600">Tech Enthusiast (VR/AR/XR, AI, Robotics etc.)</p>
          <a href="https://www.linkedin.com/in/manas-khobrekar/" className="text-blue-500 hover:text-blue-700">
            LinkedIn Profile
          </a>
        </div>
      </main>
    </Layout>
  );
}

export default AboutDevPage;
