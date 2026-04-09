const fs = require('fs');
const path = './example.txt';

console.log('Starting file system operations...');

fs.writeFile(path, 'Hello! This is the initial content.\n', (err) => {
    if (err) {
        return console.error('Error creating file:', err);
    }
    console.log('1. File created and initial content written.');

    fs.appendFile(path, 'This line was appended later.\n', (err) => {
        if (err) {
            return console.error('Error appending to file:', err);
        }
        console.log('2. Data successfully appended.');

        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                return console.error('Error reading file:', err);
            }
            console.log('3. File Content Read:');
            console.log('---------------------------');
            console.log(data);
            console.log('---------------------------');

            fs.unlink(path, (err) => {
                if (err) {
                    return console.error('Error deleting file:', err);
                }
                console.log('4. File successfully deleted.');
                console.log('All operations completed successfully.');
            });
        });
    });
});