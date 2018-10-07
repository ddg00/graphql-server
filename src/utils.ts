import { verify } from 'jsonwebtoken'

export function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = verify(token, process.env.APP_SECRET!) as {
      userId: string
    }
    return userId
  }

  throw new AuthError()
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}
