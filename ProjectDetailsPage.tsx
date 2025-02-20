import React, { useState } from 'react';
    import { useLocation, useNavigate } from 'react-router-dom';
    import { ArrowLeft, Plus, Minus } from 'lucide-react';
    import Layout from '../components/Layout';

    type LayoutRoom = {
      id: string;
      name: string;
    };

    type Layouts = {
      [key: string]: LayoutRoom[];
    };

    const LAYOUTS: Layouts = {
      '1rk': [
        { id: 'livingRoom', name: 'Living Room' },
        { id: 'kitchen', name: 'Kitchen' }
      ],
      '1bhk': [
        { id: 'livingRoom', name: 'Living Room' },
        { id: 'bedroom', name: 'Bedroom' },
        { id: 'kitchen', name: 'Kitchen' }
      ],
      '2bhk': [
        { id: 'livingRoom', name: 'Living Room' },
        { id: 'bedroom1', name: 'Bedroom 1' },
        { id: 'bedroom2', name: 'Bedroom 2' },
        { id: 'kitchen', name: 'Kitchen' }
      ],
      '3bhk': [
        { id: 'livingRoom', name: 'Living Room' },
        { id: 'bedroom1', name: 'Bedroom 1' },
        { id: 'bedroom2', name: 'Bedroom 2' },
        { id: 'bedroom3', name: 'Bedroom 3' },
        { id: 'kitchen', name: 'Kitchen' }
      ],
      '4bhk': [
        { id: 'livingRoom', name: 'Living Room' },
        { id: 'bedroom1', name: 'Bedroom 1' },
        { id: 'bedroom2', name: 'Bedroom 2' },
        { id: 'bedroom3', name: 'Bedroom 3' },
        { id: 'bedroom4', name: 'Bedroom 4' },
        { id: 'kitchen', name: 'Kitchen' }
      ],
      '5bhk': [
        { id: 'livingRoom', name: 'Living Room' },
        { id: 'bedroom1', name: 'Bedroom 1' },
        { id: 'bedroom2', name: 'Bedroom 2' },
        { id: 'bedroom3', name: 'Bedroom 3' },
        { id: 'bedroom4', name: 'Bedroom 4' },
        { id: 'bedroom5', name: 'Bedroom 5' },
        { id: 'kitchen', name: 'Kitchen' }
      ],
      'villa': [
        { id: 'livingRoom', name: 'Living Room' },
        { id: 'diningRoom', name: 'Dining Room' },
        { id: 'kitchen', name: 'Kitchen' },
        { id: 'masterBedroom', name: 'Master Bedroom' },
        { id: 'bedroom1', name: 'Bedroom 1' },
        { id: 'bedroom2', name: 'Bedroom 2' },
        { id: 'studyRoom', name: 'Study Room' },
        { id: 'poojaRoom', name: 'Pooja Room' }
      ]
    };

    type ProjectOption = {
      id: string;
      label: string;
      description: string;
    };

    type RoomCounts = {
      livingRoom: number;
      masterBedroom: number;
      bedroom: number;
      kitchen: number;
      bathroom: number;
      diningRoom: number;
      studyRoom: number;
      balcony: number;
      storeRoom: number;
      servantRoom: number;
      poojaRoom: number;
    };

    function ProjectDetailsPage() {
      const location = useLocation();
      const navigate = useNavigate();
      const [selectedOption, setSelectedOption] = useState<string | null>(null);
      const [isCustom, setIsCustom] = useState(false);
      const [rooms, setRooms] = useState<RoomCounts>({
        livingRoom: 0,
        masterBedroom: 0,
        bedroom: 0,
        kitchen: 0,
        bathroom: 0,
        diningRoom: 0,
        studyRoom: 0,
        balcony: 0,
        storeRoom: 0,
        servantRoom: 0,
        poojaRoom: 0
      });
      
      const projectType = location.state?.projectType || 'residential';
      const clientName = location.state?.clientName || '';
      const projectName = location.state?.projectName || '';
      const category = location.state?.category || 'standard';

      const projectOptions: Record<string, ProjectOption[]> = {
        residential: [
          { id: '1rk', label: '1 RK', description: 'Single room with kitchen' },
          { id: '1bhk', label: '1 BHK', description: '1 bedroom, hall, and kitchen' },
          { id: '2bhk', label: '2 BHK', description: '2 bedrooms, hall, and kitchen' },
          { id: '3bhk', label: '3 BHK', description: '3 bedrooms, hall, and kitchen' },
          { id: '4bhk', label: '4 BHK', description: '4 bedrooms, hall, and kitchen' },
          { id: '5bhk', label: '5 BHK', description: '5 bedrooms, hall, and kitchen' },
          { id: 'villa', label: 'Villa', description: 'Independent house with multiple floors' },
          { id: 'custom', label: 'Custom', description: 'Create your own layout' }
        ],
        commercial: [
          { id: 'office', label: 'Office Space', description: 'Corporate offices and workspaces' },
          { id: 'retail', label: 'Retail Store', description: 'Shops and showrooms' },
          { id: 'restaurant', label: 'Restaurant', description: 'Food service establishments' },
          { id: 'warehouse', label: 'Warehouse', description: 'Storage and distribution facilities' }
        ],
        hospitality: [
          { id: 'hotel', label: 'Hotel', description: 'Accommodation facilities' },
          { id: 'resort', label: 'Resort', description: 'Leisure and vacation properties' },
          { id: 'motel', label: 'Motel', description: 'Roadside accommodation' }
        ],
        industrial: [
          { id: 'factory', label: 'Factory', description: 'Manufacturing facilities' },
          { id: 'workshop', label: 'Workshop', description: 'Small-scale production units' },
          { id: 'plant', label: 'Processing Plant', description: 'Industrial processing facilities' }
        ]
      };

      const handleOptionSelect = (optionId: string) => {
        if (optionId === 'custom') {
          setIsCustom(true);
          setSelectedOption(optionId);
        } else {
          setIsCustom(false);
          setSelectedOption(optionId);
        }
      };

      const handleRoomIncrement = (room: keyof RoomCounts) => {
        setRooms(prev => ({
          ...prev,
          [room]: prev[room] + 1
        }));
      };

      const handleRoomDecrement = (room: keyof RoomCounts) => {
        setRooms(prev => ({
          ...prev,
          [room]: Math.max(0, prev[room] - 1)
        }));
      };

      const formatRoomName = (name: string): string => {
        return name.replace(/([A-Z])/g, ' $1').trim();
      };

      const getTotalRooms = (): number => {
        return Object.values(rooms).reduce((sum, count) => sum + count, 0);
      };

      const handleNext = () => {
        if (projectType === 'residential') {
          if (isCustom) {
            const selectedRooms = Object.entries(rooms)
              .filter(([_, count]) => count > 0)
              .flatMap(([roomId, count]) => {
                const roomName = formatRoomName(roomId);
                return Array(count).fill({ id: roomId, name: roomName });
              });

            navigate('/residential-layout', { 
              state: { 
                rooms: selectedRooms,
                isCustom: true,
                category,
                clientName,
                projectName
              } 
            });
          } else if (selectedOption) {
            const layoutRooms = LAYOUTS[selectedOption];
            if (layoutRooms) {
              navigate('/residential-layout', { 
                state: { 
                  layoutType: selectedOption,
                  rooms: layoutRooms,
                  isCustom: false,
                  category,
                  clientName,
                  projectName
                }
              });
            }
          }
        } else {
          navigate('/coming-soon');
        }
      };

      const options = projectOptions[projectType] || [];
      const projectTypeLabel = projectType.charAt(0).toUpperCase() + projectType.slice(1);

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
                Select {projectTypeLabel} Type
              </h1>
              <p className="text-gray-600">Choose the specific type for your {projectType} project</p>
            </div>

            {projectType === 'residential' ? (
              <div className="space-y-8">
                {/* Predefined Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className={`
                        p-6 rounded-xl transition-all duration-300
                        ${
                          selectedOption === option.id
                            ? 'bg-[#d2b48c] text-white shadow-lg scale-105'
                            : 'bg-white hover:bg-[#d2b48c]/10 text-gray-700 hover:scale-102 shadow-md'
                        }
                      `}
                    >
                      <h3 className="text-lg font-semibold mb-2">{option.label}</h3>
                      <p className="text-sm opacity-90">{option.description}</p>
                    </button>
                  ))}
                </div>

                {/* Custom Room Selection */}
                {isCustom && (
                  <div className="mt-8 bg-white rounded-xl p-6 shadow-lg max-w-2xl mx-auto">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Customize Your Layout</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(rooms).map(([room, count]) => (
                        <div 
                          key={room}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-gray-700">{formatRoomName(room)}</span>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleRoomDecrement(room as keyof RoomCounts)}
                              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                              aria-label={`Decrease ${formatRoomName(room)} count`}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{count}</span>
                            <button
                              onClick={() => handleRoomIncrement(room as keyof RoomCounts)}
                              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                              aria-label={`Increase ${formatRoomName(room)} count`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {getTotalRooms() > 0 && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-700 mb-2">Selected Rooms:</h4>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(rooms)
                            .filter(([_, count]) => count > 0)
                            .map(([room, count]) => (
                              <span
                                key={room}
                                className="px-3 py-1 bg-[#d2b48c] text-white rounded-full text-sm"
                              >
                                {formatRoomName(room)} x{count}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`
                      p-6 rounded-xl transition-all duration-300
                      ${
                        selectedOption === option.id
                          ? 'bg-[#d2b48c] text-white shadow-lg scale-105'
                          : 'bg-white hover:bg-[#d2b48c]/10 text-gray-700 hover:scale-102 shadow-md'
                      }
                    `}
                  >
                    <h3 className="text-lg font-semibold mb-2">{option.label}</h3>
                    <p className="text-sm opacity-90">{option.description}</p>
                  </button>
                ))}
              </div>
            )}

            <div className="mt-12 text-center">
              <button
                onClick={handleNext}
                disabled={!selectedOption || (isCustom && getTotalRooms() === 0)}
                className={`
                  px-8 py-3 rounded-full text-white font-medium transition-all duration-300
                  ${
                    (selectedOption && (!isCustom || getTotalRooms() > 0))
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

    export default ProjectDetailsPage;
