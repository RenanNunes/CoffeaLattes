const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
})

require('./routes/index.js')(app);
