# @backstage/plugin-scaffolder-node

## 0.11.0-next.0

### Minor Changes

- c08cbc4: Move Scaffolder API to OpenAPI

### Patch Changes

- 812485c: Add step info to scaffolder action context to access the step id and name.
- Updated dependencies
  - @backstage/plugin-scaffolder-common@1.7.0-next.0
  - @backstage/backend-plugin-api@1.4.2-next.0
  - @backstage/catalog-model@1.7.5
  - @backstage/errors@1.2.7
  - @backstage/integration@1.17.1
  - @backstage/types@1.2.1
  - @backstage/plugin-permission-common@0.9.1

## 0.10.0

### Minor Changes

- c1ce316: BREAKING `/alpha`: Converted `scaffolder.task.read` and `scaffolder.task.cancel` into Resource Permissions.

  BREAKING `/alpha`: Added a new scaffolder rule `isTaskOwner` for `scaffolder.task.read` and `scaffolder.task.cancel` to allow for conditional permission policies such as restricting access to tasks and task events based on task creators.

  BREAKING `/alpha`: Retrying a task now requires both `scaffolder.task.read` and `scaffolder.task.create` permissions, replacing the previous requirement of `scaffolder.task.read` and `scaffolder.task.cancel`.

### Patch Changes

- dbde180: An internal refactor which adds additional types to experimental checkpoints
- Updated dependencies
  - @backstage/plugin-permission-common@0.9.1
  - @backstage/catalog-model@1.7.5
  - @backstage/integration@1.17.1
  - @backstage/plugin-scaffolder-common@1.6.0
  - @backstage/backend-plugin-api@1.4.1

## 0.10.0-next.2

### Minor Changes

- c1ce316: BREAKING `/alpha`: Converted `scaffolder.task.read` and `scaffolder.task.cancel` into Resource Permissions.

  BREAKING `/alpha`: Added a new scaffolder rule `isTaskOwner` for `scaffolder.task.read` and `scaffolder.task.cancel` to allow for conditional permission policies such as restricting access to tasks and task events based on task creators.

  BREAKING `/alpha`: Retrying a task now requires both `scaffolder.task.read` and `scaffolder.task.create` permissions, replacing the previous requirement of `scaffolder.task.read` and `scaffolder.task.cancel`.

### Patch Changes

- Updated dependencies
  - @backstage/plugin-scaffolder-common@1.6.0-next.1

## 0.9.1-next.1

### Patch Changes

- Updated dependencies
  - @backstage/catalog-model@1.7.5-next.0
  - @backstage/integration@1.17.1-next.1
  - @backstage/backend-plugin-api@1.4.1-next.0
  - @backstage/plugin-scaffolder-common@1.5.12-next.0

## 0.9.1-next.0

### Patch Changes

- dbde180: An internal refactor which adds additional types to experimental checkpoints
- Updated dependencies
  - @backstage/integration@1.17.1-next.0
  - @backstage/backend-plugin-api@1.4.0
  - @backstage/catalog-model@1.7.4
  - @backstage/errors@1.2.7
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.11

## 0.9.0

### Minor Changes

- 5863b04: **BREAKING CHANGES**

  The legacy methods to define `createTemplateActions` have been replaced with the new native `zod` approaches for defining input and output schemas.

  You can migrate actions that look like the following with the below examples:

  ```ts
  // really old legacy json schema
  createTemplateAction<{ repoUrl: string }, { repoOutput: string }>({
    id: 'test',
    schema: {
      input: {
        type: 'object'
        required: ['repoUrl']
        properties: {
          repoUrl: {
            type: 'string',
            description: 'repository url description'
          }
        }
      }
    }
  });

  // old zod method
  createTemplateAction({
    id: 'test'
    schema: {
      input: {
        repoUrl: z.string({ description: 'repository url description' })
      }
    }
  })

  // new method:
  createTemplateAction({
    id: 'test',
    schema: {
      input: {
        repoUrl: z => z.string({ description: 'repository url description' })
      }
    }
  })

  // or for more complex zod types like unions
  createTemplateAction({
    id: 'test',
    schema: {
      input: z => z.object({
        repoUrl: z.string({ description: 'repository url description' })
      })
    }
  })
  ```

  This breaking change also means that `logStream` has been removed entirely from `ActionsContext`, and that the `logger` is now just a `LoggerService` implementation instead. There is no replacement for the `logStream`, if you wish to still keep using a `logStream` we recommend that you create your own stream that writes to `ctx.logger` instead.

### Patch Changes

- e89d7b6: Use `LoggerService` instead of `Logger`. This is a non-breaking change, as the `LoggerService` is a subset of the `Logger` interface.
- 9c8ff0c: Update pull request creation filter to include .gitignore files in the created pull request
- Updated dependencies
  - @backstage/backend-plugin-api@1.4.0
  - @backstage/catalog-model@1.7.4
  - @backstage/errors@1.2.7
  - @backstage/integration@1.17.0
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.11

## 0.9.0-next.2

### Minor Changes

- 5863b04: **BREAKING CHANGES**

  The legacy methods to define `createTemplateActions` have been replaced with the new native `zod` approaches for defining input and output schemas.

  You can migrate actions that look like the following with the below examples:

  ```ts
  // really old legacy json schema
  createTemplateAction<{ repoUrl: string }, { repoOutput: string }>({
    id: 'test',
    schema: {
      input: {
        type: 'object'
        required: ['repoUrl']
        properties: {
          repoUrl: {
            type: 'string',
            description: 'repository url description'
          }
        }
      }
    }
  });

  // old zod method
  createTemplateAction({
    id: 'test'
    schema: {
      input: {
        repoUrl: z.string({ description: 'repository url description' })
      }
    }
  })

  // new method:
  createTemplateAction({
    id: 'test',
    schema: {
      input: {
        repoUrl: z => z.string({ description: 'repository url description' })
      }
    }
  })

  // or for more complex zod types like unions
  createTemplateAction({
    id: 'test',
    schema: {
      input: z => z.object({
        repoUrl: z.string({ description: 'repository url description' })
      })
    }
  })
  ```

  This breaking change also means that `logStream` has been removed entirely from `ActionsContext`, and that the `logger` is now just a `LoggerService` implementation instead. There is no replacement for the `logStream`, if you wish to still keep using a `logStream` we recommend that you create your own stream that writes to `ctx.logger` instead.

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@1.4.0-next.1
  - @backstage/catalog-model@1.7.4
  - @backstage/errors@1.2.7
  - @backstage/integration@1.17.0
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.11

