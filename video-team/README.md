# Video Team Agents & Workflow Pack

This folder preserves the reusable parts of the user's Codex/Hermes video-team system inside the `blue` repository.

## Included

- `codex-video-runtime/` — Codex-delegated video runtime scaffold: lane templates, runner scripts, prompt/QC helpers, and references.
- `codex-skills/` — current Codex skills used by the video team:
  - `music-video-production-team`
  - `videodirector`
  - `seedance-prompt-en`
  - `grok-i2v-batch-producer`
  - `music-director`
  - `jeongseon-video-typography`
- `wiki-extract/` — curated workflow/seed/QC knowledge exported from the local LLM wiki.
- `wiki-extract/jinuwiki/` — current full public-safe snapshot of the local `jinuwiki` knowledge base, excluding editor metadata such as `.obsidian/`.

## Excluded intentionally

- Project runtime folders under `Documents/Codex/video-team-runtime/`
- Generated media, CapCut drafts, uploads, downloads, and queue artifacts
- `.env`, API keys, tokens, login/session dumps, and local credentials
- Timestamped backup copies inside local skills

## Operating notes

- For still images/styleframes, use ChatGPT Image 2; use Grok only for I2V/videoization unless explicitly overridden.
- Serious video work remains music-first: cut timing follows beat, phrase changes, hooks, energy curve, and ending cadence.
- For public-contest/institution work, story clarity, role-separated Korean typography, and submission safety gates take priority.
- Completion requires verified media files and final CapCut/export QC; prompt packages or placeholders are not completion.
