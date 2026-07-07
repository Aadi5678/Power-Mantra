(function(){
  "use strict";

  /* ---------- Sticky nav on scroll ---------- */
  var nav = document.getElementById('siteNav');
  var toTopBtn = document.getElementById('toTop');

  function onScroll(){
    if(window.scrollY > 40){
      nav.classList.add('is-scrolled');
    }else{
      nav.classList.remove('is-scrolled');
    }
    if(window.scrollY > 500){
      toTopBtn.classList.add('show');
    }else{
      toTopBtn.classList.remove('show');
    }
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  toTopBtn.addEventListener('click', function(){
    window.scrollTo({ top:0, behavior:'smooth' });
  });

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', function(){
    var isOpen = nav.classList.toggle('mobile-open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true':'false');
  });

  document.querySelectorAll('.nav-links a').forEach(function(link){
    link.addEventListener('click', function(){
      nav.classList.remove('mobile-open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
    });
  });

  /* ---------- Active link highlight on scroll ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));

  var sectionObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function(link){
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin:'-45% 0px -50% 0px', threshold:0 });

  sections.forEach(function(sec){ sectionObserver.observe(sec); });

  /* ---------- Reveal-on-scroll animation ---------- */
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.14 });

  document.querySelectorAll('.reveal').forEach(function(el){
    revealObserver.observe(el);
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(other){
        other.classList.remove('open');
        other.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      if(!isOpen){
        item.classList.add('open');
        q.setAttribute('aria-expanded','true');
      }
    });
  });

  /* ---------- Contact form (client-side, no backend — routes to WhatsApp) ---------- */
  var form = document.getElementById('contactForm');
  var successMsg = document.getElementById('formSuccess');

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var service = document.getElementById('service').value;
      var message = document.getElementById('message').value.trim();

      if(!name || !/^[0-9]{10}$/.test(phone)){
        document.getElementById('phone').focus();
        return;
      }

      successMsg.classList.add('show');

      var text = "Hi Power Mantra Solutions, I'm " + name + " (" + phone + "). " +
                 "I'm interested in: " + service + ". " +
                 (message ? "Message: " + message : "");
      var waLink = "https://wa.me/918767269577?text=" + encodeURIComponent(text);

      setTimeout(function(){
        window.open(waLink, '_blank', 'noopener');
      }, 900);

      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

})();
