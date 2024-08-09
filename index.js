import express from 'express';
import { body, validationResult } from 'express-validator';
import Collection from './collection.js';
const app = express();
const port = 3000;

// 啟用 JSON 解析
app.use(express.json());

// 實例化集合
const collection = new Collection('customers');

// 測試端點
app.get('/api', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// 取得所有客戶端點
app.get('/api/customers', async (req, res) => {
  const customers = await collection.getItems();
  res.json(customers);
});

// 取得單個客戶端點
app.get('/api/customers/:id', async (req, res) => {
  const id = req.params.id;
  const customer = await collection.getItem(id);
  if (!customer) {
    return res.status(404).json({
      message: 'Customer not found',
    });
  }

  res.json(customer);
});

// 建立客戶端點
app.post('/api/customers', [
  body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const customer = {
    name: req.body.name,
  };

  const id = await collection.addItem(customer);
  customer.id = id;

  res.status(201).json(customer);
});

// 更新客戶端點
app.put('/api/customers/:id', [
  body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const id = req.params.id;
  const customer = await collection.getItem(id);
  if (!customer) {
    return res.status(404).json({
      message: 'Customer not found',
    });
  }

  customer.name = req.body.name;
  await collection.updateItem(id, customer);

  res.json(customer);
});

// 刪除客戶端點
app.delete('/api/customers/:id', async (req, res) => {
  const id = req.params.id;
  const customer = await collection.getItem(id);
  if (!customer) {
    return res.status(404).json({
      message: 'Customer not found',
    });
  }

  await collection.removeItem(id);

  res.status(204).send();
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
