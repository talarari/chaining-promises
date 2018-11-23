const readline = require('readline');
var interface = readline.createInterface(process.stdin, process.stdout, null);

const ask = (question)=> new Promise(resolve=> interface.question(question,resolve));

// this is a utility function thats gets an array of functions returning a promise and chains their execution and result
const serial = funcs =>
    funcs.reduce((promise, func) => 
        promise.then(results => func().then(result => results.concat(result))), Promise.resolve([]))

const askAllQuestions = (numberOfQuestions)=> {

    // build an array of functions to run in a serial way
    var questions = [];
    for (i = 0; i < numberOfQuestions; i++) {
        questions.push(()=> ask('what is your answer?'));
    } 
    // run the functions on after the other and return the combined result
    return serial(questions);
}

ask('how many questions?').then(answer=> {
    const times = parseInt(answer);
    askAllQuestions(times).then(answers=> {
        console.log(answers);
    })
})
