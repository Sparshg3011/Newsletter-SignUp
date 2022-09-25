const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const { response } = require('express');

app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded(
  { extended: true }
));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us11.api.mailchimp.com/3.0/lists/72652e2c5b",
    method: "POST",
    auth: "sparsg1:ec8e5aa41aaf1c025496fbaa3c238d1-us11",
    body: jsonData
  };

  request(options, function (error, response, body) {
    if (error) {
      res.sendFile(__dirname+"/failure.html");
    }
    else {
      if(response.statusCode!=200){
        res.sendFile(__dirname+"/failure.html");
        console.log(response);
      }else{
        res.sendFile(__dirname+"/success.html");
      }
    }
  });
});

app.post("/backToMain", function (req,res){
  res.redirect('/');
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});