## 0.8.3-next.1

### Patch Changes

- e89d7b6: Use `LoggerService` instead of `Logger`. This is a non-breaking change, as the `LoggerService` is a subset of the `Logger` interface.
- Updated dependencies
  - @backstage/backend-plugin-api@1.4.0-next.1
  - @backstage/catalog-model@1.7.4
  - @backstage/errors@1.2.7
  - @backstage/integration@1.17.0
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.11

## 0.8.3-next.0

### Patch Changes

- 9c8ff0c: Update pull request creation filter to include .gitignore files in the created pull request
- Updated dependencies
  - @backstage/backend-plugin-api@1.4.0-next.0

## 0.8.2

### Patch Changes

- 16e2e9c: trim leading and trailing slashes from parseRepoUrl query parameters
- 72d019d: Removed various typos
- ec42f8e: Generating new tokens on each Scaffolder Task Retry
- Updated dependencies
  - @backstage/integration@1.17.0
  - @backstage/catalog-model@1.7.4
  - @backstage/backend-plugin-api@1.3.1
  - @backstage/errors@1.2.7
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.11

## 0.8.2-next.3

### Patch Changes

- 16e2e9c: trim leading and trailing slashes from parseRepoUrl query parameters
- ec42f8e: Generating new tokens on each Scaffolder Task Retry
- Updated dependencies
  - @backstage/integration@1.17.0-next.3
  - @backstage/backend-plugin-api@1.3.1-next.2
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.11-next.0

## 0.8.2-next.2

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.17.0-next.2
  - @backstage/backend-plugin-api@1.3.1-next.1
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.11-next.0

## 0.8.2-next.1

### Patch Changes

- 72d019d: Removed various typos
- Updated dependencies
  - @backstage/backend-plugin-api@1.3.1-next.1
  - @backstage/integration@1.16.4-next.1
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.11-next.0

## 0.8.2-next.0

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.16.4-next.0
  - @backstage/backend-plugin-api@1.3.1-next.0
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.10

## 0.8.1

### Patch Changes

- 497d47a: Document the internal built-in filters, and ensure that the types are validated when using `createTemplateFilter` and `createTemplateGlobalFunction` from the `zod` schema.
- Updated dependencies
  - @backstage/backend-plugin-api@1.3.0
  - @backstage/integration@1.16.3
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.10

## 0.8.1-next.1

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.16.3-next.0
  - @backstage/backend-plugin-api@1.2.1
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.10

## 0.8.1-next.0

### Patch Changes

- 497d47a: Document the internal built-in filters, and ensure that the types are validated when using `createTemplateFilter` and `createTemplateGlobalFunction` from the `zod` schema.
- Updated dependencies
  - @backstage/backend-plugin-api@1.2.1
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/integration@1.16.2
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.10

## 0.8.0

### Minor Changes

- 1a58846: **DEPRECATION**: We've deprecated the old way of defining actions using `createTemplateAction` with raw `JSONSchema` and type parameters, as well as using `zod` through an import. You can now use the new format to define `createTemplateActions` with `zod` provided by the framework. This change also removes support for `logStream` in the `context` as well as moving the `logger` to an instance of `LoggerService`.

  Before:

  ```ts
  createTemplateAction<{ repoUrl: string }, { test: string }>({
    id: 'test',
    schema: {
      input: {
        type: 'object',
        required: ['repoUrl'],
        properties: {
          repoUrl: { type: 'string' },
        },
      },
      output: {
        type: 'object',
        required: ['test'],
        properties: {
          test: { type: 'string' },
        },
      },
    },
    handler: async ctx => {
      ctx.logStream.write('blob');
    },
  });

  // or

  createTemplateAction({
    id: 'test',
    schema: {
      input: z.object({
        repoUrl: z.string(),
      }),
      output: z.object({
        test: z.string(),
      }),
    },
    handler: async ctx => {
      ctx.logStream.write('something');
    },
  });
  ```

  After:

  ```ts
  createTemplateAction({
    id: 'test',
    schema: {
      input: {
        repoUrl: d => d.string(),
      },
      output: {
        test: d => d.string(),
      },
    },
    handler: async ctx => {
      // you can just use ctx.logger.log('...'), or if you really need a log stream you can do this:
      const logStream = new PassThrough();
      logStream.on('data', chunk => {
        ctx.logger.info(chunk.toString());
      });
    },
  });
  ```

### Patch Changes

- 09cf038: Got rid of most `@backstage/backend-common` usages
- 4f8b5b6: Allow signing git commits using configured private PGP key in scaffolder
- Updated dependencies
  - @backstage/integration@1.16.2
  - @backstage/plugin-scaffolder-common@1.5.10
  - @backstage/backend-plugin-api@1.2.1
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/types@1.2.1

## 0.8.0-next.2

### Minor Changes

- 1a58846: **DEPRECATION**: We've deprecated the old way of defining actions using `createTemplateAction` with raw `JSONSchema` and type parameters, as well as using `zod` through an import. You can now use the new format to define `createTemplateActions` with `zod` provided by the framework. This change also removes support for `logStream` in the `context` as well as moving the `logger` to an instance of `LoggerService`.

  Before:

  ```ts
  createTemplateAction<{ repoUrl: string }, { test: string }>({
    id: 'test',
    schema: {
      input: {
        type: 'object',
        required: ['repoUrl'],
        properties: {
          repoUrl: { type: 'string' },
        },
      },
      output: {
        type: 'object',
        required: ['test'],
        properties: {
          test: { type: 'string' },
        },
      },
    },
    handler: async ctx => {
      ctx.logStream.write('blob');
    },
  });

  // or

  createTemplateAction({
    id: 'test',
    schema: {
      input: z.object({
        repoUrl: z.string(),
      }),
      output: z.object({
        test: z.string(),
      }),
    },
    handler: async ctx => {
      ctx.logStream.write('something');
    },
  });
  ```

  After:

  ```ts
  createTemplateAction({
    id: 'test',
    schema: {
      input: {
        repoUrl: d => d.string(),
      },
      output: {
        test: d => d.string(),
      },
    },
    handler: async ctx => {
      // you can just use ctx.logger.log('...'), or if you really need a log stream you can do this:
      const logStream = new PassThrough();
      logStream.on('data', chunk => {
        ctx.logger.info(chunk.toString());
      });
    },
  });
  ```

