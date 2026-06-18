---
title: AI 이미지 생성 → 영상 (Image-to-Video) 워크플로우
type: concept
tags: [이미지생성, 키프레임, 일관성, midjourney, flux, nano-banana, controlnet, lora]
updated: 2026-06-12
sources: [각 모델 공식/비교 자료 — 하단 출처]
---

# AI 이미지 생성 → 영상(Image-to-Video) 워크플로우 완전 가이드 (2025–2026)

> 키프레임(keyframe)/퍼스트프레임(first-frame)/스토리보드/캐릭터·스타일 레퍼런스를 생성해 image-to-video 모델에 투입하는 실무 가이드. 관련: [[ai-video-prompting]], [[video-pipeline-kanban]], [[critical-rules]]

---

## 0. ⭐ 핵심 요약 (Agent must-know)

- ⭐ **"이미지 모델은 한 개만 쓰지 않는다." 실무는 모델 체이닝(chaining)이다.** 대표: **Midjourney(히어로/스타일) → Nano Banana(편집·일관성) → Topaz/Magnific(업스케일) → i2v 모델(Kling/Runway/Wan/LTX)**.
- ⭐ **영상 화질·일관성은 "스틸 품질"에서 결정된다.** i2v 모델은 첫 프레임을 잠근다(lock). 손·얼굴 왜곡·저해상도 스틸을 넣으면 영상 전체가 망가진다. **첫/끝 프레임 최소 1024², 권장 1920×1080+**.
- ⭐ **캐릭터 일관성이 최대 난제.** 정답은 단일 기법이 아니라 **LoRA(정체성) + IP-Adapter(외형) + ControlNet(포즈·구조) + seed 고정 + 원본 재사용**의 레이어드 조합.
- ⭐ **편집은 항상 "원본"에서 다시 시작.** 편집본을 재입력하면 오차 누적으로 얼굴이 드리프트(drift). Flux Kontext·Nano Banana 공통 철칙.
- ⭐ **첫 프레임은 "움직일 여백(motion space)"을 남겨라.** 꽉 찬 클로즈업은 애니메이션이 깨진다. 3분법 한쪽 배치 + 전경/중경/배경 깊이(parallax).

---

## 1. 주요 이미지 모델 비교 (2025–2026)

| 모델 | 최대 강점 | 텍스트 렌더링 | 포토리얼 | 편집/일관성 | 오픈웨이트 |
|---|---|---|---|---|---|
| **Midjourney v7 / v8** | 미학·스타일 일관성 | 약함 | 상 | --oref(Omni) | ✗ |
| **Flux.1 (dev/pro)** | 프롬프트 충실도·포토리얼 | 중상 | 최상급(Pro) | Kontext로 강화 | dev/schnell ✓ |
| **Flux.1 Kontext** | instruction 정밀 편집·캐릭터 보존 | 우수 | 상 | **최강(편집)** | dev ✓ |
| **Flux.2 [Pro]** | 포토리얼 최상위 | 우수 | 최상급 | 강함 | Pro ✗ |
| **Nano Banana** (Gemini 2.5 Flash Image) | **네이티브 편집·일관성·멀티이미지 fusion(최대 14장)** | 중상 | 상 | **최강(대화형)** | ✗ |
| **Nano Banana Pro / 2** | 위 + 고해상·텍스트 | 우수 | 최상급 | 최강 | ✗ |
| **GPT-image (1/1.5)** | **텍스트·프롬프트 충실 최상위** | **최상급** | 최상급 | 대화형 편집 | ✗ |
| **SD / SDXL** | **ControlNet·LoRA·IP-Adapter 풀 생태계** | 약함 | 중(튜닝 의존) | **커스텀 제어 최강** | ✓ |
| **Ideogram 3.0/4.0** | **로고·간판·타이포** | **최상급** | 상 | 중 | ✗ |
| **Recraft V3** | 아트디렉션·벡터·브랜드 | 우수 | 상 | 중 | ✗ |
| **Seedream 4.0** | **고밀도 텍스트·4K·reference fusion** | 우수 | 최상급 | 강함 | ✗ |

실무 노트:
- **Midjourney v7**: 미학 압도적(히어로컷·무드보드). ⭐ 구버전 `--cref` 작동 안 함 → **Omni Reference(`--oref`/`--ow`)**.
- **Flux**: Pro=최고 충실도(클라우드), Dev=로컬 최고(비상업 라이선스 주의), Schnell=Apache 2.0 상업 무제한.
- **Nano Banana**: ⭐ 대화형 편집+정체성 보존의 게임체인저. 카탈로그·에피소드 스토리텔링. ~$0.03/img, 최대 14장 fusion.
- **SDXL**: ⭐ 세밀 제어 필요하면 결국 여기로. ComfyUI에서 ControlNet/IP-Adapter/LoRA/inpaint 자유 조합.

