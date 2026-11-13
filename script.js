// NOWPLUS site interactions
(() => {
  const nav = document.getElementById('nav');
  const menu = document.getElementById('menu');
  const burger = document.getElementById('burger');

  // sticky nav background
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // mobile menu
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  // reveal on scroll (staggered within a parent)
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const sibs = [...e.target.parentElement.children].filter(c => c.classList.contains('reveal'));
      e.target.style.transitionDelay = Math.min(sibs.indexOf(e.target), 6) * 70 + 'ms';
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // count-up stats
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, unit = el.querySelector('em').outerHTML;
      const t0 = performance.now(), dur = 1600;
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1), v = Math.round(target * (1 - Math.pow(1 - p, 3)));
        el.innerHTML = v.toLocaleString('ko-KR') + unit;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(el => countIO.observe(el));

  // VR product filter
  const filters = document.querySelectorAll('.filter');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.toggle('on', b === btn));
    const f = btn.dataset.f;
    document.querySelectorAll('.product').forEach(p => {
      p.classList.toggle('hide', f !== 'all' && p.dataset.c !== f);
    });
  }));

  // quote form -> mail app
  document.getElementById('quote').addEventListener('submit', e => {
    e.preventDefault();
    const v = id => document.getElementById(id).value.trim();
    const subject = `[견적문의] ${v('q-name')} - ${v('q-type')}`;
    const body = [
      `성함/기관명: ${v('q-name')}`,
      `연락처: ${v('q-tel')}`,
      `관심 제품: ${v('q-type')}`,
      `예상 좌석 수: ${v('q-seat')}`,
      '',
      v('q-msg')
    ].join('\n');
    location.href = `mailto:nowp0823@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  document.getElementById('yr').textContent = new Date().getFullYear();
})();
