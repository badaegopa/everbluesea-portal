export const navLinks = [
  { label: "분석", href: "#reports", tKey: "nav_analysis" },
  { label: "엔진", href: "#categories", tKey: "nav_engines" },
  { label: "논문", href: "#papers", tKey: "nav_papers" },
  { label: "연구소", href: "#about", tKey: "nav_institute" },
];

export const heroStats = [
  { value: "206", label: "개국 분석" },
  { value: "965,913", label: "ACLED 이벤트" },
  { value: "A0–A12", label: "사회구조 설계공리" },
  { value: "2", label: "SSRN 등재 논문" },
];

export const tickerItems = [
  "합계출산율 0.72 · 통계청 2025",
  "청년실업률 5.9% · KOSIS 2025",
  "1인 가구 비중 34.5% · 통계청",
  "실질임금 상승률 +1.8% · 고용노동부",
  "고령화율 19.7% · 행정안전부",
  "글로벌 CPI +2.4% · OECD 2025",
  "KOSPI 서킷브레이커 2025-06-23",
  "XAU/USD $3,941 · 2026-07-03",
  "한국 BSLI C등급 0.4627 · EBS 2026",
  "미국 UI −0.785 · REVERBANT 2026",
  "ACLED 글로벌 시위 965,913건 · 2026",
  "이란 2026 취성파괴 경보 · REVERBANT",
];

/* ══════════════════════════════════════════════════════════════════════════
   최신 분석 카드 — 자동 정렬·자동 밀어내기 체계 (2026-07-26 도입)
   ──────────────────────────────────────────────────────────────────────────
   ★ 새 보고서 추가 방법: 아래 featuredReports 배열에 항목 1개 추가만 하면 끝.
     - 위치는 아무 데나 넣어도 된다. date 기준으로 자동 정렬된다.
     - 카드가 FEATURED_MAX(5)개를 넘으면 가장 오래된 것이 자동으로 화면에서 빠진다.
       (배열에서 지우지 않아도 된다 — 데이터는 남고 노출만 밀려난다.
        /reports/{id} 직접 링크는 계속 살아 있다.)
     - pinned: true 를 붙인 항목은 날짜와 무관하게 항상 최상단에 고정된다.
       고정 항목이 여러 개면 그들끼리는 date 내림차순으로 정렬된다.
       현재 고정 2개 (2026-07-27 확정 — 2026 하반기 업데이트 때까지 유지):
         · r-007 Λ¹²·BSLI 통합 국가분석 정본 (138국 전수)
         · r-009 BSLI 2026 상반기 시계열 정본 (137국)
       두 정본은 하반기판이 나오면 **새 항목을 만들지 않고 이 두 항목을 갱신**한다.
       (그래야 고정 슬롯이 늘어나 최신분석 5칸을 잠식하지 않는다.)

   ★ 배포 전 필수 확인 2가지
     - public/images/cards/r-NNN.svg 존재 (Unsplash URL 금지 — 캐시 깨짐 이력)
     - public/reports/r-NNN.json 존재 (없으면 카드 클릭 시 404)

   ★ 이 파일 수정 시 반드시 giseu 최신본 pull 후 작업 (다운로드 구파일 덮어쓰기 금지)
   ══════════════════════════════════════════════════════════════════════════ */

/** 홈 최신분석 섹션에 동시에 노출할 카드 최대 개수 */
export const FEATURED_MAX = 5;

export type FeaturedReport = {
  id: string;
  category: string;
  categoryEn?: string;
  date: string;
  author: string;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  image: string;
  tone: "light" | "dark";
  /** true면 날짜와 무관하게 항상 최상단 고정 (버전업 전까지 유지) */
  pinned?: boolean;
};

