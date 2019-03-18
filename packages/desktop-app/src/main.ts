import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron'
import { default as installExtension, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import * as electronIsDev from 'electron-is-dev'
import * as path from 'path'

if (electronIsDev) {
  require('electron-reload')(__dirname)
}

let mainWindow: Electron.BrowserWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: '#F7F7F7',
    minWidth: 880,
    show: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      preload: `${__dirname}/preload.js`,
    },
    height: 860,
    width: 1280,
  })

  mainWindow.loadURL(
    electronIsDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  )

  if (electronIsDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((extName) => {
        console.log(`Added Extension: ${extName}`)
      })
      .catch((error) => {
        console.error(`Load extension failed:`, error)
      })
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()

    ipcMain.on('open-external-window', (event: any, arg: any) => {
      shell.openExternal(arg)
    })
  })
}

const generateMenu = () => {
  const template = [
    {
      label: 'File',
      submenu: [{ role: 'about' }, { role: 'quit' }],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }],
    },
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template as any))
}

app.on('ready', () => {
  createWindow()
  generateMenu()
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('load-page', (event: any, arg: any) => {
  mainWindow.loadURL(arg)
})
