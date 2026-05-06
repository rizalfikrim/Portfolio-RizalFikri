"use client";

import { useEffect, useRef, useCallback } from "react";

interface Vec2 {
  x: number;
  y: number;
}

const GRAVITY = 0.5;
const DAMPING = 0.88;
const FRICTION = 1;
const SEGMENT_LENGTH = 20;
const SEGMENTS = 14;
const ITERATIONS = 15;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface Point {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  pinned: boolean;
}
interface Stick {
  p0: number;
  p1: number;
  length: number;
}

function createLanyard(
  anchorX: number,
  anchorY: number,
): { points: Point[]; sticks: Stick[] } {
  const points: Point[] = [];
  const sticks: Stick[] = [];
  for (let i = 0; i <= SEGMENTS; i++) {
    const jitter = i === 0 ? 0 : (Math.random() - 0.5) * 4;
    points.push({
      x: anchorX + jitter,
      y: anchorY + i * SEGMENT_LENGTH,
      oldX: anchorX + jitter,
      oldY: anchorY + i * SEGMENT_LENGTH - 1,
      pinned: i === 0,
    });
  }
  for (let i = 0; i < points.length - 1; i++) {
    sticks.push({ p0: i, p1: i + 1, length: SEGMENT_LENGTH });
  }
  return { points, sticks };
}

