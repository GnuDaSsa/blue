# raw/ — 원천 소스 (불변)

여기에 소스 문서(아티클, 논문, 이미지, 레퍼런스 영상 메모, 데이터 파일)를 넣는다.
**이 폴더는 source of truth이며 LLM은 읽기만 하고 절대 수정하지 않는다.**

새 소스를 넣은 뒤 LLM에게 "ingest" 라고 지시하면 → `sources/`에 요약, 관련 `entities/`·`concepts/` 갱신, `index.md`·`log.md` 업데이트가 이뤄진다. (운영 규약: [[SCHEMA]])
