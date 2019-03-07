const fs = require('fs');
const chalk = require('chalk');

const mysql = require('mysql');
// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'noteapp'
})



const addNote = (title, body) => {
    connection.connect(function(err){
        if(err) {
            throw err;
        }
    
        console.log(chalk.green.inverse("Connected !"));
        let sql = `INSERT INTO notes(title,body) VALUES('${title}','${body}')`;
    
        connection.query(sql,function(err,result){
            console.log("1 record added");
        })

        connection.end();
    })
}

const removeNote = title => {

}

// List all notes
const listNotes = () => {
    connection.connect(err => {
        if(err) {
            throw err;
        }

        connection.query("SELECT * FROM notes", (err, results, fields) => {
            if(err) {
                throw err;
            }

            for(let i = 0; i< results.length; i++) {
                console.log(chalk.blue.inverse('Note detail ' + parseInt(i+1) ));
                console.log(chalk.red('Title: ') + results[i].title);
                console.log(chalk.red('Body: ') + results[i].body);
            }
        })
        connection.end();
    })

    //connection.end();
}

const readNote = title => {

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}