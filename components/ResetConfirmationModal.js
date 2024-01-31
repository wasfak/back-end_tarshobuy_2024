// ResetConfirmationModal.js
import React from "react";

const ResetConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-md">
            <p>Are you sure you want to reset the total search count?</p>
            <div className="flex justify-end mt-4">
              <button className="mr-2" onClick={onConfirm}>
                Yes
              </button>
              <button onClick={onClose}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetConfirmationModal;
