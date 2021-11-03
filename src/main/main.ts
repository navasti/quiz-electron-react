import * as path from 'path'
import * as url from 'url'
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow, app } from 'electron'

let mainWindow: Electron.BrowserWindow | null

const createWindow = () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      webSecurity: false,
      devTools: process.env.NODE_ENV !== 'production'
    }
  })

  mainWindow
    .loadURL(
      url.format({
        pathname: path.join(__dirname, './index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
    .finally(() => {
      /* no action */
    })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
