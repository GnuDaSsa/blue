---
title: 영상 업무 위키 참조 워크플로
type: concept
tags: [영상, 워크플로, 위키, seedance, 프롬프트]
updated: 2026-06-12
sources: []
---

# 영상 업무 위키 참조 워크플로

영상 기획, Seedance 프롬프트, 레퍼런스 분석, 편집/연출 방향, 영상 결과 회고를 다룰 때 반드시 따르는 절차.

## 1. 작업 전 필수 참조
영상 관련 요청을 받으면 답변이나 프롬프트 작성 전에 아래 순서로 확인한다.

1. [[index]] — 관련 페이지 탐색
2. [[overview]] — 현재 위키 종합 상태 확인
3. [[video-team-harness]] — 영상팀 하네스 진행 순서 확인
4. [[seedance-2.0]] — Seedance 프롬프트 또는 AI 영상 생성일 때 필수
5. [[image-qc-criteria]] — 이미지 생성/QC가 포함될 때 필수
6. [[worklog/2026-06]] 및 최신 worklog — 최근 결정, 반복 실수, 사용자가 선호한 방향 확인
7. 관련 `projects/`, `prompts/`, `concepts/`, `entities/` 페이지

## 2. 프롬프트 작성 원칙
- 먼저 목표를 한 문장으로 압축한다.
- 레퍼런스가 있으면 `@`의 역할을 명시한다.
- Seedance 프롬프트는 `[Subject] + [Scene] + [Action] + [Camera] + [Timing] + [Transitions] + [Audio] + [Style]` 구조를 기본으로 한다.
- 8초 이상이면 시간 구간을 나누어 제어한다.
- 사운드/음악/리듬은 빠뜨리지 않는다.
- 실제 사람 얼굴 업로드 제한 등 플랫폼 차단 요소를 먼저 확인한다.

## 3. 작업 후 기록
의미 있는 영상 업무가 끝나면 아래 중 필요한 위치를 갱신한다.

- `worklog/YYYY-MM.md`: 이번 작업에서 한 일, 결정, 다음 액션
- `projects/<project>.md`: 프로젝트 단위 목표, 레퍼런스, 결과, 회고
- `prompts/<date>-<name>-seedance.md`: 최종 프롬프트와 변형안
- `concepts/` 또는 `entities/`: 새롭게 발견한 기법, 툴, 모델, 패턴
- `index.md`: 새 페이지가 생겼을 때 카탈로그 갱신

## 4. 에이전트 지침
이 워크플로는 `C:\Users\USER\Desktop\사진우\agent.md`와 `AGENTS.md`에 반영되어야 한다. 영상 업무를 시작하는 에이전트는 이 페이지를 먼저 검토하고 작업한다.

## 5. 영상팀 하네스
기획서나 아이디어 기반 제작은 [[video-team-harness]]를 따른다.

기본 순서:
1. `[플래너]` 기획 보강 및 실행 계획
2. `[음악감독]` Suno 4회 Generate로 8개 후보 생성, 3개 추천, 사용자 선택
3. `[이미지팀]` 선택곡과 컷 분할 기준으로 GPT Image 2 이미지 제작 및 QC
4. `[영상감독]` 패스 이미지로 시댄스 멀티 레퍼런스 영상화
5. `[위키관리]` 결과와 기준 누적
