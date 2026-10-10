/* Adapted from Kokonut UI Background Paths (MIT), Dorian Baffier.
 * https://21st.dev/@kokonutd/components/background-paths
 * https://github.com/kokonut-labs/kokonutui/blob/main/components/kokonutui/background-paths.tsx
 * The upstream path generator is retained; CSS replaces Motion for this subtle layer.
 * See KOKONUT-LICENSE.txt. */
import React, { memo } from 'react';

function aestheticPath(index, position) {
  const phase = index * .2;
  const points = Array.from({ length: 11 }, (_, i) => {
    const progress = i / 10, eased = 1 - (1 - progress) ** 2;
    const amplitude = 1 - eased * .3;
    const wave = Math.sin(progress * Math.PI * 3 + phase) * 105 * amplitude
      + Math.cos(progress * Math.PI * 4 + phase) * 45 * amplitude
      + Math.sin(progress * Math.PI * 2 + phase) * 30 * amplitude;
    return { x: (2400 - 4800 * eased) * position, y: 800 + (-1600 + index * 25) * eased + wave };
  });
  return points.map((p, i) => {
    if (!i) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    return `C ${prev.x + (p.x - prev.x) * .4} ${prev.y}, ${prev.x + (p.x - prev.x) * .6} ${p.y}, ${p.x} ${p.y}`;
  }).join(' ');
}

export default memo(function BackgroundPaths() {
  return <svg className="background-paths" aria-hidden="true" viewBox="-2400 -1200 4800 2400" preserveAspectRatio="xMidYMid slice">
    {[1, -1].flatMap(position => Array.from({ length: 10 }, (_, i) =>
      <path key={`${position}-${i}`} d={aestheticPath(i, position)} pathLength="1" style={{ '--delay': `${i * -.9}s`, '--duration': `${20 + i}s` }} />))}
  </svg>;
});
