import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useToast } from '../../context/ToastContext';

export const AdminShortcutListener = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdminAuthenticated } = useAdminAuth();
  const { info } = useToast();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Secret key trigger: Ctrl + F (or Meta + F on Mac)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault(); // Stop standard browser find popup

        if (location.pathname.startsWith('/admin')) {
          return;
        }

        info("🔐 Secret Key Triggered! Opening Admin Portal...");

        if (isAdminAuthenticated) {
          navigate('/admin');
        } else {
          navigate('/admin/login');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location.pathname, isAdminAuthenticated, info]);

  return null;
};
