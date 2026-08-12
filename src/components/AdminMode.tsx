"use client";

import React, { useEffect, useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Lock, Unlock, X, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AdminMode() {
  const { isAdminMode, setIsAdminMode, saveChanges } = usePortfolio();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setShowModal(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAdminMode(true);
      setShowModal(false);
      setPassword("");
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500); // Reset for shake animation
    }
  };

  return (
    <>
      {/* Admin Status Banner */}
      <AnimatePresence>
        {isAdminMode && (
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            className="fixed top-0 left-0 right-0 z-50 bg-primary/10 border-b border-primary/30 backdrop-blur-md px-4 py-2 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 text-primary font-medium text-sm">
              <Unlock size={16} />
              <span>⚡ Admin Mode Active | Click any pencil icon to edit or add content</span>
            </div>
            <button
              onClick={saveChanges}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary rounded-md text-sm font-medium transition-colors"
            >
              <Save size={16} />
              Lock & Save
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={error ? { x: [-10, 10, -10, 10, 0] } : { opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-surface border border-surface-border p-6 rounded-xl w-full max-w-sm relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-foreground"
              >
                <X size={20} />
              </button>
              
              <div className="flex flex-col items-center mb-6">
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-3">
                  <Lock size={24} />
                </div>
                <h2 className="text-xl font-bold text-foreground">Admin Access</h2>
                <p className="text-sm text-text-muted text-center mt-1">Enter the secret code to unlock edit mode.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter passcode..."
                    autoFocus
                    className={`w-full bg-background border ${error ? 'border-red-500' : 'border-surface-border'} rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors`}
                  />
                  {error && <p className="text-red-500 text-xs mt-1">Incorrect passcode</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-background font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Unlock
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
