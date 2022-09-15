[airview-cms-api](../README.md) / [Exports](../modules.md) / CmsBackend

# Class: CmsBackend

## Table of contents

### Constructors

- [constructor](CmsBackend.md#constructor)

### Properties

- [\_cache](CmsBackend.md#_cache)
- [\_client](CmsBackend.md#_client)
- [\_exclusions](CmsBackend.md#_exclusions)

### Methods

- [\_getCachedResponse](CmsBackend.md#_getcachedresponse)
- [\_getFilteredTree](CmsBackend.md#_getfilteredtree)
- [createBranch](CmsBackend.md#createbranch)
- [createPullRequest](CmsBackend.md#createpullrequest)
- [deleteEntity](CmsBackend.md#deleteentity)
- [getBranches](CmsBackend.md#getbranches)
- [getData](CmsBackend.md#getdata)
- [getEntries](CmsBackend.md#getentries)
- [getListing](CmsBackend.md#getlisting)
- [getTreeContent](CmsBackend.md#gettreecontent)
- [setContent](CmsBackend.md#setcontent)

## Constructors

### constructor

• **new CmsBackend**(`client`, `cache`)

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `client` | `GitClient` |
| `cache`  | `CmsCache`  |

#### Defined in

[cms-backend.ts:19](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/cms-backend.ts#L19)

## Properties

### \_cache

• `Readonly` **\_cache**: `CmsCache`

#### Defined in

[cms-backend.ts:16](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/cms-backend.ts#L16)

---

### \_client

• `Readonly` **\_client**: `GitClient`

#### Defined in

[cms-backend.ts:15](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/cms-backend.ts#L15)

---

### \_exclusions

• `Readonly` **\_exclusions**: `string`[]

#### Defined in

[cms-backend.ts:17](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/cms-backend.ts#L17)

## Methods

### \_getCachedResponse

▸ `Private` **\_getCachedResponse**<`T`\>(`fetcher`, `cacheKey`): `Promise`<`any`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `fetcher`  | `any`    |
| `cacheKey` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[cms-backend.ts:38](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/cms-backend.ts#L38)

---

### \_getFilteredTree

▸ `Private` **\_getFilteredTree**(`sha`, `filterFunc?`): `Promise`<`GitTree`[]\>

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `sha`        | `string` |
| `filterFunc` | `any`    |

#### Returns

`Promise`<`GitTree`[]\>

#### Defined in

[cms-backend.ts:28](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/cms-backend.ts#L28)

---

### createBranch

▸ **createBranch**(`baseSha`, `branchName`): `Promise`<`CmsResult`<`void`\>\>

Creates a branch at the git backend

#### Parameters

| Name         | Type     | Description                          |
| :----------- | :------- | :----------------------------------- |
| `baseSha`    | `string` | The SHA of the commit to branch from |
| `branchName` | `string` | The name of the branch               |

#### Returns

`Promise`<`CmsResult`<`void`\>\>

The result indicating the success of the operation

#### Defined in

[cms-backend.ts:71](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/cms-backend.ts#L71)

---

### createPullRequest

▸ **createPullRequest**(`pullRequest`): `Promise`<`CmsResult`<`GitPullRequest`\>\>

Creates a pull request at the git backend

#### Parameters

| Name          | Type             |
| :------------ | :--------------- |
| `pullRequest` | `GitPullRequest` |

#### Returns

`Promise`<`CmsResult`<`GitPullRequest`\>\>

The result object containing the details of the PR or indication of failure

#### Defined in

[cms-backend.ts:86](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/cms-backend.ts#L86)

---

### deleteEntity

▸ **deleteEntity**(`content`): `Promise`<`void`\>

Deletes an entity from the git backend

#### Parameters

| Name      | Type            | Description                          |
| :-------- | :-------------- | :----------------------------------- |
| `content` | `InboundEntity` | The details of the content to delete |

#### Returns

`Promise`<`void`\>

A promise indicating the success/failure of the operation

#### Defined in

[cms-backend.ts:117](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/cms-backend.ts#L117)

---

### getBranches

▸ **getBranches**(): `Promise`<`GitBranch`[]\>

Returns an array of branches

**`Remarks`**

This method is part of the core-library#Statistics | Statistics subsystem.

#### Returns

`Promise`<`GitBranch`[]\>

The array of branches

#### Defined in

[cms-backend.ts:59](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/cms-backend.ts#L59)

---

### getData

▸ **getData**(`sha`): `Promise`<`any`\>

Gets the listing and entry meta data for the provided branch sha

**`Remarks`**

This is the basis for how the bulk of the cms backend works.
The CMS relies on a per-branch description of the site structure and metadata so that it can allow a consumer access to peices of info
without having to parse many markdown files on the fly. e.g. to construct a nav.

We do not have a database to work with, so any metadata is stamped into an \_index.md markdown file as frontmatter.
When a commit is made and this method is called using new new sha, the method pulls the neccesary files and reconstructs
the data based on the changes.
Assest are cached locally to avoid rate limiting and to prevent computing data which we already have.
Because of the nature of how git works as a set of nested immutable trees/objects, we know if we have seen the sha of a tree/object before
then we can re-use any data previously pulled from git or constucted here.
By carrying out this caching, when a push to a document is made via the cms and this method subsequently invoked,
we can keep the response time down to a minimum pulling mostly cached assets.

Folder structure at the cms only goes 3 levels deep, so for a call to this method we should only need direct 3 api requests to git to find
what has changed and prepare the response with the rest being constructed from the cache.

#### Parameters

| Name  | Type     | Description                                |
| :---- | :------- | :----------------------------------------- |
| `sha` | `string` | The sha of the branch to get the data from |

#### Returns

`Promise`<`any`\>

- The listing and meta data

#### Defined in

[cms-backend.ts:168](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/cms-backend.ts#L168)

---

### getEntries

▸ **getEntries**(`sha`): `Promise`<`CmsEntity`[]\>

Get the entries metat for the sha provided

#### Parameters

| Name  | Type     | Description                               |
| :---- | :------- | :---------------------------------------- |
| `sha` | `string` | The sha of the tree to fetch content from |

#### Returns

`Promise`<`CmsEntity`[]\>

- The entries meta for the sha provided

#### Defined in

[cms-backend.ts:288](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/cms-backend.ts#L288)

---

### getListing

▸ **getListing**(`sha`): `Promise`<`Record`<`string`, `string`\>\>

Get the listing for the sha provided

#### Parameters

| Name  | Type     | Description                               |
| :---- | :------- | :---------------------------------------- |
| `sha` | `string` | The sha of the tree to fetch content from |

#### Returns

`Promise`<`Record`<`string`, `string`\>\>

- The listing at the sha provided

#### Defined in

[cms-backend.ts:277](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/cms-backend.ts#L277)

---

### getTreeContent

▸ **getTreeContent**(`treeSha`, `path`): `Promise`<`Record`<`string`, `string`\>\>

Get the content at a given path from within a git tree in base64 encoded format

#### Parameters

| Name      | Type     | Description                                            |
| :-------- | :------- | :----------------------------------------------------- |
| `treeSha` | `string` | The sha of the tree to fetch content from              |
| `path`    | `string` | The relative path of the content in the tree to return |

#### Returns

`Promise`<`Record`<`string`, `string`\>\>

- The content in base64 encoded format

#### Defined in

[cms-backend.ts:130](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/cms-backend.ts#L130)

---

### setContent

▸ **setContent**(`inboundContent`): `Promise`<`void`\>

Pushes the content to the git backend.

The inbound object descibes what is being pushed and holds the content to be persistend in base64 encoding

#### Parameters

| Name             | Type             | Description                       |
| :--------------- | :--------------- | :-------------------------------- |
| `inboundContent` | `InboundContent` | The object to push to the backend |

#### Returns

`Promise`<`void`\>

A promise indicating the success/failure of the operation

#### Defined in

[cms-backend.ts:102](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/cms-backend.ts#L102)
