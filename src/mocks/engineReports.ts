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
      title: "BSLI 기초사회생활지수 논문 v6.0 — 139개국 서민 고통 측정",
      region: "글로벌",
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
      title: "BSLI 대시보드 v7 — 국가별 衣食住 삼중계 시각화",
      region: "글로벌",
      scope: "권역별",
      engine: "BSLI v7",
      date: "2026-06-20",
      htmlPath: "/engines/bsli/BSLI_dashboard_v7.html",
    },
    {
      id: "bsli-metro-pattern",
      title: "BSLI 대도시 패턴 분석 — 메트로 지역 생활지수 구조",
      region: "글로벌",
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
      title: "REVERBANT v1.1 — 동적 섭동 반응 엔진 이론 정본 (공리 A0~A12)",
      region: "이론",
      scope: "단독",
      engine: "REVERBANT v1.1",
      date: "2026-07-03",
      htmlPath: "/engines/reverbant/REVERBANT_v1.1_final_theory.html",
    },
    {
      id: "reverbant-kor-usa",
      title: "REVERBANT 한미 실증 비교 — 같은 G-T Core, 다른 결말",
      region: "한미",
      scope: "권역별",
      engine: "REVERBANT v1.1",
      date: "2026-07-03",
      htmlPath: "/engines/reverbant/REVERBANT_KOR_USA_2026.html",
    },
  ],

  // UI 봉기지수
  "cat-ui": [
    {
      id: "ui-uprising-tracker",
      title: "봉기 트래커 — 글로벌 봉기지수 실시간 추적",
      region: "글로벌",
      scope: "권역별",
      engine: "UI",
      date: "2026-06-25",
      htmlPath: "/engines/ui/uprising_tracker.html",
    },
    {
      id: "ui-world-judgment",
      title: "세계 봉기지수 판정 — 89개국 위험 평가",
      region: "글로벌",
      scope: "권역별",
      engine: "UI",
      date: "2026-06-25",
      htmlPath: "/engines/ui/world_judgment.html",
    },
    {
      id: "ui-kor-report",
      title: "한국 봉기지수 보고서 — UI −0.221 판독",
      region: "동북아시아",
      scope: "단독",
      engine: "UI",
      date: "2026-06-25",
      htmlPath: "/engines/ui/KOR_report.html",
    },
  ],

  // §33 버블붕괴탐지기
  "cat-bbd": [],

  // §34 지니경제불평등지수
  "cat-gei": [],

  // §35 국가역량지수
  "cat-nci": [],

  // §36 공급망교란지수
  "cat-scdi": [],

  // §37 권력기생지수
  "cat-ppi": [],

  // 언론 브리핑룸
  "cat-press": [],

  // 두레에타 — 대시보드 1건
  "cat-dure": [
    {
      id: "dure-eta-v8-ulsan",
      title: "두레에타 v8.4 — 울산 사회구조 진단 대시보드 (실시간)",
      region: "울산",
      scope: "단독",
      engine: "DURE-η v8.4",
      date: "2026-05-31",
      htmlPath: "/tools/dure_eta_v8.html",
    },
  ],

  // LCI 지도자붕괴지수
  "cat-lci": [],

  // AFRO-Λ
  "cat-afro": [
    {
      id: "afro-lambda-s40-v02",
      title: "AFRO-Λ §40 — 아프리카 지역분석 서브엔진 설계 (부르키나파소 AES 검증)",
      region: "아프리카",
      scope: "권역별",
      engine: "AFRO-Λ v0.2",
      date: "2026-06-27",
      htmlPath: "/engines/afro/lambda_s40_AFRO_v02.html",
    },
  ],

  // ※ cat-axioms(공리)·cat-feedback(피드백)은 목록형이 아니므로 이 맵에 넣지 않음
};
