---
title: Seedance Multi-Reference Practice
type: prompt
tags: [영상, seedance, multi-reference, 실습]
updated: 2026-06-12
sources: []
---

# Seedance Multi-Reference Practice

## 목표
Seedance 영상 생성에서 반드시 멀티 레퍼런스를 사용하는 흐름을 익힌다.

## 레퍼런스 원칙
- 단일 레퍼런스로 진행하지 않는다.
- 최소 2개 이상의 이미지/영상/오디오 레퍼런스를 사용한다.
- 각 레퍼런스의 역할을 프롬프트에 명시한다.
- 실제 사람 얼굴이 포함된 자료는 사용하지 않는다.

## 추천 레퍼런스 구성
- `@Image1`: 첫 프레임/주요 무드. 예: 비 내린 네온 골목, 웅덩이 반사, 사람 없음.
- `@Image2`: 색감/배경 스타일. 예: 파스텔 도시 야경, 간판 빛, 부드러운 보라-청록 대비.
- 선택: `@Audio1`: Suno에서 생성한 짧은 음악을 BGM/리듬 레퍼런스로 사용.

## Prompt

```text
@Image1 as the first frame and main scene mood: a rain-wet neon alley with glowing reflections, no people.
@Image2 as the color palette and background style reference: pastel city night lights with soft cyan and magenta contrast.

Create a 5-second cinematic ambient shot.
0-2s: Start close on the puddle reflection from @Image1. The neon lights ripple gently as if a light breeze touches the water.
2-4s: Slow push-in and slight tilt up, revealing more of the alley depth. Use @Image2's pastel cyan-magenta color mood for the background glow.
4-5s: A small paper crane drifts across the frame, catching the neon light, then the shot settles into a calm hero frame.

Camera: slow push-in, subtle handheld drift, shallow depth of field.
Sound: soft city ambience, light rain texture, warm dreamy synth pad. If @Audio1 is provided, match the BGM mood and rhythm to @Audio1.
Style: cinematic, warm and dreamy, clean composition, no humans, no realistic faces, no text overlays.
```

## 실습 체크리스트
- [ ] 영상 생성 페이지 접속
- [ ] 멀티 레퍼런스 모드 또는 복수 레퍼런스 입력 영역 확인
- [ ] 최소 2개 레퍼런스 추가
- [ ] 프롬프트 입력
- [ ] 길이 5초 전후로 설정
- [ ] 생성 실행
- [ ] 결과 링크/결과 메모 기록

## 결과 메모
> TODO: Computer Use 정상 연결 후 생성 결과 기록.
