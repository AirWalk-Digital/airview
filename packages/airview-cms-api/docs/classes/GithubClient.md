[airview-cms-api](../README.md) / [Exports](../modules.md) / GithubClient

# Class: GithubClient

## Implements

- `GitClient`

## Table of contents

### Constructors

- [constructor](GithubClient.md#constructor)

### Properties

- [applicationId](GithubClient.md#applicationid)
- [githubApiBaseUri](GithubClient.md#githubapibaseuri)
- [installationId](GithubClient.md#installationid)
- [organisation](GithubClient.md#organisation)
- [privateKey](GithubClient.md#privatekey)
- [repositoryName](GithubClient.md#repositoryname)

### Methods

- [\_commitTree](GithubClient.md#_committree)
- [\_createBlob](GithubClient.md#_createblob)
- [\_createTree](GithubClient.md#_createtree)
- [\_deletePath](GithubClient.md#_deletepath)
- [\_fetchWithHeaders](GithubClient.md#_fetchwithheaders)
- [\_getToken](GithubClient.md#_gettoken)
- [\_updateBranch](GithubClient.md#_updatebranch)
- [createBranch](GithubClient.md#createbranch)
- [createPullRequest](GithubClient.md#createpullrequest)
- [deleteEntity](GithubClient.md#deleteentity)
- [getBlob](GithubClient.md#getblob)
- [getBranches](GithubClient.md#getbranches)
- [getTree](GithubClient.md#gettree)
- [githubRepoURI](GithubClient.md#githubrepouri)
- [setContent](GithubClient.md#setcontent)

## Constructors

### constructor

• **new GithubClient**(`params`)

#### Parameters

| Name     | Type                                                                                                |
| :------- | :-------------------------------------------------------------------------------------------------- |
| `params` | [`GithubClientConstructorNamedParameters`](../interfaces/GithubClientConstructorNamedParameters.md) |

#### Defined in

[github-client.ts:38](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L38)

## Properties

### applicationId

• `Private` **applicationId**: `string`

#### Defined in

[github-client.ts:31](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L31)

---

### githubApiBaseUri

• `Private` **githubApiBaseUri**: `string`

#### Defined in

[github-client.ts:36](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L36)

---

### installationId

• `Private` **installationId**: `string`

#### Defined in

[github-client.ts:32](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L32)

---

### organisation

• `Private` **organisation**: `string`

#### Defined in

[github-client.ts:35](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L35)

---

### privateKey

• `Private` **privateKey**: `string`

#### Defined in

[github-client.ts:33](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L33)

---

### repositoryName

• `Private` **repositoryName**: `string`

#### Defined in

[github-client.ts:34](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L34)

## Methods

### \_commitTree

▸ `Private` **\_commitTree**(`treeSha`, `baseSha`, `author`): `Promise`<`string`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `treeSha` | `string` |
| `baseSha` | `string` |
| `author`  | `any`    |

#### Returns

`Promise`<`string`\>

#### Defined in

[github-client.ts:198](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L198)

---

### \_createBlob

▸ `Private` **\_createBlob**(`content`): `Promise`<`string`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `content` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[github-client.ts:184](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L184)

---

### \_createTree

▸ `Private` **\_createTree**(`path`, `content`, `baseSha`): `Promise`<[`string`, `GitBlob`[]]\>

#### Parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `path`    | `string`                      |
| `content` | `Record`<`string`, `string`\> |
| `baseSha` | `string`                      |

#### Returns

`Promise`<[`string`, `GitBlob`[]]\>

#### Defined in

[github-client.ts:123](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L123)

---

### \_deletePath

▸ `Private` **\_deletePath**(`id`, `baseSha`): `Promise`<`any`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `id`      | `string` |
| `baseSha` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[github-client.ts:91](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L91)

---

### \_fetchWithHeaders

▸ `Private` **\_fetchWithHeaders**(`url`, `options?`): `Promise`<`Response`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `url`     | `string` |
| `options` | `any`    |

#### Returns

`Promise`<`Response`\>

#### Defined in

[github-client.ts:53](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L53)

---

### \_getToken

▸ `Private` **\_getToken**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[github-client.ts:64](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L64)

---

### \_updateBranch

▸ `Private` **\_updateBranch**(`commitSha`, `branchName`): `Promise`<`void`\>

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `commitSha`  | `string` |
| `branchName` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[github-client.ts:151](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L151)

---

### createBranch

▸ **createBranch**(`baseSha`, `branchName`): `Promise`<`CmsResult`<`void`\>\>

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `baseSha`    | `string` |
| `branchName` | `string` |

#### Returns

`Promise`<`CmsResult`<`void`\>\>

#### Implementation of

GitClient.createBranch

#### Defined in

[github-client.ts:299](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L299)

---

### createPullRequest

▸ **createPullRequest**(`pullRequest`): `Promise`<`CmsResult`<`GitPullRequest`\>\>

#### Parameters

| Name          | Type             |
| :------------ | :--------------- |
| `pullRequest` | `GitPullRequest` |

#### Returns

`Promise`<`CmsResult`<`GitPullRequest`\>\>

#### Implementation of

GitClient.createPullRequest

#### Defined in

[github-client.ts:321](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L321)

---

### deleteEntity

▸ **deleteEntity**(`inboundEntity`): `Promise`<`void`\>

#### Parameters

| Name            | Type            |
| :-------------- | :-------------- |
| `inboundEntity` | `InboundEntity` |

#### Returns

`Promise`<`void`\>

#### Implementation of

GitClient.deleteEntity

#### Defined in

[github-client.ts:286](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L286)

---

### getBlob

▸ **getBlob**(`sha`): `Promise`<`GitBlob`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `sha` | `string` |

#### Returns

`Promise`<`GitBlob`\>

#### Implementation of

GitClient.getBlob

#### Defined in

[github-client.ts:258](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L258)

---

### getBranches

▸ **getBranches**(): `Promise`<`GitBranch`[]\>

#### Returns

`Promise`<`GitBranch`[]\>

#### Implementation of

GitClient.getBranches

#### Defined in

[github-client.ts:221](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L221)

---

### getTree

▸ **getTree**(`sha`, `recursive?`): `Promise`<`GitTree`[]\>

#### Parameters

| Name        | Type      | Default value |
| :---------- | :-------- | :------------ |
| `sha`       | `string`  | `undefined`   |
| `recursive` | `boolean` | `false`       |

#### Returns

`Promise`<`GitTree`[]\>

#### Implementation of

GitClient.getTree

#### Defined in

[github-client.ts:239](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L239)

---

### githubRepoURI

▸ `Private` **githubRepoURI**(): `string`

#### Returns

`string`

#### Defined in

[github-client.ts:49](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L49)

---

### setContent

▸ **setContent**(`inboundContent`): `Promise`<`GitBlob`[]\>

#### Parameters

| Name             | Type             |
| :--------------- | :--------------- |
| `inboundContent` | `InboundContent` |

#### Returns

`Promise`<`GitBlob`[]\>

#### Implementation of

GitClient.setContent

#### Defined in

[github-client.ts:269](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/github-client.ts#L269)
