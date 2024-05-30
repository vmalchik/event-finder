# Prisma

- `main` branch contains code for production deployment into Vercel with Postgres storage
- `sqlite` branch contains code for local deployment

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

- Drop event table

```sh
dotenv -e .env.local npx prisma migrate reset
```

## Vercel Caching and Prisma

- Vercel caches dependencies until they change to enable faster builds but causes Prisma Client to become out of sync with database schema.
- Solution: Update package.json with [postinstall script](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/vercel-caching-issue)

## Usage of PrismaClient

- Use `db.ts` to create single instance of PrismaClient
- Use global PrismaClient to interact with database
