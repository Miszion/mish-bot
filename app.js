const sendMessage = require('./helper');
const sendCustom = require('./customhelper');
var Person = require('./Person');
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

var port = process.env.PORT || 3000;


const donna = new Person("Donna", 0, ["Upstairs"], "+13127314590");
const luie = new Person("Baggin", 1, ["Basement", "Kitchen"], "+17737479316");
const dwayne = new Person("Dwayne", 1, ["Living Room", "Bathroom"], "+13122412632");
const nathan = new Person("Nathan", 3, ["Basement", "Bathroom"], "+13124048334");
const beto = new Person("Beto", 3, ["Upstairs", "Kitchen"], "+13124801330");
const mission = new Person("Mission", 5, ["Basement", "Kitchen"], "+17736276985");
const donna2 = new Person("Donna", 5, ["Living Room"], "+13127314590");
const jim = new Person("Jim", 6, ["Living Room", "Bathroom"], "+17738186686");

const coda = new Person("Coda", 0, [], "+17737277293");
const geneva = new Person("Geneva", 0, [], "+17736822576")


let choreList = [luie, dwayne, nathan, beto, mission, donna, jim, donna2];

let sendList = [luie, dwayne, nathan, beto, mission, donna, jim, coda, geneva]; // list of people to send things to.



app.use(bodyParser.urlencoded({ extended: false }));

app.post('*', (req, res) => {
  const twiml = new MessagingResponse();

  if (req.body.Body.toLowerCase() == 'basement') {
    twiml.message('Basement chores include: \n-Sweeping\n-Cleaning the Bathroom\n-Cleaning the living area');
  } else if (req.body.Body.toLowerCase() == 'upstairs') {
    twiml.message('Upstairs chores include: \n-Vacuuming carpet\n-Cleaning upstairs bathroom\n-Cleaning your own room');
  } 
  else if (req.body.Body.toLowerCase() == 'purpose') {
    twiml.message('My name is Mish Bot! My purpose is to help the house with any chore tasks and general announcements!')
  }
  else if (req.body.Body.toLowerCase() == 'commands') {

    twiml.message('Available commands:\n-basement\n-upstairs\n-purpose')

  }
  else if (req.body.Body.toLowerCase().startsWith('mc')) {

        sendList.forEach(function(x) {
          sendCustom(x, req.body.Body.substring(2, req.body.Body.length));
        }
        );
      


  }
  else if (req.body.Body.toLowerCase() == 'delegate') {

    let date = new Date();

    let dayNumber = date.getDay();


      choreList.forEach(function(x) {
    
      if (x.day == dayNumber) {

          sendMessage(x);

      }

  });

  }
    else {
    twiml.message(
      'Mish bot could not understand :('
    );
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

http.createServer(app).listen(port, () => {
  console.log('Express server listening');
});
