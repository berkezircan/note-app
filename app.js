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
});

// List command
yargs.command({
    command: "list",
    describe: "List All Notes",
    handler(){
        note.listNotes();
    }
});

// Read command
yargs.command({
    command:'read',
    describe: 'Read a Note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        note.readNote(argv.title);
    }
});

// Remove command
yargs.command({
    command:'remove',
    describe: 'Read a Note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        note.removeNote(argv.title)
    }
});

// Update Command
yargs.command({
    command: 'update',
    describe: 'Update a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        newTitle: {
            describe: 'Updated Title',
            demandOption: true,
            type: 'string'
        },
        newBody: {
            describe: 'Updated Body',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        note.updateNote(argv.title, argv.newTitle, argv.newBody)
    }
})

yargs.parse();