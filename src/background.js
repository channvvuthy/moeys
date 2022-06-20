'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain, shell } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
const ytdl = require('ytdl-core');

const fs = require('fs')
const sudo = require('sudo-prompt')
import axios from 'axios'

const { systemPreferences } = require('electron')

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

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
        }
        sudo.exec('echo hello', options, function (error, stdout, stderr) {
          if (error) throw error
          console.log(`stdout: ${stdout}`)
        })
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

const downloadPdfFile = async (bookInfo) => {
  let ex = bookInfo.ex == undefined ? `.pdf` : '.mp3'
  let fileName
  let Url
  if (ex == `.pdf`) {
    Url = bookInfo.bookPDF
    fileName = bookInfo.bookId + ex
  } else {
    Url = bookInfo.audioUrl
    fileName = bookInfo.audioId + ex
  }

  const directoryInstallation = path.join(app.getAppPath(), '..', 'downloads', `${fileName}`)
  let dir = path.join(app.getAppPath(), '..', 'downloads')

  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, err => {
      if (err) {
        let options = {
          name: 'Meoys',
        }
        sudo.exec('echo hello', options, function (error, stdout, stderr) {
          if (error) throw error
          console.log(`stdout: ${stdout}`)
        })
      }
    })
  }
  try {
    const response = await axios({
      method: 'GET',
      url: Url,
      responseType: 'stream',
    })
    await response.data.pipe(fs.createWriteStream(directoryInstallation).on('finish', () => {
      bookInfo.downloadUrl = path.join(app.getAppPath(), '..', 'downloads')
      if (ex == `.pdf`) {
        win.webContents.send('downloaded', bookInfo)
      } else {
        win.webContents.send('bookDownloaded', bookInfo)
      }

    }))
  } catch (err) {
    win.webContents.send('fail', bookInfo)
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
ipcMain.on('downloadPdf', (event, bookInfo) => {
  downloadPdfFile(bookInfo).catch(err => {
    event.reply('downloadFailed', arg)
    throw new Error(err)
  })
})

// Event get location of download
ipcMain.on('getPath', (event, args) => {
  event.reply('getPath', path.join(app.getAppPath(), '..', 'downloads'))
})

ipcMain.on('exit', (event, args) => {
  app.quit()
})

ipcMain.on("deeplink", (event, arg) => {
  event.reply("deeplink", { deeplink })
})

let win = null
let deeplink;
async function createWindow() {
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
  // win.setContentProtection(true)
  win.setTitle('E-Learning')
  win.setMenu(null)
  Menu.setApplicationMenu(null)
  win.maximize()

  if (process.platform == 'win32') {
    deeplink = process.argv.slice(1)[0]
  }

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  win.webContents.openDevTools()
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    let lastElement = commandLine[commandLine.length - 1];
    if (lastElement.indexOf('moeys'))
      deeplink = lastElement

    if (win) {
      if (win.isMinimized()) win.restore()
      win.show()
    }
  })
}
// ipcMain ytInfo
ipcMain.on("ytInfo", async (event, arg) => {
  let info = await ytdl.getInfo(arg);
  let result = info.formats.filter(item => item.container == 'mp4' && item.audioBitrate != null && item.hasVideo == true);
  event.reply("ytInfo", result)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
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
})

// Trigger event 'open-url' on mac OS
app.on("open-url", (event, data) => {
  event.preventDefault();
  let awaitContent = setInterval(()=>{
    if(win != null){
      clearInterval(awaitContent)
      win.webContents.send('deeplink', { deeplink: data });
    }
  },1000)
});

app.setAsDefaultProtocolClient("moeys");

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
