import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ParticleField from './ParticleField';
import BackgroundPaths from './BackgroundPaths';
import './showcase.css';

const scenes = [ { id: 'orbit', label: 'Орбита', number: '01' }, { id: 'helix', label: 'Спираль', number: '02' }, { id: 'mark', label: 'Aether', number: '03' } ];
const examples = [ { text: 'Создай интерактивную спираль', form: 'helix' }, { text: 'Собери лого из частиц', form: 'mark' }, { text: 'Покажи вращающуюся орбиту', form: 'orbit' } ];
const snippet = `// Двигай курсором — частицы отступают\nconst dx = particle.x - pointer.x;\nconst dy = particle.y - pointer.y;\nconst distance = Math.hypot(dx, dy);\n\nif (distance < 150) {\n  const force = (1 - distance / 150) ** 2;\n  particle.x += dx * force * 0.24;\n  particle.y += dy * force * 0.24;\n}\n\nrequestAnimationFrame(draw);`;
function Icon({ name = 'arrow', size = 18 }) {
  const paths = { arrow: 'M5 12h14m-6-6 6 6-6 6', up: 'm6 14 6-6 6 6M12 8v12', pause: 'M8 5v14M16 5v14', play: 'm8 5 11 7-11 7Z', expand: 'M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5', close: 'm6 6 12 12M6 18 18 6', restart: 'M3 10a9 9 0 1 1 1 7M3 4v6h6' };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
function Mark({ className = '' }) { return <img className={className} src="../assets/logo.svg" alt="" width="28" height="28" />; }

function App() {
  const [form, setForm] = useState('orbit'), [paused, setPaused] = useState(false), [auto, setAuto] = useState(false);
  const [recording, setRecording] = useState(false), [notice, setNotice] = useState('');
  const [prompt, setPrompt] = useState(examples[0].text), [status, setStatus] = useState('idle'), [answer, setAnswer] = useState('');
  const [result, setResult] = useState('orbit'), [tab, setTab] = useState('preview'), [fullscreen, setFullscreen] = useState(false);
  const [submitted, setSubmitted] = useState(''), [demoPaused, setDemoPaused] = useState(false);
  const input = useRef(), timers = useRef([]), preview = useRef(), hero = useRef();

  useEffect(() => {
    if (!auto || paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setForm(previous => scenes[(scenes.findIndex(s => s.id === previous) + 1) % scenes.length].id), 5500);
    return () => clearInterval(timer);
  }, [auto, paused]);
  useEffect(() => {
    const key = e => {
      if (e.key === 'Escape') { setRecording(false); setFullscreen(false); }
      if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey && !e.altKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        e.preventDefault(); setRecording(r => !r); window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };
    const change = () => { if (!document.fullscreenElement) setFullscreen(false); };
    window.addEventListener('keydown', key); document.addEventListener('fullscreenchange', change);
    return () => { window.removeEventListener('keydown', key); document.removeEventListener('fullscreenchange', change); timers.current.forEach(clearTimeout); };
  }, []);
  useEffect(() => { document.body.classList.toggle('recording', recording); return () => document.body.classList.remove('recording'); }, [recording]);

  async function record() {
    setRecording(true); setAuto(true); setPaused(false); window.scrollTo({ top: 0, behavior: 'instant' });
    try { if (!document.fullscreenElement) await document.documentElement.requestFullscreen(); }
    catch { setNotice('Режим съёмки включён. Полный экран можно открыть клавишей F11.'); }
  }
  async function expand() {
    setFullscreen(true);
    try { if (!document.fullscreenElement) await preview.current.requestFullscreen(); }
    catch { setNotice('Полноэкранное демо открыто внутри страницы. Escape — вернуться.'); }
  }
  async function closePreview() {
    setFullscreen(false); if (document.fullscreenElement === preview.current) await document.exitFullscreen();
  }
  function cancel() { timers.current.forEach(clearTimeout); timers.current = []; setStatus('idle'); setAnswer(''); }
  function generate(value = prompt) {
    if (status === 'generating') return;
    const clean = value.trim();
    if (!clean) { setNotice('Напиши запрос или выбери пример.'); input.current.focus(); return; }
    const selected = /лог|logo|aether/i.test(clean) ? examples[1] : /спира|spiral|helix/i.test(clean) ? examples[0] : /орбит|orbit/i.test(clean) ? examples[2] : null;
    if (!selected) { setNotice('В демо есть три готовых примера: спираль, логотип и орбита. Выбери любой ниже.'); input.current.focus(); return; }
    timers.current.forEach(clearTimeout); timers.current = [];
    setNotice(''); setSubmitted(clean); setStatus('generating'); setAnswer(''); setTab('preview'); setDemoPaused(false);
    const response = `Готово. ${selected.form === 'mark' ? 'Логотип собран из частиц.' : selected.form === 'helix' ? 'Спираль уже движется.' : 'Орбита вращается.'} Двигай курсором внутри сцены — частицы отреагируют. Можно поставить движение на паузу или открыть сцену во весь экран.`;
    timers.current.push(setTimeout(() => {
      setResult(selected.form);
      for (let i = 1; i <= response.length; i++) timers.current.push(setTimeout(() => {
        setAnswer(response.slice(0, i)); if (i === response.length) setStatus('done');
      }, i * 12));
    }, 550));
  }
  function openDemo() { document.getElementById('playground').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }

  return <>
    <a className="skip-link" href="#playground">К демонстрации</a>
    <header className="site-header"><a className="brand" href="#top" aria-label="AetherAI — начало"><Mark /><span>AetherAI</span></a>
      <nav aria-label="Основная навигация"><a href="#playground">В действии</a><button className="record-button" onClick={record}>Режим съёмки <span>R</span></button><a className="nav-download" href="https://github.com/Kuloka/AetherAI/releases/latest">Скачать <Icon /></a></nav>
    </header>
    <main>
      <section className="hero" id="top" ref={hero} aria-label="AetherAI — интерактивная сцена">
        <BackgroundPaths /><ParticleField form={form} paused={paused} variant={recording ? 'record' : 'hero'} />
        <div className="hero-vignette" />
        <div className="hero-copy"><div className="hero-intro"><span className="status-light" /> Локально. В облаке. На твоих условиях.</div>
          <h1>Сначала<br />была <span>мысль.</span></h1>
          <p>Дай ей форму.<br />Модели, инструменты и идеи — в AetherAI.</p>
          <div className="hero-actions"><button className="primary-button" onClick={openDemo}>Попробовать в действии <Icon /></button><a className="text-link" href="https://github.com/Kuloka/AetherAI/releases/latest">Скачать приложение <Icon /></a></div>
        </div>
        <div className="sculpture-label"><span className="crosshair">+</span><span>{form === 'orbit' ? 'Мысль в движении' : form === 'helix' ? 'У всего есть структура' : 'Из частей — целое'}<small>Проведи курсором</small></span></div>
        <div className="scene-bar"><div className="scene-selector" role="group" aria-label="Форма частиц">{scenes.map(scene => <button key={scene.id} aria-pressed={form === scene.id} onClick={() => { setForm(scene.id); setAuto(false); }}><small>{scene.number}</small>{scene.label}</button>)}</div>
          <div className="motion-controls"><button aria-label={paused ? 'Продолжить анимацию' : 'Приостановить анимацию'} onClick={() => setPaused(p => !p)}><Icon name={paused ? 'play' : 'pause'} /></button><button className={auto ? 'active' : ''} aria-pressed={auto} onClick={() => setAuto(a => !a)}>Автопилот</button></div>
          <a href="#playground" className="scroll-link">Листай дальше <span>↓</span></a>
        </div>
        {recording && <button className="exit-recording" onClick={async () => { setRecording(false); if (document.fullscreenElement) await document.exitFullscreen(); }}>Выйти <span>Esc</span></button>}
      </section>

      <section className="playground" id="playground">
        <div className="section-heading"><h2>Не просто ответ.<br /><span>Что-то настоящее.</span></h2><p>Запусти пример.<br />Посмотри, как идея начинает двигаться.</p></div>
        <div className="demo-shell">
          <div className="demo-chat"><div className="demo-brand"><Mark /><strong>AetherAI</strong><span>Демо</span></div>
            <div className="conversation"><div className="chat-greeting">Что создадим?</div><p className="chat-explainer">Выбери пример или опиши спираль, логотип или орбиту.</p>
              {submitted && <div className="user-bubble">{submitted}</div>}
              {status === 'generating' && !answer && <div className="thinking"><Mark /><span>Собираю сцену<span className="thinking-dots">…</span></span></div>}
              {answer && <div className="assistant-answer"><Mark /><p>{answer}{status === 'generating' && <span className="typing-caret" />}</p></div>}
            </div>
            <div className="example-prompts">{examples.map(example => <button key={example.form} onClick={() => { setPrompt(example.text); input.current.focus(); }}>{example.text}<span>↗</span></button>)}</div>
            <form onSubmit={e => { e.preventDefault(); generate(); }} className="composer"><label className="sr-only" htmlFor="demo-prompt">Запрос для примера</label><textarea id="demo-prompt" ref={input} value={prompt} rows={2} onChange={e => setPrompt(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generate(); } }} placeholder="Что ты хочешь создать?" />
              <div className="composer-footer"><span>Интерактивный пример</span>{status === 'generating' ? <button className="send-button" type="button" aria-label="Остановить демонстрацию" onClick={cancel}><Icon name="pause" /></button> : <button className="send-button" type="submit" aria-label="Запустить пример"><Icon name="up" /></button>}</div>
            </form>
            <p className="demo-disclaimer">Готовые сцены для демонстрации. Запросы к ИИ не отправляются.</p>
          </div>
          <div ref={preview} className={`demo-preview${fullscreen ? ' expanded' : ''}`}><div className="preview-toolbar"><div role="group" aria-label="Режим просмотра"><button aria-pressed={tab === 'preview'} className={tab === 'preview' ? 'selected' : ''} onClick={() => setTab('preview')}>Результат</button><button aria-pressed={tab === 'code'} className={tab === 'code' ? 'selected' : ''} onClick={() => setTab('code')}>Как это работает</button></div>
              <div><button aria-label="Повторить пример" onClick={() => generate(submitted || prompt)} disabled={status === 'generating'}><Icon name="restart" /></button><button aria-label={fullscreen ? 'Закрыть полный экран' : 'Открыть результат во весь экран'} onClick={fullscreen ? closePreview : expand}><Icon name={fullscreen ? 'close' : 'expand'} /></button></div></div>
            {tab === 'preview' ? <div className="result-stage"><ParticleField form={result} paused={demoPaused} variant="demo" /><div className="result-watermark">{result === 'mark' ? 'AetherAI' : result === 'helix' ? 'Everything is connected.' : 'Make something move.'}</div><div className="result-controls"><span><span className="status-light" /> {status === 'generating' ? 'Собирается' : 'Можно взаимодействовать'}</span><button aria-label={demoPaused ? 'Продолжить результат' : 'Приостановить результат'} onClick={() => setDemoPaused(p => !p)}><Icon name={demoPaused ? 'play' : 'pause'} /></button></div></div> : <div className="code-view"><div>Реакция частиц на курсор</div><pre><code>{snippet}</code></pre><p>Каждый кадр пересчитывает положение точек. Рядом с курсором они отклоняются; при смене сцены плавно переходят в новую форму.</p></div>}
          </div>
        </div>
        <div className="demo-foot"><span>Твой курсор — часть сцены.</span><span>React · Canvas · AetherAI</span></div>
      </section>
      <section className="download-section" id="download"><Mark /><h2>Теперь —<br />на твоём компьютере.</h2><p>Локальные модели и облачные провайдеры в одном приложении.</p><a className="primary-button" href="https://github.com/Kuloka/AetherAI/releases/latest">Скачать AetherAI <Icon /></a><span className="platforms">Windows · macOS · Linux</span></section>
    </main>
    <footer><a href="#top" className="brand"><Mark /><span>AetherAI</span></a><span>Из мысли — в действие.</span><a href="https://github.com/Kuloka/AetherAI">GitHub ↗</a></footer>
    <div className="announcement sr-only" role="status" aria-live="polite">{status === 'done' ? 'Пример готов. Результат доступен справа.' : ''}</div>
    {notice && <div className="notice" role="status"><span>{notice}</span><button aria-label="Закрыть уведомление" onClick={() => setNotice('')}><Icon name="close" /></button></div>}
  </>;
}
createRoot(document.getElementById('root')).render(<App />);
