import React from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';

function UserProfilePage() {
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
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">User Profile</h1>
          <User className="w-16 h-16 mx-auto mb-4 text-gray-700" />
          <p className="text-xl text-gray-600 mb-4 italic">
            Login & Registration using choicedge.com email coming soon!
          </p>
          <p className="text-gray-500">
            Manage your profile settings and preferences here.
          </p>
          <p className="text-gray-500">
            Check back soon!
          </p>
        </div>
      </main>
    </Layout>
  );
}

export default UserProfilePage;
