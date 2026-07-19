import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

interface Toast {
  id: number;
  message: string;
}

interface ToastContextValue {
  show(message: string): void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<readonly Toast[]>([]);
  const show = useCallback((message: string) => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 2800);
  }, []);
  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="polite" className="fixed bottom-5 right-5 z-50 grid gap-2">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast-enter rounded-xl border border-white/20 bg-slate-950 px-4 py-3 text-sm text-white shadow-2xl dark:bg-white dark:text-slate-950">
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within ToastProvider.');
  }

  return context;
}
