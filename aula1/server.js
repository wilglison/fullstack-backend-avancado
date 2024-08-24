const http = require("http");

const server = http.createServer((req, res) => {
  const { method, url } = req;
  //const method = req.method;
  //const url = req.url

  if (method == "GET" && url == "/customers") {
    return res.end("customers");
  } else if (method == "POST" && url == "/custumer") {
    return res.end("customers");
  }

  console.log(`Method ${method} URL ${url} `);

  return res.end("Retorno2");
});

server.listen(3006);
