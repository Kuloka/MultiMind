import { useEffect, useRef, useState } from 'react';
import ParticleField from './showcase/ParticleField';
import BackgroundPaths from './showcase/BackgroundPaths';

export default function LandingScene() {
  const [progress, setProgress] = useState(0);
  const [cloud, setCloud] = useState(null);
  const reduced = useRef(matchMedia('(prefers-reduced-motion: reduce)'));
  const layer = useRef(null);
  useEffect(() => {
    document.documentElement.classList.add('scroll-clouds');
    return () => document.documentElement.classList.remove('scroll-clouds');
  }, []);
  useEffect(() => {
    let frame = null;
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
        const offset = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        return !nearest || distance < nearest.distance ? { chapter, distance, offset, halfSpan: r.height / 2 } : nearest;
      }, null);
      layer.current.dataset.chapter = active?.chapter.dataset.chapter || '0';
      // Hold the copy sharp for most of each chapter, then ease it out near the boundary.
      const fade = active ? Math.max(0, Math.min(1, (active.distance / active.halfSpan - .55) / .45)) : 1;
      const visibility = 1 - fade * fade * (3 - 2 * fade);
      layer.current.style.setProperty('--cloud-visibility', String(visibility));
      layer.current.style.setProperty('--caption-shift', `${reduced.current.matches ? 0 : Math.sign(active?.offset || 0) * (1 - visibility) * 32}px`);
      layer.current.style.setProperty('--caption-blur', `${reduced.current.matches ? 0 : (1 - visibility) * 10}px`);
      if (active) {
        const id = active.chapter.dataset.chapter;
        const html = active.chapter.querySelector('.chapter-copy').innerHTML;
        setCloud(previous => previous?.id === id && previous.html === html ? previous : { id, html });
      }
      setProgress(reduced.current.matches ? 0 : progress);
    }
    const request = () => { if (frame === null) frame = requestAnimationFrame(scroll); };
    request();
    document.addEventListener('site:render', request);
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    reduced.current.addEventListener('change', request);
    return () => {
      document.removeEventListener('site:render', request);
      window.removeEventListener('scroll', request); window.removeEventListener('resize', request);
      reduced.current.removeEventListener('change', request); if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);
  const anchor = cloud ? [.72, .53, .33, .65][Number(cloud.id) - 1] : .72;
  return <div ref={layer} className="landing-sculpture"><BackgroundPaths /><ParticleField form="helix" interactive={false} variant="landing" scrollProgress={progress} anchorIndex={anchor} />
    {cloud && <div className="scroll-caption" data-caption-chapter={cloud.id}>
      <div className="caption-copy" dangerouslySetInnerHTML={{ __html: cloud.html }} />
    </div>}
  </div>;
}
