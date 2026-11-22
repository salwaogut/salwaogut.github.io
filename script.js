/* =========================================================
   SCRIPT PORTFOLIO - Salwa Hanifah Zain
   Isi:
   1. Menu hamburger        2. Navbar saat scroll + link aktif
   3. Scroll reveal         4. Animasi progress skill
   5. Filter project        6. Tombol back to top
   7. Gambar fallback       8. Link placeholder (#)
   9. Tahun footer
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('nav-menu');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('back-to-top');
  const toast = document.getElementById('toast');

  /* 1. MENU HAMBURGER ---------------------------------- */
  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Tutup menu setelah link diklik
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* 2. NAVBAR SAAT SCROLL + LINK AKTIF ----------------- */
  const sections = document.querySelectorAll('main section[id]');

  function onScroll() {
    // Bayangan navbar
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    // Tombol back to top
    backToTop.classList.toggle('show', window.scrollY > 500);

    // Tandai menu aktif sesuai section yang sedang terlihat
    const position = window.scrollY + 120;
    let currentId = '';
    sections.forEach(section => {
      if (position >= section.offsetTop) currentId = section.id;
    });
    // Section "certificates" tidak punya menu sendiri, anggap bagian dari Experience
    if (currentId === 'certificates') currentId = 'gallery';

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 3. SCROLL REVEAL ----------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Browser lama: langsung tampilkan semua
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* 4. ANIMASI PROGRESS SKILL -------------------------- */
  const skillSection = document.getElementById('skills');
  const barFills = document.querySelectorAll('.bar-fill');

  function fillBars() {
    barFills.forEach(bar => { bar.style.width = bar.dataset.level + '%'; });
  }

  if ('IntersectionObserver' in window && skillSection) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        fillBars();
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    skillObserver.observe(skillSection);
  } else {
    fillBars();
  }

  /* 5. FILTER PROJECT ---------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const categories = card.dataset.category.split(' ');
        const match = filter === 'all' || categories.includes(filter);
        card.classList.toggle('hide', !match);
        if (match) card.classList.add('visible'); // pastikan kartu tampil
      });
    });
  });

  /* 6. BACK TO TOP ------------------------------------- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* 7. GAMBAR FALLBACK --------------------------------- */
  // Jika file gambar belum ada, sembunyikan <img> agar placeholder terlihat.
  document.querySelectorAll('img').forEach(img => {
    const hide = () => { img.style.display = 'none'; };
    img.addEventListener('error', hide);
    if (img.complete && img.naturalWidth === 0) hide();
  });

  /* 8. LINK PLACEHOLDER (#) ---------------------------- */
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  document.querySelectorAll('.project-links a').forEach(link => {
    link.addEventListener('click', e => {
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
        showToast('Link project belum diisi. Edit di index.html ya!');
      }
    });
  });

  // Peringatan jika link GitHub/Instagram masih berisi USERNAME
  document.querySelectorAll('.contact-btn').forEach(link => {
    link.addEventListener('click', e => {
      if (link.href.includes('USERNAME')) {
        e.preventDefault();
        showToast('Ganti USERNAME dengan akun kamu di index.html');
      }
    });
  });

  /* LIGHTBOX GALERI ------------------------------------ */
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<img alt="">';
  document.body.appendChild(lb);
  document.querySelectorAll('.g-item img').forEach(img => {
    img.addEventListener('click', () => { lb.firstChild.src = img.src; lb.classList.add('show'); });
  });
  lb.addEventListener('click', () => lb.classList.remove('show'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('show'); });

  /* 9. TAHUN FOOTER ------------------------------------ */
  document.getElementById('year').textContent = new Date().getFullYear();

});
