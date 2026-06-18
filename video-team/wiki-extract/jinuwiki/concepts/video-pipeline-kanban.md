---
title: AI 영상 파이프라인 · 에이전트 하네스 · Kanban 설계
type: concept
tags: [파이프라인, 칸반, 하네스, 오케스트레이션, 에이전트, 상태관리, 네이밍]
updated: 2026-06-12
sources: [aividpipeline, ViMax, Netflix VFX, Temporal/LangGraph 등 — 하단 출처]
---

# AI 영상 제작 파이프라인 · 에이전트 하네스 · Kanban 설계 가이드

> AI 영상 제작을 **end-to-end 워크플로우 / Kanban 보드 / agent harness** 관점에서 정리. 실제 영상작업은 **Codex 하네스**가 수행하며, 이 문서는 그 하네스가 따라야 할 구조를 정의한다. 관련: [[ai-video-prompting]], [[image-generation]], [[qc-checklist]], [[critical-rules]]

---

## 1. End-to-End AI Video Production Pipeline

각 stage는 정의된 input을 받아 specialized tool로 처리하고 정의된 artifact를 다음 stage로 전달한다. 핵심 가치는 **inconsistency 제거** — 표준화로 더 빠르고 저렴하며 예측 가능한 품질.

| # | Stage | Input | 주요 작업 | 산출 Artifact |
|---|-------|-------|----------|---------------|
| 0 | **Concept / Brief** | 아이디어·목표·타깃·채널·길이·예산 | 무엇을·누구에게·왜. 톤·레퍼런스·제약 정의 | `brief.md`, mood board, budget/quota 한도 |
| 1 | **Script** | brief | 내러티브 구조화, scene breakdown, dialogue, VO | structured script, VO script |
| 2 | **Shotlist** | script | scene→shot 분해. shot마다 camera·duration·action 매핑 | shotlist (shot ID 테이블) |
| 3 | **Storyboard** | shotlist | 각 shot 구도·타이밍 시각화. 정적→animatic | storyboard frames, **animatic** |
| 4 | **Keyframes (image gen)** | storyboard | **character/reference sheet 먼저** → shot별 first/last frame | key frames, character sheet, assets |
| 5 | **Video gen (per shot)** | keyframe + shot 설명 | shot당 4–10초 클립 생성, **보통 2–3회 재생성** | raw clips (shot 단위) |
| 6 | **Assembly / Edit** | raw clips | storyboard 순서로 시퀀싱, transition, 타이밍 | assembled timeline |
| 7 | **Sound / Music** | timeline, VO | 나레이션·BGM·SFX 생성·sync (아마추어/프로 가르는 요소) | mixed audio track |
| 8 | **Color** | timeline | AI 클립 간 색·노출 편차 보정, **batch / 통일 LUT** | color-graded timeline |
| 9 | **QC / Review** | graded timeline | continuity·drift·artifact·sync·정책 검수 | QC report, fix list |
| 10 | **Export / Delivery** | 승인본 | 플랫폼별 export, metadata, 배포 | final master, deliverable |

> ⭐ **각 stage는 "정의된 output → 다음 stage의 정의된 input" 계약(contract)을 가진다. Stage 진입 전 input artifact의 존재·유효성을 반드시 검증하라 (keyframe 없이 video gen 진입 금지).**

핵심 consistency 포인트:
- ⭐ **Stage 4에서 character/reference sheet를 어떤 scene 이미지보다 먼저 생성.**
- **Stage 5는 재생성이 표준** — 실패분에 예산 **20~30%** 배정.
- **Stage 8 color는 클립별이 아닌 batch + 통일 LUT.**

---

## 2. Kanban 설계 for Video Pipeline

핵심: **card = shot** 단위(scene 아님). 한 영상 = 보드 하나, 각 shot = 카드 하나.

### 2.1 Column 레이아웃 (sample)

