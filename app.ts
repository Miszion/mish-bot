import sendMessage from './helper';
import sendCustom from './customhelper';
import Person from './Person';
import http from 'http';
import express, { Request, Response } from 'express';
import { twiml as TwilioTwiml } from 'twilio';
import bodyParser from 'body-parser';
import scheduler from 'node-schedule';

const MessagingResponse = TwilioTwiml.MessagingResponse;
const app = express();
app.use(express.json());

const port: number = parseInt(process.env.PORT || '3000', 10);

const donna = new Person("Donna", [0, 5], ["Upstairs", "Living Room"], "+13127314590");
const luie = new Person("Baggin", [1], ["Basement", "Kitchen"], "+17737479316");
const dwayne = new Person("Dwayne", [1], ["Living Room", "Bathroom"], "+13122412632");
const nathan = new Person("Nathan", [3], ["Basement", "Bathroom"], "+13124048334");
const beto = new Person("Beto", [3], ["Upstairs", "Kitchen"], "+13124801330");
const mission = new Person("Mission", [5], ["Basement", "Kitchen"], "+17736276985");
const jim = new Person("Jim", [6], ["Living Room", "Bathroom"], "+17738186686");

const coda = new Person("Coda", 0, [], "+17737277293");
const geneva = new Person("Geneva", 4, ["Living Room", "Kitchen"], "+17736822576");

let choreList: Person[] = [luie, dwayne, nathan, beto, mission, donna, jim];
let sendList: Person[] = [luie, dwayne, nathan, beto, mission, donna, jim, coda, geneva]; // list of people to send things to.

app.use(bodyParser.urlencoded({ extended: false }));

app.post('*', (req: Request, res: Response) => {
  const twiml = new MessagingResponse();

  const body = req.body.Body?.toLowerCase().trim() || '';
  const from = req.body.From;

  if (body === 'purpose') {
    twiml.message('My name is Mish Bot! My purpose is to help the house with any chore tasks and general announcements!');
  }
  else if (body === 'commands') {
    twiml.message('Available commands:\n\n - Commands\n - Purpose\n - Cleaning\n - Zone\n - Query {day}');
  }
  else if (body === 'zone') {
    choreList.forEach(function(x) {
      if (x.phoneNumber === from) {
        twiml.message('Your zone(s) are ' + x.choreList.join(' and '));
      }
    });
  }
  else if (body.startsWith('query')) {
    const dayString = body.substring(6, body.length).trim();
    const day = determineDay(dayString);

    if (day < 7) {
      choreList.forEach(function(x) {
        if (x.hasDay(day)) {
          twiml.message(`Name: ${x.name}\nZones on Day: ${(x.dayList.length === 1 ? x.choreList.join(' and ') : x.choreList[x.selectedIndex])}`);
        }
      });
    }
  }
  else if (body.startsWith('mc')) {
    sendList.forEach(function(x) {
      sendCustom(x, req.body.Body.substring(2, req.body.Body.length));
    });
  }
  else if (body === 'delegate') {
    delegate();
  }
  else if (body === 'cleaning') {
    twiml.message('Link to Cleaning List: https://docs.google.com/spreadsheets/d/1CQ6sKyDGE2iZKGcy7090hXqiS_Hnvw-PHBT9BYY0XlY/edit?usp=sharing');
  }
  else {
    twiml.message('Mish bot could not understand :(');
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

function delegate(): void {
  let dateObject = new Date();
  let dayNumber = dateObject.getDay();

  choreList.forEach(function(x) {
    if (x.hasDay(dayNumber)) {
      sendMessage(x);
    }
  });
}

function applyDaily(): void {
  delegate();
}

function delegateJob(): void {
  sendMessage(choreList[4]);
}

function determineDay(dayString: string): number {
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
});