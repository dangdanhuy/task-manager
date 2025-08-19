import React from 'react';

function Alert({ message, type, onClose }) {
  return (
    <div className={`alert alert-${type}`}>
      {message}
      {onClose && <button onClick={onClose} className="alert-close">&times;</button>}
    </div>
  );
}

export default Alert;