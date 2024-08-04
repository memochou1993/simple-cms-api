const express = require('express');
const app = express();
const port = 3000;

// 啟用 JSON 解析
app.use(express.json());

// 假資料
const customers = [
  { id: 1, name: 'Customer 1' },
  { id: 2, name: 'Customer 2' },
];

// 測試端點
app.get('/api', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// 取得所有客戶端點
app.get('/api/customers', (req, res) => {
  res.json(customers);
});

// 取得單個客戶端點
app.get('/api/customers/:id', (req, res) => {
  const customer = customers.find(i => i.id === parseInt(req.params.id));
  if (!customer) {
    return res.status(404).send('Customer not found');
  }

  res.json(customer);
});

// 建立客戶端點
app.post('/api/customers', (req, res) => {
  const newCustomer = {
    id: customers[customers.length - 1].id + 1,
    name: req.body.name,
  };

  // 建立客戶
  customers.push(newCustomer);

  res.status(201).json(newCustomer);
});

// 更新客戶端點
app.put('/api/customers/:id', (req, res) => {
  const customer = customers.find(i => i.id === parseInt(req.params.id));
  if (!customer) {
    return res.status(404).send('Customer not found');
  }

  // 更新客戶
  customer.name = req.body.name;

  res.json(customer);
});

// 刪除客戶端點
app.delete('/api/customers/:id', (req, res) => {
  const index = customers.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send('Customer not found');
  }

  // 刪除客戶
  customers.splice(index, 1);

  res.status(204).send();
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
