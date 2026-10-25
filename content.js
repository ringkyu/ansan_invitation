/* =====================================================================
   2026 안산시 대학SDGs포럼 모바일 초대장 — 콘텐츠 설정 파일
   문구·프로그램·링크·음원 설정은 모두 이 파일에서만 수정합니다.
   (index.html / script.js 는 수정하지 않아도 됩니다.)

   ※ '' (빈 값) 으로 둔 항목은 아직 확정되지 않은 값입니다.
     추정해서 채우지 말고, 담당자 확인 후 입력해 주세요.
   ===================================================================== */
window.INVITATION = {

  /* ---------- 공유·미리보기 ---------- */
  share: {
    // 확정된 실제 배포 주소(https://…). 비어 있으면 '카카오톡 공유'·'주소 복사'는 안내 문구만 보여 줍니다.
    shareUrl: 'https://ringkyu.github.io/ansan_invitation/',
    // 카카오톡 공유 대표이미지의 실제 https 주소
    shareImageUrl: 'https://ringkyu.github.io/ansan_invitation/assets/og-image.jpg',
    // Kakao Developers 의 JavaScript 키 (플랫폼 > Web 에 https://ringkyu.github.io 도메인 등록 필요)
    kakaoJsKey: '091daab4a0edd47f29287f485eaa3038',
    // 메시지 템플릿 ID — 넣으면 템플릿 기준으로 발송합니다(버튼도 템플릿에서 정한 대로 나옴).
    // 비워 두면 아래 title/description/buttons 로 만든 기본 카드(버튼 최대 2개)를 보냅니다.
    kakaoTemplateId: '',
    title: '2026 안산시 대학SDGs포럼 초대장',
    description: '2026. 11. 11.(수) 14:00~16:30 · 안산대학교 성실관 WINGS홀',
    // 공유 카드 버튼 (최대 2개). url 은 카카오 앱(플랫폼 > Web)에 등록한 도메인이어야 합니다 (구글 폼은 https://docs.google.com 등록).
    buttons: [
      { title: '초대장 보기', url: 'https://ringkyu.github.io/ansan_invitation/' },
      { title: '참가 신청하기', url: 'https://docs.google.com/forms/d/e/1FAIpQLScluQ3ur_diLE_R2KoSTCvW_JBfm5LZ92sPjrAkVqlKyXptCg/viewform' },
    ],
  },

  /* ---------- 배경음악 ----------
     사용이 허가된 음원 파일 경로를 넣으면 음악 버튼이 나타납니다 (예: ['assets/bgm.mp3']).
     비어 있으면 버튼은 숨겨집니다. 참고 사이트의 음원은 사용하지 않습니다. */
  bgm: [],

  /* ---------- 인트로 (2~3초 후 자동 종료, 탭/키로 즉시 건너뛰기) ---------- */
  intro: {
    kicker: '대학과 지역이 함께 만드는 지속가능한 안산',
    lines: ['「2026 안산시 대학SDGs포럼」에', '여러분을 초대합니다.'],
  },

  /* ---------- 메인 ---------- */
  event: {
    slogan: '대학과 지역이 함께 만드는 지속가능한 안산',
    titleLines: ['2026 안산시', '대학SDGs포럼'],
    date: '2026. 11. 11.(수)',
    time: '14:00~16:30',
    place: '안산대학교 성실관 WINGS홀',
    room: '',   // 호실 표기는 사용하지 않음
    heroAlt: '지속가능발전목표 SDGs 17개 목표 휠 안에 안산시 지도가 점으로 그려진 포럼 대표 이미지',
  },

  /* ---------- 모시는 글 (HWP 원문 · 줄바꿈만 화면 폭에 맞게 조정) ---------- */
  greeting: {
    heading: '「2026 안산시 대학SDGs포럼」에 여러분을 초대합니다.',
    paragraphs: [
      '안산시와 관내 5개 대학이 함께하는「2026 안산시 대학SDGs포럼」에 여러분을 초대합니다.',
      '대학은 교육과 연구를 넘어 지역사회의 다양한 문제를 함께 고민하고, 지속가능한 미래를 만들어가는 중요한 협력 주체입니다.',
      '올해 두 번째로 개최되는 대학SDGs포럼에서는 각 대학이 지역사회와 함께 추진해 온 다양한 활동과 연구 성과를 공유하고, 지속가능발전목표(SDGs)의 관점에서 그 의미와 가능성을 살펴보고자 합니다.',
      '특히 올해부터는 안산의 대학들이 차례로 포럼을 여는 순회 개최가 시작되며, 그 첫 번째 무대가 안산대학교에서 열립니다. 이번 포럼을 출발점으로 대학과 지역사회의 연결을 넓히고, 지속가능한 안산을 위한 협력과 실천의 기반을 더욱 다져가고자 합니다.',
      '대학의 역량과 지역의 가능성이 만나 새로운 변화를 만들어가는 자리에 여러분의 많은 관심과 참여를 바랍니다.',
    ],
    // 공동 초청 명의 (직함별 줄바꿈만 허용, 임의 인명·문구 추가 금지)
    signers: ['안산시장', '안산대학교 총장', '안산시지속가능발전협의회 대표회장'],
    inquiryOrg: '안산시지속가능발전협의회',
    inquiryTel: '031-483-0221',
  },

  /* ---------- 행사 식순 (포스터·담당자 전달 내용 기준) ----------
     14:40~14:50 은 프로그램명이 없어 '휴식' 등으로 확정해 표시하지 않습니다.
     sdgs 는 assets/sdg/<번호>.png 아이콘 번호입니다. */
  sideEvent: { title: '부대행사', text: '자원순환 실천 서약, 폐건전지 수거함 만들기 체험 등' },
  program: [
    {
      session: '오프닝 세션', time: '14:00~14:40',
      rows: [
        { time: '14:00~14:05', title: '국민의례, 내빈소개' },
        { time: '14:05~14:15', roles: [
          { role: '환영사', who: '안산대학교 총장 윤동열' },
          { role: '개회사', who: '안산시지속가능발전협의회 대표 방군섭' },
          { role: '축사', who: '안산시장 이민근' },
          { role: '축사', who: '안산시의회 의장 한명훈' },
        ] },
        { time: '14:15~14:40', cards: [
          { org: '안산대학교', tag: 'HOST', topic: '캠퍼스에서 지역으로, 지속가능한 변화를 연결하다',
            speaker: '정소영 교수 | 전략기획처장, 간호학과', sdgs: [7, 8, 11, 12, 13] },
        ] },
      ],
    },
    {
      session: '대학SDGs 세션', time: '14:50~16:30',
      rows: [
        { cards: [
          { org: '서울예술대학교', topic: '자립준비 청년들과 함께한 자립일기 캠프 이야기',
            speaker: '윤권수 교수 | 산학협력처(단)장, 방송영상전공', sdgs: [1, 3, 4, 11] },
          { org: '신안산대학교', topic: '함께 살아가는 도시, 책임에서 시작되는 공존',
            speaker: '이상민 교수 | 반려동물과', sdgs: [3, 11, 15] },
          { org: '한국호텔관광실용전문학교', topic: 'AI 시대, 사람 중심 서비스와 평생교육의 역할',
            speaker: '사현지 교수 | 호텔관광경영과', sdgs: [4, 8, 11] },
          { org: '안산대학교', topic: '지속가능 사회를 위한 대학의 역할 - 상권활성화 프로젝트',
            speaker: '김은화 교수 | RCC센터장, 마케팅경영학과', sdgs: [3, 9, 12, 17] },
          { org: '한양대학교 ERICA', topic: '안산선 지하화에 따른 도시공간 변화 구상',
            speaker: '김환용 교수 | 발전협력처장, 건축학부', sdgs: [4, 9, 11] },
        ] },
      ],
    },
  ],

  /* SDGs 아이콘 이름 (대체 텍스트용) */
  sdgNames: {
    1: '빈곤층 감소와 사회안전망 강화', 3: '건강하고 행복한 삶 보장', 4: '모두를 위한 양질의 교육',
    7: '에너지의 친환경 생산과 소비', 8: '좋은 일자리 확대와 경제성장', 9: '산업의 성장과 혁신 활성화 및 사회기반시설 구축',
    11: '지속가능한 도시와 주거지 조성', 12: '지속가능한 생산과 소비', 13: '기후변화와 대응',
    15: '육상생태계 보전', 17: '지구촌 협력 강화',
  },

  /* ---------- 참가신청 ----------
     승인된 외부 신청 URL(포스터 QR의 신청처와 동일한지 확인). 비어 있으면 버튼은 비활성 처리됩니다.
     마감일·대상·비용 등은 확정된 문구만 아래에 추가하세요(없으면 표시하지 않음). */
  apply: {
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScluQ3ur_diLE_R2KoSTCvW_JBfm5LZ92sPjrAkVqlKyXptCg/viewform',
    notes: [],
  },

  /* ---------- 포럼 소개 · 참여 대학 ---------- */
  about: {
    purposeTitle: '개최 취지',
    purpose: '각 대학이 지역사회와 함께 추진해 온 다양한 활동과 연구 성과를 공유하고, 지속가능발전목표(SDGs)의 관점에서 그 의미와 가능성을 살펴봅니다.',
    rotationTitle: '순회 개최',
    rotation: '올해부터 안산의 대학들이 차례로 포럼을 여는 순회 개최가 시작되며, 그 첫 번째 무대가 안산대학교입니다.',
    universitiesTitle: '참여 대학',
    universities: [
      { name: '안산대학교', logo: 'assets/logos/ansan-univ.png' },
      { name: '서울예술대학교', logo: 'assets/logos/seoul-arts.png' },
      { name: '신안산대학교', logo: 'assets/logos/sau.png' },
      { name: '한양대학교 ERICA', logo: 'assets/logos/hanyang-erica.png' },
      { name: '한국호텔관광실용전문학교', logo: 'assets/logos/hanhojeon.png' },
    ],
    poster: {
      thumb: 'assets/poster-thumb.webp',
      full: 'assets/poster.webp',
      alt: '2026 안산시 대학SDGs포럼 포스터. 대학과 지역이 함께 만드는 지속가능한 안산. 2026년 11월 11일 수요일 14시부터 16시 30분, 안산대학교 성실관 WINGS홀. 문의 안산시지속가능발전협의회 031-483-0221.',
    },
  },

  /* ---------- 오시는 길 ----------
     주소·교통·주차는 확정 전이므로 비워 둡니다. 확정되면 값을 넣으면 해당 항목이 나타납니다.
     지도: 캠퍼스 안내도 이미지(mapImage)가 표시됩니다. 누르면 크게 볼 수 있습니다.
     지도 앱 버튼 3종은 성실관 입구 기준 확정 URL을 넣어 주세요(비우면 건물명 검색 링크). */
  location: {
    mapImage: 'assets/campus-map.webp',
    mapImageAlt: '안산대학교 캠퍼스 안내도. 정문에서 들어와 오른쪽 안쪽에 성실관이 있으며, 예지관·자유관·본관·도서관이 가까이 있습니다.',
    address: '',
    fallbackQuery: '안산대학교 성실관',
    naverMapUrl: '',
    kakaoMapUrl: '',
    tmapUrl: '',
    transport: [],   // 예: [{ title: '지하철', text: '…' }]  (확정 안내만)
    parking: '',     // 예: '…'  (확정 안내만)
  },

  /* ---------- 주최·주관 (공식 로고) ---------- */
  organizers: {
    host: [
      { name: '안산시', logo: 'assets/logos/ansan-city.png' },
      { name: '안산대학교', logo: 'assets/logos/ansan-univ.png' },
      { name: '안산시지속가능발전협의회', logo: 'assets/logos/council.png' },
    ],
    support: [
      { name: '서울예술대학교', logo: 'assets/logos/seoul-arts.png' },
      { name: '신안산대학교', logo: 'assets/logos/sau.png' },
      { name: '한양대학교 ERICA', logo: 'assets/logos/hanyang-erica.png' },
      { name: '한국호텔관광실용전문학교', logo: 'assets/logos/hanhojeon.png' },
    ],
  },
};
