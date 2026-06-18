---
title: 시네마토그래피 → 프롬프트 변환 (Cinematography to Prompt)
type: concept
tags: [영상, 구도, 렌즈, 조명, 색, 프롬프트, seedance, i2v, 9-16세로]
updated: 2026-06-16
sources: [본문 인라인 citation]
---

# 시네마토그래피 → 프롬프트 변환

> [[cinematography-composition]] 기본편(삼분할·샷사이즈·기본무빙)을 전제로, "왜 그렇게 보이는가"의 지각 논리 + Seedance 2.0/i2v/Midjourney식 모델이 실제 반응하는 **영어 프롬프트 키워드**에 집중. ⭐ = make-or-break. 관련: [[ai-video-prompting]], [[image-generation]], [[subtitles-captions]].

---

## 1. 고급 구도 (지각 논리 + 프롬프트)

모델은 정의가 아니라 결과 이미지 패턴을 학습 → 추상명사보다 **구체적 배치 묘사**가 잘 먹힌다.

- **Leading lines**: 시선은 선을 자동 추종. `leading lines guiding the eye toward the subject`, `converging perspective lines`, `S-curve composition`.
- ⭐ **Depth layering(fg/mg/bg)**: 깊이층 없으면 "평면 스티커"(AI 최빈 실패). `strong foreground element, midground subject, deep background`, `layered depth`, `atmospheric haze separating layers`.
- **Frame-within-frame**: `framed through a doorway/window/arch`, `natural frame around subject`.
- ⭐ **Negative space**: 여백은 능동적 재료(고립·긴장·방향성). `minimalist composition with vast negative space`, `isolated figure in empty landscape`.
- **Balance/symmetry**: `perfectly symmetrical centered` / `tense off-balance framing`.
- **Headroom/lookroom**: `proper headroom`, `looking room in the direction of gaze`.
- **Eye-trace**: 뇌는 고대비·밝기·얼굴·움직임을 우선. ⭐ `subject is the brightest, highest-contrast element`.