export const featuredReports: FeaturedReport[] = [
  {
    id: "r-007",
    category: "Λ¹²v2.0 · BSLIv6.9 · 글로벌 전수",
    categoryEn: "Λ¹²v2.0 · BSLIv6.9 · Global Full Coverage",
    date: "2026-07-18",
    author: "김기섭",
    title: "Λ¹²·BSLI 통합 국가분석 — 138국 전수 산출 2026",
    titleEn: "Λ¹²·BSLI Joint National Analysis — 138 Countries Full Report 2026",
    excerpt: "η·BSLI 138국 전수 산출. Pearson r=0.7551 강한 양의 상관 확인. HH 안정번영 51국 / HL 민생위기 18국 / LH 민생선행 18국 / LL 이중취약 51국. 한국 HH·인도네시아 HL 확정.",
    excerptEn: "Full computation for 138 countries. Pearson r=0.7551 strong positive correlation confirmed. HH Stable Prosperity 51 / HL Livelihood Crisis 18 / LH Livelihood-Led 18 / LL Dual Vulnerability 51. Korea HH · Indonesia HL confirmed.",
    image: "/images/cards/r-007.svg",
    tone: "light" as const,
    pinned: true, // ★ 상단 고정 — 통합 국가분석 정본. 버전업 시 이 항목만 수정.
  },
  {
    id: "r-009",
    category: "BSLI v7.0 · 시계열 정본",
    categoryEn: "BSLI v7.0 · Canonical Time Series",
    date: "2026-07-26",
    author: "김기섭",
    title: "BSLI 2026 상반기 정본 — 137개국 기초사회생활지수 시계열 (2016–2024)",
    titleEn: "BSLI 2026 H1 Canon — Basic Social Life Index Time Series, 137 Countries (2016–2024)",
    excerpt: "서민층(소득 30~50분위) 衣食住 기층 압박을 137개국 × 2016–2024년, 1,002셀 시계열로 구축한 상반기 정본. 정본 대조 r=0.976 · F_ML 정합 r=0.988. 등급분포 A/B 22 · C 10 · D 16 · E 89 — 다수 국가가 기본생활선(0) 아래에 머문다. 국가별 2016→2024 궤적 스파크라인 수록.",
    excerptEn: "The first-half canon: food/housing pressure on the 30th–50th income percentiles across 137 countries × 2016–2024, 1,002 cells. Canon correlation r=0.976 · F_ML consistency r=0.988. Grades A/B 22 · C 10 · D 16 · E 89 — most countries remain below the basic-living line (0). Includes per-country 2016→2024 sparkline trajectories.",
    image: "/images/cards/r-009.svg",
    tone: "light" as const,
    pinned: true, // ★ 상단 고정 — BSLI 시계열 정본. 하반기판 나오면 이 항목을 갱신(신규 추가 금지).
  },
  {
    id: "r-008",
    category: "UI · BSLIv7.0 · 구독판 시리즈",
    categoryEn: "UI · BSLI v7.0 · Subscription Series",
    date: "2026-07-26",
    author: "김기섭",
    title: "봉기 코호트 구독판 4부작 — 압박 좌표계 시계열 실측 (이란·볼리비아·스리랑카·6국 비교)",
    titleEn: "Uprising Cohort Subscription Tetralogy — Pressure-Coordinate Time-Series Validation (Iran·Bolivia·Sri Lanka·6-Country Comparison)",
    excerpt: "압박 좌표계(Pressure Coordinate System)를 12차원 행성계 도식으로 구현한 첫 구독판 묶음. Λ¹² 시계열 v2.1(2016–2024) × BSLI v7.0, 임계대 P*=0.445806 기준으로 이란 제2호·볼리비아·스리랑카 단독편과 6개국 코호트 비교편을 한 시리즈로 묶어 판독한다.",
    excerptEn: "The first subscription bundle implementing the Pressure Coordinate System as a 12-dimension orbital diagram. Λ¹² time series v2.1 (2016–2024) × BSLI v7.0, critical band P*=0.445806 — Iran Vol.2, Bolivia and Sri Lanka standalone editions plus the 6-country cohort comparison, read as one series.",
    image: "/images/cards/r-008.svg",
    tone: "light" as const,
  },
  {
    id: "r-006",
    category: "UI · 봉기지수",
    categoryEn: "UI · Uprising Index",
    date: "2026-07-17",
    author: "김기섭",
    title: "인도네시아 봉기경로 진단 — T_trigger 5개 시나리오와 백색왜성 55%",
    titleEn: "Indonesia Uprising-Path Diagnosis — Five T_trigger Scenarios and a 55% White Dwarf",
    excerpt: "η=0.617, 백색왜성 경로 55%. 수카르노에서 프라보워까지의 계보 위에서, 이슬람 87% 사회를 묶어온 판차실라의 균열을 12차원 테이블·BSLI 공식 전개·T_trigger 5개 시나리오로 진단한다.",
    excerptEn: "η=0.617, a 55% White Dwarf path. From Sukarno to Prabowo, a diagnosis of the cracks in Pancasila — the covenant of an 87%-Muslim society — via the 12-dimension table, full BSLI derivation, and five T_trigger scenarios.",
    image: "/images/cards/r-006.svg",
    tone: "light" as const,
  },
  {
    id: "r-005",
    category: "§36 SCDI · 공급망교란지수",
    categoryEn: "§36 SCDI · Supply Chain Disruption",
    date: "2026-07-14",
    author: "김기섭",
    title: "쓰나미는 구매력 순서로 도착한다 — 러시아 경유 수출금지 2026",
    titleEn: "The Tsunami Arrives in Order of Purchasing Power — Russia's Diesel Ban 2026",
    excerpt: "우크라이나가 러시아 정제계통에 1년간 축적시킨 강제 진동이 수출금지라는 통로로 세계에 방출됐다. 튀르키예·브라질·이집트·세네갈 — 같은 파도, 다른 방파제. 국가별 전달률 T_sc 확장 제안 수록.",
    excerptEn: "A year of forced vibration in Russia's refining system, released through an export ban into the world. Turkey, Brazil, Egypt, Senegal — the same wave, different seawalls. Includes the proposed country-level transmissibility extension T_sc.",
    image: "/images/cards/r-005.svg",
    tone: "light" as const,
  },
  {
    id: "r-004",
    category: "UI · 봉기지수",
    categoryEn: "UI · Uprising Index",
    date: "2026-07-12",
    author: "김기섭",
    title: "압력은 왜 반발이 아닌 희망이 되었나 — 베네수엘라·이란 2026",
    titleEn: "Why Pressure Became Hope, Not Backlash — Venezuela & Iran 2026",
    excerpt: "지도자를 빼앗긴 국가와 학살로 버틴 국가. 희망 벡터 역전, 기대-배신 격차 G(t), 그리고 역사 표본 11건이 가리키는 외생 버팀목 체제의 세 가지 종점.",
    excerptEn: "A state whose leader was seized and a state that survived by massacre. Hope-vector inversion, the expectation-betrayal gap G(t), and the three historical endpoints of externally propped regimes.",
    image: "/images/cards/r-004.svg",
    tone: "dark" as const,
  },
  {
    id: "r-001",
    category: "REVERBANT · 글로벌 실증",
    categoryEn: "REVERBANT · Global Validation",
    date: "2026-07-03",
    author: "김기섭",
    title: "965,913건의 데이터가 말하는 것 — 봉기는 어떻게 시작되는가",
    titleEn: "What 965,913 Data Points Tell Us — How Uprisings Begin",
    excerpt: "ACLED 전역 데이터와 REVERBANT v1.1 프레임워크의 완전 통합. 공리 A0~A12가 실증하는 도화선·화약·폭발의 물리학.",
    excerptEn: "Full integration of ACLED global data with REVERBANT v1.1. Axioms A0–A12 demonstrate the physics of trigger, powder, and explosion.",
    image: "/images/cards/r-001.svg",
    tone: "dark" as const,
  },
];

