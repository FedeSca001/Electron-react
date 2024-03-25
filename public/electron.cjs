const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 1300, height: 900});
  const isDevPromise = import('electron-is-dev');
  isDevPromise.then(({ default: isDev }) => {
    mainWindow.loadURL(isDev ? 'http://localhost:5173' : `file://${path.join(__dirname, '../build/index.html')}`);
    /*if (isDev) {
      // Abre las herramientas de desarrollo.
      mainWindow.webContents.openDevTools();
    }*/
  }).catch(error => {
    console.error('Error al importar electron-is-dev:', error);
    // Trata el error aquí si es necesario
  });
  
  mainWindow.on('closed', () => mainWindow = null);
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
