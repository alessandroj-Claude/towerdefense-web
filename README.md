# towerdefense-web

Landing site for Tower Defense web portal.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deployment

This project is intended to be deployed on Vercel and connected to:
- https://towerdefense-cj.online

### Environment Variables (Vercel)

Set these in Project Settings -> Environment Variables:

- `NEXT_PUBLIC_GAME_EMBED_URL` (default: `/game/index.html`)

After any env var change, trigger a new Vercel deploy.
