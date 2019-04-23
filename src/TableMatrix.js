import TestcaseDefinitionMatrix from './TestcaseDefinitionMatrix'
import { TableInterface } from '@xhubiotable/model'

export const TABLE_TYPE = 'matrix-table'

export class TableMatrix extends TableInterface {
  constructor(opts = {}) {
    super(opts)

    /**
     * Stores the rows meta information.
     * For each row it creates one object
     * {
     *   name:        // The name of this row
     *   shortName:
     *   execute:     // If set this means that all the combinations of this row should be executed
     *   position:    // This name is used to reference this row
     *   reference:    // A refernce to an other table
     *   generator:   // A generator used to create the data for this row
     *   description: // Any description
     * }
     */
    this.rows = opts.rows || []

    /**
     * Stores the columns meta information.
     * For each column it creates one object
     * {
     *   name:        // The name of this column
     *   shortName:
     *   execute:     // If set this means that all the combinations of this column should be executed
     *   position:    // This name is used to reference this column
     *   reference:    // A refernce to an other table
     *   generator:   // A generator used to apply the column to the row
     *   description: // Any description
     * }
     */
    this.columns = opts.columns || []

    // Stores the matrix data as an array of arrays
    // For one row store all the column data
    // row, column
    this.data = opts.data || []
  }

  get tableType() {
    return TABLE_TYPE
  }

  /**
   * Returns the testcase for the given name. If not found it will throw an exception
   * @param testcaseName {string} The name of the testcase
   * @return testcaseDefinition {object} returns the testcase definition
   */
  getTestcaseForName(testcaseName) {
    const parts = testcaseName.match(/r(\d+):c(\d+)/)
    if (parts === null) {
      throw new Error(
        `The testcase name '${testcaseName}' is not valid. The name must have the format: 'r<row>:c<column>'`
      )
    }

    const row = parts[1]
    const column = parts[2]

    if (row >= this.rows.length || column >= this.columns.length) {
      throw new Error(`The testcase name '${testcaseName}' is out of range`)
    }

    const tc = new TestcaseDefinitionMatrix({
      row,
      column,
      data: this.data[row][column],
      meta: {
        row: this.rows[row],
        column: this.columns[column],
      },
      table: this,
    })

    return tc
  }

  /**
   * creates the field name for a matrix table
   */
  createTestcaseName(row, column) {
    return `r${row}:c${column}`
  }

  /**
   * This generator returns all the testcases which should be executed
   */
  *getTestcasesForExecution() {
    for (let row = 0; row < this.data.length; row++) {
      const rowData = this.data[row]
      for (let column = 0; column < rowData.length; column++) {
        const columnData = rowData[column]
        if (columnData !== undefined) {
          const testcaseName = this.createTestcaseName(row, column)
          const testcaseDefinition = this.getTestcaseForName(testcaseName)

          // check if test should be executed
          if (testcaseDefinition.execute) {
            for (let i = 0; i < testcaseDefinition.multiplicity; i++) {
              const td = this.getTestcaseForName(testcaseName)
              if (testcaseDefinition.multiplicity > 1) {
                // In this case we need to update the testcase name
                td.name = `${testcaseName}.${i + 1}`
              }
              yield td
            }
          }
        }
      }
    }
    return
  }

  /**
   * Parses a testcase name. If the name is a range it will return an
   * Array of names. For example the name 'tc12-14' will be expended to:
   * tc12, tc13, tc14
   * @param testcaseName {string} The reference test case name
   * @return tcNames {array} An array of test case names
   */
  processRanges(testcaseName) {
    let parts = testcaseName.match(/^\[?(r(\d+):c(\d+))\]?$/)
    if (parts !== null) {
      // this is not a range. just return as an array
      return [parts[1]]
    }

    parts = testcaseName.match(/^\[r(\d+)(-(\d+))?:c(\d+)(-(\d+))?\]$/)
    if (parts !== null) {
      // This is a range
      let rowStart = parts[1]
      let rowEnd = parts[3] || rowStart
      let columnStart = parts[4]
      let columnEnd = parts[6] || columnStart

      if (rowStart > rowEnd) {
        // we need to swap the parameter
        const tmp = rowStart
        rowStart = rowEnd
        rowEnd = tmp
      }

      if (columnStart > columnEnd) {
        // we need to swap the parameter
        const tmp = columnStart
        columnStart = columnEnd
        columnEnd = tmp
      }

      const tcNames = []

      for (let row = rowStart; row <= rowEnd; row++) {
        for (let column = columnStart; column <= columnEnd; column++) {
          tcNames.push(this.createTestcaseName(row, column))
        }
      }

      return tcNames
    }
    // In this case it is an invalid name
    throw new Error(
      `The testcase name '${testcaseName}' is not valid. The name must have the format: 'r<row>:c<column>'`
    )
  }
}
