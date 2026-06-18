---
title: 자막·캡션·키네틱 타이포그래피 (Subtitles & Captions)
type: concept
tags: [영상, 자막, 캡션, 키네틱타이포, 가독성, 세이프존, 한국어자막, 숏폼, 롱폼, 시네마틱]
updated: 2026-06-16
sources: [본문 인라인 citation]
---

# 자막·캡션·키네틱 타이포그래피

> 영상 자막 작업의 모든 결정(타입·가독성·스타일·플랫폼 사양·한국어 처리·AI 워크플로)을 규칙화. 3타깃: (A) 숏폼 9:16, (B) 유튜브 롱폼 16:9, (C) 시네마틱 단편. 한·영 이중자막 고려 포함.
> ⭐ = make-or-break. 관련: [[critical-rules]], [[qc-checklist]], [[audio-editing-post]], [[video-planning-story-structure]].

---

## 1. 캡션 타입 & 용어

| 용어 | 정의 | 토글 | 음향정보 | 주 용도 |
|---|---|---|---|---|
| **Open caption(번인/하드코딩)** | 픽셀에 영구 합성 | ❌ | 스타일 따라 | 숏폼 전부, 타이틀카드 |
| **Closed caption/CC(소프트)** | 별도 트랙, 토글 | ✅ | ✅(효과음·화자ID) | 유튜브 롱폼 |
| **Subtitle(자막)** | 대사만, 청자 대상 | ✅ | ❌ | 번역, 시네마틱 대사 |
| **SDH** | 자막 스타일 + CC 내용 | ✅ | ✅ | 접근성 컴플라이언스 |
| **SRT/VTT(사이드카)** | 외부 타이밍 파일 | ✅ | — | 유튜브 업로드, 다국어 |

- ⭐ **숏폼 = 무조건 open caption(번인)** — 음소거 시청 80–85%, 토글 CC를 안 켠다. 자막이 곧 콘텐츠.
- ⭐ **유튜브 롱폼 = CC(SRT/VTT 사이드카) 업로드** — 토글·다국어·SEO 이득. 자동CC는 교정 후.
- **시네마틱**: 번역 자막은 번인/사이드카 택1, 타이틀카드는 번인. 접근성 필요시 SDH.

