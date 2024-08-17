const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');

const path = require('node:path');
const fs = require('node:fs');

const PORT = process.env.PORT ?? 3000;
const app = express();
dotenv.config();

app.disable("x-powered-by");

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET", "POST"], credentials: true }));

fs.readdirSync(path.join(process.cwd(), "router")).forEach(file => {
    try {
        app.use(`/api/${file.split(".")[0].toLocaleLowerCase()}`, require(path.join(process.cwd(), "router", file))(app));
    } catch (error) {
        return console.error(error);
    }
});

app.all("*", async function (req, res) {
    return res.status(404).json({ "code": 404, "message": "This is an unknown path." })
})

app.listen(PORT, () => {
    console.info('server on %d', PORT);
});