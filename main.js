// 引入electron并创建一个Browserwindow
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
 
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow=null,
  printWindow = null
 
function createWindow () {
  //创建浏览器窗口,宽高自定义具体大小你开心就好
  mainWindow = new BrowserWindow({
    maximizable: true, //支持最大化
    // width: 2000, 
    // height: 1300,
    show: false, //防止闪烁 等待加载完成
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
    
    resizable: true,
    
  })
  
  mainWindow.maximize() //最大化
  mainWindow.show()
  // mainWindow.show //
  // 加载应用----react 打包
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, './build/login.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))

  // mainWindow.loadURL('http://localhost:7777/login.html');
  mainWindow.loadURL(`file://${__dirname}/build/index.html`);


  //获得打印机列表
  ipcMain.on('allPrint',()=>{
    const printers = mainWindow.webContents.getPrinters();
    mainWindow.send('printName',printers)
  })
  
  // 打开开发者工具，默认不打开
  mainWindow.webContents.openDevTools()

  // //与子页面建立通信
  ipcMain.on('close', e =>{
    mainWindow.close();
  } );

  // 关闭window时触发下列事件.
  mainWindow.on('closed', function () {
    mainWindow = null;
    if(printWindow){
      printWindow.close()     //这个地方很关键，不要放到close中去关闭，不然打包后关闭客户端会报错；
      printWindow=null;
    }
  })
}
 
// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', ()=>{
  createWindow();
  // printWeb()
})
 
// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
 
app.on('activate', function () {
   // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow()
  }
})


//打印设置(窗口打印)
// function printWeb() {
  
//   printWindow = new BrowserWindow({
//     title: '菜单打印',
//     show: true,
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true, //开启渲染进程中调用模块  即require
//       webSecurity: false
//     }
//   })
//   printWindow.loadURL(
//     url.format({
//       pathname: path.join(__dirname, './build/print.html'),
//       protocol: 'file:',
//       slashes: true,
//     })
//   );

//   initPrintEvent()
// }


// function initPrintEvent() {
//   ipcMain.on('print-start', (event, obj) => {
//     printWindow.webContents.on('did-finish-load', () => {
//       printWindow.webContents.send('print-edit', obj);
//     });
//   })

//   ipcMain.on('do', (event, deviceName) => {
//     const printers = printWindow.webContents.getPrinters();
//     printers.forEach(element => {
//       if (element.name === deviceName && element.status != 0) {
//         mainWindow.send('print-error', deviceName + '打印机异常');
//         printWindow.webContents.print({
//             silent: false,
//             printBackground: false,
//             deviceName: ''
//           },
//           (data) => {
//             console.log("回调", data);
//           });
//       } else if (element.name === deviceName && !element.status) {
//         printWindow.webContents.print({
//             silent: true,
//             printBackground: false,
//             deviceName: element.name
//           },
//           (data) => {
//             console.log("回调", data);
//           });
//       }
//     });

//       printWindow.webContents.print(
//         {silent: false,
//           printBackground: true,
//           deviceName: deviceName
//         },
//         (data) => {
//           console.log("回调", data);
//         });
//       })
// }