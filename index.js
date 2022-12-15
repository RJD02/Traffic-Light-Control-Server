const express = require("express");
const app = express();
const cors = require("cors");
const ejsMate = require("ejs-mate");
const morgan = require("morgan");
const path = require("path");

const port = process.env.PORT || 3000;

let mode = 0;
// 0 for off
// 1 for at a time blinking
// 2 for one by one blinking

app.use(cors());
app.set("views", path.join(__dirname + "/views"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("show", { mode });
});

app.post("/setmode/:modeNum", (req, res) => {
  mode = req.params.modeNum;
  console.log("mode number = ", mode);
  res.status(200).redirect("/");
});

app.get("/setmode/:modeNum", (req, res) => {
  mode = req.params.modeNum;
  console.log("Mode Number = ", mode);
  res.status(200).json({ msg: "Successfully sent", success: true });
});

app.get("/checkmode", (req, res) => {
  console.log("Got checkmode route");
  res.status(200).json({ msg: "Sent mode", mode });
});

app.post("/setmode/:modeNum", (req, res) => {
  mode = req.params.modeNum;
  console.log("mode number = ", mode);
  res.status(200).redirect("show");
});

app.listen(port, () => console.log(`Running on port ${port}`));
