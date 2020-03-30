'use strict'

import { TestcaseDefinitionMatrix } from '../src/index'

test('Test create Object', () => {
  const tc = new TestcaseDefinitionMatrix()
  expect(tc).not.toBeNull()
})

test('Empty testcase is not executeable', () => {
  const tc = new TestcaseDefinitionMatrix()
  expect(tc.execute).toBeFalsy()
})

test('TestcaseDefinitionMatrix creation with opts', () => {
  const tc = new TestcaseDefinitionMatrix({
    row: 1,
    column: 2,
    data: '',
    meta: {
      row: 'rowMeta',
      column: 'colMeta',
    },
  })
  expect(tc.execute).toBeFalsy()
  delete tc.id
  delete tc.logger
  expect(tc).toEqual({
    _neverExecute: false,
    column: 2,
    data: '',
    meta: { column: 'colMeta', row: 'rowMeta' },
    multiplicity: 1,
    row: 1,
    table: undefined,
  })
})
