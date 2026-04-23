---
'@backstage/plugin-catalog-backend-module-msgraph-incremental': patch
---

New package: `@backstage/plugin-catalog-backend-module-msgraph-incremental`

Introduces a cursor-based incremental ingestion provider for Microsoft Graph that processes users and groups one page at a time. Unlike `MicrosoftGraphOrgEntityProvider`, this module never holds the full dataset in memory — each burst processes a single page of up to 999 items. The `@odata.nextLink` cursor is persisted so a pod restart resumes from the last completed page rather than starting over.
