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
app.use(express.static(path.join(__dirname,"Develop/public")));



app.get("../db/db.json", function (err, res) {
  try {
    notesI = fs.readFileSync("Develop/db/db.json", "utf8");
    notesI = JSON.parse(notesI);
  } catch (err) {
    console.log(err);
  } res.json(notesI); 
}); 

app.post("../db/db.json", function (req, res) {
  try {
    //recieve
    notesI = fs.readFileSync("Develop/db/db.json", "utf8");
    //add to json
    notesI = JSON.parse(notesI);
    req.body.id = notesI.length; 
    notesI.push(req.body);
    notesI = JSON.stringify(notesI);
    fs.writefile("Develop/db/db.json", notesI, "utf8", function (err) {
      if (err) throw err;
    }); res.json(JSON.parse(notesI));
  } catch (err) {
    throw err;
  };
});















app.delete("../db/db.json/:id", function (req, res) {
  try {
    notesI = fs.readFileSync("Develop/db/db.json", "utf8");
    notesI = JSON.parse(notesI);
    notesI = noteI.filter(function (notes) {
      return notes.id != req.params.id;
    });
    notesI = JSON.stringify(notesI);
    fs.writeFile("Develop/db/db.json", notesI, "utf8", function (err) {
      if (err) throw err;
    });
    res.send(JSON.parse(notesI));
  } catch (err) {
    throw err;
  }
});

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page






app.get("/notes", function (req, res) {
  res.sendFile(path.join("Develop/public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join( "Develop/public/index.html"));
});
app.get("/api/notes", function (req, res) {
  return res.sendFile(path.json( "Develop/db/db.json"));
});

// Displays a single character, or returns false
// app.get("/api/notes/:id", function(req, res{
//   var chosen = req.params.notes;

//   console.log(chosen);

//   for (var i = 0; i < notes.length; i++{
//     if (chosen === notes[i].routeName{
//       return res.json(notes[i]);
//     }
//   }

//   return res.json(false);
// });

// Create New Characters - takes in JSON input
// app.post("/api/notes", function(req, res{
//   // req.body hosts is equal to the JSON post sent from the user
//   // This works because of our body parsing middleware
//   var newNote = req.body;

//   // Using a RegEx Pattern to remove spaces from newCharacter
//   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();

//   console.log(newNote);

//   notes.push(newNote);

//   res.json(newNote);
// });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
