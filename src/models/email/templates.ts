import {User, UserDbObject} from '@models/types'

export const restore = ({
  user,
  token,
}: {
  user: User | UserDbObject
  token: string
}): string => `
  <h1 align='center'>
    Skyflux
  </h1>
  <br/>
  <h4 align='center'>
    Hello, ${user.nickname}!
  </h4>
  <br/> 
  You've started password resetting procedure. Follow the link to change your password: 
  <br/>
  <a href="${process.env.FRONT_URL}/id/reset/${token}">${process.env.FRONT_URL}/id/reset/${token}</a>
  <br/>
  <span align="center">If you haven't started this procedure, just ignore this email</span>
  </br>  
`

export const confirm = ({
  user,
  token,
}: {
  user: User | UserDbObject
  token: string
}): string => `
<div>
  <h1 align='center'>
    Skyflux
  </h1>
  <br />
  <h4 align='center'>
    Welcome, ${user.nickname}! Follow the link to confirm your email:
    <br />
    <a href="${process.env.FRONT_URL}/user/confirm-email/${token}">${process.env.FRONT_URL}/user/confirm-email/${token}</a>
  </h4>
  <span align="center">If you didn't request this email, just ignore it</span>
  </br>  
</div>
`
