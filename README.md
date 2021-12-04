# notion-database-tracker

notion database tracker

[![Deploy this example](https://deno.com/deno-deploy-button.svg)](https://dash.deno.com/new?url=https://raw.githubusercontent.com/rhiokim/notion-database-tracker/main/mod.ts&env=NOTION_TOKEN,NOTION_DATABASE_ID)

## How to use this

- Create an integration in Notion
  - Fill name, logo, private input
  - Copy token `secret_g1h0PcYgPAyGrxZlSCB2MHKSMej1IVmKMzS5RxbB6Wv`
- Deploy to Deno v3

## How to work

- Fetch Notion Database
  - Store snapshot into localStorage with lastest changes
- Change state of your notion database menually
  - Call notion-database-tracker endpoint `notion-database-tracker.deno.dev`
- Check diff snapshot with lastest changes
  - Make response added/updated/deleted diff(snapshot, lastestChanges)

