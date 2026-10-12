import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const success = useCallback((msg, duration) => addToast(msg, 'success', duration), [addToast]);
  const error = useCallback((msg, duration) => addToast(msg, 'error', duration), [addToast]);
  const info = useCallback((msg, duration) => addToast(msg, 'info', duration), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, success, error, info, removeToast }}>
      {children}
      {/* Toast Render Container */}
      <div 
        aria-live="polite" 
        className="fixed top-20 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-2 sm:px-0"
      >
        <AnimatePresence>
          {toasts.map(toast => {
            const isSuccess = toast.type === 'success';
            const isError = toast.type === 'error';
            
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-2xl shadow-float border ${
                  isSuccess 
                    ? 'bg-emerald-950/90 text-emerald-100 border-emerald-800/80 backdrop-blur-md'
                    : isError
                    ? 'bg-rose-950/90 text-rose-100 border-rose-800/80 backdrop-blur-md'
                    : 'bg-slate-900/90 text-slate-100 border-slate-800/80 backdrop-blur-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isSuccess && <i className="fa-solid fa-circle-check text-emerald-400 text-lg shrink-0" aria-hidden="true" />}
                  {isError && <i className="fa-solid fa-circle-exclamation text-rose-400 text-lg shrink-0" aria-hidden="true" />}
                  {!isSuccess && !isError && <i className="fa-solid fa-circle-info text-orange-400 text-lg shrink-0" aria-hidden="true" />}
                  <p className="text-sm font-semibold tracking-tight pr-2">{toast.message}</p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  aria-label="Close notification"
                >
                  <i className="fa-solid fa-xmark text-xs" aria-hidden="true" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
