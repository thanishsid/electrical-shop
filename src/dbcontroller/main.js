// const { ipcMain } = require('electron');
// const sqlite3 = require('sqlite3');

// const database = new sqlite3.Database('./public/mse.db', (err) => {
//     if (err) console.error('Database opening error: ', err);
// });

// ipcMain.on('all-msg', (event, arg) => {
//     const sql = arg;
//     database.all(sql, (err, rows) => {
//         event.reply('all-reply', (err && err.message) || rows);
//     });
// });

// ipcMain.on('run-msg', (event, arg) => {
//     const sql = arg;
//     database.run(sql, (err) => {
//         event.reply(
//             'run-reply',
//             (err && err.message) || `${this.lastID} ${this.changes}`
//         );
//     });
// });
