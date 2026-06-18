---
title: AI 영상 모델 & 프롬프팅 (2025–2026)
type: concept
tags: [영상, ai-영상생성, 프롬프트, seedance, veo, sora, kling, runway]
updated: 2026-06-12
sources: [각 모델 공식 문서/가이드 — 하단 출처]
---

# AI 영상 생성 모델 & 프롬프팅 완전 가이드 (2025–2026)

> 2025년~2026년 상반기 기준 주요 AI 비디오 생성(text/image-to-video) 모델의 역량, 모델별 프롬프팅 기법, 공통 프롬프트 작성 원리. 모델명·기술 용어는 영어로 표기한다. 관련: [[seedance-2.0]], [[image-generation]], [[cinematography-composition]], [[video-pipeline-kanban]], [[critical-rules]]

---

## 0. ⭐ 에이전트가 반드시 알아야 할 핵심 사실 (TL;DR)

- **⭐ 2025–2026 세대의 가장 큰 변화는 "native audio"다.** Veo 3/3.1, Sora 2, Kling 2.6, Seedance 2.0, Wan 2.5, LTX-2는 영상과 오디오(대사·효과음·앰비언스·음악)를 **단일 패스(single pass)**로 동시 생성한다. lip-sync까지 맞는다.
- **⭐ 대사는 큰따옴표(`" "`)로 감싸라.** 따옴표 안 텍스트를 "발화할 대사"로 인식해 lip-sync 정확도가 올라간다. 효과음은 `SFX:`, 배경음은 `Ambient:` 라벨.
- **⭐ 한 샷에는 "카메라 움직임 1개 + 피사체 동작 1개"만 담아라.** 여러 동작·카메라무브를 한 문장에 섞으면 morphing·왜곡이 급증한다. 8초보다 4초 클립 2개를 편집으로 잇는 편이 품질이 좋은 경우가 많다(특히 Sora 2).
- **⭐ 카메라 무브는 명시하지 않으면 모델이 임의로 정한다.** "정지 샷"을 원하면 `static shot`, 무브를 원하면 `slow dolly-in` 같은 **전문 촬영용어**를 별도 문장으로 분리해 적는다.
- **⭐ Negative prompt는 모델마다 동작이 다르다.** Kling·Wan은 negative 필드를 적극 지원하지만, **Runway Gen-4는 부정문(negation)을 지원하지 않으며 오히려 반대 결과를 낼 수 있다.** Veo도 긍정문 서술을 권장.
- **⭐ 캐릭터/장면 일관성은 "reference image 시스템"으로 잡는다.** Runway References, Veo "Ingredients", Kling "Elements", Seedance 멀티 reference 등. 보통 **각도가 다른 2–4장**이 최적이며, 5장 이상은 오히려 혼란(Kling 기준).
- **⭐ first-frame/last-frame 워크플로가 표준 기능이 됐다.** Kling, Pika(Pikaframes), Luma Ray3, Veo("First & Last Frame")가 두 프레임 사이 모션을 보간. 가장 정밀한 연출/전환 제어 수단.

---

## 1. 모델 한눈에 비교 (Master Table)

