/* ===== dislexia.com — script compartido ===== */
(function(){
  let fontScale=1; const body=document.body;
  const $=s=>document.querySelector(s);
  const tgg=$('#tggLegible'), up=$('#fontUp'), dn=$('#fontDown'), read=$('#readAloud');
  if(tgg) tgg.addEventListener('click',e=>{body.classList.toggle('legible');e.target.setAttribute('aria-pressed',body.classList.contains('legible'));});
  if(up) up.addEventListener('click',()=>{fontScale=Math.min(1.4,fontScale+0.1);body.style.fontSize=fontScale+'rem';});
  if(dn) dn.addEventListener('click',()=>{fontScale=Math.max(.85,fontScale-0.1);body.style.fontSize=fontScale+'rem';});
  if(read) read.addEventListener('click',()=>{
    if(!('speechSynthesis' in window)){alert('Tu navegador no soporta lectura en voz alta.');return;}
    if(speechSynthesis.speaking){speechSynthesis.cancel();read.setAttribute('aria-pressed','false');return;}
    const main=document.querySelector('main')||document.body;
    const u=new SpeechSynthesisUtterance(main.innerText);u.lang='es-ES';u.rate=.95;
    u.onend=()=>read.setAttribute('aria-pressed','false');
    speechSynthesis.speak(u);read.setAttribute('aria-pressed','true');
  });
  const tog=$('#navtoggle'), links=$('#navlinks');
  if(tog) tog.addEventListener('click',()=>links.classList.toggle('open'));
  if(links) links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  const cf=$('#contactForm');
  if(cf) cf.addEventListener('submit',async(ev)=>{
    ev.preventDefault();
    const ok=$('#formOk'), err=$('#formErr'), btn=$('#sendBtn');
    if(ok)ok.style.display='none'; if(err)err.style.display='none';
    if(btn){btn.disabled=true;btn.textContent='Enviando…';}
    try{
      const r=await fetch(cf.action,{method:'POST',body:new FormData(cf),headers:{'Accept':'application/json'}});
      if(r.ok){cf.style.display='none';if(ok)ok.style.display='block';}
      else{if(err)err.style.display='block';}
    }catch(e){if(err)err.style.display='block';}
    if(btn){btn.disabled=false;btn.textContent='Enviar consulta';}
  });
})();
