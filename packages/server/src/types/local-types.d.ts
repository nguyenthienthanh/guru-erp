import { Action as MoleculerAction } from 'moleculer'

export type ServiceName = 'accounts' | 'mailer' | 'orgs' | 'members'
export interface Action extends MoleculerAction {
  graphql?: {
    query?: string
    mutation?: string
  }
  requiresAccount?: boolean
  requiresMember?: boolean
  params?: any
}
