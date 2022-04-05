// TODO: importar paquete de encriptacion y creacion de jwt
import bcryptjs from 'bcryptjs';
import { generateJWT } from '../helpers/generate-jwt';

import User from '../models/User';


export const login = async (req, res) => {8

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } })


        // Verificar si el user esta activo
        if(!user || !user.status) {
            return res.status(400).json({
                msg:'User not found'
            });
        }

        // Verificar la contraseña
        const checkPassword = bcryptjs.compareSync(password, user.password)
        if(!checkPassword) {
            return res.status(400).json({
                msg:'Invalid password'
            });
        }

        //Generar el JWT 
        const token = await generateJWT(user.id);

        res.json({
            data: user,
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Contact administrator'
        });
    }
}

export const register = async (req, res) => {
    let { email, password } = req.body;

    // Encriptar el pass
    const salt = bcryptjs.genSaltSync();
    password = bcryptjs.hashSync(password, salt);

    try {
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: { email, password }
        });
    
        if(!created) {
            return res.status(404).json({
                msg: 'Email already exists'
            });
        }
    
        res.json({ user });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact administrator'
        });
    }
}

// TODO: Analizar Login/registro con google o facebook
