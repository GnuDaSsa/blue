---
title: 오디오·음악·편집·포스트프로덕션
type: concept
tags: [오디오, 사운드디자인, 음악, suno, 편집, 컬러그레이딩, 라우드니스, 숏폼]
updated: 2026-06-12
sources: [Soundplate, StudioBinder, iZotope, OpusClip 등 — 하단 출처]
---

# AI 영상 에이전트를 위한 오디오 / 음악 / 편집·포스트프로덕션 가이드 (2025–2026)

> AI 생성 영상 소재를 **완성도 높은 최종본**으로 마감하기 위한 sound design·music·editing·color·loudness·export·licensing 지식. 관련: [[ai-video-prompting]], [[qc-checklist]], [[critical-rules]]

---

## 0. 에이전트가 반드시 알아야 할 핵심
- ⭐ **무음 영상은 미완성. 최소 4개 layer (Dialogue/VO · Music · SFX · Ambience)를 항상 의식, 빈 layer 없는지 체크.**
- ⭐ **플랫폼별 LUFS 맞춰라. YouTube/Spotify -14, 방송 -23/-24, TikTok/Reels ≈ -9~-14. True peak -1.0 dBTP 이하.**
- ⭐ **Short-form은 first 3 seconds가 전부. Hook을 0–3초에. 3초 retention 65%+가 노출량을 4–7배 좌우.**
- ⭐ **80%가 무음으로 본다. Captions 필수. 4–7 단어 chunk, 고대비, safe zone.**
- ⭐ **Music에 cut을 맞춰라(cut-to-the-beat). 강한 beat/drop에 visual hit 정렬.**
- ⭐ **Export: 48 kHz / 24-bit / AAC-LC / Stereo / 384 kbps. 최종 mux 전 loudness normalize.**
- ⭐ **AI 음악도 copyright/licensing 리스크(Content ID, 학습데이터 소송). 상업용은 라이선스 명확한 소스.**

---

## 1. Sound Design — 소리의 4층 구조
표준 트랙: **DX(Dialogue), MX(Music), SFX, AMB(Ambience), RT(Room Tone), FLY(Foley).**

| Layer | 역할 | 에이전트 체크포인트 |
|---|---|---|
| **Dialogue/VO** | 정보·감정 중심, 가장 명료 | 최상단 우선순위, 노이즈 제거 |
| **Music/BGM** | 감정 톤·페이싱·에너지 | 대사 덮지 않게 ducking, mood/BPM 일치 |
| **SFX** | footsteps·impact·whoosh·UI | 빈 동작 보강, 화면 hit과 sync |
| **Ambience/Room Tone** | 공간 배경음 | ⭐ 컷 사이 정적 메우기, AI 영상의 부자연스러운 무음 채움 |

믹스 우선순위: ① Dialogue first ② ducking/sidechain(대사 시 music -6~-12dB) ③ frequency separation ④ room tone로 봉합.
> ⭐ **AI 영상은 클립마다 ambience가 끊겨 "디지털 무음"이 생긴다. 전체에 연속 ambience bed 하나만 깔아도 즉시 프로처럼 들린다.**
대략 밸런스: Dialogue 0dB → Music -12~-18dB(대사 구간)/-3~-6dB(간주) → Ambience -18~-30dB.

---

## 2. AI Music & Audio Tools (2025–2026)

| 도구 | 강점 | Licensing |
|---|---|---|
| **Suno (v5/Studio)** | 가장 대중적, 1,200+ 장르, 감정 vocals, Studio DAW+stems | Warner와 2025-11 합의(과거 소송 이력) |
| **Udio** | **Inpainting**(구간 재생성), stem 분리 | 라이선스 정비 중 |
| **ElevenLabs** | 일관성, **VO·dubbing·SFX 통합** | ⭐ Believe·Kobalt·Merlin 라이선스 → 상업 안전 |
| **Adobe Firefly Audio** | Generate SFX/Speech, CC 통합 | 상업 안전 지향(IP indemnity) |
| **Stable Audio 3.0** | 온디바이스 SFX·music | 라이선스 학습 |

음악 프롬프팅(Suno): ⭐ **`Mood + Genre/Era + Key Instruments + Vocal Type + Production Tone + BPM`**. primary genre 맨 앞, 명령 아닌 묘사, **4–7 descriptors**, 명시적 BPM/Key(영상 BPM과 맞춤), 악기·vocal 명시, `[Verse][Chorus][Bridge]` 구조 태그.

---

