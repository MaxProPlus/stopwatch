const {app, BrowserWindow} = require('electron')

const createWindow = () => {
  const height = process.platform === 'linux' ? 160 : 190
  const win = new BrowserWindow({
    width: 380,
    height,
    resizable: true,
    icon: './asserts/icon.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true
    },
  })
  win.setMenu(null)
  win.loadFile('./build/index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
