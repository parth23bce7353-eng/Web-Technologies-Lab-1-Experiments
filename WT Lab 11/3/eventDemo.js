const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('userLogin', (username) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[LOG] ${timestamp}: User "${username}" has logged in.`);
});

myEmitter.on('userLogin', (username) => {
    console.log(`[NOTIFICATION] Welcome! message sent to ${username}!`);
});

myEmitter.on('processData', (data) => {
    console.log('--- Starting background data process ---');
    
    setTimeout(() => {
        console.log(`[ASYNC] Processed data: "${data.toUpperCase()}"`);
    }, 2000);
});

console.log('Event system initialized...');
myEmitter.emit('userLogin', 'Parth');
myEmitter.emit('processData', 'node.js events are powerful');
console.log('The main script execution continues while async events process...');