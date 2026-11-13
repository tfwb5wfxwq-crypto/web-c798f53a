// Hors ligne (salle de sport) : réseau d'abord, sinon la copie gardée. Les photos sont gardées au fil de l'eau.
const V='muscu-v2-17';
const F=['./','index.html','agenda.js','manifest.webmanifest','../icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.hostname==='ntfy.sh')return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