### Patch Changes

- 4f8b5b6: Allow signing git commits using configured private PGP key in scaffolder
- Updated dependencies
  - @backstage/integration@1.16.2-next.0
  - @backstage/backend-plugin-api@1.2.1-next.1
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.10-next.0

## 0.7.1-next.1

### Patch Changes

- 09cf038: Got rid of most `@backstage/backend-common` usages
- Updated dependencies
  - @backstage/plugin-scaffolder-common@1.5.10-next.0
  - @backstage/backend-plugin-api@1.2.1-next.1
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/integration@1.16.1
  - @backstage/types@1.2.1

## 0.7.1-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@1.2.1-next.0

## 0.7.0

### Minor Changes

- dc8dd4b: Added new `createTemplateFilter`, `createTemplateGlobalFunction`, `createTemplateGlobalValue` for template extensions.
- a4aa244: This change introduces an optional `taskId` property to `TaskContext`.

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@1.2.0
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/integration@1.16.1
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.9

## 0.7.0-next.2

### Minor Changes

- dc8dd4b: Added new `createTemplateFilter`, `createTemplateGlobalFunction`, `createTemplateGlobalValue` for template extensions.

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@1.2.0-next.2
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/integration@1.16.1
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.9

## 0.7.0-next.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@1.2.0-next.1
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/integration@1.16.1
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.9

## 0.7.0-next.0

### Minor Changes

- a4aa244: This change introduces an optional `taskId` property to `TaskContext`.

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@1.2.0-next.0
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/integration@1.16.1
  - @backstage/types@1.2.1
  - @backstage/plugin-scaffolder-common@1.5.9

## 0.6.3

### Patch Changes

- 5d9e5c8: Added the ability to use `${{ context.task.id }}` in nunjucks templating, as well as `ctx.task.id` in actions to get the current task ID.
- 7dd0013: Deprecate the `logStream` option in `executeShellCommand`, replacing it with a logger instance.
- Updated dependencies
  - @backstage/types@1.2.1
  - @backstage/integration@1.16.1
  - @backstage/backend-plugin-api@1.1.1
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/plugin-scaffolder-common@1.5.9

## 0.6.3-next.1

### Patch Changes

- Updated dependencies
  - @backstage/types@1.2.1-next.0
  - @backstage/backend-plugin-api@1.1.1-next.1
  - @backstage/catalog-model@1.7.3-next.0
  - @backstage/errors@1.2.7-next.0
  - @backstage/plugin-scaffolder-common@1.5.9-next.0
  - @backstage/integration@1.16.1-next.0

## 0.6.3-next.0

### Patch Changes

- 5d9e5c8: Added the ability to use `${{ context.task.id }}` in nunjucks templating, as well as `ctx.task.id` in actions to get the current task ID.
- 7dd0013: Deprecate the `logStream` option in `executeShellCommand`, replacing it with a logger instance.
- Updated dependencies
  - @backstage/backend-plugin-api@1.1.1-next.0
  - @backstage/catalog-model@1.7.2
  - @backstage/errors@1.2.6
  - @backstage/integration@1.16.0
  - @backstage/types@1.2.0
  - @backstage/plugin-scaffolder-common@1.5.8

## 0.6.2

### Patch Changes

- c4ffd13: Added the autocomplete feature to GitlabRepoUrlPicker
- 1a23421: Make sure that isomorphic git push commands are not proxied.
- Updated dependencies
  - @backstage/integration@1.16.0
  - @backstage/plugin-scaffolder-common@1.5.8
  - @backstage/backend-plugin-api@1.1.0
  - @backstage/errors@1.2.6
  - @backstage/catalog-model@1.7.2
  - @backstage/types@1.2.0

## 0.6.2-next.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@1.1.0-next.2
  - @backstage/errors@1.2.6-next.0
  - @backstage/catalog-model@1.7.2-next.0
  - @backstage/integration@1.16.0-next.1
  - @backstage/types@1.2.0
  - @backstage/plugin-scaffolder-common@1.5.8-next.1

## 0.6.2-next.1

### Patch Changes

- 1a23421: Make sure that isomorphic git push commands are not proxied.
- Updated dependencies
  - @backstage/backend-plugin-api@1.1.0-next.1
  - @backstage/catalog-model@1.7.1
  - @backstage/errors@1.2.5
  - @backstage/integration@1.16.0-next.0
  - @backstage/types@1.2.0
  - @backstage/plugin-scaffolder-common@1.5.8-next.0

## 0.6.1-next.0

### Patch Changes

- c4ffd13: Added the autocomplete feature to GitlabRepoUrlPicker
- Updated dependencies
  - @backstage/integration@1.16.0-next.0
  - @backstage/plugin-scaffolder-common@1.5.8-next.0
  - @backstage/backend-plugin-api@1.0.3-next.0
  - @backstage/catalog-model@1.7.1
  - @backstage/errors@1.2.5
  - @backstage/types@1.2.0

## 0.6.0

### Minor Changes

- e61d5ef: BREAKING EXPERIMENTAL: The `checkpoint` method now takes an object instead of previous arguments.

  ```ts
  await ctx.checkpoint({ key: 'repo.create', fn: () => ockokit.repo.create({...})})
  ```

  You can also now return `void` from the checkpoint if the method returns `void` inside the `checkpoint` handler.

### Patch Changes

- Updated dependencies
  - @backstage/types@1.2.0
  - @backstage/plugin-scaffolder-common@1.5.7
  - @backstage/backend-plugin-api@1.0.2
  - @backstage/catalog-model@1.7.1
  - @backstage/errors@1.2.5
  - @backstage/integration@1.15.2

## 0.5.1-next.3

### Patch Changes

