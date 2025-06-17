const Product = require('../models/Product');
const  Category  = require('../models/Category');

class ProductController {
    async index(req, res) {
        const products = await Product.findAll({ include: { model: Category, as: 'category' } });
        return res.json(products);
    }
    async show(req, res) {
        const product = await Product.findByPk(req.params.id, { include: { model: Category, as: 'category' } });
        if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });
        return res.json(product);
    }
    async store(req, res) {
        const { name, description, price, stock_quantity, categoryId } = req.body;
        const product = await Product.create({ name, description, price, stock_quantity, categoryId });
        return res.status(201).json(product);
    }
    async update(req, res) {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });
        await product.update(req.body);
        return res.json(product);
    }
    async delete(req, res) {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });
        await product.destroy();
        return res.status(204).send();
    }
}

module.exports = new ProductController();