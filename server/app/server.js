const express = require('express');
const morgan = require("morgan");
const cors = require('cors');

const router = require('./network/routes');

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

router(app);

app.listen(4242, () => {
    console.log(`[SERVER] :: Listening on port 4242`);
});