```
Backlog → Scripting → Storyboard → Keyframe → Generating → Review/QC → Editing → Done
(no WIP)  WIP:3       WIP:3        WIP:4      WIP:6 ⭐      WIP:4        WIP:3     (∞)
                                              🔴=retry/blocked  ⭐=비용·rate-limit 최대 병목
```
swimlane 분리 권장: **A-roll / B-roll**, **우선순위(P0/P1)**, 또는 **에이전트 자동 vs 인간 검토 대기**.

### 2.2 WIP limits
- rule of thumb: `WIP = 동시 워커 수 × 1.5` 반올림.
- ⭐ **Generating column에 가장 엄격한 WIP** — GPU 비용·API rate limit·quota가 집중되는 진짜 병목. WIP 한도 = 동시 API 호출 수 + 예산 burn rate와 직접 연동.
- Backlog·Done은 무제한. Bottleneck column에 우선 적용.

### 2.3 Shot-card 스키마 (sample)

```yaml
shot_id: AGM_104_TCC_067_0050      # 전역 유일, 10단위 증가
title: "주인공 골목 진입 - wide"
status: GENERATING                  # = 현재 column
priority: P1
duration_sec: 6
dependencies: [AGM_104_TCC_067_0040]   # 이전 shot last-frame 의존 ⭐
prompt:
  current: "figure walking into a narrow neon alley, rain, cinematic..."
  history: [v001: "...(원본)", v002: "...(garbled 후 재작성)"]   # ⭐ 이력 보존
generation:
  model: kling-2.6
  seed: 184422                      # ⭐ 재현성 위해 고정·기록
  params: { cfg: 7.5, motion: 0.6, fps: 24 }
  input_keyframe: keyframes/..._0050_kf_v002.png
  refs: [assets/char_sheet_hero_v003.png]
iteration:
  version: v003
  retries: 2
  max_retries: 4                    # 초과 시 → human handoff ⭐
  takes:
    - { take: 1, file: ..._v003_t01.mp4, verdict: reject, reason: "style drift" }
    - { take: 2, file: ..._v003_t02.mp4, verdict: pending }
qc: { continuity: pending, style_match: pending, artifacts: null, notes: "" }
cost: { spent_credits: 38, budget_cap: 60 }   # ⭐ 초과 시 자동 중단 + 알림
assets: { dir: /project/AGM/104/067/0050/, naming: "AGM_104_TCC_067_0050_{task}_{vendor}_v{NNN}" }
owner: agent:generator-01
human_review_required: false
```

> ⭐ **카드는 단순 status가 아니라 "에이전트가 cold-start로 이 shot을 이어받을 수 있는 완전한 상태"를 담아야 한다 — seed, prompt history, model params, input keyframe 경로, retries, budget.**

### 2.4 retry/iteration 표현
- retry는 **새 카드를 만들지 말고** 같은 카드의 `takes[]` 배열 + `version` 증가(이력 보존).
- 시각 표식: 🔴 blocked/실패, 🔁 재시도 중, 👤 인간 검토 대기.
- `retries ≥ max_retries` → 카드를 Review/QC로 강제 이동 + `human_review_required=true` 에스컬레이션.

---

## 3. Agent Harness / Orchestration

영상 생성 모델은 본질적으로 **stateless** — persistent memory가 없으면 한 shot의 캐릭터 정체성을 다음 shot에서 재현 못 한다. **상태(state)를 harness가 외부에서 들고 있어야 한다.**

### 3.1 대표 아키텍처
- **ViMax**(HKUDS): 중앙 orchestration이 Agent Scheduling·Stage Transitions·Resource Management·Retry/Fallback + **Asset Indexing**(frames/refs catalog + embeddings + retrieval)으로 shot 간 consistency. → [[github-resources]]
- CoAgent(planning→generation→verification→refinement closed-loop), VideoMemory(Memory Agent가 consistency), StoryAgent(observer가 QC/handoff), DirectorAgent.

### 3.2 ⭐ 에이전트가 추적해야 할 STATE

