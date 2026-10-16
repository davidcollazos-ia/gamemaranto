(() => {
  const holes = () => [...document.querySelectorAll('.hole')];
  const hammer = document.createElement('div');
  hammer.className = 'game-hammer';
  hammer.textContent = '🔨';
  const forest = document.querySelector('.forest');
  if (forest) forest.appendChild(hammer);

  const swing = (x, y) => {
    hammer.style.left = `${x}px`;
    hammer.style.top = `${y}px`;
    hammer.classList.remove('swing');
    void hammer.offsetWidth;
    hammer.classList.add('swing');
  };

  document.addEventListener('pointerdown', event => {
    const hole = event.target.closest?.('.hole');
    if (!hole || !forest) return;
    const r = forest.getBoundingClientRect();
    swing(event.clientX - r.left, event.clientY - r.top);
  });

  const keepVisible = hole => {
    if (hole.dataset.slowTimer) clearTimeout(Number(hole.dataset.slowTimer));
    hole.dataset.slowTimer = setTimeout(() => {
      if (hole.classList.contains('up')) hole.classList.remove('up');
      delete hole.dataset.slowTimer;
    }, 2000);
  };
  const watch = new MutationObserver(records => records.forEach(record => {
    if (record.type === 'attributes' && record.attributeName === 'class' && record.target.classList.contains('up')) keepVisible(record.target);
  }));
  holes().forEach(hole => watch.observe(hole, {attributes:true}));

  const restart = document.querySelector('#restart');
  const start = document.querySelector('#go');
  restart?.addEventListener('click', () => {
    holes().forEach(hole => {
      hole.classList.remove('up','hit');
      hole.querySelectorAll('.mole,.float').forEach(node => node.remove());
    });
    document.querySelector('#time').textContent = '30';
    document.querySelector('#score').textContent = '0';
    document.querySelector('#streak').textContent = '0 🔥';
  });
  start?.addEventListener('click', () => {
    document.querySelector('#modal')?.classList.add('hidden');
    document.querySelector('#time').textContent = '30';
  });
})();
