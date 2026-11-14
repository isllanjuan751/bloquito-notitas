const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const fs = require("fs/promises");
const {ipcMain} = require("electron");
const os = require("os");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "bloco-de-notas.ico"),
    autoHideMenuBar: true,
    webPreferences: {
      devTools: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle("abrir_arquivo", async(event, nome) => {
  try {
    const texto = await fs.readFile(nome, "utf8");
    console.log("Sucess!")
    return texto;
  } catch(erro) {
    console.error(erro);
  }
});

ipcMain.handle("salvar", async(event, nome, conteudo) => {
  try {
    await fs.writeFile(nome, conteudo, "utf8");
    console.log("Sucess");
    return
  }catch(erro) {
    console.error(erro);
  }
});

ipcMain.handle("excluir", async(event, nome) => {
  try {
    await fs.unlink(nome);
    console.log("sucess")
    return;
  } catch(erro) {
    console.error(erro);
  }
});

ipcMain.handle("criar", async(event, nome, conteudo) => {
  try {
    await fs.writeFile(nome, conteudo, "utf8");
    console.log("Sucess");
    return;
  } catch(erro) {
    console.error(erro);
  }
});

ipcMain.handle("so_o", async(event) => {
  const texto_v = "Versão do Node: " + process.version + " | Versões detalhadas: " + process.versions + " | Plataforma: " + os.platform() + " | Tipo de OS: " + os.type() + " | Release Kernel/OS" + os.release() + " | Versão detalhada do OS: " + os.version() + " | Arquitetura: " + os.arch() + "\n Informações obtidas atravez do OS.system.elecdrop.full";
  return texto_v;
});

ipcMain.handle("name_user", async(event) => {
  const texto = "User Host: " + os.hostname();
  return texto;
})