const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();
const port = process.env.PORT || 8080;

app.use(serveStatic(__dirname + "/dist"));

app.get(/.*/, function(req, res) { 
	res.sendFile(__dirname + "/dist/index.html");
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
})
