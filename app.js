function animateTitle(timeLine) {
  gsap.set('.first, .last, .center', { display: 'inline-block' });
  timeLine.fromTo(
    '.first',
    { x: '-100%', opacity: 0 },
    { x: 0, opacity: 1, duration: 1 },
    '<20%'
  );

  timeLine.fromTo(
    '.last',
    { x: '100%', opacity: 0 },
    { x: 0, opacity: 1, duration: 1 },
    '<20%'
  );

  timeLine.fromTo(
    '.center',
    { y: '100%', opacity: 0, rotate: -15 },
    { y: 0, opacity: 1, duration: 1, rotate: 0 },
    '<20%'
  );
}

function splitText(letters, title) {
  title.textContent = '';

  for (let letter of letters) {
    title.innerHTML += `<span class=\"letter\">${letter}</span>`;
  }

  gsap.set('.letter', { display: 'inline-block' });
  gsap.fromTo(
    '.letter',
    { y: '20%' },
    { y: 0, delay: 1, stagger: 0.05, ease: 'back.out(3)' }
  );
}

function ready() {
  const tl = gsap.timeline({
    default: { duration: 0.35, ease: 'Power2.easeOut' },
  });

  const spanTextFirst = document.querySelector('.first');
  const spanTextCenter = document.querySelector('.center');
  const spanTextLast = document.querySelector('.last');
  const home = document.querySelector('.home-svg');
  const notifications = document.querySelector('.notifications-svg');
  const messages = document.querySelector('.messages-svg');

  tl.fromTo(
    '.container',
    { scale: 0.5, borderRadius: 0, borderRadius: '50%', rotate: -15 },
    { scale: 1, duration: 1, borderRadius: '45px', rotate: 0 }
  );

  gsap.set('.feather', { scale: 0, transformOrigin: 'center' });
  home.addEventListener('click', () => {
    gsap.fromTo(
      '.home-svg',
      { scale: 1 },
      { scale: 0.9, yoyo: true, repeat: 1 }
    );
    gsap.fromTo(
      '.feather',
      { y: -5, scale: 0 },
      { y: 20, scale: 1.5, duration: 1, stagger: 0.2 }
    );
    gsap.fromTo('.right-feather', { x: 0 }, { x: 5 });
  });

  animateTitle(tl);
  splitText(spanTextFirst.textContent.split(''), spanTextFirst);
  splitText(spanTextCenter.textContent.split(''), spanTextCenter);
  splitText(spanTextLast.textContent.split(''), spanTextLast);
}

document.addEventListener('DOMContentLoaded', ready);