| 모델 | 개발사 | 최대 길이 | 최대 해상도 | Native Audio | I2V | Start/End Frame | Camera/Motion 제어 | Lip-sync | 라이선스 |
|---|---|---|---|---|---|---|---|---|---|
| **Seedance 2.0** | ByteDance | 4–15s | 2K | ✅ | ✅ | ✅ | ✅ (multi-shot) | ✅ | 폐쇄(Jimeng·Dreamina) |
| **Sora 2 / Pro** | OpenAI | ~25s | 1080p(Pro) | ✅ | ✅ | 제한적 | ✅ | ✅ | 폐쇄(앱·API) |
| **Veo 3.1** | Google DeepMind | ~8s(확장) | 1080p~4K | ✅ | ✅ | ✅ (First/Last) | ✅ (강력) | ✅ | 폐쇄(Gemini API/Flow) |
| **Kling 2.6 / O1** | Kuaishou | 5–10s+ | 1080p | ✅ (2.6+) | ✅ | ✅ | ✅ (Elements) | ✅ | 폐쇄 |
| **Hailuo 02 / 2.3** | MiniMax | 6–10s | 1080p | 부분 | ✅ | 부분 | ✅ (강한 물리) | 부분 | 폐쇄 |
| **Runway Gen-4 / 4.5** | Runway | 5–10s | 1080p | ❌(주로 무음) | ✅ | 부분 | ✅ | ❌ | 폐쇄 |
| **Luma Ray3 / 3.14** | Luma | ~10s(≈30s) | 1080p, HDR | 부분 | ✅ | ✅ (Modify) | ✅ | 부분 | 폐쇄 |
| **Pika 2.2** | Pika Labs | 5–10s | 1080p | 부분 | ✅ | ✅ (Pikaframes) | ✅ | 부분 | 폐쇄 |
| **Firefly Video** | Adobe | 짧은 클립 | 1080p~4K | ✅ | ✅ | 부분 | ✅ (Camera Motion Ref) | 부분 | 폐쇄, **상업 안전(IP-safe)** |
| **Wan 2.2 / 2.5** | Alibaba | 5s급 | 720p(2.2)~ | ✅ (2.5) | ✅ | ✅ | ✅ | ✅ (2.5) | **2.2 Apache-2.0 오픈** |
| **HunyuanVideo 1.5** | Tencent | 5–10s급 | 480p→1080p | Avatar 변형 | ✅ | 부분 | ✅ | Avatar | **오픈소스(소비자 GPU)** |
| **LTX-2 / 2.3** | Lightricks | ~10s | **native 4K, 50fps** | ✅ | ✅ | ✅ | ✅ | ✅ | **오픈소스** |

> 길이·해상도는 모델 등급/플랜에 따라 달라진다. "부분"은 변형 모델 또는 후처리로만 지원.

---

## 2. 모델별 핵심 · 프롬프팅

### 2.1 Seedance 2.0 — 상세는 [[seedance-2.0]] 참조
- dual-branch diffusion transformer. 텍스트/이미지로 **multi-shot 내러티브** + native audio. 최대 2K, 4–15초, **최대 12 reference 파일**.
- 팁: 캐릭터=이미지, 카메라=참조 비디오, 페이싱=오디오로 "역할 분담". 저작권 민감(헐리우드 IP 논란 후 safeguard 강화).
- **Seedream 4.0/4.5(이미지)**: 최대 4K, 생성+편집 통합. 영상 시작 프레임/reference 제작 파트너 모델.

### 2.2 Sora 2 / Pro (OpenAI)
- 720p/1080p(Pro), 최대 ~25초, native 오디오, **Cameo**(본인 등장).
- 프롬프팅: "촬영팀에 브리핑하듯" → 장면 → 카메라 위치/무브 → 2–3개 beat → 라이팅/컬러 → 짧은 오디오/대사 1줄. **샷당 카메라무브 1 + 동작 1**, 8초 단일보다 **4초×2 스티칭** 권장.
- **Remix 루프**: 단순 버전 → 변형 다수 → 근접 후보 → 한 요소만 변경 재생성. 예: *"Same shot, change palette to crimson and gold"*, *"Same lighting, switch to 85mm, reduce depth of field."*

### 2.3 Veo 3.1 (Google)
- 4·6·8초, 720p/1080p/4K, native audio 단일 패스, SynthID 워터마크.
- 기능: **Ingredients to Video**(일관성), **Frames to Video / First & Last Frame**, **Extend**, **Insert/Remove**.
- 공식 5요소 공식: **`[Cinematography] + [Subject] + [Action] + [Context] + [Style & Ambiance]`**. Cinematography로 시작. 카메라무브는 별도 문장(*"The camera pulls back."*).
- 오디오 문법: `A woman says, "We have to leave now."` / `SFX: thunder cracks` / `Ambient: hum of a starship bridge`.
- **Timestamp prompting**: `[00:00-00:02] ... [00:02-00:04] ...`로 멀티샷 페이싱.
- Negative: "no X"보다 긍정 서술("no buildings" → "a desolate landscape with no buildings").

### 2.4 Kling (2.6 / O1, Kuaishou)
- 인물 모션·연속성 최상위권, 비용 효율, **Elements** 시스템(reference 2–4장, 다른 각도; 4장 초과 시 혼란).
- 구조: **`Subject + Movement + Scene + (Cinematic Language + Lighting + Atmosphere)`**.
- **negative prompt 적극 지원** — 짧고 집중된 부정어 효과적("blurry, distorted hands, extra fingers, flicker").
- 2.1+ **start/end frame conditioning**, 2.6 동시 오디오-비디오, O1 통합 멀티모달.

