[**@xhubiotable/model-matrix**](../README.md)

***

[@xhubiotable/model-matrix](../globals.md) / TestcaseDefinitionMatrixOptions

# Interface: TestcaseDefinitionMatrixOptions

Defined in: [src/TestcaseDefinitionMatrix.ts:29](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TestcaseDefinitionMatrix.ts#L29)

Options for initializing a TestcaseDefinitionMatrix.

## Properties

### columnMeta

> **columnMeta**: [`MetaRowColumn`](MetaRowColumn.md)

Defined in: [src/TestcaseDefinitionMatrix.ts:40](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TestcaseDefinitionMatrix.ts#L40)

Meta information for the column.

***

### columnNumber

> **columnNumber**: `number`

Defined in: [src/TestcaseDefinitionMatrix.ts:34](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TestcaseDefinitionMatrix.ts#L34)

The column number from which this test case originates.

***

### data?

> `optional` **data**: `string` \| `number`

Defined in: [src/TestcaseDefinitionMatrix.ts:50](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TestcaseDefinitionMatrix.ts#L50)

The data for this test case.
In a decision table, a test case is typically represented by a column.
All the data in that column is stored by an identifier, which corresponds to a value in a row.

***

### execute?

> `optional` **execute**: `boolean`

Defined in: [src/TestcaseDefinitionMatrix.ts:56](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TestcaseDefinitionMatrix.ts#L56)

Indicates whether this test case should be executed or treated as a reference.

***

### logger

> **logger**: `LoggerInterface`

Defined in: [src/TestcaseDefinitionMatrix.ts:53](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TestcaseDefinitionMatrix.ts#L53)

Logger instance for logging purposes.

***

### rowMeta

> **rowMeta**: [`MetaRowColumn`](MetaRowColumn.md)

Defined in: [src/TestcaseDefinitionMatrix.ts:37](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TestcaseDefinitionMatrix.ts#L37)

Meta information for the row.

***

### rowNumber

> **rowNumber**: `number`

Defined in: [src/TestcaseDefinitionMatrix.ts:31](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TestcaseDefinitionMatrix.ts#L31)

The row number from which this test case originates.

***

### table

> **table**: [`TableMatrix`](../classes/TableMatrix.md)

Defined in: [src/TestcaseDefinitionMatrix.ts:59](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TestcaseDefinitionMatrix.ts#L59)

A back reference to the matrix table containing this test case.

***

### tableMeta

> **tableMeta**: `MetaTable`

Defined in: [src/TestcaseDefinitionMatrix.ts:43](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TestcaseDefinitionMatrix.ts#L43)

The meta information of the table.
