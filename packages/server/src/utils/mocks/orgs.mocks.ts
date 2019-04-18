import chance from 'utils/chance'

export const genOrgParams = () => ({
  name: 'A Good Organization Name',
  namespace: chance.word({ length: 7 }),
})
