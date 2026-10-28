/* 2026 안산시 대학SDGs포럼 모바일 초대장 — 화면 생성 · 동작 (내용은 content.js 에서 수정) */
(() => {
  const C = window.INVITATION;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const telHref = n => 'tel:' + String(n).replace(/[^\d+]/g, '');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2400);
  }
  function disableLink(el, label) {
    el.removeAttribute('href');
    el.setAttribute('aria-disabled', 'true');
    if (label) el.textContent = label;
  }

  /* ---------- 문서 정보 ---------- */
  document.title = C.share.title;

  /* ---------- 0. 인트로 ---------- */
  (() => {
    const intro = $('#intro');
    $('#introKicker').textContent = C.intro.kicker;
    const box = $('#introText');
    box.innerHTML = C.intro.lines.map(l => `<span>${esc(l)}</span>`).join('');
    box.setAttribute('aria-label', C.intro.lines.join(' '));
    let done = false;
    const finish = () => {
      if (done) return; done = true;
      intro.classList.add('hide');
      setTimeout(() => intro.remove(), 900);
    };
    intro.addEventListener('click', finish);
    addEventListener('keydown', e => { if (!done && (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); finish(); } });
    setTimeout(finish, reduce ? 900 : 2800);       // 2~3초 내 자동 종료
  })();

  /* ---------- 배경음악: 사용자가 누른 뒤에만 재생 ---------- */
  (() => {
    const btn = $('#bgm');
    const list = (C.bgm || []).filter(Boolean);
    if (!list.length) { btn.remove(); return; }       // 음원 미전달 시 버튼 숨김
    btn.hidden = false;
    let idx = 0;
    const audio = new Audio(list[0]);
    audio.preload = 'none';
    const sync = () => {
      const on = !audio.paused;
      btn.classList.toggle('playing', on);
      btn.setAttribute('aria-pressed', String(on));
      btn.setAttribute('aria-label', on ? '배경음악 끄기' : '배경음악 켜기');
    };
    audio.addEventListener('play', sync);
    audio.addEventListener('pause', sync);
    audio.addEventListener('ended', () => {
      idx = (idx + 1) % list.length; audio.src = list[idx]; audio.play().catch(() => {});
    });
    btn.addEventListener('click', () => {
      if (audio.paused) audio.play().catch(() => toast('음악을 재생할 수 없습니다'));
      else audio.pause();
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden) audio.pause(); });
  })();

  /* ---------- 1. 메인 ---------- */
  (() => {
    const e = C.event;
    $('#slogan').textContent = e.slogan;
    $('#heroWheel').alt = e.heroAlt;
    $('#eventTitle').innerHTML = e.titleLines.map(l => `<span>${esc(l)}</span>`).join('');
    $('#eventTitle').setAttribute('aria-label', e.titleLines.join(' '));
    $('#infoCard').innerHTML =
      `<dt>일시</dt><dd>${esc(e.date)} ${esc(e.time)}</dd>` +
      `<dt>장소</dt><dd>${esc(e.place)}${e.room ? ' ' + esc(e.room) : ''}</dd>`;
  })();

  /* ---------- 2. 모시는 글 ---------- */
  (() => {
    const g = C.greeting;
    $('#greeting').innerHTML =
      `<p class="g-head reveal">${esc(g.heading)}</p>` +
      g.paragraphs.map(p => `<p class="g-p reveal">${esc(p)}</p>`).join('') +
      `<p class="g-sign reveal" aria-label="${esc(g.signers.join(' · '))}">${g.signers.map(s => `<span>${esc(s)}</span>`).join('')}</p>`;
  })();

  /* ---------- 3. 행사 식순 ---------- */
  (() => {
    const names = C.sdgNames || {};
    const sdgs = list => (list && list.length) ? `<ul class="p-sdgs" aria-label="연계 SDGs">${list.map(n =>
      `<li><img src="assets/sdg/${n}.png" alt="SDG ${n} ${esc(names[n] || '')}" width="40" height="40" loading="lazy"></li>`).join('')}</ul>` : '';
    const card = c => `
      <li class="p-card">
        <div class="p-org">${esc(c.org)}${c.tag ? `<span class="p-tag">${esc(c.tag)}</span>` : ''}</div>
        <div class="p-topic">${esc(c.topic)}</div>
        ${c.speaker ? `<div class="p-speaker">${esc(c.speaker)}</div>` : ''}
        ${sdgs(c.sdgs)}
      </li>`;
    const row = r => `
      <div class="p-row">
        ${r.time ? `<div class="p-rtime">${esc(r.time)}</div>` : ''}
        ${r.title ? `<div class="p-rtitle">${esc(r.title)}</div>` : ''}
        ${r.roles ? `<ul class="p-roles">${r.roles.map(x => `<li><span>${esc(x.role)}</span>${esc(x.who)}</li>`).join('')}</ul>` : ''}
        ${r.cards ? `<ul class="p-cards">${r.cards.map(card).join('')}</ul>` : ''}
      </div>`;
    const side = C.sideEvent ? `<li class="p-side reveal"><b>${esc(C.sideEvent.title)}</b><span>${esc(C.sideEvent.text)}</span></li>` : '';
    $('#program').innerHTML = side + C.program.map(b => `
      <li class="p-block reveal">
        <div class="p-head"><span class="p-time">${esc(b.time)}</span><span class="p-session">${esc(b.session)}</span></div>
        ${b.rows.map(row).join('')}
      </li>`).join('');
  })();

  /* ---------- 4. 참가신청 (외부 URL 연결만) ---------- */
  (() => {
    const a = C.apply;
    $('#applyNotes').innerHTML = (a.notes || []).map(n => `<li>${esc(n)}</li>`).join('');
    const btn = $('#applyBtn');
    if (a.registrationUrl) btn.href = a.registrationUrl;
    else disableLink(btn, '참가 신청 링크 준비 중');
  })();

  /* ---------- 5. 포럼 소개 · 참여 대학 ---------- */
  (() => {
    const a = C.about;
    $('#about').innerHTML = `
      <div class="a-block reveal"><p class="a-label">${esc(a.purposeTitle)}</p><p class="a-text">${esc(a.purpose)}</p></div>
      <div class="a-block reveal"><p class="a-label">${esc(a.rotationTitle)}</p><p class="a-text">${esc(a.rotation)}</p></div>
      <div class="a-block reveal"><p class="a-label">${esc(a.universitiesTitle)}</p>
        <ul class="univ-list">${a.universities.map(u => `<li><img src="${esc(u.logo)}" alt="${esc(u.name)}" loading="lazy"></li>`).join('')}</ul>
      </div>
      <div class="a-block reveal"><p class="a-label">포스터</p>
        <button type="button" class="poster-btn" id="posterBtn" aria-label="포스터 크게 보기"><img src="${esc(a.poster.thumb)}" alt="${esc(a.poster.alt)}" loading="lazy"></button>
      </div>`;
  })();

  /* ---------- 포스터 확대 보기: 닫기 버튼 · ESC · 바깥 탭 · 확대/축소 ---------- */
  (() => {
    const lb = $('#lightbox'), img = $('#lbImg'), sc = $('#lbScroll');
    let opener = null;
    const open = (src, alt) => {
      opener = document.activeElement;
      img.src = src; img.alt = alt;
      const fit = () => sc.classList.toggle('land', img.naturalWidth > img.naturalHeight);
      img.onload = fit; if (img.complete) fit();
      sc.classList.remove('zoom'); sc.scrollTop = 0;
      lb.hidden = false; document.body.classList.add('lock');
      $('#lbClose').focus();
    };
    const close = () => {
      lb.hidden = true; document.body.classList.remove('lock');
      if (opener && opener.focus) opener.focus();
    };
    $('#posterBtn').addEventListener('click', () => open(C.about.poster.full, C.about.poster.alt));
    document.addEventListener('click', e => { if (e.target.closest('#mapBtn')) open(C.location.mapImage, C.location.mapImageAlt); });
    $('#lbClose').addEventListener('click', close);
    sc.addEventListener('click', e => {
      if (e.target === img) sc.classList.toggle('zoom');
      else close();
    });
    addEventListener('keydown', e => { if (!lb.hidden && e.key === 'Escape') close(); });
  })();

  /* ---------- 6. 오시는 길 ---------- */
  (() => {
    const l = C.location, e = C.event;
    const q = encodeURIComponent(l.fallbackQuery || e.place);
    const naver = l.naverMapUrl || `https://map.naver.com/p/search/${q}`;
    const kakao = l.kakaoMapUrl || `https://map.kakao.com/link/search/${q}`;
    const tmap = l.tmapUrl || `https://tmap.life/search?name=${q}`;
    const transport = (l.transport || []).map(t => `<dt>${esc(t.title)}</dt><dd>${esc(t.text).replace(/\n/g, '<br>')}</dd>`).join('')
      + (l.parking ? `<dt>주차</dt><dd>${esc(l.parking)}</dd>` : '');
    $('#location').innerHTML = `
      <p class="place-name reveal">${esc(e.place)}${e.room ? ' ' + esc(e.room) : ''}</p>
      ${l.address ? `<p class="place-addr reveal">${esc(l.address)}</p>` : ''}
      <button type="button" class="map-box reveal" id="mapBtn" aria-label="캠퍼스 안내도 크게 보기"><img src="${esc(l.mapImage)}" alt="${esc(l.mapImageAlt)}" loading="lazy"></button>
      <div class="map-links reveal">
        <a class="btn" href="${esc(naver)}" target="_blank" rel="noopener">네이버지도</a>
        <a class="btn" href="${esc(kakao)}" target="_blank" rel="noopener">카카오맵</a>
        <a class="btn" href="${esc(tmap)}" target="_blank" rel="noopener">티맵</a>
      </div>
      ${transport ? `<dl class="transport reveal">${transport}</dl>` : ''}`;
  })();

  /* ---------- 7. 문의 · 주최/주관 ---------- */
  (() => {
    const g = C.greeting, o = C.organizers;
    $('#inquiry').innerHTML = `문의 ${esc(g.inquiryOrg)}<br><a href="${telHref(g.inquiryTel)}">Tel. ${esc(g.inquiryTel)}</a>`;
    const group = (title, arr) => `<div class="org-group"><h3>${title}</h3><ul class="org-logos">${arr.map(x => `<li><img src="${esc(x.logo)}" alt="${esc(x.name)}" loading="lazy"></li>`).join('')}</ul></div>`;
    $('#orgs').innerHTML = group('주최', o.host) + group('주관', o.support);
  })();

  /* ---------- 공유 · 주소 복사 ---------- */
  (() => {
    const S = C.share;
    const url = (S.shareUrl || '').trim();
    const hasUrl = /^https:\/\//.test(url);
    const NEED = '공개 주소가 확정되면 사용할 수 있습니다';
    let kakaoReady = false;

    function loadKakao() {
      return new Promise(res => {
        if (!S.kakaoJsKey) return res(false);
        if (window.Kakao) return res(true);
        const s = document.createElement('script');
        s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
        s.async = true;
        s.onload = () => res(!!window.Kakao);
        s.onerror = () => res(false);
        document.head.appendChild(s);
      });
    }
    function copy(text) {
      if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
      return new Promise((ok, no) => {
        const ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:-100px;opacity:0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy') ? ok() : no(); } catch (e) { no(e); } finally { ta.remove(); }
      });
    }

    $('#copyBtn').addEventListener('click', async () => {
      if (!hasUrl) return toast(NEED);
      try { await copy(url); toast('초대장 주소를 복사했습니다'); }
      catch { prompt('아래 주소를 길게 눌러 복사해 주세요', url); }   // Clipboard API 미지원 시 안내
    });

    $('#shareBtn').addEventListener('click', async () => {
      if (!hasUrl) return toast(NEED);
      if (S.kakaoJsKey && !kakaoReady) kakaoReady = await loadKakao().then(ok => {
        if (ok && !Kakao.isInitialized()) Kakao.init(S.kakaoJsKey);
        return ok;
      });
      if (kakaoReady) {
        try {
          const link = { mobileWebUrl: url, webUrl: url };
          if (S.kakaoTemplateId) Kakao.Share.sendCustom({ templateId: Number(S.kakaoTemplateId) });
          else Kakao.Share.sendDefault({
            objectType: 'feed',
            content: { title: S.title, description: S.description, imageUrl: S.shareImageUrl, link },
            buttons: ((S.buttons && S.buttons.length) ? S.buttons.slice(0, 2) : [{ title: '초대장 보기', url }])
              .map(b => ({ title: b.title, link: { mobileWebUrl: b.url || url, webUrl: b.url || url } })),
          });
          return;
        } catch (e) { /* 아래 대체 공유로 */ }
      }
      if (navigator.share) {
        try { await navigator.share({ title: S.title, text: S.description, url }); } catch (e) { /* 사용자가 취소 */ }
        return;
      }
      try { await copy(url); toast('주소를 복사했습니다. 카카오톡에 붙여 넣어 보내 주세요'); }
      catch { prompt('아래 주소를 길게 눌러 복사해 주세요', url); }
    });
  })();

  /* ---------- 스크롤 등장 ---------- */
  (() => {
    const els = document.querySelectorAll('.reveal');
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('on')); return; }
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('on'); io.unobserve(en.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(e => io.observe(e));
  })();
})();
