// components/ToastContainer.tsx
import React, { useState, useCallback, useEffect } from 'react';
import CustomToast, { ToastType, ToastPosition } from './CustomToast';
import ToastService, { ToastOptions } from './ToastService';

interface ToastState extends ToastOptions {
  visible: boolean;
}

const ToastContainer: React.FC = () => {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'info',
    position: 'top',
    duration: 2000,
  });

  const hide = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const show = useCallback(
    ({ message, type = 'info', position = 'top', duration = 2000 }: ToastOptions) => {
      setToast({ visible: true, message, type, position, duration });
    },
    []
  );

  useEffect(() => {
    ToastService.setRef({ show, hide });
  }, [show, hide]);

  return (
    <CustomToast
      visible={toast.visible}
      message={toast.message}
      type={toast.type as ToastType}
      position={toast.position as ToastPosition}
      duration={toast.duration}
      onHide={hide}
    />
  );
};

export default ToastContainer;
