# Shop Spike

Proof-of-concept monorepo voor onze nieuwe webshop, gebouwd met:

- Frontend: Next.js (TypeScript, Tailwind, App Router)
- Backend: ASP.NET Core 8 Minimal API (komt later)
- Infra: Docker / Nginx (optioneel, later)


Projectstructuur
----------------

shop-spike/
├─ apps/
│  ├─ web/    → Next.js storefront
│  └─ api/    → .NET backend (nog niet toegevoegd)
├─ infra/     → infra files (docker-compose, nginx, etc.)
├─ .gitignore
├─ env.example
└─ README.md


Frontend starten
----------------

cd apps/web
pnpm install
cp ../../env.example .env.local
pnpm dev

Frontend draait dan op http://localhost:3000


API (komt later)
----------------

De backend komt in apps/api/ (ASP.NET Core 8).
Endpoints die we verwachten:
- GET /products
- GET /products/{slug}
- GET /products/{slug}/related
- GET /categories
- POST /cart/price


Omgeving
--------

- .env.local → lokale secrets (nooit committen)
- env.example → voorbeeldbestand met variabelen (wel committen)


Development regels
------------------

- Code style: Prettier (.prettierrc.json)
- Linting: ESLint (.eslintrc.json)
- Styling: TailwindCSS
- Types in src/lib/types.ts
- API helpers in src/lib/api.ts


TODO
----

- [ ] Mock data koppelen in frontend
- [ ] ASP.NET Core API toevoegen in apps/api
- [ ] Docker-compose setup in infra/ voor lokale stack