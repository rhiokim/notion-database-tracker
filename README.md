# notion-database-tracker

Work in progress.

[![Deploy this example](https://deno.com/deno-deploy-button.svg)](https://dash.deno.com/new?url=https://raw.githubusercontent.com/rhiokim/notion-database-tracker/main/mod.ts&env=NOTION_TOKEN,NOTION_DATABASE_ID,POSTGRES_DATABASE_URL,DATABASE_TABLE)

## Prerequisites

- [Deno](https://deno.land/) above v1.0
- [Notion](https://www.notion.so/) Account
- [Supabase](https://supabase.io/)

### Deno Deploy

environment variable

```sh
NOTION_TOKEN=secret_g1hUavphAXyG1Ikff9xRDKvjRK7sImmv4SxyS6ScGiv
NOTION_DATABASE_ID=4d18218195a446c28a5866531f56ae13
POSTGRES_DATABASE_URL=postgres://postgres:XFE8GAC3_j4oB.2vN!AuKf8UW@db.pxiommvecxftwmhrhkzn.supabase.co:5432/postgres?sslmode=disable
DATABASE_TABLE=notion
```

## How to use this

- Create an integration in Notion
  - Fill name, logo, private input
  - Copy token `secret_g1hUavphAXyG1Ikff9xRDKvjRK7sImmv4SxyS6ScGiv`
  - Add notion integration account to notion database that you want to track
- Deploy to Deno v3 with token and database id

## How to work

- Fetch Notion database
  - Store snapshot into localStorage with latest changes
- Change state of your notion database menually
  - Call notion-database-tracker endpoint `notion-database-tracker.deno.dev`
- Check diff snapshot with latest changes
  - Make response added/updated/deleted diff(snapshot, latestChanges)

## How to run in local

```sh
git clone git@github.com:rhiokim/notion-database-tracker.git
cd notion-database-tracker

NOTION_TOKEN=<YOUR_NOTION_TOKEN> NOTION_DATABASE_ID=<NOTION_DATABASE_ID> \
deno run --allow-net \
--allow-env \
--location http://localhost \
mod.ts
```

## References

- Postgres - https://deno.com/deploy/docs/tutorial-postgres
