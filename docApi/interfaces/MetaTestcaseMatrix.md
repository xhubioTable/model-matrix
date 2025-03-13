[**@tlink/model-matrix**](../README.md)

***

[@tlink/model-matrix](../globals.md) / MetaTestcaseMatrix

# Interface: MetaTestcaseMatrix

Defined in: src/Meta.ts:47

Extends MetaTestcase with additional meta information specific to matrix tables.

This interface combines the standard test case meta information with the meta data for
both the row and the column that define the test case.

## Extends

- `MetaTestcase`

## Properties

### column

> **column**: [`MetaRowColumn`](MetaRowColumn.md)

Defined in: src/Meta.ts:56

Meta information for the column associated with this test case.

***

### fileName

> **fileName**: `string`

Defined in: node\_modules/@tlink/model/dist/src/MetaInterface.d.ts:9

The name of the file from which the table originates.

#### Inherited from

`MetaTestcase.fileName`

***

### row

> **row**: [`MetaRowColumn`](MetaRowColumn.md)

Defined in: src/Meta.ts:51

Meta information for the row associated with this test case.

***

### tableName

> **tableName**: `string`

Defined in: node\_modules/@tlink/model/dist/src/MetaInterface.d.ts:11

The human-readable name of the table.

#### Inherited from

`MetaTestcase.tableName`

***

### tableType

> **tableType**: `string`

Defined in: node\_modules/@tlink/model/dist/src/MetaInterface.d.ts:13

The type or category of the table.

#### Inherited from

`MetaTestcase.tableType`

***

### testcaseName

> **testcaseName**: `string`

Defined in: node\_modules/@tlink/model/dist/src/MetaInterface.d.ts:23

The name of the test case within the table.

#### Inherited from

`MetaTestcase.testcaseName`
