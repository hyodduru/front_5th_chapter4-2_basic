# 🚀 바닐라 JS 프로젝트 성능 개선 사후 보고서

- **URL**: [https://d1dp7q1h3uhnyu.cloudfront.net/](https://d1dp7q1h3uhnyu.cloudfront.net/)
- **측정 일시**
  - 개선 전: 2025.6.3 오후 1:09
  - 개선 후: 2025.6.4 오후 11:06

---

## 1. ✅ 개선 이유

기존 배포 사이트의 **Lighthouse 성능 지표가 낮고**, 특히 **LCP (Largest Contentful Paint)** 수치가 13초 이상으로 매우 느려 사용자에게 불편한 첫 인상을 줄 수 있었음.  
또한 이미지 최적화 미흡, 외부 리소스 로딩, layout shift 등으로 인해 **초기 렌더링 지연과 UX 품질 저하** 문제가 있었음.

---

## 2. 🔧 개선 방법

### 이미지 최적화

- 모든 `.jpg`, `.png` 이미지를 `.webp`로 변환 → 용량 절감
- `<picture>` 태그 사용 → 화면 크기에 따른 최적 이미지 제공
- 이미지에 `width`, `height`, `loading="lazy"` 속성 추가 → layout shift 및 초기 로딩 최적화

### 렌더링 차단 요소 제거

- Google Fonts 외부 요청 제거 → 직접 호스팅
- Cookie Consent 스크립트 초기화 시점을 `DOMContentLoaded` 이후로 지연
- `display: none` → `opacity: 0 + visibility: hidden` 방식으로 변경

### Web Worker 도입

- 무거운 연산(예: 데이터 처리)을 메인 스레드가 아닌 Web Worker에서 처리 → UI 렉 개선

### 시맨틱 마크업 및 접근성 향상

- `aria-label`, `label`, `<header>`, `<main>` 등 시맨틱 태그 도입 → 접근성 및 SEO 점수 개선

---

## 3. 📊 개선 후 향상된 지표

### Lighthouse 점수 변화

| 카테고리       | 개선 전 | 개선 후 | 상태 변화 |
| -------------- | ------- | ------- | --------- |
| Performance    | 73%     | 97%     | 🔶 → 🟢   |
| Accessibility  | 81%     | 95%     | 🔶 → 🟢   |
| Best Practices | 0%      | 0%      | 🔴 → 🔴   |
| SEO            | 82%     | 100%    | 🔶 → 🟢   |
| PWA            | 0%      | 0%      | 🔴 → 🔴   |

### Core Web Vitals

| 메트릭  | 설명                      | 개선 전 | 개선 후 | 상태 변화 |
| ------- | ------------------------- | ------- | ------- | --------- |
| **LCP** | Largest Contentful Paint  | 13.84s  | 2.52s   | 🔴 → 🟠   |
| **INP** | Interaction to Next Paint | N/A     | N/A     | 🟢 유지   |
| **CLS** | Cumulative Layout Shift   | 0.002   | 0.004   | 🟢 유지   |

---

## 4. 📌 기타 사항 및 회고

- `Best Practices` 점수는 여전히 0%로 유지됨  
  → 이는 외부 스크립트나 HTTPS 보안 정책 등 외부 요소 영향이 큰 영역이며, 다음 개선 과제로 검토 필요
- PWA 구현은 이번 개선 범위에 포함하지 않았음 → 향후 기능 강화 계획
- 실사용자 환경에서도 **초기 렌더링 체감 속도 향상**, **이미지 깨짐/지연 없음**, **레이아웃 안정화** 등의 긍정적 반응 확인

> 💡 _이번 작업을 통해 "이미지 최적화 + 렌더링 타이밍 조절 + 연산 분리" 만으로도 프론트엔드 성능이 크게 향상될 수 있음을 체감함._
