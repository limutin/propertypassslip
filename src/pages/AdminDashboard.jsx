import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import { getAllPassSlips, updateReturnStatus } from '../firebase/functions';

const AdminDashboard = () => {
  const [passSlips, setPassSlips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [returnData, setReturnData] = useState({
    returnedBy: '',
    returnedOn: new Date().toISOString().split('T')[0],
    condition: 'Good',
    remarks: ''
  });

  useEffect(() => {
    loadPassSlips();
  }, []);

  const loadPassSlips = async () => {
    try {
      const slips = await getAllPassSlips();
      setPassSlips(slips);
    } catch (error) {
      console.error('Error loading pass slips:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate analytics
  const totalSlips = passSlips.length;
  const borrowedSlips = passSlips.filter(slip => slip.status === 'borrowed').length;
  const returnedSlips = passSlips.filter(slip => slip.status === 'returned').length;

  // Calculate most borrowed items
  const itemCounts = {};
  passSlips.forEach(slip => {
    slip.properties.forEach(prop => {
      const itemName = prop.description.toLowerCase().trim();
      itemCounts[itemName] = (itemCounts[itemName] || 0) + 1;
    });
  });
  const sortedItems = Object.entries(itemCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  // Calculate items by department
  const deptCounts = {};
  passSlips.forEach(slip => {
    const dept = slip.office;
    const itemCount = slip.properties.length;
    deptCounts[dept] = (deptCounts[dept] || 0) + itemCount;
  });
  const deptData = Object.entries(deptCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  // Filter pass slips
  const filteredSlips = passSlips.filter(slip => {
    const matchesSearch = 
      slip.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slip.office.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slip.passSlipNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || slip.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleReturnClick = (slip) => {
    setSelectedSlip(slip);
    setShowReturnModal(true);
  };

  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReturnStatus(selectedSlip.id, returnData);
      setShowReturnModal(false);
      setSelectedSlip(null);
      setReturnData({
        returnedBy: '',
        returnedOn: new Date().toISOString().split('T')[0],
        condition: 'Good',
        remarks: ''
      });
      loadPassSlips();
    } catch (error) {
      console.error('Error updating return status:', error);
      alert('Failed to update return status');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-navy">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Pass Slips</h3>
            <p className="text-3xl font-bold text-gray-900">{totalSlips}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Currently Borrowed</h3>
            <p className="text-3xl font-bold text-gray-900">{borrowedSlips}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Returned</h3>
            <p className="text-3xl font-bold text-gray-900">{returnedSlips}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            {sortedItems.length > 0 ? (
              <BarChart data={sortedItems} />
            ) : (
              <div className="text-center text-gray-500 py-8">No data available</div>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            {deptData.length > 0 ? (
              <PieChart data={deptData} />
            ) : (
              <div className="text-center text-gray-500 py-8">No data available</div>
            )}
          </div>
        </div>

        {/* Pass Slips Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">All Pass Slips</h2>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by name, office, or pass slip number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            >
              <option value="all">All Status</option>
              <option value="borrowed">Borrowed</option>
              <option value="returned">Returned</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Pass Slip No.</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Requested By</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Office</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Items</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSlips.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      No pass slips found
                    </td>
                  </tr>
                ) : (
                  filteredSlips.map((slip) => (
                    <tr key={slip.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-navy">{slip.passSlipNo}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{formatDate(slip.date)}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{slip.requestedBy}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{slip.office}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{slip.properties.length} item(s)</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          slip.status === 'borrowed' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {slip.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          {slip.pdfUrl && (
                            <a
                              href={slip.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-navy hover:underline"
                            >
                              View PDF
                            </a>
                          )}
                          {slip.status === 'borrowed' && (
                            <button
                              onClick={() => handleReturnClick(slip)}
                              className="text-green-600 hover:underline"
                            >
                              Mark Returned
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Return Modal */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mark Item as Returned</h3>
            <form onSubmit={handleReturnSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Returned By <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={returnData.returnedBy}
                  onChange={(e) => setReturnData({ ...returnData, returnedBy: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Returned On <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={returnData.returnedOn}
                  onChange={(e) => setReturnData({ ...returnData, returnedOn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  value={returnData.condition}
                  onChange={(e) => setReturnData({ ...returnData, condition: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                  required
                >
                  <option value="Good">In Good Condition</option>
                  <option value="WithIssues">With Issues</option>
                </select>
              </div>
              {returnData.condition === 'WithIssues' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remarks
                  </label>
                  <textarea
                    value={returnData.remarks}
                    onChange={(e) => setReturnData({ ...returnData, remarks: e.target.value })}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                  />
                </div>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReturnModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-navy text-white rounded-md hover:bg-navy-dark transition duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