| 범주 | 추적 항목 |
|------|-----------|
| 위치 | current shot ID, stage/column, take/version |
| 재현성 | seed, model+version, 전체 params (cfg, motion, fps...) |
| 이력 | prompt history(버전별), take 결과 + verdict + reason |
| 의존성 | shot 간 dependency 그래프 (이전 last frame → 현재 first frame) ⭐ |
| 자산 | input keyframe·reference·output 파일 경로 |
| 상황인지 | rate limit 잔량, quota, 누적 cost/budget cap, naming rule, asset 위치 |
| 연속성 제약 | character/environment identity, style directive, color/lighting 기준 |

### 3.3 Consistency 메커니즘
- ⭐ **이전 scene의 last frame으로 현재 scene의 first frame을 visual conditioning** → 외형·의상·레이아웃 보존.
- Asset Indexing + retrieval로 과거 frame/ref 재사용.
- Multi-candidate + VLM 선택: 후보 여러 장 → MLLM이 "가장 consistent한" 것을 first frame으로 자동 선택.

### 3.4 Idempotency · Retry · Durable execution
- ⭐ **외부 상태를 쓰는 모든 tool 호출(영상 생성·파일 저장)은 idempotency key를 가져야** replay/재시도 시 중복 side effect(중복 클립·중복 과금)가 없다.
- ⭐ **생성 output은 비결정적이므로 "처음 성공한 결과를 기록하고, 복구 시 재실행 대신 기록값 재사용"** (Temporal식 durable execution).
- State checkpointing으로 최근 checkpoint부터 resume. Retry는 idempotent하거나 기록 결과가 있을 때만 안전(backoff).

### 3.5 Handoff (Human-in-the-loop) 지점
⭐ **다음은 자동 진행 말고 인간 승인 게이트:**
1. Script → Storyboard (내러티브 방향 확정)
2. **Storyboard/animatic 승인** — video gen 전, 비용 발생 직전의 가장 중요한 게이트
3. QC 게이트 (continuity break·style drift·정책 위반)
4. 에스컬레이션 (retry 초과·budget cap·반복 차단)

구현: review node에서 제시 → approve/reject/edit → 승인 시에만 다음 step (LangGraph interrupt 등).

---

## 4. Asset / File Naming (Netflix 방식)

```
showID _ episode _ sequence _ scene _ shotID#   _ task _ vendorID _ vNNN
AGM    _ 104     _ TCC      _ 067   _ 0050       _ comp _ NFX      _ v001
전체: AGM_104_TCC_067_0050_comp_NFX_v001
```
- shotID#는 3~4자리 **10단위 증가**(삽입 여유). version은 **반드시 `v`** + 제로패딩.
- AI 맥락: `vendorID`를 `model+seed` 식별자로 대체/병기하면 재현성↑.
- ⭐ **naming 필드 포함/제외는 프로젝트 전체에서 절대 달라지면 안 된다**(자동 파싱·정렬·중복탐지).

```
/project/AGM/104/067/0050/
  ├─ keyframes/   ..._0050_kf_v002.png
  ├─ takes/       ..._0050_gen_kling26_v003_t01.mp4   # take = 같은 버전 내 후보
  ├─ approved/    ..._0050_gen_kling26_v003_FINAL.mp4
  └─ meta/        ..._0050.yaml   # = shot-card state
```
- **version** = 의도 변경 단위, **take** = 같은 version 내 비결정적 재생성 후보. 구분 기록(`v003_t01`).

---

## 5. ⭐ 에이전트가 인지·처리해야 할 상황 (Situational Awareness)

> 무한 재시도·조용한 실패는 비용·일관성을 모두 파괴한다.