/* ── 파생 목록 (수동 관리 불필요) ─────────────────────────────────────────── */

/** date 문자열(YYYY-MM-DD) 내림차순 — 사전순 비교로 충분한 고정 포맷 */
const byDateDesc = (a: FeaturedReport, b: FeaturedReport) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0;

/**
 * 홈 최신분석 섹션이 실제로 렌더링하는 목록.
 * 고정(pinned) 항목이 먼저, 그 아래 나머지가 날짜 내림차순.
 * 총 FEATURED_MAX개를 넘으면 가장 오래된 항목부터 자동으로 노출에서 제외된다.
 * (filter가 새 배열을 만들므로 sort가 원본 featuredReports를 훼손하지 않는다.)
 */
export const featuredReportsVisible: FeaturedReport[] = [
  ...featuredReports.filter((r) => r.pinned).sort(byDateDesc),
  ...featuredReports.filter((r) => !r.pinned).sort(byDateDesc),
].slice(0, FEATURED_MAX);

/** 노출 목록 중 가장 최근 날짜 (고정 항목 포함) — 섹션 헤더 스탬프용 */
export const featuredLatestDate: string =
  [...featuredReportsVisible].sort(byDateDesc)[0]?.date ?? "";

/** 섹션 헤더 스탬프 예: "2026.07 · 05" (최신 연·월 · 노출 카드 수) */
export const featuredStamp: string = (() => {
  const [y, m] = featuredLatestDate.split("-");
  const count = String(featuredReportsVisible.length).padStart(2, "0");
  return y && m ? `${y}.${m} · ${count}` : count;
})();

