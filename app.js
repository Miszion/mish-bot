const sendMessage = require('./helper');
const sendCustom = require('./customhelper');
var Person = require('./Person');
const http = require('http');
const express = require('./node_modules/@types/express/index');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

var port = process.env.PORT || 3000;


const donna = new Person("Donna", 0, ["Upstairs"], "+13127314590");
const luie = new Person("Baggin", 1, ["Basement", "Kitchen"], "+17737479316");
const dwayne = new Person("Dwayne", 1, ["Living Room", "Bathroom"], "+13122412632");
const nathan = new Person("Nathan", 3, [], "Basement", "Bathroom", "+13124048334");
const beto = new Person("Beto", 3, ["Upstairs", "Kitchen"], "+13124801330");
const mission = new Person("Mission", 5, ["Basement", "Kitchen"], "+17736276985");
const donna2 = new Person("Donna", 5, ["Living Room"], "+13127314590");
const jim = new Person("Jim", 6, ["Living Room", "Bathroom"], "+17738186686");

const coda = new Person("Coda", 0, [], "+17737277293");


let overallList = [luie, dwayne, nathan, beto, mission, donna, jim, donna2];

let sendList = [luie, dwayne, nathan, beto, mission, donna, jim]; // list of people to send things to.

let date = new Date();

let dayNumber = date.getDay();

// overallList.forEach(function(x) {
    
//     if (x.day == dayNumber) {

//         sendMessage(x);

//     }

// });


// sendList.forEach(function(x) {
  
//     sendCustom(x, "Merry Christmas from Mish Bot :)");
    
//  });


app.use(bodyParser.urlencoded({ extended: false }));

app.post('*', (req, res) => {
  const twiml = new MessagingResponse();

  if (req.body.Body == 'hello') {
    twiml.message('Hi!');
  } else if (req.body.Body == 'bye') {
    twiml.message('Goodbye');
  } else {
    twiml.message(
      'No Body param match, Twilio sends this in the request to your server.'
    );
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

http.createServer(app).listen(port, () => {
  console.log('Express server listening');
});
