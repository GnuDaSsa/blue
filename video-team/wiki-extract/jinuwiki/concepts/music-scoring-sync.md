---
title: 음악 스코어링·싱크 (Music Scoring & Sync) — 2026 보강
type: concept
tags: [영상, 음악, 사운드, suno, 라우드니스, lufs, 비트싱크, seedance, 라이선스]
updated: 2026-06-16
sources: [본문 인라인 citation]
---

# 음악 스코어링·싱크 (2026 보강)

> [[audio-editing-post]]가 사운드 4계층·비트매칭·LUFS·편집을 다룬다. 이 페이지는 그 위의 **2026 델타**에 집중: 감정 스코어링 수치, Suno Studio/스템, Seedance 오디오 I/O 싱크, 멀티밴드 사이드체인, 라이선스 갱신. ⭐ = make-or-break. 관련: [[seedance-2.0]], [[editing-directing-technique]], [[video-planning-story-structure]].

---

## 1. 감정 스코어링 (수치 시작점)

음악은 영상 감정을 무의식 레벨에서 지정한다.
- **키**: 단조=슬픔·긴장·공포, 장조=기쁨·승리·희망(거의 보편).
- **템포·각성도**: 고각성 감정 ≈ 150 BPM 최대, 저각성 ≈ 90 BPM 최적.

| 감정 | 키 | BPM | 비고 |
|---|---|---|---|
| 에너지/훅(숏폼) | major/modal | 120–150+ | 즉각 드라이브 |
| 긴장/서스펜스 | minor | 60–90(+라이저) | 빌드업 해결 |
| 슬픔/감성 | minor | 60–80 | 넓은 다이내믹 |
| 승리/고양 | major | 100–130 | 코러스 임팩트 |
| 평온/내성 | major/modal | 70–90 | 미니멀 편성 |

⭐ **편집 전에 무드/키/BPM부터 확정.** 톤 안 맞으면 비주얼이 좋아도 망한다.

