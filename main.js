const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const dataManager = require('./database/datamanager');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // mainWindow.loadFile('index.html');
  mainWindow.loadURL('http://localhost:3000/');

  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers
ipcMain.on('add-user', (event, user) => {
  dataManager.addUser(user, (err, id) => {
    if (err) {
      console.error(err);
    } else {
      dataManager.getUsers((err, users) => {
        if (err) {
          console.error(err);
        } else {
          event.sender.send('users', users);
        }
      });
    }
  });
});

ipcMain.on('get-users', (event) => {
  dataManager.getUsers((err, users) => {
    if (err) {
      console.error(err);
    } else {
      event.sender.send('users', users);
    }
  });
});
