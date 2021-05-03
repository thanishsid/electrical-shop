const { ipcRenderer } = window.require('electron');

export const getData = (type, query) => {
    return new Promise((resolve) => {
        ipcRenderer.send('get', type, query);

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
