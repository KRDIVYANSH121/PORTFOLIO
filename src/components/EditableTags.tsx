"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Plus, X } from "lucide-react";

interface EditableTagsProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}

export function EditableTags({ tags, onChange, className = "" }: EditableTagsProps) {
  const { isAdminMode } = usePortfolio();
  const [inputValue, setInputValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onChange([...tags, inputValue.trim()]);
      setInputValue("");
      setIsAdding(false);
    } else if (e.key === "Escape") {
      setInputValue("");
      setIsAdding(false);
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag, index) => (
        <span
          key={index}
          className="group relative px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/80 transition-colors"
        >
          {tag}
          {isAdminMode && (
            <button
              onClick={() => handleRemove(index)}
              className="absolute -top-1.5 -right-1.5 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <X size={10} />
            </button>
          )}
        </span>
      ))}
      
      {isAdminMode && (
        isAdding ? (
          <input
            type="text"
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAdd}
            onBlur={() => setIsAdding(false)}
            placeholder="Add tag..."
            className="px-2 py-1 bg-surface border border-primary text-xs text-white rounded-full focus:outline-none w-24"
          />
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="px-2 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-medium text-primary hover:bg-primary/20 transition-colors flex items-center gap-1"
          >
            <Plus size={12} /> Add
          </button>
        )
      )}
    </div>
  );
}
