const chalk = require('chalk');
const yargs = require('yargs');
const note = require('./note');


// Customize yargs version
yargs.version('1.1.0');

// Add Note
yargs.command({
    command:'add',
    describe:'Add a new note',
    builder:{
        title: {
            describe: 'Note Title',
            // TODO: Make it true after add functionality
            demandOption: false,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
             // TODO: Make it true after add functionality
            demandOption: false,
            type: 'string'
        }
    },
    handler(argv) {
        console.log("Note added");
    }
})

yargs.command({
    command: "list",
    describe: "List All Notes",
    handler(){
        note.listNotes();
    }
})

yargs.parse();