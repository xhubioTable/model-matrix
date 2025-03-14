import { v4 as uuidv4 } from 'uuid'
import {
  TestcaseDefinitionInterface,
  TestcaseTodosInterface,
  FilterInterface,
  MetaTable,
  PREFIX_GENERATOR,
  PREFIX_REFERENCE,
  TodoGenerator,
  TodoReference,
  TodoStatic,
  MetaTestcase
} from '@xhubiotable/model'
import { MetaRowColumn } from './Meta'
import { LoggerInterface } from '@xhubiotable/logger'
import { TableMatrix } from './TableMatrix'

/**
 * Enum to distinguish whether the meta data is from a row or a column.
 */
enum RowColumn {
  ROW = 'row',
  COLUMN = 'column'
}

/**
 * Options for initializing a TestcaseDefinitionMatrix.
 */
export interface TestcaseDefinitionMatrixOptions {
  /** The row number from which this test case originates. */
  rowNumber: number

  /** The column number from which this test case originates. */
  columnNumber: number

  /** Meta information for the row. */
  rowMeta: MetaRowColumn

  /** Meta information for the column. */
  columnMeta: MetaRowColumn

  /** The meta information of the table. */
  tableMeta: MetaTable

  /**
   * The data for this test case.
   * In a decision table, a test case is typically represented by a column.
   * All the data in that column is stored by an identifier, which corresponds to a value in a row.
   */
  data?: string | number

  /** Logger instance for logging purposes. */
  logger: LoggerInterface

  /** Indicates whether this test case should be executed or treated as a reference. */
  execute?: boolean

  /** A back reference to the matrix table containing this test case. */
  table: TableMatrix
}

/**
 * Represents a test case in a matrix table.
 *
 * In a matrix table, a test case corresponds to a single cell identified by its row and column.
 * The class implements the TestcaseDefinitionInterface.
 */
export class TestcaseDefinitionMatrix implements TestcaseDefinitionInterface {
  /**
   * The data for this test case.
   * For a decision table, a test case is represented as a column, where the data is stored
   * by an identifier corresponding to a value in the row.
   */
  data?: string | number

  /** Logger instance for this test case model. */
  logger: LoggerInterface

  /** The row number from which this test case originates. */
  rowNumber: number

  /** The column number from which this test case originates. */
  columnNumber: number

  /** Meta information for the row. */
  rowMeta: MetaRowColumn

  /** Meta information for the column. */
  columnMeta: MetaRowColumn

  /** A reference to the table (matrix) that contains this test case. */
  table: TableMatrix

  /** The meta information of the table. */
  tableMeta: MetaTable

  /** Unique identifier for this test case. */
  id: string = uuidv4()

  /** Number of instances to generate for this test case (default is 1). */
  multiplicity: number = 1

  /** Flag indicating that this test case should never be executed (default is false). */
  neverExecute: boolean = false

  /**
   * Constructs a new TestcaseDefinitionMatrix instance.
   *
   * @param opts - Options to initialize the test case, including row/column numbers, meta data, table reference, data, logger, etc.
   */
  constructor(opts: TestcaseDefinitionMatrixOptions) {
    this.rowNumber = opts.rowNumber
    this.columnNumber = opts.columnNumber
    this.table = opts.table
    this.data = opts.data
    this.logger = opts.logger
    this.tableMeta = opts.tableMeta
    this.rowMeta = opts.rowMeta
    this.columnMeta = opts.columnMeta
  }

  // ---------------------------------------------------------------------------
  // The following methods (createTags, createFilter, createGeneratorSwitches)
  // are placeholders and are not implemented at the moment.
  // ---------------------------------------------------------------------------
  createTags(): string[] {
    return []
  }
  createFilter(): FilterInterface[] {
    return []
  }
  createGeneratorSwitches(): string[] {
    return []
  }

  /**
   * Retrieves the name of this test case.
   *
   * The name is constructed using the row and column numbers in the format: 'r<row>:c<column>'.
   *
   * @returns The test case name as a string.
   */
  get testcaseName(): string {
    return `r${this.rowNumber}:c${this.columnNumber}`
  }

  /**
   * Retrieves the meta information for this test case.
   *
   * Combines the table meta data with the test case name.
   *
   * @returns A MetaTestcase object containing file name, table name, table type, and test case name.
   */
  get testcaseMeta(): MetaTestcase {
    return {
      fileName: this.tableMeta.fileName,
      tableName: this.tableMeta.tableName,
      tableType: this.tableMeta.tableName, // NOTE: Possibly should be tableType instead of tableName.
      testcaseName: this.testcaseName
    }
  }

  /**
   * Generates a field name for a given input.
   *
   * In a matrix table, the field name can be based on the test case name and the provided name.
   * Currently, it simply returns the provided name.
   *
   * @param name - The base name for the field.
   * @returns The constructed field name.
   */
  getFieldName(name: string) {
    return name
  }

  /**
   * Determines whether this test case should be executed.
   *
   * A test case is executed if it has defined data and if either the row meta or column meta indicates execution.
   *
   * @returns True if the test case should be executed, otherwise false.
   */
  get execute(): boolean {
    if (
      this.data !== undefined &&
      (this.columnMeta.execute || this.rowMeta.execute)
    ) {
      return true
    }
    return false
  }

