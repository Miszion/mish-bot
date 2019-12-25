module.exports = class Person {

    constructor(name, day, choreList, phoneNumber) {
        this.name = name;
        
        if (day == 1) {
            this.dayString = 'Monday';
        }
        else if (day == 2) {
            this.dayString = 'Tuesday';
        }
        else if (day == 3) {
            this.dayString = 'Wednesday';
        }
        else if (day == 4 ) {
            this.dayString = 'Thursday';
        }
        else if (day == 5) {
            this.dayString = 'Friday';
        }
        else if (day == 6) {
            this.dayString = 'Saturday';
        }
        else {
            this.dayString = 'Sunday';
        }

        this.day = day;

        this.choreList = choreList;
        this.phoneNumber = phoneNumber;

    }

    getDay() {
        return this.day;
    }


    getInformation() {

        return 'Good Morning, ' + this.name + '.\nYour chores are: ' + (this.choreList.length == 2 ? this.choreList.join(' and ') + "." : this.choreList.join(' , '));


    }


}