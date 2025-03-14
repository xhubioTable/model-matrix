[**@xhubiotable/model-matrix**](../README.md)

***

[@xhubiotable/model-matrix](../globals.md) / TableMatrixOptions

# Interface: TableMatrixOptions

Defined in: [src/TableMatrix.ts:14](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L14)

Options for initializing a TableMatrix.

## Properties

### columns?

> `optional` **columns**: [`MetaRowColumn`](MetaRowColumn.md)[]

Defined in: [src/TableMatrix.ts:38](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L38)

An array of meta information for each column.

***

### data?

> `optional` **data**: (`undefined` \| `string` \| `number`)[][]

Defined in: [src/TableMatrix.ts:44](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L44)

The matrix data stored as an array of arrays.
Each inner array represents a row, with column data.

***

### fileName

> **fileName**: `string`

Defined in: [src/TableMatrix.ts:18](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L18)

The file name of the table.

***

### logger

> **logger**: `LoggerInterface`

Defined in: [src/TableMatrix.ts:28](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L28)

Logger instance for logging operations.

***

### rows?

> `optional` **rows**: [`MetaRowColumn`](MetaRowColumn.md)[]

Defined in: [src/TableMatrix.ts:33](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L33)

An array of meta information for each row.

***

### tableName

> **tableName**: `string`

Defined in: [src/TableMatrix.ts:23](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L23)

The human-readable name of the table.
