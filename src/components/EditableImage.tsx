"use client";

import React, { useState, useRef } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Camera, Upload, Link as LinkIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EditableImageProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  fallbackInitials?: string;
}

export function EditableImage({
  value,
  onChange,
  className = "",
  fallbackInitials = "KR",
}: EditableImageProps) {
  const { isAdminMode } = usePortfolio();
  const [showModal, setShowModal] = useState(false);
  const [tempUrl, setTempUrl] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onChange(tempUrl);
    setShowModal(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className={`relative group ${className}`}>
        {value ? (
          <img src={value} alt="Image" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-surface-border flex items-center justify-center text-text-muted font-bold text-2xl">
            {fallbackInitials}
          </div>
        )}

        {isAdminMode && (
          <div
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-sm"
            onClick={() => setShowModal(true)}
          >
            <Camera size={32} className="text-white" />
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && isAdminMode && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-surface border border-surface-border p-6 rounded-xl w-full max-w-md relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-foreground"
              >
                <X size={20} />
              </button>
              
              <h2 className="text-xl font-bold text-foreground mb-4">Change Image</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm text-text-muted mb-2">
                    <LinkIcon size={16} /> Image URL
                  </label>
                  <input
                    type="text"
                    value={tempUrl}
                    onChange={(e) => setTempUrl(e.target.value)}
                    placeholder="https://example.com/image.png"
                    className="w-full bg-background border border-surface-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-surface-border"></div>
                  <span className="flex-shrink-0 mx-4 text-text-muted text-sm">OR</span>
                  <div className="flex-grow border-t border-surface-border"></div>
                </div>

                <div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 bg-surface border border-surface-border hover:border-primary text-foreground font-medium py-2 rounded-lg transition-colors"
                  >
                    <Upload size={18} /> Upload Local File
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-border transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-primary text-background font-medium hover:opacity-90 transition-opacity"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
