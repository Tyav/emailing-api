let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let router = require('./src/apis/routers');
const app = express();

//connect db into app
let db = require('./startup/db');
db(mongoose);
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

let port = process.env.PORT || 9090;
if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`started... ${port}`);
	});
}
