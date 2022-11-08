function animateTitle() {
  gsap.set('.first, .last, .center', { display: 'inline-block' });
  gsap.fromTo(
    '.first',
    { x: '-100%', opacity: 0 },
    { x: 0, opacity: 1, duration: 1 },
    '<20%'
  );

  gsap.fromTo(
    '.last',
    { x: '100%', opacity: 0 },
    { x: 0, opacity: 1, duration: 1 },
    '<20%'
  );

  gsap.fromTo(
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

function setContainerAnimation() {
  gsap.fromTo(
    '.container',
    { scale: 0.5, borderRadius: 0, borderRadius: '50%', rotate: -15 },
    { scale: 1, duration: 1, borderRadius: '45px', rotate: 0 }
  );
}

function setTitleAnimation() {
  const spanTextFirst = document.querySelector('.first'),
    spanTextCenter = document.querySelector('.center'),
    spanTextLast = document.querySelector('.last');

  animateTitle();
  splitText(spanTextFirst.textContent.split(''), spanTextFirst);
  splitText(spanTextCenter.textContent.split(''), spanTextCenter);
  splitText(spanTextLast.textContent.split(''), spanTextLast);
}

function setHomeAnimation(target) {
  //Home animation
  gsap.set('.feather', { scale: 0, transformOrigin: 'center' });
  target.addEventListener('click', () => {
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
}

function setNotificationsAnimation(target) {
  //Notification animation
  //Setting the transform origin
  gsap.set('.bell', { transformOrigin: 'top center' });
  gsap.set('.ringer', { transformOrigin: 'top center' });
  gsap.set('.wave', { transformOrigin: 'bottom', opacity: 0 });
  target.addEventListener('click', () => {
    gsap.fromTo(
      '.bell',
      { rotation: -5 },
      { rotation: 0, duration: 2, ease: 'elastic.out(5, 0.2)' }
    );
    gsap.fromTo(
      '.ringer',
      { rotation: -3, x: 0.5 },
      { rotation: 0, x: 0, duration: 1, ease: 'elastic.out(5, 0.2)' }
    );
    gsap.fromTo(
      '.wave',
      { opacity: 1, scale: 0 },
      { opacity: 0, scale: 1.3, duration: 1 }
    );
  });
}

function setMessagesAnimation(target, timeLine) {
  //Messages animation
  target.addEventListener('click', () => {
    gsap.set('.flap', { transformOrigin: 'top' });
    timeLine.fromTo('.messages-svg', { scale: 1 }, { scale: 0.9 });
    timeLine.fromTo('.flap', { scale: 1 }, { scale: -1 }, '<50%');
    timeLine.fromTo('.messages-svg', { scale: 0.9 }, { scale: 1 }, '<50%');
    timeLine.fromTo(
      '.note',
      { y: 0, opacity: 1 },
      { y: -40, opacity: 0, duration: 0.75 }
    );
    timeLine.to('.flap', { scale: 1 }, '<60%');
  });
}

function ready() {
  const tl = gsap.timeline({
    defaults: { duration: 0.35, ease: 'Power2.easeOut' },
  });
  const home = document.querySelector('.home-svg');
  const notifications = document.querySelector('.notification-svg');
  const messages = document.querySelector('.messages-svg');

  setTitleAnimation();
  setContainerAnimation();
  setHomeAnimation(home);
  setNotificationsAnimation(notifications);
  setMessagesAnimation(messages, tl);
}

document.addEventListener('DOMContentLoaded', ready);
