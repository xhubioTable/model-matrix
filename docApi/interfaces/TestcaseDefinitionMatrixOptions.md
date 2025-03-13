[**@tlink/model-matrix**](../README.md)

***

[@tlink/model-matrix](../globals.md) / TestcaseDefinitionMatrixOptions

# Interface: TestcaseDefinitionMatrixOptions

Defined in: src/TestcaseDefinitionMatrix.ts:29

Options for initializing a TestcaseDefinitionMatrix.

## Properties

### columnMeta

> **columnMeta**: [`MetaRowColumn`](MetaRowColumn.md)

Defined in: src/TestcaseDefinitionMatrix.ts:40

Meta information for the column.

***

### columnNumber

> **columnNumber**: `number`

Defined in: src/TestcaseDefinitionMatrix.ts:34

The column number from which this test case originates.

***

### data?

> `optional` **data**: `string` \| `number`

Defined in: src/TestcaseDefinitionMatrix.ts:50

The data for this test case.
In a decision table, a test case is typically represented by a column.
All the data in that column is stored by an identifier, which corresponds to a value in a row.

***

### execute?

> `optional` **execute**: `boolean`

Defined in: src/TestcaseDefinitionMatrix.ts:56

Indicates whether this test case should be executed or treated as a reference.

***

### logger

> **logger**: `LoggerInterface`

Defined in: src/TestcaseDefinitionMatrix.ts:53

Logger instance for logging purposes.

***

### rowMeta

> **rowMeta**: [`MetaRowColumn`](MetaRowColumn.md)

Defined in: src/TestcaseDefinitionMatrix.ts:37

Meta information for the row.

***

### rowNumber

> **rowNumber**: `number`

Defined in: src/TestcaseDefinitionMatrix.ts:31

The row number from which this test case originates.

***

### table

> **table**: [`TableMatrix`](../classes/TableMatrix.md)

Defined in: src/TestcaseDefinitionMatrix.ts:59

A back reference to the matrix table containing this test case.

***

### tableMeta

> **tableMeta**: `MetaTable`

Defined in: src/TestcaseDefinitionMatrix.ts:43

The meta information of the table.
