# jinuwiki — 스키마 / 운영 규약

> 이 문서는 **LLM(에이전트)이 jinuwiki를 어떻게 유지·관리하는지**를 정의하는 설정 파일이다.
> 개념 출처: Andrej Karpathy, *LLM Wiki* (gist 442a6bf555914893e9891c11519de94f).
> 핵심 원칙: **위키는 매 질문마다 새로 검색하는 RAG가 아니라, 한 번 컴파일해 계속 최신으로 유지되는 누적 산출물(compounding artifact)이다.**

---

## 1. 이 위키의 목적 / 도메인

영상·사진 제작 작업을 위한 개인 지식 베이스.
- AI 영상 생성(Seedance 2.0 등) 프롬프트 노하우
- 카메라 워크 / 전환 / 사운드 디자인 / 편집 패턴
- 레퍼런스, 브랜드/툴/모델 정보, 작업 회고

**사용자(지누)의 역할**: 소스 수집, 탐색, 좋은 질문하기.
**LLM의 역할**: 요약, 교차참조, 정리, 기록 등 모든 잡일(bookkeeping). 위키 파일은 LLM이 쓰고, 사용자는 읽는다.

---

## 2. 디렉터리 구조 (3계층)

```
jinuwiki/
  SCHEMA.md        ← 이 파일. 운영 규약(설정)
  index.md         ← 콘텐츠 카탈로그(모든 페이지 목록 + 한 줄 요약)
  log.md           ← 시간순 append-only 로그
  overview.md      ← 최상위 종합(synthesis)
  raw/             ← [원천] 불변 소스. LLM은 읽기만, 절대 수정 금지
  sources/         ← 각 소스별 요약 페이지(1소스 = 1페이지)
  entities/        ← 개체 페이지(툴/모델/브랜드/인물 등)
  concepts/        ← 개념 페이지(기법/용어/패턴)
  projects/        ← 프로젝트별 작업 기록(목표/레퍼런스/결과/회고)
  worklog/         ← 월 단위 상세 작업 이력
  prompts/         ← 최종 프롬프트와 변형안 아카이브
  templates/       ← 반복 기록 템플릿
```

- **raw** = source of truth, 불변. **나머지** = LLM이 전적으로 소유·생성·갱신.
- 페이지 파일명: 소문자 kebab-case (`seedance-2.0.md`, `camera-movement.md`).

---

## 3. 페이지 작성 규약

- 모든 위키 페이지 상단에 YAML frontmatter:
  ```yaml
  ---
  title: 페이지 제목
  type: entity | concept | source | overview | project | worklog | prompt | template | *-index
  tags: [영상, seedance, ...]
  updated: YYYY-MM-DD
  sources: [raw/파일명, ...]   # 근거가 된 원천
  ---
  ```
- 교차참조는 `[[파일명]]` (Obsidian 위키링크) 형식으로 적극 연결. 아직 없는 페이지를 가리켜도 무방 — "나중에 만들 것" 표시가 된다.
- **근거 없는 주장 금지.** 사실은 `sources/` 또는 `raw/`의 출처에 연결. 추정/미확정은 `> TODO:` 또는 `> ⚠️ 미확인`으로 명시.
- 새 정보가 기존 주장과 충돌하면 삭제하지 말고 **충돌을 명시**(`> ⚠️ 충돌: 기존 X vs 신규 Y, 출처…`)한 뒤 사용자에게 보고.

---

## 4. 핵심 작업(Operations)

### Ingest (소스 투입)
사용자가 `raw/`에 소스를 넣고 "ingest" 지시 → LLM은:
1. 소스를 읽고 핵심 takeaway를 사용자와 짧게 논의
2. `sources/<제목>.md` 요약 페이지 작성
3. 관련 `entities/`·`concepts/` 페이지 생성/갱신 + 교차참조 연결
4. `index.md` 갱신
5. `log.md`에 한 줄 추가
   (소스 1개가 보통 위키 페이지 10~15개를 건드릴 수 있음)

### Query (질의)
1. 먼저 `index.md`를 읽어 관련 페이지 탐색 → 해당 페이지 정독
2. 출처 인용과 함께 답변 종합
3. **가치 있는 답변(비교표/분석/발견한 연결)은 채팅에 묻히지 말고 새 위키 페이지로 파일링** → 탐색도 누적된다

### Video Work (영상 업무 필수 절차)
영상 기획, AI 영상 생성, Seedance 프롬프트, 편집/연출/레퍼런스 분석을 다루는 모든 작업은 **작업 전 위키 참조가 필수**다.

1. `index.md`를 먼저 읽는다.
2. `overview.md`와 관련 페이지를 읽는다.
3. Seedance/AI 영상 생성이면 `entities/seedance-2.0.md`와 `concepts/video-workflow.md`를 읽는다.
4. 최근 결정과 반복 실수를 확인하기 위해 최신 `worklog/YYYY-MM.md`를 훑는다.
5. 작업 후 가치 있는 프롬프트/결과/회고는 `prompts/`, `projects/`, `worklog/`에 기록하고 `index.md`를 갱신한다.

이 규칙은 상위 작업 폴더의 `agent.md` 및 `AGENTS.md`에도 반영되어야 한다.

### Lint (건강검진)
주기적으로 점검: 페이지 간 모순, 최신 소스에 의해 무효화된 낡은 주장(stale), inbound 링크 없는 orphan 페이지, 페이지가 없는 중요 개념, 빠진 교차참조, 웹검색으로 채울 수 있는 데이터 공백. 새 질문/소스 후보도 제안.

---

## 5. index.md / log.md 규약

- **index.md**: 콘텐츠 지향 카탈로그. 카테고리(entities/concepts/sources)별로 `- [[파일명]] — 한 줄 요약` 나열. **ingest마다 갱신.** 질의 시 가장 먼저 읽는다.
- **log.md**: 시간순 append-only. 각 항목은 일관된 접두사로 시작:
  `## [YYYY-MM-DD] ingest|query|lint | 제목`
  → `grep "^## \[" log.md | tail -5` 로 최근 이력 파싱 가능.

---

## 6. 작동 원리(왜 이게 통하는가)

지식 베이스 유지의 고통은 읽기·사고가 아니라 **bookkeeping**(교차참조 갱신, 요약 최신화, 모순 표시, 일관성 유지)이다. 사람은 유지 부담이 가치보다 빨리 커져 위키를 버린다. LLM은 지치지 않고 한 번에 15개 파일을 손볼 수 있어 유지 비용이 0에 수렴한다 — 그래서 위키가 살아있는다.
