---
title: Suno + Seedance Practice
type: project
tags: [실습, 음악, 영상, suno, seedance, computer-use]
updated: 2026-06-12
sources: []
---

# Suno + Seedance Practice

## 목표
Suno로 간단한 음악을 만들고, Seedance/영상 생성 쪽에서 멀티 레퍼런스 기반 영상을 만드는 최소 프로세스를 익힌다.

## 도구
- Suno: https://suno.com/create
- 영상 생성 링크: https://app.runwayml.com/video-tools/teams/sajw1994/ai-tools/generate?mode=tools&tool=video
- 조작 방식: Computer Use

## 사용자 운영 규칙
- Suno는 기본적으로 Custom Mode에서 진행한다.
- 가사가 없는 음악은 Simple Mode에서 Instrumental을 체크하고 생성한다.
- Seedance/영상 생성은 반드시 멀티 레퍼런스만 사용한다.

## 준비된 프롬프트
- [[prompts/2026-06-12-suno-custom-practice]]
- [[prompts/2026-06-12-seedance-multiref-practice]]

## 현재 상태
Computer Use 연결 초기화에서 아래 오류가 발생해 실제 브라우저 조작은 진행하지 못했다.

```text
Package subpath './dist/project/cua/sky_js/src/targets/windows/internal/computer_use_client_base.js' is not defined by "exports" in C:\Users\USER\AppData\Local\OpenAI\Codex\runtimes\cua_node\789504f803e82e2b\bin\node_modules\@oai\sky\package.json
```

## 다음 액션
- Codex 재시작 후 Computer Use가 새 플러그인 런타임을 정상 로드하는지 확인한다.
- 정상 연결되면 Suno Custom Mode 실습부터 진행한다.
- Suno 결과가 나오면 필요 시 `@Audio1`로 영상 멀티 레퍼런스에 추가한다.
- 영상 생성은 최소 2개 이상의 레퍼런스를 넣고 실행한다.
