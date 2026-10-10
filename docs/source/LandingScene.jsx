import { useEffect, useRef, useState } from 'react';
import ParticleField from './showcase/ParticleField';
import BackgroundPaths from './showcase/BackgroundPaths';

export default function LandingScene() {
  const [paused, setPaused] = useState(false), [form, setForm] = useState('helix');
  const reduced = useRef(matchMedia('(prefers-reduced-motion: reduce)'));
  const layer = useRef(null);
  useEffect(() => {
    let frame = null, toggle;
    function updateButton() {
      if (!toggle) return;
      const isPaused = paused || reduced.current.matches;
      toggle.setAttribute('aria-pressed', String(isPaused));
      toggle.setAttribute('aria-label', isPaused ? toggle.dataset.resume : toggle.dataset.pause);
      toggle.disabled = reduced.current.matches;
      toggle.querySelector('span').textContent = isPaused ? toggle.dataset.resume : toggle.dataset.pause;
    }
    const click = () => setPaused(value => !value);
    const bind = () => {
      toggle?.removeEventListener('click', click);
      toggle = document.getElementById('motion-toggle');
      if (toggle) toggle.hidden = false;
      toggle?.addEventListener('click', click); updateButton();
    };
    function scroll() {
      frame = null;
      const progress = Math.max(0, Math.min(1, scrollY / Math.max(1, innerHeight * 1.2)));
      layer.current.style.setProperty('--scroll-progress', reduced.current.matches ? '0' : String(progress));
      layer.current.dataset.scrollProgress = progress.toFixed(3);
      setForm(progress > .6 ? 'mark' : 'helix');
    }
    const request = () => { if (frame === null) frame = requestAnimationFrame(scroll); };
    const motionChange = () => { updateButton(); request(); };
    bind(); request();
    document.addEventListener('site:render', bind);
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    reduced.current.addEventListener('change', motionChange);
    return () => {
      toggle?.removeEventListener('click', click); document.removeEventListener('site:render', bind);
      window.removeEventListener('scroll', request); window.removeEventListener('resize', request);
      reduced.current.removeEventListener('change', motionChange); if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [paused]);
  return <div ref={layer} className="landing-sculpture"><BackgroundPaths /><ParticleField form={form} paused={paused} variant="landing" pointerTarget={document.body} /></div>;
}
