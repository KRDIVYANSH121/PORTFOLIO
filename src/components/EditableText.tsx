"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Pencil } from "lucide-react";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  inputClassName?: string;
  multiline?: boolean;
}

export function EditableText({
  value,
  onChange,
  as: Component = "span",
  className = "",
  inputClassName = "",
  multiline = false,
}: EditableTextProps) {
  const { isAdminMode } = usePortfolio();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      handleSave();
    } else if (e.key === "Escape") {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (!isAdminMode) {
    return <Component className={className}>{value}</Component>;
  }

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={`w-full bg-surface border border-primary text-foreground rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary ${inputClassName}`}
          rows={3}
        />
      );
    }
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`w-full bg-surface border border-primary text-foreground rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary ${inputClassName}`}
      />
    );
  }

  return (
    <div className="relative group inline-block w-full">
      <Component className={`${className} group-hover:opacity-70 transition-opacity`}>
        {value || <span className="opacity-50 italic">Empty text</span>}
      </Component>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute -top-2 -right-6 p-1 bg-surface border border-surface-border rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:bg-primary/20"
        title="Edit text"
      >
        <Pencil size={14} />
      </button>
    </div>
  );
}
