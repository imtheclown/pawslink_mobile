// utility functions that deals with date and time

// accepts two numbers, hours and minutes and returns a time string
const generateTimeFromNumbers = (hours: number, minutes : number) =>{
    var hour = hours.toString();
    var minute = minutes.toString();

    // prepend a zero if number of digits is one
    if(hour.length === 1){
        hour = "0"+hour;
    }
    if(minute.length === 1){
        minute = "0" + minute;
    }
    // return generated string that follows the awsTime format
    return `${hour}:${minute}:00.000`
}

const convertTimeToString = (timeString: string) => {
    // time string format
    // hh:mm:ss.sss
    const splitString = timeString.split(":");
    var hour = splitString[0];
    const minute = splitString[1];

    var meridiem = "AM"
    if(parseInt(hour) > 11){
        meridiem = "PM"
        const numHour = parseInt(hour);
        if(numHour > 12){
            hour = (numHour - 12).toString();
        }
    }
    return `${hour}:${minute} ${meridiem}`
}

// exports functions here
export {generateTimeFromNumbers, convertTimeToString}