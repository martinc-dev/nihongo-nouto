import bcrypt from 'bcrypt'

const saltRounds = 10

export const getHashed = (clearText: string): string => bcrypt.hashSync(clearText, saltRounds)

export const checkHashed = (clearText: string, hashed: string): boolean =>
  bcrypt.compareSync(clearText, hashed)

