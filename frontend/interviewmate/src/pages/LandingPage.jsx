import React, { useState, useContext, useEffect, useRef } from "react";

import HERO_IMG from "../assets/hero_img.png";
import { useNavigate } from "react-router-dom";

import {
  HiOutlineLightBulb,
  HiOutlineSquares2X2,
  HiOutlineDocumentText,
  HiOutlinePencilSquare,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

/* -----------------------------------------
   TYPEWRITER
----------------------------------------- */
const Typewriter = ({ text, speed = 25 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const t = setTimeout(() => setIndex(index + 1), speed);
      return () => clearTimeout(t);
    }
  }, [index, text, speed]);

  return (
    <p className="text-[17px] text-gray-900 mr-0 md:mr-20 leading-relaxed min-h-[65px]">
      {text.substring(0, index)}
      <span className="animate-pulse opacity-60">|</span>
    </p>
  );
};

/* -----------------------------------------
   ENHANCED MULTI-COLOR PARTICLES (P1-C)
   - smoother motion
   - color palette
   - glow + connecting lines
----------------------------------------- */
function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let DPR = window.devicePixelRatio || 1;
    let width = (canvas.width = Math.floor(window.innerWidth * DPR));
    let height = (canvas.height = Math.floor(window.innerHeight * 0.62 * DPR));
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${Math.floor(window.innerHeight * 0.62)}px`;
    ctx.scale(DPR, DPR);

    let W = window.innerWidth;
    let H = Math.floor(window.innerHeight * 0.62);

    const particles = [];
    const maxParticles = 70;
    const mouse = { x: -9999, y: -9999, active: false };

    // Palette hues that feel premium + varied
    const HUES = [330, 290, 255, 210, 160, 25, 8, 340];

    const rand = (a, b) => Math.random() * (b - a) + a;

    class Particle {
      constructor() {
        this.reset(true);
      }
      reset(init = false) {
        // bias spawn around left-center area so cluster sits near heading/image gap
        this.x = init ? rand(W * 0.15, W * 0.55) : rand(0, W);
        this.y = init ? rand(H * 0.05, H * 0.85) : rand(0, H);
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = rand(-0.15, 0.25);
        this.vy = rand(-0.12, 0.12);
        this.size = rand(1.0, 3.2);
        this.life = rand(140, 420);
        this.maxLife = this.life;
        this.hue = HUES[Math.floor(rand(0, HUES.length))];
        this.phase = rand(0, Math.PI * 2);
        this.oscAmp = rand(2, 10);
        this.drift = rand(0.2, 1.8);
      }
      step() {
        // gentle drift + harmonic float for smooth movement
        this.phase += 0.01 * this.drift;
        this.x += this.vx + Math.sin(this.phase) * 0.25;
        this.y += this.vy + Math.cos(this.phase * 0.7) * 0.18;

        // slow life decay and respawn slightly off
        this.life--;
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            // repel gently
            const s = (120 - d) / 120;
            this.x += (dx / (d || 1)) * s * 6;
            this.y += (dy / (d || 1)) * s * 6;
          }
        }

        if (
          this.life <= 0 ||
          this.x < -40 ||
          this.x > W + 40 ||
          this.y < -40 ||
          this.y > H + 40
        ) {
          this.reset();
          // bias respawn to left-center region to keep pleasant cluster
          this.x = rand(W * 0.1, W * 0.65);
          this.y = rand(0, H);
        }
      }
      draw(ctx) {
        ctx.beginPath();
        const alpha = Math.max(0.06, (this.life / this.maxLife) * 0.95);
        // luminous fill
        ctx.fillStyle = `hsla(${this.hue}, 85%, 65%, ${alpha})`;
        ctx.shadowBlur = Math.max(2, this.size * 2.5);
        ctx.shadowColor = `hsla(${this.hue}, 80%, 65%, ${alpha * 0.9})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < maxParticles; i++) particles.push(new Particle());

    let rafId;
    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, width, height);

      // very subtle gradient background overlay so dots feel embedded
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "rgba(255,245,247,0.0)");
      g.addColorStop(1, "rgba(255,240,242,0.02)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // update and draw
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.step();
        p.draw(ctx);

        // connecting faint lines when close
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 4200) {
            const alpha = 0.01 + ((4200 - d2) / 4200) * 0.045;
            // line color blends the two hues subtly
            ctx.strokeStyle = `hsla(${(p.hue + p2.hue) / 2},80%,65%,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(render);
    };

    render();

    function onResize() {
      DPR = window.devicePixelRatio || 1;
      width = canvas.width = Math.floor(window.innerWidth * DPR);
      height = canvas.height = Math.floor(window.innerHeight * 0.62 * DPR);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${Math.floor(window.innerHeight * 0.62)}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      W = window.innerWidth;
      H = Math.floor(window.innerHeight * 0.62);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }

    function onTouchMove(t) {
      if (t.touches && t.touches[0]) {
        onMove(t.touches[0]);
      }
    }

    function onLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [canvasRef]);
}

/* -----------------------------------------
   MAIN LANDING PAGE
----------------------------------------- */
const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    !user ? setOpenAuthModal(true) : navigate("/dashboard");
  };

  const canvasRef = useRef(null);
  useParticles(canvasRef);

  // parallax
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const img = heroRef.current;
    if (!el || !img) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      img.style.transform = `translate3d(${x * 12}px, ${y * 8}px, 0) scale(1.01)`;
    };

    const onLeave = () => {
      img.style.transform = `translate3d(0,0,0) scale(1)`;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ICONS */
  const FeatureIcons = [
    <HiOutlineLightBulb className="text-3xl text-red-500" />,
    <HiOutlineSquares2X2 className="text-3xl text-red-500" />,
    <HiOutlineDocumentText className="text-3xl text-red-500" />,
    <HiOutlinePencilSquare className="text-3xl text-red-500" />,
    <HiOutlineRocketLaunch className="text-3xl text-red-500" />,
  ];

  const UPDATED_FEATURES = [
    {
      title: "Smart Question Generation",
      description:
        "Get interview questions tailored to your role, experience level, and domain-specific needs.",
    },
    {
      title: "Real-Time Content Expansion",
      description:
        "Expand any answer instantly with deeper explanations powered by adaptive AI.",
    },
    {
      title: "Concept-Level Understanding",
      description: "Break down complex topics with interview-ready clarity.",
    },
    {
      title: "Organized Session History",
      description:
        "Track and revisit every interview session — neatly organized.",
    },
    {
      title: "Fast, Accurate & Role-Focused",
      description: "Streamlined workflow built to accelerate your preparation.",
    },
  ];

  return (
    <>
      <style>{`
        /* shimmer for heading */
        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.25) 0%,
            rgba(255,255,255,0.95) 45%,
            rgba(255,255,255,0.25) 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 2.6s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: -120% 0; }
          100% { background-position: 120% 0; }
        }

        /* visible "AI-Powered" badge */
        .ai-badge {
          display: inline-block;
          padding: 10px 18px;
          border-radius: 12px;
          background: linear-gradient(90deg, rgba(255,120,120,0.14), rgba(255,160,170,0.06));
          border: 1px solid rgba(255,120,120,0.18);
          box-shadow: 0 8px 30px rgba(255,120,120,0.06);
          transform: translateX(-6px);
          animation: aiSlideIn 1.1s cubic-bezier(.2,.9,.3,1) forwards;
        }
        .ai-badge .ai-text {
          font-weight: 800;
          letter-spacing: -0.6px;
          font-size: 36px;
          line-height: 1;
          display: inline-block;
          padding-right: 8px;
          background: linear-gradient(90deg, #FF6B3D 0%, #FF8C7A 45%, #FFC4D2 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        @keyframes aiSlideIn {
          0% { opacity: 0; transform: translateX(-18px) scale(0.98); }
          60% { opacity: 1; transform: translateX(6px) scale(1.02); }
          100% { transform: translateX(0) scale(1); }
        }

        .hero-float {
          animation: floatY 8s ease-in-out infinite;
        }
        @keyframes floatY {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }

        .particles-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 62vh;
          pointer-events: none;
          z-index: 0;
        }

        /* CTA glow */
        .btn-glow {
          transition: transform 200ms ease, box-shadow 220ms ease;
          box-shadow: 0 8px 30px rgba(255,90,90,0.12);
        }
        .btn-glow:hover {
          transform: translateY(-3px);
          box-shadow: 0 30px 80px rgba(255,80,80,0.18);
        }

        /* ensure header + content sit above canvas */
        .hero-wrapper { position: relative; z-index: 12; }
        .header-top { position: relative; z-index: 20; }

        /* small responsive adjustments */
        @media (max-width: 768px) {
          .ai-badge .ai-text { font-size: 28px; }
        }
      `}</style>

      <div className="min-h-screen flex flex-col bg-[#FEF8F8]">
        {/* particles canvas sits visually behind hero wrapper */}
        <canvas ref={canvasRef} className="particles-canvas" />

        {/* HERO */}
        <div className="w-full pb-20 relative">
          <div
            className="w-[500px] h-[500px] bg-pink-200/30 blur-[70px] absolute top-0 left-0 pointer-events-none"
            style={{ zIndex: 1 }}
          />

          <div
            ref={containerRef}
            className="container mx-auto px-4 pt-6 hero-wrapper"
          >
            {/* HEADER */}
            <header className="flex justify-between items-center mb-1 header-top">
              <div className="text-xl text-black font-bold">
                Interview Mate AI ✨
              </div>

              {user ? (
                <ProfileInfoCard />
              ) : (
                <button
                  onClick={() => setOpenAuthModal(true)}
                  className="bg-red-400 text-sm font-semibold text-white px-6 py-2.5 rounded-full hover:bg-black transition z-30"
                >
                  Login / Signup
                </button>
              )}
            </header>

            {/* HERO MAIN */}
            <div className="flex flex-col md:flex-row items-center gap-6 -mt-2">
              {/* LEFT */}
              <div className="w-full md:w-1/2 pr-4 mb-6 md:mb-0">
                <div className="flex items-center gap-2 text-[13px] text-red-600 bg-red-100 px-3 py-1 rounded-full border border-red-300 w-fit mb-3">
                  ⚡ AI Powered
                </div>

                <h1 className="text-5xl text-black font-semibold mt-2 mb-6 leading-tight">
                  Master Interviews with <br />
                  {/* VISUALLY PROMINENT AI-Powered */}
                  <span className="ai-badge">
                    <span className="ai-text shimmer-text">AI-Powered</span>
                  </span>{" "}
                  Insights
                </h1>

                <div className="mb-2">
                  <Typewriter
                    text="Access curated questions, reveal in-depth answers on demand, strengthen your concepts, and prepare smarter — all in one place."
                    speed={22}
                  />
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleCTA}
                    className="btn-glow bg-red-500 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Get Started
                  </button>
                </div>
              </div>

              {/* RIGHT: hero image with parallax + float */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8">
                <img
                  ref={heroRef}
                  src={HERO_IMG}
                  alt="Hero"
                  className="w-[80%] md:w-[90%] rounded-2xl hero-float shadow-2xl"
                  style={{ transition: "transform 180ms linear", zIndex: 11 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="container mx-auto px-4 pt-10 pb-10">
          <h2 className="text-2xl font-medium text-center mb-8">
            Features That Make You Shine
          </h2>

          <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {UPDATED_FEATURES.slice(0, 3).map((f, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow-[0_8px_30px_rgba(255,100,100,0.12)] border border-red-100 flex flex-col gap-3 hover:-translate-y-1 hover:shadow-xl transition-all"
                >
                  {FeatureIcons[i]}
                  <h3 className="text-base font-semibold text-red-600">
                    {f.title}
                  </h3>
                  <p className="text-gray-700">{f.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {UPDATED_FEATURES.slice(3).map((f, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow-[0_8px_30px_rgba(255,100,100,0.12)] border border-red-100 flex flex-col gap-3 hover:-translate-y-1 hover:shadow-xl transition-all"
                >
                  {FeatureIcons[i + 3]}
                  <h3 className="text-base font-semibold text-red-600">
                    {f.title}
                  </h3>
                  <p className="text-gray-700">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="bg-[#FDECEC] w-full py-6 flex flex-col items-center mt-auto border-t border-red-200">
          <p className="text-gray-600 text-sm">Forged with Commitment</p>
        </footer>
      </div>

      {/* AUTH MODAL (unchanged behavior) */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
