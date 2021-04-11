const { ipcRenderer } = window.require('electron');

// neDb

export const getProducts = () => {
    return new Promise((resolve) => {
        ipcRenderer.send('get-products');

        ipcRenderer.once('get-products-reply', (_, msg) => {
            resolve(msg);
        });
    });
};

export const dbFunction = (type, data) => {
    console.log(type);
    console.log(data);
    return new Promise((resolve) => {
        ipcRenderer.send(type, data);

        ipcRenderer.once(`${type}-reply`, (_, msg) => {
            resolve(msg);
        });
    });
};
