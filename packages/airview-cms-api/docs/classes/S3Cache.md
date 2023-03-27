[airview-cms-api](../README.md) / [Exports](../modules.md) / S3Cache

# Class: S3Cache

## Implements

- `CmsCache`

## Table of contents

### Constructors

- [constructor](S3Cache.md#constructor)

### Properties

- [\_bucketName](S3Cache.md#_bucketname)

### Methods

- [get](S3Cache.md#get)
- [set](S3Cache.md#set)

## Constructors

### constructor

• **new S3Cache**(`params`)

#### Parameters

| Name     | Type                                                                                      |
| :------- | :---------------------------------------------------------------------------------------- |
| `params` | [`S3CacheConstructorNamedParameters`](../interfaces/S3CacheConstructorNamedParameters.md) |

#### Defined in

[s3-cache.ts:13](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/s3-cache.ts#L13)

## Properties

### \_bucketName

• `Private` `Readonly` **\_bucketName**: `string`

#### Defined in

[s3-cache.ts:11](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/s3-cache.ts#L11)

## Methods

### get

▸ **get**(`key`): `Promise`<`any`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `key` | `string` |

#### Returns

`Promise`<`any`\>

#### Implementation of

CmsCache.get

#### Defined in

[s3-cache.ts:20](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/s3-cache.ts#L20)

---

### set

▸ **set**(`key`, `value`): `Promise`<`void`\>

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `key`   | `string` |
| `value` | `any`    |

#### Returns

`Promise`<`void`\>

#### Implementation of

CmsCache.set

#### Defined in

[s3-cache.ts:39](https://github.com/AirWalk-Digital/airview/blob/96ab1cd/packages/airview-cms-api/src/s3-cache.ts#L39)
