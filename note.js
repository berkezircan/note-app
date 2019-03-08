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
    connection.connect(err => {
        if(err) {
            throw err;
        }
    
        console.log(chalk.green.inverse("Connected !"));
        let sql = `INSERT INTO notes(title,body) VALUES('${title}','${body}')`;
    
        connection.query(sql,(err,result) => {
            console.log("1 record added");
        })

        connection.end();
    })
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
}

// Read A Note
const readNote = title => {
    connection.connect(err => {
        if(err) {
            throw err;
        }

        let sql = `SELECT * from notes WHERE title = '${title}'`;
        console.log(sql);
        connection.query(sql, (err, result) => {
            try {
                console.log(chalk.green('Note title: ')+ result[0].title);
                console.log(chalk.green('Note body: ')+ result[0].body);
            } catch(e) {
                console.log(chalk.red('Note not found'));
            }
        })
        
        connection.end();

    })
}

// Remove Note
const removeNote = title => {
    connection.connect(err => {
        if(err) {
            throw err;
        }

        let sql = `DELETE FROM notes WHERE title = '${title}'`;
        console.log(sql);
        connection.query(sql, (err, result) => {
            if(err){
                throw err;
            }
            // No note found 
            if(result.affectedRows === 0) {
                console.log(chalk.red.inverse('Note already deleted..'));
            } else {
                console.log(chalk.green.inverse('Note deleted..'));
            }
        })

        connection.end();
    })
}

// Update A Note
const updateNote = (title, newTitle, newBody) => {
    connection.connect(err => {
        if(err) {
            throw err;
        }

        let sql = `UPDATE notes SET title='${newTitle}', body='${newBody}' WHERE title='${title}'`;
        connection.query(sql, (err, result) => {
            if(err) {
                throw err;
            }

                if(result.changedRows === 0) {
                    console.log(chalk.red.inverse('No note found..'));
                } else {
                    console.log(chalk.green('Updated Title: ') + newTitle);
                    console.log(chalk.green('Updated Body: ') + newBody)
                }

            connection.end();
        })
    })
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
    updateNote: updateNote
}