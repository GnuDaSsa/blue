# Decisions

Record notable technical or product decisions here so they do not live only in chat history.

## Entry Template

### YYYY-MM-DD - Short Decision Title

- Context:
- Decision:
- Consequences:
- Follow-up:

## 2026-06-16 — Video team package scope

- Keep reusable runtime scaffolding, current Codex video skills, and curated wiki workflow extracts under `video-team/`.
- Exclude project runtime folders, generated media, CapCut drafts, credentials, and timestamped local backup files.
- Because `GnuDaSsa/blue` is public, normalize copied `/Users/gnudas` absolute paths to `~` or `Path.home()` in the public copy.
