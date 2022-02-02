const http = require("http"),
  httpProxy = require("http-proxy");

const LIVEBOOK_HOST = process.env.LIVEBOOK_HOST;

const proxy = httpProxy.createProxyServer({});
const server = http.createServer((req, res) => {
  if (!req.headers.cookie?.includes("ok=1")) {
    console.warn(`[blocked] ${req.method}: ${req.url}`);
    console.warn(req.headers);
    return res.writeHead(403, {}).end("blocked");
  }

  console.log(`[accepted] ${req.method}: ${req.url}`);
  proxy.web(req, res, { target: `http://${LIVEBOOK_HOST}:8080` });
});
server.on("upgrade", (req, socket, head) => {
  proxy.ws(req, socket, head, { target: `ws://${LIVEBOOK_HOST}:8080` });
});

server.listen(3000);
