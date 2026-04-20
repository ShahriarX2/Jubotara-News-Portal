---
name: Read Aloud Feature Plan
description: Plan to add Bengali text-to-speech "read aloud" button on news page
type: project
---

# Read Aloud Feature — Implementation Plan

## Context
User wants a "read aloud" button on individual news pages so users can listen to Bengali news content instead of reading it.

## Tech Stack
- Next.js 16 (App Router)
- Tailwind CSS 4
- News content rendered via `dangerouslySetInnerHTML` in `app/news/[slug]/page.js`

## Options

### Option 1: Web Speech API (SpeechSynthesis) — Recommended to start
- **Pros:** Free, client-side only, supports Bengali (`bn-BD`), quick to implement
- **Cons:** Robotic voice, variable quality per browser

### Option 2: Third-party TTS (Google Cloud TTS, AWS Polly)
- **Pros:** Natural Bengali voices, better pronunciation
- **Cons:** Requires API key/credentials, added complexity and cost

### Option 3: Hybrid approach
- Start with Web Speech API, upgrade to third-party if quality is insufficient

## Implementation Steps (Option 1)

1. **Create `ReadAloudButton` component** in `components/news/`
   - Use `window.speechSynthesis` Web Speech API
   - Toggle play/pause state
   - Select Bengali voice (`bn-BD`)
   - Extract text from `.article-content` div
   - Handle cleanup on unmount

2. **Integrate into news detail page** (`app/news/[slug]/page.js`)
   - Place button in action bar alongside `ShareButtons` and `PrintButton` (line ~201-207)
   - Or floating button at bottom of article content

3. **Add styles** via Tailwind — match existing button styling

4. **Consider progressive enhancement** — check for `speechSynthesis` API support

## Status
- [ ] Not started