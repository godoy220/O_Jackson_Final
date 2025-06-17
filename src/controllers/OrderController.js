const Order = require('../models/Order');
const Product = require('../models/Product');

class OrderController {
  // Lista todos os pedidos do usuario logado
  async index(req, res) {
    try {
      const orders = await Order.findAll({
        where: { userId: req.userId },
        include: [{ model: Product, as: 'products' }]
      });
      return res.json(orders);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Cria um pedido novo
  async store(req, res) {
    const { productIds } = req.body;
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ error: 'Informe um array de productIds.' });
    }

    try {
      const order = await Order.create({
        userId: req.userId,
        status: 'pending'
      });

      await order.setProducts(productIds);

      const orderWithProducts = await Order.findByPk(order.id, {
        include: [{ model: Product, as: 'products' }]
      });

      return res.status(201).json(orderWithProducts);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Atualiza um pedido (pode mudar status ou produtos)
  async update(req, res) {
    const { id } = req.params;
    const { status, productIds } = req.body;

    try {
      const order = await Order.findOne({ where: { id, userId: req.userId } });
      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado.' });
      }

      if (status) {
        order.status = status;
      }
      await order.save();

      if (productIds && Array.isArray(productIds)) {
        await order.setProducts(productIds);
      }

      const updatedOrder = await Order.findByPk(order.id, {
        include: [{ model: Product, as: 'products' }]
      });

      return res.json(updatedOrder);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Remove um pedido
  async delete(req, res) {
    const { id } = req.params;
    try {
      const order = await Order.findOne({ where: { id, userId: req.userId } });
      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado.' });
      }
      await order.destroy();
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new OrderController();