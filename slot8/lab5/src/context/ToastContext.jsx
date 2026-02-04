import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    variant: 'success',
  });

  const showToast = useCallback((message, variant = 'success') => {
    setToast({ show: true, message, variant });
  }, []);

  const hideToast = useCallback(() => {
    setToast((t) => ({ ...t, show: false }));
  }, []);

  const value = useMemo(() => ({ toast, showToast, hideToast }), [toast, showToast, hideToast]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

