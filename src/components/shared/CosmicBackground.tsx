'use client';
import { useEffect, useRef } from 'react';

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let stars: { x: number; y: number; r: number; a: number; da: number; color: string }[] = [];
    let shootingStars: { x: number; y: number; len: number; speed: number; angle: number; life: number; maxLife: number }[] = [];

    const STAR_COLORS = [
      'rgba(255,255,255,',
      'rgba(200,180,255,',
      'rgba(255,220,150,',
      'rgba(150,200,255,',
      'rgba(255,180,220,',
      'rgba(180,255,220,',
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 4000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.015,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }));
    };

    const maybeShoot = () => {
      if (Math.random() < 0.003 && shootingStars.length < 2) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.4,
          len: 60 + Math.random() * 80,
          speed: 8 + Math.random() * 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          life: 0,
          maxLife: 30 + Math.random() * 20,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        s.a += s.da;
        if (s.a > 1 || s.a < 0.1) s.da *= -1;
        s.a = Math.max(0.05, Math.min(1, s.a));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${s.a.toFixed(2)})`;
        ctx.fill();
        if (s.r > 1) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `${s.color}${(s.a * 0.08).toFixed(2)})`;
          ctx.fill();
        }
      }

      maybeShoot();
      shootingStars = shootingStars.filter(ss => {
        ss.life++;
        if (ss.life > ss.maxLife) return false;
        const progress = ss.life / ss.maxLife;
        const alpha = progress < 0.5 ? progress * 2 : 2 * (1 - progress);
        const x = ss.x + Math.cos(ss.angle) * ss.speed * ss.life;
        const y = ss.y + Math.sin(ss.angle) * ss.speed * ss.life;
        const tailX = x - Math.cos(ss.angle) * ss.len;
        const tailY = y - Math.sin(ss.angle) * ss.len;

        const grad = ctx.createLinearGradient(tailX, tailY, x, y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.7, `rgba(200,180,255,${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(255,255,255,${alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
        return true;
      });

      animId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />
      <div className="nebula-bg" aria-hidden="true" />
    </>
  );
}
