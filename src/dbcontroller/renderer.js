const { ipcRenderer } = window.require('electron');

export const allAsync = (sql) => {
    return new Promise((resolve) => {
        ipcRenderer.send('all-msg', sql);

        ipcRenderer.once('all-reply', (_, arg) => {
            resolve(arg);
        });
    });
};

export const runAsync = (sql) => {
    return new Promise((resolve) => {
        ipcRenderer.send('run-msg', sql);

        ipcRenderer.once('run-reply', (_, arg) => {
            resolve(arg);
        });
    });
};
