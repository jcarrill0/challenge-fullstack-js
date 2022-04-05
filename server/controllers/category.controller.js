import { Category } from '../models';

export const getCategories = async (req, res) => {

    const categories = await Category.findAll();

    res.json({ categories });
}

export const getCategory = async (req, res) => {
    const { id } = req.params;

    // const Category = await Category.findOne({ where: { id: id } });
    const category = await Category.findByPk(id);

    if(!category) {
        return res.status(404).json({
            msg: `No existe un Category con el id: ${ id }`
        });
    }

    res.json(category);
}

export const postCategory = async (req, res) => {
    const { body } = req;

    try {
        const [category, created] = await Category.findOrCreate({
            where: { email: body.email },
            defaults: { ...body }
        });
    
        if(!created) {
            return res.status(404).json({
                msg: `Category ya existe!!`
            });
        }

        // const Category = new Category(body);
        // await Category.save();
    
        res.json(category);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
}

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const categoryUpdate = await Category.findByPk(id);

        if(!categoryUpdate) {
            return res.status(404).json({
                msg: `No existe un Category con el id: ${ id }`
            });
        }

        await categoryUpdate.update(body);

        res.json({
            msg: 'updateCategory',
            categoryUpdate
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }

    
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const categoryDelete = await Category.findByPk(id);

        if(!categoryDelete) {
            return res.status(404).json({
                msg: `No existe un Category con el id: ${ id }`
            });
        }

        await categoryDelete.destroy(id);
    
        res.json({
            msg: 'deleteCategory',
            categoryDelete
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
}