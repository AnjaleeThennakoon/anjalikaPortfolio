import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// ── Asset imports ─────────────────────────────────────────────────────────
import anjaleeCV    from "./assets/anjalee_cv_pink.pdf";
import gameImg      from "./assets/game_workshop.png";
import hospitalImg  from "./assets/hospital_s_system.png";
import juwallaryImg from "./assets/juwallary .png";
import nexoraImg    from "./assets/nexora_event.png";
import petappImg    from "./assets/petapp.png";
import ss1Img       from "./assets/Screenshot 2026-02-19 010034.png";
import ss2Img       from "./assets/Screenshot 2026-02-19 010044.png";
import udemyImg     from "./assets/udemy_flutter .png";
import profileImg   from "./assets/nsbm_cssl.jpeg";
import binaryImg    from "./assets/binaybeats.png";
import figmateImg   from "./assets/figmate .png";
import fossImg      from "./assets/foss.png";

// ── Data ──────────────────────────────────────────────────────────────────
const PERSONALITY_FACTS = [
  { emoji: "☕", text: "Codes better after a strong cup of tea. Always." },
  { emoji: "🌙", text: "Night owl alert — best commits happen after midnight." },
  { emoji: "🎨", text: "Can't write backend code without having a Figma tab open." },
  { emoji: "🤖", text: "Built a robot car just to flex at family gatherings." },
  { emoji: "🌿", text: "Studies at the only green university in Sri Lanka. Literally." },
  { emoji: "🐛", text: "Treats every bug like a mystery novel. Loves the plot twist." },
];

const projects = [
  {
    id: 1, num: "01", year: "2025", color: "teal",
    title: "CrystalBid — Jewelry Auction Platform",
    category: "Full-Stack Web Application",
    desc: "A secure, scalable jewelry auction platform with real-time bidding, user management, and payment integration built on ASP.NET Core.",
    tech: ["ASP.NET Core", "C#", "React", "MySQL", "SignalR"],
    image: juwallaryImg, github: "https://github.com/AnjaleeThennakoon", figma: null, solo: true,
  },
  {
    id: 2, num: "02", year: "2025", color: "blue",
    title: "PetCare App",
    category: "UI/UX Design · HCI",
    desc: "A comprehensive pet care app designed with HCI principles — intuitive interface for managing vet appointments, health records, and daily pet routines.",
    tech: ["Figma", "UI/UX Design", "Prototyping", "HCI"],
    image: petappImg, github: null,
    figma: "https://www.figma.com/design/hIRfybdYFlOI4dlpZ4LGic/PetCare---HCI?node-id=643-1525",
    solo: true,
  },
  {
    id: 3, num: "03", year: "2025", color: "teal",
    title: "Hospital Management System",
    category: "Web Application",
    desc: "Java EE-based hospital system with role-based access, patient records, appointment scheduling, and multi-user admin dashboards.",
    tech: ["Java EE", "Servlets", "JSP", "MySQL"],
    image: hospitalImg, github: "https://github.com/AnjaleeThennakoon", figma: null, solo: true,
  },
  {
    id: 4, num: "04", year: "2025", color: "blue",
    title: "Nexora Datathon Event Website",
    category: "Event Platform",
    desc: "Official website for Nexora 1.0 Inter-University Datathon. Built with TypeScript and TailwindCSS, containerised with Docker.",
    tech: ["JavaScript", "TypeScript", "TailwindCSS", "Dockerfile"],
    image: nexoraImg, github: "https://github.com/AnjaleeThennakoon", figma: null, solo: false,
  },
  {
    id: 5, num: "05", year: "2025", color: "green",
    title: "BinaryBeats",
    category: "Algorithm Visualiser",
    desc: "A duotone algorithm visualisation site. Interactive educational platform demonstrating sorting and graph algorithms.",
    tech: ["JavaScript", "React", "Algorithm Design", "TailwindCSS"],
    image: binaryImg, github: "https://github.com/AnjaleeThennakoon", figma: null, solo: false,
  },
  {
    id: 6, num: "06", year: "2025", color: "orange",
    title: "RoboCar — Phone-Controlled Robot",
    category: "Embedded Systems · IoT",
    desc: "A phone-controlled robotic car built with Arduino. Real-time motor control via Bluetooth from a mobile app.",
    tech: ["Arduino", "C++", "Bluetooth", "Mobile App", "IoT"],
    image: null, github: "https://github.com/AnjaleeThennakoon", figma: null, solo: true,
  },
  {
    id: 7, num: "07", year: "2025", color: "purple",
    title: "Examination Management System",
    category: "Enterprise Platform",
    desc: "Full-featured exam management platform for NSBM Green University — student registration, admit cards, results.",
    tech: ["React", "TailwindCSS", "Node.js", "PostgreSQL"],
    image: null, github: "https://github.com/AnjaleeThennakoon",
    figma: "https://www.figma.com/design/4Ixqj1KdBbJoIK1A61m27I/Exam-Management?node-id=0-1",
    solo: false,
  },
  {
    id: 8, num: "08", year: "2025", color: "coffee",
    title: "Café Website",
    category: "Web Design",
    desc: "A beautiful café landing page with full-screen hero, live coffee-making video section, and smooth scroll animations.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    image: null, github: "https://github.com/AnjaleeThennakoon",
    figma: "https://www.figma.com/design/KrBPqzf3WSk7UbDffCLH6I/Coffee-Website?node-id=420-2",
    solo: true,
  },
];

