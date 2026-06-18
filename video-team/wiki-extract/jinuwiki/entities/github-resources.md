---
title: GitHub 리소스 · 에이전트 스킬 · 오픈소스 도구
type: entity
tags: [github, 스킬, 오픈소스, comfyui, 프롬프트라이브러리, 도구]
updated: 2026-06-12
sources: [GitHub 저장소 직접 확인 — 하단 출처]
---

# AI 영상 제작 에이전트를 위한 오픈소스 리소스 모음

> AI 영상 프로덕션 에이전트(시나리오→스토리보드→이미지/영상 생성→후처리) 구축·운영에 유용한 GitHub 저장소·스킬·도구. ⭐ = 가장 중요/유용. (별 수치는 조사 시점 근사치) 관련: [[ai-video-prompting]], [[image-generation]], [[video-pipeline-kanban]]

---

## 1. Awesome 리스트 (큐레이션)
- **⭐ [showlab/Awesome-Video-Diffusion](https://github.com/showlab/Awesome-Video-Diffusion)** — 비디오 생성·편집 디퓨전 모델 대표 큐레이션 (지형도 파악 출발점).
- [AlonzoLeeeooo/awesome-video-generation](https://github.com/AlonzoLeeeooo/awesome-video-generation) — T2V/I2V/편집/휴먼 애니 연도별 종합.
- [soraw-ai/Awesome-Text-to-Video-Generation](https://github.com/soraw-ai/Awesome-Text-to-Video-Generation) — T2V/I2V 지속 업데이트(데이터셋·평가 포함).
- [wangqiang9/Awesome-Controllable-Video-Diffusion](https://github.com/wangqiang9/Awesome-Controllable-Video-Diffusion) — 제어가능(ControlNet류) 비디오 생성 특화.
- **⭐ [backblaze-labs/awesome-video-generation](https://github.com/backblaze-labs/awesome-video-generation)** — 논문 아닌 **실제 개발용** API·SDK·프로덕션 인프라 중심.

## 2. 에이전트 스킬 (Claude Code / Codex / Cursor 호환)
- **⭐ [anthropics/skills](https://github.com/anthropics/skills)** — Anthropic 공식 Agent Skills (스킬 구조 레퍼런스 표준).
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) — 공식 Claude Code 플러그인 디렉터리.
- **⭐ [dexhunter/seedance2-skill](https://github.com/dexhunter/seedance2-skill)** — **이미 설치된** Seedance 2.0 프롬프트 스킬(@ 레퍼런스·카메라 언어·템플릿). 위키 [[seedance-2.0]]와 연동.
- [robonuggets/seedance-skill](https://github.com/robonuggets/seedance-skill) — Seedance 모션그래픽 스킬(liquid glass, Fal AI 연동).
- **⭐ [black-forest-labs/skills](https://github.com/black-forest-labs/skills)** — **공식** FLUX 이미지 생성 스킬(프롬프팅+API).
- **⭐ [Creatify-AI/ai-ad-prompt-guide](https://github.com/Creatify-AI/ai-ad-prompt-guide)** — 실전 검증 AI 비디오·이미지 프롬프팅 스킬(SLCT 프레임워크, Sora2/Veo3.1/Kling/Flux/Nano Banana 팁, 광고/UGC/B-roll 템플릿).
- [kkoppenhaver/cc-nano-banana](https://github.com/kkoppenhaver/cc-nano-banana), [Ibrahim-3d/nano-banana-claude-plugin](https://github.com/Ibrahim-3d/nano-banana-claude-plugin), [feedtailor/ccskill-nanobanana](https://github.com/feedtailor/ccskill-nanobanana) — Nano Banana(Gemini) 이미지 생성 Claude 스킬/플러그인.
- [levineam/qmd-skill](https://github.com/levineam/qmd-skill) — qmd(마크다운 검색) 에이전트 래퍼 (위키/프롬프트 검색용).

## 3. 프롬프트 라이브러리·가이드
- **⭐ [geekjourneyx/awesome-ai-video-prompts](https://github.com/geekjourneyx/awesome-ai-video-prompts)** — Veo·Sora·Runway·Pika·Kling 가이드·템플릿·시네마틱·오디오싱크 핵심 큐레이션.
- **⭐ [snubroot/Veo-3-Prompting-Guide](https://github.com/snubroot/Veo-3-Prompting-Guide)** — Veo 3 심화(대사 문법, "this then that" 시퀀스, 카메라무브, 70+ 템플릿, 트러블슈팅).
- [shijincai/veo3-prompt-generator](https://github.com/shijincai/veo3-prompt-generator) — Veo 3/3.1 프롬프트 생성기(JSON/MD export).
- [Ezagor-dev/awesome-midjourney-prompts](https://github.com/Ezagor-dev/awesome-midjourney-prompts), [LexGoArt/Midjourney-Prompts](https://github.com/LexGoArt/Midjourney-Prompts) — Midjourney 프롬프트 컬렉션.

## 4. ComfyUI 핵심 노드·워크플로우
- **⭐ [Kosinkadink/ComfyUI-AnimateDiff-Evolved](https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved)** — 개선판 AnimateDiff(Context Options로 긴 영상, ControlNet 연계). 비디오 워크플로 사실상 표준.
- **⭐ [Kosinkadink/ComfyUI-VideoHelperSuite](https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite)** — 영상 입출력 필수 유틸.
- [Kosinkadink/ComfyUI-Advanced-ControlNet](https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet) — 시간축·latent 가중치 ControlNet(vid2vid 필수).
- **⭐ [cubiq/ComfyUI_IPAdapter_plus](https://github.com/cubiq/ComfyUI_IPAdapter_plus)** — IPAdapter(레퍼런스로 스타일·캐릭터 일관성 주입).
- [Fannovel16/comfyui_controlnet_aux](https://github.com/Fannovel16/comfyui_controlnet_aux) — ControlNet 힌트(뎁스·포즈·라인) 전처리.

## 5. 오픈소스 비디오 생성 모델
- **⭐ [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2)** — Alibaba MoE 대규모(T2V/I2V/S2V, 720P). 로컬/오픈 주력. ★16k
- [Wan-Video/Wan2.1](https://github.com/Wan-Video/Wan2.1) — 1.3B는 8GB VRAM 구동(저사양 친화).
- **⭐ [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video)** — 소비자 GPU에서 매우 빠른 효율형. [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2) — 오디오+비디오 동기 차세대.
- **⭐ [Tencent-Hunyuan/HunyuanVideo](https://github.com/Tencent-Hunyuan/HunyuanVideo)** — 13B 오픈 파운데이션(상용급 품질). ★12k
- [THUDM/CogVideo](https://github.com/THUDM/CogVideo) — CogVideoX(ComfyUI·Diffusers 지원 폭넓음).
- **⭐ [hpcaitech/Open-Sora](https://github.com/hpcaitech/Open-Sora)** — 체크포인트·학습코드 완전 공개(2.0 11B). ★29k
- [genmoai/mochi](https://github.com/genmoai/mochi) — Mochi 1(10B, 프롬프트 충실), [rhymes-ai/Allegro](https://github.com/rhymes-ai/Allegro), [deepbeepmeep/Wan2GP](https://github.com/deepbeepmeep/Wan2GP) — "GPU Poor"용 경량 통합.

## 6. 이미지 모델 (키프레임·레퍼런스용)
- **⭐ [black-forest-labs/flux](https://github.com/black-forest-labs/flux)** — FLUX.1 공식 추론(키프레임 표준). [black-forest-labs/flux2](https://github.com/black-forest-labs/flux2) — FLUX.2.

## 7. 후처리·업스케일·복원
- **⭐ [hzwer/Practical-RIFE](https://github.com/hzwer/Practical-RIFE)** — 실무 프레임 보간(저FPS 부드럽게·슬로모션).
- **⭐ [xinntao/Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN)** — 업스케일·복원 사실상 표준. ★35k
- **⭐ [sczhou/CodeFormer](https://github.com/sczhou/CodeFormer)** — 블라인드 얼굴 복원(생성 영상 얼굴 디테일). ★18k
- [TencentARC/GFPGAN](https://github.com/TencentARC/GFPGAN) — 실사 얼굴 복원(빠른 보정).

## 8. 미디어 자동화·FFmpeg
- **⭐ [transitive-bullshit/awesome-ffmpeg](https://github.com/transitive-bullshit/awesome-ffmpeg)** — FFmpeg 도구·가이드 큐레이션(인코딩/합성 자동화 백본).
- [talwrii/ffmpeg-cookbook](https://github.com/talwrii/ffmpeg-cookbook) — 초보 레시피, [steven2358 FFmpeg cheat sheet](https://gist.github.com/steven2358/ba153c642fe2bb1e47485962df07c730) — 치트시트(에이전트 즉시 참조).

## 9. 지식베이스·검색 도구
- **⭐ [tobi/qmd](https://github.com/tobi/qmd)** — 로컬 온디바이스 마크다운 검색(BM25+벡터+RRF, MCP 서버). **이 위키를 자연어 검색하는 도구로 적합** — 위키가 커지면 도입 고려.

## 10. 오케스트레이션 프레임워크
- **⭐ [HKUDS/ViMax](https://github.com/HKUDS/ViMax)** — 감독·시나리오·스토리보드·제작·생성을 12개 전문 에이전트로 오케스트레이션(Idea2Video/Script2Video, 캐릭터·씬 일관성, RAG 장문 스크립트). **Codex 영상 하네스 설계의 가장 직접적 레퍼런스.** MIT.

> 참고: 단일 정본 "StoryAgent" 공개 저장소는 안정 URL 미확정. 멀티에이전트 영상 파이프라인은 **ViMax**가 가장 활발·검증된 오픈소스이므로 우선 참고.

---

## 출처
위 각 항목의 GitHub URL이 곧 출처. 주요 확인: [showlab](https://github.com/showlab/Awesome-Video-Diffusion), [anthropics/skills](https://github.com/anthropics/skills), [dexhunter/seedance2-skill](https://github.com/dexhunter/seedance2-skill), [Wan2.2](https://github.com/Wan-Video/Wan2.2), [HunyuanVideo](https://github.com/Tencent-Hunyuan/HunyuanVideo), [Open-Sora](https://github.com/hpcaitech/Open-Sora), [ViMax](https://github.com/HKUDS/ViMax), [tobi/qmd](https://github.com/tobi/qmd).
