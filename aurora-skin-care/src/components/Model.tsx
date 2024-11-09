import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  fee: number;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, fee, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded shadow-md p-6">
        <h2 className="text-xl mb-4">Confirm Appointment</h2>
        <p className="mb-4">Registration Fee: LKR {fee}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 bg-gray-300 text-black rounded px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white rounded px-4 py-2"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
