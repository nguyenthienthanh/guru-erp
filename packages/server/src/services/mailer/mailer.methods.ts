import nodemailer from 'nodemailer'

import { MailOptions } from 'nodemailer/lib/sendmail-transport'
import { getServiceEnv } from 'utils'
import { MailerContext } from './mailer'

const CONFIG = getServiceEnv<['SMTP_HOST', 'SMTP_PORT', 'AUTH_USER', 'AUTH_PASS']>('mailer')

const createTransporter = () => {
  return nodemailer.createTransport({
    host: CONFIG.SMTP_HOST,
    port: +CONFIG.SMTP_PORT,
    auth: {
      user: CONFIG.AUTH_USER,
      pass: CONFIG.AUTH_PASS,
    },
  })
}

const sendMail = (ctx: MailerContext, mailOptions: MailOptions) => {
  const transporter = ctx.service.createTransporter()
  return transporter.sendMail(mailOptions)
}

const mailerMethods = { createTransporter, sendMail }

export default mailerMethods
