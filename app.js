require("dotenv").config();
// Require Libraries
const express = require("express");

// Require tenorjs near the top of the file
const Tenor = require("tenorjs").client({
    // Replace with your own key
    "Key": process.env.API_KEY,
    "Filter": "high",
    "Locale": "en_US"
})

// App Setup
const app = express();

// Middleware
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
app.get("/", async(req, res) => {
    // Handle the home page when we haven't queried yet
    let term = "";
    if (req.query.term) term = req.query.term;
    try {
        const gifs = await Tenor.Search.Query(term, "10");

        res.render("home", { gifs })
    } catch (err) {
        console.log(err);
    }
})

app.get("/greetings/:name", (req, res) => {
    // Grab the name from the path required
    const name = req.params.name;
    // render the greetings view, passing along the name
    res.render("greetings", { name });
})

// Start Server
app.listen(3000, () => {
    console.log("Gif search listening on port 3000");
})