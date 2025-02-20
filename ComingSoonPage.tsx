import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function ComingSoonPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-600 mb-8 italic">
          Manas is busy writing content & copy lines for Posts/Reels
        </p>
        <div className="w-24 h-24 border-4 border-[#d2b48c] border-t-transparent rounded-full animate-spin mb-8"></div>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-[#d2b48c] text-white rounded-full font-medium hover:bg-[#9c8b75] transition-colors duration-300 animate-pulse"
        >
          Back to Project Selection
        </button>
      </main>
    </Layout>
  );
}

export default ComingSoonPage;
