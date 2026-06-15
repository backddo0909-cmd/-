// 안전한 시작점 보장
document.addEventListener("DOMContentLoaded", () => {
  renderEnterpriseCards(megaDatabase);
  renderOfficialContests(); 
  
  // 3번 탭 전용 안전 가드 걸고 로드하기
  const certContainer = document.getElementById("dynamic-cert-list");
  if (certContainer) {
    updateDynamicCertificates();
  }
});

// ===================================================
// 📊 마이스터고 타깃 리얼 25대 기업 종합 데이터베이스
// ===================================================
const megaDatabase = [
  { id: 1, job: "machine", name: "현대자동차", scale: "대기업", desc: "생산기술직(모빌리티 기술인력) 마이스터고 트랙 공채", link: "https://talent.hyundai.com", salary: "약 5,500만 원+", sales: "162조 원", rate: "4.1 / 5.0", review: "🛠️ 고졸 채용 끝판왕. 기본급과 성과급 체계가 완벽하며 정년 보장이 장점. 다만 주야간 교대 근무 적응이 필수적임.", welfare: "🚙 근속 시 신차 구입 최대 30% 할인, 사내 주택자금 대출, 최고 수준 자녀 학자금 전액 지원" },
  { id: 2, job: "machine", name: "기아", scale: "대기업", desc: "엔지니어(생산직) 고졸/마이스터고 상시 채용", link: "https://career.kia.com", salary: "약 5,500만 원+", sales: "99조 원", rate: "4.2 / 5.0", review: "🚗 급여와 성과급은 동종업계 최고 수준. 현대차와 함께 정년 트랙 타기에 가장 좋은 신의 직장.", welfare: "🚙 기아 신차 할인 전용 혜택, 사내 복지 기금 지원, 종합검진 및 본인 의료비 전액 지원" },
  { id: 3, job: "machine", name: "현대모비스", scale: "대기업", desc: "생산전문직 및 모듈 제조 부문 기술 전형", link: "https://www.mobis.co.kr", salary: "약 4,800만 원", sales: "59조 원", rate: "3.7 / 5.0", review: "🔩 현대차 그룹사 타이틀과 높은 복지 만족도. 생산라인 자동화 수준이 매우 높아 쾌적함.", welfare: "🛒 하계 휴가비 및 명절 귀향비 지원, 그룹사 차량 할인 혜택 패키지" },
  { id: 4, job: "machine", name: "두산에너빌리티", scale: "대기업", desc: "원자력/가스터빈 기계 가공 및 용접 기술직 공채", link: "https://www.doosanenerbility.com", salary: "약 4,500만 원", sales: "17조 원", rate: "3.5 / 5.0", review: "🏗️ 창원 지역 최고 수준 직장. 중공업 특유의 문화가 있고 기술직 우대와 명장 제도가 활성화됨.", welfare: "🏠 사내 기숙사 무상 완비, 무상 통근버스 전노선 운행, 개인연금 보조 지원" },
  { id: 5, job: "machine", name: "성우하이텍", scale: "중견기업", desc: "자동차 차체 부품 및 로봇 용접 자동화 설비 제어", link: "http://www.swhitech.com", salary: "약 4,000만 원", sales: "4조 원", rate: "3.2 / 5.0", review: "🚘 자동차 차체 분야 우량 중견기업. 초봉이 중견기업 라인 중 최상위권이며 글로벌 거점이 많음.", welfare: "🎓 사내 계약학과 동시 지원, 장기근속 포상 및 우수사원 해외 연수 기회 제공" },
  { id: 6, job: "semi", name: "삼성전자 DS부문", scale: "대기업", desc: "반도체 제조설비 유지보수직(FETA) 마이스터고 공채", link: "https://www.samsungcareers.com", salary: "약 5,000만 원+", sales: "258조 원", rate: "3.9 / 5.0", review: "📟 FETA 전형으로 입사 시 최고 수준 설비 엔지니어로 양성됨. 인프라 및 사내 복지 최상급.", welfare: "🏥 임직원 전용 의료비 무한 지원, 3식 무료 최고급 제공, 사내 반도체대학 학위 취득 지원" },
  { id: 7, job: "semi", name: "SK하이닉스", scale: "대기업", desc: "메모리 반도체 생산직 및 청년 Hy-Five 연계 전형", link: "https://recruit.skhynix.com", salary: "약 5,000만 원+", sales: "34조 원", rate: "4.0 / 5.0", review: "💾 이천/청주 캠퍼스 인프라 훌륭하고 노조 복지가 탄탄해 근무 안정성이 완벽히 보장됨.", welfare: "🎁 연간 복지 카드 300만 원 기본 충전, 영유아부터 자녀 학자금 전액 지원, 무료 사택" },
  { id: 8, job: "semi", name: "DB하이텍", scale: "대기업", desc: "파운드리 반도체 메인터넌스 고졸 공채", link: "https://dh.dbgroup.co.kr", salary: "약 4,200만 원", sales: "1조 6천억", rate: "3.4 / 5.0", review: "⚡ 부천 및 상우 공장 근무. 설비 메인터넌스 기술을 베이스부터 탄탄하게 배우기 좋은 환경.", welfare: "🏥 의료 실비 지원, 주택자금 저리 융자 지원, 전국 콘도 회원권 리조트 혜택" },
  { id: 9, job: "semi", name: "ASML 코리아", scale: "대기업", desc: "EUV 노광 장비 테크니컬 어시스턴트 고졸 전형", link: "https://www.asml.com/ko-kr/careers", salary: "약 4,700만 원", sales: "38조 원", rate: "3.8 / 5.0", review: "🌐 슈퍼을 장비 회사로 수평적이고 자유로운 외국계 조직 문화 정착. 성장에 최적화됨.", welfare: "🇺🇸 동탄 본사 최고급 오피스, 자율 복지포인트 지급, 글로벌 본사 주식 매입 매칭 프로그램" },
  { id: 10, job: "semi", name: "앰코테크놀로지코리아", scale: "중견기업", desc: "글로벌 후공정(OSAT) 설비 정비직 상시 고졸 전형", link: "https://amkor.co.kr", salary: "약 4,100만 원", sales: "3조 2천억", rate: "3.3 / 5.0", review: "🎯 반도체 패키징 세계 2위. 송도 및 광주 공장. 기숙사와 식사가 매우 좋고 4조3교대 고정.", welfare: "🏠 송도/광주 초현대식 기숙사 무료 제공, 사내 어린이집 운영, 전노선 통근버스" },
  { id: 11, job: "battery", name: "LG에너지솔루션", scale: "대기업", desc: "전기차 배터리 전극/조립/활성화 설비 테크니션 채용", link: "https://www.lgensol.com", salary: "약 4,600만 원", sales: "33조 원", rate: "3.6 / 5.0", review: "🔋 국내 배터리 대장주로 청주 오창 근무. 스마트 팩토리 배터리 공정 셋업 전문가 커리어 가능.", welfare: "✈️ 매년 대규모 복지포인트 충전, 여가 지원 전용 콘도 휴양소, 자녀 교육비 안심 보장" },
  { id: 12, job: "battery", name: "삼성SDI", scale: "대기업", desc: "소형/자동차용 2차전지 제조 기술직 마이스터고 공채", link: "https://www.samsungcareers.com", salary: "약 4,800만 원", sales: "22조 원", rate: "3.7 / 5.0", review: "📐 울산 및 천안 캠퍼스 근무. 공장 자동화 라인이 깔끔하고 프로세스가 대단히 체계적임.", welfare: "🏥 직계 가족 의료비 지원, 전국 삼성 리조트 연계 할인, 명절 특별 상여금" },
  { id: 13, job: "battery", name: "SK온", scale: "대기업", desc: "배터리 스마트 팩토리 자동화 생산직 고졸 공채", link: "https://www.skon.com", salary: "약 4,500만 원", sales: "12조 원", rate: "3.4 / 5.0", review: "🏃 서산 공장 중심. 대기업다운 높은 학자금 및 인프라 복지 혜택이 탄탄히 지원됨.", welfare: "🎁 SK 그룹사 주유/통신 전용 마일리지 포인트 적립, 장기근속 유급 휴가제" },
  { id: 14, job: "battery", name: "포스코퓨처엠", scale: "대기업", desc: "2차전지 양극재/음극재 화학 설비 운전 및 정비 기술직", link: "https://www.poscofuturem.com", salary: "약 4,700만 원", sales: "4조 7천억", rate: "3.5 / 5.0", review: "🧱 포항/광양 핵심 거점. 경기 변동 기복이 적어 평생 안정적으로 정년 보장받기 좋은 직장.", welfare: "🏠 주택 구입 특별 자금 대출, 포스코 수련원 무상 이용, 정기 프리미엄 종합검진" },
  { id: 15, job: "battery", name: "에코프로비엠", scale: "중견기업", desc: "하이니켈 양극재 제조 공정 제어 및 설비 유지 보수", link: "https://www.ecoprobm.co.kr", salary: "약 4,200만 원", sales: "6조 9천억", rate: "3.2 / 5.0", review: "🧪 오창/포항 근무. 배터리 양극재 시장 성장과 함께 인센티브 수당 체계가 우수하게 잡힘.", welfare: "🎓 계약 야간 대학 진학 전액 보조, 사내 스포츠 취미 동호회 지원, 무상 기숙사" },
  { id: 16, job: "defense", name: "한화에어로스페이스", scale: "대기업", desc: "K9 자주포 및 항공기 엔진 정밀 조립 기술직", link: "https://www.hanwhaaero.space", salary: "약 4,600만 원", sales: "9조 원", rate: "3.8 / 5.0", review: "🛡️ 창원 공장 중심. 대한민국 방위산업 1위 기업으로 고용 안정성이 완벽에 가까움.", welfare: "💵 전국 한화 리조트 프리 패스 이용권, 계열사 서비스 할인, 3식 무상 제공 기숙사" },
  { id: 17, job: "defense", name: "LIG넥스원", scale: "대기업", desc: "정밀 유도무기 및 전술 통신 장비 생산/검사 기술직", link: "https://www.lignex1.com", salary: "약 4,500만 원", sales: "2조 3천억", rate: "3.9 / 5.0", review: "🚀 구미 공장 중심 근무. 방산계의 공무원이라 불릴 만큼 유연하고 상호 존중하는 수평적 문화.", welfare: "🏥 임직원 단체 상해보험 무료 가입, 사내 피트니스 룸 완비, 영유아 보육 수당" },
  { id: 18, job: "defense", name: "현대로템", scale: "대기업", desc: "K2 전차 차체 기계 조립 및 중기계 생산직 공채", link: "https://www.hyundai-rotem.co.kr", salary: "약 5,000만 원", sales: "3조 5천억", rate: "3.7 / 5.0", review: "🚂 창원 공장. 현대자동차 그룹 복지를 100% 공유하며 방산 수출 호재로 인센티브 최고조.", welfare: "🚙 현대/기아 신차 할인 동일 적용, 사내 새마을금고 저리 융자, 고교-대학 학자금 전액" },
  { id: 19, job: "defense", name: "한화시스템", scale: "대기업", desc: "군용 레이다 및 전술 전자 시스템 조립/테스트 부문", link: "https://www.hanwhasystems.com", salary: "약 4,400만 원", sales: "2조 4천억", rate: "3.6 / 5.0", review: "📡 전자전 장비 국산화 주역. 전기 전자 및 제어 전공 마이스터고 학생 추천 코스.", welfare: "🛒 개인 자율 초이스 복지포인트 부여, 주택 임차 자금 대출, 한화 패밀리 케어 적용" },
  { id: 20, job: "defense", name: "SNT모티브", scale: "중견기업", desc: "K계열 군용 소총 정밀 총열 가공 및 메커니즘 조립", link: "http://www.sntmotiv.com", salary: "약 3,900만 원", sales: "1조 원", rate: "3.1 / 5.0", review: "🔫 부산 기장 공장. 소화기 분야 독점 특수가 있어 직장이 매우 견고함. 탄탄하고 묵직한 분위기.", welfare: "🏠 대규모 통근버스 노선 운행, 사내 전용 식당, 장기근속 기념 포상 제도" },
  { id: 21, job: "public", name: "한국전력공사", scale: "공기업", desc: "전국 송배전 선로 건설 및 전력설비 운영 고졸 공채", link: "https://recruit.kepco.co.kr", salary: "약 3,600만 원", sales: "88조 원", rate: "4.0 / 5.0", review: "🏢 정년 100% 보장 및 고졸 마이스터 연수 프로세스가 업계 최고라 실무 역량 키우기 최상.", welfare: "🏠 전국 지사별 최신식 사택 기숙사 무상 제공, 유연근무 시차출퇴근 활성화" },
  { id: 22, job: "public", name: "한국수력원자력", scale: "공기업", desc: "원자력/수력 발전소 기계 및 전기 제어 시설 관리 정규직", link: "https://www.khnp.co.kr", salary: "약 4,000만 원", sales: "11조 원", rate: "3.9 / 5.0", review: "⚛️ 발전소 주변 근무 필수이나 초봉이 공기업 최고 수준이며 사택 및 인프라 지원이 화려함.", welfare: "🏠 전용 아파트 사택 무상 양도 제공, 자녀 학자금 무이자 대부, 최고급 사내 체육관" },
  { id: 23, job: "public", name: "한국철도공사", scale: "공기업", desc: "철도 차량 정비 및 선로 신호 제어 고졸 채용", link: "https://info.korail.com", salary: "약 3,400만 원", sales: "6조 원", rate: "3.8 / 5.0", review: "🚂 4조2교대 안착으로 휴무일 확보 및 취미 보장에 최고. 차량 기계과 학생들 선호도 1위.", welfare: "🎫 KTX 및 일반 열차 임직원 무료/할인 탑승권, 복지포인트 및 연고지 우선 배치" },
  { id: 24, job: "public", name: "서울교통공사", scale: "공기업", desc: "지하철 전동차 기계 정비 및 전기 신호 설비 고졸 전형", link: "https://www.seoulmetro.co.kr", salary: "약 3,500만 원", sales: "2조 원", rate: "3.6 / 5.0", review: "🚇 서울 고정 근무라는 유일무이한 메리트. 철도 기계 정비 축적도가 유용함.", welfare: "🏥 서울 주요 대학병원 종합검진 연계, 주택 임차 자금 금융 지원, 선택적 복지 제도" },
  { id: 25, job: "public", name: "한전KPS", scale: "공기업", desc: "발전설비 정밀 기계 정비 및 오버홀 기술직 정규직", link: "https://www.kps.co.kr", salary: "약 3,700만 원", sales: "1조 4천억", rate: "3.7 / 5.0", review: "🛠️ 발전 정비 전문 공기업. 출장 수당이 두둑해 실제 통장에 찍히는 실수령액 만족도가 매우 높음.", welfare: "🏠 거점별 합숙소 제공, 전공 기술 자격증 소지 시 매월 전문 수당 별도 가산 지급" }
];

