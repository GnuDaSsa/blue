# jinuwiki — 로그 (시간순 / append-only)

> 각 항목은 `## [YYYY-MM-DD] ingest|query|lint | 제목` 접두사로 시작.
> 최근 이력: `grep "^## \[" log.md | tail -5`

## [2026-06-12] init | 위키 부트스트랩
- Karpathy LLM Wiki 패턴으로 jinuwiki 생성. SCHEMA / index / log / overview 골격 작성.
- 시드 개체 페이지 [[seedance-2.0]] 추가 (출처: 설치된 seedance-prompt 스킬 가이드).
- 루트 CLAUDE.md에 우선순위 규칙 연결: 기본 지침 → 필요시 위키 참조, **영상작업 필수 참조**.

## [2026-06-12] setup | 영상 업무 위키 참조 및 작업 이력 구조화
- `projects/`, `worklog/`, `prompts/`, `templates/` 구조 추가.
- [[video-workflow]] 생성: 영상 업무 전 `index.md`, `overview.md`, 관련 페이지, 최신 worklog를 반드시 검토하도록 정의.
- [[worklog/2026-06]]에 Codex 하네스, Seedance 스킬, 음악/Suno 스킬, Computer Use 활성화, 위키 참조 규칙을 기록.

## [2026-06-12] setup | 응답 역할 태그 표시 규칙 추가
- `agent.md`, `AGENTS.md`, `Documents/Codex/AGENTS.md`에 응답 첫머리 태그 규칙 추가.
- 예: `[영상팀]`, `[음악감독]`, `[위키관리]`, `[컴퓨터사용]`, `[플래너]`.
- 토큰 절약을 위해 태그에는 한글 역할명만 표시하도록 규정.

## [2026-06-12] setup | 응답 태그 간결화
- 기존 긴 태그 형식을 `[역할명]`으로 축소.
- 영상 업무는 `[영상팀]`, 음악/Suno 업무는 `[음악감독]`, 계획은 `[플래너]`로 표시.

## [2026-06-12] query | Suno + Seedance 실습 준비
- Suno Custom Mode 실습 프롬프트와 Seedance/영상 멀티 레퍼런스 실습 프롬프트 작성.
- 프로젝트 페이지 [[projects/2026-06-suno-seedance-practice]] 생성.
- Computer Use 런타임 export 오류로 실제 브라우저 조작은 차단됨. Codex 재시작 후 재개 필요.

## [2026-06-12] fix | CLAUDE.md 롤백 및 Codex 수정 금지
- Codex가 `CLAUDE.md`에 넣었던 응답 태그/스킬 변경을 롤백.
- 앞으로 Codex는 `CLAUDE.md`를 수정하지 않고 `agent.md`, `AGENTS.md`, `jinuwiki/`만 갱신하도록 규칙화.

## [2026-06-12] setup | 영상팀 하네스 구축
- [[video-team-harness]] 생성: 플래너 → 음악감독 → 이미지팀 → 영상감독 → 위키관리 순서 정의.
- [[image-qc-criteria]] 생성: GPT Image 2 컷 이미지 QC 기준과 사용자 지적 누적 기준 정의.
- `agent.md`, `AGENTS.md`, `Documents/Codex/AGENTS.md`에 영상팀 하네스 요약 반영.
- `CLAUDE.md`는 수정하지 않음.

## [2026-06-12] ingest | 영상 제작 지식베이스 대규모 리서치 반영
- 7개 영역 웹 리서치(병렬 에이전트) 후 8개 페이지 신규 작성. 실제 영상작업 주체인 **Codex 하네스**가 참조할 자료.
- [[cinematography-composition]] — 샷 사이즈/앵글/무빙/구도 규칙/조명/180도·편집/색채 이론(구도 논리·정의).
- [[ai-video-prompting]] — Seedance/Veo3.1/Sora2/Kling/Runway/Hailuo/Luma/Pika/Wan/Hunyuan/LTX 비교 + 프롬프팅 craft·실패모드 완화.
- [[image-generation]] — MJ/Flux/Nano Banana/SDXL/Seedream, 캐릭터 일관성(LoRA·IP-Adapter·ControlNet·seed), 첫·끝 프레임, 업스케일.
- [[video-pipeline-kanban]] — end-to-end 파이프라인, Kanban(card=shot)·WIP·shot-card 스키마, 상태관리·idempotency·handoff·네이밍·상황대응.
- [[qc-checklist]] — AI 영상 아티팩트·temporal·연속성·오디오·기술·플랫폼 스펙·정책 + retry/accept 스코어링.
- [[audio-editing-post]] — 사운드 4 layer, AI 음악(Suno/Udio/ElevenLabs), 비트매칭, LUFS by platform, 편집·컬러·숏폼 페이싱·라이선싱.
- [[github-resources]] — awesome 리스트·에이전트 스킬·ComfyUI 노드·오픈소스 모델·후처리·qmd·ViMax.
- [[critical-rules]] — 위 전체의 ⭐ 핵심 규칙만 모은 단일 체크리스트. 각 페이지 중요 항목은 본문에 ⭐ 별도 체크.
- index.md 갱신. (CLAUDE.md는 규칙상 미수정 — agent.md/AGENTS.md에 [[critical-rules]] 필수 참조 추가 예정.)

## [2026-06-16] ingest | 2시간 스터디 — 음악·기획·기법·구도·자막 5영역 딥리서치 반영
- 5개 병렬 리서치 에이전트(2025–2026 웹) + 기존 커버리지 갭맵으로 중복 회피. 신규 5개 concept 페이지 작성.
- [[video-planning-story-structure]] — 후크(3s/30s/콜드오픈)·리텐션·비트시트·샷리스트·스토리 프레임워크·AI 샷 분해(3타깃).
- [[editing-directing-technique]] — 컷 문법(180도/30도/매치온액션)·오디오주도(J/L컷·사운드브리지)·페이싱·전환·몽타주·AI 프레임 체이닝.
- [[cinematography-prompt-translation]] — 구도/렌즈/조명/색의 지각논리 + 영어 프롬프트 변환표, 9:16 세로 전용 규칙.
- [[music-scoring-sync]] — 감정 BPM/키 수치·LUFS 정밀화·멀티밴드 사이드체인·Suno Studio/스템·Seedance 오디오 I/O(MP3≤3≤15s)·라이선스 2026.
- [[subtitles-captions]] — 🆕 큰 공백 해소: 캡션 타입·가독성 CPS·숏폼 karaoke·세이프존·한국어 자막(어절 줄바꿈·Pretendard)·툴링.
- [[critical-rules]]에 섹션 G(기획)·H(컷연결)·I(프롬프트화)·J(음악)·K(자막) 추가. index.md 갱신.
- 자매 산출물: 개인 스킬 `video-preprod`(아이디어→제작패키지) 신설, jinuwiki를 Obsidian Vault로 연계.
