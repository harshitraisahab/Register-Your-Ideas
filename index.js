// const cookieParser = require("cookie-parser")

// server bhool jata h baar baar tum kon ho to user ke shaat ek unique String
// saved on frontend which is cookie backend pr session
// mainly used  in authentication for saved login info??

// plain data frontend se blob ke form m unreadable so to become readable we use??

// express js is a framework -> flow manage everything accept request and give response
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
const fs = require("fs");
const express = require("express");
const app = express();
//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//seting ejs
app.set("viewengine", "ejs");
//setting static folders ./ images,javascript, stylesheets
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// app.use(function (req, res, next) {
//   console.log("middleware");
//   next();
// });
//rendering using making views folder
app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    res.render("index.ejs", { files: files });
    // console.log(files);
  });
});

app.get("/edit/:filename", function (req, res) {
  res.render("edit.ejs", { filename: req.params.filename });
});

app.get("/files/:filename", function (req, res) {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, data) {
    // console.log(data);
    res.render("show.ejs", { filename: req.params.filename, filedata: data });
  });
});

app.post("/edit", function (req, res) {
  fs.rename(`./files/${req.body.prev}`, `./files/${req.body.m}`, function (err) {
    res.redirect("/");
  });

  // console.log(req.body);
});

app.get("/delete/:ps", function (req, res) {
  // console.log('$');
  fs.unlink(`./files/${req.params.ps}`, (err) => {
    if (err) throw err;
    res.redirect("/");
    // console.log("path/file.txt was deleted");
  });
});

app.post("/create", function (req, res) {
  // console.log(req.body);
  // fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, function (err) {
  //   res.redirect("/");
  // });

  const fileName = req.body.title.split(" ").join("");
  const filePath = `./files/${fileName}`;

  fs.writeFile(filePath, req.body.details, function (err) {
    if (err) throw err;
    res.redirect("/");
  });
});
//dynamic routing

app.listen(300);
