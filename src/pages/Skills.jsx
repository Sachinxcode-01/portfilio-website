import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as d3 from "d3";
import GithubContributions from "../components/GithubContributions";
import GoogleArcadeShowcase from "../components/GoogleArcadeShowcase";
import "./Skills.css";

const SKILLS = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"},
  { name: "Postman", logo: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
];

const ROWS = [
  [
    { title: "Programming Languages", items: ["Python", "C", "C++", "Java"] },
    { title: "Web Technologies", items: ["HTML", "CSS", "JavaScript", "React","Postman"] },
    { title: "Databases & Tools", items: ["MongoDB", "Git","GitHub"] },
    { title: "Frameworks & Libraries", items: ["Tailwind CSS","Node.js","Mongoose","Multer","Express.js","Vite"] },
  ],
  [
    {
      title: "Core Concepts",
      items: [
        "Data Structures & Algorithms",
        "Web Development",
        "Machine Learning",
        "Deep Learning",
      
      ],
    },
    {
      title: "Soft Skills",
      items: ["Teamwork", "Problem Solving", "Creativity", "Adaptability", "Communication"],
    },
  ],
];

export default function Skills() {
  const stageRef = useRef();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Get current dimensions
    const updateDimensions = () => {
      const rect = stage.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    };

    let { width, height } = updateDimensions();

    const elements = Array.from(stage.querySelectorAll(".skill-circle"));

    // Create D3 nodes using element coordinates and dimensions
    const nodes = SKILLS.map((skill, index) => {
      const el = elements[index];
      const radius = el ? el.offsetWidth / 2 : 34; // dynamic radius based on CSS
      return {
        ...skill,
        x: Math.random() * (width - radius * 2) + radius,
        y: Math.random() * (height - radius * 2) + radius,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: radius,
      };
    });

    // Set up D3 simulation with nice cohesive clustering and collision forces
    const simulation = d3.forceSimulation(nodes)
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.04))
      .force("charge", d3.forceManyBody().strength(-20))
      .force("collide", d3.forceCollide().radius(d => d.radius + 12).iterations(3))
      .force("x", d3.forceX(width / 2).strength(0.06))
      .force("y", d3.forceY(height / 2).strength(0.06));

    // Handle Window Resize
    const handleResize = () => {
      const dims = updateDimensions();
      width = dims.width;
      height = dims.height;
      simulation.force("center", d3.forceCenter(width / 2, height / 2).strength(0.04));
      simulation.force("x", d3.forceX(width / 2).strength(0.06));
      simulation.force("y", d3.forceY(height / 2).strength(0.06));
      
      // Update radiuses recursively in case CSS updates standard node sizes
      nodes.forEach((node, index) => {
        const el = elements[index];
        if (el) {
          node.radius = el.offsetWidth / 2;
        }
      });
      simulation.alpha(0.3).restart();
    };
    window.addEventListener("resize", handleResize);

    // 🌊 Gyroscope Device Orientation API to let skills flow like water
    const handleDeviceOrientation = (event) => {
      // event.gamma: left-to-right tilt in degrees [-90, 90]
      // event.beta: front-to-back tilt in degrees [-180, 180]
      const tiltX = event.gamma || 0;
      const tiltY = event.beta || 0;

      // Typical phone resting angles (user holding it at an angle)
      const restingBeta = 45; 
      
      const deltaX = tiltX;
      const deltaY = tiltY - restingBeta;

      // Limit response to reasonable hand tilt angles (-30 to 30 degrees)
      const boundedX = Math.max(-30, Math.min(30, deltaX));
      const boundedY = Math.max(-30, Math.min(30, deltaY));

      const maxShiftX = width * 0.45;
      const maxShiftY = height * 0.45;

      const shiftX = (boundedX / 30) * maxShiftX;
      const shiftY = (boundedY / 30) * maxShiftY;

      // Shift force centers dynamically based on tilt gravity direction
      simulation.force("x", d3.forceX(width / 2 + shiftX).strength(0.18));
      simulation.force("y", d3.forceY(height / 2 + shiftY).strength(0.18));
      simulation.force("center", d3.forceCenter(width / 2 + shiftX, height / 2 + shiftY).strength(0.08));

      simulation.alpha(0.3).restart();
    };

    window.addEventListener("deviceorientation", handleDeviceOrientation);

    // Request iOS orientation permission if required on user interaction
    const requestOrientationPermission = async () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        try {
          const permissionState = await DeviceOrientationEvent.requestPermission();
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", handleDeviceOrientation);
          }
        } catch (error) {
          console.error("DeviceOrientation permission error:", error);
        }
      }
    };

    stage.addEventListener("touchstart", requestOrientationPermission, { once: true });
    stage.addEventListener("click", requestOrientationPermission, { once: true });

    // D3 Tick handles bounding borders and element rendering
    simulation.on("tick", () => {
      nodes.forEach((node, i) => {
        const el = elements[i];
        if (!el) return;

        // Keep inside stage boundary bounds
        const radius = node.radius;
        node.x = Math.max(radius, Math.min(width - radius, node.x));
        node.y = Math.max(radius, Math.min(height - radius, node.y));

        el.style.left = `${node.x - radius}px`;
        el.style.top = `${node.y - radius}px`;
      });
    });

    // Hover Attraction Effect: pull elements toward the cursor organically (magnetic/water follow effect)
    const handleMouseMove = (event) => {
      const rect = stage.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      nodes.forEach((node) => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Attraction range of 220px (skills follow the mouse cursor dynamically)
        if (dist < 220 && dist > 15) {
          const force = (220 - dist) * 0.15;
          // Pull toward the mouse cursor (negative direction of dx and dy)
          node.vx -= (dx / dist) * force * 0.35;
          node.vy -= (dy / dist) * force * 0.35;
        }
      });
      simulation.alpha(0.25).restart();
    };
    stage.addEventListener("mousemove", handleMouseMove);

    // Drag-and-Toss physics using d3-drag
    elements.forEach((el, index) => {
      const node = nodes[index];
      d3.select(el).call(
        d3.drag()
          .on("start", (event) => {
            if (!event.active) simulation.alphaTarget(0.2).restart();
            node.fx = node.x;
            node.fy = node.y;
          })
          .on("drag", (event) => {
            const rect = stage.getBoundingClientRect();
            node.fx = Math.max(node.radius, Math.min(rect.width - node.radius, event.x));
            node.fy = Math.max(node.radius, Math.min(rect.height - node.radius, event.y));
          })
          .on("end", (event) => {
            if (!event.active) simulation.alphaTarget(0);
            node.fx = null;
            node.fy = null;
          })
      );
    });

    return () => {
      simulation.stop();
      window.removeEventListener("resize", handleResize);
      stage.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      stage.removeEventListener("touchstart", requestOrientationPermission);
      stage.removeEventListener("click", requestOrientationPermission);
    };
  }, []);

  return (
    <section className="skills-container" id="skills">
      {/* Header */}
      <motion.div
        className="skills-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-5xl text-cyan-400 font-semibold mb-3">My Skills</h2>
        <div className="w-28 h-[2px] bg-cyan-400 mb-6"></div>
        <p className="text-gray-400 text-lg max-w-xl">
          ✨ Technical expertise blended with creativity — explore my core competencies below.
        </p>
      </motion.div>

      {/* Floating Physics Stage */}
      <motion.div
        className="skills-stage relative mx-auto mb-20"
        ref={stageRef}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.name}
            className="skill-circle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
            whileHover={{
              scale: 1.15,
              boxShadow: "0 0 25px 5px rgba(0,200,255,0.45)",
              background: "rgba(0,200,255,0.12)",
            }}
          >
            <motion.img
              src={s.logo}
              alt={s.name}
              whileHover={{
                filter: "drop-shadow(0 0 10px rgba(0,200,255,0.8)) brightness(1.5)",
                rotate: [0, 8, -8, 0],
                transition: { duration: 0.4 },
              }}
            />
            <span>{s.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Skills Table (Categorized Text Grid) */}
      <div className="skills-table">
        {ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="skills-row">
            {row.map((col, colIndex) => (
              <motion.div
                key={col.title}
                className="skill-box"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{
                  duration: 0.5,
                  delay: (rowIndex + colIndex) * 0.08,
                }}
              >
                <h3 className="text-xl text-cyan-400 font-semibold mb-3">{col.title}</h3>
                <ul>
                  {col.items.map((item, i) => (
                    <motion.li key={i} whileHover={{ x: 6, color: "#00ffc8" }}>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Google Cloud Arcade Facilitator & Cloud Skills */}
      <GoogleArcadeShowcase />

      {/* GitHub Contributions & Activity Suite */}
      <GithubContributions />
    </section>
  );
}