export const mainCategories = [
  {
    id: "cat-national",
    label: "국가 분석 보고서",
    labelEn: "National Analysis",
    engineKey: "lambda",
    engineLabel: "Λ¹²",
    count: 156,
    subFilters: ["전체", "권역별", "단독"],
    subFiltersEn: ["All", "Regional", "Standalone"],
    topics: ["지정학", "정치", "경제", "사회"],
    topicsEn: ["Geopolitics", "Politics", "Economy", "Society"],
    isCore: true,
    image: "https://readdy.ai/api/search-image?query=Aerial%20drone%20photography%20of%20modern%20global%20capital%20city%20skyline%20at%20golden%20hour&width=800&height=600&seq=cat-national-01&orientation=landscape",
  },
  {
    id: "cat-bsli",
    label: "기초사회생활지수",
    labelEn: "Basic Social Life Index",
    engineKey: "bsli",
    engineLabel: "BSLI",
    count: 203,
    subFilters: ["전체", "권역별", "단독"],
    subFiltersEn: ["All", "Regional", "Standalone"],
    topics: ["의(衣)", "식(食)", "주(住)"],
    topicsEn: ["Clothing", "Food", "Housing"],
    isCore: true,
    image: "https://readdy.ai/api/search-image?query=Street%20level%20candid%20photography%20of%20diverse%20urban%20residents%20daily%20life&width=800&height=600&seq=cat-bsli-02&orientation=landscape",
  },
  {
    id: "cat-reverbant",
    label: "리버번트",
    labelEn: "REVERBANT",
    engineKey: "reverbant",
    engineLabel: "REVERBANT",
    count: 89,
    subFilters: ["전체", "권역별", "단독"],
    subFiltersEn: ["All", "Regional", "Standalone"],
    topics: ["섭동", "반응", "회복", "임계"],
    topicsEn: ["Perturbation", "Response", "Recovery", "Threshold"],
    isCore: true,
    image: "https://readdy.ai/api/search-image?query=Abstract%20scientific%20visualization%20wave%20patterns%20interference%20dynamics&width=800&height=600&seq=cat-reverbant-03&orientation=landscape",
  },
  {
    id: "cat-ui",
    label: "봉기지수",
    labelEn: "Uprising Index",
    engineKey: "ui",
    engineLabel: "UI",
    count: 74,
    subFilters: ["전체", "권역별", "단독"],
    subFiltersEn: ["All", "Regional", "Standalone"],
    topics: ["민중", "제도", "촉발", "임계"],
    topicsEn: ["People", "Institution", "Trigger", "Threshold"],
    isCore: true,
    image: "https://readdy.ai/api/search-image?query=Wide%20angle%20documentary%20photograph%20peaceful%20public%20demonstration%20historic%20city%20square&width=800&height=600&seq=cat-ui-04&orientation=landscape",
  },
  {
    id: "cat-bbd",
    label: "버블붕괴탐지기",
    labelEn: "Bubble & Burst Detector",
    engineKey: "bbd",
    engineLabel: "§33 BBD",
    count: 38,
    subFilters: ["전체", "권역별", "단독"],
    subFiltersEn: ["All", "Regional", "Standalone"],
    topics: ["버블", "붕괴", "주기"],
    topicsEn: ["Bubble", "Collapse", "Cycle"],
    isCore: false,
    image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800&q=80",
  },
  {
    id: "cat-gei",
    label: "지니경제불평등지수",
    labelEn: "Gini Economic Inequality Index",
    engineKey: "gei",
    engineLabel: "§34 GEI",
    count: 45,
    subFilters: ["전체", "권역별", "단독"],
    subFiltersEn: ["All", "Regional", "Standalone"],
    topics: ["불평등", "지니", "계층"],
    topicsEn: ["Inequality", "Gini", "Stratification"],
    isCore: false,
    image: "https://readdy.ai/api/search-image?query=Atmospheric%20post%20industrial%20landscape%20abandoned%20factory&width=800&height=600&seq=cat-gei-06&orientation=landscape",
  },
  {
    id: "cat-nci",
    label: "국가역량지수",
    labelEn: "National Capacity Index",
    engineKey: "nci",
    engineLabel: "§35 NCI",
    count: 29,
    subFilters: ["전체", "권역별", "단독"],
    subFiltersEn: ["All", "Regional", "Standalone"],
    topics: ["국가역량", "제도", "위기"],
    topicsEn: ["State Capacity", "Institution", "Crisis"],
    isCore: false,
    image: "https://readdy.ai/api/search-image?query=Nuclear%20power%20plant%20cooling%20towers%20storm%20clouds&width=800&height=600&seq=cat-nci-07&orientation=landscape",
  },
  {
    id: "cat-scdi",
    label: "공급망교란지수",
    labelEn: "Supply Chain Disruption Index",
    engineKey: "scdi",
    engineLabel: "§36 SCDI",
    count: 33,
    subFilters: ["전체", "권역별", "단독"],
    subFiltersEn: ["All", "Regional", "Standalone"],
    topics: ["공급망", "무역", "지정학"],
    topicsEn: ["Supply Chain", "Trade", "Geopolitics"],
    isCore: false,
    image: "https://readdy.ai/api/search-image?query=Aerial%20view%20container%20port%20terminal%20shipping&width=800&height=600&seq=cat-scdi-08&orientation=landscape",
  },
  {
    id: "cat-ppi",
    label: "권력기생지수",
    labelEn: "Power Parasite Index",
    engineKey: "ppi",
    engineLabel: "§37 PPI",
    count: 51,
    subFilters: ["전체", "권역별", "단독"],
    subFiltersEn: ["All", "Regional", "Standalone"],
    topics: ["권력기생", "포획", "책임"],
    topicsEn: ["Power Parasite", "Capture", "Accountability"],
    isCore: false,
    image: "https://readdy.ai/api/search-image?query=Government%20institutional%20building%20classical%20columns%20authority&width=800&height=600&seq=cat-ppi-09&orientation=landscape",
  },
  {
    id: "cat-press",
    label: "언론 브리핑룸",
    labelEn: "Press Briefing Room",
    engineKey: "",
    engineLabel: "PRESS",
    count: 0,
    subFilters: ["전체", "국내", "해외", "분석"],
    subFiltersEn: ["All", "Domestic", "Global", "Analysis"],
    topics: ["정치", "경제", "사회", "국제"],
    topicsEn: ["Politics", "Economy", "Society", "International"],
    isCore: false,
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  },
  {
    id: "cat-axioms",
    label: "사회구조 설계공리",
    labelEn: "Social Structure Design Axioms",
    engineKey: "axioms",
    engineLabel: "A0—A12",
    count: 13,
    subFilters: [],
    subFiltersEn: [],
    topics: [],
    topicsEn: [],
    isCore: false,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  },
  {
    id: "cat-empty-2",
    label: "준비중",
    labelEn: "Coming Soon",
    engineKey: "",
    engineLabel: "COMING SOON",
    count: 0,
    subFilters: [],
    subFiltersEn: [],
    topics: [],
    topicsEn: [],
    isCore: false,
    image: "",
  },
];

