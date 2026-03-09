---
inclusion: fileMatch
fileMatchPattern: "public/**,GUIDE.md,agents.md,requests.http,prompts/**,.github/**,README.md"
---

# Frontend & Docs

- Frontend is plain HTML/CSS/JS served from `public/`. No frameworks, no build tools.
- `public/components/` directory for reusable UI components (e.g., navbar, card, modal). Each component is a folder with its own HTML partial, CSS, and JS.
- `agents.md` is written as direct instructions to an AI, not human documentation.
- `requests.http` must include query parameter examples (search, pagination) alongside standard CRUD requests.
- `GUIDE.md` walks through adding a full feature: model → controller → route → test → register in index.js.
- Prompt templates in `prompts/` reference the project structure so AI output fits the template patterns.
