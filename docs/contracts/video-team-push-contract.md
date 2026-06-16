# Video Team Push Contract

## Goal

Publish the user's reusable video-team agents and workflow assets into the `blue` repository without generated media, project runtime artifacts, or secrets.

## Scope

In scope:
- `video-team/codex-video-runtime/`
- `video-team/codex-skills/`
- `video-team/wiki-extract/`
- `video-team/README.md`
- Harness bootstrap files for future Codex work in this repo

Out of scope:
- Generated images/videos/audio
- CapCut drafts and exports
- Runtime project folders under `Documents/Codex/video-team-runtime/`
- `.env`, real API keys, browser sessions, credentials, or upload/submission automation

## Verification

- Python syntax check for runtime scripts
- Secret-pattern scan of newly added video-team and harness files
- Existing app build check where feasible
