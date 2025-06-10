import React from 'react';
import Button from './Button';
import '../../styles/components/ConfirmModal.css';

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-content">
        <p>{message}</p>
        <div className="confirm-modal-actions">
          <Button variant="outline" onClick={onCancel}>
            Hủy
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;