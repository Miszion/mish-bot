function sendCustom(person, text) {
    var accountSID = "INSERT ACCOUNT SID";
    var authToken = "INSERT AUTH TOKEN";
    var twilio = require('twilio');

    var client = new twilio(accountSID, authToken);

    client.messages.create({
    body: text,
    to: person.phoneNumber,
    from: 'INSERT BASE NUMBER' // base number
}).then((message) => console.log(message.sid));
}


module.exports = function (person, text) {
    sendCustom(person, text);
}