export default function Lanyard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const sticksRef = useRef<Stick[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<Vec2>({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragIndex = useRef(-1);
  const anchorRef = useRef<Vec2>({ x: 0, y: 0 });
  const sizeRef = useRef({ w: 0, h: 0 });
  const cardSize = useRef({ w: 140, h: 195 });
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D flip state
  const flipAngle = useRef(0); // radians, Y-axis rotation
  const flipVel = useRef(0);
  const prevCardX = useRef(0);

  const getCanvasPos = useCallback((clientX: number, clientY: number): Vec2 => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  }, []);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = canvas;
    sizeRef.current = { w: width, h: height };
    const ax = width / 2;
    const ay = 28;
    anchorRef.current = { x: ax, y: ay };
    const { points, sticks } = createLanyard(ax, ay);
    pointsRef.current = points;
    sticksRef.current = sticks;
    prevCardX.current = ax;
  }, []);

  const simulate = useCallback(() => {
    const pts = pointsRef.current;
    const stks = sticksRef.current;
    const { w, h } = sizeRef.current;

    for (const p of pts) {
      if (p.pinned) continue;
      const vx = (p.x - p.oldX) * FRICTION;
      const vy = (p.y - p.oldY) * FRICTION;
      p.oldX = p.x;
      p.oldY = p.y;
      p.x += vx * DAMPING;
      p.y += vy * DAMPING + GRAVITY;
    }

    for (let iter = 0; iter < ITERATIONS; iter++) {
      for (const s of stks) {
        const p0 = pts[s.p0];
        const p1 = pts[s.p1];
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        const diff = (dist - s.length) / dist / 2;
        const offsetX = dx * diff;
        const offsetY = dy * diff;
        if (!p0.pinned) {
          p0.x += offsetX;
          p0.y += offsetY;
        }
        if (!p1.pinned) {
          p1.x -= offsetX;
          p1.y -= offsetY;
        }
      }
      const anchor = pts[0];
      anchor.x = anchorRef.current.x;
      anchor.y = anchorRef.current.y;
      for (const p of pts) {
        if (p.pinned) continue;
        if (p.x < 10) p.x = 10;
        if (p.x > w - 10) p.x = w - 10;
        if (p.y < 10) p.y = 10;
        if (p.y > h - 10) p.y = h - 10;
      }
    }

    // ─── Update 3D flip based on horizontal card velocity ───
    const last = pts[pts.length - 1];
    const cardVelX = last.x - prevCardX.current;
    prevCardX.current = last.x;

    flipVel.current += cardVelX * 0.018; // sensitivity
    flipVel.current *= 0.87; // damping
    flipAngle.current += flipVel.current;
    flipAngle.current *= 0.95; // spring back to 0
  }, []);

  function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pts = pointsRef.current;
    const { w, h } = sizeRef.current;

    ctx.clearRect(0, 0, w, h);

    // Anchor hook
    const ax = anchorRef.current.x;
    const ay = anchorRef.current.y;
    ctx.save();
    ctx.strokeStyle = "rgba(180,190,220,0.7)";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(ax, ay + 12, 8, Math.PI, 0);
    ctx.stroke();
    ctx.fillStyle = "rgba(140,155,190,0.9)";
    ctx.fillRect(ax - 4, ay - 6, 8, 16);
    ctx.restore();

    if (pts.length < 2) return;

    // Lanyard strap
    ctx.save();
    ctx.strokeStyle = "rgba(0,200,255,0.85)";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = "rgba(0,212,255,0.4)";
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      const midX = (pts[i - 1].x + pts[i].x) / 2;
      const midY = (pts[i - 1].y + pts[i].y) / 2;
      ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, midX, midY);
    }
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 2;
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      const midX = (pts[i - 1].x + pts[i].x) / 2;
      const midY = (pts[i - 1].y + pts[i].y) / 2;
      ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, midX, midY);
    }
    ctx.stroke();
    ctx.restore();

    // Card transform
    const last = pts[pts.length - 1];
    const prev = pts[pts.length - 3];
    const swingAngle =
      Math.atan2(last.y - prev.y, last.x - prev.x) - Math.PI / 2;

    const cw = cardSize.current.w;
    const ch = cardSize.current.h;

    // ─── 3D flip ───
    const fa = flipAngle.current;
    const cosFlip = Math.cos(fa);
    const isBack = cosFlip < 0;
    const scaleX = Math.abs(cosFlip);

    ctx.save();
    ctx.translate(last.x, last.y);
    ctx.rotate(swingAngle);

    // Horizontal squish = Y-axis perspective
    ctx.scale(scaleX, 1);
    // Mirror when showing back
    if (isBack) ctx.scale(-1, 1);

    // Card shadow
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 8;

    if (!isBack) {
      // ── FRONT SIDE ──
      const cardGrad = ctx.createLinearGradient(-cw / 2, 0, cw / 2, ch);
      cardGrad.addColorStop(0, "#0e1428");
      cardGrad.addColorStop(1, "#141e38");
      ctx.fillStyle = cardGrad;
      ctx.beginPath();
      roundRect(ctx, -cw / 2, 0, cw, ch, 12);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.strokeStyle = "rgba(0,212,255,0.35)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      roundRect(ctx, -cw / 2, 0, cw, ch, 12);
      ctx.stroke();

      // Clip hole
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.beginPath();
      ctx.arc(0, 14, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(0,212,255,0.5)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 14, 5, 0, Math.PI * 2);
      ctx.stroke();

      // Top band
      const bandGrad = ctx.createLinearGradient(-cw / 2, 28, cw / 2, 28);
      bandGrad.addColorStop(0, "rgba(0,212,255,0.15)");
      bandGrad.addColorStop(0.5, "rgba(0,212,255,0.3)");
      bandGrad.addColorStop(1, "rgba(124,58,237,0.2)");
      ctx.fillStyle = bandGrad;
      ctx.fillRect(-cw / 2, 28, cw, 26);

      ctx.fillStyle = "rgba(0,212,255,0.9)";
      ctx.font = "bold 7px 'Orbitron', monospace";
      ctx.textAlign = "center";
      ctx.fillText("AVAILABLE FOR HIRE", 0, 45);

      // Avatar
      ctx.fillStyle = "rgba(0,212,255,0.08)";
      ctx.strokeStyle = "rgba(0,212,255,0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 95, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(0,212,255,0.9)";
      ctx.font = "bold 14px 'Orbitron', monospace";
      ctx.textAlign = "center";
      ctx.fillText("RFM", 0, 101);

      // Name & role
      ctx.fillStyle = "rgba(220,232,255,0.95)";
      ctx.font = "bold 9.5px 'Orbitron', monospace";
      ctx.fillText("RIZAL FIKRI", 0, 134);
      ctx.fillStyle = "rgba(0,212,255,0.7)";
      ctx.font = "7px 'Rajdhani', sans-serif";
      ctx.fillText("BACKEND DEVELOPER", 0, 148);

      // Divider
      ctx.strokeStyle = "rgba(0,212,255,0.15)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(-cw / 2 + 14, 158);
      ctx.lineTo(cw / 2 - 14, 158);
      ctx.stroke();

      // Barcode
      for (let i = 0; i < 22; i++) {
        const bx = -cw / 2 + 14 + i * 5;
        const bh = i % 3 === 0 ? 12 : i % 2 === 0 ? 8 : 6;
        ctx.fillStyle =
          i % 3 === 0 ? "rgba(0,212,255,0.4)" : "rgba(0,212,255,0.2)";
        ctx.fillRect(bx, 168, 2.5, bh);
      }
    } else {
      // ── BACK SIDE ──
      const backGrad = ctx.createLinearGradient(-cw / 2, 0, cw / 2, ch);
      backGrad.addColorStop(0, "#0a0f1e");
      backGrad.addColorStop(1, "#0d1530");
      ctx.fillStyle = backGrad;
      ctx.beginPath();
      roundRect(ctx, -cw / 2, 0, cw, ch, 12);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.strokeStyle = "rgba(0,212,255,0.2)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      roundRect(ctx, -cw / 2, 0, cw, ch, 12);
      ctx.stroke();

      // Magnetic stripe
      ctx.fillStyle = "rgba(20,20,30,0.95)";
      ctx.fillRect(-cw / 2, 35, cw, 28);
      ctx.fillStyle = "rgba(0,212,255,0.06)";
      ctx.fillRect(-cw / 2, 38, cw, 8);

      // Signature strip
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fillRect(-cw / 2 + 14, 78, cw - 28, 22);
      ctx.strokeStyle = "rgba(0,212,255,0.15)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(-cw / 2 + 14, 78);
      ctx.lineTo(cw / 2 - 14, 78);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-cw / 2 + 14, 100);
      ctx.lineTo(cw / 2 - 14, 100);
      ctx.stroke();

      // Grid pattern
      ctx.strokeStyle = "rgba(0,212,255,0.04)";
      ctx.lineWidth = 0.5;
      for (let gx = -cw / 2; gx < cw / 2; gx += 12) {
        ctx.beginPath();
        ctx.moveTo(gx, 110);
        ctx.lineTo(gx, ch - 14);
        ctx.stroke();
      }
      for (let gy = 110; gy < ch - 14; gy += 12) {
        ctx.beginPath();
        ctx.moveTo(-cw / 2, gy);
        ctx.lineTo(cw / 2, gy);
        ctx.stroke();
      }

      // Center logo on back
      ctx.strokeStyle = "rgba(0,212,255,0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 148, 18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(0,212,255,0.4)";
      ctx.font = "bold 9px 'Orbitron', monospace";
      ctx.textAlign = "center";
      ctx.fillText("RFM", 0, 152);

      ctx.fillStyle = "rgba(0,212,255,0.2)";
      ctx.font = "5px 'Orbitron', monospace";
      ctx.fillText("BACKEND DEVELOPER", 0, 170);
    }

    ctx.restore();

    // Metal clasp
    ctx.save();
    ctx.translate(last.x, last.y);
    ctx.rotate(swingAngle);
    ctx.scale(scaleX, 1);
    if (isBack) ctx.scale(-1, 1);
    ctx.fillStyle = "#8899bb";
    ctx.strokeStyle = "rgba(200,220,255,0.6)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    roundRect(ctx, -6, -8, 12, 10, 3);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }, []);

  const loop = useCallback(() => {
    simulate();
    draw();
    rafRef.current = requestAnimationFrame(loop);
  }, [simulate, draw]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    sizeRef.current = { w: rect.width, h: rect.height };
    anchorRef.current = { x: rect.width / 2, y: 32 };
    init();
  }, [init]);

  // ─── Fixed: rotated bounding box hit detection ───
  const findDragPoint = useCallback((cx: number, cy: number): number => {
    const pts = pointsRef.current;
    if (pts.length < 3) return -1;

    const last = pts[pts.length - 1];
    const prev = pts[pts.length - 3];
    const swingAngle =
      Math.atan2(last.y - prev.y, last.x - prev.x) - Math.PI / 2;

    // Transform click into card's local space
    const dx = cx - last.x;
    const dy = cy - last.y;
    const cosA = Math.cos(-swingAngle);
    const sinA = Math.sin(-swingAngle);
    const localX = dx * cosA - dy * sinA;
    const localY = dx * sinA + dy * cosA;

    const cw = cardSize.current.w;
    const ch = cardSize.current.h;

    // Hit anywhere within card rectangle (with small padding)
    const padding = 10;
    if (
      localX >= -cw / 2 - padding &&
      localX <= cw / 2 + padding &&
      localY >= -padding &&
      localY <= ch + padding
    ) {
      return pts.length - 1;
    }

    // Rope segments
    for (let i = pts.length - 2; i >= 1; i--) {
      const p = pts[i];
      const dist = Math.sqrt((cx - p.x) ** 2 + (cy - p.y) ** 2);
      if (dist < 20) return i;
    }
    return -1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    resize();
    rafRef.current = requestAnimationFrame(loop);
    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);

    const onMouseDown = (e: MouseEvent) => {
      const pos = getCanvasPos(e.clientX, e.clientY);
      const idx = findDragPoint(pos.x, pos.y);
      if (idx >= 0) {
        dragging.current = true;
        dragIndex.current = idx;
        canvas.style.cursor = "grabbing";
      }
    };
    const onMouseMove = (e: MouseEvent) => {
      const pos = getCanvasPos(e.clientX, e.clientY);
      mouseRef.current = pos;
      if (dragging.current && dragIndex.current >= 0) {
        const p = pointsRef.current[dragIndex.current];
        p.x = pos.x;
        p.y = pos.y;
        p.oldX = lerp(p.oldX, pos.x, 0.3);
        p.oldY = lerp(p.oldY, pos.y, 0.3);
      }
    };
    const onMouseUp = () => {
      dragging.current = false;
      dragIndex.current = -1;
      canvas.style.cursor = "grab";
    };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      const pos = getCanvasPos(t.clientX, t.clientY);
      const idx = findDragPoint(pos.x, pos.y);
      if (idx >= 0) {
        dragging.current = true;
        dragIndex.current = idx;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      const pos = getCanvasPos(t.clientX, t.clientY);
      if (dragging.current && dragIndex.current >= 0) {
        const p = pointsRef.current[dragIndex.current];
        p.x = pos.x;
        p.y = pos.y;
        p.oldX = lerp(p.oldX, pos.x, 0.3);
        p.oldY = lerp(p.oldY, pos.y, 0.3);
      }
    };
    const onTouchEnd = () => {
      dragging.current = false;
      dragIndex.current = -1;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [loop, resize, getCanvasPos, findDragPoint]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          cursor: "grab",
          touchAction: "none",
          width: "100%",
          height: "100%",
        }}
      />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500&display=swap');`}</style>
    </div>
  );
}
