---
title: Overview
type: overview
tags: [메타]
updated: 2026-06-16
sources: []
---

# Overview — jinuwiki 최상위 종합

## 이 위키는 무엇인가
영상·사진 제작을 위한 개인 LLM 위키. 소스를 ingest할수록 풍부해지고, 질의 결과도 다시 파일링되어 누적된다. 운영 방식은 [[SCHEMA]] 참고.

## 영상작업의 주체
실제 영상작업은 **Codex 하네스**가 수행한다. 이 위키의 역할은 Codex가 영상작업을 잘 하도록 **지식·규칙·체크리스트를 제공**하는 것이다. (참조 규칙: [[video-workflow]], 필수 규칙: [[critical-rules]])

## 현재 다루는 범위
- **⭐ 영상작업 필수 규칙**: [[critical-rules]] — 작업 전 먼저 보는 단일 체크리스트
- **기획·스토리구조**: [[video-planning-story-structure]] (후크·리텐션·비트시트·샷리스트·프레임워크)
- **구도·연출 이론**: [[cinematography-composition]] (샷·앵글·무빙·구도·조명·편집·색채)
- **구도→프롬프트 변환**: [[cinematography-prompt-translation]] (렌즈·조명·색 영어 키워드, 9:16)
- **편집·연출 기법**: [[editing-directing-technique]] (컷 문법·오디오주도·페이싱·전환·AI 컷연결)
- **AI 영상 모델·프롬프팅**: [[ai-video-prompting]], [[seedance-2.0]]
- **이미지 생성·캐릭터 일관성**: [[image-generation]]
- **파이프라인·Kanban·에이전트 하네스**: [[video-pipeline-kanban]], [[video-team-harness]]
- **품질관리(QC)**: [[qc-checklist]], [[image-qc-criteria]]
- **오디오·음악·편집·마감**: [[audio-editing-post]], [[music-scoring-sync]]
- **자막·캡션**: [[subtitles-captions]] (가독성·세이프존·한국어·키네틱타이포)
- **오픈소스 도구·스킬·레포**: [[github-resources]]

## 현재 종합 상태 (thesis)
> 영상 제작 전 영역(기획·스토리구조 → 구도 이론·프롬프트 변환 → 이미지/영상 생성 → 편집·연출 기법 → 파이프라인·하네스 → QC → 오디오·음악·자막·마감 → 도구)을 커버하는 지식베이스. 1차 7영역(2026-06-12) + 2차 5영역 딥리서치(2026-06-16: 음악·기획·기법·구도·자막)로 확장.
> 각 페이지의 ⭐ 항목 = Codex가 틀리면 안 되는 핵심. [[critical-rules]] 섹션 A–K에 전부 집약.
> 활용 진입점: 개인 스킬 `video-preprod`(아이디어→제작패키지)가 이 위키 규칙을 실행하고, jinuwiki는 Obsidian Vault로도 연계됨.
> 다음 단계: 실제 작업 결과·레퍼런스를 `raw/`에 ingest하며 사례를 누적하고, 충돌·낡은 정보를 lint로 정리.

## 열린 질문 / 다음 할 일
- [ ] 실제 영상 프로젝트 결과물을 ingest해 사례 기반 노하우 축적
- [ ] 자주 쓰는 레퍼런스 영상/이미지를 `raw/`에 수집 후 ingest
- [ ] 모델 버전 업데이트 시 [[ai-video-prompting]]·[[image-generation]] 갱신(빠르게 낡는 영역)
- [ ] 위키 확장 시 qmd([[github-resources]]) 검색 도입 검토
