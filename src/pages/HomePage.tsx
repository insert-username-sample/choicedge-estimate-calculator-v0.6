import React, { useState } from 'react';
import { Building2, Factory, Home, Hotel } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';

function HomePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [projectName, setProjectName] = useState('');
  const navigate = useNavigate();

  const projectTypes = [
    { id: 'residential', label: 'Residential', icon: Home },
    { id: 'commercial', label: 'Commercial', icon: Building2 },
    { id: 'hospitality', label: 'Hospitality', icon: Hotel },
    { id: 'industrial', label: 'Industrial', icon: Factory },
  ];

  const handleNext = () => {
    if (selectedType && clientName.trim() !== '') {
      navigate('/category-selection', {
        state: {
          projectType: selectedType,
          clientName: clientName.trim(),
          projectName: projectName.trim(),
        },
      });
    } else if (!clientName.trim()) {
      alert('Client name is required!');
    }
  };

  return (
    <Layout>
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
        <div className="text-center mb-4">
          <div className="mb-4">
            <h1
              className="text-5xl md:text-6xl font-bold tracking-wider text-gray-800 mb-2"
              style={{ letterSpacing: '0.15em' }}
            >
              CHOICEDGE
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 font-light">
              Estimate Calculator <Link to="/version-info" className="version hover:text-[#d2b48c] transition-colors">v0.6.0</Link>
            </h2>
          </div>
          <p className="text-sm text-gray-500 text-right">by <Link to="/about-dev" className="hover:text-[#d2b48c] transition-colors">Manas Khobrekar</Link></p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">
            Project Details
          </h2>

          <div className="max-w-md mx-auto space-y-4 mb-8">
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Client / Lead Name (Required)"
              required
            />
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Project Name (Optional)"
            />
          </div>

          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">
            Select Project Type
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {projectTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`
                    p-6 rounded-xl transition-all duration-300 flex items-center space-x-4
                    ${
                      selectedType === type.id
                        ? 'bg-[#d2b48c] text-white shadow-lg scale-105'
                        : 'bg-white hover:bg-[#d2b48c]/10 text-gray-700 hover:scale-102 shadow-md'
                    }
                  `}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-lg font-medium">{type.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleNext}
              disabled={!selectedType || clientName.trim() === ''}
              className={`
                px-8 py-3 rounded-full text-white font-medium transition-all duration-300
                ${
                  selectedType && clientName.trim() !== ''
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:scale-105'
                    : 'bg-gray-300 cursor-not-allowed'
                }
              `}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default HomePage;
