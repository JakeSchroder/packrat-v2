# Packrat

A website the aggregates many unique brands onto one site for ease of shopping or browsing.

## Demo

Live demo at [Packrat](packrat.shop)

## Tech Stack

**Frontend:** React, NextJS, Chakra UI, TailwindCSS

**Backend:** MongoDB

**Deployment:** Vercel

## Run Locally

First, create a `.env.local` file in the root folder with your `DATA_API_KEY`, `DATA_API_URL`, and `MONGODB_URI`

Secondly, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
