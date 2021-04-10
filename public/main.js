const { app, BrowserWindow, ipcMain } = require('electron');

const sqlite3 = require('sqlite3');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// Database connectivity

const database = new sqlite3.Database('./public/mse.db', (err) => {
    if (err) console.error('Database opening error: ', err);
});

ipcMain.on('all-msg', (event, arg) => {
    const sql = arg;
    database.all(sql, (err, rows) => {
        event.reply('all-reply', (err && err.message) || rows);
    });
});

ipcMain.on('run-msg', (event, arg) => {
    const sql = arg;
    database.run(sql, (err) => {
        event.reply(
            'run-reply',
            (err && err.message) || `${this.lastID} ${this.changes}`
        );
    });
});
