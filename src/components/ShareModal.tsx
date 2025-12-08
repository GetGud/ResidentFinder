import { useState } from 'react';
import { X, Link2, Mail, Copy, Check, Facebook, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Property } from '../types';

interface ShareModalProps {
    property: Property | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ShareModal({ property, isOpen, onClose }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    if (!property) return null;

    const shareUrl = `${window.location.origin}/property/${property.id}`;
    const shareText = `Check out ${property.address} - ${property.price}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareViaEmail = () => {
        const subject = encodeURIComponent(`Check out this property: ${property.address}`);
        const body = encodeURIComponent(`I found this great property on ResidentFinder:\n\n${property.address}\n${property.cityStateZip}\n${property.price}\n\n${shareUrl}`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
    };

    const shareViaFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
    };

    const shareViaTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900">Share this property</h3>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Property Preview */}
                        <div className="p-5 bg-gray-50 border-b border-gray-100">
                            <div className="flex gap-4">
                                <img
                                    src={property.image}
                                    alt={property.address}
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900">{property.address}</h4>
                                    <p className="text-sm text-gray-500">{property.cityStateZip}</p>
                                    <p className="text-lg font-bold text-[#134e4a] mt-1">{property.price}</p>
                                </div>
                            </div>
                        </div>

                        {/* Share Options */}
                        <div className="p-5 space-y-4">
                            {/* Copy Link */}
                            <div className="flex gap-2">
                                <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-4 py-2.5">
                                    <Link2 className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                                    <span className="text-sm text-gray-600 truncate">{shareUrl}</span>
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${copied
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-[#134e4a] text-white hover:bg-[#0f3f3c]'
                                        }`}
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            Copy
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Social Share Buttons */}
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    onClick={shareViaEmail}
                                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">Email</span>
                                </button>
                                <button
                                    onClick={shareViaFacebook}
                                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Facebook className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">Facebook</span>
                                </button>
                                <button
                                    onClick={shareViaTwitter}
                                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                                        <Twitter className="w-5 h-5 text-sky-500" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">Twitter</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
