# notion-database-tracker

notion database tracker

[![Deploy this example](https://deno.com/deno-deploy-button.svg)](https://dash.deno.com/new?url=https://raw.githubusercontent.com/rhiokim/notion-database-tracker/main/mod.ts&env=NOTION_TOKEN,NOTION_DATABASE_ID)

## Prerequisites

* [Deno](https://deno.land/) above v1.0
* [Notion](https://www.notion.so/) Account

## How to use this

- Create an integration in Notion
  - Fill name, logo, private input
  - Copy token `secret_g1h0PcYgPAyGrxZlSCB2MHKSMej1IVmKMzS5RxbB6Wv`
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
