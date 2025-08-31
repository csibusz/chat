// app.js - render contacts, chat, send messages, read/unread, file attach, simple state
(function(){
  const state = {
    me: 'u1',
    activeUser: 'u2',   // default open chat
    activeGroup: null
  };

  function fmtTime(iso){
    const d = new Date(iso);
    return d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  }

  function userById(id){ return window.DEMO_USERS.find(u => u.id === id); }
  function groupById(id){ return window.DEMO_GROUPS.find(g => g.id === id); }

  function renderContacts(){
    const wrap = document.getElementById('contactList');
    if(!wrap) return;
    wrap.innerHTML = '';
    window.DEMO_USERS.filter(u => u.id !== state.me).forEach(u => {
      const lastMsg = window.DEMO_MESSAGES.filter(m => (m.to===state.me && m.from===u.id) || (m.to===u.id && m.from===state.me)).slice(-1)[0];
      const unread = window.DEMO_MESSAGES.some(m => m.from===u.id && m.to===state.me && !m.read);
      const li = document.createElement('div');
      li.className = 'chat-contact';
      li.innerHTML = `
        <div class="avatar">
          <img src="assets/images/avatars/${u.id}.svg" width="48" height="48" alt="${u.name}">
          <span class="status-dot status-${u.status}"></span>
        </div>
        <div class="min-w-0">
          <div class="fw-semibold text-truncate">${u.name}</div>
          <div class="small text-truncate text-secondary">${lastMsg ? lastMsg.text : 'No messages yet'}</div>
        </div>
        <div class="text-end">
          ${unread ? '<span class="badge text-bg-primary rounded-pill">New</span>' : ''}
        </div>`;
      li.addEventListener('click', () => {
        state.activeUser = u.id;
        state.activeGroup = null;
        renderHeader();
        renderMessages();
      });
      wrap.appendChild(li);
    });
  }

  function renderGroups(){
    const wrap = document.getElementById('groupList');
    if(!wrap) return;
    wrap.innerHTML = '';
    window.DEMO_GROUPS.forEach(g => {
      const last = window.DEMO_MESSAGES.filter(m => m.group===g.id).slice(-1)[0];
      const li = document.createElement('div');
      li.className = 'chat-contact';
      li.innerHTML = `
        <div class="avatar d-flex align-items-center justify-content-center fs-4">${g.avatar}</div>
        <div class="min-w-0">
          <div class="fw-semibold text-truncate">${g.name}</div>
          <div class="small text-truncate text-secondary">${last ? (userById(last.from).name.split(' ')[0] + ': ' + last.text) : 'No messages yet'}</div>
        </div>
        <div class="text-end"></div>`;
      li.addEventListener('click', () => {
        state.activeGroup = g.id;
        state.activeUser = null;
        renderHeader();
        renderMessages();
      });
      wrap.appendChild(li);
    });
  }

  function renderHeader(){
    const titleEl = document.getElementById('chatTitle');
    const subEl = document.getElementById('chatSubtitle');
    if(!titleEl) return;
    if(state.activeUser){
      const u = userById(state.activeUser);
      titleEl.textContent = u.name;
      subEl.textContent = (u.status === 'online' ? 'Online' : (u.status === 'idle' ? 'Idle' : 'Offline'));
    } else if(state.activeGroup){
      const g = groupById(state.activeGroup);
      titleEl.textContent = g.name;
      subEl.textContent = `${g.members.length} members`;
    } else {
      titleEl.textContent = 'Select a chat';
      subEl.textContent = '';
    }
  }

  function renderMessages(){
    const box = document.getElementById('messageList');
    if(!box) return;
    box.innerHTML = '';
    const msgs = window.DEMO_MESSAGES.filter(m => {
      if(state.activeUser){
        return (m.to===state.me && m.from===state.activeUser) || (m.to===state.activeUser && m.from===state.me);
      } else if(state.activeGroup){
        return m.group === state.activeGroup;
      }
      return false;
    });

    let insertedUnreadSep = false;
    msgs.forEach(m => {
      const isOut = m.from === state.me;
      const msgEl = document.createElement('div');
      msgEl.className = 'msg ' + (isOut ? 'msg-out' : 'msg-in');
      msgEl.innerHTML = `
        <div class="content">${m.text}</div>
        <div class="meta mt-1 d-flex align-items-center gap-2 ${isOut ? 'justify-content-end' : ''}">
          <span class="time">${fmtTime(m.ts)}</span>
          ${isOut ? `<span class="checks ${m.read ? 'text-primary' : 'text-secondary'}"><i class="bi ${m.read ? 'bi-check2-all' : 'bi-check2'}"></i></span>` : ''}
        </div>`;
      // Insert unread separator once for the first unread incoming message
      if(!isOut && !m.read && !insertedUnreadSep){
        const sep = document.createElement('div');
        sep.className = 'unread-sep';
        sep.innerHTML = '<span>New messages</span>';
        box.appendChild(sep);
        insertedUnreadSep = true;
      }
      box.appendChild(msgEl);
    });

    // mark visible incoming as read
    msgs.forEach(m => {
      if(m.to === state.me && !m.read){
        m.read = true;
      }
    });

    box.scrollTop = box.scrollHeight;
  }

  function bindComposer(){
    const input = document.getElementById('msgInput');
    const sendBtn = document.getElementById('sendBtn');
    const fileInput = document.getElementById('fileInput');
    const attachBtn = document.getElementById('attachBtn');

    if(!input || !sendBtn) return;

    function send(){
      const text = input.value.trim();
      if(!text) return;
      const targetUser = state.activeUser;
      const targetGroup = state.activeGroup;
      const msg = {
        id: 'm' + (window.DEMO_MESSAGES.length + 1),
        from: state.me,
        ts: new Date().toISOString(),
        text
      };
      if(targetUser){
        msg.to = targetUser;
      } else if(targetGroup){
        msg.group = targetGroup;
      } else return;

      window.DEMO_MESSAGES.push(msg);
      input.value='';
      renderMessages();
    }

    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' && !e.shiftKey){
        e.preventDefault();
        send();
      }
    });
    sendBtn.addEventListener('click', send);

    attachBtn?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', () => {
      const files = Array.from(fileInput.files || []);
      if(files.length){
        const names = files.map(f => f.name).join(', ');
        const msgText = `📎 Sent file(s): ${names}`;
        const targetUser = state.activeUser;
        const targetGroup = state.activeGroup;
        const msg = {
          id: 'm' + (window.DEMO_MESSAGES.length + 1),
          from: state.me,
          ts: new Date().toISOString(),
          text: msgText
        };
        if(targetUser){ msg.to = targetUser; } else if(targetGroup){ msg.group = targetGroup; } else { return; }
        window.DEMO_MESSAGES.push(msg);
        renderMessages();
        fileInput.value = '';
      }
    });
  }

  function init(){
    renderContacts();
    renderGroups();
    renderHeader();
    renderMessages();
    bindComposer();
  }

  document.addEventListener('DOMContentLoaded', init);
})();