[**@xhubiotable/model-matrix**](../README.md)

***

[@xhubiotable/model-matrix](../globals.md) / TableMatrix

# Class: TableMatrix

Defined in: [src/TableMatrix.ts:53](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L53)

Represents a matrix table.

The TableMatrix class implements the TableInterface for matrix-style tables.
It stores the table meta information, row and column meta data, and the actual data matrix.

## Implements

- `TableInterface`

## Constructors

### new TableMatrix()

> **new TableMatrix**(`opts`): [`TableMatrix`](TableMatrix.md)

Defined in: [src/TableMatrix.ts:85](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L85)

Constructs a new TableMatrix.

#### Parameters

##### opts

[`TableMatrixOptions`](../interfaces/TableMatrixOptions.md)

Options for initializing the TableMatrix, including file name, table name, logger, rows, columns, and data.

#### Returns

[`TableMatrix`](TableMatrix.md)

## Properties

### columns

> **columns**: [`MetaRowColumn`](../interfaces/MetaRowColumn.md)[] = `[]`

Defined in: [src/TableMatrix.ts:72](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L72)

Array of meta information for the columns.

***

### data

> **data**: (`undefined` \| `string` \| `number`)[][] = `[]`

Defined in: [src/TableMatrix.ts:78](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L78)

The matrix data stored as an array of arrays.
Each inner array represents a row, containing data for each column.

***

### fileName

> **fileName**: `string`

Defined in: [src/TableMatrix.ts:63](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L63)

The file name of the table.

#### Implementation of

`TableInterface.fileName`

***

### logger

> **logger**: `LoggerInterface`

Defined in: [src/TableMatrix.ts:60](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L60)

Logger instance used for logging.

#### Implementation of

`TableInterface.logger`

***

### rows

> **rows**: [`MetaRowColumn`](../interfaces/MetaRowColumn.md)[] = `[]`

Defined in: [src/TableMatrix.ts:69](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L69)

Array of meta information for the rows.

***

### tableName

> **tableName**: `string`

Defined in: [src/TableMatrix.ts:66](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L66)

The human-readable name of the table.

#### Implementation of

`TableInterface.tableName`

***

### tableType

> `readonly` **tableType**: `string` = `TABLE_TYPE_MATRIX_TABLE`

Defined in: [src/TableMatrix.ts:57](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L57)

The type of the table, set to TABLE_TYPE_MATRIX_TABLE.

#### Implementation of

`TableInterface.tableType`

## Accessors

### tableMeta

#### Get Signature

> **get** **tableMeta**(): `MetaTable`

Defined in: [src/TableMatrix.ts:106](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L106)

Retrieves the meta information of the table.

##### Returns

`MetaTable`

A MetaTable object containing the file name, table name, and table type.

#### Implementation of

`TableInterface.tableMeta`

## Methods

### createTestcaseName()

> **createTestcaseName**(`rowNumber`, `columnNumber`): `string`

Defined in: [src/TableMatrix.ts:169](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L169)

Creates a test case name for the specified row and column numbers.

#### Parameters

##### rowNumber

`number`

The row number.

##### columnNumber

`number`

The column number.

#### Returns

`string`

A test case name in the format 'r<row>:c<column>'.

***

### getTestcaseForName()

> **getTestcaseForName**(`testcaseName`): `TestcaseDefinitionInterface`

Defined in: [src/TableMatrix.ts:125](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L125)

Returns the test case for the given name.

The test case name in a matrix table follows the format: 'r<row>:c<column>'.
This method parses the test case name, extracts the row and column numbers,
and creates a new TestcaseDefinitionMatrix instance based on the corresponding data.

#### Parameters

##### testcaseName

`string`

The test case name in the format 'r<row>:c<column>'.

#### Returns

`TestcaseDefinitionInterface`

The corresponding TestcaseDefinitionMatrix.

#### Throws

Error if the test case name is invalid or out of range.

#### Implementation of

`TableInterface.getTestcaseForName`

***

### getTestcasesForExecution()

> **getTestcasesForExecution**(): `Generator`\<`TestcaseDefinitionInterface`, `void`, `unknown`\>

Defined in: [src/TableMatrix.ts:181](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L181)

Generator function that yields all test cases that should be executed.

Iterates through the matrix data, creates test cases for each defined cell, and yields them.
For test cases with multiplicity greater than one, additional instances are generated with incremented names.

#### Returns

`Generator`\<`TestcaseDefinitionInterface`, `void`, `unknown`\>

A generator yielding TestcaseDefinitionInterface instances.

#### Implementation of

`TableInterface.getTestcasesForExecution`

***

### processRanges()

> **processRanges**(`testcaseName`): `string`[]

Defined in: [src/TableMatrix.ts:230](https://github.com/xhubioTable/model-matrix/blob/76fc22e89969d493f2f9d90b52a84fe1497e0d5a/src/TableMatrix.ts#L230)

Parses a test case name provided as a reference.

The method supports both single test case names (e.g., "r5:c3") and ranges.
For a range, such as "[r2:c1-r4:c1]", it expands the range into individual test case names.

#### Parameters

##### testcaseName

`string`

The reference test case name or range.

#### Returns

`string`[]

An array of test case names.

#### Throws

Error if the test case name format is invalid.

#### Implementation of

`TableInterface.processRanges`
