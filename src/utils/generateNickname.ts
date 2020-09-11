import {animals, colors, uniqueNamesGenerator} from 'unique-names-generator'

export const generateNickname = (): string =>
  uniqueNamesGenerator({dictionaries: [colors, animals]})
