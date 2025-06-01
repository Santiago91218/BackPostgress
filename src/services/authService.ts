import { IUsuario } from "../models/IUsuario"
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

export const generateToken = (user: IUsuario): string => {
    return jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: '12h'} )
}