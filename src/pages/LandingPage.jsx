import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header with logos */}
      <header className="bg-navy text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/dilg-logo.png" 
                alt="DILG Logo" 
                className="h-20 w-20 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="text-center flex-1">
              <h1 className="text-3xl md:text-4xl font-bold">
                Property Pass Slip Web Tracker
              </h1>
              <p className="text-sm md:text-base text-gray-200 mt-2">
                Department of the Interior and Local Government
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <img 
                src="/lprc-logo.png" 
                alt="LPRC Logo" 
                className="h-20 w-20 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Property Pass Slip System
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage property borrowing and releasing of office equipment efficiently. 
            Submit your pass slip request or access the admin dashboard.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => navigate('/pass-slip')}
            className="w-full sm:w-auto bg-navy text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-navy-dark transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/admin/login')}
            className="w-full sm:w-auto bg-white text-navy border-2 border-navy px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Admin Login
          </button>
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="text-navy text-3xl mb-3">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Easy Submission
            </h3>
            <p className="text-gray-600">
              Fill out the property pass slip form online and receive instant confirmation.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="text-navy text-3xl mb-3">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Track Records
            </h3>
            <p className="text-gray-600">
              Administrators can track all property movements and generate reports.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="text-navy text-3xl mb-3">📧</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Email Confirmation
            </h3>
            <p className="text-gray-600">
              Receive a PDF copy of your pass slip directly to your email address.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-20 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 italic mb-2">"Matino, Mahuway at Maaphan"</p>
          <div className="text-sm text-gray-500">
            <p>T: (088) 531-1007</p>
            <p>
              E: <a href="mailto:dilg10.misocc@gmail.com" className="text-navy hover:underline">
                dilg10.misocc@gmail.com
              </a>
            </p>
            <p>
              FB: <a href="https://www.facebook.com/dilgmisoccprovince" target="_blank" rel="noopener noreferrer" className="text-navy hover:underline">
                www.facebook.com/dilgmisoccprovince
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