출처: [Fiveable Leading Lines](https://fiveable.me/advanced-cinematography/unit-3/leading-lines-visual-paths/study-guide/h0rPaw25uEYkkI7I), [Filmmakers Academy Negative Space](https://www.filmmakersacademy.com/blog-negative-space-film/)

---

## 2. 렌즈 언어 ⭐

⭐ **초점거리 = 공간 감정 다이얼.** 모델은 `mm` + 렌즈종류명에 잘 반응.

| 초점거리 | 효과 | 프롬프트 |
|---|---|---|
| 14–24mm 광각 | 공간확장·원근과장·불안 | `wide-angle lens, 24mm, expansive perspective` |
| 35mm | 인간 시야, 환경+인물 균형 | `35mm natural field of view` |
| 50mm | 표준·중립 | `50mm neutral perspective` |
| 85mm | 인물 압축·배경 분리·친밀 | `85mm portrait lens, flattering compression` |
| 100–200mm 망원 | 압축·드라마틱·위압 | `telephoto compression, compressed background, long lens look` |

- 얕은 심도: `shallow depth of field, f/1.4, creamy cinematic bokeh, subject sharp background blurred`.
- 깊은 심도: `deep focus, everything in sharp focus, f/8`.
- ⭐ 랙 포커스: `rack focus from foreground to subject` (정지 카메라 권장 — Seedance 성공률↑).
- 아나모픽: `anamorphic lens, oval bokeh, horizontal lens flare, 2.39:1`.

출처: [Aituts Midjourney Camera](https://aituts.com/midjourney-camera-prompts/), [Hailuo DoF/Bokeh](https://hailuoai.video/pages/knowledge/mastering-depth-of-field-cinematic-bokeh-prompting)

---

## 3. 조명 설계 ⭐

⭐ **빛은 "어디가 어둡냐"로 무드를 만든다.** 셋업명 + 광질 + 색온도 3요소.
- 3점: `three-point lighting, soft key, subtle fill, rim light`.
- ⭐ 모티베이티드: `motivated lighting from the window`, `practical lamp glow`, `firelight on face`.
- 하이키: `high-key, bright, airy, minimal shadows` / 로우키: ⭐ `low-key, deep shadows, high contrast`.
- 키아로스쿠로: `chiaroscuro, single hard side key, rich blacks`.
- 하드/소프트: `hard light, sharp shadows` / `soft diffused wrapping light`.
- ⭐ 골든아워(1800–2200K): `golden hour, warm backlight, long shadows, rim light, lens flare`.
- 블루아워/야간: `blue hour cool tones, moonlight + warm practicals`.
- 위협: `uplighting from below, ominous`. 볼류메트릭: `volumetric lighting, god rays, haze`.

출처: [Premiumbeat Lighting](https://www.premiumbeat.com/blog/basic-light-placements/), [NumberAnalytics Golden Hour](https://www.numberanalytics.com/blog/the-art-of-golden-hour-cinematography)

---

## 4. 색

- ⭐ **Teal & Orange**: 피부톤(주황)이 청록 배경에서 자동으로 튐. `teal shadows, orange highlights, complementary grade`. ⚠️ 2025–26은 탈-편중 트렌드.
- 색 심리: teal=냉정·우울, orange=온기·희망.
- ⭐ **Color script(픽사식)**: 컷마다 즉흥 금지, 프로젝트 단위 팔레트 먼저 고정.
- ⭐ **LUT/연속성**: AI 영상은 샷마다 색이 흔들림 → 후반에 공통 LUT/그레이드로 색 연속성 강제(거의 필수). 프롬프트엔 동일 색 어휘 복붙(`warm amber tone, teal shadows, film grain`).

출처: [BeverlyBoy Teal/Orange](https://beverlyboy.com/filmmaking/what-is-teal-orange-look/), [Boords LUTs](https://boords.com/blog/what-are-luts-the-ultimate-guide-to-color-grading)

---

## 5. 9:16 세로 구도 전용 ⭐

세로는 UI가 좌우·상하 잠식 → 가로 문법 그대로 못 씀. 1080×1920:
- ⭐ **센터 가중**: 주피사체를 중앙 60–70% 안에.
- **눈높이**: 상단에서 30–35%(상단 1/3) → 자연 헤드룸 + 상단 UI 회피.
- **헤드룸**: 머리 위 8–12%(≈150–230px).
- **세이프존**: 하단 20%·우측 10% 비우기(→ [[subtitles-captions]] 세이프존).
- 프롬프트: `vertical 9:16 composition, subject centered, eyes in upper third, ample headroom, key elements within central safe zone, vertical leading lines`.

출처: [Garage Productions Vertical](https://www.garageproductions.in/vertical-cinematography-masterclass-camera-angles-lenses-and-framing/), [Kreatli Shorts Safe Zone](https://kreatli.com/guides/youtube-shorts-safe-zone)

---

## 6. 종횡비 & 프레이밍 의도

| 타깃 | 비율 | 프롬프트 |
|---|---|---|
| 숏폼 | 9:16 | `vertical 9:16, centered subject, bold close framing, mobile-safe` |
| 롱폼 | 16:9 | `16:9, rule-of-thirds, balanced headroom, environmental context` |
| 시네마틱 | 2.39:1 | `2.39:1 anamorphic widescreen, cinematic letterbox, deep staging` |

---

## 변환표 (핵심 산출물)

> 의도(왼쪽)를 정하고 영어 구(오른쪽)를 Seedance `[Camera]` 슬롯·i2v·이미지 프롬프트에 삽입. ⭐=반응 안정적.

| 의도 | 프롬프트 키워드 |
|---|---|
| 유도선 | ⭐`leading lines guiding the eye to the subject`, `converging lines toward vanishing point` |
| 3층 깊이 | ⭐`foreground, midground, background layers`, `layered depth`, `atmospheric depth haze` |
| 프레임 속 프레임 | `framed through a doorway/window/arch` |
| 여백·고립 | ⭐`minimalist, vast negative space`, `isolated figure in empty landscape` |
| 대칭/긴장 | `perfectly symmetrical centered` / `tense off-balance framing` |
| 시선 강조 | ⭐`subject is the brightest, highest-contrast element` |
| 광각 | `wide-angle lens, 24mm, expansive perspective` |
| 망원 압축 | ⭐`telephoto compression, compressed background, 100mm` |
| 인물 분리 | `85mm portrait lens, flattering compression` |
| 얕은 심도 | ⭐`shallow depth of field, f/1.4, creamy bokeh` |
| 랙 포커스 | ⭐`rack focus from foreground to subject` (정지 카메라) |
| 아나모픽 | `anamorphic lens, oval bokeh, horizontal lens flare, 2.39:1` |
| 3점 조명 | `three-point lighting, soft key, subtle fill, rim light` |
| 모티베이티드 | ⭐`motivated lighting from the window`, `practical lamp glow` |
| 로우키 | ⭐`low-key, deep shadows, high contrast` |
| 키아로스쿠로 | `chiaroscuro, single hard side key, rich blacks` |
| 골든아워 | ⭐`golden hour, warm backlight, long shadows, rim light, lens flare` |
| 위협/언더 | `uplighting from below, ominous` |
| 볼류메트릭 | `volumetric lighting, god rays, haze` |
| 틸&오렌지 | ⭐`teal shadows, orange highlights, complementary grade` |
| 필름룩 | `cinematic film grain, shot on 35mm film` |
| 느린 압박 | `slow push-in (dolly in)` |
| 역동 | `handheld, subtle camera shake, tracking shot following subject` |
| 감독 스타일 | ⭐`cinematography by [DP name]` → 초점거리·팔레트·조명 일괄 호출 |

---

## 스킬/에이전트 규칙 후보

1. 모든 샷 프롬프트에 깊이 명시(`foreground/midground/background`) — 평면화 1순위 실패 방지.
2. 추상 구도어 대신 배치 묘사(`subject centered with symmetrical framing`).
3. 초점거리+심도를 한 쌍으로(`85mm, shallow DoF, creamy bokeh`).
4. 조명은 셋업명+광질+색온도 3요소(`low-key, hard side key, cool 4000K`).
5. 모티베이티드 라이트로 리얼리즘 잠그기(화면 안 광원 명시).
6. 9:16은 센터+상단1/3+세이프존 강제.
7. 랙 포커스·복합 무빙은 정지/단순화(Seedance `static camera + explicit focus pull`).
8. 프로젝트 팔레트 먼저 고정+컷마다 같은 색 어휘 복붙, 최종은 공통 LUT.
9. 타깃 비율에 맞춰 구도 어휘 전환(9:16 close/center, 16:9 thirds, 2.39:1 negative space).
10. 시선 살리언스를 1지점에 몰기(`subject is the brightest element`).
