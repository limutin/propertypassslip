import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyRow from '../components/PropertyRow';
import { createPassSlip, uploadPDF, updatePassSlipPDF } from '../firebase/functions';
import { generatePDF } from '../utils/pdfGenerator';
import { Timestamp } from 'firebase/firestore';

const PassSlipForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    requestedBy: '',
    signature: '',
    office: '',
    email: '',
    properties: [
      { description: '', serialNumber: '', quantity: 1, condition: '' }
    ],
    purpose: '',
    movementType: {
      bringingOut: false,
      temporaryRelease: false,
      fromDate: '',
      toDate: ''
    }
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMovementTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      movementType: {
        ...prev.movementType,
        [type]: !prev.movementType[type]
      }
    }));
  };

  const handlePeriodChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      movementType: {
        ...prev.movementType,
        [field]: value
      }
    }));
  };

  const handlePropertyChange = (index, updatedProperty) => {
    const newProperties = [...formData.properties];
    newProperties[index] = updatedProperty;
    setFormData(prev => ({ ...prev, properties: newProperties }));
  };

  const addProperty = () => {
    setFormData(prev => ({
      ...prev,
      properties: [
        ...prev.properties,
        { description: '', serialNumber: '', quantity: 1, condition: '' }
      ]
    }));
  };

  const removeProperty = (index) => {
    if (formData.properties.length > 1) {
      setFormData(prev => ({
        ...prev,
        properties: prev.properties.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = () => {
    if (!formData.requestedBy.trim()) {
      setError('Requested By name is required');
      return false;
    }
    if (!formData.office.trim()) {
      setError('Office is required');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Valid email is required');
      return false;
    }
    if (formData.properties.length === 0) {
      setError('At least one property item is required');
      return false;
    }
    for (let prop of formData.properties) {
      if (!prop.description.trim() || !prop.condition) {
        setError('All property fields (description and condition) are required');
        return false;
      }
    }
    if (!formData.purpose.trim()) {
      setError('Purpose is required');
      return false;
    }
    if (!formData.movementType.bringingOut && !formData.movementType.temporaryRelease) {
      setError('Please select at least one movement type');
      return false;
    }
    if (formData.movementType.temporaryRelease && (!formData.movementType.fromDate || !formData.movementType.toDate)) {
      setError('Period (From and To dates) is required for Temporary Release');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare data for Firestore
      const passSlipData = {
        date: Timestamp.fromDate(new Date(formData.date)),
        requestedBy: formData.requestedBy,
        signature: formData.signature || formData.requestedBy,
        office: formData.office,
        email: formData.email,
        properties: formData.properties,
        purpose: formData.purpose,
        movementType: {
          bringingOut: formData.movementType.bringingOut,
          temporaryRelease: formData.movementType.temporaryRelease,
          fromDate: formData.movementType.fromDate ? Timestamp.fromDate(new Date(formData.movementType.fromDate)) : null,
          toDate: formData.movementType.toDate ? Timestamp.fromDate(new Date(formData.movementType.toDate)) : null
        },
        authorizedBy: {
          name: 'EDWARD G. BHAGWANI, JD, MNSA, CESO V',
          title: 'Provincial Director',
          date: Timestamp.now()
        },
        securityCheck: {
          verified: true,
          custodianName: 'MARY LOUISE T. IDULSA',
          custodianTitle: 'Administrative Aide IV'
        },
        returnStatus: {
          returnedBy: null,
          returnedOn: null,
          condition: null,
          remarks: null
        }
      };

      // Create pass slip in Firestore
      const { id, passSlipNo } = await createPassSlip(passSlipData);

      // Generate PDF
      const pdfBlob = await generatePDF({ ...passSlipData, passSlipNo, id });

      // Upload PDF to Firebase Storage
      const pdfUrl = await uploadPDF(pdfBlob, passSlipNo);

      // Update pass slip with PDF URL
      await updatePassSlipPDF(id, pdfUrl);

      // TODO: Send email with PDF (implement Cloud Function)
      // For now, we'll just show success message
      
      setSuccess(true);
      setLoading(false);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit pass slip. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pass Slip Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your Property Pass Slip has been submitted and a PDF copy has been sent to your email address.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-navy text-white px-6 py-3 rounded-lg hover:bg-navy-dark transition duration-200 font-medium"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 border-4 border-navy">
          <div className="text-center mb-6">
            <p className="text-xs text-gray-600">Republic of the Philippines</p>
            <h1 className="text-xl font-bold text-gray-900">
              DEPARTMENT OF THE INTERIOR AND LOCAL GOVERNMENT
            </h1>
            <h2 className="text-lg font-bold text-gray-900">
              MISAMIS OCCIDENTAL PROVINCIAL OFFICE
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              PEO Compound, Capitol Drive, Lower Lamac, Oroquieta City
            </p>
            <p className="text-sm text-navy">
              <a href="http://www.region10.dilg.gov.ph" target="_blank" rel="noopener noreferrer" className="hover:underline">
                www.region10.dilg.gov.ph
              </a>
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-4 border-t-2 border-b-2 border-gray-300 py-2">
              PROPERTY PASS SLIP
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requested By (Name) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.requestedBy}
                  onChange={(e) => handleInputChange('requestedBy', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Signature (Typed Name)
                </label>
                <input
                  type="text"
                  value={formData.signature}
                  onChange={(e) => handleInputChange('signature', e.target.value)}
                  placeholder="Type your name as signature"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Office <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.office}
                onChange={(e) => handleInputChange('office', e.target.value)}
                placeholder="Enter your department/office"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                required
              />
            </div>

            {/* Details of Property */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Details of Property <span className="text-red-500">*</span>
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 p-2 text-left">Item Description</th>
                      <th className="border border-gray-300 p-2 text-left">Serial Number</th>
                      <th className="border border-gray-300 p-2 text-left">Quantity</th>
                      <th className="border border-gray-300 p-2 text-left">Condition</th>
                      <th className="border border-gray-300 p-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.properties.map((property, index) => (
                      <PropertyRow
                        key={index}
                        property={property}
                        index={index}
                        onChange={handlePropertyChange}
                        onRemove={removeProperty}
                        canRemove={formData.properties.length > 1}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={addProperty}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200 text-sm font-medium"
              >
                + Add Item
              </button>
            </div>

            {/* Purpose */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purpose <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                placeholder="Enter the purpose of borrowing/releasing property"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                required
              />
            </div>

            {/* Movement Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Movement Type <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.movementType.bringingOut}
                    onChange={() => handleMovementTypeChange('bringingOut')}
                    className="h-4 w-4 text-navy focus:ring-navy border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Bringing/Taking OUT</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.movementType.temporaryRelease}
                    onChange={() => handleMovementTypeChange('temporaryRelease')}
                    className="h-4 w-4 text-navy focus:ring-navy border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Temporary Release</span>
                </label>
              </div>

              {formData.movementType.temporaryRelease && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Period <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">From</label>
                      <input
                        type="date"
                        value={formData.movementType.fromDate}
                        onChange={(e) => handlePeriodChange('fromDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">To</label>
                      <input
                        type="date"
                        value={formData.movementType.toDate}
                        onChange={(e) => handlePeriodChange('toDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Info boxes */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <h5 className="font-semibold text-gray-900 mb-2">Authorized By:</h5>
              <p className="text-sm text-gray-700">EDWARD G. BHAGWANI, JD, MNSA, CESO V</p>
              <p className="text-sm text-gray-600">Provincial Director</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <h5 className="font-semibold text-gray-900 mb-2">Property Custodian:</h5>
              <p className="text-sm text-gray-700">MARY LOUISE T. IDULSA</p>
              <p className="text-sm text-gray-600">Administrative Aide IV</p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-200 font-medium"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-navy text-white px-8 py-3 rounded-lg hover:bg-navy-dark transition duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Pass Slip'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          <p className="italic mb-2">"Matino, Mahuway at Maaphan"</p>
          <p>T: (088) 531-1007 | E: <a href="mailto:dilg10.misocc@gmail.com" className="text-navy hover:underline">dilg10.misocc@gmail.com</a></p>
          <p>FB: <a href="https://www.facebook.com/dilgmisoccprovince" target="_blank" rel="noopener noreferrer" className="text-navy hover:underline">www.facebook.com/dilgmisoccprovince</a></p>
        </div>
      </div>
    </div>
  );
};

export default PassSlipForm;
