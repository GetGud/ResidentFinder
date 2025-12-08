import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true
}: ModalProps) {
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl'
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', duration: 0.3 }}
                        className={cn(
                            "relative bg-white rounded-xl shadow-2xl w-full",
                            sizeClasses[size]
                        )}
                    >
                        {/* Header */}
                        {(title || showCloseButton) && (
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                {title && (
                                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                                )}
                                {showCloseButton && (
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Body */}
                        <div className="p-4">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

// Confirmation Dialog Component
interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'primary';
}

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'primary'
}: ConfirmDialogProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex gap-3 justify-end">
                <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                    {cancelText}
                </button>
                <button
                    onClick={() => { onConfirm(); onClose(); }}
                    className={cn(
                        "px-4 py-2 rounded-lg font-bold transition-colors",
                        variant === 'danger'
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-[#134e4a] text-white hover:bg-[#0f3f3c]"
                    )}
                >
                    {confirmText}
                </button>
            </div>
        </Modal>
    );
}

export default Modal;