출처: [3PlayMedia SDH vs CC](https://www.3playmedia.com/blog/whats-the-difference-subtitles-for-the-deaf-and-hard-of-hearing-sdh-v-closed-captions/), [Netflix](https://partnerhelp.netflixstudios.com/hc/en-us/articles/38231659498387)

---

## 2. 가독성·판독성 사양

방송·OTT 표준(BBC/Netflix/Amara) 기준선:
- **폰트**: Sans-serif 필수. 영문 Montserrat/Helvetica/Inter, 한글 **Pretendard / Noto Sans KR(본고딕)**. Serif·이탤릭 금지.
- **줄 수**: ⭐ 최대 2줄, 1줄 이상적.
- **줄당 글자(CPL)**: 영문 35–42자(BBC 37·Netflix 42), 한글 16자. 숏폼 모바일은 12–24자.
- **읽기속도(CPS)**: ⭐ 핵심. BBC ~15 CPS, Netflix 영문 20·아동 17, 한국어 보수적 **12 CPS**.
- **노출시간**: ⭐ 단어당 최소 ~0.3초(4단어 ≈ 1.2초). 큐 최소 ~0.2초~최대 7초.
- **큐 간 갭**: 150–250ms.
- **대비**: ⭐ 최소 4.5:1(WCAG AA). 외곽선(4–8px)·드롭섀도우·반투명 박스 중 하나 필수.

출처: [Amara CPS](https://blog.amara.org/2024/10/17/crafting-accessible-subtitles-the-critical-role-of-characters-per-second-cps/), [Clevercast/BBC](https://www.clevercast.com/bbc-subtitling-guidelines/), [Subhero](https://subhero.io/blog/subtitle-standards-guide)

---

## 3. 숏폼 캡션 스타일 (Reels/Shorts/TikTok)

- ⭐ **Word-by-word "karaoke" 하이라이트가 retention 최강.** 발화 cadence와 reading rhythm 일치, 활성 단어를 색 전환(흰→노랑/브랜드색)으로 강조.
- ⭐ **타이밍**: 캡션은 오디오보다 100–200ms, 단어 하이라이트는 50–100ms 먼저(읽기가 듣기보다 빠름).
- **캡션당 단어수**: 5–8 이상적(최대 8–12), 1–2줄.
- **폰트 크기**(1080폭): 볼드 60–80pt, 미니멀 40–50pt.
- **배치**: ⭐ talking-head는 중앙~상단중앙, 시연은 상단 1/3. **하단 20% 금지**(UI). 전통 lower-third는 9:16에서 묻힘.
- **이모지**: 줄당 ≤1, 강화 목적일 때만.
- **데이터**: 잘 스타일된 캡션 watch time +23–40%, 캡션 영상 완주율 +80%.
- **피할 것**: 스피닝 텍스트, 과한 바운싱, 빽빽한 블록, 중간 스타일 변경.

출처: [OpusClip](https://www.opus.pro/blog/best-caption-presets-styles-boost-retention), [vocallab](https://www.vocallab.ai/blog/word-highlighting-subtitles), [Blitzcut 2026](https://blitzcutai.com/blog/best-caption-style-youtube-shorts-2026)

---

## 4. 키네틱 타이포그래피 & 온스크린 텍스트

- ⭐ **음성/비트에 동기화** — 단어 등장·강조를 발화·박자에 맞춤.
- ⭐ **절제** — 의미를 바꾸는 단어에만 키네틱 강조. 전 단어 over-bounce는 산만.
- **강조 애니메이션**: scale-pop, color-flip, weight 변화를 미묘하게.
- **타이틀카드/lower-thirds**: 등·퇴장 트랜지션 일관, 화면당 정보 최소. 시네마틱은 fade in/out + 충분 노출.

출처: [influencers-time 키네틱타이포](https://www.influencers-time.com/boost-short-form-views-with-kinetic-typography-in-2025/), [reelwords](https://reelwords.ai/blog/animated-captions)

---

## 5. 툴링 (자동 캡션·정확도)

| 툴 | 강점 | 한국어/정확도 |
|---|---|---|
| **CapCut** | 무료·트렌디 프리셋·번인 쉬움 | 전사 정확도 약, 번역 100+ 언어 |
| **Submagic** | 숏폼 스타일/정확도 90–99% | 명료 오디오 고정밀 |
| **Descript/Veed** | 정확도·SRT 편집 우수 | CapCut보다 정확 |
| **Premiere/DaVinci** | 네이티브 auto-caption | 95–99% |
| **YouTube auto-CC** | 무료 초안 | 고유명사·소음 약 → 교정 필수 |
| **Whisper large-v3** | 오픈소스 SRT/VTT | 한국어 CER ~11%(영어 ~3.9%) |

- ⭐ **한국어 ASR 오류율 ≈ 영어의 3배 → 자동 캡션 후 반드시 사람 교정**(고유명사·띄어쓰기·외래어).

출처: [Whisper large-v3](https://huggingface.co/openai/whisper-large-v3), [ENERZAi Korean ASR](https://medium.com/@enerzai/small-models-big-heat-conquering-korean-asr-with-low-bit-whisper-5836ccd476dd), [Pixflow](https://pixflow.net/blog/ai-automatic-captions-subtitles/)

---

## 6. 플랫폼 세이프존 ⭐

⭐ **세이프존이 자막의 가장 중요한 make-or-break.** 캔버스 1080×1920(9:16):

| 플랫폼 | 안전영역 | 하단 비움(캡션/UI) | 우측(인게이지) |
|---|---|---|---|
| TikTok | 900×1492 | ~320–484px | 120px |
| Reels | 996×1400 | 300–350px | — |
| Shorts | — | ~300px | — |
| **크로스포스트 공통** | **900×1400 중앙** | — | — |

- ⭐ 멀티 플랫폼 동시 업로드면 **가장 좁은 공통 세이프존 900×1400 중앙**으로 설계.
- **유튜브 CC**: SRT 권장, 언어별 트랙 개별 업로드, 16:9는 하단 중앙. 챕터로 탐색성↑.

출처: [Kreatli Safe Zone](https://kreatli.com/guides/safe-zone-guide), [Zeely TikTok](https://zeely.ai/blog/tiktok-safe-zones/)

---

## 7. 한국어 자막 크래프트 ⭐

Netflix 한국어 TTSG 기준:
- ⭐ **줄당 16자**(라틴문자·공백·부호는 0.5자), 최대 2줄.
- ⭐ **CPS(한국어 보수적)**: 일반 성인 12 CPS / SDH 14.
- **폰트**: **Pretendard, Noto Sans KR(본고딕)**. 한글은 자폭·내부공간·자간·굵기 확대가 가독성↑.
- ⭐ **어절 단위 줄바꿈** — 조사·어미를 떼거나 긴밀한 단어를 분리하지 말 것. 다줄은 bottom-heavy(아랫줄이 더 김).
- **이중자막(한·영)**: 한국어 위·영어 아래(또는 반대). 한국어가 더 빨리 차므로 **한국어 기준으로 노출시간 결정**.

출처: [Netflix Korean TTSG](https://partnerhelp.netflixstudios.com/hc/en-us/articles/216001127-Korean-Timed-Text-Style-Guide), [KCI 본고딕 가독성](https://journal.kci.go.kr/jksci/archive/articleView?artiId=ART002987878), [Benjamins 줄바꿈](https://benjamins.com/catalog/btl.78.21per)

---

## 사양 치트시트

| 항목 | 숏폼 9:16 | 유튜브 롱폼 16:9 | 시네마틱 |
|---|---|---|---|
| 캡션 타입 | Open(번인) | CC(SRT/VTT) | 번역=택1, 타이틀=번인 |
| 최대 줄 | 1–2 | 2 | 1–2 |
| 줄당 글자(영/한) | 12–24 / ~12 | 35–42 / 16 | 35–42 / 16 |
| CPS(영/한) | karaoke 동기화 | 17–20 / 12 | 12–15 / 12 |
| 노출 최소 | 단어당 ~0.3s | 40자≥2s | 단어당 0.3s |
| 큐 간 갭 | 150–250ms | ≥2프레임 | ≥2프레임 |
| 폰트크기(1080폭) | 40–80pt | 화면비례 | 절제 |
| 대비 | ≥4.5:1+두꺼운 외곽선 | ≥4.5:1+박스/섀도 | ≥4.5:1+미묘 섀도 |
| 배치 | 중앙~상단1/3 | 하단 중앙 | 하단 중앙 |
| 세이프존 | TikTok 320–484/Shorts 300px | N/A | 액션세이프 5% |
| 폰트 | Montserrat/**Pretendard** | sans/**Noto Sans KR** | sans/**Pretendard** |
| 이모지 | 줄당 ≤1 | 없음 | 없음 |

---

## AI 워크플로 적용

캡션은 **최종 합성 직전~후반**에 위치:
1. 영상·오디오 생성/확정.
2. ⭐ **세이프존 락** — 9:16 생성 시 하단 300–484px·우측 120px를 비운 구도로 프롬프트(→ [[cinematography-prompt-translation]] 9:16 규칙).
3. Auto-caption(Whisper/CapCut/Submagic → SRT).
4. ⭐ **교정** — 한국어 CER ~11%, 고유명사·띄어쓰기·외래어 사람 검수 필수.
5. 스파팅·줄바꿈(CPS 한 12 / 영 17–20, 어절 단위).
6. 스타일(타깃별 프리셋, Pretendard/Noto Sans KR, 외곽선·대비).
7. 번인(숏폼) 또는 사이드카(롱폼 SRT/VTT 언어별).
8. QC — 모바일 실기기에서 세이프존·가독성·동기화 확인, A/B.

---

## 스킬/에이전트 규칙 후보

1. **세이프존 강제**: 9:16 자막 하단 ≥300px(TikTok 484px)·우측 120px 침범 금지. 크로스포스트는 900×1400 중앙.
2. **숏폼=번인 karaoke**: 음소거 80%+ 전제, 단어강조(흰→노랑) 기본.
3. **읽기속도 상한**: 한국어 ≤12 CPS, 영어 ≤17–20 CPS. 초과 시 큐 분할, 최소 노출 = 단어수×0.3초.
4. **2줄·어절 줄바꿈**: 줄당 한글 16/영문 ~42, 어절 중간 끊기 금지, 다줄 bottom-heavy.
5. **타이밍 리드**: 캡션 100–200ms·단어강조 50–100ms 먼저.
6. **대비 의무**: ≥4.5:1 + 외곽선/그림자/박스.
7. **폰트 고정**: 한글 Pretendard/Noto Sans KR, 영문 sans. Serif·이탤릭 금지.
8. **한국어 ASR 교정 게이트**: 미교정 자동CC 출고 금지.
9. **키네틱 절제**: 의미 바꾸는 단어에만 모션, 비트/발화 동기.
10. **타깃별 분기**: 숏폼=크고 화려 / 롱폼=정적+챕터+다국어 SRT / 시네마틱=미니멀 무채색.
