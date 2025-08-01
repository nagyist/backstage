---
id: builtin-actions
title: Builtin actions
description: Documentation describing the built-in template actions.
---

The scaffolder comes with several built-in actions for fetching content,
registering in the catalog and of course actions for creating and publishing a
git repository.

## Action Modules

There are several action modules that are available to be added:

- [Azure DevOps](https://github.com/backstage/backstage/tree/master/plugins/scaffolder-backend-module-azure): `@backstage/plugin-scaffolder-backend-module-azure`
- [Bitbucket Cloud](https://github.com/backstage/backstage/tree/master/plugins/scaffolder-backend-module-bitbucket-cloud): `@backstage/plugin-scaffolder-backend-module-bitbucket-cloud`
- [Bitbucket Server](https://github.com/backstage/backstage/tree/master/plugins/scaffolder-backend-module-bitbucket-server): `@backstage/plugin-scaffolder-backend-module-bitbucket-server`
- [Gerrit](https://github.com/backstage/backstage/tree/master/plugins/scaffolder-backend-module-gerrit): `@backstage/plugin-scaffolder-backend-module-gerrit`
- [Gitea](https://github.com/backstage/backstage/tree/master/plugins/scaffolder-backend-module-gitea): `@backstage/plugin-scaffolder-backend-module-gitea`
- [GitHub](https://github.com/backstage/backstage/tree/master/plugins/scaffolder-backend-module-github): `@backstage/plugin-scaffolder-backend-module-github`
- [GitLab](https://github.com/backstage/backstage/tree/master/plugins/scaffolder-backend-module-gitlab): `@backstage/plugin-scaffolder-backend-module-gitlab`
- [Rails](https://github.com/backstage/backstage/tree/master/plugins/scaffolder-backend-module-rails): `@backstage/plugin-scaffolder-backend-module-rails`
- [Yeoman](https://github.com/backstage/backstage/tree/master/plugins/scaffolder-backend-module-yeoman): `@backstage/plugin-scaffolder-backend-module-yeoman`
- [Sentry](https://github.com/backstage/backstage/tree/master/plugins/scaffolder-backend-module-sentry): `@backstage/plugin-scaffolder-backend-module-sentry`
- [Cookiecutter](https://github.com/backstage/backstage/tree/master/plugins/scaffolder-backend-module-cookiecutter): `@backstage/plugin-scaffolder-backend-module-cookiecutter`

## Installing Action Modules

Here's how to add an action module, first you need to run this command:

```sh title="From your Backstage root directory"
yarn --cwd packages/backend add @backstage/plugin-scaffolder-backend-module-github
```

Then you need to add it to your backend, this is a simplified new backend system for example purposes:

```ts title="/packages/backend/src/index.ts"
import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend'));

backend.add(import('@backstage/plugin-catalog-backend'));
backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);

// scaffolder plugin
backend.add(import('@backstage/plugin-scaffolder-backend'));
/* highlight-add-next-line */
backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));

backend.start();
```

## Listing Actions

A list of all registered actions can be found under `/create/actions`. For local
development you should be able to reach them at
`http://localhost:3000/create/actions`.

## Migrating from `fetch:cookiecutter` to `fetch:template`

The `fetch:template` action is a new action with a similar API to
`fetch:cookiecutter` but no dependency on `cookiecutter`. There are two options
for migrating templates that use `fetch:cookiecutter` to use `fetch:template`:

### Using `cookiecutterCompat` mode

The new `fetch:template` action has a `cookiecutterCompat` flag which should
allow most templates built for `fetch:cookiecutter` to work without any changes.

1. Update action name in `template.yaml`. The name should be changed from
   `fetch:cookiecutter` to `fetch:template`.
2. Set `cookiecutterCompat` to `true` in the `fetch:template` step input in
   `template.yaml`.

```yaml title="template.yaml"
steps:
   - id: fetchBase
     name: Fetch Base
     # highlight-remove-next-line
     action: fetch:cookiecutter
     # highlight-add-next-line
     action: fetch:template
     input:
        url: ./skeleton
        # highlight-add-next-line
        cookiecutterCompat: true
        values:
```

### Manual migration

If you prefer, you can manually migrate your templates to avoid the need for
enabling cookiecutter compatibility mode, which will result in slightly less
verbose template variables expressions.

1. Update action name in `template.yaml`. The name should be changed from
   `fetch:cookiecutter` to `fetch:template`.
2. Update variable syntax in file names and content. `fetch:cookiecutter`
   expects variables to be enclosed in `{{` `}}` and prefixed with
   `cookiecutter.`, while `fetch:template` expects variables to be enclosed in
   `${{` `}}` and prefixed with `values.`. For example, a reference to variable
   `myInputVariable` would need to be migrated from
   `{{ cookiecutter.myInputVariable }}` to `${{ values.myInputVariable }}`.
3. Replace uses of `jsonify` with `dump`. The
   [`jsonify` filter](https://cookiecutter.readthedocs.io/en/latest/advanced/template_extensions.html#jsonify-extension)
   is built in to `cookiecutter`, and is not available by default when using
   `fetch:template`. The
   [`dump` filter](https://mozilla.github.io/nunjucks/templating.html#dump) is
   the equivalent filter in nunjucks, so an expression like
   `{{ cookiecutter.myAwesomeList | jsonify }}` should be migrated to
   `${{ values.myAwesomeList | dump }}`.
