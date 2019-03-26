import { DocumentNode } from 'graphql'
import { get } from 'lodash'

export const gqlToString = (doc: DocumentNode) => get(doc, 'loc.source.body', '')
