---
title: AI 영상 품질관리(QC) 체크리스트
type: concept
tags: [qc, 품질관리, 검수, 아티팩트, 연속성, 라우드니스, 딜리버리]
updated: 2026-06-12
sources: [LTX, VBench, OpusClip, Sprout Social, C2PA 등 — 하단 출처]
---

# AI 생성 영상 품질 관리(QC) 체크리스트

> **목적**: AI 생성 shot/영상을 승인(approve)하기 전 에이전트/리뷰어가 실행하는 완전한 QC 체크리스트.
> **사용법**: 각 `- [ ]` 항목을 검수. ⭐ **굵게** 표시는 실패 시 즉시 **reject(retry)** 대상인 가장 치명적 항목.
> **권장 환경**: 가능하면 frame-by-frame(프레임 단위) 재생으로 미세 flicker·warping 검출. 관련: [[ai-video-prompting]], [[cinematography-composition]], [[audio-editing-post]], [[critical-rules]]

---

## 1. AI 영상 고유 비주얼 아티팩트

### 1-1. 손 / 손가락 — 최우선 결함 영역
- [ ] ⭐ **손가락 정확히 5개 (4·6·7개, 융합/추가 없음)**
- [ ] 손가락이 잘못 꺾이거나 합쳐지지 않는가
- [ ] 손이 물체를 통과하거나 접촉이 부자연스럽지 않은가
- [ ] 움직일 때 손 모양이 프레임마다 변형되지 않는가

### 1-2. 얼굴 / 정체성
- [ ] ⭐ **얼굴이 프레임 간 morphing/melting 없이 유지 (face warping 없음)**
- [ ] ⭐ **identity drift 없음 — 같은 인물의 이목구비·나이·헤어가 클립 내내, 여러 클립에 걸쳐 일관**
- [ ] 눈: 시선 자연스럽고 동공/홍채 글리치 없음
- [ ] 치아: 말/웃을 때 녹거나 개수 변하지 않음
- [ ] 표정 전환이 깜빡이거나 끊기지 않음

### 1-3. 텍스트 / 로고 / 그래픽
- [ ] ⭐ **화면 내 텍스트가 gibberish 아니고 정확히 읽힘**
- [ ] 로고/브랜드 마크가 추상 패턴으로 변형되지 않음
- [ ] 배경 간판·표지판 텍스트가 깨지지 않음

### 1-4. 신체 / 객체 구조
- [ ] ⭐ **extra limbs, 사라지는 사지, 비정상 관절 없음**
- [ ] 객체 영속성(object permanence): 물체가 갑자기 사라지거나 생성되지 않음
- [ ] 객체 크기 drift·형태 melting 없음

### 1-5. 배경 안정성
- [ ] ⭐ **배경이 warping/morphing 없이 안정 (background instability 없음)**
- [ ] 카메라 이동 시 배경 기하 구조 안 일그러짐
- [ ] 텍스처 shimmering/crawling 없음

---

## 2. 시간적 일관성 (Temporal Consistency)
> **프레임 단독 품질이 좋아도 프레임 간 일관성은 보장 안 됨.** 긴 클립·복잡 모션·카메라 이동·얼굴에서 자주 깨짐.

- [ ] ⭐ **flicker 없음 — 픽셀/밝기/색/텍스처가 프레임마다 튀지 않음**
- [ ] jitter / shimmering / crawling 없음
- [ ] popping(갑자기 나타났다 사라짐) 없음
- [ ] 객체가 teleporting 없이 연속 이동
- [ ] 프레임 간 라이팅/노출 무작위 변동 없음 (lighting flicker 없음)
- [ ] temporal drift 없음 (시간 지날수록 형태·정체성 어긋남)
- [ ] 강체 기하 구조가 클립 전체에서 일정

---

## 3. 연속성 (Continuity — 멀티샷)
- [ ] ⭐ **캐릭터 일관성 — 얼굴·헤어·체형이 모든 shot에서 동일**
- [ ] 의상·소품 일관성 (색·디테일·위치)
- [ ] 라이팅 & 컬러 연속성 (조명 방향·색온도·톤)
- [ ] ⭐ **180도 규칙 준수 — 축선 안 넘어 screen direction 일관**
- [ ] screen direction — 이동 방향이 shot 간 안 뒤집힘
- [ ] eyeline match — 시선 방향 올바르게 연결
- [ ] match on action — 동작 연결 매끄러움
- [ ] 배경·공간 위치 관계가 shot 간 모순 없음

