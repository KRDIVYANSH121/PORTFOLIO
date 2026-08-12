"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
export interface Skill {
  id: string;
  name: string;
}

export interface SkillCategory {
  id: string;
  domain: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveLink?: string;
  githubLink?: string;
  image?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface PortfolioState {
  hero: {
    name: string;
    headline: string;
    status: string;
    avatarUrl: string;
  };
  about: string;
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
    googleSkills: string;
    email: string;
    youtube: string;
  };
}

const defaultState: PortfolioState = {
  hero: {
    name: "K R Divyansh",
    headline: "Computer Science & Engineering Student @ SRM University AP | Aspiring DevOps & Systems Engineer",
    status: "🟢 Open to Opportunities & Cloud Architecture Projects",
    avatarUrl: "https://avatars.githubusercontent.com/u/121000000?v=4",
  },
  about: "I am a Computer Science & Engineering student at SRM University, Andhra Pradesh. I am a passionate aspiring DevOps Developer and Systems Software Engineer dedicated to building robust and scalable systems.",
  education: [
    {
      id: "edu-1",
      school: "SRM University AP",
      degree: "B.Tech in Computer Science & Engineering",
      year: "2022 - 2026",
    }
  ],
  skills: [
    {
      id: "cat-1",
      domain: "Systems & Low-Level Programming",
      skills: [
        { id: "s1", name: "C Language" },
        { id: "s2", name: "Linux Terminal Operations" },
        { id: "s3", name: "Memory Management" },
        { id: "s4", name: "Data Structures" }
      ]
    },
    {
      id: "cat-2",
      domain: "Cloud & DevOps",
      skills: [
        { id: "s5", name: "Google Cloud Platform" },
        { id: "s6", name: "Infrastructure & Deployment" },
        { id: "s7", name: "Systems Architecture" }
      ]
    },
    {
      id: "cat-3",
      domain: "Tools & Platforms",
      skills: [
        { id: "s8", name: "Git/GitHub" },
        { id: "s9", name: "Docker" },
        { id: "s10", name: "Linux Workflows" },
        { id: "s11", name: "Competitive Programming" }
      ]
    }
  ],
  projects: [
    {
      id: "p1",
      title: "GEM OBLIVIONIS (OBLIVIONIS)",
      description: "High-performance systems architecture and hackathon infrastructure platform.",
      tags: ["Systems", "Architecture", "Infrastructure"],
    },
    {
      id: "p2",
      title: "OmniCript",
      description: "Modern digital identity framework and architecture.",
      tags: ["Digital Identity", "Framework", "Architecture"],
    },
    {
      id: "p3",
      title: "Project Waifu",
      description: "Gamified productivity, study-planning, and task-tracking application.",
      tags: ["Productivity", "Gamification", "Task Tracking"],
    }
  ],
  socials: {
    github: "https://github.com/KRDIVYANSH121",
    linkedin: "https://www.linkedin.com/in/k-r-divyansh-66abb436a",
    instagram: "https://www.instagram.com/krdivyansh.dev",
    googleSkills: "https://www.skills.google/public_profiles/ca212786-8826-4d02-8a4f-eddac2c4d21d",
    email: "mailto:darkphoenix795x@gmail.com",
    youtube: "https://youtube.com/@krdivyansh-dev?si=nZQRldvatzTbYyXQ"
  }
};

interface PortfolioContextType {
  state: PortfolioState;
  setState: React.Dispatch<React.SetStateAction<PortfolioState>>;
  isAdminMode: boolean;
  setIsAdminMode: React.Dispatch<React.SetStateAction<boolean>>;
  saveChanges: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<PortfolioState>(defaultState);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_state");
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse portfolio state from localStorage");
      }
    }
    setIsLoaded(true);
  }, []);

  const saveChanges = () => {
    localStorage.setItem("portfolio_state", JSON.stringify(state));
    setIsAdminMode(false);
  };

  if (!isLoaded) return null; // Or a loading spinner

  return (
    <PortfolioContext.Provider value={{ state, setState, isAdminMode, setIsAdminMode, saveChanges }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