// ===================================================
// 🏆 고도화된 상시 공식 주소 연동 데이터베이스
// ===================================================
const officialContestDatabase = [
  {
    type: "government",
    badgeClass: "badge-blue",
    badgeText: "정부·한국산업인력공단",
    title: "지방 및 전국기능경기대회",
    desc: "고용노동부 주관. 폴리메카닉스, 금형, CNC선반 등 직무 끝판왕 대회. 입상 시 대기업 특별추천권 및 산업기사 필기 면제 권한 부여.",
    link: "https://meister.hrdkorea.or.kr", 
    schedule: "📅 지방경기대회(4월) / 전국경기대회(8~10월)"
  },
  {
    type: "enterprise",
    badgeClass: "badge-purple",
    badgeText: "삼성전자 DS/DX 주관",
    title: "삼성 오픈소스 전문 고교 공모전 (SOSC)",
    desc: "소프트웨어 임베디드 코딩 및 자동화 제어 설계 공모전입니다. 수상 시 삼성 고졸 공채 가산점과 연동되는 메인 스펙입니다.",
    link: "https://www.samsungcareers.com",
    schedule: "📅 하반기 공식 공지 오픈"
  },
  {
    type: "government",
    badgeClass: "badge-green",
    badgeText: "교육부 · 특허청",
    title: "IP Meister Program (직무발명경진대회)",
    desc: "산업 현장의 문제를 해결하는 직무 발명 아이디어를 제안하고 선정 시 실제 본인 이름으로 특허 출원까지 완벽하게 지원합니다.",
    link: "https://www.kipa.org", 
    schedule: "📅 매년 5월 ~ 7월 집중 접수"
  },
  {
    type: "enterprise",
    badgeClass: "badge-orange",
    badgeText: "현대자동차 그룹",
    title: "현대 모빌리티 주니어 마이스터 대회",
    desc: "친환경 자동차 구조, 자율주행 센서 기계제어 실무를 겨루는 대회입니다. 현대차 마이스터고 상시 트랙 포트폴리오용 스펙입니다.",
    link: "https://talent.hyundai.com",
    schedule: "📅 그룹 채용 포털 내 별도 수시 오픈"
  },
  {
    type: "hub",
    badgeClass: "badge-blue",
    badgeText: "실시간 연동 정보창",
    title: "링커리어 & 아웃캠퍼스 공모전 허브",
    desc: "대기업에서 상시 개최하는 기계 캡스톤 디자인, ESG 아이디어, 하드웨어 공모전 정보를 실시간 필터링하여 확인하는 허브입니다.",
    link: "https://linkareer.com",
    schedule: "📅 365일 실시간 상시 업데이트"
  },
  {
    type: "volunteer",
    badgeClass: "badge-green",
    badgeText: "행정안전부 공식 포털",
    title: "1365 자원봉사 포털 (스펙 연동 마크)",
    desc: "대기업 및 공기업 고졸 공채 인성 평가 항목에서 결정적 차이를 만드는 공식 봉사활동 시간 연동 데이터 베이스 허브입니다.",
    link: "https://www.1365.go.kr",
    schedule: "📅 상시 거점 봉사 신청 및 발급 연동"
  }
];

