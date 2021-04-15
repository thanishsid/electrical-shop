const { app, BrowserWindow, ipcMain } = require('electron');

const Datastore = require('nedb');
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

const products = new Datastore({
    filename: './public/db-store/products.db',
    autoload: true,
});

const customers = new Datastore({
    filename: './public/db-store/customers.db',
    autoload: true,
});

products.ensureIndex({ fieldName: 'prdName', unique: true }, (err) =>
    console.error(err)
);

customers.ensureIndex({ fieldName: 'custName', unique: true }, (err) =>
    console.error(err)
);

// const sales = new Datastore({
//     filename: './public/db-store/sales.db',
//     autoload: true,
// });

// const orders = new Datastore({
//     filename: './public/db-store/orders.db',
//     autoload: true,
// });

// function to choose which database collection to access

const selectDb = (type) => {
    let db;

    if (type === 'products') {
        db = products;
    } else if (type === 'customers') {
        db = customers;
    }

    return db;
};

// <<<<<<<<<<<#  DB FUNCTIONS START  #>>>>>>>>>>>>>>

ipcMain.on('get', (event, targetDb) => {
    const db = selectDb(targetDb);

    db.find({}, (err, result) => {
        if (err) {
            event.reply('get-reply', err);
        } else {
            event.reply('get-reply', result);
        }
    });
});

ipcMain.on('insert', (event, targetDb, data) => {
    const db = selectDb(targetDb);
    db.insert(data, (err, newData) => {
        if (err) {
            event.reply('insert-reply', err);
        } else if (newData) {
            event.reply('insert-reply', 'Added Successfully');
        }
    });
});

ipcMain.on('delete', (event, targetDb, data) => {
    const db = selectDb(targetDb);
    db.remove({ _id: data }, {}, (err, numRemoved) => {
        if (err) {
            event.reply('delete-reply', err);
        } else if (numRemoved) {
            event.reply('delete-reply', 'Deleted Successfully');
        }
    });
});

ipcMain.on('edit', (event, targetDb, data) => {
    console.log(event);
    console.log(targetDb);
    console.log(data);
    const db = selectDb(targetDb);
    const { id, newData } = data;
    db.update(
        { _id: id },
        {
            $set: { ...newData },
        },
        {},
        (err, numUpdated) => {
            if (err) {
                event.reply('edit-reply', err);
            } else if (numUpdated) {
                event.reply('edit-reply', 'Edited Successfully');
            }
        }
    );
});

// <<<<<<<<<<<#  DB FUNCTIONS END  #>>>>>>>>>>>>>>
