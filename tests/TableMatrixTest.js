'use strict'

import { TableMatrix } from '../lib/index'

test('Test create Object', () => {
  const table = new TableMatrix()
  expect(table).not.toBeNull()
})

test('Test getTestcaseForName with wrong name format', () => {
  const table = new TableMatrix(MODEL)
  expect(() => {
    table.getTestcaseForName('hugo')
  }).toThrow(
    `The testcase name 'hugo' is not valid. The name must have the format: 'r<row>:c<column>'`
  )
})

test('Test getTestcaseForName out of range', () => {
  const table = new TableMatrix(MODEL)
  expect(() => {
    table.getTestcaseForName('r10:c2')
  }).toThrow(`The testcase name 'r10:c2' is out of range`)
})

test('Test getTestcaseForName', () => {
  const table = new TableMatrix(MODEL)
  const tc = table.getTestcaseForName('r1:c2')
  delete tc.id
  delete tc.table
  delete tc.logger
  expect(tc).toEqual({
    column: 2,
    data: 'x',
    meta: {
      column: { name: 'add email', position: 3 },
      row: { generator: 'Person:3', name: 'Person without email', position: 2 },
    },
    row: 1,
    multiplicity: 1,
  })
})

test('Test getTestcasesForExecution', () => {
  const table = new TableMatrix(MODEL)

  const gen = table.getTestcasesForExecution()

  /**
   * create the expected data
   */
  function createExpected(row, column) {
    return {
      data: MODEL.data[row][column],
      row,
      column,
      meta: {
        row: MODEL.rows[row],
        column: MODEL.columns[column],
      },
      multiplicity: 1,
    }
  }

  let genObj = gen.next()
  delete genObj.value.id
  delete genObj.value.table
  delete genObj.value.logger
  expect(genObj.value).toEqual(createExpected(0, 0))

  genObj = gen.next()
  delete genObj.value.id
  delete genObj.value.table
  delete genObj.value.logger
  expect(genObj.value).toEqual(createExpected(0, 3))

  genObj = gen.next()
  delete genObj.value.id
  delete genObj.value.table
  delete genObj.value.logger
  expect(genObj.value).toEqual(createExpected(0, 4))

  genObj = gen.next()
  delete genObj.value.id
  delete genObj.value.table
  delete genObj.value.logger
  expect(genObj.value).toEqual(createExpected(1, 0))

  genObj = gen.next()
  delete genObj.value.id
  delete genObj.value.table
  delete genObj.value.logger
  expect(genObj.value).toEqual(createExpected(1, 4))

  genObj = gen.next()
  expect(genObj.done).toBeTruthy()
  expect(genObj.value).toBeUndefined()
})

const MODEL = {
  name: 'Action on Person',
  rows: [
    {
      name: 'Person',
      shortName: 'psn',
      position: 1,
      execute: 'x',
      // reference: 'Person:5',
      generator: 'gen::empty',
      description: 'pers desc',
    },
    {
      name: 'Person without email',
      position: 2,
      generator: 'Person:3',
    },
  ],
  columns: [
    {
      name: 'KEINE',
      position: 1,
      execute: 'x',
      generator: 'gen::empty',
    },
    {},
    {
      name: 'add email',
      position: 3,
    },
    {
      name: 'delete email',
      position: 4,
      execute: 'x',
      generator: 'Person:4',
    },
    {
      name: 'change last name',
      position: 5,
      execute: 'x',
    },
  ],
  data: [
    ['x', undefined, undefined, 'x', 'x'],
    ['x', undefined, 'x', undefined, 'x'],
  ],
}
