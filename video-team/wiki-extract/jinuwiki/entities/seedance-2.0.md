---
title: Seedance 2.0 (즉멍/Jimeng)
type: entity
tags: [영상, ai-영상생성, seedance, bytedance, 프롬프트]
updated: 2026-06-12
sources: [seedance-prompt 스킬 가이드 (~/.claude/skills/seedance-prompt/SKILL.md)]
---

# Seedance 2.0

ByteDance(즉멍/Jimeng)의 **멀티모달 AI 영상 생성 모델**. 텍스트·이미지·영상·오디오를 입력으로 받아 `@` 레퍼런스 문법으로 각 에셋에 역할을 부여하고, 구조적·카메라 인식적 언어로 결과를 묘사한다.

## 입력 제약
- 이미지 최대 9장 (각 30MB) / 영상 3개 (각 50MB, 합 2–15s) / 오디오 3개 (각 15MB) / 합계 최대 12개 파일
- **실제 사람 얼굴 업로드 차단**

## 출력
- 4–15초, 480p–720p, 사운드 자동 생성

## @ 레퍼런스 시스템
에셋에 역할을 명시적으로 지정:
- `@Image1 as the first frame`
- `reference @Video1's camera movement`
- `BGM references @Audio1`
- 원칙: **각 레퍼런스가 무엇을 위한 것인지 항상 명시**

## 프롬프트 구조 공식
`[Subject] + [Scene] + [Action] + [Camera] + [Timing] + [Transitions] + [Audio] + [Style]`
- 8초 초과 영상은 시간 구간 분할(0–3s, 3–6s …)로 정밀 제어

## 피해야 할 실수
모호한 레퍼런스, 상충 지시, 과적재 장면, @ 미지정, 오디오 설계 누락, 길이 대비 부적절한 복잡도, 실제 얼굴 업로드 시도.

## 관련
- 상세 가이드: 설치된 `seedance-prompt` 스킬 (시댄스 프롬프트 요청 시 자동 활성화)
- 개념 확장 예정: [[camera-movement]], [[transition-patterns]], [[audio-design]]
