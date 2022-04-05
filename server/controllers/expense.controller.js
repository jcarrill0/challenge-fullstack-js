import { Expense } from '../models';

export const getExpenses = async (req, res) => {

    const expenses = await Expense.findAll();

    res.json({ expenses });
}

export const getExpense = async (req, res) => {
    const { id } = req.params;

    // const Expense = await Expense.findOne({ where: { id: id } });
    const expense = await Expense.findByPk(id);

    if(!expense) {
        return res.status(404).json({
            msg: `No existe un Expense con el id: ${ id }`
        });
    }

    res.json(expense);
}

export const postExpense = async (req, res) => {
    const { body } = req;

    try {
        const [expense, created] = await Expense.findOrCreate({
            where: { email: body.email },
            defaults: { ...body }
        });
    
        if(!created) {
            return res.status(404).json({
                msg: `Expense ya existe!!`
            });
        }

        // const Expense = new Expense(body);
        // await Expense.save();
    
        res.json(expense);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
}

export const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const expenseUpdate = await Expense.findByPk(id);

        if(!expenseUpdate) {
            return res.status(404).json({
                msg: `No existe un Expense con el id: ${ id }`
            });
        }

        await expenseUpdate.update(body);

        res.json({
            msg: 'updateExpense',
            expenseUpdate
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }

    
}

export const deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const expenseDelete = await Expense.findByPk(id);

        if(!expenseDelete) {
            return res.status(404).json({
                msg: `No existe un Expense con el id: ${ id }`
            });
        }

        await expenseDelete.destroy(id);
    
        res.json({
            msg: 'deleteExpense',
            expenseDelete
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
}