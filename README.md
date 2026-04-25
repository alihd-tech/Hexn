# Hexn - Personal & Independent Search Engine

![Nuxt](https://img.shields.io/badge/Nuxt-3.13.0-00DC82?logo=nuxt.js&logoColor=white)
![Nuxt Content](https://img.shields.io/badge/Nuxt%20Content-2.13.2-00DC82?logo=nuxt.js&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-4.12.10-5A0EF8?logo=daisyui&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Hexn is an open-source search project for building your own independent, privacy-focused search experience.

![Index Screenshot](./public/screenshot.png)

## Live Demo

[![Deploy on Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-Deployed-F38020?logo=cloudflare&logoColor=white)](https://hexnsearch.alihdtech.workers.dev)

Hexn v1 deployed on Cloudflare : [[hexnsearch.alihdtech.workers.dev](https://hexnsearch.alihdtech.workers.dev/)].

[![Deploy on Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel&logoColor=white)](https://hexn.vercel.app)  
Hexn v2 on Vercel : [hexn.vercel.app](https://hexn.vercel.app).

## Overview

- Nuxt 3, Vue 3, Tailwind CSS, DaisyUI
- Nuxt Content for topic pages with Custom weighted search from `content/search-data.json`

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Install and run

```bash
git clone https://github.com/alihd-tech/hexn.git
cd hexn
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build and preview

```bash
pnpm build
pnpm preview
```

## Project Structure

```text
hexn/
├── app.vue
├── nuxt.config.ts
├── assets/css/main.css
├── components/
├── composables/useContentSearch.js
├── content/
│   ├── search-data.json
│   └── topics/
├── pages/
│   ├── index.vue
│   ├── search.vue
│   └── topics/[slug].vue
└── public/
```

## How It Works

- Routes are file-based from `pages/`
- Topic content lives in `content/topics/*.md`
- Search results are loaded and scored on the client from `content/search-data.json`

For larger datasets, move search to a Nitro API route under `server/api/` and keep the UI unchanged.

## Search architecture diagrams

### Current architecture (client-side index search)

```mermaid
flowchart LR
    A[User enters query in pages/search.vue]
    B[useContentSearch.js]
    C[Load content/search-data.json]
    D[Weighted scoring and filtering]
    E[Sorted top results]
    F[Search scope components render results]

    A --> B --> C --> D --> E --> F
```

### Scaled architecture (API/server-side search)

```mermaid
flowchart LR
    A[User enters query in UI]
    B[Client calls /api/search]
    C[Nitro handler in server/api/search.ts]
    D[(Search backend: DB / Elasticsearch / SaaS)]
    E[Ranked and paginated response]
    F[UI renders results + filters]

    A --> B --> C --> D --> C --> E --> F
```

## Extend the Project

- Add new pages in `pages/`
- Add new topic articles in `content/topics/`
- Expand search records in `content/search-data.json`
- Add shared logic in `composables/`
- Add reusable UI in `components/`

## License

This project is licensed under the MIT License.

![Overview Screenshot](./public/readme.png)

