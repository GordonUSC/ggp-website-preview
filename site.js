// reveal-on-scroll
(function(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  },{threshold:0.12, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // smooth in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      if(id.length<2) return;
      const t=document.querySelector(id);
      if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });

  // donation-amount selection (donate page)
  const tiles = document.querySelectorAll('.donate-tile');
  if(tiles.length){
    tiles.forEach(t=>{
      t.addEventListener('click',()=>{
        tiles.forEach(x=>x.classList.remove('selected'));
        t.classList.add('selected');
        const input = document.querySelector('#donation-amount');
        if(input) input.value = t.dataset.amount;
      });
    });
  }

  // mobile nav toggle
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  if(nav && navToggle){
    navToggle.addEventListener('click',()=>{
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav-links a').forEach(a=>{
      a.addEventListener('click',()=>{
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
      });
    });
  }

  // form fake-submit handling
  document.querySelectorAll('form[data-mailto]').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const subject = form.dataset.subject || 'GGP Inquiry';
      const fd = new FormData(form);
      let body = '';
      for(const [k,v] of fd.entries()){ body += `${k}: ${v}\n`; }
      const to = form.dataset.mailto;
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  });
})();
