import { UserResolvers } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'

export interface UserParent {
  id: string
  email: string
  firstName?: string
  lastName?: string
}

export const User: UserResolvers.Type<TypeMap> = {
  id: parent => parent.id,
  email: parent => parent.email,
  firstName: parent => parent.firstName,
  lastName: parent => parent.lastName,
}
