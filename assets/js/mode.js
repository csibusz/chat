// mode.js - light/dark + RTL switching with a single attribute change
(function(){
  const DOC = document.documentElement;
  const THEME_KEY = 'chatui_theme';
  const DIR_KEY = 'chatui_dir';
  const RTL_LINK_ID = 'bootstrap-rtl';
  const LTR_LINK_ID = 'bootstrap-ltr';

  function applyTheme(theme){
    // theme: 'light' | 'dark' | 'auto'
    if(theme === 'auto'){
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      DOC.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');
    } else {
      DOC.setAttribute('data-bs-theme', theme);
    }
  }

  function applyDir(dir){
    DOC.setAttribute('dir', dir);
    // Toggle Bootstrap LTR/RTL stylesheets if both are present
    const ltr = document.getElementById(LTR_LINK_ID);
    const rtl = document.getElementById(RTL_LINK_ID);
    if(ltr && rtl){
      if(dir === 'rtl'){
        ltr.disabled = true;
        rtl.disabled = false;
      } else {
        ltr.disabled = false;
        rtl.disabled = true;
      }
    }
  }

  function init(){
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    const savedDir = localStorage.getItem(DIR_KEY) || 'ltr';
    applyTheme(savedTheme);
    applyDir(savedDir);

    // Wire quick toggles if present
    document.querySelectorAll('[data-toggle-theme]').forEach(btn => {
      btn.addEventListener('click', () => {
        const next = btn.getAttribute('data-toggle-theme');
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    });
    document.querySelectorAll('[data-toggle-dir]').forEach(btn => {
      btn.addEventListener('click', () => {
        const next = (document.documentElement.getAttribute('dir') === 'ltr') ? 'rtl' : 'ltr';
        localStorage.setItem(DIR_KEY, next);
        applyDir(next);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
  window.ChatUIMode = { applyTheme, applyDir };
})();