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
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        note.addNote(argv.body, argv.title);
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