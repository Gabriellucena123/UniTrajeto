import React from 'react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 inset-x-4 max-w-sm mx-auto bg-[#0F172A] text-white py-3 px-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 pointer-events-auto z-50 animate-bounce-short">
      <span className="material-symbols-outlined text-[#10B981] text-[22px]">check_circle</span>
      <span className="text-[14px] font-semibold flex-1 leading-tight">{message}</span>
    </div>
  );
};
