import React, { useState } from 'react';
    import { useLocation, useNavigate } from 'react-router-dom';
    import { ArrowLeft, Home, Diamond, Crown } from 'lucide-react';
    import Layout from '../components/Layout';

    interface LocationState {
      projectType: string;
      clientName: string;
      projectName: string;
    }

    function CategorySelectionPage() {
      const location = useLocation();
      const navigate = useNavigate();
      const { projectType, clientName, projectName } = location.state as LocationState;
      const [selectedCategory, setSelectedCategory] = useState<string>('');

      const categories = [
        {
          id: 'standard',
          name: 'Standard',
          icon: Home,
          description: 'Quality essentials with budget-friendly finishes',
          features: ['Basic finishes', 'Standard materials', 'Essential amenities']
        },
        {
          id: 'premium',
          name: 'Premium',
          icon: Diamond,
          description: 'Enhanced quality with modern style',
          features: ['Premium finishes', 'Quality materials', 'Modern amenities']
        },
        {
          id: 'luxury',
          name: 'Luxury',
          icon: Crown,
          description: 'Exclusive finishes with premium materials',
          features: ['Luxury finishes', 'Premium materials', 'High-end amenities']
        }
      ];

      const handleNext = () => {
        if (selectedCategory) {
          navigate('/project-details', {
            state: {
              projectType,
              category: selectedCategory,
              clientName,
              projectName
            }
          });
        }
      };

      return (
        <Layout>
          {/* Header */}
          <header className="p-6 flex justify-between items-center">
            <button 
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-[#9c8b75] transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </header>

          {/* Main Content */}
          <main className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Choose Your Style and Finish
              </h1>
              <p className="text-gray-600">
                Select a category to determine the level of materials and finishes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`
                      relative p-6 rounded-xl transition-all duration-300 text-left
                      ${
                        selectedCategory === category.id
                          ? 'bg-[#d2b48c] text-white shadow-lg scale-105'
                          : 'bg-white hover:bg-[#d2b48c]/10 text-gray-700 hover:scale-102 shadow-md'
                      }
                    `}
                  >
                    <div className="flex flex-col items-center mb-4">
                      <Icon className={`w-12 h-12 ${selectedCategory === category.id ? 'text-white' : 'text-[#9c8b75]'}`} />
                      <h3 className="text-xl font-semibold mt-2 no-underline">{category.name}</h3>
                    </div>
                    <p className="text-sm mb-4 text-center">
                      {category.description}
                    </p>
                    <ul className="space-y-2">
                      {category.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>

            <div className="text-center">
              <button
                onClick={handleNext}
                disabled={!selectedCategory}
                className={`
                  px-8 py-3 rounded-full text-white font-medium transition-all duration-300
                  ${
                    selectedCategory
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:scale-105'
                      : 'bg-gray-300 cursor-not-allowed'
                  }
                `}
              >
                Next
              </button>
            </div>
          </main>
        </Layout>
      );
    }

    export default CategorySelectionPage;
