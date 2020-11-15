export const nickname = {
  p: `^(?!\\\\._)(?!_\\\\.)(?!.*__)(?!_)(?!.*_$)(?!.*\\\\.\\\\.)(?!\\\\.)(?!.*\\\\.$)(?!\\\\d+$)[a-zA-Z0-9._]{5,69}$`,
  e: 'Nickname may contain latin letters, numbers, alone dots and underscores',
}

export const email = {
  p: `^(([^<>()\\\\[\\\\]\\\\\.,;:\\\\s@\\"]+(\\\\\.[^<>()\\\\[\\\\]\\\\\.,;:\\\\s@\\"]+)*)|(\\".+\\"))@((\\\\[[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}])|(([a-zA-Z\\\\\-0-9]+\\\\.)+[a-zA-Z]{2,}))$`,
  e: 'Should be a valid email',
}

export const login = {
  p: `(${nickname.p})|(${email.p})`,
  e: 'Login must be valid email or nickname',
}
export const password = {
  p: `^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$`,
  e:
    'Password must be at least 8 characters long and contain numbers and letters in upper and lower case',
}

export const avatarUrl = {
  p: `^https://res.cloudinary.com/`,
  e: 'Avatar should be uploaded on Skyflux CDN',
}

export const text = {
  p: `^.{1,120}$`,
  e: "'Text' can't contain more then 120 symbols",
}

export const token = {
  p: `^.{36}$`,
  e: 'Token must be exact 36 symbols in length',
}
export const date = {
  p: `^\\\\d{4}-\\\\d{2}-\\\\d{2}T\\\\d{2}:\\\\d{2}:\\\\d{2}\\\\.\\\\d{3}Z$`,
  e: 'Birthday should be a valid date or empty string',
}
export const about = {
  p: `^.{1,120}$`,
  e: "'About' can't contain more then 120 symbols",
}
export const from = {
  p: `^.{1,36}$`,
  e: "'From' can't contain more then 36 symbols",
}
