const NAV=[["index.html","בית"],["menu.html","תפריט"],["about.html","עלינו"],["contact.html","צרו קשר"]];
const WA="https://wa.me/972500000000?text="+encodeURIComponent("היי קפה כרם, רציתי לשריין שולחן");
const here=location.pathname.split('/').pop()||'index.html';
document.getElementById('nav').innerHTML=`<header class="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-stone-200"><div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
<a href="index.html" class="flex items-baseline gap-2"><span class="font-serif text-2xl text-olive">קפה כרם</span></a>
<nav class="hidden md:flex gap-6">${NAV.map(n=>`<a href="${n[0]}" class="text-sm hover:text-terra transition ${here==n[0]?'text-terra font-semibold':''}">${n[1]}</a>`).join('')}</nav>
<div class="flex items-center gap-2"><a href="${WA}" class="hidden sm:inline-flex btn bg-[#25D366] text-white text-sm px-5 rounded-full">וואטסאפ</a>
<button id="mb" class="md:hidden w-12 h-12 text-2xl" aria-label="תפריט ניווט">☰</button></div></div>
<nav id="mm" class="hidden md:hidden border-t border-stone-200 bg-cream">${NAV.map(n=>`<a href="${n[0]}" class="block px-6 py-3 border-b border-stone-100 ${here==n[0]?'text-terra font-semibold':''}">${n[1]}</a>`).join('')}</nav></header>`;
document.getElementById('mb').onclick=()=>document.getElementById('mm').classList.toggle('hidden');
document.getElementById('foot').innerHTML=`<footer class="bg-olive text-cream mt-20"><div class="max-w-6xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
<div><p class="font-serif text-2xl">קפה כרם</p><p class="text-sm opacity-80 mt-1">ראש פינה, גליל עליון</p><p class="text-sm mt-2 opacity-80">רח׳ החלוצים 12</p></div>
<div class="text-sm space-y-1"><p class="font-semibold">שעות פתיחה</p><p>ראשון–חמישי 08:00–22:00</p><p>שישי 08:00–15:00</p><p>מוצ״ש 19:00–23:00</p></div>
<div class="text-sm space-y-2"><a class="block hover:underline" href="tel:+97240000000" dir="ltr">04-000-0000</a><a class="block hover:underline" href="${WA}">וואטסאפ <span dir="ltr">050-000-0000</span></a><p class="opacity-60 text-xs">אתר הדגמה · עסק בדיוני</p></div></div></footer>
<div class="fab"><a href="${WA}" class="bg-[#25D366] text-white" aria-label="וואטסאפ">💬</a><a href="tel:+97240000000" class="bg-white text-olive" aria-label="להתקשר">📞</a></div>`;
const rv=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.05});rv.forEach(el=>io.observe(el));setTimeout(()=>rv.forEach(el=>{if(el.getBoundingClientRect().top<innerHeight)el.classList.add('in')}),1200)}else rv.forEach(el=>el.classList.add('in'));
// שעות פתיחה (שעון ישראל): 0=ראשון ... 6=שבת
const HRS={0:[8,22],1:[8,22],2:[8,22],3:[8,22],4:[8,22],5:[8,15],6:[19,23]};
const DAYS=['ראשון','שני','שלישי','רביעי','חמישי','שישי','מוצ״ש'];
function nowIL(){const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Jerusalem',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date()).map(x=>[x.type,x.value]));return{d:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(p.weekday),m:(+p.hour%24)*60+ +p.minute}}
function status(){const {d,m}=nowIL(),[o,c]=HRS[d];
if(m>=o*60&&m<c*60){const left=c*60-m;return{open:true,txt:left<=60?`פתוח עכשיו · נסגר בעוד ${left} דק׳`:`פתוח עכשיו · עד ${c}:00`}}
if(m<o*60)return{open:false,txt:`סגור עכשיו · נפתח היום ב־${String(o).padStart(2,'0')}:00`};
const nd=(d+1)%7,no=String(HRS[nd][0]).padStart(2,'0');return{open:false,txt:`סגור עכשיו · נפתח ${nd===6?'במוצ״ש':nd===0?'מחר (ראשון)':'מחר'} ב־${no}:00`}}
function paint(){const s=status();document.querySelectorAll('[data-open-badge]').forEach(b=>{b.className='open-badge '+(s.open?'is-open':'is-closed');b.innerHTML='<span class="dot"></span>'+s.txt});document.querySelectorAll('[data-open-text]').forEach(t=>t.textContent=s.open?'● '+s.txt:s.txt)}
paint();setInterval(paint,60000);
