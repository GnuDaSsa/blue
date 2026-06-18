---
title: Codex Computer Use
type: entity
tags: [codex, computer-use, chrome, windows, automation]
updated: 2026-06-12
sources: []
---

# Codex Computer Use

Codex에서 Windows 앱이나 사용자가 띄워둔 Chrome을 조작해야 할 때 사용하는 데스크톱 자동화 플러그인이다.

## 호출 해석
- 사용자가 `컴퓨터 유즈`, `컴퓨터`, `컴퓨터로 해`, `윈도우 조작`, `크롬에서 해`, `내가 띄워둔 크롬에서 해`라고 말하면 `computer-use@openai-bundled`를 우선 의도한 것으로 해석한다.
- 사용자가 명시적으로 `[@컴퓨터](plugin://computer-use@openai-bundled)`를 쓰지 않아도, Windows/Chrome UI 조작이 필요한 요청이면 `[컴퓨터사용]`으로 응답하고 Computer Use/Chrome 제어 경로를 먼저 검토한다.
- 브라우저 작업은 가능하면 Chrome 플러그인 경로를 우선한다. Computer Use는 Windows 앱 조작 또는 Chrome 플러그인이 불가능한 경우에 보조로 본다.

## 기본 절차
1. `computer-use` 스킬 지침을 먼저 읽는다.
2. `scripts/computer-use-client.mjs`를 절대 경로로 import하여 `setupComputerUseRuntime`을 실행한다.
3. 첫 확인은 `sky.list_apps()`로 한다.
4. 앱을 고를 때는 `list_apps()`가 반환한 app/window 객체만 사용한다.
5. Chrome 웹 작업은 Chrome 플러그인 연결이 가능하면 Chrome의 `browser-client.mjs`를 사용한다.
6. 크레딧 사용, 업로드, 생성 버튼처럼 외부 부작용이 있는 액션은 사용자 승인 또는 기존 명확한 지시를 확인한다.

## 현재 환경 메모
- `computer-use-client.mjs` 경로: `C:\Users\USER\.codex\plugins\cache\openai-bundled\computer-use\26.609.30741\scripts\computer-use-client.mjs`
- 현재 이 세션에서 Computer Use 직접 초기화는 `@oai/sky` package exports 오류가 난다.
- 오류: `Package subpath './dist/project/cua/sky_js/src/targets/windows/internal/computer_use_client_base.js' is not defined by "exports"`
- Chrome 확장/native host 쪽은 Chrome 업데이트 후 registry/manifest가 정상화되었고, `extension-host` 프로세스가 뜬 기록이 있다.
- 다른 세션 확인 결과, `[@컴퓨터](plugin://computer-use@openai-bundled)`는 Computer Use 스킬을 강제 트리거하고 별도 작업 디렉터리에서 시작하게 만든다. 앞으로 사용자가 플러그인 링크를 쓰지 않아도 동일 의도로 해석한다.

## 장애 대응
- Computer Use가 같은 `@oai/sky` exports 오류로 실패하면 억지로 PowerShell SendKeys나 수동 UI 자동화를 만들지 않는다.
- Chrome 작업이면 Chrome 플러그인 연결 상태를 점검한다: Chrome 실행, `Profile 2` 확장 설치/활성화, native host manifest, `extension-host`.
- Chrome 플러그인도 `Browser is not available: extension`이면 Codex 앱의 컴퓨터 유즈/브라우저 연결 권한 게이트를 확인한다.
- 성공 세션이 있으면 `list_threads`/`read_thread` 또는 `.codex/sessions` 로그에서 실제 호출 순서를 확인하고 이 페이지에 누적한다.
