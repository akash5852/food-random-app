const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;
const URI = process.env.ATLAS_URI;
app.use(cors());
app.use(express.json());
app.use(require("./routes/meals"));

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established");
})

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
})