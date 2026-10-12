import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'bottom' // 'bottom' or 'right'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isBottom = position === 'bottom';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <div className={`fixed inset-0 pointer-events-none flex ${isBottom ? 'items-end' : 'justify-end'}`}>
            <motion.div
              initial={isBottom ? { y: '100%' } : { x: '100%' }}
              animate={isBottom ? { y: 0 } : { x: 0 }}
              exit={isBottom ? { y: '100%' } : { x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className={`pointer-events-auto bg-white shadow-2xl overflow-hidden flex flex-col ${
                isBottom 
                  ? 'w-full max-h-[85vh] rounded-t-3xl sm:rounded-t-4xl' 
                  : 'h-full w-full max-w-md'
              }`}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-2">
                  {isBottom && <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto absolute top-2.5 left-1/2 -translate-x-1/2" />}
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">{title}</h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Close drawer"
                >
                  <i className="fa-solid fa-xmark text-sm" aria-hidden="true" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-6 overflow-y-auto flex-1">
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