const skillGroups = [
  { label: "Backend Development", color: "teal",   icon: "🖥️", items: ["Java", "Java EE", "C#", "ASP.NET Core", "Python", "JSP & Servlets", "JDBC"] },
  { label: "Frontend & Web",      color: "blue",   icon: "🌐", items: ["React", "HTML & CSS", "JavaScript", "TypeScript", "TailwindCSS"] },
  { label: "Mobile & Embedded",   color: "green",  icon: "📱", items: ["Dart", "Flutter", "Arduino", "C++", "IoT", "Bluetooth"] },
  { label: "Design & DevOps",     color: "purple", icon: "🎨", items: ["Figma", "UI/UX Design", "Git & GitHub", "Docker", "MySQL"] },
];

const certs = [
  { title: "Development Team Member — Nexora 1.0 Datathon", org: "ACDS · NSBM Green University", image: nexoraImg  },
  { title: "FigMate — UI/UX Figma Workshop 2025",           org: "ACDS · NSBM Green University", image: figmateImg },
  { title: "Open Squid 2025 — Certificate of Volunteering", org: "NSBM FOSS Community",          image: fossImg    },
  { title: "Flutter & Dart Development",                    org: "Udemy",                         image: udemyImg   },
  { title: "Game Development Workshop",                     org: "Workshop Event",                image: gameImg    },
  { title: "Diploma in English",                            org: "English Community",             image: ss1Img     },
  { title: "Graphic Design Course",                         org: "CRC Academy",                   image: ss2Img     },
];

const leadership = [
  { role: "Executive Member",      org: "Computer Society of Sri Lanka",          period: "2025–Present", icon: "💼" },
  { role: "Developer Team Member", org: "FOSS Community Sri Lanka",               period: "2025–Present", icon: "🔧" },
  { role: "Developer Team Member", org: "Association of Computer & Data Science", period: "2025–Present", icon: "💻" },
  { role: "Member",                org: "IEEE Student Branch NSBM",               period: "2025–Present", icon: "⚡" },
];

const MARQUEE_TEXT = "ASP.NET · C# · JAVA · DART · FLUTTER · PYTHON · ARDUINO · REACT · TYPESCRIPT · FIGMA · UI/UX · ";