  /**
   * Creates all todo items for this test case definition.
   *
   * The todos are generated based on the meta data of both the row and column.
   * Depending on the generator command found in the meta data, the method creates
   * generator, reference, or static todos and aggregates them into a TestcaseTodosInterface object.
   *
   * @returns An object containing arrays of generated todos, grouped by type.
   */
  createTodos(): TestcaseTodosInterface {
    const todos: TestcaseTodosInterface = {
      generator: [],
      static: [],
      reference: [],
      field: []
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this // Alias for referencing 'this' within inner functions.

    /**
     * Internal function to create todos for a given meta data source (row or column).
     *
     * This function examines the generator command in the meta data. If the command starts
     * with the generator prefix, it creates a generator todo. If it starts with the reference prefix,
     * it creates a reference todo. If no generator command is defined, a static todo is created.
     *
     * @param type - Indicates whether the meta data is from the row or column.
     * @param meta - The meta data object (MetaRowColumn) for the row or column.
     */
    function doCreateTodos(type: RowColumn, meta: MetaRowColumn) {
      const generatorCmd = meta.generator

      if (generatorCmd !== undefined) {
        if (generatorCmd.toLowerCase().startsWith(PREFIX_GENERATOR)) {
          const todo = self.createGeneratorTodo(generatorCmd, type, meta)
          todos.generator.push(todo)
        } else if (generatorCmd.toLowerCase().startsWith(PREFIX_REFERENCE)) {
          const todo = self.createReferenceTodo(generatorCmd, type, meta)
          todos.reference.push(todo)
        }
      } else {
        // If no generator command is defined, create a static value todo.
        const todo = self.createStaticValueTodo(generatorCmd, type, meta)
        todos.static.push(todo)
      }
    }

    // Generate todos based on row meta data.
    doCreateTodos(RowColumn.ROW, this.rowMeta)

    // Generate todos based on column meta data.
    doCreateTodos(RowColumn.COLUMN, this.columnMeta)

    return todos
  }

  /**
   * Creates a generator todo from a generator command.
   *
   * Parses the generator command to extract the instance ID suffix, generator name, and configuration.
   * It then creates and returns a new TodoGenerator object.
   *
   * @param generatorCmd - The generator command string.
   * @param type - Indicates whether the command is from a row or column.
   * @param metaRowColumn - The meta data object for the row or column.
   * @returns A TodoGenerator instance representing the generator todo.
   * @throws Error if the command is invalid.
   */
  private createGeneratorTodo(
    generatorCmd: string,
    type: RowColumn,
    metaRowColumn: MetaRowColumn
  ) {
    const parts = generatorCmd.split(':')
    parts.shift() // Remove the prefix.
    const instanceIdSuffix = parts.shift()
    const generatorName = parts.shift()
    const config = parts.join(':')

    if (
      instanceIdSuffix === undefined ||
      generatorName === undefined ||
      config === undefined
    ) {
      throw new Error(`The generatorCmd '${generatorCmd}' is invalid`)
    }

    const todo = new TodoGenerator({
      fieldName: this.getFieldName(metaRowColumn.name || type),
      config,
      generatorName,
      instanceIdSuffix,
      testcaseMeta: this.testcaseMeta
    })

    return todo
  }

  /**
   * Creates a reference todo from a reference command.
   *
   * Parses the reference command to extract the instance ID suffix, target table name, target field name,
   * and target test case name. It then creates and returns a new TodoReference object.
   *
   * @param referenceCmd - The reference command string.
   * @param type - Indicates whether the command is from a row or column.
   * @param metaRowColumn - The meta data object for the row or column.
   * @returns A TodoReference instance representing the reference todo.
   * @throws Error if the command is invalid.
   */
  private createReferenceTodo(
    referenceCmd: string,
    type: RowColumn,
    metaRowColumn: MetaRowColumn
  ) {
    const parts = referenceCmd.split(':')
    const instanceIdSuffix = parts[1]
    // For self-references, the table name may be omitted.
    const targetTableName = parts[2] || this.tableMeta.tableName
    const targetFieldName = parts[3]
    const targetTestcaseName = parts[4]

    if (
      targetTableName === undefined ||
      targetFieldName === undefined ||
      targetTestcaseName === undefined
    ) {
      throw new Error(`The referenceCmd '${referenceCmd}' is invalid`)
    }

    const todo = new TodoReference({
      fieldName: this.getFieldName(metaRowColumn.name || type),
      testcaseMeta: this.testcaseMeta,
      instanceIdSuffix,
      targetFieldName,
      targetTableName,
      targetTestcaseName
    })

    return todo
  }

  /**
   * Creates a static value todo from a static value command.
   *
   * Since static todos simply store a constant value, this method creates and returns a new TodoStatic object.
   *
   * @param staticValue - The static value command (if any).
   * @param type - Indicates whether the command is from a row or column.
   * @param metaRowColumn - The meta data object for the row or column.
   * @returns A TodoStatic instance representing the static value todo.
   */
  private createStaticValueTodo(
    staticValue: string,
    type: RowColumn,
    metaRowColumn: MetaRowColumn
  ) {
    const todo = new TodoStatic({
      fieldName: this.getFieldName(metaRowColumn.name || type),
      testcaseMeta: this.testcaseMeta,
      value: staticValue
    })

    return todo
  }
}
