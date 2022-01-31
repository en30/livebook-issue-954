const http = require("http"),
  httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});
const server = http.createServer((req, res) => {
  if (!req.headers.cookie?.includes("ok=1")) {
    return res.writeHead(403, {}).end("blocked");
  }

  proxy.web(req, res, { target: "http://livebook:8080" });
});
server.on("upgrade", (req, socket, head) => {
  proxy.ws(req, socket, head, { target: "ws://livebook:8080" });
});

server.listen(3000);
