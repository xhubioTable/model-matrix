[**@tlink/model-matrix**](../README.md)

***

[@tlink/model-matrix](../globals.md) / TableMatrixOptions

# Interface: TableMatrixOptions

Defined in: src/TableMatrix.ts:14

Options for initializing a TableMatrix.

## Properties

### columns?

> `optional` **columns**: [`MetaRowColumn`](MetaRowColumn.md)[]

Defined in: src/TableMatrix.ts:38

An array of meta information for each column.

***

### data?

> `optional` **data**: (`undefined` \| `string` \| `number`)[][]

Defined in: src/TableMatrix.ts:44

The matrix data stored as an array of arrays.
Each inner array represents a row, with column data.

***

### fileName

> **fileName**: `string`

Defined in: src/TableMatrix.ts:18

The file name of the table.

***

### logger

> **logger**: `LoggerInterface`

Defined in: src/TableMatrix.ts:28

Logger instance for logging operations.

***

### rows?

> `optional` **rows**: [`MetaRowColumn`](MetaRowColumn.md)[]

Defined in: src/TableMatrix.ts:33

An array of meta information for each row.

***

### tableName

> **tableName**: `string`

Defined in: src/TableMatrix.ts:23

The human-readable name of the table.
