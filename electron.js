const { app, BrowserWindow } = require('electron')
const path = require('path')

app.commandLine.appendSwitch('disable-web-security')

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#0a0c10',
  })

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, 'dist/index.html'))
  } else {
    win.loadURL('http://localhost:5173')
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})