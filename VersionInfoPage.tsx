import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function VersionInfoPage() {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

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
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Version Information</h1>
          <p className="text-gray-600">Current Version: v0.6.0</p>
          <p className="text-gray-600">Release Date: July 06, 2024</p>

          <button
            onClick={toggleDetails}
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {showDetails ? 'Hide Detailed Version Information' : 'Show Detailed Version Information'}
          </button>

          {showDetails && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Detailed Version Information</h2>
              <p className="text-gray-700">
                This section provides a detailed overview of the project's architecture, functionality, and recent updates.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">What's New in v0.6.0</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Enhanced PDF generation with improved layout and formatting.</li>
                <li>Added detailed cost breakdown for each room.</li>
                <li>Improved estimate calculation accuracy.</li>
                <li>Enhanced UI responsiveness and user experience.</li>
                <li>Added professional services section in estimates.</li>
                <li>Implemented GST calculations in the final estimate.</li>
                <li>Added important notes section for better clarity.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">What's New in v0.5.6</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Implemented core cost estimation logic.</li>
                <li>Added Residential project type with basic layout options.</li>
                <li>Implemented basic UI layout and styling.</li>
                <li>Updated cost distribution logic for more realistic estimates.</li>
                <li>Improved UI layout and styling with Tailwind CSS.</li>
                <li>Added detailed version information page.</li>
                <li>The estimate page now dynamically calculates costs based on the selected category (Standard, Premium, Luxury).</li>
                <li>Fixed table styling issues for cleaner presentation.</li>
                <li>Added dynamic bedroom generation based on layout selection.</li>
                <li>Improved cost distribution logic for room items.</li>
                <li>Fixed layout issues on the estimate summary page.</li>
                <li>Improved cost distribution ratios for all items.</li>
                <li>Ensured correct calculation of Civil Work costs.</li>
                <li>Updated pricing logic for categories.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">Pricing Logic</h3>
              <p className="text-gray-700">
                The estimate is calculated based on the selected category and total carpet area:
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li><strong>Standard:</strong> 1890 INR per sq.ft.</li>
                <li><strong>Premium:</strong> 2430 INR per sq.ft.</li>
                <li><strong>Luxury:</strong> 3560 INR per sq.ft.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">Technical Details</h3>
              <p className="text-gray-700">
                The project is built using the following technologies:
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li><strong>Frontend:</strong> React, TypeScript, Tailwind CSS, Lucide React (icons), jsPDF (PDF generation), jspdf-autotable (PDF table generation).</li>
                <li><strong>Build Tool:</strong> Vite.</li>
                <li><strong>Linting:</strong> ESLint.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">Project Architecture</h3>
              <p className="text-gray-700">
                The project follows a component-based architecture using React, TypeScript, and Tailwind CSS. Key components include:
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li><strong>Layout Component:</strong> Provides a consistent page structure.</li>
                <li><strong>Page Components:</strong> Implement individual pages and their functionality.</li>
                <li><strong>App Component:</strong> Sets up routing using React Router.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">Page Functionality</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li><strong>HomePage:</strong> Select project type and enter client details.</li>
                <li><strong>CategorySelectionPage:</strong> Choose a project category (Standard, Premium, Luxury).</li>
                <li><strong>ProjectDetailsPage:</strong> Configure project-specific details.</li>
                <li><strong>ResidentialLayoutPage:</strong> Define the layout for residential projects.</li>
                <li><strong>EstimateSummaryPage:</strong> View and download the detailed estimate.</li>
              </ul>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

export default VersionInfoPage;
