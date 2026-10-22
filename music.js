/* =====================================================================
   BACKGROUND SONG — included on every page.
   Plays song.mp3 (default 40% volume) while the visitor is on this site,
   carries on from the same point when moving between pages, and pauses
   whenever the site is not on screen (e.g. the booking site opened in
   another tab). Browsers only allow sound after the first tap, so the
   song starts on the first tap / key press if autoplay is blocked.
   A floating 🔊 button below the nav bar opens a volume slider; the
   chosen volume is remembered.
   ===================================================================== */
(function () {
  const SRC = "song.mp3";
  const DEFAULT_VOLUME = 40;            // percent
  const POS_KEY = "melaSongPos";
  const VOL_KEY = "melaSongVolume";

  const get = (store, k) => { try { return window[store].getItem(k); } catch (e) { return null; } };
  const set = (store, k, v) => { try { window[store].setItem(k, v); } catch (e) {} };

  const saved = parseInt(get("localStorage", VOL_KEY), 10);
  let volume = saved >= 0 && saved <= 100 ? saved : DEFAULT_VOLUME;

  const audio = new Audio(SRC);
  audio.loop = true;
  audio.preload = "auto";
  // Start from 0 on a fresh visit or reload; only carry on when moving between this site's pages.
  const nav = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || {};
  let fromSite = false;
  try { fromSite = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch (e) {}
  const resume = nav.type === "back_forward" || (fromSite && nav.type !== "reload");
  const pos = resume ? parseFloat(get("sessionStorage", POS_KEY)) : 0;
  if (pos > 0) audio.addEventListener("loadedmetadata", () => { audio.currentTime = pos % (audio.duration || Infinity); }, { once: true });

  // iPhones ignore audio.volume, so the sound goes through a gain node once audio is unlocked.
  let ctx = null, gain = null;
  const useGain = () => {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      ctx = new AC();
      gain = ctx.createGain();
      ctx.createMediaElementSource(audio).connect(gain).connect(ctx.destination);
    } catch (e) { ctx = gain = null; }
    applyVolume();
  };
  const applyVolume = () => {
    if (gain) { gain.gain.value = volume / 100; audio.volume = 1; }
    else audio.volume = volume / 100;
  };
  applyVolume();

  const play = () => {
    if (!volume || document.hidden) return;
    if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
    audio.play().catch(() => {});
  };

  // ---------- Floating volume control ----------
  const style = document.createElement("style");
  style.textContent = `
    .song { position: fixed; right: 12px; top: 72px; z-index: 30; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
    .song-btn { width: 44px; height: 44px; border-radius: 5px; cursor: pointer; padding: 0;
      display: flex; align-items: center; justify-content: center; color: var(--navy, #0b3a6b);
      background: transparent; border: 2px solid var(--navy, #0b3a6b); }
    .song-btn svg { width: 24px; height: 24px; }
    .song-panel { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 14px;
      background: #fff; border: 1px solid var(--line, #dfe3e8); box-shadow: 0 6px 18px rgba(11,58,107,.2); }
    .song-panel[hidden] { display: none; }
    .song-panel button { width: 34px; height: 34px; flex-shrink: 0; border-radius: 50%; border: 0; cursor: pointer;
      font: inherit; font-size: 20px; font-weight: 700; line-height: 1; padding: 0;
      background: var(--teal-soft, #e2f3f3); color: var(--teal, #0f7c80); }
    .song-panel input { width: 120px; accent-color: var(--teal, #0f7c80); }
    .song-panel output { width: 3.2em; text-align: right; font-size: 14px; font-weight: 700; color: var(--navy, #0b3a6b); }`;
  document.head.appendChild(style);

  const box = document.createElement("div");
  box.className = "song";
  box.innerHTML = `<button class="song-btn" type="button" aria-label="Song volume" aria-expanded="false"></button>
    <div class="song-panel" hidden>
      <button type="button" data-step="-10" aria-label="Volume down">−</button>
      <input type="range" min="0" max="100" step="5" aria-label="Volume">
      <button type="button" data-step="10" aria-label="Volume up">+</button>
      <output></output>
    </div>`;
  document.body.appendChild(box);
  const btn = box.querySelector(".song-btn");
  const panel = box.querySelector(".song-panel");
  const slider = panel.querySelector("input");
  const out = panel.querySelector("output");

  // Speaker icon: muted (×), low (one wave) or high (two waves).
  const icon = (v) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor"/>${
      v === 0 ? '<path d="m16 9 6 6M22 9l-6 6"/>'
      : '<path d="M15.5 8.5a5 5 0 0 1 0 7"/>' + (v >= 50 ? '<path d="M18.5 5.5a9 9 0 0 1 0 13"/>' : "")}</svg>`;

  const show = () => {
    btn.innerHTML = icon(volume);
    slider.value = volume;
    out.textContent = `${volume}%`;
  };
  const setVolume = (v) => {
    volume = Math.max(0, Math.min(100, Math.round(v)));
    set("localStorage", VOL_KEY, String(volume));
    applyVolume();
    show();
    if (volume) play(); else audio.pause();
  };
  show();

  btn.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    btn.setAttribute("aria-expanded", String(!panel.hidden));
  });
  slider.addEventListener("input", () => setVolume(Number(slider.value)));
  panel.addEventListener("click", (e) => {
    const b = e.target.closest("[data-step]");
    if (b) setVolume(volume + Number(b.dataset.step));
  });
  document.addEventListener("click", (e) => { if (!box.contains(e.target)) { panel.hidden = true; btn.setAttribute("aria-expanded", "false"); } });

  // Float just below the sticky nav bar.
  const header = document.querySelector("header");
  const place = () => { box.style.top = `${(header ? header.offsetHeight : 0) + 10}px`; };
  place();
  window.addEventListener("resize", place);
  if (header && window.ResizeObserver) new ResizeObserver(place).observe(header);

  // ---------- Playback ----------
  // Autoplay is usually blocked until the first interaction. Phones only count a
  // finished tap (touchend / click), not touchstart, so keep trying on every tap
  // until the song is really playing.
  const UNLOCK_EVENTS = ["click", "touchend", "pointerup", "keydown"];
  const unlock = () => {
    useGain();
    play();
    if (!audio.paused && (!ctx || ctx.state === "running"))
      UNLOCK_EVENTS.forEach((ev) => document.removeEventListener(ev, unlock, true));
  };
  UNLOCK_EVENTS.forEach((ev) => document.addEventListener(ev, unlock, true));
  play();

  // Pause when the site is not visible (other tab / app); resume on return.
  document.addEventListener("visibilitychange", () => { if (document.hidden) audio.pause(); else play(); });

  // Remember the position so the next page continues the song.
  const save = () => set("sessionStorage", POS_KEY, String(audio.currentTime || 0));
  window.addEventListener("pagehide", () => { save(); audio.pause(); });
  setInterval(save, 2000);
})();
