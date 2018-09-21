const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const { createServer } = require("http");

const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(3000, err => {
    if (err) throw err;
    console.log("ready on local host 3000");
  });
});
