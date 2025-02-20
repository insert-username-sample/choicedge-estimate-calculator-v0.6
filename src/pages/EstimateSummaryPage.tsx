import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Printer, Phone } from 'lucide-react';
import Layout from '../components/Layout';
import html2pdf from 'html2pdf.js';

interface RoomItem {
  description: string;
  quantity: number;
  unit: string;
  amount: number;
}

interface Room {
  id?: string;
  name: string;
  carpetArea: string;
  rate: number;
  amount: number;
  items: RoomItem[];
}

interface Floor {
  id: string;
  name: string;
  carpetArea: string;
  rooms: Room[];
}

const ROOM_DISTRIBUTION_RATIOS: { [key: string]: number } = {
  'Master Bedroom': 0.28,
  'Bedroom': 0.20,
  'Living Room': 0.24,
  'Kitchen': 0.16,
  'Bathroom': 0.055,
  'Dining Room': 0.14,
  'Study Room': 0.13,
  'Balcony': 0.07,
  'Store Room': 0.06,
  'Servant Room': 0.09,
  'Pooja Room': 0.07
};

const ROOM_ITEMS: { [key: string]: { description: string; ratio: number; unit: string }[] } = {
  default: [
    { description: 'Civil Work', ratio: 0.30, unit: 'sq.ft' },
    { description: 'Flooring', ratio: 0.15, unit: 'sq.ft' },
    { description: 'Electrical', ratio: 0.12, unit: 'unit' },
    { description: 'Plumbing', ratio: 0.08, unit: 'unit' },
    { description: 'False Ceiling', ratio: 0.10, unit: 'sq.ft' },
    { description: 'Painting', ratio: 0.08, unit: 'sq.ft' },
    { description: 'Furniture', ratio: 0.17, unit: 'unit' }
  ],
  'Bathroom': [
    { description: 'Civil Work', ratio: 0.22, unit: 'sq.ft' },
    { description: 'Flooring & Wall Tiles', ratio: 0.18, unit: 'sq.ft' },
    { description: 'Plumbing', ratio: 0.16, unit: 'unit' },
    { description: 'Electrical', ratio: 0.12, unit: 'unit' },
    { description: 'Sanitary Ware', ratio: 0.18, unit: 'unit' },
    { description: 'False Ceiling', ratio: 0.08, unit: 'sq.ft' },
    { description: 'Accessories', ratio: 0.06, unit: 'unit' }
  ],
  'Kitchen': [
    { description: 'Civil Work', ratio: 0.20, unit: 'sq.ft' },
    { description: 'Flooring & Wall Tiles', ratio: 0.15, unit: 'sq.ft' },
    { description: 'Plumbing', ratio: 0.12, unit: 'unit' },
    { description: 'Electrical', ratio: 0.13, unit: 'unit' },
    { description: 'Modular Kitchen', ratio: 0.25, unit: 'unit' },
    { description: 'Appliances', ratio: 0.10, unit: 'unit' },
    { description: 'False Ceiling', ratio: 0.05, unit: 'sq.ft' }
  ]
};

function EstimateSummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  if (!state) {
    React.useEffect(() => {
      navigate('/');
    }, [navigate]);
    return null;
  }

  const addRandomVariation = (value: number, range: number = 0.02): number => {
    const variation = (Math.random() * 2 - 1) * range; // Random between -range and +range
    const variedValue = value * (1 + variation);
    // Round to nearest 10 to avoid too precise numbers
    return Math.round(variedValue / 10) * 10;
  };

  const distributeAreaToRooms = (totalArea: number, layoutType: string): Room[] => {
    let rooms: Room[] = [];
    const baseRate = state.category === 'standard' ? 1550 : state.category === 'premium' ? 2430 : 3560;
    const rate = Math.round(addRandomVariation(baseRate, 0.01)); // Slight variation in rate

    // For custom layouts, use the rooms from state directly
    if (state.isCustom && state.rooms) {
      return state.rooms.map(room => ({
        ...room,
        rate,
        amount: parseFloat(room.carpetArea) * rate,
        items: generateRoomItems(parseFloat(room.carpetArea) * rate, room.name)
      }));
    }

    if (layoutType === '1rk') {
      rooms = [
        { name: 'Living Room', carpetArea: (totalArea * 0.68).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Kitchen', carpetArea: (totalArea * 0.26).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bathroom', carpetArea: (totalArea * 0.06).toFixed(2), rate, amount: 0, items: [] }
      ];
    } else if (layoutType === '1bhk') {
      rooms = [
        { name: 'Living Room', carpetArea: (totalArea * 0.38).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bedroom', carpetArea: (totalArea * 0.32).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Kitchen', carpetArea: (totalArea * 0.24).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bathroom', carpetArea: (totalArea * 0.06).toFixed(2), rate, amount: 0, items: [] }
      ];
    } else if (layoutType === '2bhk') {
      rooms = [
        { name: 'Living Room', carpetArea: (totalArea * 0.32).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Master Bedroom', carpetArea: (totalArea * 0.24).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bedroom', carpetArea: (totalArea * 0.20).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Kitchen', carpetArea: (totalArea * 0.18).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bathroom', carpetArea: (totalArea * 0.035).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bathroom', carpetArea: (totalArea * 0.025).toFixed(2), rate, amount: 0, items: [] }
      ];
    } else if (layoutType === '3bhk') {
      rooms = [
        { name: 'Living Room', carpetArea: (totalArea * 0.28).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Master Bedroom', carpetArea: (totalArea * 0.22).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bedroom', carpetArea: (totalArea * 0.18).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bedroom', carpetArea: (totalArea * 0.16).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Kitchen', carpetArea: (totalArea * 0.12).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bathroom', carpetArea: (totalArea * 0.02).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bathroom', carpetArea: (totalArea * 0.015).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bathroom', carpetArea: (totalArea * 0.015).toFixed(2), rate, amount: 0, items: [] }
      ];
    } else if (layoutType === '4bhk') {
      rooms = [
        { name: 'Living Room', carpetArea: (totalArea * 0.25).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Master Bedroom', carpetArea: (totalArea * 0.20).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bedroom', carpetArea: (totalArea * 0.15).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bedroom', carpetArea: (totalArea * 0.15).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bedroom', carpetArea: (totalArea * 0.12).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Kitchen', carpetArea: (totalArea * 0.09).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bathroom', carpetArea: (totalArea * 0.015).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bathroom', carpetArea: (totalArea * 0.015).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bathroom', carpetArea: (totalArea * 0.01).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bathroom', carpetArea: (totalArea * 0.01).toFixed(2), rate, amount: 0, items: [] }
      ];
    } else if (layoutType === '5bhk') {
      rooms = [
        { name: 'Living Room', carpetArea: (totalArea * 0.22).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Master Bedroom', carpetArea: (totalArea * 0.18).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bedroom', carpetArea: (totalArea * 0.15).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bedroom', carpetArea: (totalArea * 0.14).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bedroom', carpetArea: (totalArea * 0.12).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bedroom', carpetArea: (totalArea * 0.10).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Kitchen', carpetArea: (totalArea * 0.06).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bathroom', carpetArea: (totalArea * 0.01).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bathroom', carpetArea: (totalArea * 0.01).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bathroom', carpetArea: (totalArea * 0.005).toFixed(2), rate, amount: 0, items: [] },
        { name: 'Bathroom', carpetArea: (totalArea * 0.005).toFixed(2), rate, amount: 0, items: [] }
      ];
    }

    return rooms.map(room => ({
      ...room,
      amount: parseFloat(room.carpetArea) * rate,
      items: generateRoomItems(parseFloat(room.carpetArea) * rate, room.name)
    }));
  };

  const generateRoomItems = (roomAmount: number, roomType: string): RoomItem[] => {
    const itemsList = ROOM_ITEMS[roomType] || ROOM_ITEMS.default;
    return itemsList.map(item => ({
      description: item.description,
      quantity: 1,
      unit: item.unit,
      amount: Math.round(roomAmount * item.ratio)
    }));
  };

  const calculateSubtotal = () => {
    let constructionCost = 0;
    
    if (state.isVilla) {
      state.floors.forEach((floor: Floor) => {
        floor.rooms.forEach((room: Room) => {
          const rate = state.category === 'standard' ? 1550 : state.category === 'premium' ? 2430 : 3560;
          constructionCost += parseFloat(room.carpetArea) * rate;
        });
      });
    } else if (state.areaOption === 'total' && state.totalCarpetArea) {
      constructionCost = parseFloat(state.totalCarpetArea) * 
        (state.category === 'standard' ? 1550 : state.category === 'premium' ? 2430 : 3560);
    } else if (state.rooms) {
      state.rooms.forEach((room: Room) => {
        const rate = state.category === 'standard' ? 1550 : state.category === 'premium' ? 2430 : 3560;
          constructionCost += parseFloat(room.carpetArea) * rate;
        });
      }
    
    // Calculate design charges as 8% of construction cost
    const designCharges = constructionCost * 0.08;
    return constructionCost + designCharges;
  };

  const processedRooms = state.areaOption === 'total' && state.totalCarpetArea
    ? distributeAreaToRooms(parseFloat(state.totalCarpetArea), state.layoutType)
    : state.rooms;

  const handleDownloadPDF = async () => {
    if (typeof html2pdf === 'undefined') {
      console.error('html2pdf.js is not loaded.');
      alert('Failed to generate PDF. html2pdf.js is not loaded.');
      return;
    }

    const element = document.querySelector('.estimate-container');
    if (!element) {
      console.error('Could not find estimate container.');
      return;
    }

    // Add logo to the beginning of the element
    const logoImg = document.createElement('img');
    logoImg.src = "https://github.com/insert-username-sample/choicedge-estimate-calculator-v0.6/blob/main/choicedge-logo.png?raw=true";
    logoImg.style.width = '150px';
    logoImg.style.marginBottom = '20px';
    element.insertBefore(logoImg, element.firstChild);

    const opt = {
      margin: 1,
      filename: 'estimate.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    try {
      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please check the console for details.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">Estimate Summary</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </header>
    
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="estimate-container bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
          {/* Client Info */}
          <div className="px-6 py-8 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Client Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Client Name</p>
                    <p className="text-lg font-medium text-gray-900">{state.clientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Project Name</p>
                    <p className="text-lg font-medium text-gray-900">{state.projectName}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Category</p>
                    <p className="text-lg font-medium text-gray-900 capitalize">{state.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Date</p>
                    <p className="text-lg font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          {/* Room Details Table */}
          <div className="px-6 py-5">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <table className="estimate-table min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 first:rounded-tl-lg">Room</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Area (sq.ft)</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Rate (₹/sq.ft)</th>
                      <th scope="col" className="px-6 py-3.5 text-right text-sm font-semibold text-gray-900 last:rounded-tr-lg">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {state.isVilla ? (
                      state.floors.map((floor: Floor) => (
                        <React.Fragment key={floor.id}>
                          <tr className="bg-gray-50">
                            <td colSpan={4} className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900">{floor.name}</td>
                          </tr>
                          {floor.rooms.map((room: Room) => (
                            <React.Fragment key={room.id || room.name}>
                              <tr className="hover:bg-gray-50 transition-colors">
                                <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">{room.name}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">{room.carpetArea}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">
                                  {state.category === 'standard' ? '1,550' : state.category === 'premium' ? '2,430' : '3,560'}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900">
                                  ₹ {(parseFloat(room.carpetArea) * (state.category === 'standard' ? 1550 : state.category === 'premium' ? 2430 : 3560)).toLocaleString('en-IN')}
                                </td>
                              </tr>
                              {/* Room Items */}
                              {generateRoomItems(parseFloat(room.carpetArea) * (state.category === 'standard' ? 1550 : state.category === 'premium' ? 2430 : 3560), room.name).map((item: RoomItem) => (
                                <tr key={`${room.name}-${item.description}`} className="bg-gray-50/50">
                                  <td className="pl-10 py-2 text-sm text-gray-600">{item.description}</td>
                                  <td className="px-3 py-2 text-right text-sm text-gray-500">{item.unit}</td>
                                  <td className="px-3 py-2 text-right text-sm text-gray-500">-</td>
                                  <td className="px-6 py-2 text-right text-sm text-gray-600">₹ {item.amount.toLocaleString('en-IN')}</td>
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      ))
                    ) : (
                      processedRooms.map((room: Room) => (
                        <React.Fragment key={room.id || room.name}>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">{room.name}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">{room.carpetArea}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">
                              {state.category === 'standard' ? '1,550' : state.category === 'premium' ? '2,430' : '3,560'}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900">
                              ₹ {(parseFloat(room.carpetArea) * (state.category === 'standard' ? 1550 : state.category === 'premium' ? 2430 : 3560)).toLocaleString('en-IN')}
                            </td>
                          </tr>
                          {/* Room Items */}
                          {generateRoomItems(parseFloat(room.carpetArea) * (state.category === 'standard' ? 1550 : state.category === 'premium' ? 2430 : 3560), room.name).map((item: RoomItem) => (
                            <tr key={`${room.name}-${item.description}`} className="bg-gray-50/50">
                              <td className="pl-10 py-2 text-sm text-gray-600">{item.description}</td>
                              <td className="px-3 py-2 text-right text-sm text-gray-500">{item.unit}</td>
                              <td className="px-3 py-2 text-right text-sm text-gray-500">-</td>
                              <td className="px-6 py-2 text-right text-sm text-gray-600">₹ {item.amount.toLocaleString('en-IN')}</td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    
          {/* Additional Services */}
          <div className="px-6 py-5 border-t border-gray-200 bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Services</h3>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <dt className="text-sm font-medium text-gray-700 mb-2">Design & Visualization</dt>
                <dd className="text-2xl font-semibold text-gray-900">₹ {(calculateSubtotal() * 0.08).toLocaleString('en-IN')}</dd>
                <p className="text-sm text-gray-600 mt-2">Includes consultation, 2D drawings, and 3D visualization</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <dt className="text-sm font-medium text-gray-700 mb-2">Project Management</dt>
                <dd className="text-2xl font-semibold text-gray-900">₹ {(calculateSubtotal() * 0.01).toLocaleString('en-IN')}</dd>
                <p className="text-sm text-gray-600 mt-2">Supervision, coordination, and quality control</p>
              </div>
            </dl>
          </div>
    
          {/* Total Calculations */}
          <div className="px-6 py-8 bg-gray-50 rounded-b-xl">
            <dl className="space-y-6 max-w-2xl mx-auto">
              <div className="flex justify-between items-center py-2">
                <dt className="text-base font-medium text-gray-600">Construction Cost</dt>
                <dd className="text-lg font-semibold text-gray-900">₹ {calculateSubtotal().toLocaleString('en-IN')}</dd>
              </div>
              <div className="flex justify-between items-center py-2">
                <dt className="text-base font-medium text-gray-600">Design Services</dt>
                <dd className="text-lg font-semibold text-gray-900">₹ {(calculateSubtotal() * 0.08).toLocaleString('en-IN')}</dd>
              </div>
              <div className="flex justify-between items-center py-2">
                <dt className="text-base font-medium text-gray-600">Project Management</dt>
                <dd className="text-lg font-semibold text-gray-900">₹ {(calculateSubtotal() * 0.01).toLocaleString('en-IN')}</dd>
              </div>
              <div className="flex justify-between items-center py-2">
                <dt className="text-base font-medium text-gray-600">GST (18%)</dt>
                <dd className="text-lg font-semibold text-gray-900">₹ {(calculateSubtotal() * 1.31 * 0.18).toLocaleString('en-IN')}</dd>
              </div>
              <div className="pt-6 flex justify-between items-center border-t-2 border-gray-300">
                <dt className="text-xl font-bold text-gray-900">Grand Total</dt>
                <dd className="text-2xl font-bold text-blue-600">₹ {(calculateSubtotal() * 1.31 * 1.18).toLocaleString('en-IN')}</dd>
              </div>
            </dl>
          </div>
        </div>
    
        {/* Footer */}
        <footer className="mt-8 text-center text-gray-500 border-t border-gray-200 pt-8 pb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-2">CHOICEDGE INTERIOR DESIGN</h3>
          <div className="mt-2 text-sm space-y-1">
            <p>Shradha House, Office Block No. SI-1, 6th Floor</p>
            <p>Sardar Vallabhbhai Patel Marg (Kingsway), Nagpur-440001</p>
          </div>
          <div className="mt-6 flex justify-center space-x-8 text-sm font-medium">
            <div className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              +91 8956125439
            </div>
            <div className="text-gray-600 hover:text-gray-900 transition-colors">www.choicedge.com</div>
            <div className="text-gray-600 hover:text-gray-900 transition-colors">info@choicedge.com</div>
          </div>
        </footer>
      </main>
    </Layout>
  );
}

export default EstimateSummaryPage;
