const express = require("express")
const app = express()
const cors = require('cors')
const { PORT } = require('./utils/constants')

app.use(cors())
app.use(express.json({ extended: true }));
app.use("/", require("./router/index"))

app.listen(PORT, () => {
    console.log(`The server was started on ${PORT} port`);
})