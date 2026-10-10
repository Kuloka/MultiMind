const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../docs'),base='https://aetherai-chat.pages.dev',languages=['en','ru','es','pt','fr','de','it','tr','pl','uk'];
test('every language has indexable HTML, a canonical URL, reciprocal alternates and usable assets without JavaScript',()=>{
 const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8'),headers=fs.readFileSync(path.join(root,'_headers'),'utf8');
 assert.equal((sitemap.match(/<loc>/g)||[]).length,languages.length);
 for(const lang of languages){
  const route=lang==='en'?'/':'/'+lang+'/',file=path.join(root,lang==='en'?'index.html':lang+'/index.html'),html=fs.readFileSync(file,'utf8');
  assert.match(html,new RegExp('<html lang="'+lang+'">'));assert.ok(html.includes('<link rel="canonical" href="'+base+route+'">'));
  assert.ok(html.includes('<h1'));assert.ok(html.includes('AetherAI'));assert.ok(!html.includes('noindex'));
  for(const other of languages){const alternate=base+(other==='en'?'/':'/'+other+'/');assert.ok(html.includes('hreflang="'+other+'" href="'+alternate+'"'));assert.ok(html.includes('href="'+(other==='en'?'/':'/'+other+'/')+'"'));}
  assert.ok(html.includes('src="/assets/logo.svg"'));
  for(const [,asset] of html.matchAll(/src="(\/assets\/[^\"]+)"/g))assert.ok(fs.statSync(path.join(root,asset)).size>0,'Missing static asset '+asset);
  assert.ok(sitemap.includes('<loc>'+base+route+'</loc>'));
  const serialized=html.match(/<script id="siteStructuredData" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],schema=JSON.parse(serialized),page=schema['@graph'].find(item=>item['@type']==='WebPage');
  assert.equal(page.url,base+route);assert.equal(page.inLanguage,lang);assert.ok(!serialized.includes('aggregateRating'));
  const app=schema['@graph'].find(item=>item['@type']==='SoftwareApplication');
  assert.equal(app.screenshot,base+'/assets/app.png');
  assert.ok(fs.statSync(path.join(root,'assets/app.png')).size>0,'Actual app screenshot remains available for metadata');
  const hash=crypto.createHash('sha256').update(serialized).digest('base64');assert.ok(headers.includes("'sha256-"+hash+"'"));
 }
 assert.match(fs.readFileSync(path.join(root,'robots.txt'),'utf8'),/Allow: \/\s+Sitemap: https:\/\/aetherai-chat\.pages\.dev\/sitemap\.xml/);
 assert.ok(!headers.includes("script-src 'unsafe-inline'"));assert.ok(fs.readFileSync(path.join(root,'404.html'),'utf8').includes('noindex'));
});