// 대회 렌더러
function renderOfficialContests() {
  const grid = document.getElementById("officialContestGrid");
  if (!grid) return; // 요소 없으면 가드 에러 예방
  grid.innerHTML = "";

  officialContestDatabase.forEach(contest => {
    const card = document.createElement("div");
    card.className = "luxury-card";
    card.innerHTML = `
      <span class="badge ${contest.badgeClass}">${contest.badgeText}</span>
      <h3>${contest.title}</h3>
      <p>${contest.desc}</p>
      <div class="card-footer-info">
        <span>${contest.schedule}</span>
        <a href="${contest.link}" target="_blank" rel="noopener noreferrer" class="contest-link-btn">
          공식 접수처 / 상세 요강 바로가기 🔗
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// 기업 카드 렌더러
function renderEnterpriseCards(list) {
  const grid = document.getElementById("contestGrid");
  if (!grid) return;
  grid.innerHTML = ""; 

  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "contest-card";

    let jobIcon = "⚙️";
    if (item.job === "semi") jobIcon = "📟";
    if (item.job === "battery") jobIcon = "🔋";
    if (item.job === "defense") jobIcon = "🛡️";
    if (item.job === "public") jobIcon = "🏢";

    let badgeStyle = "background-color: #fee2e2; color: #ef4444;";
    if (item.scale === "중견기업") badgeStyle = "background-color: #fef3c7; color: #d97706;";
    if (item.scale === "공기업") badgeStyle = "background-color: #e0f2fe; color: #0369a1;";

    card.innerHTML = `
      <div class="contest-info">
        <div class="contest-tags">
          <span class="tag" style="${badgeStyle}">${item.scale}</span>
          <span class="tag dday" style="background-color: #f1f5f9; color: #475569;">${jobIcon} 공식전형</span>
        </div>
        <h4>[${item.name}]</h4>
        <p style="font-size:13.5px; color:#475569; margin-top:4px;">${item.desc}</p>
        <div class="contest-meta" style="margin-top:6px; font-weight:600; color:#10b981;">⭐ 기업평점: ${item.rate.split(" ")[0]} / 5.0</div>
      </div>
      <div class="action-zone">
        <button class="apply-btn" onclick="openModal(${item.id})">💡 기업 상세 분석</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// 필터링 제어
function filterByJob(jobCategory) {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  
  if(event && event.target) {
    event.target.classList.add("active");
  }

  if (jobCategory === "all") {
    renderEnterpriseCards(megaDatabase);
  } else {
    const filtered = megaDatabase.filter(item => item.job === jobCategory);
    renderEnterpriseCards(filtered);
  }
}

// 탭 전환 제어
function switchTab(tabName) {
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach(content => content.classList.remove("active-tab"));

  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach(btn => btn.classList.remove("active"));

  const targetTab = document.getElementById(`tab-${tabName}`);
  const targetNav = document.getElementById(`nav-${tabName}`);
  
  if (targetTab) targetTab.classList.add("active-tab");
  if (targetNav) targetNav.classList.add("active");
}

// 모달 제어
function openModal(id) {
  const targetData = megaDatabase.find(item => item.id === id);
  if (!targetData) return;

  document.getElementById("mScale").textContent = targetData.scale;
  const scaleBadge = document.getElementById("mScale");
  scaleBadge.style.backgroundColor = targetData.scale === "공기업" ? "#e0f2fe" : (targetData.scale === "중견기업" ? "#fef3c7" : "#fee2e2");
  scaleBadge.style.color = targetData.scale === "공기업" ? "#0369a1" : (targetData.scale === "중견기업" ? "#d97706" : "#ef4444");

  document.getElementById("mCompanyName").textContent = targetData.name;
  document.getElementById("mTitle").textContent = targetData.desc;
  document.getElementById("mSalary").textContent = targetData.salary;
  document.getElementById("mSales").textContent = targetData.sales;
  document.getElementById("mRate").textContent = targetData.rate;
  document.getElementById("mReview").textContent = targetData.review;
  document.getElementById("mWelfare").textContent = targetData.welfare;

  const linkBtn = document.getElementById("mLinkBtn");
  linkBtn.onclick = () => window.open(targetData.link, "_blank");

  document.getElementById("companyModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("companyModal").classList.remove("active");
  document.body.style.overflow = "";
}

window.onclick = function(event) {
  const modal = document.getElementById("companyModal");
  if (event.target === modal) closeModal();
}

// ===================================================
// 🛠️ 학과별 최신 트렌드 자격증 세트
// ===================================================
const certificateDatabase = {
  machine: {
    engineers: ["전산응용기계제도기능사", "승강기기능사", "전기기능사", "설비보전기능사", "용접기능사", "컴퓨터응용선반기능사", "생산자동화기능사"],
    industrial: ["설비보전산업기사", "컴퓨터응용가공산업기사", "산업안전산업기사"]
  },
  electronics: {
    engineers: ["전기기능사", "전자기기기능사", "전자계산기기능사", "승강기기능사", "정보통신기능사", "무선설비기능사"],
    industrial: ["전기산업기사", "전자산업기사", "산업안전산업기사"]
  }
};

function updateDynamicCertificates() {
  const dept = document.getElementById("spec-dept").value;
  const certContainer = document.getElementById("dynamic-cert-list");
  if (!certContainer) return;
  
  certContainer.innerHTML = "";
  const data = certificateDatabase[dept];

  data.engineers.forEach((cert, index) => {
    certContainer.innerHTML += `
      <label class="check-item">
        <input type="checkbox" class="major-cert" data-type="기능사" value="eng-${index}"> 🛠️ ${cert}
      </label>
    `;
  });

  data.industrial.forEach((cert, index) => {
    certContainer.innerHTML += `
      <label class="check-item" style="color: #2563eb; font-weight:600;">
        <input type="checkbox" class="major-cert" data-type="산업기사" value="ind-${index}"> 🎖️ ${cert} (산기)
      </label>
    `;
  });
}

// ===================================================
// 🧮 정밀 스펙 엔진 연산단
// ===================================================
function analyzeAdvancedSpec() {
  const schoolElement = document.getElementById("spec-school");
  if(!schoolElement) return;
  
  const schoolName = schoolElement.options[schoolElement.selectedIndex].text;
  const grade = parseInt(document.getElementById("spec-grade").value);
  const award = document.getElementById("spec-award").value;
  const volunteerScore = parseInt(document.getElementById("spec-volunteer").value);
  
  const majorCerts = document.querySelectorAll(".major-cert:checked");
  let engineerCount = 0;
  let industrialCount = 0;
  
  majorCerts.forEach(cert => {
    if (cert.getAttribute("data-type") === "기능사") engineerCount++;
    if (cert.getAttribute("data-type") === "산업기사") industrialCount++;
  });

  const addCertCount = document.querySelectorAll(".add-cert:checked").length;
  const activityCount = document.querySelectorAll(".activity-check:checked").length;

  let totalScore = 0;
  if (grade === 1) totalScore += 35;
  if (grade === 2) totalScore += 28;
  if (grade === 3) totalScore += 18;
  if (grade === 5) totalScore += 8;

  totalScore += (engineerCount * 5);    
  totalScore += (industrialCount * 12);  
  totalScore += (addCertCount * 4);     
  totalScore += activityCount * 5;      

  if (volunteerScore === 100) totalScore += 8;
  else if (volunteerScore === 50) totalScore += 5;
  else if (volunteerScore === 20) totalScore += 2;

  if (award === "national") totalScore += 25;
  if (award === "provincial") totalScore += 18;
  if (award === "city") totalScore += 10;
  if (award === "school") totalScore += 5;

  const resultContainer = document.getElementById("spec-result");
  const resultText = document.getElementById("spec-result-text");
  
  let report = `현재 [${schoolName}]에 재학 중인 학생분의 최신 자격증 및 대외활동 데이터를 분석한 결과, 최종 취업 연동 점수는 [${totalScore}점] 입니다.\n\n`;

  if (totalScore >= 75) {
    report += "💎 [티어: 하이엔드 마이스터 (대기업/공기업 프리패스 합격 확률 95%)]\n현장 타깃형 자격증 라인업이 완벽하며 봉사 및 프로젝트 대외활동 카드가 아주 훌륭합니다. 현대차/기아 트랙이나 삼성전자 DS 공채, 에너지 공기업 서류는 합격 안정권입니다. 당장 자소서의 인성 문맥을 가다듬고 다차원 면접 시스템 준비에 집중하세요.";
  } else if (totalScore >= 50) {
    report += "✨ [티어: 엘리트 클래스 (합격 확률 75%)]\n기아 기술직, LIG넥스원 구미공장, 한화에어로스페이스 서류 합격을 무난하게 타깃할 수 있는 고고도 스펙입니다. 자소서에 팀 프로젝트나 전공 동아리 에피소드를 녹여 최종 합격을 굳히세요.";
  } else if (totalScore >= 30) {
    report += "👍 [티어: 포텐셜 스타 (합격 확률 50%)]\n2차전지 우량 중견기업이나 글로벌 반도체 장비 정비 전형에 안착하기 가장 좋은 균형 스펙입니다. 방학 기간 현장 실습이나 가산점 자격증(한국사 등)을 보완해 점수를 10점만 더 올리면 탑티어 대기업도 노려볼 만합니다.";
  } else {
    report += "⚠️ [티어: 스펙 빌드업 타깃 (합격 확률 30%)]\n최신 기능사 자격증 개수가 다소 부족하거나 석차/봉사시간 방어선이 미흡해 서류 경쟁에서 고전할 우려가 있습니다. 우선 핵심 기능사 취득 개수를 최소 2개 이상으로 업그레이드하고 교내 캡스톤 프로젝트 활동 스토리를 채우는 것을 적극 권장합니다.";
  }

  if (resultText && resultContainer) {
    resultText.innerText = report;
    resultContainer.style.display = "block";
    resultContainer.scrollIntoView({ behavior: 'smooth' });
  }
}
