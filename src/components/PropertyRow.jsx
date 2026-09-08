import React from 'react';

const PropertyRow = ({ property, index, onChange, onRemove, canRemove }) => {
  const handleChange = (field, value) => {
    onChange(index, { ...property, [field]: value });
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-2">
        <input
          type="text"
          value={property.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter item description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
          required
        />
      </td>
      <td className="p-2">
        <input
          type="text"
          value={property.serialNumber}
          onChange={(e) => handleChange('serialNumber', e.target.value)}
          placeholder="Serial number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
        />
      </td>
      <td className="p-2">
        <input
          type="number"
          value={property.quantity}
          onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)}
          min="1"
          placeholder="Qty"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
          required
        />
      </td>
      <td className="p-2">
        <select
          value={property.condition}
          onChange={(e) => handleChange('condition', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
          required
        >
          <option value="">Select</option>
          <option value="Good">Good</option>
          <option value="Defective">Defective</option>
        </select>
      </td>
      <td className="p-2">
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-200 text-sm"
          >
            Remove
          </button>
        )}
      </td>
    </tr>
  );
};

export default PropertyRow;