---

## 4. 모션 품질
- [ ] ⭐ **물리 법칙 준수 — 무게감·중력·관성 자연스럽고 인물이 미끄러지듯 걷지 않음**
- [ ] 모션이 dreamlike 아니라 grounded
- [ ] 의도치 않은 slow-motion 아티팩트 없음
- [ ] 카메라 무브 smooth, 안 떨림
- [ ] motion blur가 속도에 맞게 적용 (과다/부족/방향 오류 없음)
- [ ] dynamic degree 적절 (정지도 과도도 아님)

---

## 5. 오디오 QC
- [ ] ⭐ **lip-sync 정확 (입 모양↔음성 일치, 45ms 이상 어긋나면 인지됨)**
- [ ] ⭐ **A/V 동기화 — 전체 sync 드리프트 없음**
- [ ] 라우드니스(LUFS)가 타깃 플랫폼 기준 (→ 7장)
- [ ] True Peak 한도 이내 (**-1 dBTP**, Amazon -2)
- [ ] 클리핑/디스토션 없음
- [ ] 음악/보이스/SFX 밸런스 적절, 대사 명료
- [ ] 갑작스러운 컷·끊김·팝 노이즈 없음
- [ ] (AI 음성) 소스 권장 48kHz/24-bit WAV

---

## 6. 기술 / 익스포트 QC
- [ ] ⭐ **해상도/프레임레이트/종횡비가 타깃 스펙과 정확히 일치**
- [ ] 코덱·컨테이너 일치 (H.264/MP4, 마스터는 ProRes/MOV)
- [ ] 비트레이트 충분 (1080p ≥ 8 Mbps)
- [ ] Constant Frame Rate(CFR) — VFR은 sync 문제
- [ ] 컬러 스페이스/감마 올바름 (waveform·vectorscope 확인)
- [ ] duration이 스펙·플랫폼 한도 내
- [ ] title-safe area 내에 텍스트·핵심 그래픽 위치
- [ ] 자막/캡션 정확, 타이밍 맞음
- [ ] (방송) Integrated -23 LUFS(EBU R128) 또는 -24 LKFS(ATSC A/85), TP ≤ -2 dBTP

---

## 7. 플랫폼 딜리버리 스펙
> 2025–2026 기준. **9:16 / 1080×1920**이 숏폼 표준. 납품 전 공식 도움말 최종 확인 권장.

| 플랫폼 | Aspect | 권장 해상도 | 최대 길이 | 프레임레이트 |
|---|---|---|---|---|
| YouTube(가로) | 16:9 | 1920×1080+ | 12시간 | 24/25/30/60 |
| YouTube Shorts | 9:16 | 1080×1920 | 3분 | 24–60 |
| Instagram Reels | 9:16 | 1080×1920 | 90초~ | 23–60 |
| Instagram Feed | 4:5 / 1:1 | 1080×1350 / 1080×1080 | 60분 | 23–60 |
| TikTok | 9:16 | 1080×1920 | 10분(업로드) | 23–60 |

라우드니스(LUFS): YouTube **-14**, IG/Reels·TikTok **-10~-12**, Facebook **-13**, 방송 **-23/-24**. True Peak ≤ -1 dBTP (방송 -2). → 상세 [[audio-editing-post]]
> 플랫폼이 업로드 후 자동 노멀라이즈하므로 **플랫폼별 라우드니스로 별도 export** 권장.

---

## 8. 브랜드 / 법무 / 정책 QC
- [ ] ⭐ **AI 생성 공개(disclosure) 라벨 적용 — 사실적 합성/변조는 플랫폼별 필수**
- [ ] 워터마크/C2PA/SynthID 등 출처 메타데이터가 의도대로 포함/제거
- [ ] 초상권 — 실존 인물 닮은 합성 시 동의, 무단 deepfake 아님
- [ ] IP/저작권 — 보호된 캐릭터·로고·상표·음악 무단 사용 없음
- [ ] 콘텐츠 모더레이션 — 폭력·성인·혐오·허위정보 위반 없음
- [ ] 접근성 — 캡션/자막, 명도 대비
- [ ] 브랜드 가이드라인 — 컬러·로고·톤앤매너 준수

