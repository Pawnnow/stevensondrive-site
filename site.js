/* Shared site script: mobile menu, footer year, quote form */
(function(){
  var nav=document.getElementById('mobile-nav'),
      openBtn=document.querySelector('.burger');
  if(nav&&openBtn){
    var closeBtn=nav.querySelector('.mn-close');
    var setOpen=function(o){
      nav.classList.toggle('open',o);
      openBtn.setAttribute('aria-expanded',o);
      document.body.style.overflow=o?'hidden':'';
      (o?closeBtn:openBtn).focus();
    };
    openBtn.addEventListener('click',function(){setOpen(true)});
    closeBtn.addEventListener('click',function(){setOpen(false)});
    nav.addEventListener('click',function(e){if(e.target.tagName==='A')setOpen(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open'))setOpen(false)});
  }

  var yr=document.getElementById('yr');
  if(yr)yr.textContent=new Date().getFullYear();

  var form=document.getElementById('quote-form');
  if(!form)return;
  var status=document.getElementById('form-status'),
      btn=form.querySelector('button[type=submit]'),
      label=btn.textContent;
  var show=function(msg,ok){status.textContent=msg;status.className='form-status '+(ok?'ok':'err')};
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var missing=Array.prototype.filter.call(form.querySelectorAll('[required]'),function(f){return !f.value.trim()});
    if(missing.length){show('Please fill in your name, phone, what you want to do, and a short description of the item.',false);missing[0].focus();return}
    btn.disabled=true;btn.textContent='Sending\u2026';
    fetch(form.action,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)})
      .then(function(r){return r.json()})
      .then(function(d){
        if(d.success){form.reset();show('Thanks, your quote request was sent. We\u2019ll be in touch soon.',true)}
        else{show('Your request didn\u2019t go through. Please call (217) 414-0909.',false)}
      })
      .catch(function(){show('Your request didn\u2019t go through. Please call (217) 414-0909.',false)})
      .finally(function(){btn.disabled=false;btn.textContent=label});
  });
})();
