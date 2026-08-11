/* Viva Lifestyle — shared prototype data + helpers.
   PROTOTYPE ONLY. All data below is fabricated and lives in the browser.
   Nothing is sent anywhere, nothing is stored server-side. */

(function (root) {
  'use strict';

  /* ---------- deterministic PRNG so the demo looks the same every load ---------- */
  var seed = 20260809;
  function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
  function pick(a) { return a[Math.floor(rnd() * a.length)]; }
  function int(lo, hi) { return lo + Math.floor(rnd() * (hi - lo + 1)); }

  /* ---------- reference data ---------- */
  var TIERS = {
    associate: { key:'associate', en:'Associate',       zh:'準會員',  rank:1, admit:'By introduction' },
    onyx:      { key:'onyx',      en:'Onyx',            zh:'黑玉',    rank:2, admit:'By nomination'   },
    obsidian:  { key:'obsidian',  en:'Obsidian',        zh:'黑曜',    rank:3, admit:'By nomination'   },
    meteorite: { key:'meteorite', en:'Meteorite',       zh:'隕鐵',    rank:4, admit:'By nomination'   },
    carbonado: { key:'carbonado', en:'Carbonado',       zh:'黑金剛石', rank:5, admit:'By invitation'   }
  };
  var TIER_KEYS = ['associate','onyx','obsidian','meteorite','carbonado'];

  /* Benefits are deliberately withholding: what a member receives is named,
     what it amounts to is not. Order matters — it is the order shown on the card. */
  var PERKS = {
    associate: [
      { en:['The calendar','Circulated to members. Nothing is posted publicly.'],
        zh:['日程','僅向會員發放，不作公開張貼。'] },
      { en:['The rooms','You will be told where, and when.'],
        zh:['場所','屆時自會告知地點與時間。'] },
      { en:['The channels','One for your district. One for your sport.'],
        zh:['群組','按地區一個，按運動一個。'] },
      { en:['Nothing is asked of you','Come once. Come fifty times. Both are acceptable.'],
        zh:['無所要求','來一次，或來五十次，皆可。'] }
    ],
    obsidian: [
      { en:['Forty-eight hours','You see the season before it opens.'],
        zh:['四十八小時','你在日程開放之前先看見它。'] },
      { en:['The mark','Kit that is not sold.'],
        zh:['標記','不對外售賣的裝備。'] },
      { en:['Two seats','At a table of twelve. Twice a year.'],
        zh:['兩個席位','十二人一席，每年兩次。'] },
      { en:['Doors already open','Certain partners recognise the card.'],
        zh:['已開的門','若干合作夥伴認得此卡。'] },
      { en:['One guest','Four times a year. Choose carefully.'],
        zh:['一位客人','每年四次。請慎選。'] }
    ],
    carbonado: [
      { en:['Twelve names','You will be given them, and expected to use them.'],
        zh:['十二個名字','我們會交給你，並期望你用得上。'] },
      { en:['A mentor','Assigned within two weeks. Not chosen by you.'],
        zh:['一位導師','兩星期內配對，並非由你挑選。'] },
      { en:['The room before the room','Rehearsal, before every demo day.'],
        zh:['正式場合之前','每次 demo day 前的預演。'] },
      { en:['A desk','Somewhere. It changes.'],
        zh:['一張桌','在某處。位置會變。'] },
      { en:['The stage in December','Six hundred people. Eight minutes.'],
        zh:['十二月的舞台','六百人。八分鐘。'] }
    ]
  };

  var DISTRICTS = ['Central & Western','Wan Chai','Eastern','Southern','Yau Tsim Mong','Sham Shui Po',
    'Kowloon City','Wong Tai Sin','Kwun Tong','Kwai Tsing','Tsuen Wan','Tuen Mun','Yuen Long',
    'North','Tai Po','Sha Tin','Sai Kung','Islands'];

  var SPORTS = ['Running','Basketball','Football','Hiking','Pickleball','Dragon boat','Kayaking','Climbing','Badminton','Volleyball'];

  var SURNAMES = ['Chan','Wong','Lee','Cheung','Lam','Ng','Ho','Chow','Tsang','Yeung','Lau','Kwok','Leung','Ma','Tam','Chu','Yip','Fung','Siu','To'];
  var GIVEN = ['Ka-yan','Ho-yin','Wing-sze','Chun-hei','Sze-wai','Man-kit','Yuet-ming','Tsz-ching','Ka-ho','Wai-lam',
    'Hoi-ching','Cheuk-hei','Pui-yu','Ho-nam','Sum-yu','Kwan-to','Yan-ki','Chi-fai','Lok-yiu','Ching-man',
    'Nicole','Marcus','Ivy','Jason','Priya','Daniel','Aisha','Ryan','Chloe','Ethan'];

  var EVENTS = [
    { id:'EV-241', name:'Harbour Night Run',        date:'2026-08-23', venue:'Central Harbourfront', cap:120, price:0,   tier:'open'   },
    { id:'EV-242', name:'Rooftop Pickleball Social',date:'2026-09-07', venue:'Kwun Tong',            cap:36,  price:120, tier:'open'   },
    { id:'EV-243', name:"Founders' Table",          date:'2026-09-19', venue:'Science Park',         cap:12,  price:0,   tier:'obsidian' },
    { id:'EV-244', name:'Sunrise Trail & Breakfast',date:'2026-10-11', venue:'Sai Kung',             cap:60,  price:80,  tier:'open'   },
    { id:'EV-245', name:'First Job, Real Talk',     date:'2026-10-30', venue:'Sheung Wan',           cap:80,  price:0,   tier:'open'   },
    { id:'EV-246', name:'The Viva Gala',            date:'2026-12-06', venue:'TBC',                  cap:600, price:680, tier:'open'   }
  ];

  /* ---------- member generation ---------- */
  function pad(n, w) { return String(n).padStart(w, '0'); }
  function isoDate(y, m, d) { return y + '-' + pad(m, 2) + '-' + pad(d, 2); }

  var MEMBERS = (function () {
    var out = [], n = 64;
    for (var i = 0; i < n; i++) {
      var tierRoll = rnd();
      var tier = tierRoll < 0.46 ? 'associate' : tierRoll < 0.71 ? 'onyx'
               : tierRoll < 0.88 ? 'obsidian' : tierRoll < 0.97 ? 'meteorite' : 'carbonado';
      var joinY = rnd() < 0.34 ? 2024 : (rnd() < 0.5 ? 2025 : 2026);
      var joinM = int(1, joinY === 2026 ? 8 : 12);
      /* today in the demo is 9 Aug 2026 — never generate a join date in the future */
      var joinD = (joinY === 2026 && joinM === 8) ? int(1, 9) : int(1, 28);
      var joined = isoDate(joinY, joinM, joinD);
      var statusRoll = rnd();
      var status = statusRoll < 0.86 ? 'active' : (statusRoll < 0.95 ? 'lapsed' : 'pending');
      var checkins = status === 'active' ? int(1, 34) : int(0, 6);
      out.push({
        id: 'VL-' + joinY + '-' + pad(int(100, 9999), 4),
        name: pick(GIVEN) + ' ' + pick(SURNAMES),
        email: 'member' + pad(i + 1, 3) + '@example.com',
        phone: '+852 5' + int(100, 999) + ' ' + int(1000, 9999),
        age: int(15, 30),
        district: pick(DISTRICTS),
        sports: [pick(SPORTS), pick(SPORTS)].filter(function (v, ix, a) { return a.indexOf(v) === ix; }),
        tier: tier,
        status: status,
        joined: joined,
        renews: isoDate(joinY + 1, joinM, 1),
        checkins: checkins,
        lastSeen: (function () { var mm = int(5, 8); return isoDate(2026, mm, mm === 8 ? int(1, 9) : int(1, 28)); })(),
        walletPass: rnd() < 0.55,
        consentMarketing: rnd() < 0.7,
        guardianConsent: false
      });
    }
    out.forEach(function (m) { if (m.age < 18) m.guardianConsent = rnd() < 0.9; });
    /* the summit is rare, but never empty — otherwise the console shows a tier with no one in it */
    if (!out.some(function (m) { return m.tier === 'carbonado'; })) {
      out[3].tier = 'carbonado'; out[17].tier = 'carbonado';
    }
    return out;
  })();

  /* the member whose card is shown in the demo */
  var ME = {
    id: 'VL-2026-04821',
    name: 'Alan Wu',
    email: 'alan@example.com',
    tier: 'meteorite',
    status: 'active',
    joined: '2026-03-14',
    renews: '2027-03-14',
    district: 'Sha Tin',
    checkins: 17,
    walletPass: false
  };

  var CHECKINS = (function () {
    var out = [];
    for (var i = 0; i < 26; i++) {
      var m = MEMBERS[int(0, MEMBERS.length - 1)];
      var e = EVENTS[int(0, 3)];
      out.push({
        memberId: m.id, name: m.name, tier: m.tier,
        event: e.name, eventId: e.id,
        at: pad(int(7, 21), 2) + ':' + pad(int(0, 59), 2),
        result: rnd() < 0.92 ? 'ok' : 'denied'
      });
    }
    return out;
  })();

  /* ---------- helpers ---------- */
  function fmtDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return iso;
    var M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return d.getDate() + ' ' + M[d.getMonth()] + ' ' + d.getFullYear();
  }
  function money(n) { return n === 0 ? 'Free' : 'HK$' + n.toLocaleString(); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
    });
  }

  /* language toggle — same contract as the homepage */
  function initLang() {
    var btns = document.querySelectorAll('.lang button');
    if (!btns.length) return;
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var l = b.dataset.lang;
        btns.forEach(function (o) { o.classList.toggle('act', o === b); });
        document.documentElement.lang = l === 'zh' ? 'zh-Hant' : 'en';
        document.querySelectorAll('[data-' + l + ']').forEach(function (el) {
          el.textContent = el.getAttribute('data-' + l);
        });
        try { localStorage.setItem('viva-lang', l); } catch (e) {}
      });
    });
  }

  function initReveal() {
    var els = document.querySelectorAll('.rv');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('on'); }); return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
      });
    }, { threshold: .12 });
    els.forEach(function (e, i) { e.style.transitionDelay = (i % 4) * 0.06 + 's'; io.observe(e); });
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () { initLang(); initReveal(); });

  root.VIVA = {
    TIERS: TIERS, PERKS: PERKS, DISTRICTS: DISTRICTS, SPORTS: SPORTS,
    TIER_KEYS: TIER_KEYS, EVENTS: EVENTS, MEMBERS: MEMBERS, CHECKINS: CHECKINS, ME: ME,
    fmtDate: fmtDate, money: money, esc: esc, ready: ready
  };
})(window);