---

## 2. 이미지 프롬프트 작법

### 2.1 ⭐ 보편 6-파트 공식
> **Subject + Environment + Lighting + Lens/Camera + Style/Film + Quality/AR(parameters)**

예: `A weary detective in a rain-soaked alley, neon reflecting in puddles, low-key Rembrandt lighting, 85mm f/1.4, Kodak Portra 400, cinematic, --ar 16:9`

| 요소 | 효과 | 예시 |
|---|---|---|
| **Aspect Ratio** | 구도 자체를 결정(크롭 아님) | `--ar 16:9`, `--ar 9:16` |
| **Style Reference** | 스타일만 차용 | MJ `--sref [code]`, `--sw 0–1000` |
| **Character/Omni Ref** | 정체성 차용 | MJ v7 `--oref`, `--ow` |
| **Weights** | 강도 | `--sw`, `--ow`, Flux/SD `(token:1.3)` |

⭐ **AR은 처음부터 구도를 설계하게 한다. i2v 출력 비율(16:9/9:16)과 반드시 일치.**

---

## 3. ⭐ 일관성(Consistency) 기법 — 영상 워크플로우의 심장

### 3.1 레이어드 접근

| 레이어 | 도구 | 담당 |
|---|---|---|
| 정체성 | **LoRA** | "이 사람"의 얼굴·고유 특징 학습 |
| 외형·스타일 | **IP-Adapter** | 레퍼런스의 외형/무드/스타일 주입 |
| 구조·포즈 | **ControlNet** | pose/depth/canny로 자세·구도·윤곽 고정 |
| 세부 | **Prompt** | 표정·의상·배경 가변 요소 |
| 재현 | **Seed 고정** | 동일 seed로 변동 최소화 |

> 공식: **LoRA(정체성) → IP-Adapter(외형) → ControlNet(포즈·손) → Prompt(표정·세팅) → Seed 고정.**

### 3.2 캐릭터 레퍼런스 셋 큐레이션
- ⭐ **5–10장 깨끗한 이미지**: 정면·3/4·측면, 동일 베이스라이팅. 중립 클로즈업 "여권 사진" 1장 포함.
- 의상·헤어·액세서리 같은 **identity marker**를 일관되게 → i2v 모델의 프레임 간 추적 단서.

### 3.3 ⭐ instruction 편집 모델 철칙 (Kontext / Nano Banana)
1. **항상 원본에서 재편집** (편집본 재입력 시 face drift).
2. **이미 화면에 있는 것은 묘사하지 마라** — 바꿀 것만 명시.
3. **정체성 보존 문구**: `…while maintaining the same facial features, hairstyle, and expression`.
4. **텍스트 편집은 따옴표**: `Replace '[old]' with '[new]'`.
5. **참조→변형→보존** 프레임워크.

---

## 4. 시네마틱/포토 프롬프트 어휘집

### 4.1 ⭐ 렌즈
| 렌즈 | 효과 | 용도 |
|---|---|---|
| 24mm | 깊은 심도·웅장한 원경 | establishing |
| 35mm | 자연스러운 다큐 | 내러티브·스트리트 |
| 50mm | 눈에 가까운 시야 | 표준 |
| 85mm f/1.4 | 얕은 심도·배경 분리 | 친밀한 인물 CU |
| 135–200mm | 압축·폐소감 | 긴장·서스펜스 |
| anamorphic | 시네마 와이드·플레어 | 영화적 |

### 4.2 라이팅 / 필름
- 라이팅: Golden hour, Rembrandt, Butterfly, Rim/back light, Soft diffused, Volumetric, Low/High-key.
- 필름: **Kodak Portra 400**(부드러운 피부톤), **CineStill 800T**(야간 네온·헤일레이션), **Bleach bypass**(저채도·고대비).
- ⭐ 카메라+렌즈+라이팅+필름을 한 줄에 조합하면 시네마틱 일관성 급상승(미학형 모델 MJ/Flux에 특히 효과).

---

## 5. ⭐ 퍼스트/라스트 프레임 전략 (Image-to-Video)

- 시작 A + 끝 B → 중간 보간. 표준 i2v는 시작만 제어하지만 FLF는 "목표 지향" 제어. 멀티 키프레임: **LTX 2.3 = first–middle–last**, **Wan 2.1 FLF2V**, **Kling O1**.

