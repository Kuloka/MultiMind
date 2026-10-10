'use strict';
const languageFromPath=()=>{const code=location.pathname.split('/')[1];return Object.hasOwn(SITE_COPY,code)?code:'en';};
let language=languageFromPath(), observer;
function renderSite(lang){
 language=lang;
 const c=SITE_COPY[lang];
 document.documentElement.lang=lang;document.title=c.meta[0];
 document.querySelector('meta[name="description"]').content=c.meta[1];
 document.querySelector('meta[property="og:title"]').content=c.meta[0];
 document.querySelector('meta[property="og:description"]').content=c.meta[1];
 const canonical=SITE_ORIGIN+siteLanguagePath(lang);
 document.querySelector('link[rel="canonical"]').href=canonical;
 document.querySelector('meta[property="og:url"]').content=canonical;
 document.querySelector('meta[property="og:locale"]').content=lang==='en'?'en_US':lang==='pt'?'pt_BR':lang+'_'+lang.toUpperCase();
 document.querySelector('meta[name="twitter:title"]').content=c.meta[0];
 document.querySelector('meta[name="twitter:description"]').content=c.meta[1];
 document.getElementById('siteStructuredData').textContent=JSON.stringify(siteStructuredData(lang));
 document.getElementById('page').innerHTML=siteMarkup(lang);
 const toggle=document.getElementById('language-toggle'),list=document.getElementById('language-options');
 const options=[...list.querySelectorAll('[data-language]')];
 function open(value,focus=false){toggle.setAttribute('aria-expanded',String(value));list.inert=!value;if(value&&focus)options.find(o=>o.dataset.language===language).focus();}
 toggle.addEventListener('click',()=>open(toggle.getAttribute('aria-expanded')!=='true',true));
 toggle.addEventListener('keydown',event=>{if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();open(true,true);}});
 options.forEach((option,index)=>{
  option.addEventListener('click',event=>{if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();history.pushState(null,'',siteLanguagePath(option.dataset.language)+location.hash);renderSite(option.dataset.language);document.getElementById('language-toggle').focus();});
  option.addEventListener('keydown',event=>{let next;if(event.key==='ArrowDown')next=(index+1)%options.length;else if(event.key==='ArrowUp')next=(index-1+options.length)%options.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=options.length-1;if(next!==undefined){event.preventDefault();options[next].focus();}});
 });
 document.querySelector('.language-picker').addEventListener('keydown',event=>{if(event.key==='Escape'){open(false);toggle.focus();}else if(event.key==='Tab'){open(false);toggle.focus();}});
 const tabs=[...document.querySelectorAll('[data-demo]')],panel=document.getElementById('demo-panel');
 function select(tab){tabs.forEach(t=>{t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1;});const container=document.getElementById('demo-content');container.innerHTML=siteDemo(c.demos[tabs.indexOf(tab)]);panel.setAttribute('aria-labelledby',tab.id);container.classList.remove('demo-content-enter');void container.offsetWidth;container.classList.add('demo-content-enter');}
 tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>select(tab));tab.addEventListener('keydown',event=>{if(!['ArrowDown','ArrowUp','ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(['ArrowDown','ArrowRight'].includes(event.key)?1:-1)+tabs.length)%tabs.length;select(tabs[next]);tabs[next].focus();});});
 // The navigation should reveal the content it points to, even when details are collapsed.
 const inside=document.getElementById('inside');
 document.querySelectorAll('a[href="#inside"]').forEach(link=>link.addEventListener('click',()=>{inside.open=true;}));
 if(location.hash==='#inside')inside.open=true;
 observer?.disconnect();
 if('IntersectionObserver' in window){document.documentElement.classList.add('js');observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target);}}),{threshold:.05});document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));}
 document.dispatchEvent(new Event('site:render'));
}
document.addEventListener('pointerdown',event=>{if(!event.target.closest('.language-picker')){document.getElementById('language-toggle').setAttribute('aria-expanded','false');document.getElementById('language-options').inert=true;}});
window.addEventListener('popstate',()=>renderSite(languageFromPath()));
renderSite(language);
