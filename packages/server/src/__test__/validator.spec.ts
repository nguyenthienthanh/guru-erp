import { email, objectId } from '@guru-erp/validator'
import chance from 'utils/chance'

describe('Test common type validation', () => {
  describe('Test email validation', () => {
    it('should throw error if email is invalid', () => {
      expect(email.isValidSync('bad_email_address')).toBe(false)
    })
    it('good email should pass', () => {
      expect(email.isValidSync(chance.email())).toBe(true)
    })
  })
  describe('Test ObjectId validation', () => {
    it('should throw error if objectId is invalid', () => {
      expect(objectId.isValidSync('bad_object_id')).toBe(false)
    })
    it('good objectId should pass', () => {
      expect(objectId.isValidSync('5b360fdea392d731829ded18')).toBe(true)
    })
  })
})
