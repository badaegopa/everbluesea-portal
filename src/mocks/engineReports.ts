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
    { id: "btn-bsli-20261014", title: "부탄 기초사회생활지수 단독편 — 남아시아 BSLI 2위, 총서 음수와 시계열 양수, 실측 2017·2022년 두 점, 하루 $8.30 빈곤율 42.5%→9%, 2026년 근로빈곤층과 임대료 부담", titleEn: "Bhutan BSLI Standalone Edition — South Asia's 2nd BSLI, a Negative Canonical Value vs a Positive Time Series, Two Measurements (2017, 2022), Poverty at $8.30 a Day from 42.5% to 9%, and the Working Poor and Rent Burdens in 2026", region: "남아시아", regionEn: "South Asia", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/south-asia/부탄_BSLI_기초생활분석보고서_20261014.html" },
    { id: "lao-bsli-20261014", title: "라오스 기초사회생활지수 단독편 — 동남아시아 BSLI 7위, 기본생활선 아래의 E등급, 실측 2018·2024년 두 점, 하루 $3.00 빈곤율 15.7%→7.1%, 2023년 물가 31.23%와 2026년 연료 위기", titleEn: "Laos BSLI Standalone Edition — Southeast Asia's 7th BSLI, Grade E Below the Basic-Living Line, Two Measurements (2018, 2024), Poverty at $3.00 a Day from 15.7% to 7.1%, 31.23% Inflation in 2023 and a 2026 Fuel Crisis", region: "동남아시아", regionEn: "Southeast Asia", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/southeast-asia/라오스_BSLI_기초생활분석보고서_20261014.html" },
    { id: "tha-bsli-20261014", title: "태국 기초사회생활지수 단독편 — 동남아시아 BSLI 2위, 기본생활선 바로 위의 E등급, 2016~2024년 매년 실측, 하루 $3.00 빈곤율 0%와 빈곤층 340만 명 보도, 물가 −0.13%와 CPI 재검토", titleEn: "Thailand BSLI Standalone Edition — Southeast Asia's 2nd BSLI, Grade E Just Above the Basic-Living Line, Annual Measurements 2016–2024, 0% Poverty at $3.00 a Day vs Reports of 3.4 Million Poor, and −0.13% Inflation vs a CPI Review", region: "동남아시아", regionEn: "Southeast Asia", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/southeast-asia/태국_BSLI_기초생활분석보고서_20261014.html" },
    { id: "chn-bsli-20261014", title: "중국 기초사회생활지수 단독편 — 동아시아 BSLI 3위, 총서 음수와 시계열 양수, 국가빈곤선 0%와 하루 $8.30 빈곤율 21.3%, 물가 0%대와 2026년 공장 물가 45개월 최고", titleEn: "China BSLI Standalone Edition — East Asia's 3rd BSLI, a Negative Canonical Value vs a Positive Time Series, 0% National Poverty vs 21.3% at $8.30 a Day, Near-Zero Inflation and a 45-Month High in Factory Prices in 2026", region: "동북아시아", regionEn: "Northeast Asia", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/northeast-asia/중국_BSLI_기초생활분석보고서_20261014.html" },
    { id: "kor-bsli-20261014", title: "대한민국 기초사회생활지수 단독편 — 동아시아 BSLI 2위, C등급, 2016~2021년 해마다 오른 보조 시계열, 하루 $8.30 빈곤율 0.5%와 5년 만의 최고 상대빈곤율, 노인 빈곤 40% 아래로 처음", titleEn: "South Korea BSLI Standalone Edition — East Asia's 2nd BSLI, Grade C, an Auxiliary Series Rising Every Year 2016–2021, 0.5% Poverty at $8.30 a Day vs a Five-Year High in Relative Poverty, and Elderly Poverty Below 40% for the First Time", region: "동북아시아", regionEn: "Northeast Asia", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/northeast-asia/대한민국_BSLI_기초생활분석보고서_20261014.html" },
    { id: "fsm-bsli-20261014", title: "미크로네시아 기초사회생활지수 단독편 — 오세아니아 BSLI 8위, 기본생활선 아래의 E등급, 보조 시계열 미수록, 2013년에 멈춘 빈곤 통계, 2026년 태풍", titleEn: "Micronesia BSLI Standalone Edition — Oceania's 8th BSLI, Grade E Below the Basic-Living Line, No Auxiliary Time Series, Poverty Data Frozen at 2013, and a 2026 Typhoon", region: "오세아니아", regionEn: "Oceania", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/oceania/미크로네시아_BSLI_기초생활분석보고서_20261014.html" },
    { id: "aus-bsli-20261014", title: "호주 기초사회생활지수 단독편 — 오세아니아 BSLI 1위, B등급, 하루 $8.30 빈곤율 1.5%와 아동 5명 중 1명 빈곤 연구, 2026년 물가 4.6%와 두 번째 일자리", titleEn: "Australia BSLI Standalone Edition — Oceania's Top BSLI, Grade B, 1.5% Poverty at $8.30 a Day vs Research Finding One in Five Children Poor, 4.6% Inflation in 2026, and Second Jobs for Mortgages", region: "오세아니아", regionEn: "Oceania", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/oceania/호주_BSLI_기초생활분석보고서_20261014.html" },
    { id: "col-bsli-20261014", title: "콜롬비아 기초사회생활지수 단독편 — 중남미 BSLI 최하위, Palma 4.26의 주거스트레스, 2020년 바닥 뒤 4년 연속 회복, 국가빈곤율 39.7%에서 31.8%로, 2026년 최저임금 23% 인상", titleEn: "Colombia BSLI Standalone Edition — Latin America's Lowest BSLI, Housing Stress from a Palma Ratio of 4.26, Four Years of Recovery After a 2020 Low, National Poverty Falling from 39.7% to 31.8%, and a 23% Minimum Wage Rise in 2026", region: "아메리카", regionEn: "Americas", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/americas/콜롬비아_BSLI_기초생활분석보고서_20261014.html" },
    { id: "ury-bsli-20261014", title: "우루과이 기초사회생활지수 단독편 — 중남미 BSLI 1위, 기본생활선 바로 위의 E등급, 2016~2024년 해마다 실측, 국가빈곤율 9.9%에서 19.7%로 바뀐 통계, 중남미 최고 생활비 몬테비데오", titleEn: "Uruguay BSLI Standalone Edition — Latin America's Top BSLI, Grade E Just Above the Basic-Living Line, Measured Every Year 2016–2024, a National Poverty Figure Doubling from 9.9% to 19.7%, and Latin America's Costliest City", region: "아메리카", regionEn: "Americas", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/americas/우루과이_BSLI_기초생활분석보고서_20261014.html" },
    { id: "mex-bsli-20261014", title: "멕시코 기초사회생활지수 단독편 — 북미 BSLI 3위, 기본생활선 아래의 E등급, 국가빈곤율 43.9%에서 29.6%로, 근로빈곤 21년 만의 최저, 2026년 새 세금과 물가", titleEn: "Mexico BSLI Standalone Edition — North America's 3rd BSLI, Grade E Below the Basic-Living Line, National Poverty Falling from 43.9% to 29.6%, a 21-Year Low in Labour Poverty, and 2026 New Taxes and Prices", region: "아메리카", regionEn: "Americas", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/americas/멕시코_BSLI_기초생활분석보고서_20261014.html" },
    { id: "can-bsli-20261014", title: "캐나다 기초사회생활지수 단독편 — 북미 BSLI 1위, A등급, 2020년 정점 뒤 하락, 공식 빈곤선 아래 450만 명, G7 식료품 물가 최고, 아동 빈곤 3년 연속 증가", titleEn: "Canada BSLI Standalone Edition — North America's Top BSLI, Grade A, a 2020 Peak Then Decline, 4.5 Million Below the Official Poverty Line, the G7's Highest Food Inflation, and Child Poverty Rising Three Years Running", region: "아메리카", regionEn: "Americas", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/americas/캐나다_BSLI_기초생활분석보고서_20261014.html" },
    { id: "mne-bsli-20261014", title: "몬테네그로 기초사회생활지수 단독편 — 동유럽 BSLI 16위, 기본생활선 바로 아래, 보조 시계열 미수록, 국가빈곤율 20.0%, 실업률 13.6%, 2026년 물가 5.2%와 집값 16.2% 상승", titleEn: "Montenegro BSLI Standalone Edition — Eastern Europe's 16th BSLI, Just Below the Basic-Living Line, No Auxiliary Time Series, 20.0% National Poverty, 13.6% Unemployment, and 2026 Inflation of 5.2% with Home Prices Up 16.2%", region: "유럽", regionEn: "Europe", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/europe/몬테네그로_BSLI_기초생활분석보고서_20261014.html" },
    { id: "svn-bsli-20261014", title: "슬로베니아 기초사회생활지수 단독편 — 동유럽 BSLI 1위, B등급, 2016~2023년 해마다 실측, 지니 24.7과 감산 항 거의 0, 국가빈곤율 12.7%, 2026년 최저임금 1,000유로", titleEn: "Slovenia BSLI Standalone Edition — Eastern Europe's Top BSLI, Grade B, Measured Every Year 2016–2023, a Gini of 24.7 and Near-Zero Deductions, 12.7% National Poverty, and a 1,000-Euro Minimum Wage in 2026", region: "유럽", regionEn: "Europe", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/europe/슬로베니아_BSLI_기초생활분석보고서_20261014.html" },
    { id: "xkx-bsli-20261014", title: "코소보 기초사회생활지수 단독편 — 남유럽·도서 BSLI 4위, 기본생활선 바로 위, 보조 시계열 미수록, 하루 $3.00 빈곤율 25.0%에서 10.0%로, 2026년 물가 재상승", titleEn: "Kosovo BSLI Standalone Edition — Southern Europe's 4th BSLI, Just Above the Basic-Living Line, No Auxiliary Time Series, Poverty at $3.00 a Day Swinging from 25.0% to 10.0%, and Rising Prices in 2026", region: "유럽", regionEn: "Europe", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/europe/코소보_BSLI_기초생활분석보고서_20261014.html" },
    { id: "mlt-bsli-20261014", title: "몰타 기초사회생활지수 단독편 — 남유럽·도서 BSLI 1위, B등급, 2016~2023년 해마다 실측, 국가빈곤율 16.7%와 하루 $8.30 빈곤율 1.1%, 같은 빈곤 통계의 두 제목", titleEn: "Malta BSLI Standalone Edition — Southern Europe's Top BSLI, Grade B, Measured Every Year 2016–2023, 16.7% National Poverty vs 1.1% at $8.30 a Day, and Two Headlines on the Same Poverty Release", region: "유럽", regionEn: "Europe", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/europe/몰타_BSLI_기초생활분석보고서_20261014.html" },
    { id: "prt-bsli-20261014", title: "포르투갈 기초사회생활지수 단독편 — 서유럽 BSLI 12위, C등급, 2022년 Palma 상승과 BSLI 하락, 국가빈곤율 16.4%와 하루 $8.30 빈곤율 2.2%, 2026년 주거·연료·생활비 시위", titleEn: "Portugal BSLI Standalone Edition — Western Europe's 12th BSLI, Grade C, a 2022 Palma Rise and BSLI Dip, 16.4% National Poverty vs 2.2% at $8.30 a Day, and 2026 Housing, Fuel and Living-Cost Protests", region: "유럽", regionEn: "Europe", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/europe/포르투갈_BSLI_기초생활분석보고서_20261014.html" },
    { id: "lux-bsli-20261014", title: "룩셈부르크 기초사회생활지수 단독편 — 서유럽 BSLI 1위, A등급, 식·주 성분이 정규화 상한에 닿은 2023년, 국가빈곤율 17.3%와 하루 $8.30 빈곤율 0.2%, 근로빈곤 역대 최다 보도", titleEn: "Luxembourg BSLI Standalone Edition — Western Europe's Top BSLI, Grade A, Food and Housing Components at the Normalisation Ceiling in 2023, 17.3% National Poverty vs 0.2% at $8.30 a Day, and Record In-Work Poverty", region: "유럽", regionEn: "Europe", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/europe/룩셈부르크_BSLI_기초생활분석보고서_20261014.html" },
    { id: "lva-bsli-20261014", title: "라트비아 기초사회생활지수 단독편 — 북유럽 BSLI 8위, D등급, 국가빈곤율 22.5%와 하루 $8.30 빈곤율 2.8%, 물가 2022년 17.31%, 2026년 총선의 물가 쟁점", titleEn: "Latvia BSLI Standalone Edition — Northern Europe's 8th BSLI, Grade D, 22.5% National Poverty vs 2.8% at $8.30 a Day, 17.31% Inflation in 2022, and Prices at the Heart of the 2026 Election", region: "유럽", regionEn: "Europe", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/europe/라트비아_BSLI_기초생활분석보고서_20261014.html" },
    { id: "nor-bsli-20261014", title: "노르웨이 기초사회생활지수 단독편 — BSLI 139개국 중 1위, A등급, 2016~2023년 해마다 실측, 국가빈곤율 12.2%와 하루 $8.30 빈곤율 0.4%, 2026년 연료발 물가", titleEn: "Norway BSLI Standalone Edition — First of 139, Grade A, Measured Every Year 2016–2023, 12.2% National Poverty vs 0.4% at $8.30 a Day, and Fuel-Driven Inflation in 2026", region: "유럽", regionEn: "Europe", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/europe/노르웨이_BSLI_기초생활분석보고서_20261014.html" },
    { id: "zaf-bsli-20261014", title: "남아프리카공화국 기초사회생활지수 단독편 — 남아프리카 BSLI 5위, 주거스트레스가 상한에 닿았던 Palma 5.65, 국가빈곤율 46.7%에서 37.9%로, 실업률 32%, 사회안전망의 두 제목", titleEn: "South Africa BSLI Standalone Edition — Southern Africa's 5th BSLI, a Palma Ratio of 5.65 That Saturated Housing Stress, National Poverty Falling from 46.7% to 37.9%, 32% Unemployment, and Two Headlines on the Safety Net", region: "아프리카", regionEn: "Africa", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/africa/남아프리카공화국_BSLI_기초생활분석보고서_20261014.html" },
    { id: "lso-bsli-20261014", title: "레소토 기초사회생활지수 단독편 — 남아프리카 BSLI 1위, 기본생활선 아래의 E등급, 국가빈곤율 49.7%와 하루 $3.00 빈곤율 41.9%, 실업률 16%, 물 수출 사업의 두 측면", titleEn: "Lesotho BSLI Standalone Edition — Southern Africa's Top BSLI, Grade E Below the Basic-Living Line, 49.7% National Poverty vs 41.9% at $3.00 a Day, 16% Unemployment, and Two Views of the Water Export Project", region: "아프리카", regionEn: "Africa", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/africa/레소토_BSLI_기초생활분석보고서_20261014.html" },
    { id: "ago-bsli-20261014", title: "앙골라 기초사회생활지수 단독편 — 중앙아프리카 BSLI 3위, 국가빈곤율 32.3%가 하루 $3.00 빈곤율 39.3%보다 낮은 선, Palma 3.47, 물가 28%에서 한 자릿수로", titleEn: "Angola BSLI Standalone Edition — Central Africa's 3rd BSLI, a National Poverty Line (32.3%) Below the $3.00 Extreme Line (39.3%), a Palma Ratio of 3.47, and Inflation Falling from 28% to Single Digits", region: "아프리카", regionEn: "Africa", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/africa/앙골라_BSLI_기초생활분석보고서_20261014.html" },
    { id: "gab-bsli-20261014", title: "가봉 기초사회생활지수 단독편 — 중앙아프리카 BSLI 1위, 기본생활선 아래의 E등급, 국가빈곤율 33.4%와 하루 $3.00 빈곤율 3.8%, 실업률 20%, 2026년 신용등급 하향", titleEn: "Gabon BSLI Standalone Edition — Central Africa's Top BSLI, Grade E Below the Basic-Living Line, 33.4% National Poverty vs 3.8% at $3.00 a Day, 20% Unemployment, and a 2026 Rating Downgrade", region: "아프리카", regionEn: "Africa", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/africa/가봉_BSLI_기초생활분석보고서_20261014.html" },
    { id: "zmb-bsli-20261014", title: "잠비아 기초사회생활지수 단독편 — 139개국 중 139위, Palma 4.59의 주거스트레스, 하루 $3.65 빈곤율 77.6%, 국가빈곤율 54.4%에서 60.0%로, 물가 연 11~15%", titleEn: "Zambia BSLI Standalone Edition — Last of 139, Housing Stress from a Palma Ratio of 4.59, 77.6% Living Under $3.65 a Day, National Poverty Rising from 54.4% to 60.0%, and 11–15% Annual Inflation", region: "아프리카", regionEn: "Africa", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/africa/잠비아_BSLI_기초생활분석보고서_20261014.html" },
    { id: "syc-bsli-20261014", title: "세이셸 기초사회생활지수 단독편 — 동아프리카 BSLI 1위, 기본생활선 위의 D등급, 국가빈곤율 39.3%에서 25.3%로·지니 46.8에서 32.1로, 물가 0%대", titleEn: "Seychelles BSLI Standalone Edition — East Africa's Top BSLI, Grade D Above the Basic-Living Line, National Poverty Falling from 39.3% to 25.3% and the Gini from 46.8 to 32.1, and Near-Zero Inflation", region: "아프리카", regionEn: "Africa", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/africa/세이셸_BSLI_기초생활분석보고서_20261014.html" },
    { id: "ner-bsli-20261014", title: "니제르 기초사회생활지수 단독편 — 서아프리카 BSLI 최하위, 하루 $3.65 빈곤율 73.2%, 국가빈곤율 41.2%와 하루 $3.00 빈곤율 60.5%, 분쟁 지역 식량위기 지속, IMF 대출 실무 합의", titleEn: "Niger BSLI Standalone Edition — West Africa's Lowest BSLI, 73.2% Living Under $3.65 a Day, 41.2% National Poverty vs 60.5% at $3.00, Persistent Food Crisis in Conflict Areas, and an IMF Staff-Level Loan Deal", region: "아프리카", regionEn: "Africa", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/africa/니제르_BSLI_기초생활분석보고서_20261014.html" },
    { id: "mrt-bsli-20261014", title: "모리타니 기초사회생활지수 단독편 — 서아프리카 BSLI 1위, 기본생활선 아래의 E등급, 국가빈곤율 34.3%에서 31.8%로, 물가 1%대와 2026년 연료 가격 압박", titleEn: "Mauritania BSLI Standalone Edition — West Africa's Top BSLI, Grade E Below the Basic-Living Line, National Poverty Falling from 34.3% to 31.8%, Inflation Near 1.5% and 2026 Fuel Price Pressure", region: "아프리카", regionEn: "Africa", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/africa/모리타니_BSLI_기초생활분석보고서_20261014.html" },
    { id: "egy-bsli-20261014", title: "이집트 기초사회생활지수 단독편 — 북아프리카 BSLI 3위, 기본생활선 아래의 E등급, 국가빈곤율 33.5%와 하루 $3.00 빈곤율 1.4%, 물가 2023년 33.88%, 2026년 빵값 상한과 식량보조 개편", titleEn: "Egypt BSLI Standalone Edition — North Africa's 3rd BSLI, Grade E Below the Basic-Living Line, 33.5% National Poverty vs 1.4% at $3.00 a Day, 33.88% Inflation in 2023, and 2026 Bread Price Caps and Food Subsidy Overhaul", region: "중동", regionEn: "Middle East", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/middle-east/이집트_BSLI_기초생활분석보고서_20261014.html" },
    { id: "tun-bsli-20261014", title: "튀니지 기초사회생활지수 단독편 — 북아프리카 BSLI 1위, 기본생활선 바로 위의 E등급, 국가빈곤율 15.2%에서 16.6%로, 빈곤 15% 미만 목표 개발계획, 식료품 물가와 2026년 연료 파업", titleEn: "Tunisia BSLI Standalone Edition — North Africa's Top BSLI, Grade E Just Above the Basic-Living Line, National Poverty Rising from 15.2% to 16.6%, a Development Plan Targeting Under 15%, Food-Led Inflation and the 2026 Fuel Strike", region: "중동", regionEn: "Middle East", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/middle-east/튀니지_BSLI_기초생활분석보고서_20261014.html" },
    { id: "yem-bsli-20261014", title: "예멘 기초사회생활지수 단독편 — 서아시아·중동 BSLI 8위, 기본생활선 아래의 E등급, 2014년에 멈춘 공식 빈곤·물가 통계, 2026년 생활비 급등과 식량위기 경고", titleEn: "Yemen BSLI Standalone Edition — West Asia's 8th BSLI, Grade E Below the Basic-Living Line, Official Poverty and Price Data Frozen at 2014, and 2026 Living-Cost Surges and Food-Crisis Warnings", region: "중동", regionEn: "Middle East", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/middle-east/예멘_BSLI_기초생활분석보고서_20261014.html" },
    { id: "are-bsli-20261014", title: "아랍에미리트 기초사회생활지수 단독편 — 서아시아·중동 BSLI 1위, A등급, 하루 $8.30 빈곤율 0.6%와 지니 26.4, 물가 1%대, 2026년 호르무즈 충격 속 식량 공급 경로", titleEn: "United Arab Emirates BSLI Standalone Edition — West Asia's Top BSLI, Grade A, 0.6% Poverty at $8.30 a Day and a Gini of 26.4, Inflation Near 1%, and Food Supply Routes Under the 2026 Hormuz Shock", region: "중동", regionEn: "Middle East", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/middle-east/아랍에미리트_BSLI_기초생활분석보고서_20261014.html" },
    { id: "tjk-bsli-20261014", title: "타지키스탄 기초사회생활지수 단독편 — 중앙아시아 BSLI 3위, 기본생활선 아래의 E등급, 국가빈곤율 25.6%에서 19.8%로, 2022년 Palma 급등, '수입보다 지출이 많은 가계'", titleEn: "Tajikistan BSLI Standalone Edition — Central Asia's 3rd BSLI, Grade E Below the Basic-Living Line, National Poverty Falling from 25.6% to 19.8%, a 2022 Palma Spike, and Households Spending More Than They Earn", region: "중앙아시아", regionEn: "Central Asia", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/central-asia/타지키스탄_BSLI_기초생활분석보고서_20261014.html" },
    { id: "kaz-bsli-20261014", title: "카자흐스탄 기초사회생활지수 단독편 — 중앙아시아 BSLI 1위, 기본생활선 위의 E등급, 국가빈곤율 5.0%와 하루 $8.30 빈곤율 15.2%, 2022~2025년 고물가, 여섯 해 연속 커진 주거스트레스", titleEn: "Kazakhstan BSLI Standalone Edition — Central Asia's Top BSLI, Grade E Above the Basic-Living Line, 5.0% National Poverty vs 15.2% at $8.30 a Day, High Inflation in 2022–2025, and Housing Stress Rising Six Years Running", region: "중앙아시아", regionEn: "Central Asia", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/central-asia/카자흐스탄_BSLI_기초생활분석보고서_20261014.html" },
    { id: "bgd-bsli-20261014", title: "방글라데시 기초사회생활지수 단독편 — 남아시아 BSLI 6위, 기본생활선 아래의 E등급, 빈곤율 18.7%·추정 21~23%·민간조사 27.93%, 4년째 고물가와 2026년 연료·식량 충격", titleEn: "Bangladesh BSLI Standalone Edition — South Asia's 6th BSLI, Grade E Below the Basic-Living Line, Poverty at 18.7% vs Estimates of 21–23% and a 27.93% Private Survey, Four Years of High Inflation and the 2026 Fuel and Food Shock", region: "남아시아", regionEn: "South Asia", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/south-asia/방글라데시_BSLI_기초생활분석보고서_20261014.html" },
    { id: "mdv-bsli-20261014", title: "몰디브 기초사회생활지수 단독편 — 남아시아 BSLI 1위, 기본생활선 위의 D등급, 국가빈곤율 5.4%와 하루 $8.30 빈곤율 11.2%, 말레의 과밀 주거와 2026년 물가 압박", titleEn: "Maldives BSLI Standalone Edition — South Asia's Top BSLI, Grade D Above the Basic-Living Line, 5.4% National Poverty vs 11.2% at $8.30 a Day, Overcrowded Malé and 2026 Price Pressure", region: "남아시아", regionEn: "South Asia", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/south-asia/몰디브_BSLI_기초생활분석보고서_20261014.html" },
    { id: "tls-bsli-20261014", title: "동티모르 기초사회생활지수 단독편 — 동남아시아 BSLI 8위, 기본생활선 아래의 E등급, 국가빈곤율 41.8%와 하루 $2.15 빈곤율 24.4%, 식량불안 3단계 이상 27%", titleEn: "Timor-Leste BSLI Standalone Edition — Southeast Asia's 8th BSLI, Grade E Below the Basic-Living Line, 41.8% National Poverty vs 24.4% at $2.15 a Day, and 27% in Food-Insecurity Phase 3 or Above", region: "동남아시아", regionEn: "Southeast Asia", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/southeast-asia/동티모르_BSLI_기초생활분석보고서_20261014.html" },
    { id: "mys-bsli-20261014", title: "말레이시아 기초사회생활지수 단독편 — 동남아시아 BSLI 1위, 기본생활선 위의 E등급, 절대빈곤율 6.2%·상대빈곤율 16.6%와 하루 $3.65 빈곤율 0.0%, 디젤 56% 인상", titleEn: "Malaysia BSLI Standalone Edition — Southeast Asia's Top BSLI, Grade E Above the Basic-Living Line, 6.2% Absolute and 16.6% Relative Poverty vs 0.0% at $3.65 a Day, and a 56% Diesel Price Rise", region: "동남아시아", regionEn: "Southeast Asia", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/southeast-asia/말레이시아_BSLI_기초생활분석보고서_20261014.html" },
    { id: "mng-bsli-20261014", title: "몽골 기초사회생활지수 단독편 — 동아시아 BSLI 4위, 기본생활선 바로 아래의 E등급, 국가빈곤율 27.1%와 하루 $3.65 빈곤율 1.2%, 석탄 난로의 게르 지구", titleEn: "Mongolia BSLI Standalone Edition — East Asia's 4th BSLI, Grade E Just Below the Basic-Living Line, a 27.1% National Poverty Rate vs 1.2% at $3.65 a Day, and Coal-Heated Ger Districts", region: "동북아시아", regionEn: "Northeast Asia", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/northeast-asia/몽골_BSLI_기초생활분석보고서_20261014.html" },
    { id: "jpn-bsli-20261014", title: "일본 기초사회생활지수 단독편 — 동아시아 BSLI 1위, 기본생활선 위의 B등급, 상대빈곤율 15.4%와 하루 $3.65 빈곤율 1.4%, 쌀값 두 배와 비축미 방출", titleEn: "Japan BSLI Standalone Edition — East Asia's Top BSLI, Grade B Above the Basic-Living Line, a 15.4% Relative Poverty Rate vs 1.4% at $3.65 a Day, and Doubled Rice Prices with Stockpile Releases", region: "동북아시아", regionEn: "Northeast Asia", scope: "단독", engine: "BSLI v7.0 · 총서 2026-10-07", date: "2026-10-14", htmlPath: "/engines/bsli/northeast-asia/일본_BSLI_기초생활분석보고서_20261014.html" },
    {
      id: "bsli-housing-financialization-2026",
      title: "주거의 금융화와 기층사회 압박 — BSLI 住(H) 차원 국제 비교 (학술판)", titleEn: "Financialization of Housing and Grassroots Social Pressure — Cross-National Analysis of the BSLI Dwelling (H) Dimension",
      region: "글로벌 · 住 압박", regionEn: "Global · Dwelling Pressure",
      scope: "권역별",
      engine: "BSLI v7.0 × Λ¹²",
      date: "2026-09-30",
      htmlPath: "/engines/bsli/주거금융화_BSLI_학술판_v6_20260930.html",
    },
    // ★ 상반기 정본 — cat-ui(봉기지수)에도 동일 HTML이 등록되어 있다(id: bsli-timeseries-2026h1).
    //   두 카테고리 노출이 의도된 것이므로 중복으로 보고 지우지 말 것. id는 배열별로 달라야 한다.
    {
      id: "bsli-2026h1-timeseries-canon",
      title: "BSLI 2026 상반기 정본 — 137개국 기초사회생활지수 시계열 (2016–2024)", titleEn: "BSLI 2026 H1 Canon — Basic Social Life Index Time Series, 137 Countries (2016–2024)",
      region: "글로벌", regionEn: "Global",
      scope: "권역별",
      engine: "BSLI v7.0 · 시계열 v1.2",
      date: "2026-07-26",
      htmlPath: "/engines/bsli/BSLI_2026H1_시계열_전체_v1.2_20260726.html",
    },
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
      id: "reverbant-usa-midterm-2026",
      title: "미국 2026 중간선거 예측 — 봉기가 아니라 선거로 압력을 방전 (관찰자 진단 v4.3)", titleEn: "US 2026 Midterm Forecast — Discharging Pressure Through the Ballot, Not the Barricade (Observer Diagnosis v4.3)",
      region: "미국", regionEn: "United States",
      scope: "단독",
      engine: "REVERBANT · 관찰자 좌표계",
      date: "2026-09-29",
      htmlPath: "/engines/reverbant/미국_2026중간선거예측_v4.3_20260929.html",
    },
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
      id: "ui-ethiopia-2026",
      title: "에티오피아 봉기 벡터 재분석 — 인과좌표계 실측 · 밴드 6축과 생존동맹", titleEn: "Ethiopia Uprising-Vector Reanalysis — Measured Causal Coordinate, Six-Axis Band and the Alliance for Survival",
      region: "아프리카", regionEn: "Africa",
      scope: "단독",
      engine: "UI · Λ¹² 시계열 v2.1 × BSLI v7.0",
      date: "2026-09-27",
      htmlPath: "/engines/ui/국가보고서_구독판_ETH_v2.0_20260927.html",
    },
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
      id: "ppi-report-v1-20261012",
      title: "권력기생지수(PPI) — 공리·역사 기준선·인과루프 포획틀 (연구 초안 v1)", titleEn: "Power Parasite Index (PPI) — Axioms, Historical Baselines and the Capture Loop Framework (Research Draft v1)",
      region: "글로벌 · 연구보고서", regionEn: "Global · Research Report",
      scope: "권역별",
      engine: "§37 PPI",
      date: "2026-10-12",
      htmlPath: "/engines/ppi/권력기생지수_종합보고서_v1_20261012.html",
    },
    {
      id: "ppi-appendix-rulers-20261012",
      title: "별첨 — 군주·지도자 서사: 통치자 356명, 기생 유형별 9분류", titleEn: "Appendix — Narratives of Monarchs and Leaders: 356 Rulers in Nine Types of Parasitic Relationship",
      region: "글로벌 · 별첨", regionEn: "Global · Appendix",
      scope: "권역별",
      engine: "§37 PPI",
      date: "2026-10-12",
      htmlPath: "/engines/ppi/권력기생지수_별첨_통치자서사_v1_20261012.html",
    },
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

  // 오피니언 — 청해 칼럼과 그 원문 보고서 (2026-10-08 '준비중' 카드를 전환)
  "cat-opinion": [
    {
      id: "opinion-world-hunger-narrative-20261009",
      title: "[칼럼] 세계의 굶주림에 대한 서사 — 끼니는 국력이 아니라 성실함의 문제다", titleEn: "[Column] A Narrative of the World's Hunger — Meals Are a Matter of Diligence, Not National Power",
      region: "청해 칼럼", regionEn: "Cheonghae Column",
      scope: "단독",
      engine: "오피니언",
      date: "2026-10-09",
      htmlPath: "/engines/opinion/청해칼럼_세계의굶주림에대한서사_20261009.html",
    },
    {
      id: "opinion-hunger-response-report-20261009",
      title: "[원문 보고서] 세계 결식·식비 불안 — 각국 정부의 대응 점검 보고서", titleEn: "[Source Report] Hunger and Food-Cost Insecurity Worldwide — A Review of Government Responses",
      region: "원문 보고서", regionEn: "Source Report",
      scope: "단독",
      engine: "오피니언",
      date: "2026-10-09",
      htmlPath: "/engines/opinion/세계결식식비불안_각국정부대응점검_원문보고서_20261009.html",
    },
    {
      id: "opinion-oil-not-replaced-20261008",
      title: "[칼럼] 인류의 자원 이동의 역사와 석유 — 석유는 대체되지 않는다", titleEn: "[Column] Humanity's History of Resource Shifts and Oil — Why Oil Is Not Being Replaced",
      region: "청해 칼럼", regionEn: "Cheonghae Column",
      scope: "단독",
      engine: "오피니언",
      date: "2026-10-08",
      htmlPath: "/engines/opinion/청해칼럼_인류의자원이동의역사와석유_20261008.html",
    },
    {
      id: "opinion-resource-paths-report-20261008",
      title: "[원문 보고서] 인류의 자원 이동 경로 분석 — 서장부터 제13장, 지표별 선행연구", titleEn: "[Source Report] An Analysis of Humanity's Resource Paths — Prologue to Chapter 13, with Indicator-Level Literature",
      region: "원문 보고서", regionEn: "Source Report",
      scope: "단독",
      engine: "오피니언",
      date: "2026-10-08",
      htmlPath: "/engines/opinion/인류의자원이동경로분석_원문보고서_20261008.html",
    },
  ],

  // ※ cat-feedback(피드백)은 목록형이 아니므로 이 맵에 넣지 않음
};