- Updated dependencies
  - @backstage/plugin-scaffolder-common@1.5.7-next.0
  - @backstage/backend-plugin-api@1.0.2-next.2
  - @backstage/catalog-model@1.7.0
  - @backstage/errors@1.2.4
  - @backstage/integration@1.15.1
  - @backstage/types@1.1.1

## 0.5.1-next.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@1.0.2-next.2
  - @backstage/catalog-model@1.7.0
  - @backstage/errors@1.2.4
  - @backstage/integration@1.15.1
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.6

## 0.5.1-next.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@1.0.2-next.1
  - @backstage/catalog-model@1.7.0
  - @backstage/errors@1.2.4
  - @backstage/integration@1.15.1
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.6

## 0.5.1-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@1.0.2-next.0
  - @backstage/catalog-model@1.7.0
  - @backstage/errors@1.2.4
  - @backstage/integration@1.15.1
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.6

## 0.5.0

### Minor Changes

- 3ec4e6d: Added pagination support for listing of tasks and the ability to filter on several users and task statuses.

### Patch Changes

- 094eaa3: Remove references to in-repo backend-common
- 11e0752: Make it possible to manually retry the scaffolder template from the step it failed
- d7a736c: Use `branch` function instead of `checkout` function when creating branch
- Updated dependencies
  - @backstage/integration@1.15.1
  - @backstage/backend-plugin-api@1.0.1
  - @backstage/catalog-model@1.7.0
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.6

## 0.5.0-next.2

### Patch Changes

- d7a736c: Use `branch` function instead of `checkout` function when creating branch
- Updated dependencies
  - @backstage/integration@1.15.1-next.1
  - @backstage/backend-plugin-api@1.0.1-next.1
  - @backstage/catalog-model@1.7.0
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.6

## 0.5.0-next.1

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.15.1-next.0
  - @backstage/backend-plugin-api@1.0.1-next.0
  - @backstage/catalog-model@1.7.0
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.6

## 0.5.0-next.0

### Minor Changes

- 3ec4e6d: Added pagination support for listing of tasks and the ability to filter on several users and task statuses.

### Patch Changes

- 094eaa3: Remove references to in-repo backend-common
- 11e0752: Make it possible to manually retry the scaffolder template from the step it failed
- Updated dependencies
  - @backstage/backend-plugin-api@1.0.1-next.0
  - @backstage/catalog-model@1.7.0
  - @backstage/errors@1.2.4
  - @backstage/integration@1.15.0
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.6

## 0.4.11

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.25.0
  - @backstage/backend-plugin-api@1.0.0
  - @backstage/catalog-model@1.7.0
  - @backstage/integration@1.15.0
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.6

## 0.4.11-next.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.25.0-next.2
  - @backstage/backend-plugin-api@1.0.0-next.2
  - @backstage/integration@1.15.0-next.0
  - @backstage/catalog-model@1.6.0
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.5

## 0.4.11-next.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.25.0-next.1
  - @backstage/backend-plugin-api@0.9.0-next.1
  - @backstage/catalog-model@1.6.0
  - @backstage/errors@1.2.4
  - @backstage/integration@1.14.0
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.5

## 0.4.11-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.9.0-next.0
  - @backstage/backend-common@0.25.0-next.0
  - @backstage/catalog-model@1.6.0
  - @backstage/errors@1.2.4
  - @backstage/integration@1.14.0
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.5

## 0.4.9

### Patch Changes

- 389f5a4: Update deprecated url-reader-related imports.
- c544f81: Add support for status filtering in scaffolder tasks endpoint
- Updated dependencies
  - @backstage/backend-plugin-api@0.8.0
  - @backstage/backend-common@0.24.0
  - @backstage/integration@1.14.0
  - @backstage/catalog-model@1.6.0
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.5

## 0.4.9-next.3

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.8.0-next.3
  - @backstage/backend-common@0.23.4-next.3
  - @backstage/catalog-model@1.6.0-next.0
  - @backstage/errors@1.2.4
  - @backstage/integration@1.14.0-next.0
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.5-next.2

## 0.4.9-next.2

### Patch Changes

- c544f81: Add support for status filtering in scaffolder tasks endpoint
- Updated dependencies
  - @backstage/backend-plugin-api@0.8.0-next.2
  - @backstage/backend-common@0.23.4-next.2
  - @backstage/plugin-scaffolder-common@1.5.5-next.1
  - @backstage/integration@1.14.0-next.0
  - @backstage/catalog-model@1.5.0
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1

## 0.4.9-next.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.7.1-next.1
  - @backstage/backend-common@0.23.4-next.1
  - @backstage/integration@1.14.0-next.0
  - @backstage/plugin-scaffolder-common@1.5.5-next.0
  - @backstage/catalog-model@1.5.0
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1

## 0.4.9-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.23.4-next.0
  - @backstage/integration@1.14.0-next.0
  - @backstage/backend-plugin-api@0.7.1-next.0
  - @backstage/catalog-model@1.5.0
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.4

## 0.4.8

### Patch Changes

- 661b354: Fixed a bug where the `RepoUrlPicker` would still require the `owner` field for `azure`
- b5deed0: Add support for `autocomplete` extension point to provide additional `autocomplete` handlers
- 0b52438: Serialization of the scaffolder workspace into GCP bucket
- Updated dependencies
  - @backstage/backend-plugin-api@0.7.0
  - @backstage/backend-common@0.23.3
  - @backstage/integration@1.13.0
  - @backstage/plugin-scaffolder-common@1.5.4
  - @backstage/catalog-model@1.5.0
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1

## 0.4.8-next.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.23.3-next.1
  - @backstage/backend-plugin-api@0.6.22-next.1
  - @backstage/catalog-model@1.5.0
  - @backstage/errors@1.2.4
  - @backstage/integration@1.13.0-next.0
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.3

## 0.4.7-next.0

### Patch Changes

- 661b354: Fixed a bug where the `RepoUrlPicker` would still require the `owner` field for `azure`
- b5deed0: Add support for `autocomplete` extension point to provide additional `autocomplete` handlers
- 0b52438: Serialization of the scaffolder workspace into GCP bucket
- Updated dependencies
  - @backstage/backend-plugin-api@0.6.21-next.0
  - @backstage/backend-common@0.23.2-next.0
  - @backstage/integration@1.13.0-next.0
  - @backstage/catalog-model@1.5.0
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.3