### 잘 움직이는 스틸 만들기
| 원칙 | 내용 |
|---|---|
| **Motion space** | 3분법 한쪽 + 움직일 방향 반대쪽 여백. 꽉 찬 헤드샷 금지 |
| **Depth layers** | 전경/중경/배경 분리 → parallax로 카메라 무빙 자연스러움 |
| **Clarity** | 주피사체 1–2개. 복잡 씬은 모델 혼란 |
| **Identity markers** | 의상 색·패턴·액세서리로 추적 단서 |
| **Facial** | 양눈 보이게, 정면/3-4분면, 강한 그림자 금지 |
| **Lighting/Color 일치** | 첫·끝 프레임 광원 방향·세기·색온도 매칭 |

### 치명적 실수
저해상도 / AR 불일치 / 첫·끝 극단적 구도 변화(워핑) / 소스 AI 아티팩트 잔존 / 복잡한 멀티피사체.

---

## 6. 업스케일링 (i2v 투입 직전)

| 도구 | 강점 | 주의 |
|---|---|---|
| **Magnific AI** | AI 아트를 print 품질로, 없던 디테일 창조 | ⭐ **얼굴 왜곡 위험 → 실인물 부적합**, 느림 |
| **Topaz Gigapixel** | 디테일 보존형, **로컬 구동** | 보존적이라 "창조"는 약함 |

> ⭐ **크리에이티브 업스케일=Magnific, 실사·정확도=Topaz. 인물은 보존형 우선**(업스케일이 얼굴을 바꾸면 일관성 붕괴).

---

## 7. ⭐ 권장 엔드투엔드 파이프라인
1. 컨셉/스타일 — MJ v7(무드) 또는 Flux Pro(포토리얼), `--ar`로 출력 비율.
2. 캐릭터 레퍼런스 셋 — 5–10장 멀티앵글 + passport shot. 필요 시 LoRA 학습.
3. 키프레임/스토리보드 — Nano Banana(대화형) 또는 SDXL+IP-Adapter+ControlNet, **seed 고정**.
4. 편집·보정 — Flux Kontext/Nano Banana, **항상 원본에서**, inpaint로 손·얼굴 수정.
5. 퍼스트/라스트 설계 — motion space·depth·라이팅 일치, AR·해상도 점검.
6. 업스케일 — Topaz(보존) ± Magnific.
7. i2v 생성 — Kling/Runway/Wan FLF2V/LTX에 투입, 모션 위주 프롬프트.

### 빠른 선택
| 목적 | 1순위 |
|---|---|
| 미학·무드보드·히어로컷 | Midjourney v7 |
| 포토리얼 베이스 | Flux Pro / GPT-image 1.5 |
| 대화형 편집·일관성 | Nano Banana (Pro) |
| 정밀 instruction 편집 | Flux Kontext |
| 텍스트·간판·로고 | Ideogram / GPT-image / Seedream |
| 완전 커스텀 제어 | SDXL (+ComfyUI) |

---

## 출처

- [AI Image Generation 2026 — Till Freitag](https://till-freitag.com/en/blog/ai-image-generation-models-2026), [FLUX.2 vs MJ v7 vs Nano Banana — Medium](https://medium.com/@leucopsis/flux-2-pro-review-and-comparison-with-midjourney-v7-and-with-nano-banana-pro-337224a5551f)
- [First & Last Frame guide — Seedance 2AI](https://seedance-2ai.org/blog/ai-video-first-last-frame-guide), [LTX 2.3 First-Last Frame — RunComfy](https://www.runcomfy.com/comfyui-workflows/ltx-2-3-first-last-frame-in-comfyui-keyframe-to-smooth-video), [Wan FLF2V — fal](https://fal.ai/models/fal-ai/wan-flf2v)
- [Character consistency in ComfyUI — Medium](https://medium.com/@sophie_62065/how-i-solved-character-consistency-in-comfyui-after-trying-controlnet-and-ipadapter-fcd9eda25109), [LoRA+ControlNet+IP-Adapter — Medium](https://shree6791.medium.com/part-6-the-ultimate-combo-lora-controlnet-ip-adapter-prompt-c938fcb43b27)
- [IP-Adapter — HF Diffusers](https://huggingface.co/docs/diffusers/using-diffusers/ip_adapter)
- [Cinematic AI Prompt Method — Creative Possible](https://creativepossible.substack.com/p/the-cinematic-ai-prompt-method-cameras)
- [Topaz vs Magnific — Chase Jarvis](https://chasejarvis.com/blog/topaz-vs-magnific-best-ai-image-scaler/)
- [Flux Kontext Prompt Guide — BFL Docs](https://docs.bfl.ml/guides/prompting_guide_kontext_i2i)
- [Midjourney Style Reference / Parameters — Docs](https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List)
- [Gemini 2.5 Flash Image (Nano Banana) — Google](https://developers.googleblog.com/en/introducing-gemini-2-5-flash-image/)
- [Seedream 4.0 — arXiv](https://arxiv.org/pdf/2509.20427)
