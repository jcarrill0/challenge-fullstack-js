import bcryptjs from 'bcryptjs';
import { User } from '../models';


export const getUsers = async (req, res) => {

    const users = await User.findAll();

    res.json({ users });
}

export const getUser = async (req, res) => {
    const { id } = req.params;

    // const user = await User.findOne({ where: { id: id } });
    const user = await User.findByPk(id);

    if(!user) {
        return res.status(404).json({
            msg: `No existe un user con el id: ${ id }`
        });
    }

    res.json(user);
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const userUpdate = await User.findByPk(id);

        if(!userUpdate) {
            return res.status(404).json({
                msg: `No existe un user con el id: ${ id }`
            });
        }

        await userUpdate.update(body);

        res.json({
            msg: 'updateuser',
            userUpdate
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }

    
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const userDelete = await User.findByPk(id);

        if(!userDelete) {
            return res.status(404).json({
                msg: `No existe un user con el id: ${ id }`
            });
        }

        await User.destroy({ where: { id: id } });
    
        res.json({
            msg: 'deleteuser',
            userDelete
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
}