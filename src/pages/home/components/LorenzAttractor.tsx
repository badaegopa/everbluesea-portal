import { useRef, useEffect } from "react";

export default function LorenzAttractor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // 마우스 섭동 — 독자가 끌개가 된다
    let mouseX = 0.5, mouseY = 0.5;
    let targetPerturbX = 0, targetPerturbY = 0;
    let perturbX = 0, perturbY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
      targetPerturbX = (mouseX - 0.5) * 18;
      targetPerturbY = (mouseY - 0.5) * 12;
    };
    document.addEventListener("mousemove", onMouseMove);

    // 로렌츠 어트랙터
    let lx = 0.1, ly = 0, lz = 20;
    const dt = 0.006, σ = 10, ρ = 28, β = 8 / 3;
    const lorenzPts: { x: number; y: number; z: number }[] = [];
    const LORENZ_MAX = 7000;

    function lorenzStep() {
      const dx = (σ * (ly - lx) + perturbX * 0.08) * dt;
      const dy = (lx * (ρ - lz) - ly + perturbY * 0.08) * dt;
      const dz = (lx * ly - β * lz) * dt;
      lx += dx; ly += dy; lz += dz;
      lorenzPts.push({ x: lx, y: ly, z: lz });
      if (lorenzPts.length > LORENZ_MAX) lorenzPts.shift();
    }
    for (let i = 0; i < 2500; i++) lorenzStep();

    function projectL(px: number, py: number, pz: number) {
      const W = canvas.width, H = canvas.height;
      const scale = Math.min(W, H) / 44;
      return {
        x: W / 2 + px * scale + perturbX * 2,
        y: H * 0.68 - pz * scale * 0.88 + py * scale * 0.14 + perturbY * 1.5,
      };
    }

    // 혜성 파티클
    const PARTICLES: {
      x: number; y: number; vx: number; vy: number;
      life: number; decay: number; size: number; gold: boolean;
    }[] = [];
    const MAX_PARTICLES = 120;

    function spawnParticle() {
      if (lorenzPts.length < 10) return;
      const tip = lorenzPts[lorenzPts.length - 1];
      const p = projectL(tip.x, tip.y, tip.z);
      PARTICLES.push({
        x: p.x, y: p.y,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        life: 1.0,
        decay: 0.018 + Math.random() * 0.025,
        size: 1.2 + Math.random() * 2.2,
        gold: Math.random() > 0.42,
      });
      if (PARTICLES.length > MAX_PARTICLES) PARTICLES.shift();
    }

    function drawParticles() {
      for (let i = PARTICLES.length - 1; i >= 0; i--) {
        const p = PARTICLES[i];
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.97; p.vy *= 0.97;
        p.life -= p.decay;
        if (p.life <= 0) { PARTICLES.splice(i, 1); continue; }
        const a = p.life * 0.85;
        ctx.save();
        ctx.globalAlpha = a * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? "rgba(210,170,60,1)" : "rgba(100,180,140,1)";
        ctx.fill();
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? "rgba(255,220,120,1)" : "rgba(160,220,180,1)";
        ctx.fill();
        ctx.restore();
      }
    }

    function drawTipGlow() {
      if (lorenzPts.length < 2) return;
      const tip = lorenzPts[lorenzPts.length - 1];
      const p = projectL(tip.x, tip.y, tip.z);
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 18);
      grad.addColorStop(0, "rgba(255,220,100,0.9)");
      grad.addColorStop(0.3, "rgba(200,160,60,0.4)");
      grad.addColorStop(1, "rgba(200,160,60,0)");
      ctx.beginPath();
      ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,240,180,1)";
      ctx.fill();
    }

    // 파동장
    const LINES = 28, SEGS = 180;
    let t = 0;

    function drawWaveField() {
      const W = canvas.width, H = canvas.height;
      const mx = (mouseX - 0.5) * 30;
      const my = (mouseY - 0.5) * 15;
      ctx.lineWidth = 0.7;
      for (let l = 0; l < LINES; l++) {
        const base = (l / LINES) * H;
        const phase = (l / LINES) * Math.PI * 3;
        const amp = 60 + 80 * Math.sin((l / LINES) * Math.PI);
        ctx.beginPath();
        for (let s = 0; s <= SEGS; s++) {
          const xp = (s / SEGS) * W;
          const mInfluence = Math.exp(-Math.pow((xp / W - mouseX) * 3, 2)) * my * 0.4;
          const yp = base
            + amp * Math.sin((s / SEGS) * Math.PI * 3 + phase + t * 0.4 + mx * 0.01)
            + amp * 0.4 * Math.sin((s / SEGS) * Math.PI * 5 - phase + t * 0.25)
            + amp * 0.2 * Math.cos((s / SEGS) * Math.PI * 7 + t * 0.15)
            + mInfluence;
          s === 0 ? ctx.moveTo(xp, yp) : ctx.lineTo(xp, yp);
        }
        const ratio = l / LINES;
        const r = Math.round(184 - (184 - 77) * ratio);
        const g = Math.round(148 + (122 - 148) * ratio);
        const b = Math.round(58 + (106 - 58) * ratio);
        const alpha = 0.12 + 0.22 * Math.sin(ratio * Math.PI);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.stroke();
      }
    }

    function drawLorenz() {
      ctx.lineWidth = 0.9;
      for (let i = 1; i < lorenzPts.length; i++) {
        const frac = i / lorenzPts.length;
        const p1 = projectL(lorenzPts[i - 1].x, lorenzPts[i - 1].y, lorenzPts[i - 1].z);
        const p2 = projectL(lorenzPts[i].x, lorenzPts[i].y, lorenzPts[i].z);
        const alpha = frac * 0.55;
        const r = Math.round(184 - 60 * frac);
        const g = Math.round(148 - 10 * frac);
        const b = Math.round(58 + 40 * frac);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    let frameCount = 0;
    let rafId: number;

    function animate() {
      perturbX += (targetPerturbX - perturbX) * 0.04;
      perturbY += (targetPerturbY - perturbY) * 0.04;
      for (let i = 0; i < 6; i++) lorenzStep();
      t += 0.012;
      frameCount++;
      if (frameCount % 3 === 0) spawnParticle();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawWaveField();
      drawLorenz();
      drawParticles();
      drawTipGlow();
      rafId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw", height: "100vh",
        opacity: 0.55,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}