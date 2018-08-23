import {
  TestcaseDefinitionInterface,
  TodoMeta,
  TodoGenerator,
  TodoReference,
  TodoStatic,
} from '@xhubiotable/model'

/**
 * A test case is one column in the test case part
 */
export default class TestcaseDefinition extends TestcaseDefinitionInterface {
  constructor(opts = {}) {
    super(opts)

    // the row this testcase comes from
    this.row = opts.row ? parseInt(opts.row, 10) : undefined

    // the row this column comes from
    this.column = opts.column ? parseInt(opts.column, 10) : undefined

    // meta.column = column meta
    // meta.row = row meta
    this.meta = opts.meta
  }

  get name() {
    return `r${this.row}:c${this.column}`
  }

  /**
   * Creates a field name. In a matrix table the field name
   * is the testcase name plus the name given in the row or column
   */
  getFieldName(name) {
    // return `${this.name}:${name}`
    return name
  }

  /**
   * Getter für die execute Eigenschaft
   */
  get execute() {
    if (
      this.data !== undefined &&
      ((this.meta.column !== undefined && this.meta.column.execute) ||
        (this.meta.row !== undefined && this.meta.row.execute))
    ) {
      return true
    }
    return false
  }

  /**
   * Create all the todos for this testcase definition
   * const todos = {
   *   generators :[genTodo,],
   *   references: [refTodo,],
   *   static: [staticData],
   * }
   * @return todos {object} An object with all the todos by there type
   */
  createTodos() {
    const todos = {
      generator: [],
      static: [],
      reference: [],
      meta: [],
    }

    const self = this

    /**
     * This function will be called for the row and column data.
     * It will updates directly the todos object.
     * @param data {object} The complete data of the column or row
     * @param type {string} row or column. Indicating if it is the row or column data
     * @param meta {object} The meta data of the table for a column or row
     */
    function doCreateTodos(data, type, meta) {
      const generatorCmd = meta.generator

      if (generatorCmd !== undefined) {
        if (generatorCmd.toLowerCase().startsWith('gen:')) {
          const todo = self._createGeneratorTodo(generatorCmd, type, meta)
          todos.generator.push(todo)
        } else if (generatorCmd.toLowerCase().startsWith('ref:')) {
          const todo = self._createReferenceTodo(generatorCmd, type, meta)
          todos.reference.push(todo)
        }
      } else {
        // do the static
        const todo = self._createStaticValueTodo(generatorCmd, type, meta)
        todos.static.push(todo)
      }
    }

    doCreateTodos(this.table.data[this.row][this.column], 'row', this.meta.row)
    doCreateTodos(
      this.table.data[this.row][this.column],
      'column',
      this.meta.column
    )

    return todos
  }

  /**
   * Creates the generator todo
   * @param generatorCmd {string} The generator command
   * @param type {string} row or column. Indicating if it is the row or column data
   * @param meta {object} The meta data of the column or row
   * @return todo {object} A generator Todo
   */
  _createGeneratorTodo(generatorCmd, type, meta) {
    const parts = generatorCmd.split(':')
    parts.shift()
    const instanceIdSuffix = parts.shift()
    const generatorName = parts.shift()
    const config = parts.join(':')

    const todo = new TodoGenerator({
      fieldName: this.getFieldName(meta.name || type),
      tableName: this.table.name,
      tableType: this.table.tableType,
      testcaseName: this.name,
      generatorName,
      config,
      instanceIdSuffix,
      meta,
    })

    return todo
  }

  /**
   * Creates a refernce todo
   * @param generatorCmd {string} The generator command
   * @param type {string} row or column. Indicating if it is the row or column data
   * @param meta {object} The meta data of the column or row
   * @return todo {object} A generator Todo
   */
  _createReferenceTodo(generatorCmd, type, meta) {
    const parts = generatorCmd.split(':')
    const instanceIdSuffix = parts[1]
    // self references may have no table name
    const targetTableName = parts[2] || this.table.name
    const targetFieldName = parts[3]
    const targetTestcaseName = parts[4]

    const todo = new TodoReference({
      fieldName: this.getFieldName(meta.name || type),
      tableName: this.table.name,
      tableType: this.table.tableType,
      testcaseName: this.name,
      targetTableName,
      targetFieldName,
      targetTestcaseName,
      instanceIdSuffix,
      meta,
    })

    return todo
  }

  /**
   * Creates the todo for static values
   * @param generatorCmd {string} The generator command
   * @param type {string} row or column. Indicating if it is the row or column data
   * @param meta {object} The meta data of the column or row
   * @return todo {object} A static Todo
   */
  _createStaticValueTodo(generatorCmd, type, meta) {
    const todo = new TodoStatic({
      fieldName: this.getFieldName(meta.name || type),
      tableName: this.table.name,
      tableType: this.table.tableType,
      testcaseName: this.name,
      value: generatorCmd,
      meta,
    })

    return todo
  }

  /**
   * Create a meta todo
   * @param section {object} The current multiRowSection
   * @return todos {array} Aa array of meta Todos
   */
  _createMultirowSectionTodo(section) {
    const rowIds = section.dataRows
    const todos = []

    rowIds.forEach(dataRowId => {
      const val = this.data[dataRowId]
      if (val !== undefined) {
        const todo = new TodoMeta({
          fieldName: section.name,
          tableName: this.table.name,
          tableType: this.table.tableType,
          testcaseName: this.name,
          meta: {
            key: section.keys[dataRowId],
            comment: section.comments[dataRowId],
            other: section.others[dataRowId],
          },
        })
        todos.push(todo)
      }
    })

    return todos
  }
}
