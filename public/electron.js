/* eslint-disable no-underscore-dangle */
const { app, BrowserWindow, ipcMain } = require('electron');

const Datastore = require('nedb');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1368,
        height: 820,
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
    filename: `${dataDir}/sales.db`,
    autoload: true,
});

const orders = new Datastore({
    filename: `${dataDir}/orders.db`,
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
// ipcMain.setMaxListeners(10);

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
    db.insert(data, (err, newDoc) => {
        if (err) {
            event.reply('insert-reply', err);
        } else {
            event.reply('insert-reply', newDoc);
        }
    });
});

ipcMain.on('delete', (event, targetDb, data) => {
    const db = selectDb(targetDb);
    db.remove({ _id: data }, {}, (err, numRemoved) => {
        if (err) {
            event.reply('delete-reply', err);
        } else if (numRemoved) {
            event.reply('delete-reply', numRemoved);
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
        { returnUpdatedDocs: true },
        (err, _numUpdated, updatedDocs) => {
            if (err) {
                event.reply('edit-reply', err);
            } else {
                event.reply('edit-reply', updatedDocs);
            }
        }
    );
});

// function to decrease quantity of products in stock upon a successful sale
const updateProducts = (data) => {
    const updatedProducts = data.items.map((item) => {
        const { _id, prdQty } = item;

        const updatedQty = -prdQty;

        let updatedItem = { ...item };

        products.update(
            { _id },
            { $inc: { prdQty: updatedQty } },
            {},
            (err, numUpdated, updatedDocs) => {
                if (err) {
                    console.error(err);
                } else if (numUpdated && updatedDocs) {
                    updatedItem = { ...updatedDocs[0] };
                }
            }
        );
        return updatedItem;
    });

    return updatedProducts;
};

ipcMain.on('sale', (event, _targetDb, saleData) => {
    sales.insert(saleData, (err, newSale) => {
        if (err) {
            event.reply('sale-reply', err);
        } else {
            const manageUpdate = async () => {
                const updatedProducts = await updateProducts(newSale);
                event.reply('sale-reply', { updatedProducts, newSale });
            };
            manageUpdate();
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
