import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { MutationResolvers } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'

export interface MutationParent {}

export const Mutation: MutationResolvers.Type<TypeMap> = {
  signup: async (parent, {firstName, lastName, email, password}, ctx) => {
    const hashedPassword = await hash(password, 10)
    const user = await ctx.db.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    })

    return {
      token: sign({ userId: user.id }, process.env.APP_SECRET!),
      user,
    }
  },
  
  login: async (parent, { email, password }, ctx) => {
    const user = await ctx.db.user({ email })

    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }

    const valid = await compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    return {
      token: sign({ userId: user.id }, process.env.APP_SECRET!),
      user,
    }
  },
}
