/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  MicrosoftGraphClient,
  ODataQuery,
} from '@backstage/plugin-catalog-backend-module-msgraph';

/**
 * Fetches a single page of Graph API results.
 *
 * When `options.nextLink` is provided it is followed directly (all query
 * parameters are already encoded in it). Otherwise the request is built from
 * `options.query`.
 *
 * MS Graph requires `ConsistencyLevel: eventual` + `$count=true` for advanced
 * queries using `ne`/`not` operators in `$filter` or using `$search`.
 */
export async function requestOnePage<T>(
  client: MicrosoftGraphClient,
  path: string,
  options: {
    query?: ODataQuery;
    queryMode?: 'basic' | 'advanced';
    nextLink?: string;
    signal?: AbortSignal;
  } = {},
): Promise<{ items: T[]; nextLink?: string }> {
  const { query, queryMode, nextLink, signal } = options;
  const appliedQueryMode = query?.search ? 'advanced' : queryMode ?? 'basic';

  // $count=true is required for advanced queries using ne/not in $filter or $search
  if (
    appliedQueryMode === 'advanced' &&
    query &&
    (query.filter || query.search)
  ) {
    query.count = true;
  }

  const headers: Record<string, string> =
    appliedQueryMode === 'advanced' ? { ConsistencyLevel: 'eventual' } : {};

  const response = nextLink
    ? await client.requestRaw(nextLink, headers, 2, signal)
    : await client.requestApi(path, query, headers, signal);

  if (response.status !== 200) {
    const body = await response.json();
    const err = body?.error;
    throw new Error(
      `Error while reading ${nextLink ?? path} from Microsoft Graph: ${
        err?.code
      } - ${err?.message}`,
    );
  }

  const result = await response.json();
  return {
    items: result.value as T[],
    nextLink: result['@odata.nextLink'],
  };
}

/**
 * Like `getUserPhotoWithSizeLimit` but skips the size-listing call for users
 * with no photo. For users without a photo: 1 fast check call. For users with
 * a photo: 1 check + the normal size-limited fetch (2 more calls).
 */
export async function getUserPhotoGated(
  client: MicrosoftGraphClient,
  userId: string,
  maxSize: number,
): Promise<string | undefined> {
  const check = await client.requestApi(`users/${userId}/photo`);
  if (check.status !== 200) return undefined;
  return await client.getUserPhotoWithSizeLimit(userId, maxSize);
}
