/**
 * Shaurya's Supercharged Cyber Portfolio - Interactive Engine
 * Featuring: Web Audio SFX, Ambient Particle Canvas, 3D Tilt & Specular Glare,
 * Shaurya's Cyber Sprint Arcade Game, Triathlon Simulator, 3D Trophy Vault,
 * Sushi Feeder, and Shaurya Explorer Quests with Confetti & VIP Rewards.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAudioEngine();
  initAmbientCanvas();
  initCyberCursor();
  initTheme();
  initTypingEffect();
  init3DTiltCards();
  initSushiFeeder();
  initStatsCounter();
  initTrophyVault();
  initSwimTechComponent();
  initArcadeGame();
  initRaceSimulator();
  initGalleryFilters();
  initLightbox();
  initMediaHubTester();
  initGuestbook();
  initQuestSystem();
  initNavbar();
});

/* ==========================================================================
   1. Web Audio Sound FX Engine & Jukebox (Zero External Dependencies)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initAudioEngine() {
  const soundToggleBtn = document.getElementById('sound-toggle');
  const savedSound = localStorage.getItem('shaurya-sound');
  soundEnabled = savedSound !== 'disabled';
  updateSoundUI();

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem('shaurya-sound', soundEnabled ? 'enabled' : 'disabled');
      updateSoundUI();
      if (soundEnabled) {
        ensureAudioContext();
        playClickSound();
      }
    });
  }

  function updateSoundUI() {
    if (!soundToggleBtn) return;
    const icon = soundToggleBtn.querySelector('i');
    const tooltip = soundToggleBtn.querySelector('.btn-tooltip');
    if (soundEnabled) {
      if (icon) icon.className = 'fa-solid fa-volume-high';
      if (tooltip) tooltip.textContent = 'Sound: ON';
      soundToggleBtn.classList.remove('muted');
    } else {
      if (icon) icon.className = 'fa-solid fa-volume-xmark';
      if (tooltip) tooltip.textContent = 'Sound: OFF';
      soundToggleBtn.classList.add('muted');
    }
  }

  // Bind click sounds to interactive buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, .nav-link, .tag-badge, .filter-btn, .trophy-filter-btn, .swim-tab-btn')) {
      playClickSound();
    }
  });
}

function ensureAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playClickSound() {
  if (!soundEnabled) return;
  ensureAudioContext();
  if (!audioCtx) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {}
}

function playJumpSound() {
  if (!soundEnabled) return;
  ensureAudioContext();
  if (!audioCtx) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(450, audioCtx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  } catch (e) {}
}

function playDoubleJumpSound() {
  if (!soundEnabled) return;
  ensureAudioContext();
  if (!audioCtx) return;

  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(920, now + 0.14);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.14);
  } catch (e) {}
}

function playDiveSound() {
  if (!soundEnabled) return;
  ensureAudioContext();
  if (!audioCtx) return;

  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  } catch (e) {}
}

function playCollectSound() {
  if (!soundEnabled) return;
  ensureAudioContext();
  if (!audioCtx) return;

  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(880, now + 0.08); // A5

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  } catch (e) {}
}

function playPowerupSound() {
  if (!soundEnabled) return;
  ensureAudioContext();
  if (!audioCtx) return;

  try {
    const now = audioCtx.currentTime;
    const freqs = [440, 554.37, 659.25, 880];
    freqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.1, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.2);
    });
  } catch (e) {}
}

function playGameOverSound() {
  if (!soundEnabled) return;
  ensureAudioContext();
  if (!audioCtx) return;

  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.4);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  } catch (e) {}
}

function playVictoryFanfare() {
  if (!soundEnabled) return;
  ensureAudioContext();
  if (!audioCtx) return;

  try {
    const notes = [
      { f: 523.25, d: 0.15 }, // C5
      { f: 659.25, d: 0.15 }, // E5
      { f: 783.99, d: 0.15 }, // G5
      { f: 1046.50, d: 0.4 }  // C6
    ];
    let startTime = audioCtx.currentTime;
    notes.forEach(note => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + note.d);
      startTime += note.d * 0.9;
    });
  } catch (e) {}
}

function playSmashSound() {
  if (!soundEnabled) return;
  ensureAudioContext();
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    
    // 1. High crunchy distortion blast
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.28);
    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.28);

    // 2. Sub-bass sonic boom explosion
    const subOsc = audioCtx.createOscillator();
    const subGain = audioCtx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(25, now + 0.35);
    subGain.gain.setValueAtTime(0.28, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    subOsc.connect(subGain);
    subGain.connect(audioCtx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.35);
  } catch (e) {}
}

function playComboSound(multiplier = 2) {
  if (!soundEnabled) return;
  ensureAudioContext();
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    const baseFreq = 520 + (multiplier * 95);
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.14);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.14);
  } catch (e) {}
}

function playTurboStartSound() {
  if (!soundEnabled) return;
  ensureAudioContext();
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    // 1. Hyperspace Rising Power Chord Sweep
    const freqs = [220, 330, 440, 554, 660, 880, 1108, 1320, 1760];
    freqs.forEach((f, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = i % 2 === 0 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.025);
      osc.frequency.exponentialRampToValueAtTime(f * 2.2, now + i * 0.025 + 0.35);
      gain.gain.setValueAtTime(0.08, now + i * 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.025 + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + i * 0.025);
      osc.stop(now + i * 0.025 + 0.35);
    });

    // 2. Sub-bass sonic boom shockwave
    const subOsc = audioCtx.createOscillator();
    const subGain = audioCtx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(180, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.45);
    subGain.gain.setValueAtTime(0.32, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    subOsc.connect(subGain);
    subGain.connect(audioCtx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.45);
  } catch (e) {}
}

/* ==========================================================================
   2. Ambient Particle Canvas Background
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  let mouseX = width / 2;
  let mouseY = height / 2;
  let mouseActive = false;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseActive = true;
  });

  document.addEventListener('mouseleave', () => {
    mouseActive = false;
  });

  // Particle Generation
  const particleCount = Math.min(Math.floor(window.innerWidth / 25), 65);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      size: Math.random() * 2.5 + 1,
      colorType: Math.random() > 0.4 ? 'cyan' : (Math.random() > 0.5 ? 'purple' : 'amber'),
      opacity: Math.random() * 0.5 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Move particles
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around bounds
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse repulsion
      if (mouseActive) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 3;
        }
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

      if (p.colorType === 'cyan') {
        ctx.fillStyle = isLight ? `rgba(2, 132, 199, ${p.opacity})` : `rgba(0, 240, 255, ${p.opacity})`;
      } else if (p.colorType === 'purple') {
        ctx.fillStyle = isLight ? `rgba(126, 34, 206, ${p.opacity})` : `rgba(168, 85, 247, ${p.opacity})`;
      } else {
        ctx.fillStyle = isLight ? `rgba(217, 119, 6, ${p.opacity})` : `rgba(245, 158, 11, ${p.opacity})`;
      }
      ctx.fill();

      // Connect lines to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const lineAlpha = (1 - dist / 90) * (isLight ? 0.08 : 0.15);
          ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${lineAlpha})` : `rgba(0, 240, 255, ${lineAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   3. Custom Cyber Cursor Follower
   ========================================================================== */
function initCyberCursor() {
  const cursor = document.getElementById('cyber-cursor');
  const dot = document.getElementById('cyber-cursor-dot');
  if (!cursor || !dot) return;

  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover expansion on clickable targets
  const clickables = 'a, button, input, select, textarea, .clickable-gallery-item, .medal-3d-card, .form-hotspot, .tech-step-item';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(clickables)) {
      cursor.style.width = '48px';
      cursor.style.height = '48px';
      cursor.style.borderColor = '#00f0ff';
      cursor.style.backgroundColor = 'rgba(0, 240, 255, 0.08)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(clickables)) {
      cursor.style.width = '32px';
      cursor.style.height = '32px';
      cursor.style.borderColor = 'var(--accent-cyan)';
      cursor.style.backgroundColor = 'transparent';
    }
  });
}

/* ==========================================================================
   4. Dynamic Hero Typing Effect
   ========================================================================== */
