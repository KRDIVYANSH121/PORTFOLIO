"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export const NeuralBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // load the slim version which is lighter but contains the necessary features
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 w-full h-full -z-10 opacity-70 mix-blend-screen pointer-events-none"
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
          },
          modes: {
            grab: {
              distance: 250,
              links: {
                opacity: 0.9,
                color: "#00F0FF",
              },
            },
          },
        },
        particles: {
          color: {
            value: ["#00F0FF", "#FF0055", "#7000FF", "#FFBD2E"],
          },
          links: {
            color: "#FF0055",
            distance: 180,
            enable: true,
            opacity: 0.8,
            width: 2.5,
            triangles: {
              enable: true,
              opacity: 0.15,
              color: "#7000FF"
            },
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1.2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 120, // Adjust number based on desired density
          },
          opacity: {
            value: 0.9,
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.3,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 2, max: 6 },
            animation: {
              enable: true,
              speed: 4,
              minimumValue: 1,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
