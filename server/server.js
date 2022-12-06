const auth = require("json-server-auth");
const jsonServer = require("json-server");
const express = require("express")
const cors  =require("cors")
const app = express()
app.use(cors())
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 9000;

// Bind the router db to the app
server.db = router.db;

server.use(middlewares);

const rules = auth.rewriter({
    users: 640,
    conversations: 660,
    messages: 660,
});

server.use(rules);
server.use(auth);
server.use(router);
app.use("/",(req,res) => {
    res.send({mes:"server running"})
})

server.listen(port);