// demo-data.js - demo users and messages
window.DEMO_USERS = [
  {
    "id": "u1",
    "name": "Alex Morgan",
    "initials": "AM",
    "bg": "#0d6efd",
    "status": "online"
  },
  {
    "id": "u2",
    "name": "Bella Chan",
    "initials": "BC",
    "bg": "#198754",
    "status": "online"
  },
  {
    "id": "u3",
    "name": "Carlos Díaz",
    "initials": "CD",
    "bg": "#fd7e14",
    "status": "idle"
  },
  {
    "id": "u4",
    "name": "Dana Novak",
    "initials": "DN",
    "bg": "#6f42c1",
    "status": "offline"
  },
  {
    "id": "u5",
    "name": "Eli Roth",
    "initials": "ER",
    "bg": "#20c997",
    "status": "online"
  },
  {
    "id": "u6",
    "name": "Fara N.",
    "initials": "FN",
    "bg": "#dc3545",
    "status": "offline"
  },
  {
    "id": "u7",
    "name": "Gábor Tóth",
    "initials": "GT",
    "bg": "#0dcaf0",
    "status": "online"
  },
  {
    "id": "u8",
    "name": "Hanna Kovács",
    "initials": "HK",
    "bg": "#6610f2",
    "status": "idle"
  }
];

window.DEMO_GROUPS = [
  { id:'g1', name:'Project X', members:['u1','u2','u3','u7'], avatar:'🛠️' },
  { id:'g2', name:'Family', members:['u2','u5','u8'], avatar:'👨‍👩‍👧' }
];

window.DEMO_MESSAGES = [
  // one-to-one between u1 (me) and u2
  { id:'m1', from:'u2', to:'u1', text:'Hey Alex! Ready for today\'s demo?', ts:'2025-08-31T09:14:00Z', read:true },
  { id:'m2', from:'u1', to:'u2', text:'Absolutely. Pushing the latest build now.', ts:'2025-08-31T09:15:10Z', read:true },
  { id:'m3', from:'u2', to:'u1', text:'Nice! Can you also add RTL support?', ts:'2025-08-31T09:16:00Z', read:false },

  // group chat g1
  { id:'m4', from:'u3', group:'g1', text:'Morning team! Standup in 10.', ts:'2025-08-31T07:55:00Z' },
  { id:'m5', from:'u7', group:'g1', text:'I\'m on the call UI today.', ts:'2025-08-31T08:02:00Z' },
  { id:'m6', from:'u1', group:'g1', text:'Perfect, I\'ll handle authentication pages.', ts:'2025-08-31T08:05:00Z' },

  // one-to-one u1 and u5
  { id:'m7', from:'u5', to:'u1', text:'Lunch later?', ts:'2025-08-31T10:20:00Z', read:false }
];