### 2.5 MiniMax Hailuo 02 / 2.3
- **물리 시뮬레이션 1위급**(중력·충돌·유체·아크로바틱). 강한 prompt adherence. I2V 512/768p, Pro 1080p.
- 팁: 동작의 물리적 디테일(관성·접촉·낙하)을 구체적으로.

### 2.6 Runway Gen-4 / 4.5
- **World consistency** — reference 1장으로 캐릭터·장소 일관. 주로 무음.
- ⭐ **부정문(negation) 미지원** → "no rain"식 금지, 원하는 것만 긍정 서술. References로 일관성 확보.

### 2.7 Luma Ray3 / Modify / 3.14
- "reasoning video model", native HDR, 스케치 입력 해석. **Ray3 Modify**: video-to-video에 Start/End Frame·Keyframe·Character Reference(연기/performance 보존). 콘티→영상에 유리.

### 2.8 Pika 2.2
- **Pikaframes**: 시작+끝 이미지로 1–10초 전환 보간. 두 키프레임 사이 "변화"를 명확히.

### 2.9 Adobe Firefly Video
- **상업 안전(IP-safe)**. **Camera Motion Reference**(참조 비디오로 카메라무브 복제), Prompt to Edit, Generate Sound Effects/Soundtrack/Speech. 광고/브랜드용.

### 2.10 오픈소스
- **Wan 2.2** (Apache-2.0, RTX 4090급 구동) / **Wan 2.5**(동기 오디오) — 상세 레포는 [[github-resources]].
- **HunyuanVideo 1.5** (오픈 8.3B, 소비자 GPU, T2V/I2V/Avatar).
- **LTX-2** (완전 오픈, native 4K·50fps·동기 오디오·로컬 구동).

---

## 3. 기능별 교차 비교

### 3.1 일관성(Consistency) — reference 시스템

| 모델 | 명칭 | 권장 reference 수 | 특징 |
|---|---|---|---|
| Runway Gen-4 | References | 1장으로도 캐릭터 고정 | World consistency, negation 미지원 |
| Veo 3.1 | **Ingredients to Video** | 캐릭터+세팅 다수 | 멀티샷 동일 인물 유지 |
| Kling 2.6/O1 | **Elements** | **2–4장(다른 각도)** | 4장 초과 시 혼란 |
| Seedance 2.0 | Multi-reference | **최대 12 파일** | 이미지/비디오/오디오 역할 분담 |
| Luma Ray3 Modify | Character Reference | — | performance 보존 |
| Sora 2 | image input / Cameo | — | 첫 프레임 앵커, 본인 등장 |

### 3.2 first/last frame 지원
Kling 2.1+(start-end), Pika 2.2(**Pikaframes**), Veo 3.1(**First & Last Frame**), Luma Ray3 Modify(Start/End + Keyframe), LTX-2.

---

## 4. AI 비디오 프롬프팅 craft (공통 원리)

### 4.1 강한 프롬프트 구조 — 권장 순서
**⭐ `Subject → Action → Camera → Lighting → Lens → (Audio/Dialogue) → Constraints/Negatives`**
모호한 형용사보다 촬영 전문용어("멋지게" 대신 `slow push-in`, `tracking shot`, `aerial view`).

### 4.2 카메라 무브 텍스트화

| 무브 | 프롬프트 예 |
|---|---|
| Pan / Tilt | `slow pan left`, `tilt up to reveal the sky` |
| Dolly | `slow dolly-in on her face` |
| Tracking | `tracking shot following the runner` |
| Crane / Pull-back | `crane shot ascending`, `the camera pulls back to reveal the city` |
| Aerial / POV | `aerial view`, `POV shot` |

- ⭐ **카메라무브는 별도 문장으로 분리.** 모든 무브에 내러티브 목적 부여.

### 4.3 모션·타이밍
- 샷당 동작 1 + 카메라무브 1. beats/timestamp로 다중 비트 페이싱. 빠른 액션 + 강한 "no motion" negative는 충돌.

### 4.4 Negative prompts
- ⭐ 모델별 상이: Kling/Wan 지원, **Runway 미지원**, Veo는 긍정 서술. 흔한 negative: `blurry, distorted face, extra fingers, warped hands, flicker, watermark, text`. 긴 negative는 결과 약화.

