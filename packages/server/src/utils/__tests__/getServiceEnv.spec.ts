import { cloneDeep } from 'lodash'
import { getServiceEnv } from 'utils'

describe('Testing getServiceEnv function', () => {
  const orgEnv = cloneDeep(process.env)

  beforeAll(() => {
    process.env = {
      ...process.env,
      TEST_VALUE: 'test',
      ACCOUNTS__FOO: 'bar',
      ACCOUNTS__BAR: 'foo',
    }
  })

  afterAll(() => (process.env = orgEnv))

  it('should return correctly when specify envKey', () => {
    expect(getServiceEnv('accounts', 'foo')).toBe('bar')
    expect(getServiceEnv('accounts', 'FOO')).toBe('bar')
  })

  it('should fallback to global env', () => {
    expect(getServiceEnv('accounts', 'TEST_VALUE')).toBe('test')
  })

  it('should return correctly when no envKey specified', () => {
    expect(getServiceEnv('accounts')).toMatchObject({
      FOO: 'bar',
      BAR: 'foo',
    })
  })
})
