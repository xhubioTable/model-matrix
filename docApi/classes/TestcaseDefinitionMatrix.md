[**@tlink/model-matrix**](../README.md)

***

[@tlink/model-matrix](../globals.md) / TestcaseDefinitionMatrix

# Class: TestcaseDefinitionMatrix

Defined in: src/TestcaseDefinitionMatrix.ts:68

Represents a test case in a matrix table.

In a matrix table, a test case corresponds to a single cell identified by its row and column.
The class implements the TestcaseDefinitionInterface.

## Implements

- `TestcaseDefinitionInterface`

## Constructors

### new TestcaseDefinitionMatrix()

> **new TestcaseDefinitionMatrix**(`opts`): [`TestcaseDefinitionMatrix`](TestcaseDefinitionMatrix.md)

Defined in: src/TestcaseDefinitionMatrix.ts:111

Constructs a new TestcaseDefinitionMatrix instance.

#### Parameters

##### opts

[`TestcaseDefinitionMatrixOptions`](../interfaces/TestcaseDefinitionMatrixOptions.md)

Options to initialize the test case, including row/column numbers, meta data, table reference, data, logger, etc.

#### Returns

[`TestcaseDefinitionMatrix`](TestcaseDefinitionMatrix.md)

## Properties

### columnMeta

> **columnMeta**: [`MetaRowColumn`](../interfaces/MetaRowColumn.md)

Defined in: src/TestcaseDefinitionMatrix.ts:89

Meta information for the column.

***

### columnNumber

> **columnNumber**: `number`

Defined in: src/TestcaseDefinitionMatrix.ts:83

The column number from which this test case originates.

***

### data?

> `optional` **data**: `string` \| `number`

Defined in: src/TestcaseDefinitionMatrix.ts:74

The data for this test case.
For a decision table, a test case is represented as a column, where the data is stored
by an identifier corresponding to a value in the row.

#### Implementation of

`TestcaseDefinitionInterface.data`

***

### id

> **id**: `string`

Defined in: src/TestcaseDefinitionMatrix.ts:98

Unique identifier for this test case.

#### Implementation of

`TestcaseDefinitionInterface.id`

***

### logger

> **logger**: `LoggerInterface`

Defined in: src/TestcaseDefinitionMatrix.ts:77

Logger instance for this test case model.

#### Implementation of

`TestcaseDefinitionInterface.logger`

***

### multiplicity

> **multiplicity**: `number` = `1`

Defined in: src/TestcaseDefinitionMatrix.ts:101

Number of instances to generate for this test case (default is 1).

#### Implementation of

`TestcaseDefinitionInterface.multiplicity`

***

### neverExecute

> **neverExecute**: `boolean` = `false`

Defined in: src/TestcaseDefinitionMatrix.ts:104

Flag indicating that this test case should never be executed (default is false).

#### Implementation of

`TestcaseDefinitionInterface.neverExecute`

***

### rowMeta

> **rowMeta**: [`MetaRowColumn`](../interfaces/MetaRowColumn.md)

Defined in: src/TestcaseDefinitionMatrix.ts:86

Meta information for the row.

***

### rowNumber

> **rowNumber**: `number`

Defined in: src/TestcaseDefinitionMatrix.ts:80

The row number from which this test case originates.

***

### table

> **table**: [`TableMatrix`](TableMatrix.md)

Defined in: src/TestcaseDefinitionMatrix.ts:92

A reference to the table (matrix) that contains this test case.

#### Implementation of

`TestcaseDefinitionInterface.table`

***

### tableMeta

> **tableMeta**: `MetaTable`

Defined in: src/TestcaseDefinitionMatrix.ts:95

The meta information of the table.

## Accessors

### execute

#### Get Signature

> **get** **execute**(): `boolean`

Defined in: src/TestcaseDefinitionMatrix.ts:183

Determines whether this test case should be executed.

A test case is executed if it has defined data and if either the row meta or column meta indicates execution.

##### Returns

`boolean`

True if the test case should be executed, otherwise false.

#### Implementation of

`TestcaseDefinitionInterface.execute`

***

### testcaseMeta

#### Get Signature

> **get** **testcaseMeta**(): `MetaTestcase`

Defined in: src/TestcaseDefinitionMatrix.ts:154

Retrieves the meta information for this test case.

Combines the table meta data with the test case name.

##### Returns

`MetaTestcase`

A MetaTestcase object containing file name, table name, table type, and test case name.

#### Implementation of

`TestcaseDefinitionInterface.testcaseMeta`

***

### testcaseName

#### Get Signature

> **get** **testcaseName**(): `string`

Defined in: src/TestcaseDefinitionMatrix.ts:143

Retrieves the name of this test case.

The name is constructed using the row and column numbers in the format: 'r<row>:c<column>'.

##### Returns

`string`

The test case name as a string.

## Methods

### createFilter()

> **createFilter**(): `FilterInterface`[]

Defined in: src/TestcaseDefinitionMatrix.ts:129

Generates and returns all filters associated with this test case.

#### Returns

`FilterInterface`[]

An array of FilterInterface objects representing the filters.

#### Implementation of

`TestcaseDefinitionInterface.createFilter`

***

### createGeneratorSwitches()

> **createGeneratorSwitches**(): `string`[]

Defined in: src/TestcaseDefinitionMatrix.ts:132

Returns a list of generator names that should be skipped during test execution.

#### Returns

`string`[]

An array of generator names as strings.

#### Implementation of

`TestcaseDefinitionInterface.createGeneratorSwitches`

***

### createTags()

> **createTags**(): `string`[]

Defined in: src/TestcaseDefinitionMatrix.ts:126

Generates and returns all tags associated with this test case.

#### Returns

`string`[]

An array of tags (strings) derived from the test case data.

#### Implementation of

`TestcaseDefinitionInterface.createTags`

***

### createTodos()

> **createTodos**(): `TestcaseTodosInterface`

Defined in: src/TestcaseDefinitionMatrix.ts:202

Creates all todo items for this test case definition.

The todos are generated based on the meta data of both the row and column.
Depending on the generator command found in the meta data, the method creates
generator, reference, or static todos and aggregates them into a TestcaseTodosInterface object.

#### Returns

`TestcaseTodosInterface`

An object containing arrays of generated todos, grouped by type.

#### Implementation of

`TestcaseDefinitionInterface.createTodos`

***

### getFieldName()

> **getFieldName**(`name`): `string`

Defined in: src/TestcaseDefinitionMatrix.ts:172

Generates a field name for a given input.

In a matrix table, the field name can be based on the test case name and the provided name.
Currently, it simply returns the provided name.

#### Parameters

##### name

`string`

The base name for the field.

#### Returns

`string`

The constructed field name.
