//API KEY:  LTTiFiJEOWmshX4FXGVxGgBAs3Hup1wqZq3jsn7SfqBxhh2XkU
//TODO Dienstgeber
const express = require("express");
const user = require("./user");
const equipment = require("./equipment");
const fs = require("fs");


//express an die Variable "app" binden
const app = express();

//Routen an app binden
app.use("/user", user);
app.use("/equipment", equipment);

const settings = {
    port: process.env.PORT || 5000
};

//Error Handler
app.use(function(err,req,res,next){
  console.console.error(err.stack);
  res.end(err.status + " " + err.messages);
});

//Pfad und Zeit für Request
app.use(function(req,res,next){
  console.log("Time %d " + "Request-Pfad: "+req.path, Date.now());
  next();
});

//GET Requests
app.get("/", function (req, res) {
  res.send("GET Hello World!");
});

app.get("/searchuser/:name", function(req,res){
  fs.readFile("./user/user.json", "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    var resJson;
    for(i in obj.user){
      if(obj.user[i].name == req.params.name) {
          resJson = obj.user[i];
          res.send(resJson);
      }
    }
    if(resJson == null)
    res.status(404).send('Not found!');
});
});

//Server wird erstellt
app.listen(settings.port, function() {
  console.log("Dienstgeber ist nun auf dem Port " +settings.port+ " verfügbar.");
});