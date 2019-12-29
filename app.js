const sendMessage = require('./helper');
const sendCustom = require('./customhelper');
var Person = require('./Person');
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const moment = require('moment');

const app = express();
app.use(express.json());

var port = process.env.PORT || 3000;


const donna = new Person("Donna", [0, 5], ["Upstairs", "Living Room"], "+13127314590");
const luie = new Person("Baggin", [1], ["Basement", "Kitchen"], "+17737479316");
const dwayne = new Person("Dwayne", [1], ["Living Room", "Bathroom"], "+13122412632");
const nathan = new Person("Nathan", [3], ["Basement", "Bathroom"], "+13124048334");
const beto = new Person("Beto", [3], ["Upstairs", "Kitchen"], "+13124801330");
const mission = new Person("Mission", [5], ["Basement", "Kitchen"], "+17736276985");
const jim = new Person("Jim", [6], ["Living Room", "Bathroom"], "+17738186686");

const coda = new Person("Coda", 0, [], "+17737277293");
const geneva = new Person("Geneva", 4, ["Living Room", "Kitchen"], "+17736822576")


let choreList = [luie, dwayne, nathan, beto, mission, donna, jim];

let sendList = [luie, dwayne, nathan, beto, mission, donna, jim, coda, geneva]; // list of people to send things to.

app.use(bodyParser.urlencoded({ extended: false }));


app.post('*', (req, res) => {
  const twiml = new MessagingResponse();

  if (req.body.Body.toLowerCase().trim() == 'purpose') {
    twiml.message('My name is Mish Bot! My purpose is to help the house with any chore tasks and general announcements!')
  }
  else if (req.body.Body.toLowerCase().trim() == 'commands') {

    twiml.message('Available commands:\n\n - Commands\n - Purpose\n - Cleaning\n - Zone\n - Query {day}')

  }
  else if(req.body.Body.toLowerCase().trim() == 'zone') {
    
    choreList.forEach(function(x) {

      if (x.phoneNumber == req.body.From) {
        twiml.message('Your zone(s) are ' + x.choreList.join(' and '));
      }
    })

  }
  else if (req.body.Body.toLowerCase().trim().startsWith('query')){

    const dayString = req.body.Body.toLowerCase().trim().substring(6, req.body.Body.length);

    const day = determineDay(dayString)

    if (day < 7) {
      choreList.forEach(function(x) {
    
        if (x.hasDay(day)) {


          choreList.forEach( (x) => {

            if (x.phoneNumber == req.body.From) {
              sendCustom(x, `Name: ${x.name}\nZones on Day: ${ (x.dayList.length == 1 ? x.choreList.join(' and ') : x.choreList[x.selectedIndex])}`); // send a test message to me
            }

          })

        }

    
    })
  }

  }
  else if (req.body.Body.toLowerCase().trim().startsWith('mc')) {

        sendList.forEach(function(x) {
          sendCustom(x, req.body.Body.substring(2, req.body.Body.length));
        }
        );
    
  }
  else if (req.body.Body.toLowerCase().trim() == 'delegate') {

    delegate();

  }
  else if (req.body.Body.toLowerCase().trim() == 'cleaning') {
    twiml.message('Link to Cleaning List: https://docs.google.com/spreadsheets/d/1CQ6sKyDGE2iZKGcy7090hXqiS_Hnvw-PHBT9BYY0XlY/edit?usp=sharing')
  }
    else {
    twiml.message(
      'Mish bot could not understand :('
    );
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});


function delegate() {

    let dateObject = new Date();
  
    let dayNumber = dateObject.getDay();
  
      choreList.forEach(function(x) {
    
      if (x.hasDay(dayNumber)) {
  
          sendMessage(x);
  
      }
  
  });

  
}


function applyDaily() {

  delegate();
  setTimeout(applyDaily, 1000 * 60 * 60 * 24);
}

function determineDay(dayString) {

  switch(dayString) {
    case 'sunday': 
      return 0;
    case 'monday':
      return 1;
    case 'tuesday':
      return 2;
    case 'wednesday':
      return 3;
    case 'thursday':
      return 4;
    case 'friday':
      return 5;
    case 'saturday':
      return 6;
    default:
      return 7;
  }

}



http.createServer(app).listen(port, () => {
  console.log('Mish bot server :)');


  setTimeout(applyDaily, 1000 * 60 * 60 * 12);

 

});
