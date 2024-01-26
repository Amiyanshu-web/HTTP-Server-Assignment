const express = require("express")
const app = express();
const data = require("./routes/data.js");
const notFound = require("./middleware/notFound.js");
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Running...");
})

app.use('/', data);

app.use(notFound);

const port = 8080;

const start = () => {
    try {
        app.listen(port, console.log(`Server is listening on Port ${port}`));
    }
    catch (err) {
        console.log(err);
    }
}

start();


