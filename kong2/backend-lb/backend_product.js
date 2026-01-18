const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

const products = [
  { id: 1, name: "Sendal" },
  { id: 2, name: "Sepatu" },
  { id: 3, name: "baju" },
];

// GET all products
app.get("/api/products", (req, res) => {
  res.json({
    message: "from backend product 1",
    items: products,
  });
});

// GET product by id
app.get("/api/products/:id", (req, res) => {
  const product = products.find(
    (p) => p.id === parseInt(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "product not found",
    });
  }

  res.json({
    message: "from backend product 1",
    item: product,
  });
});

// POST create product
app.post("/api/products", (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
  };

  products.push(product);

  res.status(201).json({
    message: "product created",
    item: product,
  });
});

app.listen(PORT, () => {
  console.log(`Backend Product running on http://127.0.0.1:${PORT}`);
});
