import { useEffect, useRef, useState } from 'react';
import ParticleField from './showcase/ParticleField';
import BackgroundPaths from './showcase/BackgroundPaths';

export default function LandingScene() {
  const [paused, setPaused] = useState(false), [progress, setProgress] = useState(0);
  const [cloud, setCloud] = useState(null);
  const reduced = useRef(matchMedia('(prefers-reduced-motion: reduce)'));
  const layer = useRef(null);
  useEffect(() => {
    document.documentElement.classList.add('scroll-clouds');
    return () => document.documentElement.classList.remove('scroll-clouds');
  }, []);
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
      request();
    };
    function scroll() {
      frame = null;
      const story = document.getElementById('possibilities');
      const end = story ? story.offsetTop + story.offsetHeight : innerHeight * 5;
      const progress = Math.max(0, Math.min(1, scrollY / Math.max(1, end - innerHeight)));
      const outro = Math.max(0, Math.min(1, (scrollY - end + innerHeight * .3) / innerHeight));
      layer.current.style.setProperty('--story-outro', String(outro));
      layer.current.dataset.scrollProgress = progress.toFixed(3);
      const chapters = [...document.querySelectorAll('.feature-story')];
      const active = chapters.reduce((nearest, chapter) => {
        const r = chapter.getBoundingClientRect(), distance = Math.abs(r.top + r.height / 2 - innerHeight / 2);
        return !nearest || distance < nearest.distance ? { chapter, distance } : nearest;
      }, null);
      layer.current.dataset.chapter = active?.chapter.dataset.chapter || '0';
      const visibility = active ? Math.max(0, 1 - active.distance / (innerHeight * .48)) : 0;
      layer.current.style.setProperty('--cloud-visibility', String(visibility));
      if (active) {
        const id = active.chapter.dataset.chapter;
        const html = active.chapter.querySelector('.chapter-copy').innerHTML;
        setCloud(previous => previous?.id === id && previous.html === html ? previous : { id, html });
      }
      setProgress(reduced.current.matches ? 0 : progress);
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
  const anchor = cloud ? [.72, .53, .33, .65][Number(cloud.id) - 1] : .72;
  return <div ref={layer} className="landing-sculpture"><BackgroundPaths /><ParticleField form="helix" paused={paused} variant="landing" pointerTarget={document.body} scrollProgress={progress} anchorIndex={anchor} />
    {cloud && <div className={`spiral-cloud ${Number(cloud.id) % 2 ? 'cloud-right' : 'cloud-left'}`} data-cloud-chapter={cloud.id}>
      <i className="cloud-origin" /><i className="cloud-connector" />
      <div className="cloud-bubble" dangerouslySetInnerHTML={{ __html: cloud.html }} />
    </div>}
  </div>;
}
