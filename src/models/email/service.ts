import nodemailer from 'nodemailer'
import SMTPConnection from 'nodemailer/lib/smtp-connection'
import Mail from 'nodemailer/lib/mailer'
import * as templates from './templates'

export interface Mailer {
  sendMail: (mailOptions: {
    from?: string
    to: string
    subject?: string
    text?: string
    html?: string
  }) => Promise<any>
}

export const createDefaultMailer = (): Mail =>
  nodemailer.createTransport(
    <SMTPConnection.Options>{
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {user: process.env.SMTP_USER, pass: process.env.SMTP_PASS},
    },
    {
      from: process.env.SMTP_EMAIL,
    },
  )

export const sendEmail = async <T extends keyof typeof templates>({
  email,
  subject,
  template,
  payload,
  mailer = createDefaultMailer(),
}: {
  email: string
  subject: string
  template: T
  payload: Parameters<typeof templates[T]>[0]
  mailer?: Mailer
}): Promise<boolean> => {
  const html = templates[template](payload)

  await mailer.sendMail({html, to: email, subject})

  return true
}
