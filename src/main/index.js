import os from 'os';
import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';
import pify from 'pify';
import mm from 'musicmetadata';
import { app, BrowserWindow, ipcMain } from 'electron'; // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

const homeMp3s = path.join(os.homedir(), '/**/*.mp3');
const mmify = pify(mm);

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    show: false,
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      webSecurity: false,
    },
  });

  mainWindow.maximize();
  mainWindow.show();
  mainWindow.loadURL(winURL);

  ipcMain.on('GET_LOCAL_TRACKS', (e) => {
    const stream = fg.stream(homeMp3s);
    let tracks = [];

    stream.once('data', () => {
      tracks = [];
    });

    stream.on('data', (file) => {
      mmify(fs.createReadStream(file))
        .then((track) => {
          const { artist, title, genre } = track;

          tracks = [...tracks, {
            artist,
            title,
            genre,
            name: path.basename(file, path.extname(file)),
          }];

          e.sender.send('GOT_LOCAL_TRACKS', tracks);
        });
    });
  });

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
