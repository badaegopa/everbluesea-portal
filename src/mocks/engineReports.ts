// 엔진별 보고서 매핑 — 카드 아코디언 데이터 소스
// ★ 새 보고서 추가 방법: 해당 카드 ID 배열에 아래 템플릿 형식으로 항목 추가 후 git push ★
// 템플릿:
// { id: "고유ID", title: "보고서 제목", region: "분류라벨", scope: "단독" | "권역별",
//   engine: "엔진버전", date: "YYYY-MM-DD", htmlPath: "/nations/폴더/파일.html" },
// HTML 원본은 public/ 아래 해당 경로에 함께 넣을 것.

import { nationReports } from "./nationReports";
import type { NationReport } from "./nationReports";

export const engineReports: Record<string, NationReport[]> = {
  // Λ¹² 국가 분석 — 37편 (nationReports.ts에서 관리)
  "cat-national": nationReports,

  // BSLI 기초사회생활지수
  "cat-bsli": [
    {
      id: "bsli-paper-v6-ko",
      title: "BSLI 기초사회생활지수 논문 v6.0 — 139개국 서민 고통 측정", titleEn: "BSLI Basic Social Life Index Paper v6.0 — Measuring Grassroots Hardship in 139 States",
      region: "글로벌", regionEn: "Global",
      scope: "권역별",
      engine: "BSLI v6.0",
      date: "2026-06-01",
      htmlPath: "/engines/bsli/BSLI_paper_v6.0_2026.html",
    },
    {
      id: "bsli-paper-en-final",
      title: "Basic Social Life Index (BSLI) — English Edition (SSRN 6806478)",
      region: "Global",
      scope: "권역별",
      engine: "BSLI v6.9",
      date: "2026-06-15",
      htmlPath: "/engines/bsli/BSLI_paper_EN_FINAL.html",
    },
    {
      id: "bsli-dashboard-v7",
      title: "BSLI 대시보드 v7 — 국가별 衣食住 삼중계 시각화", titleEn: "BSLI Dashboard v7 — Food·Clothing·Shelter Triple-Gauge Visualization by State",
      region: "글로벌", regionEn: "Global",
      scope: "권역별",
      engine: "BSLI v7",
      date: "2026-06-20",
      htmlPath: "/engines/bsli/BSLI_dashboard_v7.html",
    },
    {
      id: "bsli-metro-pattern",
      title: "BSLI 대도시 패턴 분석 — 메트로 지역 생활지수 구조", titleEn: "BSLI Metropolitan Pattern Analysis — Living-Index Structure of Metro Regions",
      region: "글로벌", regionEn: "Global",
      scope: "단독",
      engine: "BSLI",
      date: "2026-05-20",
      htmlPath: "/engines/bsli/bsli_metro_pattern.html",
    },
  ],

  // REVERBANT 동적 섭동 반응
  "cat-reverbant": [
    {
      id: "reverbant-v11-theory",
      title: "REVERBANT v1.1 — 동적 섭동 반응 엔진 이론 정본 (공리 A0~A12)", titleEn: "REVERBANT v1.1 — Dynamic Perturbation Response Engine, Canonical Theory (Axioms A0–A12)",
      region: "이론", regionEn: "Theory",
      scope: "단독",
      engine: "REVERBANT v1.1",
      date: "2026-07-03",
      htmlPath: "/engines/reverbant/REVERBANT_v1.1_final_theory.html",
    },
    {
      id: "reverbant-kor-usa",
      title: "REVERBANT 한미 실증 비교 — 같은 G-T Core, 다른 결말", titleEn: "REVERBANT Korea–US Empirical Comparison — Same G-T Core, Different Endings",
      region: "한미", regionEn: "Korea–US",
      scope: "권역별",
      engine: "REVERBANT v1.1",
      date: "2026-07-03",
      htmlPath: "/engines/reverbant/REVERBANT_KOR_USA_2026.html",
    },
  ],

  // UI 봉기지수
  "cat-ui": [
    {
      id: "bsli-timeseries-2026h1",
      title: "BSLI 2026 상반기 정본 — 137개국 기초사회생활지수 시계열 (2016–2024)", titleEn: "BSLI 2026 H1 Canon — Basic Social Life Index Time Series, 137 Countries (2016–2024)",
      region: "글로벌", regionEn: "Global",
      scope: "권역별",
      engine: "BSLI v7.0 · 시계열 v1.2",
      date: "2026-07-26",
      htmlPath: "/engines/bsli/BSLI_2026H1_시계열_전체_v1.2_20260726.html",
    },
    {
      id: "ui-indonesia-2026",
      title: "인도네시아 봉기경로 진단 — T_trigger 5개 시나리오와 백색왜성 55%", titleEn: "Indonesia Uprising-Path Diagnosis — Five T_trigger Scenarios and a 55% White Dwarf",
      region: "동남아시아", regionEn: "Southeast Asia",
      scope: "단독",
      engine: "UI · Λ¹² v1.9.3",
      date: "2026-07-17",
      htmlPath: "/nations/southeast-asia/인도네시아_Λ12_비교분석보고서_20260717.html",
    },
    {
      id: "ui-ven-irn-2026",
      title: "외생 개입과 민중 동역학 — 베네수엘라·이란 2026 비교 정밀진단", titleEn: "Exogenous Intervention and Grassroots Dynamics — Venezuela·Iran 2026 Comparative Diagnosis",
      region: "아메리카·중동", regionEn: "Americas·Middle East",
      scope: "권역별",
      engine: "UI · Λ¹² v9.8",
      date: "2026-07-12",
      htmlPath: "/engines/ui/VEN_IRN_UI_comparative_20260712.html",
    },
    {
      id: "ui-uprising-tracker",
      title: "봉기 트래커 — 글로벌 봉기지수 실시간 추적", titleEn: "Uprising Tracker — Real-Time Global Uprising Index Tracking",
      region: "글로벌", regionEn: "Global",
      scope: "권역별",
      engine: "UI",
      date: "2026-06-25",
      htmlPath: "/engines/ui/uprising_tracker.html",
    },
    {
      id: "ui-world-judgment",
      title: "세계 봉기지수 판정 — 89개국 위험 평가", titleEn: "Global Uprising Index Assessment — Risk Evaluation of 89 States",
      region: "글로벌", regionEn: "Global",
      scope: "권역별",
      engine: "UI",
      date: "2026-06-25",
      htmlPath: "/engines/ui/world_judgment.html",
    },
    {
      id: "ui-kor-report",
      title: "한국 봉기지수 보고서 — UI −0.221 판독", titleEn: "South Korea Uprising Index Report — Reading UI −0.221",
      region: "동북아시아", regionEn: "Northeast Asia",
      scope: "단독",
      engine: "UI",
      date: "2026-06-25",
      htmlPath: "/engines/ui/KOR_report.html",
    },
    // 2026-07-26: 구독판 4편(IRN 2호·BOL·LKA·코호트비교)을 시리즈 허브 1장으로 묶음.
    // 개별 4편의 HTML은 public/engines/ui/ 에 그대로 있고, 허브 페이지 §01 카드에서 각각 링크된다.
    // 개별 카드를 다시 노출하려면 이 항목 아래에 예전 엔트리 4개를 되살리면 된다.
    {
      id: "ui-subscription-series-20260726",
      title: "봉기 코호트 구독판 4부작 — 압박 좌표계 시계열 실측 (이란·볼리비아·스리랑카·6국 비교)", titleEn: "Uprising Cohort Subscription Tetralogy — Pressure-Coordinate Time-Series Validation (Iran·Bolivia·Sri Lanka·6-Country Comparison)",
      region: "중동·아메리카·남아시아", regionEn: "Middle East·Americas·South Asia",
      scope: "권역별",
      engine: "UI · Λ¹² 시계열 v2.1 × BSLI v7.0",
      date: "2026-07-26",
      htmlPath: "/engines/ui/국가보고서_구독판_시리즈허브_v1.0_20260726_1.html",
    },
  ],

  // §33 버블붕괴탐지기
  "cat-bbd": [
    {
      id: "bbd-methodology",
      title: "버블붕괴탐지기 §33 — 공식과 방법론 해설", titleEn: "Bubble Burst Detector §33 — Formulas and Methodology",
      region: "방법론", regionEn: "Methodology",
      scope: "단독",
      engine: "§33 BBD",
      date: "2026-07-07",
      htmlPath: "/engines/methodology/BBD_methodology.html",
    },
  ],

  // §34 지니경제불평등지수
  "cat-gei": [
    {
      id: "gei-methodology",
      title: "지니경제불평등지수 §34 — 공식과 방법론 해설 (로렌츠 곡선)", titleEn: "Gini Economic Inequality Index §34 — Formulas and Methodology (Lorenz Curve)",
      region: "방법론", regionEn: "Methodology",
      scope: "단독",
      engine: "§34 GEI",
      date: "2026-07-07",
      htmlPath: "/engines/methodology/GEI_methodology.html",
    },
  ],

  // §35 국가역량지수
  "cat-nci": [
    {
      id: "nci-methodology",
      title: "국가역량지수 §35 — 공식과 방법론 해설 (4축 역량)", titleEn: "National Capacity Index §35 — Formulas and Methodology (4-Axis Capacity)",
      region: "방법론", regionEn: "Methodology",
      scope: "단독",
      engine: "§35 NCI",
      date: "2026-07-07",
      htmlPath: "/engines/methodology/NCI_methodology.html",
    },
  ],

  // §36 공급망교란지수
  "cat-scdi": [
    {
      id: "scdi-russia-diesel-2026",
      title: "러시아 경유 수출금지 — 공급망 교란 전파 지정학 보고서", titleEn: "Russia's Diesel Export Ban — Supply-Chain Disruption Propagation Report",
      region: "글로벌", regionEn: "Global",
      scope: "권역별",
      engine: "§36 SCDI",
      date: "2026-07-14",
      htmlPath: "/engines/scdi/SCDI_RussiaDiesel_v1_20260714.html",
    },
    {
      id: "scdi-methodology",
      title: "공급망교란지수 §36 — 공식과 방법론 해설 (교란 전파 경로)", titleEn: "Supply Chain Disruption Index §36 — Formulas and Methodology (Disruption Propagation Paths)",
      region: "방법론", regionEn: "Methodology",
      scope: "단독",
      engine: "§36 SCDI",
      date: "2026-07-07",
      htmlPath: "/engines/methodology/SCDI_methodology.html",
    },
  ],

  // §37 권력기생지수
  "cat-ppi": [
    {
      id: "ppi-methodology",
      title: "권력기생지수 §37 — 공식과 방법론 해설 (PPI + LRI-P*)", titleEn: "Power Parasite Index §37 — Formulas and Methodology (PPI + LRI-P*)",
      region: "방법론", regionEn: "Methodology",
      scope: "단독",
      engine: "§37 PPI",
      date: "2026-07-07",
      htmlPath: "/engines/methodology/PPI_methodology.html",
    },
  ],

  // 언론 브리핑룸
  "cat-press": [],

  // 두레에타 — 대시보드 1건
  "cat-dure": [
    {
      id: "dure-eta-v8-ulsan",
      title: "두레에타 v8.4 — 울산 사회구조 진단 대시보드 (실시간)", titleEn: "DURE-η v8.4 — Ulsan Social Structure Diagnostic Dashboard (Real-Time)",
      region: "울산", regionEn: "Ulsan",
      scope: "단독",
      engine: "DURE-η v8.4",
      date: "2026-05-31",
      htmlPath: "/tools/dure_eta_v8.html",
    },
  ],

  // LCI 지도자붕괴지수
  "cat-lci": [
    {
      id: "lci-methodology",
      title: "지도자붕괴지수 LCI — 공식과 방법론 해설 (κ·ΔΦ·ι 3축)", titleEn: "Leader Collapse Index (LCI) — Formulas and Methodology (κ·ΔΦ·ι 3-Axis)",
      region: "방법론", regionEn: "Methodology",
      scope: "단독",
      engine: "LCI",
      date: "2026-07-07",
      htmlPath: "/engines/methodology/LCI_methodology.html",
    },
  ],

  // AFRO-Λ
  "cat-afro": [
    {
      id: "afro-lambda-s40-v02",
      title: "AFRO-Λ §40 — 아프리카 지역분석 서브엔진 설계 (부르키나파소 AES 검증)", titleEn: "AFRO-Λ §40 — Africa Regional Analysis Sub-Engine Design (Burkina Faso AES Validation)",
      region: "아프리카", regionEn: "Africa",
      scope: "권역별",
      engine: "AFRO-Λ v0.2",
      date: "2026-06-27",
      htmlPath: "/engines/afro/lambda_s40_AFRO_v02.html",
    },
  ],

  // A0–A12 사회구조 설계공리 — 원문·철학 문서
  "cat-axioms": [
    {
      id: "axioms-reverbant-v11",
      title: "사회구조 설계공리 A0~A12 원문 — REVERBANT v1.1 이론 정본", titleEn: "Social Structure Design Axioms A0–A12, Original Text — REVERBANT v1.1 Canonical Theory",
      region: "공리", regionEn: "Axioms",
      scope: "단독",
      engine: "REVERBANT v1.1",
      date: "2026-07-03",
      htmlPath: "/engines/reverbant/REVERBANT_v1.1_final_theory.html",
    },
    {
      id: "axioms-lambda12v2-full-20260720",
      title: "늘푸른바다 엔진총서 제1권 — Λ¹² v2 전체국가 재계산 기초정본", titleEn: "Everblue Sea Engine Series Vol.1 — Λ¹² v2 Full-Country Recalculation Baseline",
      region: "공리", regionEn: "Axioms",
      scope: "단독",
      engine: "Λ¹²v2.0",
      date: "2026-07-20",
      htmlPath: "/engines/axioms/늘푸른바다_엔진총서_제1권_기초정본_v1.0_20260720.html",
    },
    {
      id: "axioms-inkaeloop-v31-kor-20260720",
      title: "인계루프 v3.1 — 압박 좌표계 (대한민국 Korea)", titleEn: "Pressure Loop v3.1 — Pressure Coordinate System (Korea)",
      region: "공리", regionEn: "Axioms",
      scope: "단독",
      engine: "인계루프 v3.1",
      date: "2026-07-20",
      htmlPath: "/engines/axioms/인계루프_인과루프도_v3.1_KOR_20260720.html",
    },
    {
      id: "axioms-inkaeloop-orbital-v20-20260720",
      title: "인계루프 행성계(Orbital) 설계 v2.0", titleEn: "Pressure Loop Orbital System Design v2.0",
      region: "공리", regionEn: "Axioms",
      scope: "단독",
      engine: "인계루프 v2.0",
      date: "2026-07-20",
      htmlPath: "/engines/axioms/인계루프_행성계설계_v2.0_20260720.html",
    },
    {
      id: "axioms-uprising-pressure-v10-20260720",
      title: "봉기 시점 압박 좌표계 겹침 — 예측 모델의 첫 실측 검증", titleEn: "Uprising Pressure Overlay — First Empirical Validation of the Predictive Model",
      region: "공리", regionEn: "Axioms",
      scope: "단독",
      engine: "UI · 인계루프 v1.0",
      date: "2026-07-20",
      htmlPath: "/engines/axioms/봉기시점_압박겹침_v1.0_20260720.html",
    },
  ],

  // ※ cat-feedback(피드백)은 목록형이 아니므로 이 맵에 넣지 않음
};
