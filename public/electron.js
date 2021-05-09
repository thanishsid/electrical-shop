/* eslint-disable no-underscore-dangle */
const { app, BrowserWindow, ipcMain } = require('electron');

const Datastore = require('nedb');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        backgroundColor: 'black',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    // mainWindow.removeMenu();
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, './index.html')}`
    );
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

const dataDir = `${app.getPath('appData')}/mse/db/`;

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
    filename: `${dataDir}/products.db`,
    autoload: true,
});

const customers = new Datastore({
    filename: `${dataDir}/customers.db`,
    autoload: true,
});

const returns = new Datastore({
    filename: `${dataDir}/returns.db`,
    autoload: true,
});

products.ensureIndex({ fieldName: 'prdName', unique: true }, (err) =>
    err ? console.error(err) : console.log('Products Index Check Passed')
);

customers.ensureIndex({ fieldName: 'custName', unique: true }, (err) =>
    err ? console.error(err) : console.log('Customers Index Check Passed')
);

const sales = new Datastore({
    filename: './public/db-store/sales.db',
    autoload: true,
});

const orders = new Datastore({
    filename: './public/db-store/orders.db',
    autoload: true,
});

// function to choose which database collection to access

const selectDb = (type) => {
    let db = null;

    if (type === 'products') {
        db = products;
    } else if (type === 'customers') {
        db = customers;
    } else if (type === 'sales') {
        db = sales;
    } else if (type === 'orders') {
        db = orders;
    }

    return db;
};

// <<<<<<<<<<<#  DB FUNCTIONS START  #>>>>>>>>>>>>>>

ipcMain.on('get', (event, targetDb, queryObj) => {
    const db = selectDb(targetDb);

    db.find(queryObj, (err, result) => {
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
            event.reply('insert-reply', 'Inserted Successfully');
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

ipcMain.on('sale', (event, _targetDb, saleData) => {
    sales.insert(saleData, (err, newData) => {
        if (err) {
            event.reply('sale-reply', err);
        } else if (newData) {
            const errors = [];
            let updatedProducts = 0;

            newData.items.forEach((item) => {
                const { _id, origQty, prdQty } = item;

                const updatedQty = origQty - prdQty;

                products.update(
                    { _id },
                    { $set: { prdQty: updatedQty } },
                    {},
                    (prderr, numUpdated) => {
                        if (prderr) {
                            errors.push(prderr);
                        } else if (numUpdated) {
                            updatedProducts += numUpdated;
                        }
                    }
                );
            });

            if (!errors.length) {
                event.reply(
                    'sale-reply',
                    `Sale Successful, Updated ${updatedProducts} products.`
                );
            }
        }
    });
});

ipcMain.on('return', (event, _targetDb, returnData) => {
    returns.insert(returnData, (err, newData) => {
        if (err) {
            event.reply('return-reply', err);
        } else if (newData) {
            newData.items.forEach((data) => {
                const { _id } = data;
                sales.update({ _id }, { $inc: {} });
            });
        }
    });
});

// <<<<<<<<<<<#  DB FUNCTIONS END  #>>>>>>>>>>>>>>
