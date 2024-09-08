import cors from 'cors';
import express from 'express';
import { body, validationResult } from 'express-validator';
import { Collection } from './firebase/index.js';
import { authMiddleware, loggingMiddleware } from './middleware/index.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.use(loggingMiddleware(true));

const collection = new Collection('customers');

app.get('/api', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.get('/api/customers', [
  authMiddleware,
], async (req, res) => {
  const customers = await collection.getItems();
  res.json(customers);
});

app.get('/api/customers/:id', [
  authMiddleware,
], async (req, res) => {
  const id = req.params.id;
  const customer = await collection.getItem(id);
  if (!customer) {
    return res.status(404).json({
      message: 'Customer not found',
    });
  }

  res.json(customer);
});

app.post('/api/customers', [
  authMiddleware,
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

app.put('/api/customers/:id', [
  authMiddleware,
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

app.delete('/api/customers/:id', [
  authMiddleware,
], async (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