## 0.4.5

### Patch Changes

- d44a20a: Added additional plugin metadata to `package.json`.
- Updated dependencies
  - @backstage/backend-common@0.23.0
  - @backstage/backend-plugin-api@0.6.19
  - @backstage/integration@1.12.0
  - @backstage/plugin-scaffolder-common@1.5.3
  - @backstage/catalog-model@1.5.0
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1

## 0.4.5-next.3

### Patch Changes

- d44a20a: Added additional plugin metadata to `package.json`.
- Updated dependencies
  - @backstage/backend-plugin-api@0.6.19-next.3
  - @backstage/integration@1.12.0-next.1
  - @backstage/plugin-scaffolder-common@1.5.3-next.1
  - @backstage/backend-common@0.23.0-next.3
  - @backstage/catalog-model@1.5.0
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1

## 0.4.5-next.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.6.19-next.2
  - @backstage/backend-common@0.23.0-next.2
  - @backstage/integration@1.12.0-next.0
  - @backstage/catalog-model@1.5.0
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.3-next.0

## 0.4.5-next.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.6.19-next.1
  - @backstage/backend-common@0.23.0-next.1
  - @backstage/plugin-scaffolder-common@1.5.3-next.0

## 0.4.5-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.22.1-next.0
  - @backstage/backend-plugin-api@0.6.19-next.0
  - @backstage/catalog-model@1.5.0
  - @backstage/errors@1.2.4
  - @backstage/integration@1.11.0
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.2

## 0.4.4

### Patch Changes

- d229dc4: Move path utilities from `backend-common` to the `backend-plugin-api` package.
- e4b50ab: Scaffolder workspace serialization
- f633efa: To remove the dependency on the soon-to-be-deprecated `backend-common` package, this package now maintains its own isomorphic Git class implementation.
- Updated dependencies
  - @backstage/plugin-scaffolder-common@1.5.2
  - @backstage/catalog-model@1.5.0
  - @backstage/backend-common@0.22.0
  - @backstage/backend-plugin-api@0.6.18
  - @backstage/integration@1.11.0

## 0.4.4-next.2

### Patch Changes

- e4b50ab: Scaffolder workspace serialization
- Updated dependencies
  - @backstage/backend-common@0.22.0-next.2
  - @backstage/integration@1.11.0-next.0

## 0.4.4-next.1

### Patch Changes

- Updated dependencies
  - @backstage/plugin-scaffolder-common@1.5.2-next.1
  - @backstage/backend-common@0.22.0-next.1
  - @backstage/backend-plugin-api@0.6.18-next.1

## 0.4.4-next.0

### Patch Changes

- Updated dependencies
  - @backstage/catalog-model@1.5.0-next.0
  - @backstage/backend-common@0.21.8-next.0
  - @backstage/backend-plugin-api@0.6.18-next.0
  - @backstage/plugin-scaffolder-common@1.5.2-next.0
  - @backstage/errors@1.2.4
  - @backstage/integration@1.10.0
  - @backstage/types@1.1.1

## 0.4.3

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.21.7
  - @backstage/backend-plugin-api@0.6.17
  - @backstage/integration@1.10.0
  - @backstage/catalog-model@1.4.5
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.1

## 0.4.3-next.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.21.7-next.1
  - @backstage/backend-plugin-api@0.6.17-next.1
  - @backstage/catalog-model@1.4.5
  - @backstage/errors@1.2.4
  - @backstage/integration@1.10.0-next.0
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.1

## 0.4.3-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.21.7-next.0
  - @backstage/integration@1.10.0-next.0
  - @backstage/backend-plugin-api@0.6.17-next.0
  - @backstage/catalog-model@1.4.5
  - @backstage/errors@1.2.4
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.1

## 0.4.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.21.6
  - @backstage/backend-plugin-api@0.6.16
  - @backstage/catalog-model@1.4.5
  - @backstage/errors@1.2.4
  - @backstage/integration@1.9.1
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.1

## 0.4.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.21.5
  - @backstage/backend-plugin-api@0.6.15
  - @backstage/catalog-model@1.4.5
  - @backstage/errors@1.2.4
  - @backstage/integration@1.9.1
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.1

## 0.4.0

### Minor Changes

- 02ee466: **DEPRECATION** - Deprecated the `logStream` in the `ActionContext`. Please move to using `ctx.logger.x` instead.
- aa543c9: Update task context type to contain the new auth initiator credentials.

### Patch Changes

- 85f4723: Fixed file corruption for non UTF-8 data in fetch contents
- 984abfa: Fixing the lost of the initial state after a task recovery.
- c6b132e: Introducing checkpoints for scaffolder task action idempotency
- bbd1fe1: Made "checkpoint" on scaffolder action context non-optional
- Updated dependencies
  - @backstage/backend-common@0.21.4
  - @backstage/integration@1.9.1
  - @backstage/errors@1.2.4
  - @backstage/backend-plugin-api@0.6.14
  - @backstage/catalog-model@1.4.5
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.1

## 0.4.0-next.2

### Minor Changes

- 02ee466: **DEPRECATION** - Deprecated the `logStream` in the `ActionContext`. Please move to using `ctx.logger.x` instead.

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.9.1-next.2
  - @backstage/backend-common@0.21.4-next.2
  - @backstage/backend-plugin-api@0.6.14-next.2
  - @backstage/catalog-model@1.4.5-next.0
  - @backstage/errors@1.2.4-next.0
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.1-next.1

## 0.4.0-next.1

### Minor Changes

- aa543c9: Update task context type to contain the new auth initiator credentials.

### Patch Changes

- bbd1fe1: Made "checkpoint" on scaffolder action context non-optional
- Updated dependencies
  - @backstage/backend-common@0.21.4-next.1
  - @backstage/backend-plugin-api@0.6.14-next.1
  - @backstage/integration@1.9.1-next.1
  - @backstage/catalog-model@1.4.5-next.0
  - @backstage/errors@1.2.4-next.0
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.1-next.1

## 0.3.3-next.0

### Patch Changes

