[**@tlink/model-matrix**](../README.md)

***

[@tlink/model-matrix](../globals.md) / MetaRowColumn

# Interface: MetaRowColumn

Defined in: src/Meta.ts:9

Represents the meta information for a row or column in a matrix table.

This interface contains properties that describe a row or column, including its name,
execution flag, position identifier, associated generator, and an optional description.

## Properties

### description?

> `optional` **description**: `string`

Defined in: src/Meta.ts:38

An optional description providing additional details.

***

### execute

> **execute**: `boolean`

Defined in: src/Meta.ts:23

Indicates whether all combinations for this row or column should be executed.

***

### generator

> **generator**: `string`

Defined in: src/Meta.ts:33

The name of the generator used to create data for this row or column.

***

### name

> **name**: `string`

Defined in: src/Meta.ts:13

The name of the row or column.

***

### position

> **position**: `string`

Defined in: src/Meta.ts:28

A unique position identifier used to reference this row or column.

***

### shortName

> **shortName**: `string`

Defined in: src/Meta.ts:18

The short name of the row or column.
