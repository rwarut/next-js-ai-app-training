<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This is **Next.js 16.2.7** — APIs, conventions, and file structure differ from older versions. Check changelog at https://nextjs.org/blog/next-16-2 before writing code. The bundled docs path `node_modules/next/dist/docs/` does NOT exist in this version.
<!-- END:nextjs-agent-rules -->

# Development Guidelines
- For typescript code style and best practices: @docs/typescript-guidelines.md

# Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint only (no typecheck or test scripts exist) |
| `npx prisma generate` | Generate Prisma client (required after schema changes; output goes to `generated/prisma/`) |
| `npx prisma db push` | Sync schema to DB (no migrations directory exists yet) |

Always run `npm run lint` after making changes.
- Node.js must be `>=20.19` (or `>=22.12` / `>=24`) for Prisma v7 CLI — managed via `fnm`.

# DB Setup (Docker)

| Command | Purpose |
|---------|---------|
| `docker\` commands in `docs/install_mariadb_with_docker.txt` | Run MariaDB 11.8 container on port 3306 |
| `docker run -d --name adminer --restart always -p 8080:8080 --network app-network adminer` | Adminer on port 8080, same network as MariaDB |

- Connect Adminer at `http://localhost:8080`: server=`mariadb`, user=`root`, pass=`Admin_1jj395qu`, db=`ecommerce`.
- `root` password and `DATABASE_URL` in `.env` must stay in sync. Current `.env.example` has `mysql://root:Admin_1jj395qu@localhost:3306/ecommerce`.

**SQL import encoding gotcha**: pipe a `.sql` file into `docker exec -i` **corrupts** Thai UTF-8 characters. Always use `docker cp <file>.sql mariadb:/` then `source /<file>.sql` inside the container.

# Architecture

- **Two independent route groups** in `src/app/`: `(auth)` and `(front)` — each defines its own `<html>` root with no shared parent layout.
- `(auth)` routes: `/login`, `/signup` — use Better Auth (`authClient` from `@/lib/auth-client`).
- `(front)` routes: `/` (home), `/about`, `/cart`, `/course`, `/product` — storefront shell with `<Navbar>`.
- API route `api/auth/[...all]` delegates to `better-auth` server handler.
- **No root `layout.tsx`** at `src/app/layout.tsx`.

# Key Stack Details

- **Auth**: `better-auth@1.6.11` with email/password only. Prisma MySQL adapter. Configured in `src/lib/auth.ts`.
- **Database**: MariaDB via `@prisma/adapter-mariadb`. Config in `prisma.config.ts` (Prisma v7 style — not in `schema.prisma`). Connection string: `DATABASE_URL` in `.env`.
- **Prisma v7**: Schema at `prisma/schema.prisma`. Client generated to `generated/prisma/` (gitignored). Models: `products`, `categories`, `customers`, `orders`, `order_items`, `product_images`, `User`, `Session`, `Account`, `Verification`.
- **CSS**: Tailwind CSS v4 via `@tailwindcss/postcss` (not the v3 PostCSS plugin). `tw-animate-css` for animations.
- **UI**: shadcn/ui "radix-luma" style, `remixicon` icon library, aliases in `components.json`.
- **State**: Zustand cart store persisted to localStorage key `skill-cart` (`src/lib/cart-store.ts`).
- **Fonts**: Prompt (Thai), Roboto (latin sans), Lora (headings) — loaded in `(auth)/layout.tsx` only.
- **Forms**: `react-hook-form` + `zod` validation.
- **Types**: `@types/react@19.2.17` pinned via `overrides` in `package.json`.

# Notable Patterns

- `/product` page (`src/app/(front)/product/page.tsx`) uses `connection()` from Next.js to opt into **dynamic rendering**.
- `next.config.ts` enables `cacheComponents: true` and configures `images.remotePatterns` for two external hosts.
- Docker uses **standalone output** (`output: 'standalone'` assumed), multi-stage build with `npx prisma generate` step.
