import { getServiceEnv } from 'utils'
import chance from 'utils/chance'
import { MailerContext } from './mailer'

const sendMail = {
  async handler(ctx: MailerContext) {
    return ctx.service.sendMail(ctx, ctx.params).catch((error) => {
      ctx.service.logger.error(error)
      throw error
    })
  },
}

const mailerActions = { sendMail }

export default mailerActions
