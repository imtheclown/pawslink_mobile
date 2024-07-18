// utility functions that deals with date and time

// accepts two numbers, hours and minutes and returns a time string
const generateTimeFromNumbers = (hours: number, minutes : number) =>{
    return `${hours.toString()}:${minutes.toString()}`
}

// exports functions here
export {generateTimeFromNumbers}