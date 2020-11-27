import Mongoose, {ModelOptions} from 'mongoose'
import {v4} from 'uuid'
import nodemailer from 'nodemailer'
import SMTPConnection from 'nodemailer/lib/smtp-connection'
import Mail from 'nodemailer/lib/mailer'
import {User, UserDbObject} from '@skyflux/api/models/types'
import {EmailDocument, Mailer} from '@skyflux/api/models/email/types'
import * as templates from './templates'
import {EmailModel} from './model'

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

/** Creates new change email request */
export const changeEmail = async (
  email: string,
  user: User | UserDbObject,
): Promise<boolean> => {
  const token = v4()

  const session = await Mongoose.startSession()
  await session.withTransaction(async () => {
    await sendEmail({
      template: 'confirm',
      subject: 'Confirm email',
      email,
      payload: {user, token},
    })

    await EmailModel.create({user: user._id, email, token})
  })

  return true
}

export const deleteAllUserRequests = async (
  user: User | UserDbObject,
  options: ModelOptions,
): Promise<boolean> => {
  const {deletedCount} = await EmailModel.deleteMany({user: user._id}, options)
  return (deletedCount || 0) > 0
}

export const getRequestByToken = async (
  token: string,
): Promise<EmailDocument | null> => EmailModel.findOne({token})
