const express = require("express");
const app = express();
const fetch = require("node-fetch");
const ejs = require("ejs");

// api key
const key = "2b965f2f8c2348e8af661a98f06c24db";

// kelvin to celcius
function ktoc(k) {
  return (k - 273.1).toFixed(2);
}

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/:city", async (req, res) => {
  const { city } = req.params;
  const url = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&appid=${key}`;
  const d = await fetch(url);
  const djs = await d.json();
  const { temp } = djs.main;
  const newTemp = ktoc(temp);
  res.render("weather.ejs", { djs, newTemp });
});
app.listen("3000", () => {
  console.log("Server is running on port 3000.");
});
