export interface AxiomItem {
  id: string;
  name: string;
  summary: string;
  detail: string;
  formula?: string;
  isNew?: boolean;
}

export interface FormulaItem {
  expression: string;   // 수식 (LaTeX-like 텍스트)
  description: string;  // 수식 설명
  variables: { symbol: string; meaning: string }[];  // 기호 설명
}

export interface EngineDetail {
  key: string;
  label: string;
  version: string;
  nameKo: string;
  nameEn: string;
  accent: string;
  whatItMeasures: string;
  whatItMeasuresEn: string;
  whyBuilt: string;
  whyBuiltEn: string;
  formulas: FormulaItem[];
  keyVariables: string[];
  dataSources: { name: string; url: string }[];
  classification: string;
  classificationEn: string;
  axioms?: AxiomItem[];
  axiomsQuote?: string;
  axiomsQuoteBy?: string;
}

export const engineDetails: Record<string, EngineDetail> = {
  lambda: {
    key: "lambda",
    label: "Λ¹²",
    version: "SSRN 6632858",
    nameKo: "국가 사회동역학 지수",
    nameEn: "National Sociodynamic Index",
    accent: "#5E9186",
    whatItMeasures:
      "국가 단위의 사회동역학적 안정성과 변동성을 정치·경제·사회·제도·인구·환경·기술·문화·교육·보건·인프라·정보 등 12개 축에서 종합 측정합니다.",
    whatItMeasuresEn:
      "Measures national sociodynamic stability across 12 dimensions: politics, economy, society, institutions, demographics, environment, technology, culture, education, health, infrastructure, and information.",
    whyBuilt:
      "기존 GDP 중심 평가 체계가 포착하지 못하는 사회 동적 구조와 취약성을 정량화하기 위해 개발됐습니다. 선진국-개발도상국 간 범용 비교 프레임워크 부재를 해소합니다.",
    whyBuiltEn:
      "Developed to quantify social structural vulnerabilities overlooked by GDP-centric evaluation systems. Provides a universal comparative framework bridging developed and developing nations.",
    formulas: [
      {
        expression: "Λ¹² = Σᵢ(wᵢ · Aᵢ) + CI",
        description: "12개 차원의 가중합에 부패지수를 외부 선행변수로 추가한 핵심 공식",
        variables: [
          { symbol: "Aᵢ", meaning: "i번째 차원 지수 (A1~A12), 각각 정규화된 0~1 스칼라" },
          { symbol: "wᵢ", meaning: "차원별 가중치 (3단계 교차검증으로 결정)" },
          { symbol: "CI", meaning: "Corruption Index — 외부 선행변수, Transparency International CPI 기반" },
          { symbol: "Λ¹²", meaning: "최종 국가 사회동역학 지수 (낮을수록 안정)" },
        ],
      },
      {
        expression: "G-T Core = (A2 + A8) / 2",
        description: "거버넌스(A2)와 신뢰(A8)의 평균 — 체제 안정성의 핵심축",
        variables: [
          { symbol: "A2", meaning: "거버넌스 지수 — WGI 6개 지표 종합" },
          { symbol: "A8", meaning: "사회신뢰 지수 — World Values Survey 기반" },
          { symbol: "G-T Core", meaning: "거버넌스-신뢰 핵심 지수, 임계값 −0.5 이하 시 불안정" },
        ],
      },
    ],
    keyVariables: ["A1~A12 (12차원)", "G-T Core", "CI (부패지수)", "206개국"],
    dataSources: [
      { name: "World Bank Open Data", url: "https://data.worldbank.org" },
      { name: "UN Stats Division", url: "https://unstats.un.org" },
      { name: "IMF World Economic Outlook", url: "https://imf.org/weo" },
      { name: "ACLED Conflict Data", url: "https://acleddata.com" },
      { name: "Transparency International CPI", url: "https://transparency.org" },
    ],
    classification: "S(최안정) · A · B · C · D · E(최위험)",
    classificationEn: "S(most stable) · A · B · C · D · E(most at risk)",
  },

  bsli: {
    key: "bsli",
    label: "BSLI",
    version: "v6.9 · SSRN 6806478",
    nameKo: "기초사회생활지수",
    nameEn: "Basic Social Life Index",
    accent: "#B8850E",
    whatItMeasures:
      "개인과 가구의 기초적 삶의 수준을 衣(의류)·食(식료)·住(주거) 삼중계로 측정합니다. 139개국 비교 분석.",
    whatItMeasuresEn:
      "Measures basic living standards through the triple axis of Clothing, Food, and Housing across 139 countries.",
    whyBuilt:
      "GDP가 포착하지 못하는 서민의 실제 삶의 질을 측정합니다. 도시-농촌 격차, 세대 간 불평등을 공간적으로 정량화합니다.",
    whyBuiltEn:
      "Measures the real quality of life for ordinary people that GDP cannot capture, with spatial quantification of urban-rural gaps and intergenerational inequality.",
    formulas: [
      {
        expression: "BSLI = 0.40·F_ML + 0.60·H − D − Hs",
        description: "삼중계 가중평균 — 衣·食·住 각 축의 정규화 지수 합산",
        variables: [
          { symbol: "衣", meaning: "의류 지수 — 의복 지출/소득 비율, 계절 적응성" },
          { symbol: "食", meaning: "식료 지수 — 칼로리 충족률, 식품 안전성, 접근성" },
          { symbol: "住", meaning: "주거 지수 — 주거비/소득 비율, 과밀도, 위생" },
          { symbol: "W_x", meaning: "각 축 가중치 (국가 발전 단계별 조정)" },
          { symbol: "BSLI", meaning: "0~1 정규화, 높을수록 고통 심화" },
        ],
      },

    ],
    keyVariables: ["衣·食·住 삼중계", "139개국", "Min-Max 정규화", "H₂O 공리"],
    dataSources: [
      { name: "World Bank Poverty & Inequality", url: "https://pip.worldbank.org" },
      { name: "FAO Food Security Data", url: "https://fao.org/faostat" },
      { name: "OECD Better Life Index", url: "https://oecdbetterlifeindex.org" },
      { name: "KOSIS 인구주택총조사", url: "https://kosis.kr" },
      { name: "국토교통부 실거래가 API", url: "https://data.go.kr" },
    ],
    classification: "A(0.0~0.2) · B(0.2~0.4) · C(0.4~0.6) · D(0.6~0.8) · E(0.8+) · 한국 C(0.463)",
    classificationEn: "A(0.0–0.2) · B(0.2–0.4) · C(0.4–0.6) · D(0.6–0.8) · E(0.8+) · Korea C(0.463)",
  },

  reverbant: {
    key: "reverbant",
    label: "REVERBANT",
    version: "v1.1 · 2026-07-03",
    nameKo: "동적 섭동 반응 엔진",
    nameEn: "Dynamic Social Perturbation Response Engine",
    accent: "#7B5EA7",
    whatItMeasures:
      "사회 시스템이 외부 충격(섭동)에 어떻게 반응하고 재구조화되는지를 비선형 동역학으로 측정합니다. ACLED 965,913행 전수 검증 완료.",
    whatItMeasuresEn:
      "Measures how social systems respond and restructure after external shocks using nonlinear dynamics. Validated against 965,913 ACLED global conflict events.",
    whyBuilt:
      "작은 충격이 연쇄 임계 전환을 일으키는 사회 비선형성을 사전 감지하기 위해 구축됐습니다. 물리학의 임피던스·공명 원리를 사회 시스템에 적용한 최초 모델입니다.",
    whyBuiltEn:
      "Built to detect nonlinear social transitions where small perturbations trigger cascading threshold shifts. The first model applying physics impedance and resonance principles to social systems.",
    formulas: [
      {
        expression: "UI(t) = η·E_A2 − P_BSLI/σ(GT) − C_internal",
        description: "봉기지수 핵심 방정식 — 사회 압력과 내부 응집력의 균형",
        variables: [
          { symbol: "η", meaning: "사회구조 안정성 계수 (Λ¹² A2 기반)" },
          { symbol: "E_A2", meaning: "거버넌스 탄성 지수" },
          { symbol: "P_BSLI", meaning: "BSLI 기반 사회 압력 벡터" },
          { symbol: "σ(GT)", meaning: "G-T Core 표준편차 — 시스템 변동성" },
          { symbol: "C_internal", meaning: "내부 응집력 계수 (사회적 자본)" },
          { symbol: "UI(t)", meaning: "시간 t에서의 봉기지수, 음수일수록 위험" },
        ],
      },
      {
        expression: "T_trigger = δ_{L-1} / [P_BSLI · (1 − E_A2)]",
        description: "도화선 임계 시간 — 섭동이 폭발로 전환되는 예측 시점",
        variables: [
          { symbol: "δ_{L-1}", meaning: "선행 레이어 임피던스 불일치량" },
          { symbol: "P_BSLI", meaning: "누적 사회 압력" },
          { symbol: "E_A2", meaning: "탄성 계수 (1에 가까울수록 회복력 강함)" },
          { symbol: "T_trigger", meaning: "예측 임계 도달 시간 (단위: 월)" },
        ],
      },
      {
        expression: "Γ = (Z_L0 − Z_A8) / (Z_L0 + Z_A8)",
        description: "반사 계수 — 충격 에너지가 사회에 흡수되지 못하고 반사되는 비율",
        variables: [
          { symbol: "Z_L0", meaning: "충격 임피던스 (외부 압력 강도)" },
          { symbol: "Z_A8", meaning: "사회 임피던스 (신뢰·응집력 기반 저항)" },
          { symbol: "Γ", meaning: "반사 계수, 1에 가까울수록 사회 충격 흡수 불가" },
        ],
      },
    ],
    keyVariables: ["A0~A12 공리", "UI(t)", "T_trigger", "Γ(반사계수)", "ACLED 965,913행"],
    dataSources: [
      { name: "ACLED Conflict Event Data", url: "https://acleddata.com" },
      { name: "GDELT Global News Monitor", url: "https://gdeltproject.org" },
      { name: "World Bank WGI", url: "https://info.worldbank.org/governance/wgi" },
      { name: "Google Trends API", url: "https://trends.google.com" },
    ],
    classification: "탄성복원(Elastic) / 소성변형(Plastic) / 취성파괴(Brittle)",
    classificationEn: "Elastic Recovery / Plastic Deformation / Brittle Fracture",
  },

  ui: {
    key: "ui",
    label: "UI",
    version: "논문 검토중",
    nameKo: "봉기지수",
    nameEn: "Uprising Index",
    accent: "#2980b9",
    whatItMeasures:
      "사회 내 봉기 가능성을 정치·경제·사회·심리 4개 축에서 정량화합니다. 표면적 안정 사회의 잠재 위험까지 포착하는 선행 지표입니다.",
    whatItMeasuresEn:
      "Quantifies the probability of social uprising across political, economic, social, and psychological axes. A leading indicator that captures latent risks even in seemingly stable societies.",
    whyBuilt:
      "사후 지표(집회·시위 건수)에 의존하는 기존 모델의 한계를 넘어, 사건 발생 이전 단계 신호를 포착합니다. 인프라 데이터와 SNS 감정 분석을 결합합니다.",
    whyBuiltEn:
      "Transcends existing models that rely on lagging indicators, capturing pre-event signals by combining infrastructure data with social media sentiment analysis.",
    formulas: [
      {
        expression: "UI(t) = η·E_A2 − P_BSLI/σ(GT) − C_internal",
        description: "봉기지수 핵심 방정식 (REVERBANT UI 방정식과 동일 기반)",
        variables: [
          { symbol: "UI > 0", meaning: "안정 구간 — 사회 응집력이 압력을 초과" },
          { symbol: "UI = 0", meaning: "임계점 — 미세 충격에도 전환 가능" },
          { symbol: "UI < 0", meaning: "위험 구간 — 봉기 조건 형성" },
          { symbol: "C_internal", meaning: "내부 응집력, 한국 0.72 / 미국 0.28" },
        ],
      },
      {
        expression: "E_WD=0 / E_SN=0.35 / E_BH=0.70",
        description: "탄성 단계 분류 — 사회가 충격을 흡수하는 능력의 3단계",
        variables: [
          { symbol: "E_WD = 0", meaning: "완전 비탄성 — 충격 직접 전달, 즉각 폭발" },
          { symbol: "E_SN = 0.35", meaning: "반탄성 — 충격 35% 흡수, 지연 반응" },
          { symbol: "E_BH = 0.70", meaning: "고탄성 — 충격 70% 흡수, 회복 가능" },
        ],
      },
    ],
    keyVariables: ["UI(t)", "E_WD/SN/BH", "G-T Core", "C_internal"],
    dataSources: [
      { name: "ACLED Protest Data", url: "https://acleddata.com" },
      { name: "Worldwide Governance Indicators", url: "https://info.worldbank.org/governance/wgi" },
      { name: "Transparency International CPI", url: "https://transparency.org" },
      { name: "V-Dem Electoral Democracy Index", url: "https://v-dem.net" },
      { name: "X(Twitter) Academic API", url: "https://developer.twitter.com" },
    ],
    classification: "UI > 0 안정 / UI = 0 임계 / UI < 0 위험",
    classificationEn: "UI > 0 Stable / UI = 0 Critical / UI < 0 Danger",
  },

  bbd: {
    key: "bbd",
    label: "§33 BBD",
    version: "Λ¹² 하위엔진",
    nameKo: "버블붕괴탐지기",
    nameEn: "Bubble & Burst Detector",
    accent: "#C0392B",
    whatItMeasures: "자산 가격 버블의 형성·팽창·붕괴 주기를 실시간 감지합니다. 주식·부동산·가상자산 시장의 비선형 가격 동학을 분석해 임계 붕괴 시점을 사전 탐지합니다.",
    whatItMeasuresEn: "Detects the formation, expansion, and collapse cycles of asset price bubbles in real time across equity, real estate, and crypto markets.",
    whyBuilt: "금융 위기는 사회 불안정의 핵심 촉발 요인입니다. Λ¹² A5(경제) 차원의 선행 신호로 버블 붕괴를 포착해 사회동역학 예측 정확도를 높입니다.",
    whyBuiltEn: "Financial crises are key triggers of social instability. BBD captures bubble collapse as a leading signal for Λ¹² A5 (Economy) to improve sociodynamic forecasting.",
    formulas: [
      {
        expression: "BBD = (P_t − MA_n) / σ_n > θ_c",
        description: "현재 가격이 이동평균 대비 임계 표준편차를 초과할 때 버블 신호 발생",
        variables: [
          { symbol: "P_t", meaning: "t 시점 자산 가격" },
          { symbol: "MA_n", meaning: "n기간 이동평균" },
          { symbol: "σ_n", meaning: "n기간 가격 표준편차" },
          { symbol: "θ_c", meaning: "임계 배수 (통상 2.0~2.5σ)" },
          { symbol: "BBD > 1", meaning: "버블 구간 진입 신호" },
        ],
      },
    ],
    keyVariables: ["버블 임계값 θ_c", "이동평균 MA_n", "σ 표준편차", "붕괴 주기"],
    dataSources: [
      { name: "Yahoo Finance API", url: "https://finance.yahoo.com" },
      { name: "KRX 한국거래소", url: "https://data.krx.co.kr" },
      { name: "BIS 국제결제은행", url: "https://www.bis.org/statistics" },
      { name: "FRED Federal Reserve", url: "https://fred.stlouisfed.org" },
    ],
    classification: "정상(Normal) / 과열(Overheated) / 버블(Bubble) / 붕괴(Burst)",
    classificationEn: "Normal / Overheated / Bubble / Burst",
  },

  gei: {
    key: "gei",
    label: "§34 GEI",
    version: "Λ¹² 하위엔진",
    nameKo: "지니경제불평등지수",
    nameEn: "Gini Economic Inequality Index",
    accent: "#8E44AD",
    whatItMeasures: "소득·자산 불평등의 구조적 심화도를 지니계수 기반으로 측정합니다. 단순 지니계수를 넘어 세대 간·지역 간 불평등 이동성까지 포착합니다.",
    whatItMeasuresEn: "Measures structural deepening of income and asset inequality beyond simple Gini coefficients, capturing intergenerational and regional inequality mobility.",
    whyBuilt: "불평등은 봉기지수(UI)의 핵심 구성요소입니다. GEI는 Λ¹² A3(사회) 차원의 정밀 측정을 위해 설계됐습니다.",
    whyBuiltEn: "Inequality is a core component of the Uprising Index. GEI was designed for precise measurement of the Λ¹² A3 (Society) dimension.",
    formulas: [
      {
        expression: "G = 1 − Σᵢ(Xᵢ − Xᵢ₋₁)(Yᵢ + Yᵢ₋₁)",
        description: "로렌츠 곡선 기반 지니계수 — 완전평등(0)에서 완전불평등(1)까지",
        variables: [
          { symbol: "Xᵢ", meaning: "누적 인구 비율 (i번째 분위)" },
          { symbol: "Yᵢ", meaning: "누적 소득 비율" },
          { symbol: "G = 0", meaning: "완전 평등" },
          { symbol: "G = 1", meaning: "완전 불평등" },
          { symbol: "G > 0.4", meaning: "사회 불안정 임계 구간" },
        ],
      },
    ],
    keyVariables: ["지니계수 G", "로렌츠 곡선", "세대 이동성", "지역 격차"],
    dataSources: [
      { name: "World Bank Poverty & Inequality", url: "https://pip.worldbank.org" },
      { name: "OECD Income Distribution", url: "https://stats.oecd.org" },
      { name: "LIS Cross-National Data", url: "https://www.lisdatacenter.org" },
      { name: "통계청 가계금융복지조사", url: "https://kosis.kr" },
    ],
    classification: "평등(G<0.3) / 보통(0.3~0.4) / 불평등(0.4~0.5) / 극단(G>0.5)",
    classificationEn: "Equal(G<0.3) / Moderate(0.3–0.4) / Unequal(0.4–0.5) / Extreme(G>0.5)",
  },

  nci: {
    key: "nci",
    label: "§35 NCI",
    version: "Λ¹² 하위엔진",
    nameKo: "국가역량지수",
    nameEn: "National Capacity Index",
    accent: "#1A5276",
    whatItMeasures: "국가가 공공재를 공급하고 위기에 대응하는 제도적 역량을 측정합니다. 행정 효율성·법치·위기대응·공공재정 4개 축으로 구성됩니다.",
    whatItMeasuresEn: "Measures a state's institutional capacity to provide public goods and respond to crises across four axes: administrative efficiency, rule of law, crisis response, and public finance.",
    whyBuilt: "취약국가는 외부 충격에 극도로 취약합니다. NCI는 Λ¹² A4(제도) 차원의 국가 붕괴 위험을 조기 경보합니다.",
    whyBuiltEn: "Fragile states are extremely vulnerable to external shocks. NCI provides early warning of state collapse risk for the Λ¹² A4 (Institution) dimension.",
    formulas: [
      {
        expression: "NCI = w₁·Admin + w₂·Law + w₃·Crisis + w₄·Finance",
        description: "행정·법치·위기대응·재정 4개 축의 가중합",
        variables: [
          { symbol: "Admin", meaning: "행정 효율성 — WGI Government Effectiveness" },
          { symbol: "Law", meaning: "법치 지수 — WGI Rule of Law" },
          { symbol: "Crisis", meaning: "위기대응 역량 — INFORM Risk Index 역수" },
          { symbol: "Finance", meaning: "공공재정 건전성 — IMF Fiscal Monitor" },
          { symbol: "wᵢ", meaning: "각 축 가중치 (합산 1.0)" },
        ],
      },
    ],
    keyVariables: ["행정효율성", "법치지수", "위기대응", "공공재정"],
    dataSources: [
      { name: "World Bank WGI", url: "https://info.worldbank.org/governance/wgi" },
      { name: "INFORM Risk Index", url: "https://drmkc.jrc.ec.europa.eu/inform-index" },
      { name: "IMF Fiscal Monitor", url: "https://imf.org/fiscal-monitor" },
      { name: "Fund for Peace FSI", url: "https://fragilestatesindex.org" },
    ],
    classification: "강건(NCI>0.7) / 보통(0.4~0.7) / 취약(0.2~0.4) / 붕괴위험(NCI<0.2)",
    classificationEn: "Robust(>0.7) / Moderate(0.4–0.7) / Fragile(0.2–0.4) / Collapse Risk(<0.2)",
  },

  scdi: {
    key: "scdi",
    label: "§36 SCDI",
    version: "Λ¹² 하위엔진",
    nameKo: "공급망교란지수",
    nameEn: "Supply Chain Disruption Index",
    accent: "#117A65",
    whatItMeasures: "글로벌 공급망의 교란 강도와 전파 속도를 측정합니다. 지정학적 리스크·물류 병목·에너지 가격 급등이 사회 압력으로 전환되는 경로를 추적합니다.",
    whatItMeasuresEn: "Measures the intensity and propagation speed of global supply chain disruptions, tracking how geopolitical risk, logistics bottlenecks, and energy price spikes translate into social pressure.",
    whyBuilt: "공급망 충격은 인플레이션을 통해 BSLI 衣·食·住 전 축에 즉각 파급됩니다. SCDI는 Λ¹² A5(경제) + A11(인프라) 연계 선행 지표입니다.",
    whyBuiltEn: "Supply chain shocks propagate immediately across all BSLI axes through inflation. SCDI is a leading indicator linking Λ¹² A5 (Economy) and A11 (Infrastructure).",
    formulas: [
      {
        expression: "SCDI = Σⱼ(Dⱼ · Wⱼ · Vⱼ) / N",
        description: "품목별 교란 강도·가중치·변동성의 가중평균",
        variables: [
          { symbol: "Dⱼ", meaning: "j 품목 교란 강도 (정상 대비 납기 지연 비율)" },
          { symbol: "Wⱼ", meaning: "j 품목의 경제 가중치 (GDP 투입산출표 기반)" },
          { symbol: "Vⱼ", meaning: "j 품목 가격 변동성 (30일 σ)" },
          { symbol: "N", meaning: "추적 품목 수" },
          { symbol: "SCDI > 0.6", meaning: "공급망 위기 임계값" },
        ],
      },
    ],
    keyVariables: ["납기지연 Dⱼ", "경제가중치 Wⱼ", "가격변동성 Vⱼ", "지정학 리스크"],
    dataSources: [
      { name: "뉴욕 연준 GSCPI", url: "https://www.newyorkfed.org/research/policy/gscpi" },
      { name: "Freightos Baltic Index", url: "https://www.freightos.com/freight-resources/fbi" },
      { name: "World Bank Commodity Prices", url: "https://www.worldbank.org/en/research/commodity-markets" },
      { name: "OECD Trade in Value Added", url: "https://stats.oecd.org/tiva" },
    ],
    classification: "안정(SCDI<0.3) / 주의(0.3~0.6) / 위기(0.6~0.8) / 붕괴(SCDI>0.8)",
    classificationEn: "Stable(<0.3) / Caution(0.3–0.6) / Crisis(0.6–0.8) / Collapse(>0.8)",
  },

  ppi: {
    key: "ppi",
    label: "§37 PPI",
    version: "Λ¹² 하위엔진",
    nameKo: "권력기생지수",
    nameEn: "Power Parasite Index",
    accent: "#784212",
    whatItMeasures: "제도 내 기생적 권력 구조의 심화도를 측정합니다. 규제 포획·엘리트 순환 단절·부패 고착화·언론 통제를 4개 축으로 정량화합니다.",
    whatItMeasuresEn: "Measures the deepening of parasitic power structures within institutions, quantifying regulatory capture, elite circulation blockage, corruption entrenchment, and media control.",
    whyBuilt: "스리랑카·볼리비아 사례에서 검증됐듯, 제도 포획은 봉기의 최종 도화선입니다. PPI는 Λ¹² A2(거버넌스) + A4(제도) 차원의 심층 부패 탐지기입니다.",
    whyBuiltEn: "As validated in Sri Lanka and Bolivia, institutional capture is the ultimate trigger of uprising. PPI is a deep corruption detector for Λ¹² A2 (Governance) and A4 (Institution).",
    formulas: [
      {
        expression: "PPI = α·Capture + β·Circulation + γ·Corruption + δ·Media",
        description: "규제포획·엘리트순환·부패·언론통제 4축 가중합",
        variables: [
          { symbol: "Capture", meaning: "규제 포획 강도 — 회전문 인사 비율, 로비 지출" },
          { symbol: "Circulation", meaning: "엘리트 순환 단절 — 상위 1% 세습 비율" },
          { symbol: "Corruption", meaning: "부패 고착화 — CPI 역수 + 기소율 역수" },
          { symbol: "Media", meaning: "언론 통제 — RSF 언론자유지수 역수" },
          { symbol: "PPI > 0.7", meaning: "제도 포획 완성 — 봉기 임계 근접" },
        ],
      },
    ],
    keyVariables: ["규제포획 Capture", "엘리트순환 Circulation", "부패 CPI", "언론자유 RSF"],
    dataSources: [
      { name: "Transparency International CPI", url: "https://transparency.org" },
      { name: "RSF 언론자유지수", url: "https://rsf.org/en/index" },
      { name: "V-Dem Electoral Democracy", url: "https://v-dem.net" },
      { name: "OpenSecrets 로비 데이터", url: "https://www.opensecrets.org" },
    ],
    classification: "투명(PPI<0.3) / 주의(0.3~0.5) / 포획(0.5~0.7) / 기생완성(PPI>0.7)",
    classificationEn: "Transparent(<0.3) / Caution(0.3–0.5) / Captured(0.5–0.7) / Full Parasite(>0.7)",
  },

  axioms: {
    key: "axioms",
    label: "A0—A12",
    version: "REVERBANT v1.1 · 공리 8/8",
    nameKo: "사회구조 설계공리",
    nameEn: "Social Structure Design Axioms",
    accent: "#B8850E",
    whatItMeasures: "특정 지표가 아니라, 모든 파생 엔진이 공유하는 동역학적 설계 토대입니다. 섭동(BSLI)이 사회 구조(Λ¹²)에 어떻게 반향하는지를 규정하는 13가지 법칙(A0~A12)으로 구성됩니다.",
    whatItMeasuresEn: "Not a metric but the dynamical design foundation shared by every derived engine. Thirteen axioms (A0–A12) governing how perturbation (BSLI) reverberates through social structure (Λ¹²).",
    whyBuilt: "REVERBANT v1.1 설계 과정에서 정립됐습니다. Λ¹²·BSLI·REVERBANT·UI를 포함한 모든 엔진이 이 공리 위에 서며, 이란·방글라데시·한국·미국 4개 사례로 실증되고 AI 3개 시스템으로 교차검증됐습니다.",
    whyBuiltEn: "Established during REVERBANT v1.1 design. Every engine rests on these axioms, validated across Iran, Bangladesh, Korea, and the US, and cross-verified by three AI systems.",
    formulas: [
      {
        expression: "UI(t) = η·E_A2 − P_BSLI/σ(G-T) − C_internal",
        description: "봉기지수 통합 방정식 — 제도 탄성, 서민 압력, 내부 충돌의 결합",
        variables: [
          { symbol: "η·E_A2", meaning: "제도신뢰(A2)의 탄성 복원 항" },
          { symbol: "P_BSLI/σ", meaning: "서민 섭동 압력을 G-T Core 강성으로 나눈 값" },
          { symbol: "C_internal", meaning: "A8이 A2를 공격하는 내부 충돌 (A3)" },
        ],
      },
      {
        expression: "T_trigger = δ₋₁ / [P_BSLI · (1 − E_A2)]",
        description: "도화선 함수(A12) — 폭발 규모는 P_BSLI×(1−E_A2)로 결정",
        variables: [
          { symbol: "δ₋₁", meaning: "사건의 Layer −1 활성화 강도 (0~1)" },
          { symbol: "T_trigger ↓", meaning: "도화선 효과 강함 — 작은 사건으로 폭발" },
        ],
      },
    ],
    keyVariables: ["A0~A12 (13공리)", "G-T Core", "Layer −1", "T_trigger"],
    dataSources: [
      { name: "SSRN — UI 엔진 논문", url: "https://ssrn.com/abstract=7033138" },
      { name: "ACLED Conflict Data", url: "https://acleddata.com" },
    ],
    classification: "탄성복원 · 소성변형 · 취성파괴 — 3가지 사회 반응 유형",
    classificationEn: "Elastic Recovery · Plastic Deformation · Brittle Fracture",
    axiomsQuote: "도화선은 항상 가장 이타적인 것에 반하는 단 하나의 사건이다. 화약의 양은 P_BSLI가 결정하고, 폭발 경로는 E_A2가 결정하고, 도화선에 불을 붙이는 것은 항상 Layer −1이다.",
    axiomsQuoteBy: "청해(淸海) 김기섭 · REVERBANT v1.1 · 2026-07-03",
    axioms: [
      { id: "A0", name: "존재론적 분리", summary: "국가 상태벡터와 서민 섭동벡터는 독립이다", detail: "Λ¹²는 국가 사회구조의 거시 상태벡터(설계층), BSLI는 서민 생활 고통의 외부 섭동벡터(피설계층)다. 두 층위는 서로 독립적으로 존재한다." },
      { id: "A1", name: "조준 불변성", summary: "어떤 차원이 흔들려도 최종 조준점은 A2다", detail: "12차원 중 어떤 차원이 임계에 도달하더라도, BSLI 섭동의 최종 조준점은 항상 제도신뢰(A2)로 수렴한다." },
      { id: "A2", name: "E_A2 이중 방향", summary: "제도 탄성은 위·옆 두 방향으로 작동한다", detail: "① 아래로부터 오는 BSLI 섭동을 흡수·복원한다(수직↑). ② 거버넌스(A8)의 과팽창을 억제·복원한다(수평↔). 이 이중 방향성이 견제균형의 물리적 실체다." },
      { id: "A3", name: "내부 충돌", summary: "A8이 A2를 공격할 때 내부 충돌이 발생한다", detail: "C_internal은 거버넌스(A8)가 제도신뢰(A2)를 공격할 때 발생하는 내부 충돌항이다. UI 방정식의 제3항으로 편입된다.", formula: "C_internal(A2, A8, t)" },
      { id: "A4", name: "집행 채널 귀속", summary: "집행이 A8에 완전 귀속되면 복원력이 약화된다", detail: "집행 채널이 거버넌스(A8)에 완전히 귀속되면 제도신뢰(A2)의 복원력이 구조적으로 약화된다. (한국: 군 명령 거부 → 복원 성공 / 미국: 연방보안관 A8 소속 → 복원력 약화)" },
      { id: "A5", name: "Layer 0 계수", summary: "문화·역사 내재화가 명령 반사를 결정한다", detail: "κ_L0는 Layer 0의 문화·역사 내재화 정도(후천적)다. 명령 반사 계수 Γ_execution = 1 − κ_L0.", formula: "Γ_execution = 1 − κ_L0" },
      { id: "A6", name: "Layer −1 상수", summary: "인류 공통의 신경생물학적 기반은 선천적이다", detail: "λ₋₁은 신경생물학적 인류 공통 기반(선천적)이다. 거울뉴런과 옥시토신 시스템으로, 대면 접촉 시 자동 활성화된다. (1차대전 크리스마스 휴전 실증)" },
      { id: "A7", name: "임피던스", summary: "명령 반사율은 임피던스 불일치로 결정된다", detail: "명령 반사 계수는 Layer 0와 A8의 임피던스 불일치로 결정된다. (한국 12·3: Γ≈0.8~0.9 / 미얀마 2021: Γ≈0.1)", formula: "Γ = (λ₋₁√(μ_c/ε_h) − Z_A8) / (λ₋₁√(μ_c/ε_h) + Z_A8)" },
      { id: "A8", name: "BSLI 방향 전환", summary: "공격받으면 서민은 제도 방어로 전환한다", detail: "A8이 A2를 공격할 때, BSLI는 A2 방어로 방향을 전환한다. 최종 조준점은 A8이 아니라 항상 A2다." },
      { id: "A9", name: "취성 한계치", summary: "지지율 20% 이하에서 취성파괴가 급증한다", detail: "E_A2 < 0.20에서 C_internal이 개시되면 취성파괴 확률이 급증한다. (한국 12·3: E_A2=0.17)", formula: "E_A2 < 0.20 + C_internal 임계" },
      { id: "A10", name: "BSLI 물성", summary: "서민 고통은 물(H₂O)처럼 상태가 변한다", detail: "BSLI ≡ 물(H₂O). 고체=혁명·봉기, 액체=불만·민원·선거, 기체=침묵·이민·저출산, 초임계=임계 직전. 수소결합 = Layer −1." },
      { id: "A11", name: "물의 변칙", summary: "억압할수록 섭동은 빠르게 퍼진다", detail: "4℃ 최대밀도=안정 구간, 초임계=겉으론 조용하나 내부 압력 최대, LDL→HDL=분산 불만이 응집 분노로, 확산역설=억압할수록 섭동이 빠르게 확산." },
      { id: "A12", name: "도화선 불변성", summary: "봉기는 언제나 이타적인 것에 반하는 단 하나의 사건에서 시작된다", detail: "봉기의 도화선은 항상 ① 단순·구체적인 단 하나의 사건, ② 이념·계층·세대를 초월하는 Layer −1 발화, ③ \"이것은 옳지 않다\"는 공명. 폭발 규모는 P_BSLI×(1−E_A2)가 결정한다. (이란·방글라데시·한국·미국 4사례 실증)", formula: "폭발 규모 = P_BSLI × (1 − E_A2)", isNew: true },
    ],
  },
};