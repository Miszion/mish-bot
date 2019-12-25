

function sendMessage(person) {
    var accountSID = "AC9a55761f5bfb0d20fad8386267e07dc5";
    var authToken = "8f6690f4dcfaae58d31306dfd9d7fd9d";
    var twilio = require('twilio');

    var client = new twilio(accountSID, authToken);

    client.messages.create({
    body: person.getInformation(),
    to: person.phoneNumber,
    from: '+17736921543' // base number
}).then((message) => console.log(message.sid));
}


module.exports = function(person) {
    sendMessage(person);
}


