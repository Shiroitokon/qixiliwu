// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let alertWindow
let close
function createWindow () {
  close = false;
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    resizable: false,
    //closable :false,
    alwaysOnTop: true,
    })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')



  mainWindow.on('close', function (event) {
    if(!close) {
      createAlertWindow();
      event.preventDefault()
    }
  })
}

function createAlertWindow() {
  alertWindow = new BrowserWindow({
    width: 100,
    height: 100,
    autoHideMenuBar: true,
    resizable: false,
    alwaysOnTop: true
    })
    alertWindow.loadFile("alert.html");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("close-wind", function(){
  close = true;
  mainWindow.close();
  mainWindow = null
})