출처: [Tempo & Emotion PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4971092/), [Psychology of Film Scores](https://maestrobilly.substack.com/p/the-psychology-of-film-scores-how)

---

## 2. 라우드니스 표준 ⭐

⭐ **숫자를 틀리면 플랫폼이 음량을 강제 조정 → 작아지거나 찌그러진다.**

| 플랫폼 | 통합 LUFS | True Peak | 비고 |
|---|---|---|---|
| YouTube | **−14** | −1.0 dBTP | 더 크면 다운노멀라이즈 |
| TikTok | **−10~−12** | −1.0 dBTP | ⭐ 인피드 노멀라이즈 없음 → 큰 쪽 유리 |
| Instagram Reels | **−10~−12** | −1.0 dBTP | 모바일 스피커 기준 |
| 방송(EBU R128) | **−23** | −1.0 dBTP | LRA 5–15 LU |
| 시네마(극장) | **−27~−31** | — | 다이내믹 보존, 압축 최소 |

- TikTok/Reels는 라우드니스 전쟁 유효(크게). 시네마는 정반대(다이내믹 보존).
- ⭐ True Peak는 어디든 −1.0 dBTP 이하(코덱 클리핑 방지).

출처: [Songbrain LUFS 2026](https://www.songbrain.ai/guides/lufs-for-spotify-and-tiktok), [EBU R128 cinema](https://tech.ebu.ch/docs/r/r128s4.pdf)

---

## 3. 믹싱 — 대사 명료도 우선 ⭐

- **사이드체인 더킹**: 대사가 임계점 넘으면 음악 자동 감쇠.
- ⭐ **멀티밴드 사이드체인(권장)**: 음악 버스에 **800Hz–6kHz 대역만** 대사로 사이드체인 → 중역만 비켜주고 저/고음 무게 유지.
- **주파수 카빙**: 대사 명료대역(1–4kHz)을 음악에서 EQ로 살짝 깎기.
- 게인 시작점: 대사 −12~−6 dBFS / 대사 위 음악 −15~−20 dB / 대사 없는 구간 풀 레벨.
- ⭐ **대사 명료도 > 음악 임팩트.** 의심되면 음악을 더 낮춰라.

출처: [iZotope Sidechain](https://www.izotope.com/en/learn/what-is-sidechain-compression)

---

## 4. Suno (2026) 실무 ⭐

- **Suno Studio(Pro+, ~$10/월)**: 스템 분리(Vocals/Drums/Bass/Other), 섹션 편집, 네거티브 프롬프트, Warp Markers. 단일 패스 최대 4분, extend로 연장. DAW export 가능.
- **구조 태그**(가사창 한 줄씩): `[Intro][Verse][Pre-Chorus][Chorus][Bridge][Build][Drop][Outro][Instrumental]`.
- **무드 컨트롤**: 아티스트명 대신 제작 디스크립터 레이어링("modern pop, radio-ready mix, punchy drums, wide stereo"), 네거티브는 끝에("no autotune").
- **영상 비트맵 정렬**: 영상 길이/비트맵 먼저 → 구조 태그로 `[Build]→[Drop]`을 임팩트 지점에 → Suno는 정밀 BPM 약하므로 DAW 워프/트림으로 마커 정렬 → 스템으로 다이내믹 재배치.
- ⚠️ v5.x 이전 모델은 2026 중 deprecated 예정.

출처: [Suno v5 Guide](https://hookgenius.app/learn/suno-v5-complete-guide/), [Suno Studio FAQ](https://jackrighteous.com/en-us/blogs/guides-using-suno-ai-music-creation/suno-studio-beginners-guide-faq)

---

## 5. Seedance 오디오 I/O 싱크 ⭐

- **입력 사양**: ⭐ **MP3만, 최대 3파일, 합산 15초.** 1회 생성 오디오3+이미지9+비디오3.
- 모델 분석: 비트 위치/다이내믹 컨투어/음색/구조 → "비트=전환점, 빌드=가속 카메라, 드롭=급격 시각 전환".
- ⭐ **영상 길이 = 오디오 길이**로 맞춰 싱크 드리프트 방지.
- **싱크 프롬프트(@ 문법)**: `Use @Audio1 as the rhythmic foundation. Sync camera transitions to the beat positions. At the drop ~6s, snap from wide shot to extreme close-up.`
- **파이프라인**: 음악 먼저(Suno) → 가장 다이내믹한 15초 컷(DAW 트림) → 레퍼런스 준비 → 싱크 프롬프트 → 생성 길이=오디오 길이 → 검수·반복.
- 후처리: 네이티브 오디오 위 SFX(whoosh/riser/impact) 레이어 + 타깃별 라우드니스 노멀라이즈 + 대사 멀티밴드 사이드체인.

출처: [Seedance Beat-Sync OpusClip](https://www.opus.pro/blog/sync-video-to-music-beats-seedance), [WaveSpeed Seedance 2.0](https://wavespeed.ai/blog/posts/seedance-2-0-complete-guide-multimodal-video-creation/)

---

## 6. 라이선스/권리 ⭐

- ⭐ **Suno 무료 플랜 음악은 상업/수익화 영상 금지.** 유료(Pro/Premier)만 상업 라이선스(소유권 아닌 영구 라이선스).
- **저작권 등록 불가**: 순수 AI 생성물은 인간 저작성 부족 → 도용 방어권 약.
- **YouTube Content ID(2025.7)**: 순수 AI 음악(미수정)은 수익화·Content ID 대상 아님. 변형적 인간 입력 필요.
- ⭐ **실무 결론**: 유료 Suno 음악을 내 영상 BGM으로 쓰는 건 OK(영상 수익화 가능). 음원 단독 Content ID 등록·판매는 위험.
- **시네마틱 안전책**: 로열티-프리 라이브러리(Epidemic/Soundstripe) 병행.

출처: [Suno Commercial Rights Terms.Law](https://terms.law/ai-output-rights/suno/), [YouTube AI Music Content ID](https://blog.genxnotes.com/en/can-you-get-youtube-content-id-on-suno-generated-ai-music/)

---

## 플랫폼별 차이

| 항목 | 숏폼 9:16 | 롱폼 16:9 | 시네마틱 |
|---|---|---|---|
| LUFS | −10~−12(크게) | −14 | −27~−31(다이내믹) |
| 다이내믹 레인지 | 좁게 | 중간 | 넓게 |
| 비트매칭 밀도 | 높음(비트당 컷) | 선택적 | 다이내믹 컨투어 |
| SFX 밀도 | 매우 높음 | 강조·전환만 | 폴리·앰비언스 절제 |
| 음악 역할 | 즉각 에너지·훅 | 페이싱·챕터 무드 | 내러티브 스코어 |

---

## 스킬/에이전트 규칙 후보

1. **음악부터 정한다**(무드/키/BPM: 고각성 ~150, 저각성 ~90).
2. **라우드니스 타깃 강제**: 숏폼 −10~−12, 유튜브 −14, 시네마 −27~−31, True Peak ≤ −1.0.
3. **Seedance 오디오 = MP3·≤3파일·≤15초, 영상 길이 = 오디오 길이.** 가장 다이내믹한 15초만.
4. **싱크 프롬프트에 타임스탬프 명시**("~Ns 드롭에서 와이드→클로즈업").
5. **모든 비트에 컷 금지**(숏폼만 비트당 컷, 롱폼·시네마는 빌드/드롭).
6. **대사 명료도 우선**: 대사 위 음악 −15~−20dB, 800Hz–6kHz 멀티밴드 사이드체인.
7. **숏폼 2–3초마다 패턴 인터럽트(컷+SFX)**, 트랜지션마다 whoosh/riser/impact.
8. **Suno는 유료 플랜으로만 상업 영상 사용.**
9. **순수 AI 음원을 Content ID에 등록하지 않는다.**
10. **시네마틱은 로열티-프리 라이브러리 병행.**
