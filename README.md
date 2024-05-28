# Prisma

## Create SQLite Database

```sh
 npx prisma init --datasource-provider sqlite
```

✔ Your Prisma schema was created at prisma/schema.prisma
You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Add model to `schema.prisma`

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

## Push model (table) into prisma SQLite Database

```sh
npx prisma db push
```

SQLite database dev.db created at file:./dev.db
✔ Generated Prisma Client (v5.6.0) to ./node_modules/@prisma/client in 95ms

## View data in SQLite Database

```sh
npx prisma studio
```

Opens database: http://localhost:5555/

## Seed data into SQLite Database

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
    npx prisma db seed
```

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
