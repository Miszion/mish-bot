module.exports = class Person {

    constructor(name, dayList, choreList, phoneNumber) {
        this.name = name;
        
        this.dayList = dayList;
        this.day = "";
        this.choreList = choreList;
        this.phoneNumber = phoneNumber;


    }

    hasDay(number) {

        let dayArray=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
        for (var x in this.dayList) {
            if (this.dayList[x] == number){
                this.day = dayArray[parseInt(number, 10)];

                if (this.dayList.length == 2) {
                    this.selectedIndex = x;
                }

                return true;
            }
        }

    }


    getInformation() {

        return `Good Morning, ${this.name}.\nToday is ${this.day}. Your zone(s) today are: ${ (this.dayList.length == 1 ? this.choreList.join(' and ') : this.choreList[this.selectedIndex])}`;


    }


}