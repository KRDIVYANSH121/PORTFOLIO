"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { EditableText } from "@/components/EditableText";
import { EditableImage } from "@/components/EditableImage";
import { EditableTags } from "@/components/EditableTags";
import { Terminal, Code2, Plus, Trash2, Building2, GraduationCap, TriangleAlert, MousePointerClick, User } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiGooglecloud } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { NeuralBackground } from "@/components/NeuralBackground";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { state, setState, isAdminMode } = usePortfolio();
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [terminalInput, setTerminalInput] = useState("");
  const [showSudoWarning, setShowSudoWarning] = useState(false);
  
  // Parallax scroll for background
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Mouse position for radial hover effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  // Handlers (Hero, Skills, Projects, Education, Terminal)
  const handleHeroChange = (key: keyof typeof state.hero, value: string) => {
    setState({ ...state, hero: { ...state.hero, [key]: value } });
  };

  const handleAddSkill = (categoryId: string) => {
    const newSkill = { id: `s-${Date.now()}`, name: "New Skill" };
    const newSkills = state.skills.map((cat) =>
      cat.id === categoryId ? { ...cat, skills: [...cat.skills, newSkill] } : cat
    );
    setState({ ...state, skills: newSkills });
  };

  const handleUpdateSkill = (categoryId: string, skillId: string, value: string) => {
    const newSkills = state.skills.map((cat) =>
      cat.id === categoryId
        ? { ...cat, skills: cat.skills.map((s) => (s.id === skillId ? { ...s, name: value } : s)) }
        : cat
    );
    setState({ ...state, skills: newSkills });
  };

  const handleDeleteSkill = (categoryId: string, skillId: string) => {
    const newSkills = state.skills.map((cat) =>
      cat.id === categoryId
        ? { ...cat, skills: cat.skills.filter((s) => s.id !== skillId) }
        : cat
    );
    setState({ ...state, skills: newSkills });
  };

  const handleAddProject = () => {
    const newProject = {
      id: `p-${Date.now()}`,
      title: "New Project",
      description: "Project description goes here.",
      tags: ["React", "Next.js"],
    };
    setState({ ...state, projects: [...state.projects, newProject] });
  };

  const handleUpdateProject = (projectId: string, key: string, value: string) => {
    const newProjects = state.projects.map((p) =>
      p.id === projectId ? { ...p, [key]: value } : p
    );
    setState({ ...state, projects: newProjects });
  };

  const handleDeleteProject = (projectId: string) => {
    setState({ ...state, projects: state.projects.filter((p) => p.id !== projectId) });
  };

  const handleAddEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      school: "New University",
      degree: "Degree Name",
      year: "202X - 202Y"
    };
    setState({ ...state, education: [...(state.education || []), newEdu] });
  };

  const handleUpdateEducation = (eduId: string, key: string, value: string) => {
    const newEdu = state.education.map((e) =>
      e.id === eduId ? { ...e, [key]: value } : e
    );
    setState({ ...state, education: newEdu });
  };

  const handleDeleteEducation = (eduId: string) => {
    setState({ ...state, education: state.education.filter((e) => e.id !== eduId) });
  };

  const handleTerminalCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = terminalInput.trim();
      const cmdArgs = input.split(" ");
      const cmd = cmdArgs[0].toLowerCase();
      const args = cmdArgs.slice(1);
      
      if (!cmd) return;
      
      let res: string | string[] = "";
      
      switch (cmd) {
        case "help":
          res = [
            "Available commands:",
            "  whoami       - Display current user info",
            "  ls           - List directory contents",
            "  cat <file>   - Read file contents",
            "  clear        - Clear the terminal",
            "  date         - Print system date",
            "  sudo         - ???"
          ];
          break;
        case "whoami":
          res = `> ${state.hero.name} (Systems & DevOps Enthusiast)`;
          break;
        case "ls":
          res = "about.txt   skills.txt   education.json   projects.md";
          break;
        case "cat":
          if (args[0] === "skills.txt") {
            res = state.skills.flatMap(c => c.skills.map(s => s.name)).join(", ");
          } else if (args[0] === "about.txt") {
            res = state.hero.headline;
          } else if (args[0] === "projects.md") {
            res = state.projects.map(p => `- ${p.title}`).join("\n");
          } else if (args[0] === "education.json") {
            res = JSON.stringify(state.education?.map(e => ({ school: e.school, degree: e.degree })), null, 2);
          } else if (!args[0]) {
            res = "cat: missing file operand. Try 'ls' to see available files.";
          } else {
            res = `cat: ${args[0]}: No such file or directory`;
          }
          break;
        case "pwd":
          res = "/home/krdivyansh";
          break;
        case "date":
          res = new Date().toString();
          break;
        case "echo":
          res = args.join(" ");
          break;
        case "sudo":
          res = "krdivyansh is not in the sudoers file. This incident will be reported.";
          setShowSudoWarning(true);
          setTimeout(() => setShowSudoWarning(false), 10000);
          break;
        case "admin":
          res = "> Prompt: Press Ctrl+Shift+A to enter Admin Access Code...";
          break;
        case "clear":
          setTerminalOutput([]);
          setTerminalInput("");
          return;
        default:
          res = `> command not found: ${cmd}. Type 'help' for available commands.`;
      }
      
      const newOutput = [...terminalOutput, `$ ${input}`];
      if (Array.isArray(res)) {
        res.forEach(line => newOutput.push(line));
      } else {
        res.split("\n").forEach(line => newOutput.push(line));
      }
      
      setTerminalOutput(newOutput);
      setTerminalInput("");
    }
  };

  // Safe fallback for email backwards compatibility
  const emailLink = state.socials.email || "mailto:darkphoenix795x@gmail.com";

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-white selection:bg-primary/30 selection:text-primary overflow-hidden">
      {/* Immersive Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
        <NeuralBackground />
        <motion.div 
          style={{ y: yBg }} 
          className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"
        />
        {/* Dynamic ambient lights */}
        <div 
          className="absolute w-[80vw] h-[80vw] rounded-full blur-[160px] opacity-20 bg-gradient-to-tr from-[#FF0055] via-[#050505] to-[#00F0FF] transition-transform duration-[10s] ease-linear infinite animate-spin-slow"
          style={{ top: '-40vw', left: '-20vw' }}
        />
        <div 
          className="absolute w-[60vw] h-[60vw] rounded-full blur-[160px] opacity-10 bg-gradient-to-bl from-[#7000FF] to-[#FFBD2E] transition-transform duration-[15s] ease-linear infinite animate-spin-reverse"
          style={{ bottom: '-30vw', right: '-10vw' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
      </div>

      <main className="relative z-10 flex flex-col items-center w-full px-6 sm:px-12 py-24 md:py-32 max-w-7xl mx-auto space-y-48">
        
        {/* Hero Section */}
        <section className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-12 pt-12 perspective-1000">
          <motion.div 
            initial={{ opacity: 0, rotateX: 20, y: 50 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="flex-1 space-y-10 text-center lg:text-left flex flex-col items-center lg:items-start relative z-20"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
              </span>
              <EditableText 
                value={state.hero.status} 
                onChange={(v) => handleHeroChange("status", v)} 
                className="whitespace-nowrap text-sm font-semibold tracking-wide text-[#10B981]"
              />
            </div>
            
            <div className="space-y-6 w-full relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-transparent blur-3xl -z-10" />
              <EditableText 
                as="h1"
                value={state.hero.name}
                onChange={(v) => handleHeroChange("name", v)}
                className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-100 to-gray-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                inputClassName="text-6xl sm:text-7xl md:text-8xl font-black"
              />
              <EditableText 
                as="p"
                multiline
                value={state.hero.headline}
                onChange={(v) => handleHeroChange("headline", v)}
                className="text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-light"
              />
            </div>

            {/* Social Links Matrix */}
            <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
              {[
                { icon: <FaGithub />, link: state.socials.github, color: "hover:border-white hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]" },
                { icon: <FaLinkedin />, link: state.socials.linkedin, color: "hover:border-[#0A66C2] hover:text-[#0A66C2] hover:shadow-[0_0_20px_rgba(10,102,194,0.3)]" },
                { icon: <FaYoutube />, link: state.socials.youtube || "https://youtube.com/@krdivyansh-dev?si=nZQRldvatzTbYyXQ", color: "hover:border-[#FF0000] hover:text-[#FF0000] hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]" },
                { icon: <MdEmail />, link: emailLink, color: "hover:border-[#EA4335] hover:text-[#EA4335] hover:shadow-[0_0_20px_rgba(234,67,53,0.3)]" },
                { icon: <FaInstagram />, link: state.socials.instagram, color: "hover:border-[#E1306C] hover:text-[#E1306C] hover:shadow-[0_0_20px_rgba(225,48,108,0.3)]" },
                { icon: <SiGooglecloud />, link: state.socials.googleSkills, color: "hover:border-[#FBBC05] hover:text-[#FBBC05] hover:shadow-[0_0_20px_rgba(251,188,5,0.3)]" },
              ].map((item, i) => (
                <a key={i} href={item.link} target="_blank" rel="noreferrer" 
                   className={`p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-2xl text-gray-200 transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-white/20 ${item.color}`}>
                  {item.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative group z-10"
          >
            {/* Holographic rings */}
            <div className="absolute inset-0 border border-primary/30 rounded-full scale-[1.15] animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-0 border border-secondary/20 rounded-full scale-[1.3] animate-[spin_15s_linear_infinite_reverse]" />
            
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF] to-[#7000FF] rounded-full blur-[60px] opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/20 bg-black backdrop-blur-3xl shadow-[0_0_50px_rgba(255,0,85,0.3)] flex-shrink-0 relative z-20">
              <EditableImage 
                value={state.hero.avatarUrl} 
                onChange={(v) => handleHeroChange("avatarUrl", v)}
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                fallbackInitials="KRD"
              />
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section className="w-full max-w-4xl mx-auto space-y-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F0FF]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
          
          <div className="flex flex-col items-center justify-center gap-6 border-b border-white/10 pb-8">
            <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 inline-flex items-center gap-4">
              <User className="text-primary" size={40} /> About Me
            </h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 text-center md:text-left leading-relaxed text-gray-100 text-lg md:text-xl font-light hover:border-primary/50 transition-all duration-500 shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <EditableText 
              as="p"
              multiline
              value={state.about}
              onChange={(v) => setState({ ...state, about: v })}
              className="relative z-10"
            />
          </motion.div>
        </section>

        {/* 3D Glass Terminal */}
        <motion.section 
          initial={{ opacity: 0, rotateX: 20, y: 100 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto perspective-1000"
        >
          <div className="bg-black/80 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.9)] font-mono text-sm relative group hover:border-white/40 transition-colors duration-500">
            {showSudoWarning && (
              <div className="absolute inset-0 z-50 bg-red-950/90 flex flex-col items-center justify-center animate-pulse backdrop-blur-md">
                <TriangleAlert size={80} className="text-red-500 mb-6 animate-bounce drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                <h3 className="text-red-500 font-black text-2xl md:text-4xl tracking-[0.2em] text-center px-4 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                  SECURITY INCIDENT REPORTED
                </h3>
              </div>
            )}
            
            {/* Window Controls & Header */}
            <div className="bg-gradient-to-b from-white/10 to-transparent flex items-center px-6 py-4 border-b border-white/10">
              <div className="flex gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-[0_0_10px_rgba(255,95,86,0.5)] group-hover:shadow-[0_0_15px_rgba(255,95,86,0.8)] transition-shadow"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-[0_0_10px_rgba(255,189,46,0.5)] group-hover:shadow-[0_0_15px_rgba(255,189,46,0.8)] transition-shadow"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-[0_0_10px_rgba(39,201,63,0.5)] group-hover:shadow-[0_0_15px_rgba(39,201,63,0.8)] transition-shadow"></div>
              </div>
              <span className="mx-auto flex items-center gap-2 text-xs font-bold text-gray-400 tracking-widest uppercase">
                <Terminal size={14} className="text-primary" /> krdivyansh@system ~ root
              </span>
            </div>
            
            {/* Terminal Body */}
            <div className="p-8 h-80 overflow-y-auto space-y-4 text-[#00F0FF] custom-scrollbar relative bg-black/40">
              <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
              
              {terminalOutput.map((line, i) => (
                <p key={i} className={`leading-relaxed ${line.startsWith("$") ? "text-[#10B981] font-semibold mt-4" : line.startsWith(">") ? "text-[#00F0FF]/70" : "text-[#00F0FF]/90"}`}>{line}</p>
              ))}
              
              <div className="flex items-center gap-4 pt-4 mt-2">
                <span className="text-[#10B981] font-black text-lg animate-pulse">❯</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleTerminalCommand}
                  className="flex-1 bg-transparent outline-none text-[#10B981] text-base placeholder-[#10B981]/50 focus:ring-0"
                  placeholder="execute command..."
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Education Bento Grid */}
        <section className="w-full space-y-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 inline-flex items-center gap-6">
                <GraduationCap className="text-secondary" size={48} /> Academic Journey
              </h2>
            </div>
            {isAdminMode && (
              <button onClick={handleAddEducation} className="btn-admin">
                <Plus size={16} /> Add Education
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(state.education || []).map((edu, idx) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={edu.id}
                className="group relative bg-black/80 backdrop-blur-xl border border-white/20 rounded-3xl p-10 hover:border-secondary/70 hover:bg-secondary/10 transition-all duration-500 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {isAdminMode && (
                  <button onClick={() => handleDeleteEducation(edu.id)} className="btn-admin-delete">
                    <Trash2 size={16} />
                  </button>
                )}

                <div className="relative z-10 space-y-4">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-400 mb-2">
                    <EditableText value={edu.year} onChange={(v) => handleUpdateEducation(edu.id, "year", v)} />
                  </div>
                  <EditableText 
                    as="h3" 
                    value={edu.school} 
                    onChange={(v) => handleUpdateEducation(edu.id, "school", v)}
                    className="text-3xl font-black text-white group-hover:text-secondary transition-colors"
                  />
                  <EditableText 
                    as="p" 
                    value={edu.degree} 
                    onChange={(v) => handleUpdateEducation(edu.id, "degree", v)}
                    className="text-xl text-gray-400 font-light"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack Bento Grid */}
        <section className="w-full space-y-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
          
          <div className="text-center space-y-6 mb-16">
              <h2 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 inline-flex items-center gap-6 justify-center">
                <Code2 className="text-primary" size={48} /> Technical Arsenal
              </h2>
              <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto drop-shadow-md">Core competencies, domain expertise, and tools I use to build scalable systems.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {state.skills.map((category, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={category.id} 
                className="group relative bg-black/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:border-primary/70 hover:shadow-[0_0_60px_rgba(0,240,255,0.2)] transition-all duration-500 flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.8)]"
              >
                <EditableText 
                  as="h3" 
                  value={category.domain} 
                  onChange={() => {}}
                  className="text-2xl font-black text-white mb-8 group-hover:text-primary transition-colors" 
                />
                
                <ul className="space-y-4 flex-1">
                  {category.skills.map((skill) => (
                    <li key={skill.id} className="flex items-center justify-between group/skill bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-gray-600 group-hover/skill:bg-primary group-hover/skill:shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all" />
                        <EditableText 
                          value={skill.name} 
                          onChange={(v) => handleUpdateSkill(category.id, skill.id, v)} 
                          className="text-gray-300 font-medium group-hover/skill:text-white transition-colors"
                        />
                      </div>
                      {isAdminMode && (
                        <button onClick={() => handleDeleteSkill(category.id, skill.id)} className="text-red-400 hover:text-red-300">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                
                {isAdminMode && (
                  <button onClick={() => handleAddSkill(category.id)} className="w-full mt-6 py-3 flex items-center justify-center gap-2 text-sm text-primary/70 hover:text-primary bg-primary/5 hover:bg-primary/10 border border-dashed border-primary/30 hover:border-primary/50 rounded-xl transition-all font-bold">
                    <Plus size={16} /> Add Skill
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Projects Showcase */}
        <section className="w-full space-y-16">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-white/10 pb-8">
            <h2 className="text-5xl md:text-6xl font-black inline-flex items-center gap-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              <Building2 className="text-primary" size={48} /> Architected Systems
            </h2>
            {isAdminMode && (
              <button onClick={handleAddProject} className="btn-admin">
                <Plus size={16} /> Deploy New System
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {state.projects.map((project, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={project.id}
                className="group relative bg-[#050505] rounded-[2rem] overflow-hidden flex flex-col border-2 border-white/10 hover:border-primary/50 transition-all duration-700 hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] hover:-translate-y-2"
              >
                
                <div className="h-72 w-full relative overflow-hidden bg-[#0A0A0A]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-90 pointer-events-none" />
                  <EditableImage 
                    value={project.image || ""} 
                    onChange={(v) => handleUpdateProject(project.id, "image", v)}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                    fallbackInitials={project.title.substring(0, 2).toUpperCase()}
                  />
                  {/* Hover Overlay info icon */}
                  <div className="absolute top-6 left-6 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <MousePointerClick size={18} />
                  </div>
                </div>

                <div className="p-10 flex-1 flex flex-col space-y-6 relative z-20 -mt-16 bg-gradient-to-b from-transparent via-[#050505] to-[#050505]">
                  <EditableText 
                    as="h3" 
                    value={project.title} 
                    onChange={(v) => handleUpdateProject(project.id, "title", v)}
                    className="text-3xl font-black text-white group-hover:text-primary transition-colors duration-500"
                  />
                  
                  <EditableText 
                    as="p" 
                    multiline
                    value={project.description} 
                    onChange={(v) => handleUpdateProject(project.id, "description", v)}
                    className="text-gray-200 text-lg leading-relaxed font-light flex-1"
                  />

                  <div className="pt-6 border-t border-white/10 relative z-30">
                    <EditableTags 
                      tags={project.tags || []} 
                      onChange={(newTags) => handleUpdateProject(project.id, "tags", newTags as any)} 
                      className="gap-3"
                    />
                  </div>
                </div>

                {/* Delete Button moved to end to ensure it sits on top of all other elements */}
                {isAdminMode && (
                  <button onClick={() => handleDeleteProject(project.id)} className="btn-admin-delete top-6 right-6 z-[100]">
                    <Trash2 size={16} /> Delete
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-white/20 pt-12 pb-16 flex flex-col md:flex-row items-center justify-between text-gray-300 font-medium">
          <p>© {new Date().getFullYear()} K R Divyansh. All rights reserved.</p>
          <p className="flex items-center gap-2 mt-6 md:mt-0">
            Engineered with <span className="text-primary font-bold px-1 cursor-pointer hover:scale-150 transition-transform" onDoubleClick={() => !isAdminMode && window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', ctrlKey: true, shiftKey: true }))}>⚡</span> Admin Access
          </p>
        </footer>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
        
        .btn-admin {
          @apply flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 text-primary rounded-xl text-sm font-bold hover:bg-primary/20 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,240,255,0.1)];
        }
        
        .btn-admin-delete {
          @apply absolute p-3 bg-red-600 backdrop-blur-md text-white font-bold text-xs rounded-xl opacity-100 transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:bg-red-500 hover:scale-105 border border-red-400/50 flex items-center gap-2;
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