| 상황 | 감지 신호 | 처리 |
|------|-----------|------|
| **Failed/garbled** | artifact·왜곡·빈 프레임 | 같은 seed 1회 재시도 → 실패 시 seed 변경, `retries++` |
| **Continuity break** | 이전 last-frame과 불일치 | 이전 last-frame을 first-frame conditioning으로 재생성. 안 되면 QC handoff |
| **Style drift** | reference/style frame 이탈 | character sheet·style frame 재주입, prompt에 style anchor 재명시 |
| **Prompt-too-long** | 토큰/길이 초과 | 핵심 비주얼 우선 압축, 부차 제거, 분할 |
| **Blocked content (faces)** | "content moderated", 실존 인물·face filter | ⭐ literal→cinematic 재작성("a soldier shoots"→"figure in tactical gear, muzzle flash"). 실존 인물·IP는 회피. **input 통과·output 차단이면 credit 소모됨 → prompt 자체 변경** |
| **Budget/quota** | cost ≥ cap, rate limit | ⭐ 즉시 중단+알림, WIP 축소, backoff |
| **Max retries 초과** | `retries ≥ max` | 자동 중단 → human handoff |
| **언제 물을까** | 위 게이트 + 반복 차단·예산·모호 | review node 제시, approve/reject/edit 대기 |

> ⭐ **content moderation은 의미가 아니라 keyword pattern matching인 경우가 많다.** cinematic 우회는 가능하지만 실존 인물 얼굴·deepfake·IP는 우회 대상이 아니라 **회피해야 하는** 제약.

---

## 6. 요약 — Agent 필수 (⭐ 모음)
- ⭐ 모든 stage는 input artifact 계약 검증 후 진입(keyframe 없이 video gen 금지).
- ⭐ character/reference sheet를 scene 이미지보다 먼저.
- ⭐ 카드=shot, cold-start 재개 가능한 완전 state(seed·prompt history·params·refs·retries·budget).
- ⭐ Generating column에 가장 엄격한 WIP.
- ⭐ 이전 shot last-frame으로 다음 first-frame conditioning.
- ⭐ tool 호출에 idempotency key, 생성 output에 record-and-replay.
- ⭐ storyboard/animatic 승인을 video gen 직전 핵심 human gate로.
- ⭐ budget cap·max retries 도달 시 자동 중단 + handoff.
- ⭐ blocked content는 cinematic 재작성, 단 실존 인물·IP는 회피.

---

## 출처

- [AI Video Pipeline Complete Guide (2026)](https://aividpipeline.com/blog/ai-video-pipeline-complete-guide), [Script to Storyboard to Film — M Studio](https://mstudio.ai/blog/ai-filmmaking/script-to-storyboard-to-film-ai-workflow), [AI video production workflow — Ability.ai](https://www.ability.ai/blog/ai-video-production-workflow)
- [ViMax — GitHub (HKUDS)](https://github.com/HKUDS/ViMax), [CoAgent — arXiv](https://arxiv.org/pdf/2512.22536), [StoryAgent — arXiv](https://arxiv.org/html/2411.04925v2), [DirectorAgent — arXiv](https://arxiv.org/pdf/2601.17737)
- [Kanban / WIP limits — Asana](https://asana.com/resources/what-is-kanban), [Wrike WIP](https://www.wrike.com/kanban-guide/kanban-wip-limits/), [Atlassian boards](https://www.atlassian.com/agile/kanban/boards)
- [VFX Shot/Version Naming — Netflix](https://partnerhelp.netflixstudios.com/hc/en-us/articles/360057627473-VFX-Shot-and-Version-Naming-Recommendations), [VFX Workflow — Frame.io](https://blog.frame.io/2020/02/17/vfx-workflow-best-practices/)
- [Durable Execution for AI Agents — inference.sh](https://inference.sh/blog/agent-runtime/durable-execution), [Idempotent AI Agents — buildmvpfast](https://www.buildmvpfast.com/blog/idempotent-ai-agent-retry-safe-patterns-production-workflow-2026), [Checkpointing — Zylos](https://zylos.ai/research/2026-03-04-ai-agent-workflow-checkpointing-resumability/)
- [Human-in-the-loop — LangChain](https://docs.langchain.com/oss/python/langchain/human-in-the-loop)
- [Seedance content filter — vicsee](https://vicsee.com/blog/seedance-content-filter), [Sora 2 content restrictions — glbgpt](https://www.glbgpt.com/hub/sora-2-content-restrictions-explained-why-your-prompts-keep-getting-blocked/), ["Flagged as Sensitive" — Republic Labs](https://blog.republiclabs.ai/2025/11/what-to-do-when-ai-video-generator.html)
