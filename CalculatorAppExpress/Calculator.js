const express = require('express');
const app = express();
const PORT = 4000;

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Home Page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Calculator App</title></head>
      <body>
        <h1>Welcome To Calculator App</h1>
        <a href="/calculator">Go To Calculator</a>
      </body>
    </html>
  `);
});

// Calculator Form Page
app.get('/calculator', (req, res) => {
  res.send(`
    <html>
      <head><title>Calculator App</title></head>
      <body>
        <h1>Calculator</h1>
        <form action="/calculate" method="POST">
          <input type="number" name="num1" placeholder="Enter first number" required>
          <input type="number" name="num2" placeholder="Enter second number" required>
          <input type="text" name="operation" placeholder="Enter operation (add, subtract, multiply, divide)" required>
          <button type="submit">Calculate</button>
        </form>
      </body>
    </html>
  `);
});

// Handle calculation
app.post('/calculate', (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const operation = req.body.operation;
  let result;

  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
      break;
    default:
      res.status(400).send('Invalid operation');
      return;
  }

  res.send(`
    <html>
      <head><title>Calculator Result</title></head>
      <body>
        <h1>Result</h1>
        <p>The ${operation} of ${num1} and ${num2} is ${result}</p>
        <a href="/">Go Back</a>
      </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
