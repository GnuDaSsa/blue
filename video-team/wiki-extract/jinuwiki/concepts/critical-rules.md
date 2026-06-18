---
title: ⭐ 영상작업 필수 규칙 (Critical Rules Checklist)
type: concept
tags: [필수, 체크리스트, 규칙, 영상작업, codex]
updated: 2026-06-12
sources: [위키 내 각 concept/entity 페이지 종합]
---

# ⭐ 영상작업 필수 규칙 — Codex 하네스 체크리스트

> 위키 전체에서 **"틀리면 안 되는" 핵심 규칙(⭐)만** 모은 단일 체크리스트.
> Codex(실제 영상작업 에이전트)는 영상 작업 시작 전 이 페이지를 먼저 훑고, 각 단계에서 해당 항목을 체크한다. 출처 페이지로 drill-down: [[video-planning-story-structure]] · [[ai-video-prompting]] · [[image-generation]] · [[cinematography-composition]] · [[cinematography-prompt-translation]] · [[editing-directing-technique]] · [[video-pipeline-kanban]] · [[qc-checklist]] · [[audio-editing-post]] · [[music-scoring-sync]] · [[subtitles-captions]] · [[github-resources]]

---

## A. 구도·연출 (작업 전 설계) → [[cinematography-composition]]
- [ ] ⭐ **화면비(9:16/16:9 등)를 먼저 정하고** 그 안에서 구도 설계. i2v 출력 비율과 일치.
- [ ] ⭐ 감정 강도 ∝ 샷 사이즈(타이트할수록 몰입↑). 와이드→미디엄→클로즈업 커버리지.
- [ ] ⭐ 앵글은 권력 신호(low=우위, high=열위). 의도 없으면 eye-level.
- [ ] ⭐ Dolly(이동)≠Zoom(렌즈). 모든 카메라무브에 동기(motivation).
- [ ] ⭐ Headroom·Lookroom(시선 앞 공간) 확보.
- [ ] ⭐ **180도 법칙·시선 일치·screen direction을 컷 사이에서 일관 유지** (AI가 가장 흔히 어기는 부분).
- [ ] ⭐ Motivated light(빛은 장면 내 광원과 논리적으로 일치). 보색(teal&orange)으로 인물 분리.

## B. 이미지/키프레임 생성 → [[image-generation]]
- [ ] ⭐ 영상 화질은 **스틸 품질**이 결정. 첫/끝 프레임 최소 1024², 권장 1920×1080+, AI 아티팩트(손·얼굴) 없는 깨끗한 스틸.
- [ ] ⭐ 캐릭터 일관성 = **LoRA + IP-Adapter + ControlNet + seed 고정 + 원본 재사용** 레이어드 조합.
- [ ] ⭐ instruction 편집(Kontext/Nano Banana)은 **항상 원본에서 재편집**, 정체성 보존 문구 명시.
- [ ] ⭐ 첫 프레임에 **motion space**(움직일 여백) + depth layer(parallax) 확보. 꽉 찬 클로즈업 금지.
- [ ] ⭐ 인물 업스케일은 보존형(Topaz) 우선(Magnific은 얼굴 왜곡 위험).

## C. 영상 프롬프팅 → [[ai-video-prompting]]
- [ ] ⭐ **샷당 카메라무브 1 + 동작 1.** 8초보다 4초×2 스티칭이 안정적.
- [ ] ⭐ 카메라무브는 **별도 문장**으로 전문용어 명시(`static shot` / `slow dolly-in`).
- [ ] ⭐ 대사는 **큰따옴표**, 효과음 `SFX:`, 배경음 `Ambient:`.
- [ ] ⭐ Negative는 모델별 상이 — **Runway는 negation 미지원**(긍정 서술), Kling/Wan은 지원.
- [ ] ⭐ 일관성은 reference 시스템 + seed 고정. reference는 **2–4장(다른 각도)**, 과다 금지.
- [ ] ⭐ first/last frame으로 전환·연출 정밀 제어.

## D. 파이프라인·하네스·상태관리 → [[video-pipeline-kanban]]
- [ ] ⭐ 각 stage는 **input artifact 계약 검증 후 진입** (keyframe 없이 video gen 금지).
- [ ] ⭐ **character/reference sheet를 scene 이미지보다 먼저** 생성.
- [ ] ⭐ 카드=shot, **cold-start 재개 가능한 완전 state**(seed·prompt history·params·refs·retries·budget).
- [ ] ⭐ **Generating 단계에 가장 엄격한 WIP**(비용·rate limit 병목). budget cap·max retries 도달 시 자동 중단+handoff.
- [ ] ⭐ **이전 shot last-frame으로 다음 shot first-frame conditioning**(consistency).
- [ ] ⭐ tool 호출에 idempotency key, 생성 output에 record-and-replay(중복 과금 방지).
- [ ] ⭐ **storyboard/animatic 승인 = video gen 직전 핵심 human gate.**
- [ ] ⭐ blocked content(faces)는 cinematic 재작성으로 우회, 단 **실존 인물·IP는 회피**. (moderation은 keyword 매칭인 경우 많음. input 통과·output 차단이면 credit 소모됨 → prompt 자체 변경)

## E. 오디오·편집·마감 → [[audio-editing-post]]
- [ ] ⭐ 무음 영상은 미완성 — **4 layer(Dialogue/Music/SFX/Ambience)** 채우기, 연속 ambience bed로 디지털 무음 제거.
- [ ] ⭐ **cut-to-the-beat**(anticipation 1–2 frame), 숏폼은 dead air 금지.
- [ ] ⭐ 통일 LUT + shot matching으로 클립 간 색 일관.
- [ ] ⭐ 숏폼 **Hook 0–3초**, captions 필수(4–7 단어, 고대비, safe zone).
- [ ] ⭐ Loudness 타깃 LUFS(YT -14 / 숏폼 -9~-12 / 방송 -23/-24) + TP -1.0 dBTP.
- [ ] ⭐ Export 48kHz/24-bit/AAC-LC/Stereo/384kbps. 음악 라이선스·Content ID 확인.

