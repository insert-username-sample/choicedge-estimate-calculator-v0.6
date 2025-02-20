import React, { useState } from 'react';
    import { useLocation, useNavigate } from 'react-router-dom';
    import { ArrowLeft, X, Plus } from 'lucide-react';
    import Layout from '../components/Layout';

    interface Room {
      id: string;
      name: string;
      carpetArea: string;
    }

    interface Floor {
      id: string;
      name: string;
      carpetArea: string;
      rooms: Room[];
    }

    interface LocationState {
      layoutType?: string;
      rooms: Array<{ id: string; name: string; }>;
      isCustom: boolean;
      category: string;
      clientName: string;
      projectName: string;
    }

    const AVAILABLE_ROOMS = [
      { id: 'livingRoom', name: 'Living Room' },
      { id: 'diningRoom', name: 'Dining Room' },
      { id: 'kitchen', name: 'Kitchen' },
      { id: 'masterBedroom', name: 'Master Bedroom' },
      { id: 'bedroom', name: 'Bedroom' },
      { id: 'studyRoom', name: 'Study Room' },
      { id: 'poojaRoom', name: 'Pooja Room' },
      { id: 'servantRoom', name: 'Servant Room' },
      { id: 'storeRoom', name: 'Store Room' },
      { id: 'balcony', name: 'Balcony' }
    ];

    function ResidentialLayoutPage() {
      const location = useLocation();
      const navigate = useNavigate();
      const { layoutType, rooms: initialRooms, isCustom, category, clientName, projectName } = location.state as LocationState;
      const isVilla = layoutType === 'villa';
      
      const [areaOption, setAreaOption] = useState<'total' | 'rooms'>('total');
      const [totalCarpetArea, setTotalCarpetArea] = useState('');
      const [rooms, setRooms] = useState<Room[]>(
        initialRooms.map(room => ({
          ...room,
          carpetArea: ''
        }))
      );
      const [floors, setFloors] = useState<Floor[]>([
        {
          id: 'ground',
          name: 'Ground Floor',
          carpetArea: '',
          rooms: []
        }
      ]);

      const handleCarpetAreaChange = (roomId: string, value: string) => {
        setRooms(prevRooms => 
          prevRooms.map(room => 
            room.id === roomId ? { ...room, carpetArea: value } : room
          )
        );
      };

      const handleTotalAreaChange = (value: string) => {
        setTotalCarpetArea(value);
      };

      const handleFloorCarpetAreaChange = (floorId: string, value: string) => {
        setFloors(prevFloors =>
          prevFloors.map(floor =>
            floor.id === floorId ? { ...floor, carpetArea: value } : floor
          )
        );
      };

      const handleRoomCarpetAreaChange = (floorId: string, roomId: string, value: string) => {
        setFloors(prevFloors =>
          prevFloors.map(floor =>
            floor.id === floorId
              ? {
                  ...floor,
                  rooms: floor.rooms.map(room =>
                    room.id === roomId ? { ...room, carpetArea: value } : room
                  )
                }
              : floor
          )
        );
      };

      const addFloor = () => {
        const floorNumber = floors.length;
        setFloors(prevFloors => [
          ...prevFloors,
          {
            id: `floor-${floorNumber}`,
            name: `Floor ${floorNumber === 1 ? 'First' : floorNumber === 2 ? 'Second' : `${floorNumber}th`}`,
            carpetArea: '',
            rooms: []
          }
        ]);
      };

      const removeFloor = (floorId: string) => {
        setFloors(prevFloors => prevFloors.filter(floor => floor.id !== floorId));
      };

      const addRoomToFloor = (floorId: string, roomType: { id: string; name: string }) => {
        setFloors(prevFloors =>
          prevFloors.map(floor =>
            floor.id === floorId
              ? {
                  ...floor,
                  rooms: [
                    ...floor.rooms,
                    { ...roomType, carpetArea: '' }
                  ]
                }
              : floor
          )
        );
      };

      const removeRoomFromFloor = (floorId: string, roomId: string) => {
        setFloors(prevFloors =>
          prevFloors.map(floor =>
            floor.id === floorId
              ? {
                  ...floor,
                  rooms: floor.rooms.filter(room => room.id !== roomId)
                }
              : floor
          )
        );
      };

      const getAvailableRoomsForFloor = (floorId: string) => {
        const floor = floors.find(f => f.id === floorId);
        if (!floor) return AVAILABLE_ROOMS;

        const usedRoomIds = new Set(floor.rooms.map(room => room.id));
        return AVAILABLE_ROOMS.filter(room => !usedRoomIds.has(room.id));
      };

      const isFormComplete = () => {
        if (!isVilla) {
          if (areaOption === 'total') {
            return totalCarpetArea !== '' && parseFloat(totalCarpetArea) > 0;
          }
          return rooms.every(room => room.carpetArea && parseFloat(room.carpetArea) > 0);
        }
        
        return floors.every(floor => 
          floor.carpetArea !== '' && 
          parseFloat(floor.carpetArea) > 0 &&
          floor.rooms.every(room => room.carpetArea && parseFloat(room.carpetArea) > 0)
        );
      };

      const handleGetEstimate = () => {
        const estimateData = {
          layoutType,
          isCustom,
          isVilla,
          category,
          clientName,
          projectName,
          ...(isVilla 
            ? { floors }
            : {
                areaOption,
                totalCarpetArea: areaOption === 'total' ? totalCarpetArea : null,
                rooms: areaOption === 'rooms' ? rooms : null,
              }
          )
        };
        
        navigate('/estimate-summary', { state: estimateData });
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
                {isVilla ? 'Customize Your Villa Layout' : 'Enter Carpet Area Details'}
              </h1>
              <p className="text-gray-600">
                {isVilla 
                  ? 'Define floors and add custom details for each floor'
                  : 'Choose how you would like to specify the carpet area below'
                }
              </p>
            </div>

            {!isVilla ? (
              <>
                {/* Area Option Toggle */}
                <div className="flex justify-center mb-12">
                  <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                    <button
                      onClick={() => setAreaOption('total')}
                      className={`
                        px-6 py-2 rounded-md font-medium transition-all duration-300
                        ${areaOption === 'total'
                          ? 'bg-white text-gray-800 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                        }
                      `}
                    >
                      Complete Carpet Area
                    </button>
                    <button
                      onClick={() => setAreaOption('rooms')}
                      className={`
                        px-6 py-2 rounded-md font-medium transition-all duration-300
                        ${areaOption === 'rooms'
                          ? 'bg-white text-gray-800 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                        }
                      `}
                    >
                      Each Room Carpet Area
                    </button>
                  </div>
                </div>

                {/* Total Carpet Area Input */}
                {areaOption === 'total' && (
                  <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg mb-12">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Carpet Area (sq. ft.)
                    </label>
                    <input
                      type="number"
                      value={totalCarpetArea}
                      onChange={(e) => handleTotalAreaChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter total carpet area"
                      min="0"
                    />
                  </div>
                )}

                {/* Room-specific Carpet Areas */}
                {areaOption === 'rooms' && (
                  <div className="space-y-6 mb-12">
                    {rooms.map((room) => (
                      <div key={room.id} className="bg-white rounded-xl p-6 shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-semibold text-gray-800">
                            {room.name}
                          </h3>
                          {isCustom && (
                            <button
                              onClick={() => setRooms(rooms.filter(r => r.id !== room.id))}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              aria-label={`Remove ${room.name}`}
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Carpet Area (sq. ft.)
                          </label>
                          <input
                            type="number"
                            value={room.carpetArea}
                            onChange={(e) => handleCarpetAreaChange(room.id, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter carpet area"
                            min="0"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* Villa Layout */
              <div className="space-y-8 mb-12">
                {floors.map((floor, index) => (
                  <div key={floor.id} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-semibold text-gray-800">
                        {floor.name}
                      </h3>
                      {index > 0 && (
                        <button
                          onClick={() => removeFloor(floor.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label={`Remove ${floor.name}`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Floor Carpet Area (sq. ft.)
                      </label>
                      <input
                        type="number"
                        value={floor.carpetArea}
                        onChange={(e) => handleFloorCarpetAreaChange(floor.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter floor carpet area"
                        min="0"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-gray-700">Rooms on this floor</h4>
                        <div className="relative">
                          <select
                            className="appearance-none bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                            onChange={(e) => {
                              const [id, name] = e.target.value.split('|');
                              addRoomToFloor(floor.id, { id, name });
                              e.target.value = '';
                            }}
                            value=""
                          >
                            <option value="">Add Room</option>
                            {getAvailableRoomsForFloor(floor.id).map((room) => (
                              <option key={room.id} value={`${room.id}|${room.name}`}>
                                {room.name}
                              </option>
                            ))}
                          </select>
                          <Plus className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
                        </div>
                      </div>
                      
                      {floor.rooms.map((room) => (
                        <div key={room.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="text-md font-medium text-gray-800">{room.name}</h5>
                            <button
                              onClick={() => removeRoomFromFloor(floor.id, room.id)}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              aria-label={`Remove ${room.name}`}
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Room Carpet Area (sq. ft.)
                            </label>
                            <input
                              type="number"
                              value={room.carpetArea}
                              onChange={(e) => handleRoomCarpetAreaChange(floor.id, room.id, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter room carpet area"
                              min="0"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="text-center">
                  <button
                    onClick={addFloor}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Floor
                  </button>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleGetEstimate}
                disabled={!isFormComplete()}
                className={`
                  px-8 py-3 rounded-full text-white font-medium transition-all duration-300
                  ${
                    isFormComplete()
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:scale-105'
                      : 'bg-gray-300 cursor-not-allowed'
                  }
                `}
              >
                Get Estimate
              </button>
            </div>
          </main>
        </Layout>
      );
    }

    export default ResidentialLayoutPage;
