const express = require('express');
const app = express();
const port = 3000;

// 啟用 JSON 解析
app.use(express.json());

// 假資料
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

app.get('/api', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// 取得所有項目
app.get('/api/items', (req, res) => {
  res.json(items);
});

// 取得單個項目
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).send('Item not found');
  }

  res.json(item);
});

// 創建項目
app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1, // 建立簡單的 ID
    name: req.body.name,
  };

  // 創建項目
  items.push(newItem);

  res.status(201).json(newItem);
});

// 更新項目
app.put('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).send('Item not found');
  }

  // 更新項目
  item.name = req.body.name;

  res.json(item);
});

// 刪除項目
app.delete('/api/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).send('Item not found');
  }

  // 刪除項目
  items.splice(itemIndex, 1);

  res.status(204).send();
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
