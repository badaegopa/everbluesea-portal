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
  "cat-bsli": [],

  // REVERBANT 동적 섭동 반응
  "cat-reverbant": [],

  // UI 봉기지수
  "cat-ui": [],

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
  "cat-afro": [],

  // ※ cat-axioms(공리)·cat-feedback(피드백)은 목록형이 아니므로 이 맵에 넣지 않음
  //    → 기존 하단 바(공리 상세/이메일)가 그대로 동작
};