## 3. Beat-Matching / Music-Driven Editing
cut·transition을 음악 beat에 정렬 → 의도적·리드미컬.
- **Beat hierarchy**: kick/drop=큰 마커, snare/chord=중간, hi-hat=작은 마커.
- ⭐ **Anticipation cut: 컷을 beat보다 1–2 frame 먼저** → 타격감 강화.
- **BPM↔fps 정렬**: `frames per beat = (60/BPM)×fps`. 예) 120BPM·30fps → 15 frames/beat(정수 → 깔끔).
- **Energy build**: 도입 긴 컷 → 후반·드롭에서 컷 짧게(cut rate↑). drop 직전 짧은 정적/freeze로 긴장.
> 강한 A/V sync 영상은 완주율 최대 40%↑(Facebook).

---

## 4. Loudness Standards — LUFS by Platform
⭐ **반드시 외울 표.**

| Platform / 표준 | Integrated | True Peak |
|---|---|---|
| Spotify / YouTube / Apple Music | -14 / -14 / -16 | -1.0 dBTP |
| Amazon Music | -14 | **-2.0** dBTP |
| **TikTok / IG Reels** | **≈ -9 ~ -14** (공식 미공개) | -1.0 |
| Facebook | ≈ -13 | -1.0 |
| **방송 EBU R128 (EU)** | **-23** | -1.0 |
| **방송 ATSC A/85 (US)** | **-24 LKFS** | -2.0 |

- ⭐ 너무 hot하면 플랫폼이 공격적으로 limiting/turn-down. Target에 맞춰 마스터.
- True peak -1.0 dBTP 이하(transcode 후 inter-sample clip 방지). LKFS ≈ LUFS.
- 안전 전략: **-14 LUFS 마스터 + TP -1**, 숏폼은 약간 hot(-9~-12)으로 별도 export.

---

## 5. Editing Craft

| Transition | 언제 |
|---|---|
| Hard cut | 기본, 숏폼 에너지 핵심 |
| **J-cut** (소리 먼저) | 자연스러운 도입, 대화 연결 |
| **L-cut** (소리 이어짐) | 인터뷰·대화, 감정 여운 |
| Match cut | 매끄러운 시공간 점프 |
| Whip pan | 속도감, 급전환, 숏폼 펀치 |
| Dissolve / Wipe | 시간 경과 / 챕터 구분 |

> ⭐ **J/L cut은 가장 프로다운 기법** — 오디오를 영상보다 먼저/나중에 흘려 컷을 매끄럽게.
- Cut rate가 톤 결정(빠름=긴박, 느림=차분). variation으로 단조로움 방지.
- 컷은 동작·시선·소리·beat에 동기. ⭐ **숏폼은 "dead air" 금지** — 정적·느린 구간 잘라내고 컷 촘촘히.

---

## 6. Color Grading in Post
워크플로: **Primary → Secondary → Look(LUT) → Shot matching.**
- Primary(exposure·WB·contrast·sat) → Secondary(영역 격리, skin/하늘) → LUT(일괄 색 매핑, 1D 밝기 vs 3D 색상) → Shot matching(여러 shot·카메라 통일).
- **Teal & Orange**: shadows=teal, highlights=orange, skin을 orange로 빼 배경과 대비.
> ⭐ **AI 영상은 클립마다 색온도·채도 제각각. 통일 LUT + shot matching으로 일관 룩 강제가 "완성도"의 큰 부분.** (단 LUT는 출발점, primary 먼저.) → [[cinematography-composition]] §7

---

## 7. Pacing for Short-Form (Reels/Shorts/TikTok)
⭐ **구조: Hook(0–3s) → Body/Escalation(3s–80%) → Payoff(마지막 15–25%) → CTA/Loop(마지막 3–5s).**
- Hook window 0–3초, swipe-away는 2–3초 집중. 3초 넘긴 65%가 10초까지, 그중 45%가 30초까지.
- ⭐ 3초 retention 65%+ 영상은 노출 4–7배.
- **Pattern interrupt**: 5–8초마다(jump cut/zoom/caption/SFX는 2–3초마다).
- ⭐ **Captions 필수**(80% 무음 시청): AA 대비, 4–7 단어 chunk, 즉시 등장, top/bottom safe zone.
- 플랫폼 성향: TikTok(audio·trending sound 가중), IG Reels(polish·saves·face-forward), YT Shorts(검색 친화 hook).

---

## 8. Export & Final Mux

| 항목 | 권장 |
|---|---|
| Codec | AAC-LC |
| Sample rate | **48 kHz** |
| Bit depth(작업) | 24-bit |
| Channels | Stereo |
| Bitrate | 384 kbps |

체크리스트: ① ⭐ 타깃 LUFS normalize ② TP limiter -1.0(Amazon -2.0) ③ 대사 기준 믹스(폰 스피커 명료) ④ stems 분리 보관(재버전·dubbing) ⑤ A/V drift·beat-sync 확인 ⑥ container/codec(H.264/H.265+AAC).

