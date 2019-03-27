import { Service, Context } from 'moleculer'
import mailerMethods from './mailer.methods'

export type MailerMethods = typeof mailerMethods
export type MailerService = Service & MailerMethods
export type MailerContext = Context & {
  service: MailerService
}
