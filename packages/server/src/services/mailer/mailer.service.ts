import { ServiceSchema } from 'moleculer'
import mailerActions from './mailer.actions'
import mailerMethods from './mailer.methods'

const mailerService: ServiceSchema = {
  name: 'mailer',
  methods: mailerMethods,
  actions: mailerActions as any,
}

export = mailerService