AI 공개 라벨: YouTube(사실적 변조 시 토글), Meta(C2PA 자동 감지 "Made with AI"), TikTok(사실적 합성 시 AI 라벨). 규제: California SB 942(2026-01 시행), EU AI Act Art. 50(2026-08 집행).

---

## 9. 스코어링 — Retry vs Accept

평가 차원(VBench): Quality(subject/background consistency, temporal flickering, motion smoothness, aesthetic, dynamic degree), Semantic(프롬프트 일치), Faithfulness(human fidelity, controllability, physics, commonsense).

| 등급 | 판단 | 기준 |
|---|---|---|
| Excellent | Accept | artifact 0, 모션 유려, identity 유지, 충실 |
| Good | Accept | 경미한 결함만, 손·얼굴·텍스트 깨끗 |
| Fair | 조건부 | 눈에 띄는 flicker/jitter/왜곡 → 보정 가능하면 보정, 아니면 retry |
| Poor | **Reject→Retry** | ⭐ 항목 1개 이상 실패 |

의사결정:
- [ ] **⭐ 항목 하나라도 실패 → 즉시 Reject & Retry** (프롬프트/시드/모델 조정 또는 inpaint)
- [ ] 클로즈업된 손·얼굴·텍스트 결함은 가중치 ↑
- [ ] 보정 비용 < 재생성 비용 + 국소 결함이면 후보정 후 Accept
- [ ] temporal drift·전역 flicker는 후보정 어려움 → Retry
- [ ] N회 재시도 후에도 ⭐ 실패 반복 → 프롬프트 재설계 또는 다른 모델로 에스컬레이션 (→ [[video-pipeline-kanban]] §5)

---

## 출처

- [Temporal Consistency in AI Video — LTX](https://ltx.io/blog/temporal-consistency-in-ai-video), [Temporal Drift — iMerit](https://imerit.ai/resources/blog/solving-temporal-drift-in-ai-generated-video/), [Spotting Artifacts on 4K — KTC](https://us.ktcplay.com/blogs/technology-hub/using-4k-monitors-to-spot-artifacts-in-ai-generated-video), [Fix AI Artifacts — Genra](https://genra.ai/blog/why-ai-videos-look-fake-how-to-fix)
- [VBench — GitHub](https://github.com/Vchitect/VBench), [VBench-2.0 — arXiv](https://arxiv.org/html/2503.21755v1), [4 AI Video APIs Quality Report — Atlas Cloud](https://www.atlascloud.ai/blog/guides/quality-performance-report-4-leading-ai-video-apis-for-visual-fidelity-and-motion-stability)
- [LUFS targets 2025 — Clicky Apps](https://clickyapps.com/creator/video/guides/lufs-targets-2025), [Loudness Normalizers — OpusClip](https://www.opus.pro/blog/best-loudness-normalizers)
- [Lip-Sync Consistency — LongStories](https://longstories.ai/blog/best-practices-ai-voice-lip-sync-consistency)
- [Social Media Video Specs — Sprout Social](https://sproutsocial.com/insights/social-media-video-specs-guide/), [YouTube formatting specs](https://support.google.com/youtube/answer/4603579?hl=en)
- [QC Checklist for Final Delivery — Advids](https://advids.co/insights/the-quality-control-checklist-for-final-video-delivery)
- [AI Disclosure Rules by Platform — Influencer Marketing Hub](https://influencermarketinghub.com/ai-disclosure-rules/), [What is C2PA (2026)](https://c2paviewer.com/articles/what-is-c2pa)
- 180도/eyeline: [Fiveable](https://fiveable.me/understanding-film/unit-7/continuity-editing-180-degree-rule/study-guide/Mb1avv1f8DMaewzJ), [MasterClass](https://www.masterclass.com/articles/understanding-the-180-degree-rule-in-cinematography)