// ── Hooks ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function use3DTilt(strength = 15) {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) scale3d(1.04,1.04,1.04)`;
    el.style.transition = "transform 0.1s ease";
    const shine = el.querySelector(".tilt-shine");
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.18) 0%, transparent 70%)`;
    }
  }, [strength]);
  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
    el.style.transition = "transform 0.5s cubic-bezier(.16,1,.3,1)";
    const shine = el.querySelector(".tilt-shine");
    if (shine) shine.style.background = "transparent";
  }, []);
  return { ref, handleMove, handleLeave };
}

// ── Sub-components ────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

function TiltCard({ children, className = "", style = {} }) {
  const { ref, handleMove, handleLeave } = use3DTilt(12);
  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="tilt-shine" />
      {children}
    </div>
  );
}

function PersonalityPopup({ fact, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="personality-popup">
      <span className="pp-emoji">{fact.emoji}</span>
      <p className="pp-text">{fact.text}</p>
      <button className="pp-close" onClick={onClose}>×</button>
    </div>
  );
}

function TypeWriter({ text, speed = 60 }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const t = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return (
    <span>
      {displayed}
      <span className="cursor-blink">|</span>
    </span>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark]               = useState(false);
  const [time, setTime]               = useState("");
  const [curPos, setCurPos]           = useState({ x: -200, y: -200 });
  const [curHover, setCurHover]       = useState(false);
  const [popup, setPopup]             = useState(null);
  const [popupUsed, setPopupUsed]     = useState(new Set());
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [navOpen, setNavOpen]         = useState(false);
  const [scrollPct, setScrollPct]     = useState(0);

  // ── Section intersection refs ─────────────────────────────────────────
  const [heroRef,    heroIn]    = useInView(0.3);
  const [aboutRef,   aboutIn]   = useInView(0.15);
  const [factsRef,   factsIn]   = useInView(0.2);
  const [skillsRef,  skillsIn]  = useInView(0.1);
  const [projRef,    projIn]    = useInView(0.05);
  const [certsRef,   certsIn]   = useInView(0.1);
  const [contactRef, contactIn] = useInView(0.2);

  // ── Clock ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit", minute: "2-digit", second: "2-digit",
          hour12: false, timeZone: "Asia/Colombo",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Cursor ────────────────────────────────────────────────────────────
  useEffect(() => {
    const mv = (e) => setCurPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, []);

  // ── Scroll ────────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      setNavScrolled(scrolled > 60);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (scrolled / total) * 100 : 0);

      const sections = ["hero", "about", "skills", "projects", "certs", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.4 && rect.bottom > 0) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Personality popups ────────────────────────────────────────────────
  useEffect(() => {
    const triggers = [
      { pct: 15, idx: 0 },
      { pct: 35, idx: 1 },
      { pct: 55, idx: 2 },
      { pct: 72, idx: 3 },
      { pct: 88, idx: 4 },
    ];
    for (const t of triggers) {
      if (scrollPct >= t.pct && !popupUsed.has(t.idx)) {
        setPopupUsed((prev) => new Set([...prev, t.idx]));
        setPopup(PERSONALITY_FACTS[t.idx]);
        break;
      }
    }
  }, [scrollPct, popupUsed]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const on  = () => setCurHover(true);
  const off = () => setCurHover(false);

  const navLinks = [
    ["hero", "Home"], ["about", "About"], ["skills", "Skills"],
    ["projects", "Projects"], ["certs", "Certs"], ["contact", "Contact"],
  ];

  return (
    <div className={`app${dark ? " dark" : ""}`}>
      {/* Custom cursor */}
      <div
        className={`cursor${curHover ? " cursor--big" : ""}`}
        style={{ left: curPos.x, top: curPos.y }}
      />

      {/* Scroll progress bar */}
      <div className="scroll-bar" style={{ width: `${scrollPct}%` }} />

      {/* Personality Popup */}
      {popup && <PersonalityPopup fact={popup} onClose={() => setPopup(null)} />}

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav className={`nav${navScrolled ? " nav--scrolled" : ""}`}>
        <button
          className="nav-logo"
          onClick={() => scrollTo("hero")}
          onMouseEnter={on} onMouseLeave={off}
        >
          <span className="nav-mark">AR</span>
          <span className="nav-name">Anjalika Rukshani</span>
        </button>

        <div className={`nav-links${navOpen ? " nav-links--open" : ""}`}>
          {navLinks.map(([id, label]) => (
            <button
              key={id}
              className={`nav-link${activeSection === id ? " nav-link--active" : ""}`}
              onClick={() => scrollTo(id)}
              onMouseEnter={on} onMouseLeave={off}
            >
              {label}
            </button>
          ))}
          <a
            href={anjaleeCV} download
            className="nav-cv"
            onMouseEnter={on} onMouseLeave={off}
          >
            CV ↓
          </a>
        </div>

        <div className="nav-right">
          <span className="nav-time">{time} LK</span>
          <button
            className="theme-btn"
            onClick={() => setDark((d) => !d)}
            onMouseEnter={on} onMouseLeave={off}
            aria-label="Toggle theme"
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <button
            className={`burger${navOpen ? " burger--open" : ""}`}
            onClick={() => setNavOpen((v) => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section id="hero" className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="hero-grid" />
        </div>

        <div className={`hero-content${heroIn ? " hero-content--in" : ""}`}>
          <div className="hero-profile-wrap">
            <div className="orbit or-1" />
            <div className="orbit or-2" />
            <div className="orbit or-3" />
            <div className="profile-glow" />
            <div className="profile-frame">
              <img src={profileImg} alt="Anjalika Rukshani" className="profile-img" />
            </div>
            <div className="status-badge">
              <span className="status-dot" />
              Available for hire
            </div>
          </div>

          <div className="hero-text">
            <div className="greeting">
              <span className="greeting-sub">Hey there, I'm</span>
            </div>
            <h1 className="hero-name">
              {heroIn && <TypeWriter text="Anjalika Rukshani" speed={55} />}
            </h1>
            <div className="role-tags">
              {["Full-Stack Developer", "UI/UX Designer", "IoT Enthusiast"].map((r, i) => (
                <span key={r} className="role-tag" style={{ animationDelay: `${i * 0.15 + 0.4}s` }}>
                  {r}
                </span>
              ))}
            </div>
            <p className="hero-bio">
              Building scalable web &amp; mobile applications with <strong>Java</strong>,{" "}
              <strong>C#</strong>, <strong>ASP.NET</strong>, <strong>Flutter</strong> and
              exploring the intersection of design and embedded systems with{" "}
              <strong>Arduino</strong>.
            </p>
            <div className="hero-cta">
              <button
                className="btn btn-primary"
                onClick={() => scrollTo("projects")}
                onMouseEnter={on} onMouseLeave={off}
              >
                View Projects <span className="arrow">→</span>
              </button>
              <button
                className="btn btn-outline"
                onClick={() => scrollTo("contact")}
                onMouseEnter={on} onMouseLeave={off}
              >
                Let's Talk
              </button>
            </div>

            <div className="quick-stats">
              {[
                { icon: "🎯", num: "8+",  label: "Projects"   },
                { icon: "🏆", num: "7+",  label: "Certs"      },
                { icon: "🤝", num: "4",   label: "Orgs"       },
                { icon: "🎓", num: "2027",label: "Graduating" },
              ].map((s, i) => (
                <TiltCard
                  key={s.label}
                  className="stat-card"
                  style={{ animationDelay: `${i * 0.1 + 0.6}s` }}
                >
                  <span className="stat-icon">{s.icon}</span>
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>

        <div className="updated-badge">
          <span>🚀</span>
          <div>
            <span className="ub-label">Last Updated</span>
            <span className="ub-date">February 28, 2026</span>
          </div>
          <span className="ub-version">v2.0</span>
        </div>

        <div className="scroll-hint" onClick={() => scrollTo("about")}>
          <span className="scroll-mouse">
            <span className="scroll-wheel" />
          </span>
          <span>scroll down</span>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────── */}
      <div className="marquee" aria-hidden="true">
        <div className="mtrack">
          {[0, 1, 2].map((i) => (
            <span key={i} className="mitem">{MARQUEE_TEXT}</span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ───────────────────────────────────────────────── */}
      <section id="about" className="section about" ref={aboutRef}>
        <div className={`section-head${aboutIn ? " reveal" : ""}`}>
          <span className="section-label">Get to know me</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-grid">
          <div
            className={`about-story${aboutIn ? " reveal" : ""}`}
            style={{ transitionDelay: "0.1s" }}
          >
            <TiltCard className="story-card">
              <div className="story-icon">🚀</div>
              <h3>My Journey</h3>
              <p>
                I'm a <strong>Software Engineering undergraduate</strong> at NSBM Green
                University, Homagama, Sri Lanka. My passion lies in creating robust,
                user-centered applications that solve real-world problems through elegant
                code and thoughtful design.
              </p>
              <p>
                From <strong>full-stack web platforms</strong> with ASP.NET Core and React,
                to <strong>intuitive mobile experiences</strong> with Flutter, and even
                tinkering with <strong>Arduino-powered robotics</strong> — I love the entire
                spectrum.
              </p>
            </TiltCard>

            <TiltCard className="story-card" style={{ transitionDelay: "0.2s" }}>
              <div className="story-icon">💡</div>
              <h3>What Drives Me</h3>
              <p>
                I believe great software is born at the intersection of{" "}
                <strong>technical excellence</strong> and{" "}
                <strong>human-centered design</strong>. Every project gets curiosity and
                meticulous attention to detail — whether it's a scalable backend,
                pixel-perfect UI, or an IoT prototype.
              </p>
            </TiltCard>
          </div>

          <div
            className={`about-details${aboutIn ? " reveal" : ""}`}
            style={{ transitionDelay: "0.25s" }}
          >
            <TiltCard className="details-card">
              <h4 className="details-heading">
                <span>👥</span>Leadership &amp; Community
              </h4>
              {leadership.map((item, i) => (
                <div key={i} className="lead-item" style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="lead-icon">{item.icon}</span>
                  <div>
                    <p className="lead-role">{item.role}</p>
                    <p className="lead-org">{item.org}</p>
                    <p className="lead-period">{item.period}</p>
                  </div>
                </div>
              ))}
            </TiltCard>

            <TiltCard className="details-card" style={{ marginTop: "16px" }}>
              <h4 className="details-heading">
                <span>📍</span>Location &amp; Education
              </h4>
              <div className="info-pills">
                {[
                  { icon: "🏫", label: "University", value: "NSBM Green University" },
                  { icon: "📚", label: "Major",      value: "Software Engineering"  },
                  { icon: "🌏", label: "Location",   value: "Homagama, Sri Lanka"   },
                  { icon: "🎯", label: "Graduation", value: "2027"                  },
                ].map((p) => (
                  <div key={p.label} className="info-pill">
                    <span>{p.icon}</span>
                    <div>
                      <p className="pill-label">{p.label}</p>
                      <p className="pill-value">{p.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard>

            <div className="social-links">
              {[
                { href: "https://github.com/AnjaleeThennakoon",                    icon: <GithubIcon />,   label: "GitHub"   },
                { href: "https://www.linkedin.com/in/anjalee-rukshani-5a29382b8",  icon: <LinkedInIcon />, label: "LinkedIn" },
                { href: "mailto:anjalikarukshani51@gmail.com",                     icon: "✉",              label: "Email"    },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  className="social-link"
                  onMouseEnter={on} onMouseLeave={off}
                >
                  {s.icon}<span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PERSONALITY FACTS ROW ───────────────────────────────── */}
      <section className="facts-row" ref={factsRef}>
        <div className="facts-inner">
          {PERSONALITY_FACTS.map((f, i) => (
            <div
              key={i}
              className={`fact-chip${factsIn ? " reveal" : ""}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <span className="fact-emoji">{f.emoji}</span>
              <span className="fact-text">{f.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────────── */}
      <section id="skills" className="section" ref={skillsRef}>
        <div className={`section-head${skillsIn ? " reveal" : ""}`}>
          <span className="section-label">Technical Expertise</span>
          <h2 className="section-title">Skills &amp; Tools</h2>
        </div>
        <div className="skills-grid">
          {skillGroups.map((g, gi) => (
            <TiltCard
              key={g.label}
              className={`skill-card skill-card--${g.color}${skillsIn ? " reveal" : ""}`}
              style={{ transitionDelay: `${gi * 0.1}s` }}
            >
              <div className="skill-head">
                <span className="skill-icon">{g.icon}</span>
                <span className="skill-label">{g.label}</span>
              </div>
              <div className="skill-pills">
                {g.items.map((item, ii) => (
                  <span
                    key={item}
                    className="skill-pill"
                    style={{ animationDelay: `${gi * 0.1 + ii * 0.06}s` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────── */}
      <section id="projects" className="section section--alt" ref={projRef}>
        <div className={`section-head${projIn ? " reveal" : ""}`}>
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Selected Projects</h2>
          <span className="section-count">{projects.length} Projects</span>
        </div>
        <div className="projects-grid">
          {projects.map((p, pi) => (
            <TiltCard
              key={p.id}
              className={`project-card project-card--${p.color}${projIn ? " reveal" : ""}`}
              style={{ transitionDelay: `${pi * 0.07}s` }}
            >
              <div className="pc-img-wrap">
                {p.image
                  ? <img src={p.image} alt={p.title} className="pc-img" />
                  : <div className="pc-img-blank"><span>{p.num}</span></div>
                }
                <div className="pc-overlay">
                  {p.github && (
                    <a
                      href={p.github} target="_blank" rel="noopener noreferrer"
                      className="pc-btn"
                      onMouseEnter={on} onMouseLeave={off}
                    >
                      ⌥ GitHub
                    </a>
                  )}
                  {p.figma && (
                    <a
                      href={p.figma} target="_blank" rel="noopener noreferrer"
                      className="pc-btn pc-btn--figma"
                      onMouseEnter={on} onMouseLeave={off}
                    >
                      🎨 Figma
                    </a>
                  )}
                </div>
                <span className="pc-num">{p.num}</span>
                {!p.solo && <span className="pc-team">👥 Team</span>}
              </div>
              <div className="pc-body">
                <div className="pc-meta">
                  <span className="pc-cat">{p.category}</span>
                  <span className="pc-yr">{p.year}</span>
                </div>
                <h3 className="pc-title">{p.title}</h3>
                <p className="pc-desc">{p.desc}</p>
                <div className="pc-pills">
                  {p.tech.map((t) => <span key={t} className="pc-pill">{t}</span>)}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ── CERTS ───────────────────────────────────────────────── */}
      <section id="certs" className="section" ref={certsRef}>
        <div className={`section-head${certsIn ? " reveal" : ""}`}>
          <span className="section-label">Credentials</span>
          <h2 className="section-title">Certifications</h2>
          <span className="section-count">{certs.length} Certs</span>
        </div>
        <div className="certs-scroll">
          {certs.map((c, i) => (
            <TiltCard
              key={i}
              className={`cert-card${certsIn ? " reveal" : ""}`}
              style={{ transitionDelay: `${i * 0.09}s` }}
            >
              <div className="cert-img-wrap">
                <img src={c.image} alt={c.title} className="cert-img" />
                <div className="cert-badge">✓</div>
              </div>
              <div className="cert-body">
                <span className="cert-org">{c.org}</span>
                <p className="cert-title">{c.title}</p>
              </div>
            </TiltCard>
          ))}
        </div>
        <p className="scroll-hint-text">← Scroll to see more →</p>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────── */}
      <section id="contact" className="contact" ref={contactRef}>
        <div className="contact-blob-1" />
        <div className="contact-blob-2" />
        <div className={`contact-inner${contactIn ? " reveal" : ""}`}>
          <span className="section-label" style={{ color: "rgba(202,240,248,.65)" }}>
            Let's Work Together
          </span>
          <h2 className="contact-title">
            Have a project in mind?<br />
            <span className="contact-title-out">Let's build it.</span>
          </h2>
          <div className="contact-links">
            <a href="tel:+94703223968" className="contact-link" onMouseEnter={on} onMouseLeave={off}>
              📞 +94 703 223 968
            </a>
            <a href="mailto:anjalikarukshani51@gmail.com" className="contact-link" onMouseEnter={on} onMouseLeave={off}>
              ✉ anjalikarukshani51@gmail.com
            </a>
            <a href="mailto:tmarthennakoon@students.nsbm.ac.lk" className="contact-link" onMouseEnter={on} onMouseLeave={off}>
              ✉ tmarthennakoon@students.nsbm.ac.lk
            </a>
          </div>
          <div className="contact-btns">
            <a
              href="mailto:anjalikarukshani51@gmail.com"
              className="btn btn-primary"
              onMouseEnter={on} onMouseLeave={off}
            >
              Hire Me ↗
            </a>
            <a
              href={anjaleeCV} download
              className="btn btn-white"
              onMouseEnter={on} onMouseLeave={off}
            >
              Download CV ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="footer">
        <p className="footer-copy">© 2026 Anjalika Rukshani · NSBM Green University</p>
        <div className="footer-social">
          {[
            { href: "https://github.com/AnjaleeThennakoon",                   icon: <GithubIcon />,   label: "GitHub"   },
            { href: "https://www.linkedin.com/in/anjalee-rukshani-5a29382b8", icon: <LinkedInIcon />, label: "LinkedIn" },
            { href: "mailto:anjalikarukshani51@gmail.com",                    icon: "✉",              label: "Email"    },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank" rel="noopener noreferrer"
              className="footer-icon"
              onMouseEnter={on} onMouseLeave={off}
            >
              {s.icon}<span>{s.label}</span>
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}