const readline = require('readline');
var interface = readline.createInterface(process.stdin, process.stdout, null);

const ask = (question)=> new Promise(resolve=> interface.question(question,resolve));

const askAllQuestions = (numberOfQuestions)=> {
    // create a resolved promise so we can chain the others to it
    var p = Promise.resolve();
    // create the answers array so we can add answers to it
    var answers = [];

    // run in a loop to chain promises to the initial promise so they happen on after the other
    for (i = 0; i < numberOfQuestions; i++) {
        p = p.then(()=> ask('what is your answer?')).then(answer=> {
            // push the answer to the answers array so we can return them when everything is done
            answers.push(answer)
        });
    } 
    // chain the promise that asks all the questions with a promise to return the answers array
    return p.then(()=> answers);
}

ask('how many questions?').then(answer=> {
    const times = parseInt(answer);
    askAllQuestions(times).then(answers=> {
        console.log(answers);
    })
})