export const aboutImages = {
  left: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80",
  right:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
};

export const testimonials = [
  {
    quote:
      "숫자 뒤에 숨은 사회의 결을 읽어내는 방식이 남다릅니다. 정책 기획 회의에서 매번 인용하는 리포트예요.",
    name: "정하늘",
    role: "국책 연구원 · 사회정책실",
    rating: 4.9,
    avatar:
      "https://readdy.ai/api/search-image?query=Editorial%20portrait%20photograph%20of%20professional%20Korean%20woman%20in%20her%20forties%20wearing%20cream%20turtleneck%20sweater%20with%20soft%20natural%20window%20light%2C%20muted%20warm%20background%2C%20magazine%20quality%20portrait%20photography%2C%20confident%20warm%20expression&width=200&height=200&seq=avatar-jung-01&orientation=squarish",
  },
  {
    quote:
      "차트 하나에도 방법론과 원출처가 다 명시되어 있어서 뉴스룸에서 바로 인용할 수 있습니다.",
    name: "윤태오",
    role: "경제 일간지 · 데이터저널리즘팀 리드",
    rating: 5.0,
    avatar:
      "https://readdy.ai/api/search-image?query=Editorial%20portrait%20photograph%20of%20professional%20Korean%20man%20in%20his%20thirties%20wearing%20forest%20green%20shirt%20with%20soft%20natural%20window%20light%2C%20muted%20cream%20background%2C%20magazine%20quality%20portrait%20photography%2C%20thoughtful%20confident%20expression&width=200&height=200&seq=avatar-yoon-02&orientation=squarish",
  },
  {
    quote:
      "전략 리포트 작성 시간이 절반으로 줄었어요. 데이터 큐레이션 품질이 압도적입니다.",
    name: "Sarah Kim",
    role: "글로벌 컨설팅 · 리서치 매니저",
    rating: 4.8,
    avatar:
      "https://readdy.ai/api/search-image?query=Editorial%20portrait%20photograph%20of%20professional%20Asian%20woman%20in%20her%20thirties%20with%20short%20hair%20wearing%20cream%20blazer%20in%20soft%20natural%20light%2C%20muted%20warm%20neutral%20background%2C%20high%20end%20magazine%20portrait%20photography%2C%20warm%20confident%20expression&width=200&height=200&seq=avatar-sarah-03&orientation=squarish",
  },
];

export const partners = [
  "ACLED",
  "SSRN",
  "World Bank",
  "UN Stats",
  "Eurostat",
  "IMF",
  "한국은행",
];
