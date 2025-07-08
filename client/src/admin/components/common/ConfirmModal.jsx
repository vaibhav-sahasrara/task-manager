// src/components/common/ConfirmModal.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm",
  message = "Are you sure?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black bg-opacity-30 flex justify-center items-center">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 relative"
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
          onClick={onClose}
        >
          <FiX />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmModal;
