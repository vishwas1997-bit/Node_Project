const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(
      `<html>
    <head>
      <title>Calculator App</title>  
    </head>

      <body>
        <h1>Welcome To Calculator app</h1>
        <a href="/calculator">Go To Calculator</a>
      </body>

    </html>`);
    return res.end();
  } else if (req.url === '/calculator') {
    res.setHeader('Content-Type', 'text/html');
    res.write(
      `<html>
      <head>
        <title>Calculator App</title>  
      </head>

      <body>
        <h1>Calculator</h1>
        <form action="/calculate" method="POST">
          <input type="number" name="num1" placeholder="Enter first number" required>
          <input type="number" name="num2" placeholder="Enter second number" required>
          <input type="string" name="operation" placeholder="Enter operation" required>
          <button type="submit">Calculate</button>
        </form>
      </body>

    </html>`);
    return res.end();
  } else if (req.url === '/calculate' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const num1 = parseFloat(params.get('num1'));
      const num2 = parseFloat(params.get('num2'));
      const operation = params.get('operation');
      let result = 0;
      console.log(operation);
      if (operation === 'add') {
        result = num1 + num2;
      } else if (operation === 'subtract') {
        result = num1 - num2;
      } else if (operation === 'multiply') {
        result = num1 * num2;
      } else if (operation === 'divide') {
        result = num1 / num2;
      } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid operation');
        return;
      }

      res.setHeader('Content-Type', 'text/html');
      res.write(
        `<html>
        <head>
          <title>Calculator App</title>  
        </head>
          <body>
            <h1>Result</h1>
            <p>The ${operation} of ${num1} and ${num2} is ${result}</p>
            <a href="/">Go Back</a>
          </body>
        </html>`);
      return res.end();
    });
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT)
}
);