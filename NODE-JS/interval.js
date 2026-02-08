let a = setInterval(() => {
    console.log("This will run 5 seconds")
}, 1000)

/* 
setInterval is a timer function is javascript which executes the given function repeatedly after the given interval of time.
let a = ... stores the interval id which can be used to stop the interval later using clearInterval() method.

setTimeout is another timer function which executes the given function only once after the given interval of time.
clearInterval(a) stops the interval with id 'a'.
*/

setTimeout(() => {
    clearInterval(a)
    console.log("stopped")
},5000)