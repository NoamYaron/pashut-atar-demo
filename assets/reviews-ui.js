(function(){var R=window.CAFE_REVIEWS||[];document.querySelectorAll('[data-reviews]').forEach(function(root){
var small=root.dataset.reviews==='small',stage=root.querySelector('.rv-stage'),dots=root.querySelector('.rv-dots'),i=0,t,paused=false;
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
R.forEach(function(r,k){var c=document.createElement('figure');c.className='rv-card bg-white rounded-3xl card '+(small?'p-5':'p-7 sm:p-9');
c.setAttribute('aria-hidden','true');
c.innerHTML='<div class="flex items-center gap-3"><span class="rv-av">'+esc(r.name.charAt(0))+'</span><div class="flex-1"><p class="font-semibold">'+esc(r.name)+'</p><p class="text-sm text-stone-500">'+esc(r.when)+'</p></div><span class="rv-g" title="ביקורת בסגנון גוגל"></span></div><p class="rv-stars mt-3 '+(small?'text-lg':'text-xl')+'" aria-label="'+r.stars+' מתוך 5 כוכבים">'+'★'.repeat(r.stars)+'<span class="text-stone-300">'+'★'.repeat(5-r.stars)+'</span></p><blockquote class="mt-3 leading-8 '+(small?'text-base':'text-lg sm:text-xl')+'">״'+esc(r.text)+'״</blockquote>';
stage.appendChild(c);
if(dots){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','ביקורת '+(k+1));b.onclick=function(){go(k);restart()};dots.appendChild(b)}});
var cards=stage.children;
function go(n){i=(n+R.length)%R.length;[].forEach.call(cards,function(c,k){c.classList.toggle('on',k===i);c.setAttribute('aria-hidden',k===i?'false':'true')});
if(dots)[].forEach.call(dots.children,function(b,k){b.setAttribute('aria-current',k===i?'true':'false')})}
function restart(){clearInterval(t);if(!paused)t=setInterval(function(){go(i+1)},5000)}
var p=root.querySelector('[data-prev]'),n=root.querySelector('[data-next]');
if(p)p.onclick=function(){go(i-1);restart()};if(n)n.onclick=function(){go(i+1);restart()};
['mouseenter','focusin'].forEach(function(e){root.addEventListener(e,function(){paused=true;clearInterval(t)})});
['mouseleave','focusout'].forEach(function(e){root.addEventListener(e,function(){paused=false;restart()})});
go(small?3:0);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)restart();})})();
