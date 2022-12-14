import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, Role } from '../models/User'
import { ForbiddenError } from '../helpers/apiError'

export default function verifyAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as User

    if (user.role !== Role.ADMIN) {
      throw new ForbiddenError()
    }

    next()
  } catch (error) {
    console.log('error:', error)
    throw new ForbiddenError()
  }
}
