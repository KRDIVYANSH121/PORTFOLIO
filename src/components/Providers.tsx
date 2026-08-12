"use client";

import { PortfolioProvider } from "@/context/PortfolioContext";
import { AdminMode } from "./AdminMode";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PortfolioProvider>
      <AdminMode />
      {children}
    </PortfolioProvider>
  );
}