- 85f4723: Fixed file corruption for non UTF-8 data in fetch contents
- c6b132e: Introducing checkpoints for scaffolder task action idempotency
- Updated dependencies
  - @backstage/backend-common@0.21.3-next.0
  - @backstage/errors@1.2.4-next.0
  - @backstage/backend-plugin-api@0.6.13-next.0
  - @backstage/catalog-model@1.4.5-next.0
  - @backstage/integration@1.9.1-next.0
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.1-next.0

## 0.3.0

### Minor Changes

- 3a9ba42: Added functions to clone a repo, create a branch, add files and push and commit to the branch. This allows for files to be added to the a PR for use in the bitbucket pull request action for issue #21762
- 11b9a08: Introduced the first version of recoverable tasks.
- 78c100b: Support providing an overriding token for `fetch:template`, `fetch:plain` and `fetch:file` when interacting with upstream integrations

### Patch Changes

- 6bb6f3e: Updated dependency `fs-extra` to `^11.2.0`.
  Updated dependency `@types/fs-extra` to `^11.0.0`.
- 9b0bf20: Add gitea as new type to be used from integrations configuration
- e0e5afe: Add option to configure nunjucks with the `trimBlocks` and `lstripBlocks` options in the fetch:template action
- Updated dependencies
  - @backstage/backend-common@0.21.0
  - @backstage/backend-plugin-api@0.6.10
  - @backstage/catalog-model@1.4.4
  - @backstage/integration@1.9.0
  - @backstage/plugin-scaffolder-common@1.5.0
  - @backstage/errors@1.2.3
  - @backstage/types@1.1.1

## 0.3.0-next.3

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.21.0-next.3
  - @backstage/integration@1.9.0-next.1
  - @backstage/backend-plugin-api@0.6.10-next.3
  - @backstage/catalog-model@1.4.4-next.0
  - @backstage/errors@1.2.3
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.0-next.1

## 0.3.0-next.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.21.0-next.2
  - @backstage/backend-plugin-api@0.6.10-next.2
  - @backstage/catalog-model@1.4.4-next.0
  - @backstage/errors@1.2.3
  - @backstage/integration@1.9.0-next.0
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.0-next.1

## 0.3.0-next.1

### Minor Changes

- 78c100b: Support providing an overriding token for `fetch:template`, `fetch:plain` and `fetch:file` when interacting with upstream integrations

### Patch Changes

- e0e5afe: Add option to configure nunjucks with the `trimBlocks` and `lstripBlocks` options in the fetch:template action
- Updated dependencies
  - @backstage/catalog-model@1.4.4-next.0
  - @backstage/backend-plugin-api@0.6.10-next.1
  - @backstage/backend-common@0.21.0-next.1
  - @backstage/integration@1.9.0-next.0
  - @backstage/errors@1.2.3
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.5.0-next.1

## 0.3.0-next.0

### Minor Changes

- 3a9ba42: Added functions to clone a repo, create a branch, add files and push and commit to the branch. This allows for files to be added to the a PR for use in the bitbucket pull request action for issue #21762
- 11b9a08: Introduced the first version of recoverable tasks.

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.21.0-next.0
  - @backstage/plugin-scaffolder-common@1.5.0-next.0
  - @backstage/backend-plugin-api@0.6.10-next.0
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3
  - @backstage/integration@1.8.0
  - @backstage/types@1.1.1

## 0.2.10

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.20.1
  - @backstage/plugin-scaffolder-common@1.4.5
  - @backstage/backend-plugin-api@0.6.9
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3
  - @backstage/integration@1.8.0
  - @backstage/types@1.1.1

## 0.2.10-next.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.6.9-next.2
  - @backstage/backend-common@0.20.1-next.2

## 0.2.10-next.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.20.1-next.1
  - @backstage/integration@1.8.0
  - @backstage/backend-plugin-api@0.6.9-next.1
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.4.4

## 0.2.10-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.20.1-next.0
  - @backstage/backend-plugin-api@0.6.9-next.0
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3
  - @backstage/integration@1.8.0
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.4.4

## 0.2.9

### Patch Changes

- 219d7f0: Refactor some methods to `-node` instead and use the new external modules
- 0cbb03b: Fixing regular expression ReDoS with zod packages. Upgrading to latest. ref: https://security.snyk.io/vuln/SNYK-JS-ZOD-5925617
- Updated dependencies
  - @backstage/backend-common@0.20.0
  - @backstage/integration@1.8.0
  - @backstage/backend-plugin-api@0.6.8
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.4.4

## 0.2.9-next.3

### Patch Changes

- 219d7f0: Refactor some methods to `-node` instead and use the new external modules
- Updated dependencies
  - @backstage/backend-common@0.20.0-next.3
  - @backstage/backend-plugin-api@0.6.8-next.3
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3
  - @backstage/integration@1.8.0-next.1
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.4.3

## 0.2.9-next.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.20.0-next.2
  - @backstage/backend-plugin-api@0.6.8-next.2
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3
  - @backstage/integration@1.8.0-next.1
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.4.3

## 0.2.9-next.1

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.8.0-next.1
  - @backstage/backend-common@0.20.0-next.1
  - @backstage/backend-plugin-api@0.6.8-next.1
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.4.3

## 0.2.9-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.20.0-next.0
  - @backstage/integration@1.8.0-next.0
  - @backstage/backend-plugin-api@0.6.8-next.0
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.4.3

## 0.2.8

### Patch Changes

- 8613ba3928: Switched to using `"exports"` field for `/alpha` subpath export.
- Updated dependencies
  - @backstage/plugin-scaffolder-common@1.4.3
  - @backstage/integration@1.7.2
  - @backstage/backend-common@0.19.9
  - @backstage/backend-plugin-api@0.6.7
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3
  - @backstage/types@1.1.1

## 0.2.8-next.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.6.7-next.2
  - @backstage/backend-common@0.19.9-next.2

## 0.2.8-next.1

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.7.2-next.0
  - @backstage/plugin-scaffolder-common@1.4.3-next.1
  - @backstage/backend-common@0.19.9-next.1
  - @backstage/backend-plugin-api@0.6.7-next.1
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3
  - @backstage/types@1.1.1

## 0.2.8-next.0

### Patch Changes