### 4.5 seed / 일관성
- seed 고정 → 한 요소만 바꿔 A/B. reference + seed 결합으로 캐릭터·룩 잠금. Remix 루프로 수렴.

### 4.6 first/last frame 워크플로
1. 이미지 모델([[image-generation]])로 시작/끝 프레임 생성 → 2. First/Last(Pikaframes/Keyframe)에 투입 + 전환 서술 → 예: *"smooth 180° arc, front view → circle around → end on POV from behind."*

### 4.7 오디오/대사
- 대사: 큰따옴표. 효과음 `SFX:`, 배경음 `Ambient:`. 대사는 짧게, 시각 묘사와 분리(4초당 1–2줄). 상세는 [[audio-editing-post]].

### 4.8 흔한 실패 모드 → 완화

| 실패 | 원인 | 완화 |
|---|---|---|
| Morphing/형태 붕괴 | 동작·카메라 과다 | 동작1+카메라1, 길이 단축(4s) |
| 손가락/손 왜곡 | 빠른 모션 | `steady motion`, hands negative |
| 얼굴 일관성 깨짐 | reference 부재/과다 | reference 2–4장, seed 고정 |
| 플리커/지터 | 과한 모션·충돌 negative | `stable, smooth motion`, `flicker` negative |
| 카메라 멋대로 | 무브 미명시 | `static shot` 또는 무브 별도 명시 |
| negative 역효과 | Runway negation 미지원 | 긍정 서술 |
| 장면 일관성 붕괴(장클립) | 길이 초과 | 짧은 컷 + 스티칭/Extend |

---

## 출처

- Seedance 2.0 — [Wikipedia](https://en.wikipedia.org/wiki/Seedance_2.0), [SitePoint](https://www.sitepoint.com/introducing-seedance-2-0/), [Seedream 4.0](https://seed.bytedance.com/en/seedream4_0)
- Sora 2 — [OpenAI](https://openai.com/index/sora-2/), [Video API](https://developers.openai.com/api/docs/guides/video-generation), [Sora2 Prompting Guide](https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide)
- Veo 3.1 — [DeepMind](https://deepmind.google/models/veo/), [Prompt guide](https://deepmind.google/models/veo/prompt-guide/), [Google Cloud guide](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1)
- Kling — [Wikipedia](https://en.wikipedia.org/wiki/Kling_AI), [2.6 Pro Prompt Guide (fal)](https://fal.ai/learn/devs/kling-2-6-pro-prompt-guide), [O1 User Guide](https://app.klingai.com/global/quickstart/klingai-video-o1-user-guide)
- Hailuo — [fal](https://fal.ai/models/fal-ai/minimax/hailuo-02/pro/image-to-video), [MiniMax 2.3](https://www.minimax.io/news/minimax-hailuo-23)
- Runway — [Gen-4](https://runwayml.com/research/introducing-runway-gen-4), [Gen-4 Prompting Guide](https://help.runwayml.com/hc/en-us/articles/39789879462419-Gen-4-Video-Prompting-Guide)
- Luma — [Ray3 Modify](https://lumalabs.ai/news/ray3-modify), [Ray](https://lumalabs.ai/ray)
- Pika — [2.2 Pikaframes](https://pikalabs.org/pika-2-2/)
- Adobe Firefly — [video updates](https://blog.adobe.com/en/publish/2025/12/16/adobe-firefly-improves-ai-video-creation-tools-new-models-unlimited-generations)
- Wan 2.2 / 2.5 — [tech-now.io](https://tech-now.io/en/blogs/alibaba-wan-2-2-the-open-source-ai-video-model-that-aims-to-democratize-cinematic-creation/)
- HunyuanVideo 1.5 — [GitHub](https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5)
- LTX-2 — [PR Newswire](https://www.prnewswire.com/news-releases/lightricks-releases-ltx-2-the-first-complete-open-source-ai-video-foundation-model-302593012.html), [Wikipedia](https://en.wikipedia.org/wiki/LTX-2)
- Negative prompts — [Artlist](https://artlist.io/blog/negative-prompts-ai-video/)
- Camera movements — [LetsEnhance](https://letsenhance.io/blog/all/ai-video-camera-movements/)
