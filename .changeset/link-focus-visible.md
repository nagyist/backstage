---
'@backstage/ui': patch
---

Fix `Card href=...` not showing a focus indicator on keyboard navigation. `Link` now composes `useFocusRing` and emits `data-focus-visible`, so the Card's existing focus-ring CSS matches when the trigger is focused.

*Affected components*: Card, Link
