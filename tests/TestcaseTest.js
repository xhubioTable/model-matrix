'use strict'

import { TestcaseDefinition } from '../lib/index'

test('Test create Object', () => {
  const tc = new TestcaseDefinition()
  expect(tc).not.toBeNull()
})

test('Empty testcase is not executeable', () => {
  const tc = new TestcaseDefinition()
  expect(tc.execute).toBeFalsy()
})

test('TestcaseDefinition creation with opts', () => {
  const tc = new TestcaseDefinition({
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
