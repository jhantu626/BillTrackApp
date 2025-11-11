// components/ToastContainer.tsx
import React, { useRef, useCallback, useEffect, useState } from 'react';
import CustomToast, { ToastType, ToastPosition } from './CustomToast';
import ToastService, { ToastOptions } from './ToastService';

interface ToastState extends ToastOptions {
  visible: boolean;
}

const ToastContainer: React.FC = () => {
  const toastRef = useRef<ToastState>({
    visible: false,
    message: '',
    type: 'info',
    position: 'top',
    duration: 2000,
  });

  const [renderKey, setRenderKey] = useState(0);

  const hide = useCallback(() => {
    toastRef.current.visible = false;
    setRenderKey(k => k + 1);
  }, []);

  const show = useCallback((options: ToastOptions) => {
    toastRef.current = { ...options, visible: true };
    setRenderKey(k => k + 1);
  }, []);

  useEffect(() => {
    ToastService.setRef({ show, hide });
  }, [show, hide]);

  const toast = toastRef.current;

  return (
    <CustomToast
      key={renderKey}
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
