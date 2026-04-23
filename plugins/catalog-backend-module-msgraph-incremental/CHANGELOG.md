# @backstage/plugin-catalog-backend-module-msgraph-incremental

## 0.1.0

### Minor Changes

- Initial release of the incremental Microsoft Graph catalog module.

  Provides `catalogModuleMicrosoftGraphIncrementalEntityProvider`, which
  ingests users and groups from Microsoft Graph one page at a time using the
  catalog's incremental ingestion framework. Unlike
  `MicrosoftGraphOrgEntityProvider`, this module never holds the full dataset
  in memory and resumes from its cursor on pod restart.

  Requires `@backstage/plugin-catalog-backend-module-incremental-ingestion` to
  be installed in the backend.
