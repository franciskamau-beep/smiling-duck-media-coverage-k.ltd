/* script.js
   Behavior:
   - Draw duck logo on canvas
   - Set cookie for 1 year
   - Show greeting (Hello client) using a JavaScript function labelled 'greetings' (user requested "on java" — implemented in JS)
   - Demonstrate local variable scope.
   - Auto-reload fallback after 60 seconds
   - Gallery: after fly-in animation, images colorize (B&W -> color)
*/

document.addEventListener('DOMContentLoaded', () => {
  insertYears();
  drawDuckOnAllCanvases();
  setOneYearCookie('sdm_visitor', 'true', 365);
  updateCookieStatus();

  // greeting button
  const greetBtn = document.getElementById('greetBtn');
  if (greetBtn) {
    greetBtn.addEventListener('click', () => {
      greetings(); // call the greeting function
    });
  }

  // Booking handling
  window.handleBooking = function (ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const msg = `Thanks ${data.get('name')}. Your request for ${data.get('service')} in ${data.get('town')} has been received. We will contact ${data.get('email')}.`;
    document.getElementById('bookingMsg').textContent = msg;
    form.reset();
  };

  // Auto refresh via JS fallback every 60s
  setTimeout(() => {
    // reload the page to ensure "refresh after every 60 seconds" requirement
    location.reload();
  }, 60000);

  // Gallery colorization sequence:
  const flyImgs = document.querySelectorAll('.gallery img.fly');
  flyImgs.forEach(img => {
    // when the CSS animation ends, add 'colorize' class after a short delay to mimic PowerPoint effect
    img.addEventListener('animationend', () => {
      setTimeout(() => img.classList.add('colorize'), 400); // slight pause then colorize
    });
  });
});

/* Draw a simple smiling duck on any canvas with id starting 'duckLogo' */
function drawDuckOnAllCanvases() {
  const canvases = document.querySelectorAll('canvas[id^="duckLogo"]');
  canvases.forEach(drawDuck);
}

function drawDuck(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const centerX = w / 2;
  const centerY = h / 2;

  // clear
  ctx.clearRect(0, 0, w, h);

  // background circle
  ctx.beginPath();
  ctx.fillStyle = '#FFEB3B';
  ctx.arc(centerX, centerY, Math.min(w, h) / 2 - 6, 0, Math.PI * 2);
  ctx.fill();

  // beak
  ctx.beginPath();
  ctx.fillStyle = '#FF8A00';
  ctx.moveTo(centerX - 8, centerY + 6);
  ctx.quadraticCurveTo(centerX + 18, centerY + 6, centerX + 16, centerY + 16);
  ctx.quadraticCurveTo(centerX - 2, centerY + 12, centerX - 8, centerY + 6);
  ctx.fill();

  // eyes
  ctx.beginPath();
  ctx.fillStyle = '#222';
  ctx.arc(centerX - 18, centerY - 6, 6, 0, Math.PI * 2);
  ctx.arc(centerX + 6, centerY - 6, 6, 0, Math.PI * 2);
  ctx.fill();

  // smile
  ctx.beginPath();
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 2;
  ctx.arc(centerX - 6, centerY + 2, 10, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.stroke();

  // subtle shine
  ctx.beginPath();
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.arc(centerX - 30, centerY - 20, 6, 0, Math.PI * 2);
  ctx.fill();
}

/* Cookie utility (set for days) */
function setOneYearCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
}

/* read cookie */
function getCookie(name) {
  const cookieArr = document.cookie.split(';').map(c => c.trim());
  for (const c of cookieArr) {
    if (c.startsWith(name + '=')) return c.substring(name.length + 1);
  }
  return null;
}

function updateCookieStatus() {
  const el = document.getElementById('cookieStatus');
  if (!el) return;
  const has = getCookie('sdm_visitor');
  if (has) {
    el.textContent = 'Welcome back! Cookie set for 1 year.';
  } else {
    el.textContent = 'A cookie will be set for your visits (1 year).';
  }
}

/* greetings function (user asked for "on java we have greetings(hello client),and a variable scope for local".
   Implemented in JavaScript: demonstrates local scope through a local variable inside the function. */
function greetings() {
  // local variable scope example:
  let localMessage = 'Hello client';
  // Show to user and in console
  alert(localMessage + '! Welcome to Smiling Duck Media Coverage.');
  console.log('greetings() local scope variable:', localMessage);
}

/* Helper to insert current years in footers */
function insertYears() {
  const y = new Date().getFullYear();
  ['year','year2','year3','year4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = y;
  });
}
