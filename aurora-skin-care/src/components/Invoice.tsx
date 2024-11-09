import React from 'react';
import { InvoiceModel } from '../types';

interface InvoiceProps {
  invoice: InvoiceModel;
}

const Invoice: React.FC<InvoiceProps> = ({ invoice }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="bg-blue-600 text-white text-center py-4">
        <h2 className="text-xl font-semibold">Invoice</h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-semibold">Appointment ID:</span>
          <span className="text-gray-800">{invoice.appointmentId}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-semibold">Patient Name:</span>
          <span className="text-gray-800">{invoice.patientName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-semibold">Treatments:</span>
          <span className="text-gray-800">{invoice.treatmentTypes.join(', ')}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-semibold">Registration Fee:</span>
          <span className="text-gray-800">${invoice.registrationFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center border-t border-gray-300 pt-4">
          <span className="text-gray-600 font-semibold">Total Fee:</span>
          <span className="text-gray-800 font-bold">${invoice.totalFee.toFixed(2)}</span>
        </div>
      </div>
      <div className="bg-gray-100 p-4 text-center">
        <h3 className="text-gray-700 font-semibold">Thank you for choosing Aurora Skin Care!</h3>
      </div>
    </div>
  );
};

export default Invoice;