- 8613ba3928: Switched to using `"exports"` field for `/alpha` subpath export.
- Updated dependencies
  - @backstage/plugin-scaffolder-common@1.4.3-next.0
  - @backstage/backend-common@0.19.9-next.0
  - @backstage/integration@1.7.1
  - @backstage/backend-plugin-api@0.6.7-next.0
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3
  - @backstage/types@1.1.1

## 0.2.6

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.19.8
  - @backstage/integration@1.7.1
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3
  - @backstage/backend-plugin-api@0.6.6
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.4.2

## 0.2.6-next.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.19.8-next.2
  - @backstage/catalog-model@1.4.3-next.0
  - @backstage/integration@1.7.1-next.1
  - @backstage/errors@1.2.3-next.0
  - @backstage/backend-plugin-api@0.6.6-next.2
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.4.2-next.0

## 0.2.5-next.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.19.7-next.1
  - @backstage/backend-plugin-api@0.6.5-next.1
  - @backstage/catalog-model@1.4.2
  - @backstage/errors@1.2.2
  - @backstage/integration@1.7.1-next.0
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.4.1

## 0.2.5-next.0

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.7.1-next.0
  - @backstage/backend-common@0.19.7-next.0
  - @backstage/backend-plugin-api@0.6.5-next.0
  - @backstage/catalog-model@1.4.2
  - @backstage/errors@1.2.2
  - @backstage/types@1.1.1
  - @backstage/plugin-scaffolder-common@1.4.1

## 0.2.3

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.19.5
  - @backstage/catalog-model@1.4.2
  - @backstage/errors@1.2.2
  - @backstage/integration@1.7.0
  - @backstage/plugin-scaffolder-common@1.4.1
  - @backstage/types@1.1.1
  - @backstage/backend-plugin-api@0.6.3

## 0.2.3-next.3

### Patch Changes

- Updated dependencies
  - @backstage/catalog-model@1.4.2-next.2
  - @backstage/errors@1.2.2-next.0
  - @backstage/integration@1.7.0-next.3
  - @backstage/plugin-scaffolder-common@1.4.1-next.2
  - @backstage/types@1.1.1-next.0
  - @backstage/backend-plugin-api@0.6.3-next.3
  - @backstage/backend-common@0.19.5-next.3

## 0.2.3-next.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.19.5-next.2
  - @backstage/integration@1.7.0-next.2
  - @backstage/backend-plugin-api@0.6.3-next.2
  - @backstage/catalog-model@1.4.2-next.1
  - @backstage/errors@1.2.1
  - @backstage/types@1.1.0
  - @backstage/plugin-scaffolder-common@1.4.1-next.1

## 0.2.3-next.1

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.7.0-next.1
  - @backstage/backend-common@0.19.5-next.1
  - @backstage/backend-plugin-api@0.6.3-next.1
  - @backstage/catalog-model@1.4.2-next.0
  - @backstage/plugin-scaffolder-common@1.4.1-next.0
  - @backstage/errors@1.2.1
  - @backstage/types@1.1.0

## 0.2.2-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.19.4-next.0
  - @backstage/integration@1.7.0-next.0
  - @backstage/backend-plugin-api@0.6.2-next.0
  - @backstage/catalog-model@1.4.1
  - @backstage/errors@1.2.1
  - @backstage/types@1.1.0
  - @backstage/plugin-scaffolder-common@1.4.0

## 0.2.0

### Minor Changes

- e514aac3eac0: Introduce `each` property on action steps, allowing them to be ran repeatedly.

### Patch Changes

- 12a8c94eda8d: Add package repository and homepage metadata
- e07a4914f621: Added several new types that were moved from `@backstage/plugin-scaffolder-backend`.
- 349611126ae2: Added two new alpha extension points, `scaffolderTaskBrokerExtensionPoint` and `scaffolderTemplatingExtensionPoint`.
- 0b1d775be05b: Export `TemplateExample` from the `createTemplateAction` type.
- d3b31a791eb1: Deprecated `executeShellCommand`, `RunCommandOptions`, and `fetchContents` from `@backstage/plugin-scaffolder-backend`, since they are useful for Scaffolder modules (who should not be importing from the plugin package itself). You should now import these from `@backstage/plugin-scaffolder-backend-node` instead. `RunCommandOptions` was renamed in the Node package as `ExecuteShellCommandOptions`, for consistency.
- Updated dependencies
  - @backstage/backend-common@0.19.2
  - @backstage/backend-plugin-api@0.6.0
  - @backstage/integration@1.6.0
  - @backstage/plugin-scaffolder-common@1.4.0
  - @backstage/catalog-model@1.4.1
  - @backstage/errors@1.2.1
  - @backstage/types@1.1.0

## 0.1.6-next.2

### Patch Changes

- 0b1d775be05b: Export `TemplateExample` from the `createTemplateAction` type.
- Updated dependencies
  - @backstage/backend-plugin-api@0.6.0-next.2
  - @backstage/backend-common@0.19.2-next.2

## 0.1.6-next.1

### Patch Changes

- 12a8c94eda8d: Add package repository and homepage metadata
- d3b31a791eb1: Deprecated `executeShellCommand`, `RunCommandOptions`, and `fetchContents` from `@backstage/plugin-scaffolder-backend`, since they are useful for Scaffolder modules (who should not be importing from the plugin package itself). You should now import these from `@backstage/plugin-scaffolder-backend-node` instead. `RunCommandOptions` was renamed in the Node package as `ExecuteShellCommandOptions`, for consistency.
- Updated dependencies
  - @backstage/backend-common@0.19.2-next.1
  - @backstage/backend-plugin-api@0.6.0-next.1
  - @backstage/integration@1.5.1
  - @backstage/catalog-model@1.4.1
  - @backstage/errors@1.2.1
  - @backstage/types@1.1.0
  - @backstage/plugin-scaffolder-common@1.3.2

## 0.1.6-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.5.5-next.0
  - @backstage/catalog-model@1.4.1
  - @backstage/types@1.1.0
  - @backstage/plugin-scaffolder-common@1.3.2

## 0.1.5

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.5.4
  - @backstage/catalog-model@1.4.1
  - @backstage/types@1.1.0
  - @backstage/plugin-scaffolder-common@1.3.2

