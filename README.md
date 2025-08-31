# ChatUI – Bootstrap 5 HTML + SCSS Chat Demo

A responsive chat UI built with **Bootstrap 5.3**, featuring:
- Light / Dark theme via `data-bs-theme` (single-attribute switch)
- **RTL/LTR** support via the `dir` attribute (and runtime toggle)
- One-to-one chat, Group chat
- Contacts & Online users
- Send files (front-end demo)
- Read/unread indicator (double-check icons)
- Voice & Video Call **modals**
- Authentication pages (Login / Register / Forgot)
- Demo users and demo messages (front-end only)

> This is a static front-end. There is **no backend** or WebSocket here—ideal for templating or integrating into your stack.

## Quick Start

Open `index.html` in your browser.

- Use the navbar buttons to switch **Light/Dark/Auto** theme and toggle **RTL/LTR**.  
- Your choices are saved in `localStorage`.

## How it works

- **Theme switching**: We rely on Bootstrap 5.3's `data-bs-theme` attribute on `<html>`.  
  - `light` → `data-bs-theme="light"`  
  - `dark`  → `data-bs-theme="dark"`  
  - `auto`  → resolved from `prefers-color-scheme`

- **Direction (RTL/LTR)**: We toggle the `<html dir="rtl">` attribute and enable the **Bootstrap RTL** stylesheet while disabling the LTR one (both linked in the `<head>`).

- **Single change**: You can switch modes **instantly** by changing the attributes on `<html>`:
  ```html
  <html data-bs-theme="dark" dir="rtl">
  ```
  Or via the top-right buttons (persisted).

- **Demo data** lives in `assets/js/demo-data.js` and is rendered by `assets/js/app.js`.

## Files

```
assets/
  css/
    style.css          # compiled styles (hand-authored)
  scss/
    _variables.scss
    style.scss         # SCSS source (optional)
  js/
    mode.js            # theme + RTL toggles, persistence
    demo-data.js       # demo users/groups/messages
    app.js             # UI rendering & behaviors
  images/
    avatars/*.svg      # local vector avatars
index.html             # direct chat
group.html             # group chat
contacts.html          # contacts + online users
calls.html             # call launcher + modals
settings.html          # appearance toggles + about
auth-login.html
auth-register.html
auth-forgot.html
```

## Notes

- **Read/unread**: Incoming messages render a “New messages” separator once, and unseen messages flip to “read” after rendering. Outgoing messages show double-check marks (`bi-check2-all`) in blue when marked as read.
- **File sending**: For demo only—selecting files appends a message with the filenames.
- **SCSS**: Provided for customization. You can compile it with your SASS toolchain.
- **Icons**: Bootstrap Icons via CDN.

## Customize

- Add users or messages in `demo-data.js`.
- Adjust bubble colors / radius in `assets/scss/_variables.scss` and recompile to `assets/css/style.css` for production.
- Replace avatars with your own (PNG/JPG/SVG).

## License

This demo is MIT-licensed; feel free to use and adapt.