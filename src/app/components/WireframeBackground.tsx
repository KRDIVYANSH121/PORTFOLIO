"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function WireframeBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    // loadSlim is used for a lighter bundle size while still including standard features like links
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.6,
                color: "#e11d48", // Rose/Crimson grab line
              },
            },
          },
        },
        particles: {
          color: {
            value: ["#e11d48", "#3b82f6", "#0ea5e9"], // Crimson and Blue nodes
          },
          links: {
            color: "#64748b", // Subtle slate color for the wireframe structure
            distance: 150,
            enable: true,
            opacity: 0.25,
            width: 1,
            triangles: {
              enable: false,
            },
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.8,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 900,
            },
            value: 65,
          },
          opacity: {
            value: 0.7,
          },
          shape: {
            type: ["circle", "image"],
            options: {
              image: [
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", width: 100, height: 100 },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg", width: 100, height: 100 },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", width: 100, height: 100 },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", width: 100, height: 100 },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", width: 100, height: 100 },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", width: 100, height: 100 },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg", width: 100, height: 100 },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", width: 100, height: 100 },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg", width: 100, height: 100 },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kaggle/kaggle-original.svg", width: 100, height: 100 }
              ]
            },
          },
          size: {
            value: { min: 4, max: 24 },
          },
        },
        detectRetina: true,
      }}
      className="fixed inset-0 -z-50 pointer-events-none"
    />
  );
}
