'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain, shell } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'

const { download } = require('electron-dl')
const fs = require('fs')
const ytdl = require('ytdl-core')
const sudo = require('sudo-prompt')
import axios from 'axios'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      secure: true,
      standard: true
    }
  }
])

ipcMain.on('openLink', async (event, arg) => {
  shell.openExternal(arg)
})

// Function download
const downloadFile = async (videoInfo) => {
  // Get the file name
  const fileName = videoInfo.vId
  // // The path of the downloaded file on our machine
  const directoryInstallation = path.join(app.getAppPath(), '..', 'downloads', `${fileName}`)
  //write something to root installation folder
  let dir = path.join(app.getAppPath(), '..', 'downloads')

  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, err => {
      if (err) {
        let options = {
          name: 'Meoys',
          icns: '/assets/logo/Moeys.png', // (optional)
        }
        sudo.exec('echo hello', options,
          function (error, stdout, stderr) {
            if (error) throw error
            console.log(`stdout: ${stdout}`)
          }
        )
      }
    })
  }
  try {
    const response = await axios({
      method: 'GET',
      url: videoInfo.fileUrl,
      responseType: 'stream',
    })
    await response.data.pipe(fs.createWriteStream(directoryInstallation).on('finish', () => {
      videoInfo.downloadUrl = path.join(app.getAppPath(), '..', 'downloads')
      win.webContents.send('downloaded', videoInfo)
    }))
  } catch (err) {
    win.webContents.send('fail', videoInfo)
    throw new Error(err)
  }
}

// Event download
ipcMain.on('download', (event, arg) => {
  downloadFile(arg).catch(err => {
    event.reply('downloadFailed', arg)
    throw new Error(err)
  })
})

// Download Pdf
ipcMain.on('downloadPdf', (event, book) => {

})

// Event get location of download
ipcMain.on('getPath', (event, args) => {
  event.reply('getPath', path.join(app.getAppPath(), '..', 'downloads'))
})

let win

async function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      webSecurity: false,
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })
  win.setContentProtection(true)
  win.setTitle('Moeys')
  win.setMenu(null)
  Menu.setApplicationMenu(null)
  win.maximize()

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Get youtuve info
async function ytInfo () {
  let info = await ytdl.getInfo('ZZrqaMw5inE')
  return info.formats.filter(item => item.container == 'mp4' && item.audioBitrate != null)
}

// ipcMain ytInfo
ipcMain.on('ytInfo', async (event, arg) => {
  let info = await ytdl.getInfo(arg)
  let result = info.formats.filter(item => item.container == 'mp4' && item.audioBitrate != null && item.hasVideo == true)
  event.reply('ytInfo', result)
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
  ytInfo()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
