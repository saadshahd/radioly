import download from 'download';
import { app, BrowserWindow, ipcMain } from 'electron' // eslint-disable-line

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

  ipcMain.on('download', (e, url) => {
    download(url, __static)
      .on('response', (res) => {
        const total = res.headers['content-length'];
        let progress = 0;

        res.on('data', (d) => {
          progress += d.length;
          e.sender.send('data', ((progress / total) * 100).toFixed(1));
        });
      })
      .then((a) => {
        e.sender.send('downloaded', a);
      });
  });

  mainWindow.loadURL(winURL);

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
