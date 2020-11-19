//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/index.html", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/shoppingcard.html", function(req, res){
  res.sendFile(__dirname + "/shoppingcard.html");
});

app.get("/signin.html", function(req, res){
  res.sendFile(__dirname + "/signin.html");
});

app.get("/Address.html", function(req, res){
  res.sendFile(__dirname + "/Address.html");
});

app.post("/signin.html", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

 const data = {
   members: [
     {
       email_address: email,
       status: "subscribed",
       merge_fields: {
         FNAME: firstName,
         LNAME: lastName
       }
     }
   ]
 };
 const jsonData = JSON.stringify(data);

const url = "https://us7.api.mailchimp.com/3.0/lists/99970a07ec";
const options = {
  method: "POST",
  auth: "vaishnavi:a5a92014dc9e9a71f4e0fa4fb98b7e58-us7"
}

const request = https.request(url, options, function(response){
response.on("data", function(data){
  console.log(JSON.parse(data));
})
})
request.write(jsonData);
request.end();


});


app.listen(3000, function(){
console.log("Server is running on port 3000");
});
// a5a92014dc9e9a71f4e0fa4fb98b7e58-us7

// 99970a07ec
