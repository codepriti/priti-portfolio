/* Priti Gupta portfolio: interactions */
(function(){
  var $=function(s,r){return (r||document).querySelector(s)};
  var $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};

  /* mobile menu */
  var burger=$('#burger'),menu=$('#menu');
  burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
  menu.addEventListener('click',function(e){if(e.target.tagName==='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded','false')}});

  /* active nav link */
  var links=$$('a',menu);
  var secs=links.map(function(a){return $(a.getAttribute('href'))});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}
      });
    },{rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(function(s){if(s)io.observe(s)});

    /* reveal on scroll (transform only) */
    var rio=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');rio.unobserve(e.target)}});
    },{rootMargin:'0px 0px -8% 0px',threshold:.05});
    $$('.rv').forEach(function(el){rio.observe(el)});
  }else{$$('.rv').forEach(function(el){el.classList.add('in')})}

  /* scroll progress */
  var nav=$('#nav'),tick=false;
  function prog(){
    var h=document.documentElement,max=h.scrollHeight-h.clientHeight;
    nav.style.setProperty('--p',max>0?Math.min(1,h.scrollTop/max):0);tick=false;
  }
  window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(prog)}},{passive:true});
  prog();

  /* card spotlight */
  $$('.card').forEach(function(c){
    c.addEventListener('pointermove',function(e){
      var r=c.getBoundingClientRect();
      c.style.setProperty('--mx',(e.clientX-r.left)+'px');
      c.style.setProperty('--my',(e.clientY-r.top)+'px');
    });
  });

  /* copy helper */
  function copy(text,noteEl,msg,sel){
    function ok(){noteEl.textContent=msg}
    function fallback(){
      if(sel){
        var r=document.createRange(),s=window.getSelection();
        r.selectNodeContents(sel);s.removeAllRanges();s.addRange(r);
        noteEl.textContent='Selected. Press Ctrl+C or Cmd+C to copy.';
      }else{noteEl.textContent='Copy is blocked here. Select the text and copy it manually.'}
    }
    try{navigator.clipboard.writeText(text).then(ok,fallback)}catch(e){fallback()}
  }
  $('#copyMail').addEventListener('click',function(){
    copy('pritigupta15072008@gmail.com',$('#note'),'Email address copied.',$('#mailText'));
  });

  /* resume view */
  var ov=$('#resume'),openers=[$('#openResume'),$('#navResume')],closeBtn=$('#closeResume'),last=null;
  function openR(){last=document.activeElement;ov.hidden=false;document.body.style.overflow='hidden';closeBtn.focus()}
  function closeR(){ov.hidden=true;document.body.style.overflow='';if(last&&last.focus)last.focus()}
  openers.forEach(function(b){b.addEventListener('click',openR)});
  closeBtn.addEventListener('click',closeR);
  ov.addEventListener('click',function(e){if(e.target===ov)closeR()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!ov.hidden)closeR()});
  $('#copyResume').addEventListener('click',function(){
    var txt=$('.sheet',ov).innerText.replace(/^Close\s*/,'').replace(/Copy resume text\s*$/,'').trim();
    copy(txt,$('#rnote'),'Resume text copied.',null);
  });
})();
