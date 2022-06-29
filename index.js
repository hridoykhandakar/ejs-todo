const express = require("express");
const app = express();
const path = require("path");
const date = require("./date");

let items = ["Buy Food", "Make Food", "Eat Food"];
const works = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "pages"));

app.get("/", (req, res) => {
  const day = date.getDay();
  res.render("index", { title: day, newListItem: items });
});

app.post("/", (req, res) => {
  let item = req.body.todo;
  if (req.body.btn === "work") {
    works.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
  console.log(req.body);
});

app.get("/work", (req, res) => {
  res.render("index", { title: "work", newListItem: works });
  res.redirect("/works");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server running on port 3000");
});