function initTypingEffect() {
  const typingEl = document.getElementById('dynamic-typing-text');
  if (!typingEl) return;

  const phrases = [
    "Triathlon & Aquathon Champion 🏊‍♂️🚴‍♂️🏃‍♂️",
    "Starting Block Dive Specialist ⏱️",
    "School Track & Sprint Gold Medalist 🥇",
    "Speedrunner & High Reflex Gamer 🎮",
    "Grade 5 Brunei Adventurer 🇧🇳",
    "Passionate Japanese Sushi Lover 🍣"
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeLoop() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      typingEl.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 35;
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      typingSpeed = 1800; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing new phrase
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* ==========================================================================
   5. Interactive 3D Perspective Tilt Card with Specular Glare
   ========================================================================== */
function init3DTiltCards() {
  const cardWrapper = document.getElementById('hero-tilt-card');
  const cardGlare = document.getElementById('card-glare');
  if (!cardWrapper) return;

  cardWrapper.addEventListener('mousemove', (e) => {
    const rect = cardWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    cardWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    if (cardGlare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      cardGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;
    }
  });

  cardWrapper.addEventListener('mouseleave', () => {
    cardWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* ==========================================================================
   6. Shaurya's Interactive Sushi Feeder & Power Meter
   ========================================================================== */
let sushiFedCount = 0;

function initSushiFeeder() {
  const feedBtn = document.getElementById('feed-sushi-btn');
  const countText = document.getElementById('sushi-count-text');
  const meterFill = document.getElementById('sushi-meter-fill');
  const powerStatus = document.getElementById('sushi-power-status');

  if (!feedBtn) return;

  const statuses = [
    "Yum! Energy charging up! ⚡",
    "Tasty salmon roll! Speed +10% 🍣",
    "Sushi power rising! Looking fast! 🏊‍♂️",
    "Mega combo! Ready for the next Triathlon! 🚴‍♂️",
    "SUPERCHARGED! Shaurya Power Level OVER 9000! 🔥"
  ];

  feedBtn.addEventListener('click', (e) => {
    sushiFedCount++;
    playCollectSound();

    // Spawn floating emoji particle
    spawnFloatingEmoji('🍣', e.clientX, e.clientY);

    // Update meter (max 10 pieces for 100%)
    const pct = Math.min((sushiFedCount / 10) * 100, 100);
    if (meterFill) meterFill.style.width = `${pct}%`;
    if (countText) countText.textContent = `${sushiFedCount} Pieces 🍣`;

    const statusIdx = Math.min(Math.floor(sushiFedCount / 2), statuses.length - 1);
    if (powerStatus) powerStatus.textContent = statuses[statusIdx];

    // Trigger Quest 3 Check
    if (sushiFedCount >= 5) {
      completeQuest('sushi');
    }
  });
}

function spawnFloatingEmoji(emoji, x, y) {
  const el = document.createElement('div');
  el.className = 'floating-sushi-particle';
  el.textContent = emoji;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 1200);
}

/* ==========================================================================
   7. Animated Stats Counter (Intersection Observer)
   ========================================================================== */
function initStatsCounter() {
  const statElements = document.querySelectorAll('.stat-counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statElements.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
          const duration = 1500;
          const startTime = performance.now();

          function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            counter.textContent = Math.floor(easeOut * target);

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              counter.textContent = target;
            }
          }

          requestAnimationFrame(updateNumber);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-banner');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   8. 3D Trophy Vault Filter System
   ========================================================================== */
function initTrophyVault() {
  const filterBtns = document.querySelectorAll('.trophy-filter-btn');
  const medalCards = document.querySelectorAll('.medal-card-wrapper');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      medalCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   9. Freestyle & Dive Interactive Component
   ========================================================================== */
let inspectedHotspots = new Set();

function initSwimTechComponent() {
  const tabBtns = document.querySelectorAll('.swim-tab-btn');
  const tabPanels = document.querySelectorAll('.swim-tab-panel');
  const hotspots = document.querySelectorAll('.form-hotspot');
  const stepItems = document.querySelectorAll('.tech-step-item');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.querySelector(btn.getAttribute('data-target'));
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  function activateStep(stepNum) {
    inspectedHotspots.add(String(stepNum));
    if (inspectedHotspots.size >= 4) {
      completeQuest('dive');
    }

    hotspots.forEach(h => {
      h.classList.toggle('active', h.getAttribute('data-step') === String(stepNum));
    });

    stepItems.forEach(s => {
      s.classList.toggle('active', s.getAttribute('data-step') === String(stepNum));
    });
  }

  hotspots.forEach(hotspot => {
    hotspot.addEventListener('mouseenter', () => activateStep(hotspot.getAttribute('data-step')));
    hotspot.addEventListener('click', () => activateStep(hotspot.getAttribute('data-step')));
  });

  stepItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const step = item.getAttribute('data-step');
      if (step) activateStep(step);
    });
    item.addEventListener('click', () => {
      const step = item.getAttribute('data-step');
      if (step) activateStep(step);
    });
  });
}

/* ==========================================================================
   10. Playable "Shaurya's Cyber Sprint & Reflex Dash" Arcade Game
   ========================================================================== */
function initArcadeGame() {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Overlays & UI
  const startOverlay = document.getElementById('game-start-overlay');
  const pauseOverlay = document.getElementById('game-pause-overlay');
  const gameOverOverlay = document.getElementById('game-over-overlay');
  
  const startBtn = document.getElementById('start-game-btn');
  const restartBtn = document.getElementById('restart-game-btn');
  const pauseBtn = document.getElementById('arcade-pause-btn');
  const resumeBtn = document.getElementById('resume-game-btn');
  const pauseRestartBtn = document.getElementById('pause-restart-btn');
  const touchJumpBtn = document.getElementById('touch-jump-btn');
  const touchDiveBtn = document.getElementById('touch-dive-btn');
  const touchPauseBtn = document.getElementById('touch-pause-btn');

  // HUD Displays
  const scoreDisplay = document.getElementById('game-score-display');
  const highscoreDisplay = document.getElementById('game-highscore-display');
  const distanceDisplay = document.getElementById('game-distance-display');
  const sushiDisplay = document.getElementById('game-sushi-display');
  const comboDisplay = document.getElementById('game-combo-display');
  const turboTrack = document.getElementById('arcade-turbo-track');
  const turboFill = document.getElementById('arcade-turbo-fill');
  const difficultyBtn = document.getElementById('arcade-difficulty-btn');
  const modeLabel = document.getElementById('arcade-mode-label');

  // Game Over modal stats
  const finalScoreVal = document.getElementById('final-score-val');
  const finalDistanceVal = document.getElementById('final-distance-val');
  const finalSushiVal = document.getElementById('final-sushi-val');
  const finalComboVal = document.getElementById('final-combo-val');
  const newHighscoreBadge = document.getElementById('new-highscore-badge');
  const gameOverMessage = document.getElementById('game-over-message');

  let highScore = parseInt(localStorage.getItem('shaurya-game-highscore') || '0', 10);
  if (highscoreDisplay) highscoreDisplay.textContent = String(highScore).padStart(4, '0');

  // Game state (💀 IMPOSSIBLE IMPOSSIBLE DEFAULT ACTIVE)
  let isPlaying = false;
  let isPaused = false;
  let isImpossibleMode = true;
  let animationFrameId = null;

  let score = 0;
  let sushiCollected = 0;
  let distanceMeters = 0;
  let comboMultiplier = 1;
  let comboTimer = 0;
  let maxComboReached = 1;

  // Blazing expert speed: 22.0 base velocity in Impossible Mode!
  let gameSpeed = isImpossibleMode ? 22.0 : 13.0;
  let frameCount = 0;
  let screenShakeTimer = 0;
  let screenShakeIntensity = 0;
  let jumpBufferTimer = 0;
  const MAX_TURBO_TIME = 320;

  // Player Character with Double Jump & Fast Dive Capabilities
  const player = {
    x: 90,
    y: 246,
    width: 44,
    height: 54,
    vy: 0,
    gravity: isImpossibleMode ? 1.25 : 0.88,
    jumpPower: isImpossibleMode ? -18.2 : -15.2,
    doubleJumpPower: isImpossibleMode ? -16.8 : -14.0,
    isGrounded: true,
    isJumping: false,
    hasDoubleJumped: false,
    isDiving: false,
    turboTimer: 0,
    runCycle: 0,
    particles: [],
    ghosts: [],
    shockwaves: [],
    groundY: 246
  };

  // Game objects & visual entities
  let obstacles = [];
  let collectibles = [];
  let floatingTexts = [];
  let debrisParticles = [];

  // Super Sonic Hyperspace Speed Lines (55 high-velocity streaks)
  const speedLines = [];
  for (let i = 0; i < 55; i++) {
    speedLines.push({
      x: Math.random() * canvas.width,
      y: Math.random() * 320,
      length: Math.random() * 80 + 40,
      speed: Math.random() * 12 + 15,
      alpha: Math.random() * 0.45 + 0.15,
      colorType: Math.random() > 0.5 ? 'cyan' : (Math.random() > 0.5 ? 'magenta' : 'gold')
    });
  }

  // Background Parallax Stars & Cityscape
  const stars = [];
  for (let i = 0; i < 50; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * 200,
      size: Math.random() * 2 + 0.8,
      speed: Math.random() * 0.4 + 0.2,
      twinkle: Math.random() * Math.PI * 2
    });
  }

  const buildings = [];
  for (let i = 0; i < 16; i++) {
    buildings.push({
      x: i * 65,
      width: 45 + Math.random() * 30,
      height: 80 + Math.random() * 110,
      neonColor: i % 3 === 0 ? '#00f0ff' : (i % 3 === 1 ? '#a855f7' : '#3b82f6'),
      windows: Math.floor(Math.random() * 6) + 3
    });
  }

  const billboards = [
    { text: 'SHAURYA ⚡', x: 200, color: '#00f0ff' },
    { text: 'IMPOSSIBLE IMPOSSIBLE 💀', x: 600, color: '#ef4444' },
    { text: 'EXPERT REFLEX WARP 🔥', x: 1000, color: '#f59e0b' },
    { text: 'BRUNEI CHAMP 🇧🇳', x: 1400, color: '#10b981' }
  ];

  function toggleImpossibleMode() {
    isImpossibleMode = !isImpossibleMode;
    if (modeLabel) {
      modeLabel.textContent = isImpossibleMode ? '💀 IMPOSSIBLE IMPOSSIBLE (EXPERT)' : '⚡ NORMAL SPRINT';
    }
    if (difficultyBtn) {
      if (isImpossibleMode) {
        difficultyBtn.classList.add('active');
        difficultyBtn.classList.add('expert-pulse');
        difficultyBtn.style.borderColor = '#ef4444';
      } else {
        difficultyBtn.classList.remove('active');
        difficultyBtn.classList.remove('expert-pulse');
        difficultyBtn.style.borderColor = 'rgba(0, 240, 255, 0.4)';
      }
    }
    playClickSound();
    if (!isPlaying) {
      addFloatingText(isImpossibleMode ? '💀 IMPOSSIBLE IMPOSSIBLE ACTIVATED!' : '⚡ NORMAL SPRINT ACTIVATED!', canvas.width * 0.5, 120, isImpossibleMode ? '#ef4444' : '#00f0ff', 1.3);
    }
  }

  function resetGame() {
    score = 0;
    sushiCollected = 0;
    distanceMeters = 0;
    comboMultiplier = 1;
    comboTimer = 0;
    maxComboReached = 1;

    gameSpeed = isImpossibleMode ? 22.0 : 13.0;
    player.gravity = isImpossibleMode ? 1.25 : 0.88;
    player.jumpPower = isImpossibleMode ? -18.2 : -15.2;
    player.doubleJumpPower = isImpossibleMode ? -16.8 : -14.0;
    player.hasDoubleJumped = false;
    player.isDiving = false;

    frameCount = 0;
    screenShakeTimer = 0;
    screenShakeIntensity = 0;
    jumpBufferTimer = 0;

    player.y = player.groundY;
    player.vy = 0;
    player.isGrounded = true;
    player.isJumping = false;
    player.turboTimer = 0;
    player.runCycle = 0;
    player.particles = [];
    player.ghosts = [];
    player.shockwaves = [];

    obstacles = [];
    collectibles = [];
    floatingTexts = [];
    debrisParticles = [];

    if (turboTrack) turboTrack.classList.remove('active');
    updateScoreHUD();
  }

  function startGame() {
    if (isPaused) {
      resumeGame();
      return;
    }
    resetGame();
    isPlaying = true;
    isPaused = false;

    if (startOverlay) startOverlay.classList.add('hidden');
    if (pauseOverlay) pauseOverlay.classList.add('hidden');
    if (gameOverOverlay) gameOverOverlay.classList.add('hidden');

    ensureAudioContext();
    playTurboStartSound();
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(gameLoop);
  }

  function togglePause() {
    if (!isPlaying) return;
    if (isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  }

  function pauseGame() {
    if (!isPlaying || isPaused) return;
    isPaused = true;
    if (pauseOverlay) pauseOverlay.classList.remove('hidden');
    playClickSound();
  }

  function resumeGame() {
    if (!isPlaying || !isPaused) return;
    isPaused = false;
    if (pauseOverlay) pauseOverlay.classList.add('hidden');
    playClickSound();
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(gameLoop);
  }

  function endGame() {
    isPlaying = false;
    isPaused = false;
    cancelAnimationFrame(animationFrameId);
    playGameOverSound();

    const isNewHigh = score > highScore;
    if (isNewHigh) {
      highScore = score;
      localStorage.setItem('shaurya-game-highscore', String(highScore));
      if (highscoreDisplay) highscoreDisplay.textContent = String(highScore).padStart(4, '0');
      triggerConfetti();
    }

    if (score >= 100) {
      completeQuest('game');
    }

    if (finalScoreVal) finalScoreVal.textContent = score;
    if (finalDistanceVal) finalDistanceVal.textContent = `${distanceMeters}m`;
    if (finalSushiVal) finalSushiVal.textContent = `🍣 ${sushiCollected}`;
    if (finalComboVal) finalComboVal.textContent = `${maxComboReached}x`;

    if (newHighscoreBadge) {
      if (isNewHigh && score > 0) {
        newHighscoreBadge.classList.remove('hidden');
      } else {
        newHighscoreBadge.classList.add('hidden');
      }
    }

    if (gameOverMessage) {
      if (score >= 1200) {
        gameOverMessage.textContent = '💀 GODLIKE EXPERT! Shaurya conquered the IMPOSSIBLE IMPOSSIBLE warp speed!';
      } else if (score >= 600) {
        gameOverMessage.textContent = '⚡ INSANE REFLEXES! Super sonic double-jump masterclass!';
      } else if (score >= 250) {
        gameOverMessage.textContent = '🔥 GREAT RUN! Double Jump & Fast Dive are your keys to survive!';
      } else {
        gameOverMessage.textContent = '💀 IMPOSSIBLE IMPOSSIBLE is brutally fast! Tap Jump in air for Double Jump, S/Down to Fast Dive!';
      }
    }

    if (turboTrack) turboTrack.classList.remove('active');
    if (gameOverOverlay) gameOverOverlay.classList.remove('hidden');
  }

  function triggerJump() {
    if (!isPlaying) return;
    if (isPaused) {
      resumeGame();
      return;
    }

    if (player.isGrounded) {
      const pwr = player.turboTimer > 0 ? (isImpossibleMode ? -19.5 : -17.0) : player.jumpPower;
      player.vy = pwr;
      player.isGrounded = false;
      player.isJumping = true;
      player.hasDoubleJumped = false;
      player.isDiving = false;
      playJumpSound();

      // Shockwave ring explosion under shoes
      player.shockwaves.push({
        x: player.x + 22,
        y: player.y + player.height - 2,
        radius: 4,
        maxRadius: player.turboTimer > 0 ? 80 : (isImpossibleMode ? 60 : 35),
        color: player.turboTimer > 0 ? '#ff007f' : (isImpossibleMode ? '#ef4444' : '#00f0ff'),
        alpha: 1.0
      });

      // Jump thrust dust & sparks
      const sparkCount = player.turboTimer > 0 ? 20 : (isImpossibleMode ? 16 : 8);
      for (let i = 0; i < sparkCount; i++) {
        player.particles.push({
          x: player.x + 10 + Math.random() * 24,
          y: player.y + player.height - 2,
          vx: (Math.random() - 0.7) * (player.turboTimer > 0 ? 12 : 7),
          vy: Math.random() * -7,
          size: Math.random() * 5 + 2,
          color: player.turboTimer > 0 ? (Math.random() > 0.5 ? '#00f0ff' : '#ff007f') : (isImpossibleMode ? '#ef4444' : '#f59e0b'),
          life: 26,
          maxLife: 26
        });
      }
    } else if (!player.isGrounded && !player.hasDoubleJumped) {
      // ⚡ EXPERT DOUBLE JUMP (Mid-air sonic booster)
      const dPwr = player.turboTimer > 0 ? -18.8 : player.doubleJumpPower;
      player.vy = dPwr;
      player.hasDoubleJumped = true;
      player.isDiving = false;
      playDoubleJumpSound();

      player.shockwaves.push({
        x: player.x + 22,
        y: player.y + player.height - 2,
        radius: 6,
        maxRadius: 75,
        color: '#00f0ff',
        alpha: 1.0
      });

      for (let i = 0; i < 18; i++) {
        player.particles.push({
          x: player.x + 8 + Math.random() * 28,
          y: player.y + player.height - 2,
          vx: (Math.random() - 0.5) * 8,
          vy: Math.random() * 6 + 3,
          size: Math.random() * 5 + 3,
          color: Math.random() > 0.5 ? '#00f0ff' : '#f59e0b',
          life: 24,
          maxLife: 24
        });
      }

      addFloatingText('⚡ DOUBLE JUMP!', player.x + 20, player.y - 12, '#00f0ff', 1.35);
    } else {
      // Buffer jump for 8 frames so player jumps immediately upon landing
      jumpBufferTimer = 8;
    }
  }

  function triggerDive() {
    if (!isPlaying || isPaused) return;
    if (!player.isGrounded && !player.isDiving) {
      player.isDiving = true;
      player.vy = 24; // Fast hypersonic downward stomp
      playDiveSound();

      for (let i = 0; i < 14; i++) {
        player.particles.push({
          x: player.x + 10 + Math.random() * 24,
          y: player.y,
          vx: (Math.random() - 0.5) * 6,
          vy: -Math.random() * 7 - 2,
          size: Math.random() * 6 + 2,
          color: Math.random() > 0.5 ? '#ef4444' : '#f59e0b',
          life: 20,
          maxLife: 20
        });
      }
      addFloatingText('⚡ FAST DIVE!', player.x + 20, player.y - 10, '#f59e0b', 1.25);
    }
  }

  function addFloatingText(text, x, y, color = '#00f0ff', scale = 1) {
    floatingTexts.push({
      text: text,
      x: x,
      y: y,
      vy: -2.4,
      color: color,
      scale: scale,
      life: 42,
      maxLife: 42
    });
  }

  function spawnDebris(x, y, color = '#ef4444') {
    const debrisCount = player.turboTimer > 0 ? 26 : 18;
    for (let i = 0; i < debrisCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      debrisParticles.push({
        x: x + Math.random() * 20,
        y: y + Math.random() * 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: Math.random() * 8 + 3,
        color: Math.random() > 0.35 ? color : (Math.random() > 0.5 ? '#00f0ff' : '#ffffff'),
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.6,
        life: 38,
        maxLife: 38
      });
    }
  }

  function updateScoreHUD() {
    if (scoreDisplay) scoreDisplay.textContent = String(score).padStart(4, '0');
    if (distanceDisplay) distanceDisplay.textContent = `${distanceMeters}m`;
    if (sushiDisplay) sushiDisplay.textContent = `🍣 ${sushiCollected}`;
    if (comboDisplay) {
      comboDisplay.textContent = `${comboMultiplier}x`;
      if (comboMultiplier > 1) {
        comboDisplay.style.color = comboMultiplier >= 5 ? '#ff007f' : (comboMultiplier >= 4 ? '#ef4444' : (comboMultiplier >= 3 ? '#f59e0b' : '#a855f7'));
      } else {
        comboDisplay.style.color = '#fff';
      }
    }

    if (turboTrack && turboFill) {
      if (player.turboTimer > 0) {
        turboTrack.classList.add('active');
        const pct = (player.turboTimer / MAX_TURBO_TIME) * 100;
        turboFill.style.width = `${pct}%`;
      } else {
        turboTrack.classList.remove('active');
      }
    }
  }

  /* ==========================================================================
     Main Game Loop - Supercharged Impossibly Impossible Warp Speed
     ========================================================================== */
  function gameLoop() {
    if (!isPlaying || isPaused) return;

    frameCount++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate dynamic speed (EXPERT SUPERSONIC VELOCITY)
    const turboMultiplier = isImpossibleMode ? 3.4 : 2.5;
    const currentSpeed = player.turboTimer > 0 ? (gameSpeed * turboMultiplier) : gameSpeed;

    // Screen Shake Camera & Extreme Turbo Warp Rumble
    ctx.save();
    const turboRumble = player.turboTimer > 0 ? (Math.random() - 0.5) * (isImpossibleMode ? 6 : 3.5) : 0;
    if (screenShakeTimer > 0 || player.turboTimer > 0) {
      if (screenShakeTimer > 0) screenShakeTimer--;
      const shakeX = (Math.random() - 0.5) * screenShakeIntensity + turboRumble;
      const shakeY = (Math.random() - 0.5) * screenShakeIntensity + (turboRumble * 0.5);
      ctx.translate(shakeX, shakeY);
    }

    // Distance & Score progression (Hyper Speed Ticking)
    if (frameCount % (player.turboTimer > 0 ? 1 : 2) === 0) {
      distanceMeters += (player.turboTimer > 0 ? (isImpossibleMode ? 28 : 12) : (isImpossibleMode ? 3 : 1));
      score += comboMultiplier * (player.turboTimer > 0 ? (isImpossibleMode ? 16 : 6) : (isImpossibleMode ? 3 : 1));
      updateScoreHUD();
    }

    // Speed progression curve (Accelerates much faster up to 46.0!)
    if (frameCount % 140 === 0 && gameSpeed < (isImpossibleMode ? 46.0 : 25.0)) {
      gameSpeed += isImpossibleMode ? 0.75 : 0.4;
      addFloatingText(isImpossibleMode ? '⚡ EXPERT WARP ACCELERATING!' : 'SPEED UP! ⚡', canvas.width * 0.5, 80, isImpossibleMode ? '#ef4444' : '#00f0ff', 1.4);
    }

    // High distance milestones
    if (distanceMeters > 0 && distanceMeters % 250 === 0 && frameCount % 2 === 0) {
      addFloatingText(`⚡ ${distanceMeters}M HYPERSONIC!`, canvas.width * 0.5, 110, '#fbbf24', 1.5);
    }

    // Continuous Sonic Boom Shockwaves during Turbo
    if (player.turboTimer > 0 && frameCount % 3 === 0) {
      player.shockwaves.push({
        x: player.x + 10,
        y: player.y + player.height * 0.5,
        radius: 12,
        maxRadius: 120,
        color: frameCount % 6 === 0 ? '#ff007f' : '#00f0ff',
        alpha: 1.0
      });
    }

    // Combo Timer Decay
    if (comboTimer > 0) {
      comboTimer--;
      if (comboTimer <= 0 && comboMultiplier > 1) {
        comboMultiplier = 1;
        updateScoreHUD();
      }
    }

    // Turbo Timer
    if (player.turboTimer > 0) {
      player.turboTimer--;
      if (player.turboTimer <= 0) {
        updateScoreHUD();
      }
    }

    /* --------------------------------------------------------------------------
       1. Draw Parallax Cyber Background & Warp Speed Lines
       -------------------------------------------------------------------------- */
    // Deep Space / Hyperspace Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 310);
    skyGrad.addColorStop(0, player.turboTimer > 0 ? '#13011c' : '#030712');
    skyGrad.addColorStop(0.6, player.turboTimer > 0 ? '#2a0438' : (isImpossibleMode ? '#12081f' : '#081026'));
    skyGrad.addColorStop(1, player.turboTimer > 0 ? '#420658' : (isImpossibleMode ? '#1e0a2b' : '#0e1e38'));
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Hyperspace Warp Speed Lines (Multi-spectral high velocity streaks)
    if (isImpossibleMode || player.turboTimer > 0) {
      ctx.save();
      const lineMultiplier = player.turboTimer > 0 ? 3.0 : 1.0;
      for (let line of speedLines) {
        line.x -= line.speed * (currentSpeed * 0.18);
        if (line.x < -line.length * 3) {
          line.x = canvas.width + Math.random() * 100;
          line.y = Math.random() * 300;
          line.length = player.turboTimer > 0 ? (Math.random() * 220 + 100) : (Math.random() * 80 + 40);
        }
        
        if (player.turboTimer > 0) {
          ctx.strokeStyle = line.colorType === 'cyan' 
            ? 'rgba(0, 240, 255, 0.85)' 
            : (line.colorType === 'magenta' ? 'rgba(255, 0, 128, 0.85)' : 'rgba(253, 224, 71, 0.85)');
          ctx.lineWidth = Math.random() * 3.5 + 1.5;
        } else {
          ctx.strokeStyle = `rgba(255, ${Math.floor(Math.random() * 150 + 100)}, 0, ${line.alpha})`;
          ctx.lineWidth = Math.random() * 1.8 + 0.8;
        }

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.length * lineMultiplier, line.y);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Cyber Moon / Neon Orb
    ctx.save();
    ctx.shadowBlur = player.turboTimer > 0 ? 60 : (isImpossibleMode ? 40 : 30);
    ctx.shadowColor = player.turboTimer > 0 ? '#ff007f' : (isImpossibleMode ? '#f59e0b' : '#00f0ff');
    const moonGrad = ctx.createRadialGradient(680, 75, 4, 680, 75, 45);
    moonGrad.addColorStop(0, player.turboTimer > 0 ? 'rgba(255, 0, 128, 0.98)' : (isImpossibleMode ? 'rgba(245, 158, 11, 0.95)' : 'rgba(0, 240, 255, 0.9)'));
    moonGrad.addColorStop(0.7, player.turboTimer > 0 ? 'rgba(0, 240, 255, 0.7)' : (isImpossibleMode ? 'rgba(239, 68, 68, 0.5)' : 'rgba(56, 189, 248, 0.4)'));
    moonGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
    ctx.fillStyle = moonGrad;
    ctx.beginPath();
    ctx.arc(680, 75, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Twinkling Stars
    for (let s of stars) {
      s.x -= s.speed * (currentSpeed * 0.15);
      if (s.x < -10) s.x = canvas.width + 10;
      s.twinkle += 0.08;
      const alpha = 0.4 + Math.sin(s.twinkle) * 0.35;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, alpha)})`;
      ctx.fillRect(s.x, s.y, s.size, s.size);
    }

    // Distant City Skyline (Parallax Layer 1: 0.25x speed)
    ctx.save();
    for (let b of buildings) {
      b.x -= currentSpeed * 0.25;
      if (b.x + b.width < -50) {
        b.x = canvas.width + Math.random() * 40;
      }
      const bY = 308 - b.height;

      ctx.fillStyle = player.turboTimer > 0 ? '#0d041c' : '#060c1c';
      ctx.fillRect(b.x, bY, b.width, b.height);

      ctx.strokeStyle = player.turboTimer > 0 ? 'rgba(255, 0, 128, 0.3)' : `rgba(0, 240, 255, 0.2)`;
      ctx.lineWidth = 1;
      ctx.strokeRect(b.x, bY, b.width, b.height);

      // Neon Spire Antenna
      ctx.strokeStyle = player.turboTimer > 0 ? '#ff007f' : b.neonColor;
      ctx.beginPath();
      ctx.moveTo(b.x + b.width * 0.5, bY);
      ctx.lineTo(b.x + b.width * 0.5, bY - 14);
      ctx.stroke();

      // Window Matrix
      ctx.fillStyle = b.neonColor;
      ctx.globalAlpha = 0.45;
      for (let w = 0; w < b.windows; w++) {
        const wx = b.x + 8 + (w % 3) * 10;
        const wy = bY + 12 + Math.floor(w / 3) * 16;
        if (wx < b.x + b.width - 8 && wy < 300) {
          ctx.fillRect(wx, wy, 4, 6);
        }
      }
      ctx.globalAlpha = 1.0;
    }
    ctx.restore();

    // Floating Cyber Billboards (Parallax Layer 2: 0.5x speed)
    for (let bb of billboards) {
      bb.x -= currentSpeed * 0.5;
      if (bb.x < -250) bb.x = canvas.width + 400 + Math.random() * 200;

      ctx.save();
      ctx.fillStyle = 'rgba(6, 12, 28, 0.85)';
      ctx.strokeStyle = player.turboTimer > 0 ? '#ff007f' : bb.color;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = player.turboTimer > 0 ? '#ff007f' : bb.color;
      ctx.strokeRect(bb.x, 80, 170, 32);
      ctx.fillRect(bb.x, 80, 170, 32);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 12px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(bb.text, bb.x + 85, 101);
      ctx.restore();
    }

    // Neon Cyber Sprint Track Floor
    const trackY = 308;

    // Track Ground Base
    const roadGrad = ctx.createLinearGradient(0, trackY, 0, canvas.height);
    roadGrad.addColorStop(0, player.turboTimer > 0 ? '#0b0216' : '#040711');
    roadGrad.addColorStop(1, '#020307');
    ctx.fillStyle = roadGrad;
    ctx.fillRect(0, trackY, canvas.width, canvas.height - trackY);

    // Glowing Laser Track Surface Line
    ctx.save();
    ctx.strokeStyle = player.turboTimer > 0 ? '#ff007f' : (isImpossibleMode ? '#f59e0b' : '#00f0ff');
    ctx.lineWidth = player.turboTimer > 0 ? 8 : 4;
    ctx.shadowBlur = player.turboTimer > 0 ? 35 : 20;
    ctx.shadowColor = player.turboTimer > 0 ? '#ff007f' : (isImpossibleMode ? '#f59e0b' : '#00f0ff');
    ctx.beginPath();
    ctx.moveTo(0, trackY);
    ctx.lineTo(canvas.width, trackY);
    ctx.stroke();
    ctx.restore();

    // Perspective Track Grid & Scrolling Chevron Arrows
    const gridOffset = (frameCount * currentSpeed) % 48;
    ctx.strokeStyle = player.turboTimer > 0 ? 'rgba(255, 0, 128, 0.45)' : (isImpossibleMode ? 'rgba(245, 158, 11, 0.22)' : 'rgba(0, 240, 255, 0.18)');
    ctx.lineWidth = 1.5;
    for (let x = -gridOffset; x < canvas.width; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, trackY);
      ctx.lineTo(x - 35, canvas.height);
      ctx.stroke();

      // Chevrons on track
      if (Math.floor((x + gridOffset) / 48) % 2 === 0) {
        ctx.fillStyle = player.turboTimer > 0 ? 'rgba(255, 0, 128, 0.55)' : (isImpossibleMode ? 'rgba(245, 158, 11, 0.3)' : 'rgba(0, 240, 255, 0.25)');
        ctx.beginPath();
        ctx.moveTo(x + 10, trackY + 18);
        ctx.lineTo(x + 18, trackY + 24);
        ctx.lineTo(x + 10, trackY + 30);
        ctx.lineTo(x + 5, trackY + 30);
        ctx.lineTo(x + 12, trackY + 24);
        ctx.lineTo(x + 5, trackY + 18);
        ctx.fill();
      }
    }

    // Checkpoint Distance Markers on Track (e.g. 100m, 250m)
    if (distanceMeters > 0 && distanceMeters % 100 < 12) {
      const cpX = canvas.width - ((frameCount * currentSpeed) % (canvas.width * 2));
      if (cpX > -100 && cpX < canvas.width + 50) {
        ctx.save();
        ctx.fillStyle = player.turboTimer > 0 ? '#ff007f' : (isImpossibleMode ? '#f59e0b' : '#00f0ff');
        ctx.font = '800 13px "Space Grotesk", sans-serif';
        ctx.shadowBlur = 10;
        ctx.shadowColor = player.turboTimer > 0 ? '#ff007f' : '#00f0ff';
        ctx.fillText(`[ ${Math.floor(distanceMeters / 100) * 100}M ]`, cpX, trackY + 44);
        ctx.restore();
      }
    }

    /* --------------------------------------------------------------------------
       2. Player Physics & Stride Updates
       -------------------------------------------------------------------------- */
    player.vy += player.gravity;
    player.y += player.vy;

    if (player.y >= player.groundY) {
      if (player.isDiving) {
        player.isDiving = false;
        screenShakeTimer = 10;
        screenShakeIntensity = 7.5;
        player.shockwaves.push({
          x: player.x + 22,
          y: player.groundY + player.height - 2,
          radius: 8,
          maxRadius: 75,
          color: '#f59e0b',
          alpha: 1.0
        });
        for (let i = 0; i < 18; i++) {
          player.particles.push({
            x: player.x + Math.random() * player.width,
            y: player.groundY + player.height - 2,
            vx: (Math.random() - 0.5) * 12,
            vy: -Math.random() * 5 - 1,
            size: Math.random() * 5 + 2,
            color: '#fbbf24',
            life: 24,
            maxLife: 24
          });
        }
      }
      player.y = player.groundY;
      player.vy = 0;
      player.isGrounded = true;
      player.isJumping = false;
      player.hasDoubleJumped = false;

      // Check buffered jump
      if (jumpBufferTimer > 0) {
        jumpBufferTimer = 0;
        triggerJump();
      }
    } else {
      player.isGrounded = false;
    }

    if (jumpBufferTimer > 0) jumpBufferTimer--;

    // Update Running Cycle (Hyper-cadence Strides in Turbo)
    if (player.isGrounded) {
      player.runCycle += currentSpeed * (player.turboTimer > 0 ? 0.22 : (isImpossibleMode ? 0.105 : 0.082));
    }

    // Multi-spectral Ghost Trails (16-layer Chromatic Clones in Turbo)
    if (isImpossibleMode || player.turboTimer > 0 || !player.isGrounded) {
      const ghostCount = player.turboTimer > 0 ? 2 : 1;
      for (let g = 0; g < ghostCount; g++) {
        player.ghosts.push({
          x: player.x - (g * 14),
          y: player.y,
          runCycle: player.runCycle,
          isGrounded: player.isGrounded,
          turbo: player.turboTimer > 0,
          impossible: isImpossibleMode,
          alpha: player.turboTimer > 0 ? 0.9 : 0.75,
          colorHue: (frameCount * 15 + g * 30) % 360
        });
      }
    }

    // Rocket Thruster & Ground Sparks (Fiery Plasma Jet in Turbo)
    if (player.turboTimer > 0) {
      // Dual sneaker thruster exhaust
      for (let i = 0; i < 6; i++) {
        player.particles.push({
          x: player.x + 4,
          y: player.y + player.height - 4 + (Math.random() - 0.5) * 6,
          vx: -currentSpeed * 0.85 - Math.random() * 8,
          vy: (Math.random() - 0.5) * 5,
          size: Math.random() * 7 + 3,
          color: Math.random() > 0.5 ? '#00f0ff' : (Math.random() > 0.5 ? '#ff007f' : '#ffffff'),
          life: 28,
          maxLife: 28
        });
      }
    } else if (player.isGrounded && frameCount % 2 === 0) {
      player.particles.push({
        x: player.x + 8,
        y: player.y + player.height - 2,
        vx: -currentSpeed * 0.7 + (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.7) * 4,
        size: isImpossibleMode ? (Math.random() * 5 + 2.5) : (Math.random() * 4 + 2),
        color: isImpossibleMode ? '#f59e0b' : 'rgba(0, 240, 255, 0.7)',
        life: 20,
        maxLife: 20
      });
    }

    // Airborne Thruster Jet Particles
    if (!player.isGrounded) {
      player.particles.push({
        x: player.x + 12 + Math.random() * 12,
        y: player.y + player.height - 4,
        vx: -currentSpeed * 0.5 + (Math.random() - 0.5) * 2,
        vy: Math.random() * 5 + 2,
        size: Math.random() * 6 + 2.5,
        color: player.turboTimer > 0 ? '#ff007f' : (isImpossibleMode ? '#fbbf24' : '#00f0ff'),
        life: 18,
        maxLife: 18
      });
    }

    /* --------------------------------------------------------------------------
       3. Render Shockwaves, Ghosts & Trail Particles
       -------------------------------------------------------------------------- */
    // Render Supersonic Shockwaves
    for (let i = player.shockwaves.length - 1; i >= 0; i--) {
      const sw = player.shockwaves[i];
      sw.radius += player.turboTimer > 0 ? 7.5 : 4.5;
      sw.alpha -= player.turboTimer > 0 ? 0.04 : 0.05;
      if (sw.alpha <= 0) {
        player.shockwaves.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.strokeStyle = sw.color;
      ctx.globalAlpha = sw.alpha;
      ctx.lineWidth = player.turboTimer > 0 ? 5 : 3.5;
      ctx.shadowBlur = 20;
      ctx.shadowColor = sw.color;
      ctx.beginPath();
      ctx.ellipse(sw.x, sw.y, sw.radius, sw.radius * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Render Ghosts
    for (let i = player.ghosts.length - 1; i >= 0; i--) {
      const g = player.ghosts[i];
      g.alpha -= (g.turbo ? 0.05 : (isImpossibleMode ? 0.08 : 0.08));
      if (g.alpha <= 0) {
        player.ghosts.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = g.alpha;
      renderShauryaAvatar(ctx, g.x, g.y, g.runCycle, g.isGrounded, g.turbo, true, g.impossible);
      ctx.restore();
    }

    // Render Trail Particles
    for (let i = player.particles.length - 1; i >= 0; i--) {
      const p = player.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;

      const pAlpha = p.life / p.maxLife;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = pAlpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * pAlpha, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;

      if (p.life <= 0) player.particles.splice(i, 1);
    }

    /* --------------------------------------------------------------------------
       4. Render Shaurya Runner Avatar (Facing Forward / Right)
       -------------------------------------------------------------------------- */
    renderShauryaAvatar(ctx, player.x, player.y, player.runCycle, player.isGrounded, player.turboTimer > 0, false, isImpossibleMode);

    /* --------------------------------------------------------------------------
       5. Spawn & Render Obstacles (With Supersonic Vaporization Field)
       -------------------------------------------------------------------------- */
    // Obstacle Spawning Interval - Expert Reflex Pace!
    const spawnInterval = isImpossibleMode 
      ? Math.max(22, Math.floor(66 - currentSpeed * 1.05)) 
      : Math.max(48, Math.floor(130 - currentSpeed * 3.0));

    if (frameCount % spawnInterval === 0) {
      const rand = Math.random();
      if (isImpossibleMode) {
        if (rand > 0.72) {
          // Double Hurdle pattern! Demands mid-air double jump!
          obstacles.push({
            x: canvas.width + 30,
            y: 272,
            width: 26,
            height: 36,
            type: 'hurdle',
            glowPhase: Math.random() * Math.PI * 2
          });
          obstacles.push({
            x: canvas.width + 105,
            y: 272,
            width: 26,
            height: 36,
            type: 'hurdle',
            glowPhase: Math.random() * Math.PI * 2
          });
        } else if (rand > 0.48) {
          // Flying Hunter Drone oscillating up/down in air
          obstacles.push({
            x: canvas.width + 30,
            y: 205,
            baseY: 205,
            width: 38,
            height: 34,
            type: 'hunter_drone',
            sinePhase: Math.random() * Math.PI * 2,
            glowPhase: Math.random() * Math.PI * 2
          });
        } else if (rand > 0.25) {
          // Suspended High Laser Gate (dodge underneath or fast dive!)
          obstacles.push({
            x: canvas.width + 30,
            y: 195,
            width: 32,
            height: 48,
            type: 'high_gate',
            glowPhase: Math.random() * Math.PI * 2
          });
        } else {
          // Heavy cyber barrier
          obstacles.push({
            x: canvas.width + 30,
            y: 256,
            width: 36,
            height: 52,
            type: 'barrier',
            glowPhase: Math.random() * Math.PI * 2
          });
        }
      } else {
        const isBarrier = rand > 0.55;
        obstacles.push({
          x: canvas.width + 30,
          y: isBarrier ? 258 : 272,
          width: isBarrier ? 34 : 28,
          height: isBarrier ? 50 : 36,
          type: isBarrier ? 'barrier' : 'hurdle',
          glowPhase: Math.random() * Math.PI * 2
        });
      }
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obs = obstacles[i];
      obs.x -= currentSpeed;
      obs.glowPhase += 0.12;

      if (obs.type === 'hunter_drone') {
        obs.sinePhase += 0.14;
        obs.y = obs.baseY + Math.sin(obs.sinePhase) * 26;
      }

      renderObstacle(ctx, obs);

      // ⚡ IMPOSSIBLY IMPOSSIBLE TURBO VAPORIZER FIELD (Wide Area Pulverization)
      if (player.turboTimer > 0) {
        if (obs.x < player.x + 320 && obs.x > player.x - 50) {
          spawnDebris(obs.x, obs.y, '#ff007f');
          obstacles.splice(i, 1);
          score += 300 * comboMultiplier;
          screenShakeTimer = 14;
          screenShakeIntensity = 8.5;
          playSmashSound();
          addFloatingText(`⚡ IMPOSSIBLE VAPORIZED +${300 * comboMultiplier}!`, obs.x + 20, obs.y - 14, '#00f0ff', 1.5);
          updateScoreHUD();
          continue;
        }
      } else {
        // Normal Collision Detection with Player Hitbox
        const hitbox = {
          x: player.x + 8,
          y: player.y + 6,
          w: player.width - 14,
          h: player.height - 8
        };

        if (
          hitbox.x < obs.x + obs.width &&
          hitbox.x + hitbox.w > obs.x &&
          hitbox.y < obs.y + obs.height &&
          hitbox.y + hitbox.h > obs.y
        ) {
          // Crash!
          spawnDebris(player.x + 20, player.y + 20, '#ef4444');
          endGame();
          ctx.restore();
          return;
        }
      }

      if (obs.x < -80) obstacles.splice(i, 1);
    }

    /* --------------------------------------------------------------------------
       6. Spawn & Render Collectibles (With Plasma Item Vacuum Magnetism)
       -------------------------------------------------------------------------- */
    if (frameCount % (isImpossibleMode ? 65 : 85) === 0) {
      const rand = Math.random();
      let type = 'sushi';
      if (rand > 0.80) type = 'bolt';
      else if (rand > 0.55) type = 'trophy';

      collectibles.push({
        x: canvas.width + 40,
        y: Math.random() > 0.45 ? 195 : 248,
        width: 30,
        height: 30,
        type: type,
        hoverPhase: Math.random() * Math.PI * 2
      });
    }

    for (let i = collectibles.length - 1; i >= 0; i--) {
      const col = collectibles[i];
      col.x -= currentSpeed;
      col.hoverPhase += 0.1;
      let hoverY = col.y + Math.sin(col.hoverPhase) * 5;

      // ⚡ HYPER TURBO ITEM MAGNETISM (Pulls all items directly to Shaurya)
      if (player.turboTimer > 0) {
        const dx = player.x - col.x;
        const dy = (player.y + player.height * 0.5) - hoverY;
        const magDist = Math.hypot(dx, dy);
        if (magDist < 420) {
          col.x += dx * 0.35;
          col.y += dy * 0.35;
          hoverY = col.y;
        }
      }

      renderCollectible(ctx, col, hoverY);

      // Collection Hitbox
      const pCenter = { x: player.x + player.width * 0.5, y: player.y + player.height * 0.5 };
      const cCenter = { x: col.x + col.width * 0.5, y: hoverY + col.height * 0.5 };
      const dist = Math.hypot(pCenter.x - cCenter.x, pCenter.y - cCenter.y);

      if (dist < (player.turboTimer > 0 ? 68 : 38)) {
        // Increment combo up to 10x
        comboMultiplier = Math.min(10, comboMultiplier + 1);
        comboTimer = 220;
        if (comboMultiplier > maxComboReached) maxComboReached = comboMultiplier;

        if (col.type === 'sushi') {
          const pts = 50 * comboMultiplier;
          score += pts;
          sushiCollected++;
          playCollectSound();
          playComboSound(comboMultiplier);
          addFloatingText(`+${pts} 🍣`, col.x, hoverY - 15, '#f59e0b', 1.1 + comboMultiplier * 0.1);
        } else if (col.type === 'trophy') {
          const pts = 100 * comboMultiplier;
          score += pts;
          playPowerupSound();
          playComboSound(comboMultiplier + 1);
          addFloatingText(`+${pts} 🏆`, col.x, hoverY - 20, '#fbbf24', 1.35);
        } else if (col.type === 'bolt') {
          player.turboTimer = MAX_TURBO_TIME;
          const pts = 300 * comboMultiplier;
          score += pts;
          playTurboStartSound();
          
          // Massive warp shockwave
          player.shockwaves.push({
            x: player.x + 22,
            y: player.y + 27,
            radius: 10,
            maxRadius: 180,
            color: '#ff007f',
            alpha: 1.0
          });

          addFloatingText(`⚡ IMPOSSIBLE WARP 5.5X ACTIVE! ⚡`, player.x + 30, player.y - 35, '#ff007f', 1.75);
          screenShakeTimer = 16;
          screenShakeIntensity = 9;
        }

        updateScoreHUD();
        collectibles.splice(i, 1);
        continue;
      }

      if (col.x < -60) collectibles.splice(i, 1);
    }

    /* --------------------------------------------------------------------------
       7. Debris Particles (Obstacle Destruction)
       -------------------------------------------------------------------------- */
    for (let i = debrisParticles.length - 1; i >= 0; i--) {
      const d = debrisParticles[i];
      d.x += d.vx;
      d.y += d.vy;
      d.vy += 0.3; // gravity
      d.rotation += d.vRot;
      d.life--;

      const dAlpha = d.life / d.maxLife;
      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.rotate(d.rotation);
      ctx.fillStyle = d.color;
      ctx.globalAlpha = dAlpha;
      ctx.fillRect(-d.size * 0.5, -d.size * 0.5, d.size, d.size);
      ctx.restore();

      if (d.life <= 0) debrisParticles.splice(i, 1);
    }

    /* --------------------------------------------------------------------------
       8. Floating Score Text Banners
       -------------------------------------------------------------------------- */
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
      const ft = floatingTexts[i];
      ft.y += ft.vy;
      ft.life--;

      const alpha = ft.life / ft.maxLife;
      ctx.save();
      ctx.font = `800 ${Math.round(14 * ft.scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.shadowBlur = 12;
      ctx.shadowColor = ft.color;
      ctx.fillStyle = ft.color;
      ctx.globalAlpha = alpha;
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();

      if (ft.life <= 0) floatingTexts.splice(i, 1);
    }

    ctx.restore(); // Restore camera shake

    animationFrameId = requestAnimationFrame(gameLoop);
  }

  /* ==========================================================================
     Custom Procedural Forward-Facing Shaurya Avatar Renderer
     ========================================================================== */
  function renderShauryaAvatar(ctx, px, py, runCycle, isGrounded, isTurbo, isGhost = false) {
    ctx.save();
    ctx.translate(px, py);

    // Aerodynamic sprint lean angle facing forward (right)
    const leanAngle = isTurbo ? 0.22 : (isGrounded ? 0.14 : 0.08);
    ctx.rotate(leanAngle);

    // ⚡ TURBO SUPERNOVA PLASMA SHIELD & VISOR SUPER-CANNON
    if (isTurbo && !isGhost) {
      ctx.save();
      // Outer Rotating Plasma Field
      ctx.shadowBlur = 35;
      ctx.shadowColor = '#00f0ff';
      const auraGrad = ctx.createRadialGradient(22, 26, 6, 22, 26, 42);
      auraGrad.addColorStop(0, 'rgba(0, 240, 255, 0.55)');
      auraGrad.addColorStop(0.5, 'rgba(255, 0, 128, 0.35)');
      auraGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(22, 26, 42, 0, Math.PI * 2);
      ctx.fill();

      // Coronal Corona Rays
      ctx.strokeStyle = 'rgba(255, 0, 128, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(22, 26, 32 + Math.sin(frameCount * 0.4) * 4, 0, Math.PI * 2);
      ctx.stroke();

      // ⚡ SUPERNOVA VISOR LASER HIGH-BEAM (Shooting across full screen)
      // Layer 1: Wide outer glow
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(34, 11);
      ctx.lineTo(800, 11);
      ctx.stroke();

      // Layer 2: Core Cyan Laser
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(34, 11);
      ctx.lineTo(800, 11);
      ctx.stroke();

      // Layer 3: Blinding White Super-Center
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(34, 11);
      ctx.lineTo(800, 11);
      ctx.stroke();

      // Visor spark nodes
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(38, 9, 5, 4);
      ctx.fillRect(80 + (frameCount * 25) % 600, 9.5, 8, 3);
      ctx.restore();
    }

    const stride = isGrounded ? Math.sin(runCycle) : 0.6;
    const cosStride = isGrounded ? Math.cos(runCycle) : -0.6;

    // Color Palette
    const skinTone = isGhost ? '#00f0ff' : '#e4a873';
    const skinShadow = isGhost ? '#0088cc' : '#cb8958';
    const jerseyColor = isGhost ? '#00f0ff' : '#0072ff';
    const shortsColor = isGhost ? '#020617' : '#0f172a';
    const shoeColor = isGhost ? '#00f0ff' : '#ef4444';
    const glowCyan = '#00f0ff';

    /* ----- 1. Back Arm (Swinging backward or forward counter-balance) ----- */
    ctx.save();
    const backArmAngle = -stride * 0.8;
    ctx.translate(18, 20);
    ctx.rotate(backArmAngle);

    // Upper Arm
    ctx.fillStyle = skinShadow;
    ctx.fillRect(-3, 0, 6, 12);
    // Forearm & Gloved Hand
    ctx.translate(0, 12);
    ctx.rotate(0.6 + backArmAngle * 0.3);
    ctx.fillStyle = skinTone;
    ctx.fillRect(-2.5, 0, 5, 10);
    // Cyan wristband
    ctx.fillStyle = glowCyan;
    ctx.fillRect(-3, 7, 6, 3);
    ctx.restore();

    /* ----- 2. Back Leg ----- */
    ctx.save();
    const backLegAngle = -stride * 0.85;
    ctx.translate(17, 36);
    ctx.rotate(backLegAngle);

    // Thigh
    ctx.fillStyle = skinShadow;
    ctx.fillRect(-3.5, 0, 7, 13);
    // Knee to Shin
    ctx.translate(0, 13);
    const backKneeBend = isGrounded ? Math.max(0, -stride * 0.9) : 0.8;
    ctx.rotate(backKneeBend);
    ctx.fillStyle = skinShadow;
    ctx.fillRect(-3, 0, 6, 12);

    // Sneaker (facing right)
    ctx.translate(0, 12);
    ctx.fillStyle = shoeColor;
    ctx.beginPath();
    ctx.roundRect(-4, -1, 14, 6, 2);
    ctx.fill();
    // Glowing sole air cushion
    ctx.fillStyle = glowCyan;
    ctx.fillRect(-4, 4, 14, 2);
    ctx.restore();

    /* ----- 3. Torso & Athletic Jersey ----- */
    // Athletic sleeveless racing jersey
    ctx.fillStyle = jerseyColor;
    ctx.beginPath();
    ctx.roundRect(12, 17, 18, 19, 3);
    ctx.fill();

    // Jersey Cyan Side Trim
    ctx.fillStyle = glowCyan;
    ctx.fillRect(12, 17, 3, 19);
    ctx.fillRect(27, 17, 3, 19);

    // Shaurya Golden "S" / Lightning Emblem on Chest
    if (!isGhost) {
      ctx.fillStyle = '#fbbf24';
      ctx.font = '800 9px "Syne", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S', 21, 30);
    }

    // Athletic Shorts
    ctx.fillStyle = shortsColor;
    ctx.beginPath();
    ctx.roundRect(11, 34, 20, 9, [0, 0, 3, 3]);
    ctx.fill();
    // Shorts neon stripe
    ctx.fillStyle = glowCyan;
    ctx.fillRect(11, 41, 20, 2);

    /* ----- 4. Front Leg ----- */
    ctx.save();
    const frontLegAngle = stride * 0.9;
    ctx.translate(24, 36);
    ctx.rotate(frontLegAngle);

    // Front Thigh
    ctx.fillStyle = skinTone;
    ctx.fillRect(-4, 0, 7.5, 13);
    // Knee to Shin
    ctx.translate(0, 13);
    const frontKneeBend = isGrounded ? Math.max(0, stride * 0.7) : 0.3;
    ctx.rotate(frontKneeBend);
    ctx.fillStyle = skinTone;
    ctx.fillRect(-3.5, 0, 6.5, 12);

    // Front Sneaker (facing right / forward)
    ctx.translate(0, 12);
    ctx.fillStyle = shoeColor;
    ctx.beginPath();
    ctx.roundRect(-4, -1, 15, 6, 2);
    ctx.fill();
    // Glowing neon sole
    ctx.fillStyle = glowCyan;
    ctx.fillRect(-4, 4, 15, 2);
    ctx.restore();

    /* ----- 5. Neck, Head, Hair & Cyber Visor (Facing Right) ----- */
    // Muscular Neck
    ctx.fillStyle = skinTone;
    ctx.fillRect(17, 12, 9, 6);

    // Head Base
    ctx.fillStyle = skinTone;
    ctx.beginPath();
    ctx.arc(22, 9, 8.5, 0, Math.PI * 2);
    ctx.fill();

    // Athletic determined jawline facing right
    ctx.beginPath();
    ctx.moveTo(22, 14);
    ctx.lineTo(29, 11);
    ctx.lineTo(27, 4);
    ctx.fill();

    if (!isGhost) {
      // Modern Sporty Dark Hair (flowing back with motion)
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(14, 9);
      ctx.lineTo(10, 4); // Back hair spike
      ctx.lineTo(15, 3);
      ctx.lineTo(13, -1); // Top spike
      ctx.lineTo(22, -2);
      ctx.lineTo(27, 2);
      ctx.lineTo(28, 6);
      ctx.lineTo(22, 4);
      ctx.closePath();
      ctx.fill();

      // Athletic Brow Headband
      ctx.fillStyle = '#f97316';
      ctx.fillRect(15, 4, 13, 3);

      // Cyber Visor / High-Tech Sports Goggles (Facing Right)
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = glowCyan;
      const visorGrad = ctx.createLinearGradient(18, 6, 33, 12);
      visorGrad.addColorStop(0, '#00f0ff');
      visorGrad.addColorStop(1, '#38bdf8');
      ctx.fillStyle = visorGrad;
      ctx.beginPath();
      ctx.roundRect(19, 6, 12, 6, [1, 4, 4, 1]);
      ctx.fill();

      // Visor Specular Reflection Flare
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(23, 7, 4, 1.5);
      ctx.restore();

      // Cheerful athletic grin
      ctx.strokeStyle = '#7c2d12';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(27, 12, 3, 0.2, Math.PI * 0.7);
      ctx.stroke();
    }

    /* ----- 6. Front Arm ----- */
    ctx.save();
    const frontArmAngle = stride * 0.85;
    ctx.translate(24, 20);
    ctx.rotate(frontArmAngle);

    // Upper Arm
    ctx.fillStyle = skinTone;
    ctx.fillRect(-3, 0, 6, 12);
    // Forearm & Glove
    ctx.translate(0, 12);
    ctx.rotate(-0.8 - frontArmAngle * 0.3);
    ctx.fillStyle = skinTone;
    ctx.fillRect(-2.5, 0, 5, 10);
    // Cyan wristband
    ctx.fillStyle = glowCyan;
    ctx.fillRect(-3, 7, 6, 3);
    ctx.restore();

    ctx.restore();
  }

  /* ==========================================================================
     Obstacle Renderer (Laser Hurdles, Hunter Drones, High Gates & Barriers)
     ========================================================================== */
  function renderObstacle(ctx, obs) {
    ctx.save();
    if (obs.type === 'hurdle') {
      // Cyber Laser Hurdle
      const pylonWidth = 6;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(obs.x, obs.y, pylonWidth, obs.height);
      ctx.fillRect(obs.x + obs.width - pylonWidth, obs.y, pylonWidth, obs.height);

      // Warning Stripes on Pylons
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(obs.x, obs.y + 4, pylonWidth, 4);
      ctx.fillRect(obs.x, obs.y + 16, pylonWidth, 4);
      ctx.fillRect(obs.x + obs.width - pylonWidth, obs.y + 4, pylonWidth, 4);
      ctx.fillRect(obs.x + obs.width - pylonWidth, obs.y + 16, pylonWidth, 4);

      // Pulsing Glowing Laser Beam
      ctx.save();
      const pulseAlpha = 0.7 + Math.sin(obs.glowPhase) * 0.3;
      ctx.strokeStyle = `rgba(239, 68, 68, ${pulseAlpha})`;
      ctx.lineWidth = 4;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(obs.x + pylonWidth, obs.y + 8);
      ctx.lineTo(obs.x + obs.width - pylonWidth, obs.y + 8);
      ctx.stroke();

      // Second low beam
      ctx.beginPath();
      ctx.moveTo(obs.x + pylonWidth, obs.y + obs.height - 8);
      ctx.lineTo(obs.x + obs.width - pylonWidth, obs.y + obs.height - 8);
      ctx.stroke();
      ctx.restore();
    } else if (obs.type === 'hunter_drone') {
      // 💀 Fast Hovering Hunter Drone with laser eye and rotating plasma blades
      ctx.save();
      ctx.shadowBlur = 16;
      ctx.shadowColor = '#ef4444';

      // Drone Main Body (Aerodynamic Stealth Wing)
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(obs.x, obs.y + obs.height * 0.5);
      ctx.lineTo(obs.x + obs.width * 0.7, obs.y);
      ctx.lineTo(obs.x + obs.width, obs.y + obs.height * 0.5);
      ctx.lineTo(obs.x + obs.width * 0.7, obs.y + obs.height);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Threat Eye Lens
      const eyeGrad = ctx.createRadialGradient(
        obs.x + obs.width * 0.35, obs.y + obs.height * 0.5, 2,
        obs.x + obs.width * 0.35, obs.y + obs.height * 0.5, 8
      );
      eyeGrad.addColorStop(0, '#ffffff');
      eyeGrad.addColorStop(0.6, '#ef4444');
      eyeGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = eyeGrad;
      ctx.beginPath();
      ctx.arc(obs.x + obs.width * 0.35, obs.y + obs.height * 0.5, 8, 0, Math.PI * 2);
      ctx.fill();

      // Spinning Plasma Blades
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.85)';
      ctx.lineWidth = 2.5;
      const bladePhase = frameCount * 0.4;
      ctx.beginPath();
      ctx.arc(obs.x + obs.width * 0.75, obs.y - 4, 9, bladePhase, bladePhase + Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(obs.x + obs.width * 0.75, obs.y + obs.height + 4, 9, -bladePhase, -bladePhase + Math.PI);
      ctx.stroke();

      // Sonic Jet Exhaust
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(obs.x + obs.width - 2, obs.y + obs.height * 0.5 - 3, 7 + Math.random() * 8, 6);
      ctx.restore();
    } else if (obs.type === 'high_gate') {
      // ⚡ Suspended High Quantum Gate (Must stay low or dive down!)
      ctx.save();
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#f59e0b';

      // Hanging Emitter Pod
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(obs.x, obs.y, obs.width, 16, 4);
      ctx.fill();
      ctx.stroke();

      // Danger Warning Emblem
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(obs.x + 4, obs.y + 4, obs.width - 8, 8);

      // Downward Pulsing Heavy Laser Curtain
      const curtainAlpha = 0.75 + Math.sin(obs.glowPhase * 2) * 0.25;
      ctx.strokeStyle = `rgba(239, 68, 68, ${curtainAlpha})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(obs.x + 8, obs.y + 16);
      ctx.lineTo(obs.x + 8, obs.y + obs.height);
      ctx.moveTo(obs.x + obs.width - 8, obs.y + 16);
      ctx.lineTo(obs.x + obs.width - 8, obs.y + obs.height);
      ctx.stroke();
      ctx.restore();
    } else {
      // Hovering Cyber Tech Drone / Barrier
      ctx.save();
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#ef4444';
      
      // Drone Frame
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 6);
      ctx.fill();
      ctx.stroke();

      // Glowing Danger Core Eye
      const coreGrad = ctx.createRadialGradient(
        obs.x + obs.width * 0.5, obs.y + obs.height * 0.5, 2,
        obs.x + obs.width * 0.5, obs.y + obs.height * 0.5, 12
      );
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.5, '#ef4444');
      coreGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(obs.x + obs.width * 0.5, obs.y + obs.height * 0.5, 12, 0, Math.PI * 2);
      ctx.fill();

      // Hazard Lines
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(obs.x + 4, obs.y + 6, obs.width - 8, 3);
      ctx.fillRect(obs.x + 4, obs.y + obs.height - 9, obs.width - 8, 3);

      // Repulsor thruster sparks under drone
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(obs.x + 8, obs.y + obs.height, 4, 4 + Math.random() * 5);
      ctx.fillRect(obs.x + obs.width - 12, obs.y + obs.height, 4, 4 + Math.random() * 5);
      ctx.restore();
    }
    ctx.restore();
  }

  /* ==========================================================================
     Collectible Renderer (Sushi, Trophy, Lightning Bolt)
     ========================================================================== */
  function renderCollectible(ctx, col, y) {
    ctx.save();
    ctx.translate(col.x, y);

    if (col.type === 'sushi') {
      // Vector Gourmet Sushi Nigiri
      ctx.save();
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#f59e0b';

      // Rice Bed
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.ellipse(14, 18, 12, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Salmon Fillet
      const salmonGrad = ctx.createLinearGradient(4, 8, 24, 16);
      salmonGrad.addColorStop(0, '#f97316');
      salmonGrad.addColorStop(1, '#ef4444');
      ctx.fillStyle = salmonGrad;
      ctx.beginPath();
      ctx.ellipse(14, 13, 14, 6, -0.1, 0, Math.PI * 2);
      ctx.fill();

      // Salmon White Marbling Stripes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(8, 10); ctx.lineTo(11, 16);
      ctx.moveTo(13, 9); ctx.lineTo(16, 16);
      ctx.moveTo(18, 9); ctx.lineTo(21, 16);
      ctx.stroke();

      // Nori Seaweed Belt
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(12, 7, 5, 14);

      // Sparkle Halo
      ctx.fillStyle = '#fde047';
      const spAngle = col.hoverPhase * 1.5;
      ctx.fillRect(14 + Math.cos(spAngle) * 16, 14 + Math.sin(spAngle) * 12, 2.5, 2.5);
      ctx.restore();

    } else if (col.type === 'trophy') {
      // Golden Championship Trophy
      ctx.save();
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#fbbf24';

      // Trophy Base
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(8, 22, 14, 5);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(9, 21, 12, 2);

      // Trophy Stem
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(13, 16, 4, 6);

      // Trophy Cup
      const goldGrad = ctx.createLinearGradient(6, 6, 22, 16);
      goldGrad.addColorStop(0, '#fef08a');
      goldGrad.addColorStop(0.5, '#fbbf24');
      goldGrad.addColorStop(1, '#d97706');
      ctx.fillStyle = goldGrad;
      ctx.beginPath();
      ctx.moveTo(6, 6);
      ctx.lineTo(24, 6);
      ctx.lineTo(20, 16);
      ctx.lineTo(10, 16);
      ctx.closePath();
      ctx.fill();

      // Handles
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(6, 10, 4, Math.PI * 0.5, Math.PI * 1.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(24, 10, 4, -Math.PI * 0.5, Math.PI * 0.5);
      ctx.stroke();

      // Shine Glint
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(10, 8, 3, 5);
      ctx.restore();

    } else {
      // High-Energy Plasma Lightning Bolt
      ctx.save();
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00f0ff';

      // Plasma Orbit Ring
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(14, 14, 14, 6, col.hoverPhase, 0, Math.PI * 2);
      ctx.stroke();

      // Lightning Bolt Shape
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.moveTo(17, 2);
      ctx.lineTo(8, 14);
      ctx.lineTo(14, 14);
      ctx.lineTo(11, 26);
      ctx.lineTo(22, 12);
      ctx.lineTo(15, 12);
      ctx.closePath();
      ctx.fill();

      // Core White Shine
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(16, 6);
      ctx.lineTo(11, 13);
      ctx.lineTo(14, 13);
      ctx.lineTo(13, 20);
      ctx.lineTo(18, 13);
      ctx.lineTo(15, 13);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();
  }

  /* ==========================================================================
     Event Listeners & Controls
     ========================================================================== */
  if (startBtn) startBtn.addEventListener('click', startGame);
  if (restartBtn) restartBtn.addEventListener('click', startGame);
  if (pauseBtn) pauseBtn.addEventListener('click', togglePause);
  if (resumeBtn) resumeBtn.addEventListener('click', resumeGame);
  if (pauseRestartBtn) pauseRestartBtn.addEventListener('click', startGame);
  if (difficultyBtn) difficultyBtn.addEventListener('click', toggleImpossibleMode);

  if (touchJumpBtn) {
    touchJumpBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      triggerJump();
    }, { passive: false });
    touchJumpBtn.addEventListener('click', triggerJump);
  }

  if (touchDiveBtn) {
    touchDiveBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      triggerDive();
    }, { passive: false });
    touchDiveBtn.addEventListener('click', triggerDive);
  }

  if (touchPauseBtn) {
    touchPauseBtn.addEventListener('click', togglePause);
  }

  // Keyboard Shortcuts (Space/W/Up: Jump & Double Jump; S/Down: Fast Dive; P: Pause; M: Mode)
  window.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
      e.preventDefault();
      if (!isPlaying) {
        if (startOverlay && !startOverlay.classList.contains('hidden')) {
          startGame();
        } else if (gameOverOverlay && !gameOverOverlay.classList.contains('hidden')) {
          startGame();
        }
      } else {
        triggerJump();
      }
    } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
      e.preventDefault();
      if (isPlaying) {
        triggerDive();
      }
    } else if (e.code === 'KeyP' || e.code === 'Escape') {
      e.preventDefault();
      togglePause();
    } else if (e.code === 'KeyM') {
      e.preventDefault();
      toggleImpossibleMode();
    }
  });

  // Canvas Click / Tap / Swipe to Jump & Fast Dive
  let touchStartY = 0;
  canvas.addEventListener('mousedown', (e) => {
    if (isPlaying) triggerJump();
  });
  canvas.addEventListener('touchstart', (e) => {
    if (isPlaying) {
      touchStartY = e.touches[0].clientY;
      triggerJump();
    }
  }, { passive: true });
  canvas.addEventListener('touchmove', (e) => {
    if (isPlaying && touchStartY) {
      const deltaY = e.touches[0].clientY - touchStartY;
      if (deltaY > 30) {
        triggerDive();
        touchStartY = 0;
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   11. Interactive Triathlon Race Stage Simulator
   ========================================================================== */
function initRaceSimulator() {
  const startBtn = document.getElementById('start-race-sim-btn');
  const resetBtn = document.getElementById('reset-race-sim-btn');
  const fillBar = document.getElementById('course-progress-fill');
  const racerAvatar = document.getElementById('racer-avatar');
  const racerEmoji = document.getElementById('racer-emoji');

  const stageText = document.getElementById('tele-stage-text');
  const timerText = document.getElementById('tele-timer-text');
  const hrText = document.getElementById('tele-hr-text');
  const paceText = document.getElementById('tele-pace-text');

  const markers = {
    swim: document.getElementById('sim-marker-swim'),
    t1: document.getElementById('sim-marker-t1'),
    bike: document.getElementById('sim-marker-bike'),
    t2: document.getElementById('sim-marker-t2'),
    run: document.getElementById('sim-marker-run'),
    finish: document.getElementById('sim-marker-finish')
  };

  let isSimulating = false;
  let simProgress = 0;
  let simTimer = null;
  let seconds = 0;

  function resetSim() {
    clearInterval(simTimer);
    isSimulating = false;
    simProgress = 0;
    seconds = 0;

    if (fillBar) fillBar.style.width = '0%';
    if (racerAvatar) racerAvatar.style.left = '0%';
    if (racerEmoji) racerEmoji.textContent = '🏊‍♂️';

    if (stageText) stageText.textContent = 'READY AT START LINE';
    if (timerText) timerText.textContent = '00:00.00';
    if (hrText) hrText.innerHTML = '<i class="fa-solid fa-heart-pulse"></i> 135 BPM';
    if (paceText) paceText.textContent = 'OPTIMAL';

    Object.values(markers).forEach(m => { if (m) m.classList.remove('active'); });
    if (markers.swim) markers.swim.classList.add('active');

    if (startBtn) {
      startBtn.disabled = false;
      startBtn.innerHTML = '<i class="fa-solid fa-play"></i> START RACE SIMULATION';
    }
  }

  function startSim() {
    if (isSimulating) return;
    resetSim();
    isSimulating = true;
    ensureAudioContext();
    playPowerupSound();

    if (startBtn) {
      startBtn.disabled = true;
      startBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> RACING IN PROGRESS...';
    }

    const duration = 12000; // 12 seconds total race simulation
    const startTime = performance.now();

    simTimer = setInterval(() => {
      seconds += 0.05;
      const mins = Math.floor(seconds / 60);
      const secs = (seconds % 60).toFixed(2);
      if (timerText) timerText.textContent = `${String(mins).padStart(2, '0')}:${secs.padStart(5, '0')}`;
    }, 50);

    function step(now) {
      const elapsed = now - startTime;
      simProgress = Math.min(elapsed / duration, 1);
      const pct = simProgress * 100;

      if (fillBar) fillBar.style.width = `${pct}%`;
      if (racerAvatar) racerAvatar.style.left = `${pct}%`;

      // Update Stages & Emojis
      if (simProgress < 0.25) {
        // Stage 1: Swim
        if (racerEmoji) racerEmoji.textContent = '🏊‍♂️';
        if (stageText) stageText.textContent = 'STAGE 1: 0.2KM SWIM SPRINT';
        if (hrText) hrText.innerHTML = '<i class="fa-solid fa-heart-pulse"></i> 162 BPM';
        if (paceText) paceText.textContent = '44 SPM CADENCE';
        setActiveMarker('swim');
      } else if (simProgress < 0.35) {
        // T1
        if (racerEmoji) racerEmoji.textContent = '⏱️';
        if (stageText) stageText.textContent = 'TRANSITION 1: HELMET ON & BIKE MOUNT';
        if (hrText) hrText.innerHTML = '<i class="fa-solid fa-heart-pulse"></i> 170 BPM';
        if (paceText) paceText.textContent = 'RAPID T1 SWAP';
        setActiveMarker('t1');
      } else if (simProgress < 0.65) {
        // Stage 2: Bike
        if (racerEmoji) racerEmoji.textContent = '🚴‍♂️';
        if (stageText) stageText.textContent = 'STAGE 2: 5KM HIGH-SPEED CYCLING';
        if (hrText) hrText.innerHTML = '<i class="fa-solid fa-heart-pulse"></i> 178 BPM';
        if (paceText) paceText.textContent = '32 KM/H SPEED';
        setActiveMarker('bike');
      } else if (simProgress < 0.75) {
        // T2
        if (racerEmoji) racerEmoji.textContent = '⏱️';
        if (stageText) stageText.textContent = 'TRANSITION 2: RACK BIKE & LACES TIED';
        if (hrText) hrText.innerHTML = '<i class="fa-solid fa-heart-pulse"></i> 174 BPM';
        if (paceText) paceText.textContent = 'QUICK T2 SWAP';
        setActiveMarker('t2');
      } else if (simProgress < 0.98) {
        // Stage 3: Run Sprint
        if (racerEmoji) racerEmoji.textContent = '🏃‍♂️';
        if (stageText) stageText.textContent = 'STAGE 3: 1.5KM FINAL SPRINT TO PODIUM';
        if (hrText) hrText.innerHTML = '<i class="fa-solid fa-heart-pulse"></i> 185 BPM (MAX)';
        if (paceText) paceText.textContent = 'MAX ACCELERATION';
        setActiveMarker('run');
      } else {
        // Finish Line
        if (racerEmoji) racerEmoji.textContent = '🏆';
        if (stageText) stageText.textContent = '🎉 RACE COMPLETE! PODIUM FINISHER!';
        setActiveMarker('finish');
      }

      if (simProgress < 1) {
        requestAnimationFrame(step);
      } else {
        clearInterval(simTimer);
        isSimulating = false;
        playVictoryFanfare();
        triggerConfetti();
        if (startBtn) {
          startBtn.disabled = false;
          startBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> SIMULATE AGAIN';
        }
      }
    }

    function setActiveMarker(activeKey) {
      Object.keys(markers).forEach(k => {
        if (markers[k]) markers[k].classList.toggle('active', k === activeKey);
      });
    }

    requestAnimationFrame(step);
  }

  if (startBtn) startBtn.addEventListener('click', startSim);
  if (resetBtn) resetBtn.addEventListener('click', resetSim);
}

/* ==========================================================================
   12. Shaurya Explorer Quests System & Confetti Engine
   ========================================================================== */
const questsState = {
  theme: false,
  dive: false,
  sushi: false,
  game: false,
  cheer: false
};

function initQuestSystem() {
  const savedQuests = localStorage.getItem('shaurya-quests');
  if (savedQuests) {
    try {
      Object.assign(questsState, JSON.parse(savedQuests));
    } catch (e) {}
  }

  const questHudBtn = document.getElementById('quest-hud-btn');
  const questModal = document.getElementById('quests-modal');
  const closeBtn = document.getElementById('quests-close-btn');
  const vipModal = document.getElementById('vip-modal');
  const vipCloseBtn = document.getElementById('vip-close-btn');
  const claimVipBtn = document.getElementById('claim-vip-btn');

  updateQuestUI();

  if (questHudBtn && questModal) {
    questHudBtn.addEventListener('click', () => {
      questModal.classList.add('active');
    });
  }

  if (closeBtn && questModal) {
    closeBtn.addEventListener('click', () => {
      questModal.classList.remove('active');
    });
  }

  if (claimVipBtn && vipModal) {
    claimVipBtn.addEventListener('click', () => {
      questModal.classList.remove('active');
      vipModal.classList.add('active');
      playVictoryFanfare();
      triggerConfetti();
    });
  }

  if (vipCloseBtn && vipModal) {
    vipCloseBtn.addEventListener('click', () => {
      vipModal.classList.remove('active');
    });
  }
}

function completeQuest(questKey) {
  if (questsState[questKey]) return; // Already completed

  questsState[questKey] = true;
  localStorage.setItem('shaurya-quests', JSON.stringify(questsState));
  playCollectSound();
  updateQuestUI();

  // Check if all completed!
  const completedCount = Object.values(questsState).filter(Boolean).length;
  if (completedCount === 5) {
    playVictoryFanfare();
    triggerConfetti();
  }
}

function updateQuestUI() {
  const completedCount = Object.values(questsState).filter(Boolean).length;
  const navBadge = document.getElementById('nav-quest-count');
  const progressFill = document.getElementById('quests-progress-fill');
  const statusLabel = document.getElementById('quests-status-label');

  if (navBadge) navBadge.textContent = `${completedCount}/5`;
  if (progressFill) progressFill.style.width = `${(completedCount / 5) * 100}%`;
  if (statusLabel) statusLabel.textContent = `${completedCount} of 5 Quests Completed`;

  // Update checkmarks
  Object.keys(questsState).forEach(k => {
    const item = document.getElementById(`quest-item-${k}`);
    if (item) {
      item.classList.toggle('completed', questsState[k]);
    }
  });

  const lockedState = document.getElementById('reward-locked-state');
  const unlockedState = document.getElementById('reward-unlocked-state');

  if (completedCount === 5) {
    if (lockedState) lockedState.classList.add('hidden');
    if (unlockedState) unlockedState.classList.remove('hidden');
  } else {
    if (lockedState) lockedState.classList.remove('hidden');
    if (unlockedState) unlockedState.classList.add('hidden');
  }
}

/* ==========================================================================
   13. Pure JavaScript Confetti Engine
   ========================================================================== */
function triggerConfetti() {
  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.style.position = 'fixed';
  confettiCanvas.style.top = '0';
  confettiCanvas.style.left = '0';
  confettiCanvas.style.width = '100vw';
  confettiCanvas.style.height = '100vh';
  confettiCanvas.style.pointerEvents = 'none';
  confettiCanvas.style.zIndex = '9999999';
  document.body.appendChild(confettiCanvas);

  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const colors = ['#00f0ff', '#f59e0b', '#a855f7', '#10b981', '#ec4899', '#ffffff'];
  const confetti = [];

  for (let i = 0; i < 120; i++) {
    confetti.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.7) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      opacity: 1
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    frame++;

    for (let i = confetti.length - 1; i >= 0; i--) {
      const c = confetti[i];
      c.x += c.vx;
      c.y += c.vy;
      c.vy += 0.35; // gravity
      c.rotation += c.rotSpeed;
      c.opacity -= 0.008;

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate((c.rotation * Math.PI) / 180);
      ctx.fillStyle = c.color;
      ctx.globalAlpha = Math.max(0, c.opacity);
      ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
      ctx.restore();

      if (c.opacity <= 0 || c.y > confettiCanvas.height) {
        confetti.splice(i, 1);
      }
    }

    if (confetti.length > 0) {
      requestAnimationFrame(animate);
    } else {
      confettiCanvas.remove();
    }
  }

  animate();
}

/* ==========================================================================
   14. Theme Toggler (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  const savedTheme = localStorage.getItem('shaurya-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('shaurya-theme', newTheme);
      updateThemeIcon(newTheme);

      // Quest 1 trigger
      completeQuest('theme');
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
  }
}

/* ==========================================================================
   15. Interactive Lightbox Modal
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-image');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!modal || !modalImg) return;

  let currentIndex = 0;
  let galleryItems = [];

  function updateGalleryList() {
    galleryItems = Array.from(document.querySelectorAll('.clickable-gallery-item:not([style*="display: none"])'));
  }

  function openLightbox(index) {
    updateGalleryList();
    if (galleryItems.length === 0) return;

    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentIndex];
    const imgSrc = item.getAttribute('data-full-src') || item.querySelector('img')?.src;
    const caption = item.getAttribute('data-caption') || item.querySelector('.gallery-item-title')?.textContent || 'Shaurya Portfolio';

    if (imgSrc) {
      modalImg.src = imgSrc;
      modalCaption.textContent = caption;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      playClickSound();
    }
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const galleryCard = e.target.closest('.clickable-gallery-item');
    if (galleryCard) {
      updateGalleryList();
      const itemIndex = galleryItems.indexOf(galleryCard);
      if (itemIndex !== -1) {
        openLightbox(itemIndex);
      }
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', () => openLightbox(currentIndex + 1));
  if (prevBtn) prevBtn.addEventListener('click', () => openLightbox(currentIndex - 1));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
    if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
  });
}

/* ==========================================================================
   16. Gallery Filters
   ========================================================================== */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item-wrapper');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterCategory === 'all' || itemCategory === filterCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   17. Future Media Hub Live Tester
   ========================================================================== */
function initMediaHubTester() {
  const previewForm = document.getElementById('media-tester-form');
  const mediaFileInput = document.getElementById('media-file-input');
  const mediaUrlInput = document.getElementById('media-url-input');
  const mediaTitleInput = document.getElementById('media-title-input');
  const mediaCategoryInput = document.getElementById('media-category-select');
  const previewDisplay = document.getElementById('live-preview-display');
  const codeSnippetOutput = document.getElementById('code-snippet-output');
  const copyCodeBtn = document.getElementById('copy-code-btn');

  if (!previewForm) return;

  function updateLivePreview(src, title, category) {
    if (!src) return;
    previewDisplay.innerHTML = `
      <div class="gallery-item clickable-gallery-item" data-full-src="${src}" data-caption="${title}" style="margin: 0 auto; max-width: 320px; aspect-ratio: 4/3;">
        <img src="${src}" alt="${title}" class="gallery-img" style="width: 100%; height: 100%; object-fit: cover;">
        <div class="gallery-overlay" style="opacity: 1;">
          <h3 class="gallery-item-title">${title}</h3>
          <span class="gallery-item-tag">🏷️ ${category.toUpperCase()} (Preview)</span>
        </div>
      </div>
      <p style="text-align: center; margin-top: 0.5rem; font-size: 0.85rem; color: var(--accent-cyan);">
        ✨ Looking good! Click it to test the Lightbox viewer.
      </p>
    `;

    const htmlCode = `<!-- New Gallery Item -->\n<div class="gallery-item-wrapper" data-category="${category}">\n  <div class="gallery-item clickable-gallery-item" data-full-src="${src}" data-caption="${title}">\n    <img src="${src}" alt="${title}" class="gallery-img" loading="lazy">\n    <div class="gallery-overlay">\n      <h3 class="gallery-item-title">${title}</h3>\n      <span class="gallery-item-tag">${category.toUpperCase()}</span>\n    </div>\n  </div>\n</div>`;

    if (codeSnippetOutput) {
      codeSnippetOutput.textContent = htmlCode;
    }
  }

  if (mediaUrlInput) {
    mediaUrlInput.addEventListener('input', () => {
      const url = mediaUrlInput.value.trim();
      const title = mediaTitleInput?.value.trim() || 'New Memory';
      const category = mediaCategoryInput?.value || 'sports';
      if (url) updateLivePreview(url, title, category);
    });
  }

  if (mediaFileInput) {
    mediaFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const title = mediaTitleInput?.value.trim() || file.name.replace(/\.[^/.]+$/, "");
          const category = mediaCategoryInput?.value || 'sports';
          updateLivePreview(event.target.result, title, category);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (copyCodeBtn && codeSnippetOutput) {
    copyCodeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeSnippetOutput.textContent).then(() => {
        const originalText = copyCodeBtn.innerHTML;
        copyCodeBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        playCollectSound();
        setTimeout(() => { copyCodeBtn.innerHTML = originalText; }, 2000);
      });
    });
  }
}

/* ==========================================================================
   18. Cheer Shaurya Guestbook
   ========================================================================== */
function initGuestbook() {
  const form = document.getElementById('guestbook-form');
  const nameInput = document.getElementById('guest-name');
  const msgInput = document.getElementById('guest-message');
  const messagesStream = document.getElementById('messages-stream');

  const defaultMessages = [
    { name: "Mom & Dad", text: "We are so proud of your triathlon victories and hard work in grade 5, Shaurya!", time: "Recently" },
    { name: "Sam (Brother)", text: "Shaurya is the fastest runner and my best big brother!", time: "Recently" },
    { name: "Coach & Friends", text: "Keep training hard for the next aquathlon, champion!", time: "Recently" }
  ];

  function loadMessages() {
    const saved = localStorage.getItem('shaurya-guestbook-messages');
    let messages = saved ? JSON.parse(saved) : defaultMessages;
    renderMessages(messages);
  }

  function renderMessages(messages) {
    if (!messagesStream) return;
    messagesStream.innerHTML = '';
    messages.slice().reverse().forEach(m => {
      const card = document.createElement('div');
      card.className = 'message-item';
      card.innerHTML = `
        <div class="message-header">
          <span class="message-sender"><i class="fa-solid fa-user-circle"></i> ${escapeHtml(m.name)}</span>
          <span class="message-time">${escapeHtml(m.time)}</span>
        </div>
        <div class="message-body">${escapeHtml(m.text)}</div>
      `;
      messagesStream.appendChild(card);
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput.value.trim() || 'A Friend';
      const text = msgInput.value.trim();
      if (!text) return;

      const saved = localStorage.getItem('shaurya-guestbook-messages');
      const messages = saved ? JSON.parse(saved) : defaultMessages;

      messages.push({
        name: name,
        text: text,
        time: 'Just now'
      });

      localStorage.setItem('shaurya-guestbook-messages', JSON.stringify(messages));
      renderMessages(messages);

      nameInput.value = '';
      msgInput.value = '';

      playCollectSound();
      triggerConfetti();
      completeQuest('cheer');

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const origText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Cheer Posted!';
        setTimeout(() => { submitBtn.innerHTML = origText; }, 2000);
      }
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  loadMessages();
}

/* ==========================================================================
   19. Navigation & Header Scroll Behavior
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }
}