---

## 9. Music Licensing Awareness
- **Royalty-free** = "지속 royalty 안 냄"일 뿐 무료/무제한 아님. 라이선스 확인.
- ⭐ **YouTube Content ID**: 정당하게 라이선스한 음악도 flag 가능(소리 매칭). 대응: license link를 description에, 또는 사전 클리어 라이브러리.
- **TikTok CML**(100만+ 사전 클리어, 브랜드 안전). ⭐ 단 TikTok 일반 음악 라이선스는 **TikTok 안에서만** 유효(재사용 불가).
- royalty-free 소스: Epidemic Sound, Artlist, Uppbeat, Soundstripe, YouTube Audio Library, Thematic.
- ⭐ **AI 음악도 안전지대 아님**(Suno–Warner 2025-11 settled). 상업용은 라이선스 학습 명확한 도구(ElevenLabs Music, Stable Audio, Udio) 또는 사전 클리어 우선.

**에이전트 결정 규칙**: 개인/비상업+플랫폼 내부 → 플랫폼 라이브러리 OK. 상업/브랜드/크로스플랫폼 → CML / royalty-free / 라이선스 명확한 AI만. VO·SFX 자가 생성으로 Content ID 리스크 최소화.

---

## 10. 마감 체크리스트 (Final Polish)
1. ☐ 4 layers 존재 (빈 layer 없음)
2. ☐ Ambience bed로 디지털 무음 제거
3. ☐ Music ducking으로 대사 명료
4. ☐ Cut을 beat/동작/소리에 맞춤(anticipation 1–2 frame)
5. ☐ Color: primary→LUT→shot matching
6. ☐ Hook 0–3초, pattern interrupt, captions(4–7단어)
7. ☐ Loudness: 타깃 LUFS + TP -1
8. ☐ Export: 48kHz/24-bit/AAC-LC/Stereo/384kbps
9. ☐ Licensing 확인(Content ID 안전)
10. ☐ 최종 A/V sync·drift 점검 후 mux

---

## 출처

- [Streaming Loudness LUFS Table — Soundplate](https://soundplate.com/streaming-loudness-lufs-table/), [LUFS targets 2025 — Clickyapps](https://clickyapps.com/creator/video/guides/lufs-targets-2025), [Loudness guide — Production Expert](https://www.production-expert.com/production-expert-1/loudness-everything-you-need-to-know), [EBU R128 — Wikipedia](https://en.wikipedia.org/wiki/EBU_R_128)
- [Sound Design for Film — StudioBinder](https://www.studiobinder.com/blog/what-is-sound-design-for-film/), [Balancing Dialogue/Music/SFX — C-I Studios](https://c-istudios.com/balancing-dialogue-music-and-sound-effects-audio-mixing-techniques-for-film-and-video/), [Sound Mixing — iZotope](https://www.izotope.com/en/learn/sound-mixing-in-film)
- [Suno vs Udio vs ElevenLabs 2026 — AI Magicx](https://www.aimagicx.com/blog/suno-vs-udio-vs-elevenlabs-music-comparison-2026), [Suno Prompt Guide — AvenueAR](https://avenuear.com/2025/10/28/suno-ai-music-prompt-guide/), [Firefly SFX — WinBuzzer](https://winbuzzer.com/2025/07/20/adobe-fireflys-new-ai-tool-generates-sound-effects-from-voice-and-text-xcxwbn/)
- [Beat Sync Editing — Bitcut](https://bitcut.app/blog/beat-sync-video-editing), [Frame Rate to BPM — bchillmix](https://bchillmix.com/pages/frame-rate-bpm)
- [Editing Transitions — StudioBinder](https://www.studiobinder.com/blog/types-of-editing-transitions-in-film/), [Cinematic Color Grading — Filmsupply](https://www.filmsupply.com/articles/cinematic-color-grading/), [LUTs — Murphy](https://murphy.inc/colour-grading-luts/)
- [TikTok Hook Formulas — OpusClip](https://www.opus.pro/blog/tiktok-hook-formulas), [Shorts retention — Virvid](https://virvid.ai/blog/ai-shorts-increase-retention-watch-time)
- [Delivery Formats — Fiveable](https://fiveable.me/sound-design/unit-16/delivery-formats-technical-specifications/study-guide/175stfl8yF7FMyxV), [Commercial music on TikTok](https://support.tiktok.com/en/business-and-creator/creator-and-business-accounts/commercial-use-of-music-on-tiktok), [Royalty-free for commercial — Soundstripe](https://www.soundstripe.com/blogs/royalty-free-music-for-commercial-use-what-covers-you)
