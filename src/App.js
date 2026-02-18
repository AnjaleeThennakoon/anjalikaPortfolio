import { useState, useEffect } from "react";
import "./App.css";

/* ─── DATA ─────────────────────────────────────── */

const projects = [
  {
    id: 1,
    title: "Jewelry Auction Management System",
    category: "Web Application",
    year: "2025",
    desc: "A complete auction system for luxury jewelry with bidding, inventory tracking, and user management.",
    tech: ["Java EE", "Servlets", "JSP", "MySQL"],
    colorClass: "accent-lime",
    num: "01",
  },
  {
    id: 2,
    title: "CrystalCrown",
    category: "Luxury Jewelry Platform",
    year: "2025",
    desc: "An online luxury jewelry e-commerce platform featuring curated collections and seamless UI/UX.",
    tech: ["React", "TailwindCSS", "Node.js", "MongoDB"],
    colorClass: "accent-orange",
    num: "02",
  },
  {
    id: 3,
    title: "Hospital Management System",
    category: "Web Application",
    year: "2025",
    desc: "A Jakarta EE-based hospital management system with role-based access, patient records, and appointment scheduling.",
    tech: ["Jakarta EE", "Servlets", "JSP", "MySQL"],
    colorClass: "accent-violet",
    num: "03",
  },
  {
    id: 4,
    title: "Student Internship Management System",
    category: "Web Application",
    year: "2025",
    desc: "A platform to manage student internships, applications, and approvals with dashboards for admins, students, and supervisors.",
    tech: ["Java EE", "JSP", "Servlets", "AJAX"],
    colorClass: "accent-emerald",
    num: "04",
  },
];

const skills = [
  "Java", "Java EE", "Jakarta EE", "Servlets & JSP",
  "React", "TailwindCSS", "JDBC & MySQL",
  "Front-End Development", "UI/UX Design", "System Analysis",
];

const stats = [
  { number: "5+", label: "Projects Completed" },
  { number: "3",  label: "Web Platforms"      },
  { number: "4+", label: "Years Experience"   },
  { number: "1",  label: "University Honors"  },
];

const education = {
  degree:     "BSc (Hons) in Software Engineering",
  university: "NSBM Green University, Homagama, Sri Lanka",
  graduation: "Expected Graduation: 2027",
  certs: [
    "Diploma in English – English Community",
    "Graphic Design Course – CRC Academy",
  ],
};

const leadership = [
  {
    role: "Executive Member",
    org: "Computer Society of Sri Lanka (CSSL)",
    period: "2025 – Present",
    points: [
      "Organized and supported tech events, workshops, and awareness programs.",
      "Coordinated volunteer teams for event operations.",
    ],
  },
  {
    role: "Developer Team Member",
    org: "FOSS Community Sri Lanka",
    period: "2025 – Present",
    points: [
      "Contributed to open-source software projects and collaborative coding initiatives.",
      "Organized and supported tech events, workshops, and awareness programs.",
      "Coordinated volunteer teams for event operations.",
    ],
  },
  {
    role: "Developer Team Member",
    org: "Association of Computer and Data Science (ACDS)",
    period: "2025 – Present",
    points: [
      "Led technical tasks for the Nexora Datathon Event Website project.",
      "Managed deadlines, task assignments, and documentation.",
      "Assisted in event registration management and promotional activities.",
    ],
  },
  {
    role: "Member",
    org: "IEEE Student Branch NSBM",
    period: "2025 – Present",
    points: [
      "Participated in IEEE technical sessions and professional development workshops.",
      "Supported IEEE-organized university events and competitions.",
    ],
  },
];

const MARQUEE = "SOFTWARE ENGINEER — JAVA DEVELOPER — UI/UX DESIGNER — ";

