module.exports = class Person {

    constructor(name, dayList, choreList, phoneNumber) {
        this.name = name;
        
        this.dayList = dayList;
        this.day = "";
        this.choreList = choreList;
        this.phoneNumber = phoneNumber;

    }

    hasDay(number) {
        
        for (x in this.dayList) {
            if (x == number){
                this.day = number;

                if (this.dayList.length == 2) {
                    this.selectedIndex = x;
                }

                return true;
            }
        }

    }


    getInformation() {

        return `Good Morning, ${this.name}.\nToday is ${this.day}. Your zone(s) are: ${ (this.dayList.length == 1 ? this.choreList.join(' and ') : this.choreList[this.selectedIndex])`;


    }


}