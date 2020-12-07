// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 5500;

// Sets up the Express app to handle data parsing
var notesI = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("../db/db.json", function (res) {
  try {
    //reads db.js
    notesI = fs.readFileSync("Develop/db/db.json", "utf8");
    //adds to db.json
    notesI = JSON.parse(notesI);
  } catch (err) {
    console.log(err);
  } res.json(notesI); 
}); 
app.post("../db/db.json", function (req,res) {
  try {
    //reads db.json
    notesI = fs.readFileSync("Develop/db/db.json", "utf8");
    //add to json
    notesI = JSON.parse(notesI);
    req.body.id = notesI.length;
    //pushes to body 
    notesI.push(req.body);
    notesI = JSON.stringify(notesI);
    // pushes to page
    fs.writefile("Develop/db/db.json", notesI, "utf8", function (err) {
      if (err) throw err;
    }); res.json(JSON.parse(notesI));
  } catch (err) {throw err;};
});
app.delete("../db/db.json/:id", function (req,res) {
  try {
    //reads db.json
    notesI = fs.readFileSync("Develop/db/db.json", "utf8");
    //adds db.json
    notesI = JSON.parse(notesI);
    //filters through to find set id tag
    notesI = noteI.filter(function (notes) {
      //sets it not equal to  delete
      return notes.id != req.params.id;
    });
    notesI = JSON.stringify(notesI);
    fs.writeFile("Develop/db/db.json", notesI, "utf8", function (err) {
      if (err) throw err;
    });
    res.send(JSON.parse(notesI));
  } catch (err) {throw err;}
});
// Routes
// =============================================================
app.get("/notes", function (res) {
  res.sendFile(path.join("Develop/public/notes.html"));
});
app.get("*", function (res) {
  res.sendFile(path.join( "Develop/public/index.html"));
});
app.get("/api/notes", function (res) {
  return res.sendFile(path.json( "Develop/db/db.json"));
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