## 0.1.5-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.5.4-next.0
  - @backstage/catalog-model@1.4.1-next.0
  - @backstage/types@1.1.0
  - @backstage/plugin-scaffolder-common@1.3.2-next.0

## 0.1.4

### Patch Changes

- Updated dependencies
  - @backstage/types@1.1.0
  - @backstage/catalog-model@1.4.0
  - @backstage/backend-plugin-api@0.5.3
  - @backstage/plugin-scaffolder-common@1.3.1

## 0.1.4-next.2

### Patch Changes

- Updated dependencies
  - @backstage/catalog-model@1.4.0-next.1
  - @backstage/backend-plugin-api@0.5.3-next.2
  - @backstage/types@1.0.2
  - @backstage/plugin-scaffolder-common@1.3.1-next.1

## 0.1.4-next.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.5.3-next.1
  - @backstage/catalog-model@1.4.0-next.0
  - @backstage/plugin-scaffolder-common@1.3.1-next.0
  - @backstage/types@1.0.2

## 0.1.4-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.5.3-next.0
  - @backstage/catalog-model@1.3.0
  - @backstage/types@1.0.2
  - @backstage/plugin-scaffolder-common@1.3.0

## 0.1.3

### Patch Changes

- 6d954de4b06: Update typing for `RouterOptions::actions` and `ScaffolderActionsExtensionPoint::addActions` to allow any kind of action being assigned to it.
- Updated dependencies
  - @backstage/plugin-scaffolder-common@1.3.0
  - @backstage/backend-plugin-api@0.5.2
  - @backstage/catalog-model@1.3.0
  - @backstage/types@1.0.2

## 0.1.3-next.2

### Patch Changes

- Updated dependencies
  - @backstage/plugin-scaffolder-common@1.3.0-next.0

## 0.1.3-next.1

### Patch Changes

- 6d954de4b06: Update typing for `RouterOptions::actions` and `ScaffolderActionsExtensionPoint::addActions` to allow any kind of action being assigned to it.
- Updated dependencies
  - @backstage/backend-plugin-api@0.5.2-next.1

## 0.1.3-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.5.2-next.0
  - @backstage/catalog-model@1.3.0
  - @backstage/types@1.0.2
  - @backstage/plugin-scaffolder-common@1.2.7

## 0.1.2

### Patch Changes

- e27ddc36dad: Added a possibility to cancel the running task (executing of a scaffolder template)
- a7eb36c6e38: Improve type-check for scaffolder output parameters
- 1e4f5e91b8e: Bump `zod` and `zod-to-json-schema` dependencies.
- 2898b6c8d52: Minor type tweaks for TypeScript 5.0
- Updated dependencies
  - @backstage/plugin-scaffolder-common@1.2.7
  - @backstage/catalog-model@1.3.0
  - @backstage/backend-plugin-api@0.5.1
  - @backstage/types@1.0.2

## 0.1.2-next.3

### Patch Changes

- Updated dependencies
  - @backstage/catalog-model@1.3.0-next.0
  - @backstage/backend-plugin-api@0.5.1-next.2
  - @backstage/types@1.0.2
  - @backstage/plugin-scaffolder-common@1.2.7-next.2

## 0.1.2-next.2

### Patch Changes

- 2898b6c8d52: Minor type tweaks for TypeScript 5.0
- Updated dependencies
  - @backstage/backend-plugin-api@0.5.1-next.2
  - @backstage/catalog-model@1.2.1
  - @backstage/types@1.0.2
  - @backstage/plugin-scaffolder-common@1.2.7-next.1

## 0.1.2-next.1

### Patch Changes

- a7eb36c6e38: Improve type-check for scaffolder output parameters
- 1e4f5e91b8e: Bump `zod` and `zod-to-json-schema` dependencies.
- Updated dependencies
  - @backstage/plugin-scaffolder-common@1.2.7-next.1
  - @backstage/backend-plugin-api@0.5.1-next.1
  - @backstage/catalog-model@1.2.1
  - @backstage/types@1.0.2

## 0.1.2-next.0

### Patch Changes

- e27ddc36dad: Added a possibility to cancel the running task (executing of a scaffolder template)
- Updated dependencies
  - @backstage/plugin-scaffolder-common@1.2.7-next.0
  - @backstage/backend-plugin-api@0.5.1-next.0
  - @backstage/catalog-model@1.2.1
  - @backstage/types@1.0.2

## 0.1.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.5.0
  - @backstage/catalog-model@1.2.1
  - @backstage/types@1.0.2
  - @backstage/plugin-scaffolder-common@1.2.6

## 0.1.1-next.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.4.1-next.2

## 0.1.1-next.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.4.1-next.1
  - @backstage/catalog-model@1.2.1-next.1
  - @backstage/types@1.0.2
  - @backstage/plugin-scaffolder-common@1.2.6-next.1

## 0.1.1-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.4.1-next.0
  - @backstage/catalog-model@1.2.1-next.0
  - @backstage/types@1.0.2
  - @backstage/plugin-scaffolder-common@1.2.6-next.0

## 0.1.0

### Minor Changes

- d72866f0cc: New package that takes over some of the types and functionality from `@backstage/plugin-scaffolder-backend` that are shared with other modules

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.4.0
  - @backstage/catalog-model@1.2.0
  - @backstage/types@1.0.2
  - @backstage/plugin-scaffolder-common@1.2.5

## 0.1.0-next.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.4.0-next.2
  - @backstage/catalog-model@1.2.0-next.1
  - @backstage/types@1.0.2
  - @backstage/plugin-scaffolder-common@1.2.5-next.1

## 0.1.0-next.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-plugin-api@0.3.2-next.1
  - @backstage/catalog-model@1.1.6-next.0
  - @backstage/types@1.0.2
  - @backstage/plugin-scaffolder-common@1.2.5-next.0

## 0.1.0-next.0

### Minor Changes

- d72866f0cc: New package that takes over some of the types and functionality from `@backstage/plugin-scaffolder-backend` that are shared with other modules

### Patch Changes

- Updated dependencies
  - @backstage/catalog-model@1.1.6-next.0
  - @backstage/plugin-scaffolder-common@1.2.5-next.0
  - @backstage/backend-plugin-api@0.3.2-next.0