## F. QC (승인 전 게이트) → [[qc-checklist]]
- [ ] ⭐ **손가락 5개 / 얼굴 morphing·identity drift 없음 / 텍스트 gibberish 아님 / extra limbs 없음 / 배경 warping 없음.**
- [ ] ⭐ **flicker·jitter·temporal drift 없음** (frame-by-frame 검수).
- [ ] ⭐ 멀티샷 **연속성**(캐릭터·의상·라이팅·180도·eyeline).
- [ ] ⭐ **lip-sync·A/V sync** 정확.
- [ ] ⭐ 해상도/fps/종횡비가 타깃 스펙과 일치.
- [ ] ⭐ AI 생성 **disclosure 라벨**·초상권·IP·저작권 점검.
- [ ] ⭐ **⭐항목 1개라도 실패 → 즉시 Reject & Retry.** N회 반복 실패 → 프롬프트 재설계/다른 모델 에스컬레이션.

## G. 기획·구조 (작업 시작 전) → [[video-planning-story-structure]]
- [ ] ⭐ **PACKAGE-FIRST**: 유튜브 롱폼은 기획 전 제목 1개 + 썸네일 콘셉트 1줄을 먼저 확정. 안 서면 콘셉트 반려.
- [ ] ⭐ **HOOK-WINDOW**: 후크 예산을 포맷별로 — 숏폼 3초(완수율 80% 결정), 롱폼 30초(70%+), 시네마틱 콜드오픈. 후크를 비트#1로 고정.
- [ ] ⭐ **OPEN-LOOP**: 후크에서 던진 약속의 페이오프를 비트시트 마지막에 명시 배치.
- [ ] ⭐ **5-SEC-RULE / LOOP**: 숏폼은 변화 없는 5초 구간 금지, 마지막 샷↔첫 샷 심리스 루프 점검.
- [ ] ⭐ **SHOT-BUDGET + CHARACTER-LOCK**: 3-비트(Establish/Disrupt/Resolve)로 분해, 각 샷 ≤8초·단일 동작. 모든 샷에 동일 Anchor(인물/장소/팔레트/카메라) 문장 복붙.

## H. 컷 연결·연출 (AI 샷이 붙도록) → [[editing-directing-technique]]
- [ ] ⭐ **Frame chaining**: 샷 N last-frame을 샷 N+1 first-frame으로(또는 Seedance video extension). screen direction·eyeline을 컷 사이 뒤집지 마라.
- [ ] ⭐ 편집 타이밍은 화면이 아니라 **오디오에 맞춘다**(J/L컷·사운드브리지). 연속 ambience bed + 비트싱크 필수.
- [ ] ⭐ 플랫폼 ASL 적용(숏폼 0.5–2초 / 롱폼 2–5초 / 시네마 4–8초+), 빠른 구간 뒤엔 이완. 화려한 전환을 약한 컷의 목발로 쓰지 마라.

## I. 시네마토그래피 프롬프트화 → [[cinematography-prompt-translation]]
- [ ] ⭐ 모든 샷 프롬프트에 **깊이 명시**(`foreground/midground/background`) — 평면화 1순위 실패 방지.
- [ ] ⭐ 초점거리 + 심도를 한 쌍으로(`85mm, shallow DoF, creamy bokeh`), 조명은 셋업명+광질+색온도 3요소.
- [ ] ⭐ 9:16은 센터 가중 + 눈 상단 1/3 + 세이프존(하단 ≥300px·우측 120px) 강제.
- [ ] ⭐ 프로젝트 단위 팔레트 먼저 고정 + 컷마다 같은 색 어휘 복붙, 최종은 공통 LUT.

## J. 음악 싱크 (2026 보강) → [[music-scoring-sync]]
- [ ] ⭐ 편집 전 무드/키(장조=긍정·단조=부정)/BPM(고각성 ~150·저각성 ~90) 확정.
- [ ] ⭐ **Seedance 오디오 = MP3·최대 3파일·합산 15초, 영상 길이 = 오디오 길이.** 가장 다이내믹한 15초만.
- [ ] ⭐ Loudness 정밀화 — 숏폼/TikTok −10~−12, 유튜브 −14, 시네마 −27~−31 LUFS, TP ≤ −1.0. 대사 위 음악은 800Hz–6kHz 멀티밴드 사이드체인.
- [ ] ⭐ Suno는 **유료 플랜으로만** 상업/수익화 영상에 사용. 순수 AI 음원을 Content ID에 등록하지 않는다.

## K. 자막·캡션 → [[subtitles-captions]]
- [ ] ⭐ **세이프존 강제**: 9:16 자막 하단 ≥300px(TikTok 484px)·우측 120px 침범 금지. 크로스포스트는 900×1400 중앙.
- [ ] ⭐ 숏폼 = 번인 open caption + karaoke 단어강조(흰→노랑). 음소거 시청 80%+ 전제.
- [ ] ⭐ 읽기속도: 한국어 ≤12 CPS / 영어 ≤17–20 CPS, 최대 2줄, **어절 단위 줄바꿈**. 캡션 100–200ms 먼저 표시.
- [ ] ⭐ 폰트 한글 Pretendard/Noto Sans KR·영문 sans(serif·이탤릭 금지), 대비 ≥4.5:1 + 외곽선. **한국어 자동 ASR은 사람 교정 후 출고**(미교정 금지).
