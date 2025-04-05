// src/contexts/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback(({ message, type = 'success', duration = 3000 }) => {
    const id = Date.now();
    
    setToasts(prevToasts => [
      ...prevToasts,
      { id, message, type, duration }
    ]);

    // Automatically remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  }, [removeToast]);

  const value = {
    toasts,
    showToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-0 right-0 p-4 max-w-xs w-full flex flex-col space-y-4 z-50">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
};

const Toast = ({ toast, removeToast }) => {
  const { id, message, type } = toast;

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 border-green-600';
      case 'error':
        return 'bg-red-500 border-red-600';
      case 'warning':
        return 'bg-yellow-500 border-yellow-600';
      case 'info':
        return 'bg-blue-500 border-blue-600';
      default:
        return 'bg-gray-500 border-gray-600';
    }
  };

  return (
    <div 
      className={`${getTypeClasses()} text-white px-4 py-3 rounded shadow-lg border-l-4 animate-fadeIn relative`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button 
          onClick={() => removeToast(id)} 
          className="text-white hover:text-gray-100 focus:outline-none"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};