/* ─── COMPONENT ─────────────────────────────────── */

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [cursorPos, setCursorPos]         = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover]     = useState(false);
  const [time, setTime]                   = useState("");
  const [loaded, setLoaded]               = useState(false);

  /* live clock – Colombo */
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false, timeZone: "Asia/Colombo",
      }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* custom cursor */
  useEffect(() => {
    const mv = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, []);

  /* page-load fade */
  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(id);
  }, []);

  const on  = () => setCursorHover(true);
  const off = () => setCursorHover(false);

  /* smooth scroll to section */
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`portfolio${loaded ? " portfolio--loaded" : ""}`}>

      {/* ── cursor ── */}
      <div
        className={`cursor${cursorHover ? " cursor--hover" : ""}`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* ══════════ NAV ══════════ */}
      <nav className="nav">
        <div className="nav__status">
          <div className="nav__dot" />
          <span className="nav__available">AVAILABLE FOR WORK</span>
        </div>

        <div className="nav__clock">{time} — COLOMBO</div>

        <div className="nav__links">
          {[
            { label: "Work",    id: "work"       },
            { label: "About",   id: "about"      },
            { label: "Contact", id: "contact"    },
          ].map(({ label, id }) => (
            <span
              key={label}
              className="nav__link"
              onClick={() => goTo(id)}
              onMouseEnter={on}
              onMouseLeave={off}
            >
              {label.toUpperCase()}
            </span>
          ))}
        </div>
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section className="hero">
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__ghost" aria-hidden="true">AR</div>

        <div className="hero__content">
          <div className="hero__name-row">
            <span className="hero__year">©2026</span>
            <h1 className="hero__name">
              Anjalika<br />
              <span className="hero__name--ghost">Rukshani</span>
            </h1>
          </div>

          <div className="hero__footer-row">
            <p className="hero__tagline">
              I design and develop web applications, Java&nbsp;EE platforms,
              and digital solutions that combine code, creativity, and usability.
            </p>
            <div className="hero__scroll">
              <span className="hero__scroll-label">SCROLL TO EXPLORE</span>
              <div className="hero__scroll-line">
                <div className="hero__scroll-bar" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1, 2].map((i) => (
            <span key={i} className="marquee__item">{MARQUEE}</span>
          ))}
        </div>
      </div>

      {/* ══════════ PROJECTS ══════════ */}
      <section className="projects" id="work">
        <div className="projects__header">
          <span className="label">Selected Work</span>
          <span className="projects__count">{projects.length} PROJECTS</span>
        </div>

        <div className="projects__list">
          {projects.map((p) => (
            <article
              key={p.id}
              className={`project-item ${p.colorClass}${activeProject === p.id ? " project-item--active" : ""}`}
              onMouseEnter={() => { setActiveProject(p.id); on(); }}
              onMouseLeave={() => { setActiveProject(null); off(); }}
            >
              <span className="project-item__num">{p.num}</span>

              <div className="project-item__body">
                <div className="project-item__top">
                  <h2 className="project-item__title">{p.title}</h2>
                  <span className="project-item__tag">{p.category.toUpperCase()}</span>
                </div>
                <p className="project-item__desc">{p.desc}</p>
                <div className="project-item__tech">
                  {p.tech.map((t) => <span key={t} className="tech-pill">{t}</span>)}
                </div>
              </div>

              <div className="project-item__meta">
                <span className="project-item__year">{p.year}</span>
                <div className="project-item__arrow">
                  <span className="project-item__arrow-icon">↗</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ ABOUT ══════════ */}
      <section className="about" id="about">
        <div className="about__left">
          <span className="label about__label">About</span>
          <h2 className="display-md about__heading">
            Building digital experiences with code and creativity.
          </h2>
          <p className="about__body">
            I am an undergraduate software engineering student passionate about
            designing and developing full-stack web applications, interactive
            platforms, and luxury e-commerce solutions. Experienced in Java&nbsp;EE,
            React, Tailwind, and system design.
          </p>

          {/* Contact */}
          <div className="contact-block">
            <a href="tel:+94703223968"
               className="contact-row" onMouseEnter={on} onMouseLeave={off}>
              <span className="contact-icon">📞</span>
              <span>+94 703 223 968</span>
            </a>
            <a href="mailto:anjalikarukshani51@gmail.com"
               className="contact-row" onMouseEnter={on} onMouseLeave={off}>
              <span className="contact-icon">✉</span>
              <span>anjalikarukshani51@gmail.com</span>
            </a>
            <a href="mailto:dmarthennakoon@students.nsbm.ac.lk"
               className="contact-row" onMouseEnter={on} onMouseLeave={off}>
              <span className="contact-icon">✉</span>
              <span>dmarthennakoon@students.nsbm.ac.lk</span>
            </a>
            <a href="https://www.linkedin.com/in/anjalee-rukshani-5a29382b8"
               target="_blank" rel="noopener noreferrer"
               className="contact-row" onMouseEnter={on} onMouseLeave={off}>
              <span className="contact-icon">in</span>
              <span>linkedin.com/in/anjalee-rukshani</span>
            </a>
            <a href="https://github.com/AnjaleeThennakoon"
               target="_blank" rel="noopener noreferrer"
               className="contact-row" onMouseEnter={on} onMouseLeave={off}>
              <span className="contact-icon">⌥</span>
              <span>github.com/AnjaleeThennakoon</span>
            </a>
          </div>
        </div>

        <div className="about__right">
          <p className="label skills-label">Skills</p>
          <div className="skills-grid">
            {skills.map((s) => (
              <span key={s} className="skill-tag" onMouseEnter={on} onMouseLeave={off}>{s}</span>
            ))}
          </div>

          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <div className="stat__number">{s.number}</div>
                <div className="stat__label">{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ EDUCATION ══════════ */}
      <section className="edu" id="education">
        <div className="section-header">
          <span className="label">Education &amp; Certifications</span>
        </div>

        <div className="edu__grid">
          {/* Degree */}
          <div className="edu__degree-card">
            <div className="edu__badge">BSc</div>
            <div>
              <h3 className="edu__degree-name">{education.degree}</h3>
              <p className="edu__uni">{education.university}</p>
              <p className="edu__grad">{education.graduation}</p>
            </div>
          </div>

          {/* Certs */}
          <div className="edu__certs">
            <p className="label" style={{ marginBottom: "20px" }}>Certifications &amp; Professional Development</p>
            {education.certs.map((c) => (
              <div key={c} className="cert-row">
                <span className="cert-dot" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ LEADERSHIP ══════════ */}
      <section className="lead" id="leadership">
        <div className="section-header">
          <span className="label">Leadership &amp; Organizational Experience</span>
        </div>

        <div className="lead__list">
          {leadership.map((l, i) => (
            <div key={i} className="lead__item" onMouseEnter={on} onMouseLeave={off}>
              <div className="lead__num">0{i + 1}</div>
              <div className="lead__body">
                <div className="lead__top">
                  <h3 className="lead__role">{l.role}</h3>
                  <span className="lead__period">{l.period}</span>
                </div>
                <p className="lead__org">{l.org}</p>
                <ul className="lead__points">
                  {l.points.map((pt, j) => <li key={j}>{pt}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta" id="contact">
        <span className="label cta__sub">Let's Work Together</span>
        <h2 className="cta__heading">
          Have a project<br />
          <span className="text-ghost">in mind?</span>
        </h2>
        <a
          href="mailto:tmarthennakoon@students.nsbm.ac.lk"
          className="cta__btn"
          onMouseEnter={on} onMouseLeave={off}
        >
          GET IN TOUCH ↗
        </a>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="footer">
        <span className="footer__copy">©2026 ANJALIKA RUKSHANI</span>
        <div className="footer__links">
          <a href="https://www.linkedin.com/in/anjalee-rukshani-5a29382b8"
             target="_blank" rel="noopener noreferrer"
             className="footer__link" onMouseEnter={on} onMouseLeave={off}>
            LINKEDIN
          </a>
          <a href="https://github.com/AnjaleeThennakoon"
             target="_blank" rel="noopener noreferrer"
             className="footer__link" onMouseEnter={on} onMouseLeave={off}>
            GITHUB
          </a>
        </div>
      </footer>

    </div>
  );
}