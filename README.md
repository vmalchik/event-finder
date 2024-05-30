# Prisma

## Vercel Storage: Postgres

Create [Vercel Storage](https://www.prisma.io/docs/orm/more/development-environment/environment-variables/managing-env-files-and-setting-variables#manage-env-files-manually) with Postgres

- Storage pulls records from .env.local
- Prisma uses .env
  - Use [dotenv](https://www.npmjs.com/package/dotenv-cli) to work with .env.local ([documentation](https://www.prisma.io/docs/orm/more/development-environment/environment-variables/managing-env-files-and-setting-variables#manage-env-files-manually))
  - Add Postgres secrets into Vercel linked project Settings > Environment Variables

## Add model

```prisma
model EventoEvent {
  id            Int      @id @default(autoincrement())
  name          String
  slug          String   @unique
  city          String
  location      String
  date          DateTime
  organizerName String
  imageUrl      String
  description   String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## Push model (table) into database

```sh
dotenv -e .env.local -- npx prisma db push
```

## View data in database

```sh
dotenv -e .env.local -- npx prisma studio
```

Opens database: http://localhost:5555/

## Seed data into database

- Create `seed.ts` file with data to seed along with `main()` function to seed it
- Preform following prerequisite steps to run prisma seed script

  - Install `ts-node` package

    ```sh
    npm i ts-node
    ```

  - Update `package.json`

    ```json
    "prisma": {
        "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
    },
    ```

- Seed database

```sh
dotenv -e .env.local -- npx prisma db seed
```

## Vercel Caching and Prisma

- Vercel caches dependencies until they change to enable faster builds but causes Prisma Client to become out of sync with database schema.
- Solution: Update package.json with [postinstall script](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/vercel-caching-issue)

## Usage of PrismaClient

- Use `db.ts` to create single instance of PrismaClient
- Use global PrismaClient to interact with database

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
