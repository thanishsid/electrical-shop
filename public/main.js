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

ipcMain.on('get-products', (event) => {
    products.find({}, (err, result) => {
        if (err) {
            event.reply('get-products-reply', err);
        } else {
            event.reply('get-products-reply', result);
        }
    });
});

ipcMain.on('insert-product', (event, arg) => {
    const product = arg;
    products.insert(product, (err, newProduct) => {
        if (err) {
            event.reply('insert-product-reply', err);
        } else if (newProduct) {
            event.reply('insert-product-reply', 'Product Added Successfully');
        }
    });
});

ipcMain.on('delete-product', (event, arg) => {
    const id = arg;
    products.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) {
            event.reply('delete-product-reply', err);
        } else if (numRemoved) {
            event.reply('delete-product-reply', 'Product Deleted Successfully');
        }
    });
});

ipcMain.on('edit-product', (event, arg) => {
    console.log(arg);
    const { id, productData } = arg;
    products.update(
        { _id: id },
        {
            $set: { ...productData },
        },
        {},
        (err, numUpdated) => {
            if (err) {
                event.reply('edit-product-reply', err);
            } else if (numUpdated) {
                event.reply(
                    'edit-product-reply',
                    'Product Edited Successfully'
                );
            }
        }
    );
});
