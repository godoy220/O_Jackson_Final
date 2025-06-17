const Category = require('../models/Category');

class CategoryController {
    async index(req, res) {
        const categories = await Category.findAll();
        return res.json(categories);
    }
    async show(req, res) {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: 'Categoria não encontrada.' });
        return res.json(category);
    }
    async store(req, res) {
        const { name } = req.body;
        const category = await Category.create({ name });
        return res.status(201).json(category);
    }
    async update(req, res) {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: 'Categoria não encontrada.' });
        const { name } = req.body;
        await category.update({ name });
        return res.json(category);
    }
    async delete(req, res) {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: 'Categoria não encontrada.' });
        await category.destroy();
        return res.status(204).send();
    }
}

module.exports = new CategoryController();