import jwt from 'jsonwebtoken';
import User from '../models/User';

export const checkAuth = async (req, res, next) => {
    const token = req.header('x-auth')

    if(!token) {
        return res.status(403).json({
            msg: 'No tienes autorización'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        // Leer el User que corresponde al uid
        const user = await User.findById(uid)

        if(!user) {
            return res.status(401).json({
                msg: 'Token no válido - User no existe DB'
            })
        }

        // Verificar si el uid tiene estado true
        if(!user.estado) {
            return res.status(401).json({
                msg: 'Token no válido - User estado: false'
            })
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error); 
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

