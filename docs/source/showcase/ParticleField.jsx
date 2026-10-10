import React, { useEffect, useRef } from 'react';
const MARK = [
  'M28 168 99 43C112 20 134 20 148 43L222 168C191 154 175 130 151 101 137 83 120 78 106 94 81 123 59 150 28 168Z',
  'M30 178C65 158 79 134 105 120 124 110 139 113 154 127 177 147 192 174 216 195 235 213 217 239 193 225 164 208 148 171 133 162 120 154 111 169 102 184L75 222C60 243 28 237 23 217 19 202 23 188 30 178Z'
];
const random = i => { const n = Math.sin(i * 127.13 + 17.9) * 43758.5453; return n - Math.floor(n); };

export default function ParticleField({ form = 'orbit', paused = false, variant = 'hero', interactive = true, pointerTarget = null, scrollProgress = 0, anchorIndex = .72 }) {
  const canvas = useRef(null), state = useRef({ form, paused, scrollProgress, anchorIndex });
  state.current = { form, paused, scrollProgress, anchorIndex };
  useEffect(() => {
    const element = canvas.current, ctx = element.getContext('2d');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const count = variant === 'landing' ? (innerWidth < 760 ? 2400 : 5200) : (innerWidth < 760 ? 1600 : 3200);
    const sampler = document.createElement('canvas'); sampler.width = sampler.height = 256;
    const sample = sampler.getContext('2d'); sample.fillStyle = 'white';
    MARK.forEach(d => sample.fill(new Path2D(d)));
    const pixels = sample.getImageData(0, 0, 256, 256).data, logo = [];
    for (let y = 20; y < 240; y += 2) for (let x = 18; x < 238; x += 2)
      if (pixels[(y * 256 + x) * 4 + 3] > 100) logo.push([(x - 128) / 100, (128 - y) / 100]);
    const points = Array.from({ length: count }, (_, i) => ({ x: 0, y: 0, z: 0, seed: random(i), target: logo[Math.floor(random(i + 9) * logo.length)] }));
    let width = 1, height = 1, frame, last = 0, elapsed = 0, entered = false, displaySize = 0, drawnSignature = '';
    const mouse = { x: 0, y: 0, active: false };
    const resize = () => { const r = element.getBoundingClientRect(); width = r.width; height = r.height;
      const dpr = Math.min(devicePixelRatio || 1, 1.6); element.width = Math.round(width * dpr); element.height = Math.round(height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const observer = new ResizeObserver(resize); observer.observe(element);
    const move = e => { const r = element.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true; };
    const leave = () => { mouse.active = false; };
    const host = pointerTarget || element.parentElement; host.addEventListener('pointermove', move, { passive: true }); host.addEventListener('pointerleave', leave);
    function draw(now) {
      const delta = Math.min(.05, (now - (last || now)) / 1000); last = now;
      if (document.hidden) { frame = requestAnimationFrame(draw); return; }
      const stopped = state.current.paused || reduced.matches || document.hidden;
      if (!stopped) elapsed += delta;
      const signature = `${state.current.form}:${width}:${height}:${reduced.matches}:${state.current.anchorIndex}`;
      if (stopped && entered && signature === drawnSignature) { frame = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, width, height);
      const mobile = width < 760, hero = variant === 'hero' || variant === 'landing';
      const centerX = width * (variant === 'landing' ? .5 : hero && !mobile ? .7 : .5), centerY = height * (variant === 'landing' ? .5 : hero ? (mobile ? .65 : .52) : .5);
      const targetSize = variant === 'landing' ? height * .4 : Math.min(width * (hero ? (mobile ? .31 : .2) : .4), height * (state.current.form === 'helix' ? .24 : .31));
      displaySize += (targetSize - displaySize) * (entered && !reduced.matches ? 1 - Math.exp(-delta * 5) : 1);
      const size = displaySize;
      const angle = elapsed * (variant === 'landing' ? .34 : .13) + state.current.scrollProgress * Math.PI * .8, ct = Math.cos(angle), st = Math.sin(angle);
      const motion = entered && !reduced.matches ? 1 - Math.exp(-delta * 5) : 1;
      const rendered = [];
      for (let i = 0; i < count; i++) {
        const p = points[i], u = i / count, theta = u * Math.PI * 2 * 17, phi = p.seed * Math.PI * 2;
        let x, y, z;
        if (state.current.form === 'helix') {
          const a = u * Math.PI * 7 + elapsed * (variant === 'landing' ? .6 : .36) + (i % 2) * Math.PI;
          const r = .8 + (random(i + 1) - .5) * .16;
          x = Math.cos(a) * r; z = Math.sin(a) * r; y = (u - .5) * 3.15;
          if (i % 7 === 0) { const bridge = random(i + 2); x *= bridge; z *= bridge; }
        } else if (state.current.form === 'mark') {
          x = p.target[0] * 1.35; y = p.target[1] * 1.35; z = (p.seed - .5) * .22;
        } else {
          const twist = theta * 1.5 + elapsed * .18;
          const radius = .92 + .3 * Math.cos(twist);
          x = radius * Math.cos(theta); z = radius * Math.sin(theta);
          y = .4 * Math.sin(twist) + (random(i + 3) - .5) * .13;
          x += Math.cos(phi) * .08; z += Math.sin(phi) * .08;
        }
        p.x += (x - p.x) * motion; p.y += (y - p.y) * motion; p.z += (z - p.z) * motion;
        const spin = state.current.form === 'mark' ? Math.sin(elapsed * .35) * .13 : angle;
        const c = state.current.form === 'mark' ? Math.cos(spin) : ct, s = state.current.form === 'mark' ? Math.sin(spin) : st;
        let rx = p.x * c + p.z * s, rz = -p.x * s + p.z * c;
        const ry = p.y * .96 - rz * .27; rz = p.y * .27 + rz * .96;
        const perspective = 3.8 / (3.8 - rz * .35);
        let sx = centerX + rx * (variant === 'landing' ? width * .54 : size) * perspective, sy = centerY - ry * size * perspective;
        if (mouse.active && interactive && !stopped) {
          const dx = sx - mouse.x, dy = sy - mouse.y, d = Math.hypot(dx, dy);
          if (d < 150 && d > .01) { const force = (1 - d / 150) ** 2 * 36; sx += dx / d * force; sy += dy / d * force; }
        }
        if (variant === 'landing' && i === Math.floor(count * state.current.anchorIndex)) {
          element.parentElement.style.setProperty('--anchor-x', `${sx.toFixed(2)}px`);
          element.parentElement.style.setProperty('--anchor-y', `${sy.toFixed(2)}px`);
        }
        rendered.push({ x: sx, y: sy, z: rz, alpha: Math.max(.13, Math.min(.95, (variant === 'landing' ? .65 : .5) + rz * .25)), radius: ((variant === 'landing' ? .75 : .6) + p.seed * .9) * perspective });
      }
      rendered.sort((a, b) => a.z - b.z);
      for (const p of rendered) { ctx.globalAlpha = p.alpha; ctx.fillStyle = variant === 'landing' ? '#ededed' : '#f2f1eb'; ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill(); }
      ctx.globalAlpha = 1; entered = true; drawnSignature = signature; frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave); };
  }, [variant, interactive, pointerTarget]);
  return <canvas ref={canvas} className="particle-field" data-particle-form={form} aria-hidden="true" />;
}
