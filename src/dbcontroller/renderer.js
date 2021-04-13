const { ipcRenderer } = window.require('electron');

export const getData = (type) => {
    return new Promise((resolve) => {
        ipcRenderer.send('get', type);

        ipcRenderer.once('get-reply', (_, msg) => {
            resolve(msg);
        });
    });
};

export const dbFunction = (type, database, data) => {
    return new Promise((resolve) => {
        ipcRenderer.send(type, database, data);

        ipcRenderer.once(`${type}-reply`, (_, msg) => {
            resolve(msg);
        });
    });
};
