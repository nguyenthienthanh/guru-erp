import { IAccount } from '@guru-erp/interfaces'
import { Types } from 'mongoose'
import chance from 'utils/chance'

export const mockAccount: Partial<IAccount> = {
  id: Types.ObjectId().toHexString(),
  email: chance.email(),
  password: '123456',
}

export const genAccountParams = () => ({
  email: chance.email(),
  password: '123456',
})
