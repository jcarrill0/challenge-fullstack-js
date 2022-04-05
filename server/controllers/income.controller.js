import { Income } from '../models';

export const getIncomes = async (req, res) => {

    const incomes = await Income.findAll();

    res.json({ incomes });
}

export const getIncome = async (req, res) => {
    const { id } = req.params;

    const income = await Income.findByPk(id);

    if(!income) {
        return res.status(404).json({
            msg: `No existe un Income con el id: ${ id }`
        });
    }

    res.json(income);
}

export const postIncome = async (req, res) => {
    const { body } = req;

    try {
        const [income, created] = await Income.findOrCreate({
            where: { email: body.email },
            defaults: { ...body }
        });
    
        if(!created) {
            return res.status(404).json({
                msg: `Income ya existe!!`
            });
        }

        res.json(income);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
}

export const updateIncome = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const incomeUpdate = await Income.findByPk(id);

        if(!incomeUpdate) {
            return res.status(404).json({
                msg: `No existe un Income con el id: ${ id }`
            });
        }

        await incomeUpdate.update(body);

        res.json({
            msg: 'updateIncome',
            incomeUpdate
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }

    
}

export const deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const incomeDelete = await Income.findByPk(id);

        if(!incomeDelete) {
            return res.status(404).json({
                msg: `No existe un Income con el id: ${ id }`
            });
        }
        
        await incomeDelete.destroy(id);
    
        res.json({
            msg: 'deleteIncome',
            incomeDelete
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
}